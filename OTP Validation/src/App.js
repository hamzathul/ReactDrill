import { useEffect, useRef } from "react";
import { useState } from "react";
import "./styles.css";

export default function App() {
  const NO_OF_OTP = 5;
  const [otps, setOtps] = useState(new Array(NO_OF_OTP).fill(""));

  const inputRef = useRef([]);

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newValue = value.trim();
    const newArr = [...otps];
    newArr[index] = newValue.slice(-1);
    setOtps(newArr);

    newValue && inputRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (!e.target.value && e.key == "Backspace") {
      inputRef.current[index - 1]?.focus();
    }
  };
  return (
    <div className="App">
      <h1>OTP Validator</h1>
      {otps.map((otp, index) => (
        <input
          type="text"
          key={index}
          className="otp-box"
          value={otp}
          ref={(input) => (inputRef.current[index] = input)}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
}
