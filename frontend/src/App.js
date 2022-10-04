import React, { Component, Fragment } from 'react'
import Nav from './containers/Nav'
import Form from './views/Form'
import CardList from './views/CardList'
import CardListEmpty from './components/CardListEmpty'
import Practice from './views/Practice'
import parseHash from './util/parse-hash'

export default class App extends Component {
  constructor(props) {
    super(props)
    const { path, params } = parseHash(window.location.hash)
    const cards = localStorage.getItem('cards')
    this.state = {
      path,
      params,
      cards: JSON.parse(cards) || []
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.deleteCard = this.deleteCard.bind(this)
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const { path, params } = parseHash(window.location.hash)
      this.setState({ path, params })
    })
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('cards', JSON.stringify(this.state.cards))
    })
  }

  addCard(newCard) {
    const cards = [...this.state.cards, newCard]
    this.setState({ cards })
  }

  editCard(newCard) {
    const { params } = this.state
    const editIndex = parseInt(params.cardIdx, 10) - 1
    const cards = this.state.cards.map((card, index) => {
      if (index === editIndex) return newCard
      return card
    })
    this.setState({ cards })
  }

  deleteCard(deleteIndex) {
    const cards = [...this.state.cards]
    cards.splice(deleteIndex, 1)
    this.setState({ cards })
  }

  handleFormSubmit(newCard) {
    this.state.params.hasOwnProperty('cardIdx')
      ? this.editCard(newCard)
      : this.addCard(newCard)
  }

  renderForm() {
    const { cards, params } = this.state
    const editIndex = parseInt(params.cardIdx, 10) - 1
    const cardToEdit = cards[editIndex] || null
    return <Form
      cardToEdit={cardToEdit}
      handleFormSubmit={this.handleFormSubmit} />
  }

  renderCards() {
    if (this.state.params.cardIdx) return this.renderForm()
    return this.state.cards.length > 0
      ? <CardList
        currentCards={this.state.cards}
        deleteCard={this.deleteCard} />
      : <CardListEmpty />
  }

  renderPractice() {
    return this.state.cards.length > 0
      ? <Practice cardList={this.state.cards} />
      : <CardListEmpty />
  }

  renderView() {
    switch (this.state.path) {
      case 'new-card':
        return this.renderForm()
      case 'cards':
        return this.renderCards()
      case 'practice':
        return this.renderPractice()
      default:
        return this.renderCards()
    }
  }

  render() {
    return (
      <Fragment>
        <Nav path={this.state.path}/>
        {this.renderView()}
      </Fragment>
    )
  }
}