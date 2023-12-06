import { useState, useEffect } from "react"
import "../assets/support.css"
import "../assets/supportPopup.css"

function SupportForm() {
  const [selectButton, setSelectButton] = useState("")
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [bacolor, setBacolor] = useState("grey")
  const [disabled, setDisabled] = useState(true)
  const [flag, setFlag] = useState(false)

  // BUAT TANDAIN RADIO YANG TERCENTANG
  const radioSelected = (value: string): boolean => {
    return selectButton === value
  }

  // BUAT USER MILIH RADIO YANG MAU DICENTANG
  const radioHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectButton(e.currentTarget.value)
  }

  // BUAT SUBMIT FORM
  const submitHandler = () => {
    // DISABLE BUTTON
    setBacolor("grey")
    setDisabled(true)
    // CREATE ARRAY FOR 1s, 2s, 3s, 4s, AND 5s & RANDOM NUMBER
    const seconds = [1000, 2000, 3000, 4000, 5000]
    const randomNumber = Math.round(Math.random() * 4)
    // CREATE TIMEOUT FOR SUBMITTING FORM
    setTimeout(() => {
      // VALIDATE IF MORE THAN 3s
      if (seconds[randomNumber] > 3000) {
        alert("failed to sent!")
      } else {
        setTimeout(() => {
          setFlag(true)
        }, seconds[randomNumber])
      }
    }, 2000)
  }

  // FOR VALIDATING INPUT FIELDS AND DISABLING AND ENABLING BUTTON
  useEffect(() => {
    if (selectButton !== "" && userName !== "" && userEmail !== "") {
      setBacolor("orange")
      setDisabled(false)
    } else {
      setBacolor("grey")
      setDisabled(true)
    }
  }, [userName, userEmail, selectButton])

  if (!flag) {
    return (
      <div className="container">
        <h1>Support Ticket Form</h1>
        <div className="input-container">
          <div className="left">
            <div className="name-input">
              <p>
                Name <span>*</span>
              </p>
              <div className="first-last-name-container">
                <div className="first-name">
                  <input
                    type="text"
                    name="first"
                    id="first"
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setUserName(e.target.value)
                    }}
                  />
                  <br />
                  <label htmlFor="first">First</label>
                </div>
                <div className="last-name">
                  <input type="text" name="last" id="last" />
                  <br />
                  <label htmlFor="last">Last</label>
                </div>
              </div>
            </div>
            <div className="email">
              <label htmlFor="email">
                Email <span>*</span>
              </label>
              <br />
              <input
                type="email"
                className="email"
                name="email"
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUserEmail(e.target.value)
                }}
              />
            </div>
            <div className="topic">
              <p>
                Topic <span>*</span>
              </p>
              <div className="topic-container">
                <p>What Can We Help You Today?</p>
                <div className="general-container">
                  <input
                    type="checkbox"
                    name="general"
                    className="general"
                    value={"general"}
                    checked={radioSelected("general")}
                    onChange={radioHandler}
                  />
                  <label htmlFor="general">General</label>
                </div>
                <div className="bug-container">
                  <input
                    type="checkbox"
                    name="bug"
                    className="bug"
                    value={"bug"}
                    checked={radioSelected("bug")}
                    onChange={radioHandler}
                  />
                  <label htmlFor="bug">Bug</label>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <label htmlFor="desc">
              Description<span>optional</span>
            </label>
            <textarea name="desc" id="desc" cols={30} rows={17} />
            <button
              onClick={submitHandler}
              style={{ backgroundColor: bacolor }}
              disabled={disabled}
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container-popup">
        <h1>Support Ticket Form</h1>
        <div className="ticket-container">
          <h1>
            Thank you for sending us your report, we will track the problem now
          </h1>
          <p>
            ticket number : <span>{Math.round(Math.random() * 1000)}</span>
          </p>
        </div>
      </div>
    )
  }
}

export default SupportForm
