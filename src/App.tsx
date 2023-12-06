import React, { useReducer } from "react"
import { useNavigate } from 'react-router-dom';
import DigitButton from "./Components/DigitButton.tsx"
import OperationButton from "./Components/OperationButton.tsx"
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

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  CHOOSE_OPERATION: "choose-operation",
  EVALUATE: "evaluate"
}

function reducer(state: AppState, { type, payload }: AppAction): AppState {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
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

    case ACTIONS.CHOOSE_OPERATION:
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

      return {
        ...state,
        count: 1 + state.count,
        history: evaluate(state),
        now: payload.symbol,
        operation: payload.symbol
      }

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          now: null
        }
      }

      if (state.now == null) return state
      if (state.now.length === 1) {
        return {
          ...state,
          now: null
        }
      }

      return {
        ...state,
        now: state.now.slice(0, -1)
      }

    case ACTIONS.CLEAR:
      return {
        ...state,
        now: " ",
        history: ""
      }

    case ACTIONS.EVALUATE:
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
          now: result,
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
  const routeLink = useNavigate();
  const handleSupportButton = () => {
    routeLink('/supportPage');
  };
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
            type: ACTIONS.CLEAR,
            payload: undefined
          })
        }
      >
        C
      </button>
      <button
        onClick={() =>
          dispatch({
            type: ACTIONS.DELETE_DIGIT,
            payload: undefined
          })
        }
      >
        DEL
      </button>
      <button className="qmark" onClick={handleSupportButton}>?</button>
      <OperationButton symbol="/" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} className="" />
      <DigitButton digit="2" dispatch={dispatch} className="" />
      <DigitButton digit="3" dispatch={dispatch} className="" />
      <OperationButton symbol="x" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} className="" />
      <DigitButton digit="5" dispatch={dispatch} className="" />
      <DigitButton digit="6" dispatch={dispatch} className="" />
      <OperationButton symbol="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} className="" />
      <DigitButton digit="8" dispatch={dispatch} className="" />
      <DigitButton digit="9" dispatch={dispatch} className="" />
      <OperationButton symbol="-" dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} className="" />
      <button
        className="operator span-two bottom"
        onClick={() =>
          dispatch({
            type: ACTIONS.EVALUATE,
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
