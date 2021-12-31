import React, { useState } from "react";
import { MaterialInput } from "../MateralUi";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  addAddress,
  updateAddress,
} from "../../../store/actions/checkout.action";
import { nanoid } from "nanoid";
import "./style.css";

function AddressForm({ setAddnewaddress, addr }) {
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
      selected: false,
      edit: false,
    };
    //if addr then update else add
    if (!addr) {
      dispatch(addAddress(userAddress));
      setAddnewaddress(false);
    } else {
      dispatch(updateAddress(userAddress));
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

  return (
    <div className="addressform-container">
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
      <Button
        onClick={() => {
          submimtAddress(addr ? addr : null);
        }}
      >
        Save
      </Button>
      <Button
        onClick={() => {
          setAddnewaddress(false);
        }}
      >
        Cancel
      </Button>
    </div>
  );
}

export default AddressForm;
