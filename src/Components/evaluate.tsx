import { AppState } from '../App.tsx'; 
export function evaluate({ now, history, historyList, operation}: AppState): string {
  const prev = parseFloat(history || '0');
  const curr = parseFloat(now || '0');
  if (isNaN(prev) || isNaN(curr)) return "";
  let computation = "";

  switch (operation) {
    case "+":
      computation = (prev + curr).toString();
      break;
    case "-":
      computation = (prev - curr).toString();
      break;
    case "/":
      if (curr === 0){
        computation = "Err";
        break;
      }
      computation = (prev / curr).toString();
      break;
    case "x":
      computation = (prev * curr).toString();
      break;
  }
  computation = computation.substring(0, 18);

  return computation
}
