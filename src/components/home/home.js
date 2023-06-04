import React, { useEffect, useRef, useState } from "react";
import "./home.css";
import InputField from "../common-components/input-field/inputField";
import MessageModal from "../common-components/message-modal/messageModal";

export default function Home() {
  const [inputOne, setInputOne] = useState();
  const [inputTwo, setInputTwo] = useState();
  const [unitRateOne, setUnitRateOne] = useState();
  const [unitRateTwo, setUnitRateTwo] = useState();
  const [finalValueOne, setFinalValueOne] = useState();
  const [finalValueTwo, setFinalValueTwo] = useState();
  const [modalShow, setModalShow] = useState(false);
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
      prevInputOne.current = inputOne;
      prevRateOne.current = unitRateOne;
      prevRateTwo.current = unitRateTwo;
      const convertedAmount = inputOne / exchangeRatio;
      const roundedAmount = Number(convertedAmount.toFixed(2));
      setFinalValueTwo(roundedAmount);
      console.log(roundedAmount, "displayed input12");
      setFinalValueOne(inputOne);
    }
    if (inputTwo !== prevInputTwo.current) {
      prevInputTwo.current = inputTwo;
      const convertedAmount = inputTwo * exchangeRatio;
      const roundedAmount = Number(convertedAmount.toFixed(2));
      setFinalValueOne(roundedAmount);
      console.log(inputTwo, "displayed input2");
      setFinalValueTwo(inputTwo);
      setInputOne(roundedAmount);
      prevInputOne.current = roundedAmount;
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
    console.log(childValue, "input1 value");
  }
  function valueTwo(childValue) {
    setInputTwo(childValue);
    console.log(childValue, "input2 value");
  }

  function handleModal(modalState) {
    setModalShow(modalState);
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
            handleModal={handleModal}
          />
        </div>
        <div className="inputContainer">
          <InputField
            handleExchange={unitExchangeRateTwo}
            handleValue={valueTwo}
            handleFinalValue={finalValueTwo}
            handleModal={handleModal}
          />
        </div>
      </div>
      <MessageModal showModal={modalShow} />
    </div>
  );
}
