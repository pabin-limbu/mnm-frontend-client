import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import AddressForm from "../AddressForm";
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";

function Address({
  address,
  confirmDeliveryAddress,
  onDeleteAddress,
  addresses,
  setAddresses,
  setShowAddAddressModal,
  handleEditAddressCancel,
}) {
  //on address radio select
  const handleSelectAddressRadio = (addresses, address) => {
    const updatedAddress = addresses.map((adr) =>
      adr.id === address.id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddresses(updatedAddress);
  };

  //Edit address
  const handleEditAddress = (address, addresses) => {
    // create new address array with edit property and set it true.
    const updatedAddress = addresses.map((adr) =>
      adr.id === address.id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddresses(updatedAddress);
  };

  return (
    <div className="addresscontainer">
      <Row>
        <Col xs={1} className={address.edit ? "d-none" : ""}>
          {" "}
          <div className="ps-2 d-flex justify-content-center align-items-center h-100">
            <input
              name="address"
              onClick={() => handleSelectAddressRadio(addresses, address)}
              type="radio"
              value={address.name}
              checked={address.selected === true ? "checked" : null}
            />
          </div>
        </Col>

        <Col xs={address.edit ? 12 : 11}>
          {!address.edit ? (
            //Current adddress.edit === false.
            <Row className="delevery-address-summary">
              <Col xs={8}>
                <div>
                  <span className="addressName">{address.name} </span>
                  <span className="addressType">{address.addressType}</span>
                  <span className="addressMobileNumber">
                    {address.mobileNumber}
                  </span>
                </div>
                <div className="fullAddress">
                  {address.address} <br />{" "}
                  {`${address.locality} - ${address.mobileNumber}`}
                </div>
              </Col>
              <Col xs={4}>
                <Row className="delevery-address-controls">
                  <Col xs={12}>
                    <div className="d-flex justify-content-end align-items-center h-100 pe-md-3">
                      {address.selected && (
                        <Button
                          className=" mt-2 "
                          size="sm"
                          variant="warning"
                          onClick={() => {
                            handleEditAddress(address, addresses);
                          }}
                        >
                          <IoCreateOutline />
                        </Button>
                      )}
                      {address.selected && (
                        <Button
                          className=" mt-2 ms-2"
                          size="sm"
                          variant="danger"
                          onClick={() => {
                            onDeleteAddress(address);
                          }}
                        >
                          <IoTrashOutline />
                        </Button>
                      )}
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="d-flex justify-content-end align-items-center mt-2 pe-md-3">
                      {address.selected && (
                        <Button
                          variant="success"
                          onClick={() => confirmDeliveryAddress(address)}
                          size="sm"
                        >
                          Deliver here
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
              setAddress={setAddresses}
              addresses={addresses}
              setShowAddAddressModal={setShowAddAddressModal}
              handleEditAddressCancel={handleEditAddressCancel}
            />
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Address;
