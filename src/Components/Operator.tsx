import React from "react"
import { CALC } from "../App.tsx"
function Operator({ dispatch, symbol }) {
  return (
    <button
      className="operator"
      onClick={() => dispatch({ type: CALC.OPERATION, payload: { symbol } })}
    >
      {symbol}
    </button>
  )
}
export default Operator
