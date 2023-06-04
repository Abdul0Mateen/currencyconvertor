import React, { useEffect, useRef, useState } from "react";
import "./home.css";
import InputField from "../common-components/input-field/inputField";

export default function Home() {
  const [inputOne, setInputOne] = useState();
  const [inputTwo, setInputTwo] = useState();
  const [unitRateOne, setUnitRateOne] = useState();
  const [unitRateTwo, setUnitRateTwo] = useState();
  const [finalValueOne, setFinalValueOne] = useState();
  const [finalValueTwo, setFinalValueTwo] = useState();
  const prevInputOne = useRef("");
  const prevInputTwo = useRef("");
  const prevRateOne = useRef("");
  const prevRateTwo = useRef("");
  useEffect(() => {
    const exchangeRatio = unitRateOne / unitRateTwo;
    if (
      inputOne !== prevInputOne.current ||
      unitRateOne !== prevRateOne.current ||
      unitRateTwo !== prevRateTwo.current
    ) {
      handleChangeInputOne(exchangeRatio);
    }
    if (inputTwo !== prevInputTwo.current) {
      handleChangeInputTwo(exchangeRatio);
    }
  }, [inputOne, unitRateOne, unitRateTwo, inputTwo]);

  function unitExchangeRateOne(unitValue) {
    setUnitRateOne(unitValue);
  }
  function unitExchangeRateTwo(unitValue) {
    setUnitRateTwo(unitValue);
  }
  function valueOne(childValue) {
    setInputOne(childValue);
  }
  function valueTwo(childValue) {
    setInputTwo(childValue);
  }
  function handleChangeInputOne(exchangeRatio) {
    prevInputOne.current = inputOne;
    prevRateOne.current = unitRateOne;
    prevRateTwo.current = unitRateTwo;
    const convertedAmount = inputOne / exchangeRatio;
    const roundedAmount = Number(convertedAmount.toFixed(2));
    setFinalValueTwo(roundedAmount);
    setFinalValueOne(inputOne);
  }
  function handleChangeInputTwo(exchangeRatio) {
    prevInputTwo.current = inputTwo;
    const convertedAmount = inputTwo * exchangeRatio;
    const roundedAmount = Number(convertedAmount.toFixed(2));
    setFinalValueOne(roundedAmount);
    setFinalValueTwo(inputTwo);
    setInputOne(roundedAmount);
  }
  return (
    <div className="homeContainer">
      <div className="homeHeading">
        <h1>Currency Convertor</h1>
      </div>

      <div className="inputWrapper">
        <div className="inputContainer">
          <InputField
            defaultFocus={true}
            handleValue={valueOne}
            handleExchange={unitExchangeRateOne}
            handleFinalValue={finalValueOne}
          />
        </div>
        <div className="inputContainer">
          <InputField
            handleExchange={unitExchangeRateTwo}
            handleValue={valueTwo}
            handleFinalValue={finalValueTwo}
          />
        </div>
      </div>
    </div>
  );
}
