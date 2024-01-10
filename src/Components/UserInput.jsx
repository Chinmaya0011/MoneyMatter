// UserInput.js
import React, { useState } from 'react';
import '../Styles/Body.css';
import Display from './Display';

function UserInput() {
  // State variables to hold user input and calculated values
  const [initial, setInitial] = useState(5000);
  const [annual, setAnnual] = useState(500);
  const [expected, setExpected] = useState(2);
  const [duration, setDuration] = useState(5);
  const [inflation, setInflation] = useState(3);
  const [yearDataArray, setYearDataArray] = useState([]);

  // Event handlers for input fields
  const handleInitial = (e) => {
    setInitial(parseInt(e.target.value, 10));
  };

  const handleAnnual = (e) => {
    setAnnual(parseInt(e.target.value, 10));
  };

  const handleExpected = (e) => {
    setExpected(parseFloat(e.target.value));
  };

  const handleDuration = (e) => {
    setDuration(parseInt(e.target.value, 10));
  };

  const handleInflation = (e) => {
    setInflation(parseFloat(e.target.value));
  };

 
  const userInputData = {
    initial,
    annual,
    expected,
    duration,
    inflation,
  };
      const yourTotalInvested=initial+(annual*duration)

  function calculateYearData(year, previousTotalInterest, previousFinalValue) {
    // Calculate total invested amount for the current year
    const totalInvested = year === 1 ? initial + annual : previousFinalValue + annual;
  
    // Calculate annual interest based on the total invested amount for the current year
    const annualInterest = totalInvested * (expected / 100);
  
    // Calculate total interest earned so far
    const totalInterestEarned = annualInterest + previousTotalInterest;
  
    // Calculate inflation-adjusted final value
    const inflationAdjustedFinalValue = totalInvested + annualInterest;
  
    // Calculate final value with inflation adjustment from the second year onwards
    const finalValue =inflationAdjustedFinalValue * (1 - inflation / 100);
  
    // Return an object with calculated values
    return {
      year,
      investedCapital: Math.ceil(totalInvested),
      interest: Math.ceil(annualInterest),
      investmentValue: Math.ceil(finalValue),
      totalInterest: Math.ceil(totalInterestEarned),
      inflationAdjustedFinalValue: Math.ceil(inflationAdjustedFinalValue),
    };
  }
  
  
  function handleCalculate() {
    let cumulativeTotalInterest = 0;
    let cumulativeFinalValue = 0;
    const calculatedYearDataArray = [];
  
    const numberOfYearsToCalculate = Math.min(100, duration);
  
    for (let i = 1; i <= numberOfYearsToCalculate; i++) {
      const yearData = calculateYearData(i, cumulativeTotalInterest, cumulativeFinalValue);
      cumulativeTotalInterest = yearData.totalInterest;
      cumulativeFinalValue = yearData.investmentValue;
  
      calculatedYearDataArray.push(yearData);
    }
  
    setYearDataArray(calculatedYearDataArray);
  }
  

  // Render the user input form and the Display component
  return (
    <>
      <div className='container'>
        {/* Input fields with range inputs */}
        <div className="investment-input">
          <label htmlFor="initial_investment">Initial Investment</label>
          <input type="range" id="initial_investment" name="initial_investment" value={initial} min={5000} max={50000} step={5000} onChange={handleInitial} />
          <span>{initial}</span>
        </div>

        <div className="investment-input">
          <label htmlFor="annual_investment">Annual Investment</label>
          <input type="range" id="annual_investment" name="annual_investment" value={annual} min={0} max={2000} step={100} onChange={handleAnnual} />
          <span>{annual}</span>
        </div>

        <div className="investment-input">
          <label htmlFor="expected_return">Expected Return</label>
          <input type="range" id="expected_return" name="expected_return" value={expected} min={2} max={20} step={0.5} onChange={handleExpected} />
          <span>{expected}</span>
        </div>

        <div className="investment-input">
          <label htmlFor="duration">Duration</label>
          <input type="range" id="duration" name="duration" value={duration} min={5} max={30} step={1} onChange={handleDuration} />
          <span>{duration}</span>
        </div>

        <div className="investment-input">
          <label htmlFor="inflation_rate">Inflation Rate</label>
          <input type="range" id="inflation_rate" name="inflation_rate" value={inflation} min={0} max={10} step={0.1} onChange={handleInflation} />
          <span>{inflation}</span>
        </div>

        {/* Button to trigger calculation */}
        <button className='calculate' onClick={handleCalculate}>Calculate</button>
      </div>

      {/* Display component to show calculated values */}
      {yearDataArray.length > 0 && <Display yourTotalInvested={yourTotalInvested} data={yearDataArray} userInputData={userInputData}/>}
    </>
  );
}

export default UserInput;
