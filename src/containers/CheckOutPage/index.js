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
} from "react-bootstrap";

import DeliveryAddressForm from "../../components/DeliveryAddressForm";
import OrderSummary from "../../components/OrderSummary";
import PaymentForm from "../../components/PaymentForm";
import "./style.css";
import AddressForm from "../../components/UI/AddressForm";
import { populateUserAdress, deleteAddress } from "../../store/actions";

function CustomToggle({ children, value, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, (e) =>
    console.log(e.target.value)
  );

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
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
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
}) => {
  return (
    <div className="addresscontainer">
      <div>
        <input
          name="address"
          onClick={() => selectAddress(addr)}
          type="radio"
        />
      </div>
      {!addr.edit ? (
        <div>
          {" "}
          <div className="addressDetail">
            <div>
              <span className="addressName">{addr.name}</span>
              <span className="addressType">{addr.addressType}</span>
              <span className="addressMobileNumber">{addr.mobileNumber}</span>
            </div>
            {addr.selected && (
              <Button
                onClick={() => {
                  handleEditAddress(addr, address, setAddress);
                }}
              >
                edit
              </Button>
            )}
            {addr.selected && (
              <Button
                onClick={() => {
                  onDeleteAddress(addr);
                }}
              >
                Delete
              </Button>
            )}
          </div>
          <div className="fullAddress">
            {addr.address} <br /> {`${addr.locality} - ${addr.mobileNumber}`}
          </div>
          {addr.selected && (
            <Button
              onClick={() => confirmDeliveryAddress(addr)}
              style={{
                width: "200px",
                margin: "10px 0",
              }}
            >
              Deliver Here
            </Button>
          )}
        </div>
      ) : (
        <AddressForm address={address} setAddress={setAddress} addr={addr} />
      )}
    </div>
  );
};

function CheckOutPage() {
  // ordersummary states lifting state up.
  const [allCartItems, setAllCartItems] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  //check out page states

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState([]);
  const [foneNumber, setFoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [addnewaddress, setAddnewaddress] = useState(false);
  const [ageConfirmation, setAgeConfirmation] = useState(false);
  //address state
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [confirmAddress, setConfirmAddress] = useState(false);

  //fetch all user address from redux.
  const userAddresses = useSelector((state) => state.checkout.useraddress);

  useEffect(() => {
    const items = cartItems.cartItems;
    setAllCartItems(items);
  }, [cartItems]);

  useEffect(() => {
    if (Object.keys(allCartItems).length > 0) {
      calculateSubTotal(allCartItems);
    } else {
      console.log("no");
    }
  }, [allCartItems]);

  useEffect(() => {
    console.log("populating user address");
    dispatch(populateUserAdress());
  }, []);

  useEffect(() => {
    setAddress(userAddresses);
  }, [userAddresses]);

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

  const selectAddress = (addr) => {
    //when user select address then show butotns .
    console.log(addr);
    const updatedAddress = address.map((adr) =>
      //select address should be matched with id.
      adr.id === addr.id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );

    setAddress(updatedAddress);
  };

  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
  };

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
  //submit checkout
  const handleCheckoutSubmit = () => {
    console.log("submit checkout");
    let order = {};
    
  };

  //logs
  console.log(ageConfirmation);

  return (
    <div>
      <Container
        fluid
        className="checkout-brand-logo-container "
        style={{ height: "auto" }}
      >
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
        <Row>
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
      <Container className="bg-secondary">
        <Row>
          <Col className="oreder-details">
            <Row>
              <Col sm={12}>
                <div className="login-confirm">
                  <CheckoutStep
                    stepNumber={"1"}
                    title={"LOGIN"}
                    active={false}
                    body={<div>login user</div>}
                  />
                </div>
              </Col>
              <Col sm={12}>
                <div className="delevery-address">
                  <CheckoutStep
                    stepNumber={"2"}
                    title={"DELIVERY ADDRESS"}
                    active={!confirmAddress}
                    body={
                      <>
                        {confirmAddress ? (
                          <div className="stepCompleted">{`${selectedAddress.name} ${selectedAddress.address} ${selectedAddress.locality} ${selectedAddress.mobileNumber}  `}</div>
                        ) : address && address.length > 0 ? (
                          address.map((addr) => {
                            return (
                              <Address
                                addr={addr}
                                key={addr.id}
                                selectAddress={selectAddress}
                                confirmDeliveryAddress={confirmDeliveryAddress}
                                onDeleteAddress={onDeleteAddress}
                                handleEditAddress={handleEditAddress}
                                setAddress={setAddress}
                                address={address}
                              />
                            );
                          })
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
                    <CheckoutStep
                      stepNumber={"+"}
                      title={"ADD NEW ADDRESS"}
                      active={false}
                      onClick={() => {
                        setAddnewaddress(!addnewaddress);
                      }}
                    />
                  )}
                </div>
              </Col>

              <Col>
                <div>place we dont deliver</div>
                <div>place we charge extra for deliver</div>
              </Col>
            </Row>

            <div className="payment-info">
              <h5>Payment Method</h5>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <CustomToggle eventKey="0" value="cash">
                    Cash on delivery
                  </CustomToggle>
                  <Accordion.Body>cash on delivery</Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <CustomToggle eventKey="1" value="card">
                    card on delivery
                  </CustomToggle>
                  <Accordion.Body>Pay By card on delivery</Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <CustomToggle eventKey="2" value="esewa">
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
                  label="I confirm that I am eighteen (18) years of age or older. I have read and agree to the website terms and conditions *"
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
          <Col className="oreder-summary">
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
