import React, { useReducer } from "react"
import { useNavigate } from "react-router-dom"
import Number from "./Components/Number.tsx"
import Operator from "./Components/Operator.tsx"
import { evaluate } from "./Components/evaluate.tsx"
import "./styles.css"

export interface AppState {
  now?: string | null
  history?: string | null
  historyList?: string[]
  operation?: string | null
  overwrite?: boolean
  count: number
}

interface AppAction {
  type: string
  payload?: any
}

export const CALC = {
  RESET: "reset",
  REMOVE: "remove",
  ADD: "add",
  OPERATION: "operation",
  EVALUATE: "evaluate"
}

function reducer(state: AppState, { type, payload }: AppAction): AppState {
  switch (type) {
    case CALC.ADD:
      if (state.overwrite) {
        return {
          ...state,
          now: payload.digit,
          overwrite: false
        }
      }

      if (state.now === "0" || state.now === "Err") {
        return {
          ...state,
          now: payload.digit
        }
      }

      if (
        (payload.digit === "0" && state.now === "0") ||
        state.now?.length === 18
      )
        return state

      if (
        state.now === "/" ||
        state.now === "x" ||
        state.now === "+" ||
        state.now === "-"
      ) {
        return {
          ...state,
          now: `${payload.digit}`
        }
      }
      return {
        ...state,
        now: `${state.now || ""}${payload.digit}`
      }

    case CALC.OPERATION:
      if (state.now == null && state.history == null) {
        return state
      }

      if (state.now == null) {
        return {
          ...state,
          count: 1,
          operation: payload.symbol
        }
      }

      if (state.history == null) {
        return {
          ...state,
          count: 1,
          operation: payload.symbol,
          history: state.now,
          now: payload.symbol
        }
      }
      let results = evaluate(state)
      if (state.count >= 1) {
        return {
          ...state,
          now: evaluate(state),
          overwrite: true,
          history: null,
          operation: null,
          historyList: state.historyList
          ? [...state.historyList, results]
          : [results],
          count: 0
        }
      }

      return {
        ...state,
        count: 1 + state.count,
        history: evaluate(state),
        now: payload.symbol,
        operation: payload.symbol
      }

    case CALC.REMOVE:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          now: "0"
        }
      }

      if (state.now == null) return state
      if (state.now.length === 1) {
        return {
          ...state,
          now: "0"
        }
      }

      return {
        ...state,
        now: state.now.slice(0, -1)
      }

    case CALC.RESET:
      return {
        ...state,
        now: "0",
        history: null,
        operation:null
      }

    case CALC.EVALUATE:
      if (
        state.operation == null ||
        state.now == null ||
        state.history == null
      ) {
        return state
      }

      let result = evaluate(state)

      if (state.count > 1) {
        result = "Err"
        return {
          ...state,
          now: result,
          count: 0
        }
      }

      if (result === "Err") {
        return {
          ...state,
          overwrite: true,
          history: null,
          operation: null,
          now: result
        }
      }
      return {
        ...state,
        overwrite: true,
        history: null,
        operation: null,
        now: result,
        historyList: state.historyList
          ? [...state.historyList, result]
          : [result]
      }

    default:
      return state
  }
}

function App() {
  const [{ now, historyList }, dispatch] = useReducer(reducer, {
    now: "0",
    count: 0
  })
  const routeLink = useNavigate()
  const handleSupportButton = () => {
    routeLink("/support-page")
  }
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="history">
          <div className="history-list">
            {historyList &&
              historyList.map((item, index) => <div key={index}>{item}</div>)}
          </div>
        </div>

        <div className="now"> {now}</div>
      </div>
      <button
        onClick={() =>
          dispatch({
            type: CALC.RESET,
            payload: undefined
          })
        }
      >
        C
      </button>
      <button
        onClick={() =>
          dispatch({
            type: CALC.REMOVE,
            payload: undefined
          })
        }
      >
        DEL
      </button>
      <button className="qmark" onClick={handleSupportButton}>
        ?
      </button>
      <Operator symbol="/" dispatch={dispatch} />
      <Number digit="1" dispatch={dispatch} className="" />
      <Number digit="2" dispatch={dispatch} className="" />
      <Number digit="3" dispatch={dispatch} className="" />
      <Operator symbol="x" dispatch={dispatch} />
      <Number digit="4" dispatch={dispatch} className="" />
      <Number digit="5" dispatch={dispatch} className="" />
      <Number digit="6" dispatch={dispatch} className="" />
      <Operator symbol="-" dispatch={dispatch} />
      <Number digit="7" dispatch={dispatch} className="" />
      <Number digit="8" dispatch={dispatch} className="" />
      <Number digit="9" dispatch={dispatch} className="" />
      <Operator symbol="+" dispatch={dispatch} />
      <Number digit="0" dispatch={dispatch} className="" />
      <button
        className="operator span-two bottom"
        onClick={() =>
          dispatch({
            type: CALC.EVALUATE,
            payload: undefined
          })
        }
      >
        =
      </button>
    </div>
  )
}

export default App
