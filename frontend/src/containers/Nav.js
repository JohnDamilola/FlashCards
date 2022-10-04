import React from 'react'
import Link from '../components/Link'

export default function Nav({ path }) {
  return (
    <nav className="navbar bg-white border-bottom shadow-sm mb-5">
      <div className="fixed-width-700 mx-auto">
        <a className="navbar-brand" href="#cards"><i className="fas fa-book-open mr-2" />FlashCard</a>
        <ul className="nav nav-pills d-inline-flex">
          <li className="nav-item">
            <Link text="Cards" path="cards" isActive={path === 'cards'} />
          </li>
          <li className="nav-item">
            <Link text="New Card" path="new-card" isActive={path === 'new-card'} />
          </li>
          <li className="nav-item">
            <Link text="Practice" path="practice" isActive={path === 'practice'} />
          </li>
        </ul>
      </div>
    </nav>
  )
}
