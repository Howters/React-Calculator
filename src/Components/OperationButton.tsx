import React from "react"
import { ACTIONS } from "../App.tsx"
function OperationButton({ dispatch, symbol }) {
  return (
    <button
      className="operator"
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { symbol } })
      }
    >
      {symbol}
    </button>
  )
}
export default OperationButton
