import React, { Component } from 'react'
import * as queryString from '../util/query-string'
import getDeleteAnimation from '../util/getDeleteAnimation'

export default class CardList extends Component {
  constructor(props) {
    super(props)
    this.state = { transition: null, deleteIndex: null, cardHeights: [] }
    this.handleClick = this.handleClick.bind(this)
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this)
  }

  handleClick({ target }) {
    const deleteIndex = parseInt(target.getAttribute('data-index'), 10)
    this.setState({ transition: 'deleting', deleteIndex })
  }

  handleTransitionEnd() {
    const { deleteCard } = this.props
    const { cardHeights, deleteIndex } = this.state
    deleteCard(deleteIndex)
    cardHeights.splice(deleteIndex, 1)
    this.setState({ transition: null, cardHeights })
  }

  componentDidMount() {
    const cardHeights = []
    for (const key in this.refs) {
      cardHeights.push(this.refs[key].clientHeight)
    }
    this.setState({ cardHeights })
  }

  render() {
    const { currentCards } = this.props
    const { deleteIndex, transition, cardHeights } = this.state
    const cardList = currentCards.map((card, index) => {
      const query = queryString.stringify({ 'cardIdx': index + 1 })
      const animation = getDeleteAnimation(index, deleteIndex, transition, cardHeights)
      const handleTransition = index === deleteIndex && transition
        ? this.handleTransitionEnd
        : null
      return (
        <li
          ref={'card-' + index}
          className="list-group-item mb-3 shadow-sm"
          style={animation}
          onTransitionEnd={handleTransition}
          key={index}>
          <h5 className="card-title">{card.question}</h5>
          <p className="card-body m-0 py-0">{card.answer}</p>
          <div className="row no-gutters justify-content-end">
            <a href={'#cards' + query}>
              <i className="fas fa-edit mr-2" />
            </a>
            <a href="#cards">
              <i
                data-index={index}
                className="far fa-trash-alt"
                onClick={this.handleClick} />
            </a>
          </div>
        </li>
      )
    })

    return (
      <ul className="list-group fixed-width-700 mx-auto">
        {cardList}
      </ul>
    )
  }
}
