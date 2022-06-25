import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Row,
  Col,
  Navbar,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import OrderSummary from "../../components/OrderSummary";
import AddressForm from "../../components/checkoutComponents/AddressForm";
import { populateUserAdress, deleteAddress } from "../../store/actions";
import { addOrder } from "../../store/actions";
import ErrorAlert from "../../components/UI/ErrorAlert";
import CheckoutStep from "../../components/checkoutComponents/CheckoutStep";
import Address from "../../components/checkoutComponents/Address";
import "./style.css";
import ItemSummaryAccordian from "../../components/checkoutComponents/ItemSummaryAccordian";
import PaymentAccordian from "../../components/checkoutComponents/PaymentAccordian";
import CheckoutFooter from "../../components/checkoutComponents/CheckoutFooter";

function CheckOutPage(props) {
  const [allCartItems, setAllCartItems] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [ageConfirmation, setAgeConfirmation] = useState(false);
  const [payment, setPayment] = useState("cash");
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  //fetch all user address from redux.
  const userAddresses = useSelector((state) => state.checkout.useraddress);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const items = cart.cartItems;
    setAllCartItems(items);
  }, [cart]);

  //set item subtotal.
  useEffect(() => {
    if (Object.keys(allCartItems).length > 0) {
      calculateSubTotal(allCartItems);
    }
  }, [allCartItems]);

  useEffect(() => {
    dispatch(populateUserAdress());
  }, []);

  useEffect(() => {
    setAddresses(userAddresses);
  }, [userAddresses]);

  //item subtotal.
  function calculateSubTotal(allCartItems) {
    let totalsum = 0;
    Object.keys(allCartItems).forEach((item, index) => {
      //item overall price depend on quantity.
      let itemTotalPriceIncQnt =
        allCartItems[item].price * allCartItems[item].qty;
      totalsum = totalsum + itemTotalPriceIncQnt;
    });
    setSubTotal(totalsum);
  }

  //select delivery address
  const confirmDeliveryAddress = (address) => {
    setSelectedAddress(address);
    setConfirmAddress(true);
  };

  const handleEditAddressCancel = (address) => {
    if (address) {
      const updatedAddress = addresses.map((adr) =>
        adr.id === address.id ? { ...adr, edit: false } : { ...adr }
      );
      setAddresses(updatedAddress);
    }
  };
  const onDeleteAddress = (addr) => {
    dispatch(deleteAddress(addr));
  };
  const handleCheckoutSubmit = () => {
    //check address selected
    switch (currentStep) {
      case 1:
        if (confirmAddress) {
          setShowAlert(false);
          setCurrentStep(2);
        }
        if (!confirmAddress) {
          setErrorMessage("*Select delivery address");
          setShowAlert(true);
        }

        break;
      case 2:
        console.log("sstep 2 completed");
        if (!ageConfirmation) {
          setErrorMessage("* You Must agree the terms and condition");
          setShowAlert(true);
        }
        if (ageConfirmation) {
          // order total amount
          const totalAmount = Object.keys(cart.cartItems).reduce(
            (totalPrice, key) => {
              const { price, qty } = cart.cartItems[key];
              return totalPrice + price * qty;
            },
            0
          );
          //order items in array.
          const items = Object.keys(cart.cartItems).map((key) => ({
            productId: key,
            name: cart.cartItems[key].name,
            category: cart.cartItems[key].category,
            payablePrice: cart.cartItems[key].price,
            purchasedQty: cart.cartItems[key].qty,
          }));

          //order payload.
          const payload = {
            name: selectedAddress.name,
            selectedAddress,
            totalAmount,
            cartItems: items,
            ageConfirmation,
            paymentStatus: "pending",
            payment,
          };

          dispatch(addOrder(payload)).then((res) => {
            if (res.status === 200) {
              const location = {
                pathname: `/success-order`,
                search: `?oid=${res.data.orderid}`,
              };
              props.history.push(location);
            }
          });
        }
        break;

      case 3:
        console.log("case 3 reached");
        break;
    }
  };
  const handleCheckoutBack = (props) => {
    switch (currentStep) {
      case 1:
        props.history && props.history.push("/cart");
        break;
      case 2:
        setCurrentStep(1);
        break;
    }
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
              <Alert show={false} variant="info">
                {" "}
                Order Has been successfully made.
              </Alert>
            </div>
            <div>
              <ErrorAlert
                message={errorMessage}
                variant={"light"}
                dismissible={false}
                show={showAlert}
                onClose={() => setShowAlert(false)}
              ></ErrorAlert>
            </div>
          </Col>
        </Row>
      </Container>

      {/* check out step */}
      <Container className="">
        <Row>
          <Col xs={12}>
            <ItemSummaryAccordian title="Items to Order" subTotal={subTotal}>
              <OrderSummary
                viewOnly
                setAllCartItems={setAllCartItems}
                allCartItems={allCartItems}
                subTotal={subTotal}
              ></OrderSummary>
            </ItemSummaryAccordian>
          </Col>

          <Col sm={12} className="oreder-details">
            <Row>
              <Col sm={12}>
                <div>
                  <CheckoutStep
                    currentStep={currentStep}
                    stepNumber={1}
                    title={"DELIVERY ADDRESS"}
                    active={!confirmAddress}
                    body={
                      <>
                        {confirmAddress ? (
                          <div className="finaladdress">
                            <p>
                              <span>
                                {" "}
                                {`${selectedAddress.name} - ${selectedAddress.mobileNumber}`}{" "}
                              </span>
                              <span
                                style={{
                                  borderLeft: "1px solid white",
                                  padding: "0 4px",
                                }}
                              >
                                {selectedAddress.address}{" "}
                                {selectedAddress.locality}{" "}
                                {selectedAddress.alternatePhoneNumber}{" "}
                              </span>
                            </p>
                            <span
                              className="finaladdressclose"
                              onClick={() => {
                                setConfirmAddress(false);
                              }}
                            >
                              {" "}
                              X{" "}
                            </span>
                          </div>
                        ) : addresses && addresses.length > 0 ? (
                          <div className="delevery-address">
                            {addresses.map((address) => {
                              return (
                                <Address
                                  address={address}
                                  key={address.id}
                                  confirmDeliveryAddress={
                                    confirmDeliveryAddress
                                  }
                                  onDeleteAddress={onDeleteAddress}
                                  setShowAddAddressModal={
                                    setShowAddAddressModal
                                  }
                                  setAddresses={setAddresses}
                                  addresses={addresses}
                                  handleEditAddressCancel={
                                    handleEditAddressCancel
                                  }
                                />
                              );
                            })}
                          </div>
                        ) : null}

                        <div className="addnew-deleveryaddress">
                          {showAddAddressModal ? (
                            <AddressForm
                              setShowAddAddressModal={setShowAddAddressModal}
                            />
                          ) : (
                            <Button
                              size="sm"
                              variant="outline-dark"
                              className="add-address-button mt-3 mb-4"
                              onClick={() => {
                                setShowAddAddressModal(!showAddAddressModal);
                              }}
                            >
                              + Add new address
                            </Button>
                          )}
                        </div>
                      </>
                    }
                  />
                </div>
              </Col>

              <Col xs={12}>
                <CheckoutStep
                  currentStep={currentStep}
                  stepNumber={2}
                  title={"PAYMENT METHOD "}
                  active={!confirmPayment}
                  body={
                    <>
                      <div className="payment-info">
                        <PaymentAccordian setPayment={setPayment} />
                      </div>
                      <div className="age-confirmation">
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicCheckbox"
                        >
                          <Form.Check
                            onChange={(e) => {
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
                    </>
                  }
                ></CheckoutStep>
              </Col>
              <Col xs={12}>
                <div className={`checkout-controls-btn-container`}>
                  <Button
                    className="checkoutbtnback w-50"
                    size="lg"
                    variant="secondary"
                    onClick={() => {
                      handleCheckoutBack(props);
                    }}
                  >
                    {`${
                      currentStep == 1
                        ? "cart"
                        : currentStep == 2
                        ? "<< Select Address"
                        : "continue shopping"
                    }`}
                  </Button>
                  <Button
                    size="lg"
                    variant="warning"
                    className="checkoutbtnnext w-50"
                    onClick={() => {
                      handleCheckoutSubmit(props);
                    }}
                  >
                    {`${
                      currentStep == 1
                        ? "proceed >>"
                        : currentStep == 2
                        ? "Confirm Order >>"
                        : ""
                    }`}
                  </Button>
                </div>
              </Col>
              <Col>
                <CheckoutFooter />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CheckOutPage;
{
}
