import { checkoutConstants } from "./constants";
import store from "../../store";
import { IoMdArrowDown } from "react-icons/io";

export const addAddress = (address) => {
  return async (dispatch) => {
    const {
      checkout: { useraddress },
    } = store.getState();

    const previousAddress = localStorage.getItem("userAddress");
    let addresses = [];
    if (previousAddress != null) {
      const previousAddressArray = JSON.parse(previousAddress);
      addresses = [...previousAddressArray, address];
      localStorage.setItem("userAddress", JSON.stringify(addresses));
    } else {
      addresses = [address];
      localStorage.setItem("userAddress", JSON.stringify(addresses));
    }
    dispatch({
      type: checkoutConstants.ADD_ADDRESS_SUCCESS,
      payload: addresses,
    });
  };
};

export const updateAddress = (address) => {
  return async (dispatch) => {
    console.log("update address");


    // update local storage address and update redux store address
    const localStorageAddress = localStorage.getItem("userAddress");
    const parseLocalStoreageAddress = JSON.parse(localStorageAddress);

    const updatedAddress = parseLocalStoreageAddress.map((addr) =>
      addr.id == address.id ? { ...address } : { ...addr }
    );

    localStorage.setItem("userAddress", JSON.stringify(updatedAddress));

    dispatch({
      type: checkoutConstants.EDIT_ADDRESS_SUCCESS,
      payload: updatedAddress,
    });
  };
};

export const populateUserAdress = () => {
  //fetch user address from local store and save it in redux.
  return async (dispatch) => {
    const {
      checkout: { useraddress },
    } = store.getState();

    const localStorageAddress = localStorage.getItem("userAddress");
    const parseLocalStoreageAddress = JSON.parse(localStorageAddress);
    // console.log({ parseLocalStoreageAddress });

    dispatch({
      type: checkoutConstants.ADD_ADDRESS_SUCCESS,
      payload: parseLocalStoreageAddress,
    });
  };
};

export const deleteAddress = (selectedAddress) => {
  return async (dispatch) => {
    //delete selected address from local storage and also update redux store.
    const localStorageAddress = localStorage.getItem("userAddress");
    const parseLocalStoreageAddress = JSON.parse(localStorageAddress);
    //remove selected address from localstorage and update it in redux and localstorage aswell.
    const filteredAddress = parseLocalStoreageAddress.filter((item) => {
      return item.id !== selectedAddress.id;
    });
    localStorage.setItem("userAddress", JSON.stringify(filteredAddress));

    //upate redux
    dispatch({
      type: checkoutConstants.DELETE_ADDRESS_SUCCESS,
      payload: filteredAddress,
    });
  };
};
