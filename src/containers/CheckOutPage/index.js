import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Row,
  Col,
  Navbar,
  Button,
  Form,
  Accordion,
  Card,
  useAccordionButton,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";

import DeliveryAddressForm from "../../components/DeliveryAddressForm";
import OrderSummary from "../../components/OrderSummary";
import PaymentForm from "../../components/PaymentForm";
import "./style.css";
import AddressForm from "../../components/UI/AddressForm";
import { populateUserAdress, deleteAddress } from "../../store/actions";
import { addOrder } from "../../store/actions";

function CustomToggle({ children, value, eventKey, setPayment }) {
  const decoratedOnClick = useAccordionButton(eventKey, (e) => {
    console.log(e.target.value);
    setPayment(e.target.value);
  });

  return (
    <InputGroup>
      <InputGroup.Radio
        name="pabin"
        value={value}
        onChange={decoratedOnClick}
        aria-label="Radio button for following text input"
        className="checkout-rdo-payment"
        defaultChecked={value == "cash" ? true : false}
      />
      <InputGroup.Text id="" className="checkout-paymentlist-item">
        {children}
      </InputGroup.Text>
    </InputGroup>
  );
}
//checkout steps
const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div
        onClick={props.onClick}
        className={`checkoutHeader ${props.active && "active"}`}
      >
        <div className="checkoutstep-title mt-2 mb-2">
          <span className="stepNumber">{props.stepNumber} </span>
          <span className="stepTitle">{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};

//address
const Address = ({
  addr,
  selectAddress,
  confirmDeliveryAddress,
  onDeleteAddress,
  handleEditAddress,
  address,
  setAddress,
  setAddnewaddress,
  handleEditAddressCancel,
}) => {
  return (
    <div className="addresscontainer">
      <Row>
        <Col xs={1} className={addr.edit ? "d-none" : ""}>
          {" "}
          <div className="ps-2 d-flex justify-content-center align-items-center h-100">
            <input
              name="address"
              onClick={() => selectAddress(addr)}
              type="radio"
            />
          </div>
        </Col>
        <Col xs={addr.edit ? 12 : 11}>
          {!addr.edit ? (
            <Row className="">
              <Col xs={6}>
                <div>
                  <span className="addressName">{addr.name}</span>
                  <span className="addressType">{addr.addressType}</span>
                  <span className="addressMobileNumber">
                    {addr.mobileNumber}
                  </span>
                </div>
                <div className="fullAddress">
                  {addr.address} <br />{" "}
                  {`${addr.locality} - ${addr.mobileNumber}`}
                </div>
              </Col>
              <Col xs={6}>
                <Row>
                  <Col>
                    <div className="d-flex justify-content-end align-items-center h-100">
                      {addr.selected && (
                        <Button
                          className=" mt-2 "
                          size="sm"
                          variant="warning"
                          onClick={() => {
                            handleEditAddress(addr, address, setAddress);
                          }}
                        >
                          edit
                        </Button>
                      )}
                      {addr.selected && (
                        <Button
                          className=" mt-2 ms-2"
                          size="sm"
                          variant="danger"
                          onClick={() => {
                            onDeleteAddress(addr);
                          }}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-end align-items-center mt-2 pe-1">
                      {addr.selected && (
                        <Button
                          variant="success"
                          onClick={() => confirmDeliveryAddress(addr)}
                          size="sm"
                        >
                          Deliver Here
                        </Button>
                      )}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          ) : (
            <AddressForm
              address={address}
              setAddress={setAddress}
              addr={addr}
              setAddnewaddress={setAddnewaddress}
              handleEditAddressCancel={handleEditAddressCancel}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

function CheckOutPage() {
  // ordersummary states lifting state up.
  const [allCartItems, setAllCartItems] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  //check out page states

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState([]);
  const [foneNumber, setFoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [addnewaddress, setAddnewaddress] = useState(false);
  const [ageConfirmation, setAgeConfirmation] = useState(false);
  const [payment, setPayment] = useState("cash");
  //address state
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [test, setTest] = useState(true);

  //fetch all user address from redux.
  const userAddresses = useSelector((state) => state.checkout.useraddress);

  useEffect(() => {
    const items = cart.cartItems;
    setAllCartItems(items);
  }, [cart]);

  useEffect(() => {
    if (Object.keys(allCartItems).length > 0) {
      calculateSubTotal(allCartItems);
    } else {
      console.log("no");
    }
  }, [allCartItems]);

  useEffect(() => {
    dispatch(populateUserAdress());
  }, []);

  useEffect(() => {
    setAddress(userAddresses);
  }, [userAddresses]);

  //item subtotal.
  function calculateSubTotal(allCartItems) {
    // console.log(allCartItems);
    let totalsum = 0;
    Object.keys(allCartItems).forEach((item, index) => {
      //item overall price depend on quantity.
      let itemTotalPriceIncQnt =
        allCartItems[item].price * allCartItems[item].qty;
      totalsum = totalsum + itemTotalPriceIncQnt;
    });
    setSubTotal(totalsum);
  }

  //on address radio select
  const selectAddress = (addr) => {
    //when user select address then show butotns .
    const updatedAddress = address.map((adr) =>
      //select address should be matched with id.
      adr.id === addr.id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );

    setAddress(updatedAddress);
  };

  //select delivery address
  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
  };

  //delete address
  const onDeleteAddress = (addr) => {
    // console.log("delete address clicked", addr);
    dispatch(deleteAddress(addr));
  };

  //Edit address
  const handleEditAddress = (addr, address, setAddress) => {
    //create new address array with edit property and set it true.
    const updatedAddress = address.map((adr) =>
      adr.id === addr.id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddress(updatedAddress);
  };

  //edit address cancel
  const handleEditAddressCancel = (addr) => {
    //if addr means the edit value of selected address is true which we have to make false while cancel edit.
    if (addr) {
      const updatedAddress = address.map((adr) =>
        adr.id === addr.id ? { ...adr, edit: false } : { ...adr }
      );
      setAddress(updatedAddress);
    }
  };

  //submit checkout
  const handleCheckoutSubmit = () => {
    console.log("submit checkout");
    const totalAmount = Object.keys(cart.cartItems).reduce(
      (totalPrice, key) => {
        const { price, qty } = cart.cartItems[key];
        return totalPrice + price * qty;
      },
      0
    );

    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty,
    }));

    const payload = {
      name: selectedAddress.name,
      selectedAddress,
      totalAmount,
      cartItems: items,
      ageConfirmation,
      paymentStatus: "pending",
      payment,
    };

    dispatch(addOrder(payload));
  };

  return (
    <div>
      <Container
        fluid
        className="checkout-brand-logo-container "
        style={{ height: "auto" }}
      >
        {/* brand name */}
        <Row>
          <Col className="d-flex justify-content-center align-items-center bg-dark p-4">
            <Navbar bg="dark" variant="dark">
              <Container>
                <Navbar.Brand href="/">
                  <img
                    alt=""
                    src="/images/logo-white.png"
                    height="55"
                    className="d-inline-block align-top"
                  />{" "}
                </Navbar.Brand>
              </Container>
            </Navbar>
          </Col>
        </Row>

        {/* Checkout steps navs */}

        <Row className="d-none">
          <Col>
            <Container>
              <div className="order-placement-control ">
                <ul>
                  <li>
                    <a href="#">Cart</a>
                  </li>
                  <li>
                    <a href="#">Delivery Address</a>
                  </li>
                  <li>
                    <a href="#">Payment</a>
                  </li>
                </ul>
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
      {/* user info logs */}
      <Container>
        <Row>
          <Col className="ask-customer-login mt-2" sm={12}>
            <div>
              {" "}
              <Alert variant="success">
                Are you a new customer ?
                <Alert.Link href="#"> login </Alert.Link>
                feature will be available soon.
              </Alert>
            </div>
          </Col>
          <Col sm={12}>
            <div>
              <Alert variant="info"> Order Has been successfully made.</Alert>
            </div>
          </Col>
        </Row>
      </Container>

      {/* check out step */}
      <Container className="">
        <Row>
          <Col sm={12} className="oreder-details">
            <Row>
              <Col sm={12}>
                <div>
                  <CheckoutStep
                    stepNumber={"1"}
                    title={"DELIVERY ADDRESS"}
                    active={!confirmAddress}
                    body={
                      <>
                        {confirmAddress ? (
                          <div className="stepCompleted">{`${selectedAddress.name} ${selectedAddress.address} ${selectedAddress.locality} ${selectedAddress.mobileNumber}  `}</div>
                        ) : address && address.length > 0 ? (
                          <div className="delevery-address">
                            {address.map((addr) => {
                              return (
                                <Address
                                  addr={addr}
                                  key={addr.id}
                                  selectAddress={selectAddress}
                                  confirmDeliveryAddress={
                                    confirmDeliveryAddress
                                  }
                                  onDeleteAddress={onDeleteAddress}
                                  handleEditAddress={handleEditAddress}
                                  setAddress={setAddress}
                                  address={address}
                                  setAddnewaddress={setAddnewaddress}
                                  handleEditAddressCancel={
                                    handleEditAddressCancel
                                  }
                                />
                              );
                            })}
                          </div>
                        ) : null}
                      </>
                    }
                  />
                </div>
              </Col>
              <Col sm={12}>
                <div className="addnew-deleveryaddress">
                  {addnewaddress ? (
                    <div className="add-address-container">
                      <AddressForm setAddnewaddress={setAddnewaddress} />
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline-dark"
                      className="add-address-button mt-3 mb-4"
                      onClick={() => {
                        setAddnewaddress(!addnewaddress);
                      }}
                    >
                      + Add new address
                    </Button>
                  )}
                </div>
              </Col>
            </Row>

            <div className="payment-info">
              <h5>Payment Method</h5>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <CustomToggle
                    setPayment={setPayment}
                    eventKey="0"
                    value="cash"
                  >
                    Cash on delivery
                  </CustomToggle>
                  <Accordion.Body>cash on delivery</Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <CustomToggle
                    setPayment={setPayment}
                    eventKey="1"
                    value="card"
                  >
                    card on delivery
                  </CustomToggle>
                  <Accordion.Body>Pay By card on delivery</Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <CustomToggle
                    setPayment={setPayment}
                    eventKey="2"
                    value="esewa"
                  >
                    Esewa
                  </CustomToggle>
                  <Accordion.Body>Esewa</Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <div className="age-confirmation">
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  onChange={(e) => {
                    //console.log(e.target.checked);
                    if (e.target.checked) {
                      setAgeConfirmation(true);
                    } else {
                      setAgeConfirmation(false);
                    }
                  }}
                  type="checkbox"
                  label="I confirm that I am eighteen (18) years of age or older. I have read and agree to the MIDNIGHT MADIRA website terms and conditions *"
                />
              </Form.Group>
            </div>

            <div className="checkout-controls-btn-container">
              <Button>cart</Button>
              <Button
                onClick={() => {
                  handleCheckoutSubmit();
                }}
              >
                Proceed
              </Button>
            </div>
          </Col>

          <Col>
            <div className="placenotdelivered">
              <h5>Place we dont deliver</h5>
              <p>1. Outside Jhapa, morang</p>
              <p>2. Outside of mechi border</p>
            </div>
            <div className="placenotdelivered">
              <h5>place we charge extra for deliver</h5>
              <p>1. Outside birtamode , sanishare , charali</p>
            </div>
          </Col>
          <Col className="oreder-summary d-none">
            <div className="oreder-summary-container">
              <OrderSummary
                setAllCartItems={setAllCartItems}
                allCartItems={allCartItems}
                subTotal={subTotal}
              ></OrderSummary>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CheckOutPage;
{
}
