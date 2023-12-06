import React from "react"
import { CALC } from "../App.tsx"

export default function Number({ dispatch, digit, className }) {
  return (
    <button
      className={digit === "0" ? `span-two bottom ${className}` : className}
      onClick={() => dispatch({ type: CALC.ADD, payload: { digit } })}
    >
      {digit}
    </button>
  )
}
