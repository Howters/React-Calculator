import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
// import 'jquery/dist/jquery.min.js'
// import 'bootstrap/dist/js/bootstrap.min.js'
import "./support.css" // Create a new CSS file for styling

function NewSupportForm() {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    topic: "",
    description: ""
  })
  const [selectedTopic, setSelectedTopic] = useState("");
  const [showModal, setShowModal] = useState(false)
  const handleClose = () => setShowModal(false)
  const [disabled, setDisabled] = useState(true)
  const [final, setFinal] = useState(false)

  const inputChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const submitHandler = () => {
    setDisabled(true)
    const num = Math.round(Math.random() * 10)
    console.log(num)
    setTimeout(() => {
      if (num <= 7) {
        setShowModal(true)
      } else {
        setTimeout(() => {
          setFinal(true)
        })
      }
    }, 2000)
  }

  useEffect(() => {
    const { fName, lName, email } = formData;
    setDisabled(!(fName && lName && email && selectedTopic));
  }, [formData, selectedTopic]);

  if (!final) {
    return (
      <div className="new-container">
        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          style={{ display: showModal ? "block" : "none" }}
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Modal Title
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">Your modal content goes here.</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <h1>Support Ticket Form</h1>
        <div className="new-input-container">
          <div className="new-left">
            <p className="name-title">Name<span>*</span></p>
            <div className="new-name-input">
              <div className="first-container">
                <input
                  type="text"
                  name="fName"
                  value={formData.fName}
                  onChange={inputChangeHandler}
                />
                    <label>First</label>
              </div>
              <div className="last-container">
                <input
                  type="text"
                  name="lName"
                  value={formData.lName}
                  onChange={inputChangeHandler}
                />
                    <label>Last</label>
              </div>
            </div>
            <div className="new-email">
              <p>Email<span>*</span></p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={inputChangeHandler}
              />
            </div>
            <p>Topic<span>*</span></p>
            <div className="new-topic">
            <p>What can we help you today ?</p>
              <div className="topic-container">
                <label>
                  <input
                    type="radio"
                    name="topic"
                    value="general"
                    checked={selectedTopic === "general"}
                    onChange={() => setSelectedTopic("general")}
                  />
                  General
                </label>
              </div>
              <div className="topic-container">
                <label>
                  <input
                    type="radio"
                    name="topic"
                    value="bug"
                    checked={selectedTopic === "bug"}
                    onChange={() => setSelectedTopic("bug")}
                  />
                  Bug
                </label>
              </div>
          </div>
          </div>
          <div className="new-right">
            <label>Description <span className="optional">optional</span></label>
            <textarea
              name="description"
              value={formData.description}
              onChange={inputChangeHandler}
              cols={30}
              rows={11}
              placeholder="Description report"
            />
            <button
              className="submit-btn"
              onClick={submitHandler}
              style={{ backgroundColor: disabled ? "grey" : "orange" }}
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
      <div className="final-container">
        <div className="ticket-title">Support Ticket Form</div>
        <hr />
        <div className="ticket-container">
          <h1>
            Thank you for sending us your report, we will track the problem now
          </h1>
          <p>
            ticket number: <span className="ticket-num">{Math.round(Math.random() * 1000)}</span>
          </p>
        </div>
      </div>
    )
  }
}

export default NewSupportForm
