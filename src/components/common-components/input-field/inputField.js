import React, { useEffect, useRef, useState } from "react";
import "./inputField.css";
import axios from "axios";
import { apiBaseURL } from "../../../auth/baseUrl";
import { apiAccessKey } from "../../../auth/accessKey";
import dropIcon from "../../../assets/images/down-filled-triangular-arrow.png";
import upIcon from "../../../assets/images/triangular-filled-up-arrow.png";
import searchIcon from "../../../assets/images/search-interface-symbol.png";
import { exchangeRate } from "../../../assets/exchangeRate";
import { currencySymbol } from "../../../assets/symbolsData";

export default function InputField({
  handleValue,
  handleExchange,
  handleFinalValue,
  defaultFocus,
  handleModal,
}) {
  const dropRef = useRef(null);
  const [currencySymbol, setCurrencySymbol] = useState({});
  const [exchangeRate, setExchangeRate] = useState({});
  const [openMenu, setOpenMenu] = useState(false);
  const [filterData, setFilterData] = useState(currencySymbol);
  const [value, setValue] = useState("");
  const [error, setError] = useState(" ");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  // Evoking the api function
  useEffect(() => {
    getExchangeRate();
    getCurrency();
  }, []);
  // handling outside clicking to close the currency dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropRef.current && !dropRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  //Real-time exchange rate from api
  useEffect(() => {
    const getData = setTimeout(() => {
      getExchangeRate();
    }, 2000);
    return () => clearTimeout(getData);
  }, [value]);
  // Getting all the exchange rate base on EURO
  async function getExchangeRate() {
    try {
      const apiResponse = await axios.get(
        `${apiBaseURL}latest?access_key=${apiAccessKey}`
      );
      if (apiResponse.data.success) {
        setExchangeRate(apiResponse.data.rates);
        handleModal(false);
      } else {
        handleModal(true);
      }
    } catch (error) {
      handleModal(true);
      console.log(error);
    }
  }
  // Getting all the currencies and symbols
  async function getCurrency() {
    try {
      const apiResponse = await axios.get(
        `${apiBaseURL}symbols?access_key=${apiAccessKey}`
      );
      if (apiResponse.data.success) {
        setCurrencySymbol(apiResponse.data.symbols);
        setFilterData(apiResponse.data.symbols);
        handleModal(false);
      } else {
        handleModal(true);
      }
    } catch (error) {
      handleModal(true);
      console.log(error);
    }
  }
  // handling currency selected by user
  function handleCurrencySelect(selectedSymbol) {
    setSelectedCurrency(selectedSymbol);
    setOpenMenu(false);
    setFilterData(currencySymbol);
    handleExchange(exchangeRate[selectedSymbol]);
  }
  // handling amount to be converted entered by user
  function handleInputChange(e) {
    if (/^\d*\.?\d*$/.test(e.target.value)) {
      handleValue(e.target.value);
      setValue(e.target.value);
      setError("");
    } else {
      setError("Invalid Input. Enter numbers only");
    }
  }
  // handling currency dropdown
  function handleDropDown() {
    setOpenMenu(!openMenu);
  }
  // Searchbar function in currency dropdown menu
  function handleSearchInput(e) {
    const searchValue = e.target.value;
    const filterObj = Object.fromEntries(
      Object.entries(currencySymbol).filter(
        ([key, value]) =>
          key.toLowerCase().includes(searchValue.toLowerCase()) ||
          value.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setFilterData(filterObj);
  }

  return (
    <div>
      <div className="inputFieldContainer">
        <input
          autoFocus={defaultFocus}
          className="amountInput"
          placeholder="Enter value"
          value={handleFinalValue >= 0 ? handleFinalValue : value}
          onChange={handleInputChange}
        />
        <div className="borderContainer"></div>
        <div className="dropDownWrapper" ref={dropRef}>
          <div className="dropDownBtn">
            <button onClick={handleDropDown}>
              {selectedCurrency ? selectedCurrency : "Select Currency"}
            </button>
            {openMenu ? (
              <img src={upIcon} alt="drop-icon" />
            ) : (
              <img src={dropIcon} alt="up-icon" />
            )}
          </div>
          {openMenu && (
            <div className="dropDownMenu">
              <div className="searchBarWrapper">
                <input
                  autoFocus
                  className="searchBar"
                  onChange={handleSearchInput}
                />
                <img src={searchIcon} alt="search-icon" />
              </div>
              <ul>
                {Object.entries(filterData).map(([key, value], index) => (
                  <li
                    style={
                      selectedCurrency === key
                        ? { backgroundColor: "#005cff26" }
                        : {}
                    }
                    key={index}
                    onClick={() => handleCurrencySelect(key)}
                  >
                    {key}: {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="errorMessage">
        <p>{error}</p>
      </div>
    </div>
  );
}
