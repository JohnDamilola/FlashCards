import React, { Component } from 'react'
import getFormData from '../util/getFormData'

export default class Form extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const newCard = getFormData(event.target)
    this.props.handleFormSubmit(newCard)
    window.location.hash = 'cards'
  }

  render() {
    const { cardToEdit } = this.props
    const { question, answer } = cardToEdit || { question: '', answer: '' }
    const header = cardToEdit
      ? 'Edit a Flash Card'
      : 'Create a Flash Card'

    return (
      <div className="card fixed-width-700 mx-auto my-5 p-3 shadow-sm">
        <form className="card border-0" key={header} onSubmit={this.handleSubmit}>
          <h5 className="card-title text-center">{header}</h5>
          <div className="form-group my-3">
            <label htmlFor="question">Question</label>
            <input
              id="question"
              type="text"
              className="form-control"
              defaultValue={question}
              name='question' />
          </div>
          <div className="form-group my-3">
            <label htmlFor="answer">Answer</label>
            <input
              id="answer"
              type="text"
              className="form-control"
              defaultValue={answer}
              name='answer' />
          </div>
          <button type="submit" className="btn btn-primary mx-auto my-3">Save</button>
        </form>
      </div>
    )
  }
}
