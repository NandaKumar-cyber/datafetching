import React, { useState } from 'react';
import fees from './fees.json';

const FeeCalculator = () => {
  // State variables for selected options
  const [selectedFee, setSelectedFee] = useState(null);
  const [selectedNationality, setSelectedNationality] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  // Helper function to get the fee amount
  const getFeeAmount = () => {
    const fee = selectedFee[selectedNationality][selectedCourse][selectedLevel];
    let amount = fee.amount
    if (selectedNationality === "INDIAN" || selectedNationality === "SAARC") {
      amount = amount + 18
    } else if (selectedNationality === "FOREIGN" || selectedNationality === "NRI") {
      amount = amount + 28
    }
    return amount
  };

  // Handler functions for selecting options
  const handleFeeSelect = (fee) => {
    setSelectedFee(fee);
    setSelectedNationality(null);
    setSelectedCourse(null);
    setSelectedLevel(null);

  };
  const handleNationalitySelect = (nationality) => {
    setSelectedNationality(nationality);
    setSelectedCourse(null);
    setSelectedLevel(null);
  };
  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setSelectedLevel(null);
  };
  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };


  // Render the component
  return (
    <div>
      <h1>Fee Calculator</h1>

      {/* Select fee */}
      {selectedFee === null && (
        <div>
          <h2>Select a fee:</h2>
          {Object.keys(fees).map((fee, index) => (
            <button key={index} onClick={() => handleFeeSelect(fees[fee])}>
              {fee}
            </button>
          ))}
        </div>
      )}

      {/* Select nationality */}
      {selectedFee !== null && selectedNationality === null && (
        <div>
          <h2>Select a nationality:</h2>
          {Object.keys(selectedFee).map((nationality, index) => (
            <button key={index} onClick={() => handleNationalitySelect(nationality)}>
              {nationality}
            </button>
          ))}
        </div>
      )}

      {/* Select course */}
       {selectedNationality !== null && selectedCourse === null && (
        <div>
          <h2>Select a course:</h2>
          {Object.keys(selectedFee[selectedNationality]).map((course, index) => (
            <button key={index} onClick={() => handleCourseSelect(course)}>
              {course === 'Medical, Dental, Ayurveda' ? 'ALL' : course}
            </button>
          ))}
        </div>
      )} 



      {/* Select level */}
      {selectedCourse !== null && selectedLevel === null && (
        <div>
          <h2>Select a level:</h2>
          {Object.keys(selectedFee[selectedNationality][selectedCourse]).map((level, index) => (
            <button key={index} onClick={() => handleLevelSelect(level)}>
              {level === 'ALL_LEVEL' ? 'UG, PG, DIPLOMA, Ph.D' : level}
            </button>
          ))}
        </div>
      )}

      {/* Display fee amount */}
      {selectedLevel !== null && (
        <div>
          <h2>Fee amount:</h2>
          <p>{getFeeAmount()}</p>
        </div>
      )}
    </div>
  );
};

export default FeeCalculator;
