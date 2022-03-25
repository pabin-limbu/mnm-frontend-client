import React, { useState } from "react";
import { MaterialInput } from "../UI/MateralUi";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addAddress, updateAddress } from "../../store/actions";
import { nanoid } from "nanoid";
import "./style.css";

function AddressForm({ setAddnewaddress, addr, handleEditAddressCancel }) {
  const [name, setName] = useState(addr ? addr.name : "");
  const [mobileNumber, setMobileNumber] = useState(
    addr ? addr.mobileNumber : ""
  );
  const [address, setAddress] = useState(addr ? addr.address : "");
  const [locality, setLocality] = useState(addr ? addr.locality : "");
  const [cityDistrictTown, setCityDistrictTOwn] = useState(
    addr ? addr.cityDistrictTown : ""
  );
  const [landmark, setlandmark] = useState(addr ? addr.landmark : "");
  const [alternatePhoneNumber, setAternatePhoneNumber] = useState(
    addr ? addr.alternatePhoneNumber : ""
  );

  const dispatch = useDispatch();

  const submimtAddress = (addr) => {
    const userAddress = {
      id: addr ? addr.id : nanoid(),
      name,
      mobileNumber,
      address,
      locality,
      cityDistrictTown,
      landmark,
      alternatePhoneNumber,
      selected: true,
      edit: false,
    };
    //if addr then update else add
    if (!addr) {
      dispatch(addAddress(userAddress));
      setAddnewaddress(false);
    }
    if (addr) {
      console.log("hello");
      dispatch(updateAddress(userAddress));
      //NOTE: the edit form will close because the edit option in user address is been set to false.
    }

    // reset feilds.
    setName("");
    setMobileNumber("");
    setAddress("");
    setLocality("");
    setCityDistrictTOwn("");
    setlandmark("");
    setAternatePhoneNumber("");

    // localStorage.setItem("userAddress", JSON.stringify(userAddress));
  };

  const handleCancelAddress = () => {
    if (!addr) {
      setAddnewaddress(false);
    }
    if (addr) {
      handleEditAddressCancel(addr);
    }
  };

  return (
    <div className="addressform-container">
      <div className="addreform-title d-flex  justify-content-center align-items-center pt-2">
        <p>Delivery Address </p>
      </div>
      <MaterialInput
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></MaterialInput>
      <MaterialInput
        label="Mobile Number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
      ></MaterialInput>
      <MaterialInput
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      ></MaterialInput>
      <MaterialInput
        label="Locality"
        value={locality}
        onChange={(e) => setLocality(e.target.value)}
      ></MaterialInput>
      <MaterialInput
        label="City District Town"
        value={cityDistrictTown}
        onChange={(e) => setCityDistrictTOwn(e.target.value)}
      ></MaterialInput>
      <MaterialInput
        label="Landmark"
        value={landmark}
        onChange={(e) => setlandmark(e.target.value)}
      ></MaterialInput>
      <MaterialInput
        label="Alternate Phone Number"
        value={alternatePhoneNumber}
        onChange={(e) => setAternatePhoneNumber(e.target.value)}
      ></MaterialInput>

      <div className="addressformbutton-container mt-2 mb-4 ">
        <Button
          size="sm ms-2 me-4 ps-4 pe-4"
          variant="success"
          onClick={() => {
            submimtAddress(addr ? addr : null);
          }}
        >
          Save
        </Button>
        <Button
          size="sm ps-4 pe-4"
          variant="outline-info"
          onClick={() => {
            handleCancelAddress();
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default AddressForm;
