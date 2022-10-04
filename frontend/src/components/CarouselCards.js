import React from 'react'
import getSlideAnimation from '../util/getSlideAnimation'

export default function CarouselCards({ practiceCard, showAnswer, transition, handleTransitionEnd }) {
  const [ visibility, icon ] = showAnswer
    ? [ ' inner open', 'fas fa-chevron-circle-right rotate down' ]
    : [ ' inner', 'fas fa-chevron-circle-right rotate' ]
  const animation = getSlideAnimation(transition)

  return (
    <div className={'card p-3' + animation} onTransitionEnd={handleTransitionEnd}>
      <h5 className="card-title">{practiceCard.question}</h5>
      <div id="show-answer" className="btn text-left mb-3">
        <i className={icon + ' mr-3'} /><span>Show Answer</span>
      </div>
      <div id="answer" className={'card-body py-0 wrap'}>
        <p className={'mb-0' + visibility}>{practiceCard.answer}</p>
      </div>
    </div>
  )
}
