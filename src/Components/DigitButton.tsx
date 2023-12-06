import React from "react";
import { ACTIONS } from "../App.tsx"

export default function DigitButton({ dispatch, digit, className }) {
  return (
    <button
      className={digit === "0" ? `span-two bottom ${className}` : className}
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
