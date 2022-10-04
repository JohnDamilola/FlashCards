import React, { Component, Fragment } from 'react'
import CarouselCards from '../components/CarouselCards'

export default class Carousel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      practiceIndex: 0,
      showAnswer: false,
      transition: null
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this)
  }

  toggleShowAnswer() {
    const showAnswer = !this.state.showAnswer
    this.setState({ showAnswer })
  }

  handleCarouselControls(control) {
    const { cardList } = this.props
    let { practiceIndex } = this.state
    if (control === 'next' && practiceIndex < cardList.length - 1) {
      this.setState({ transition: 'transition-next' })
    }
    if (control === 'prev' && practiceIndex > 0) {
      this.setState({ transition: 'transition-prev' })
    }
  }

  handleClick(event) {
    const $target = event.target.closest('.btn')
    if ($target.id === 'next' || $target.id === 'prev') this.handleCarouselControls($target.id)
    if ($target.id === 'show-answer') this.toggleShowAnswer()
  }

  handleTransitionEnd() {
    const { transition } = this.state
    let { practiceIndex, showAnswer } = this.state

    if (transition === 'transition-next') {
      practiceIndex++
      showAnswer = false
      this.setState({ practiceIndex, showAnswer, transition: 'next' })
    }
    if (transition === 'transition-prev') {
      practiceIndex--
      showAnswer = false
      this.setState({ practiceIndex, showAnswer, transition: 'prev' })
    }
  }

  render() {
    const { cardList } = this.props
    const { practiceIndex, showAnswer, transition } = this.state
    const practiceCard = cardList[practiceIndex]
    const progress = `${(practiceIndex + 1) / cardList.length * 100}%`

    return (
      <Fragment>
        <div className="progress fixed-width-700 bg-white border shadow-sm mx-auto mb-4">
          <div className="progress-bar" style={{ width: progress }}></div>
        </div>
        <div className="carousel fixed-width-900 mx-auto" key={progress} onClick={this.handleClick}>
          <div className="fixed-width-700 mx-auto overflow-hidden">
            <CarouselCards
              practiceCard={practiceCard}
              showAnswer={showAnswer}
              transition={transition}
              handleTransitionEnd={this.handleTransitionEnd} />
          </div>
          <a id="prev" className="carousel-control-prev fixed-width-100 btn">
            <i className="fas fa-chevron-left" />
          </a>
          <a id="next" className="carousel-control-next fixed-width-100 btn">
            <i className="fas fa-chevron-right" />
          </a>
        </div>
      </Fragment>
    )
  }
}
