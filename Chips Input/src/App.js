import React, { useState } from "react";
import "./styles.css";
function ChipsInput() {
  const [input, setInput] = useState("");
  const [chips, setChips] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      setChips([...chips, input]);
      setInput("");
    }
  };

  const handleDelete = (index) => {
    const copyChips = [...chips];
    copyChips.splice(index, 1);
    setChips([...copyChips]);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "40px 0",
      }}
    >
      <h2>Chips Input</h2>
      <input
        type="text"
        placeholder="Type a chip and press tag"
        style={{ padding: "8px", width: "200px" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <div style={{ display: "flex" }}>
        {chips.map((c, index) => (
          <div
            style={{
              background: "grey",
              color: "white",
              padding: "5px",
              margin: "5px",
            }}
          >
            {c}
            <button
              style={{ margin: "5px" }}
              onClick={() => handleDelete(index)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChipsInput;
