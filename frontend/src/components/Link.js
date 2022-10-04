import React from 'react'

export default function Link({ text, path, isActive }) {
  const className = isActive
    ? 'nav-link active'
    : 'nav-link'
  return (
    <a className={className} href={'#' + path}>
      {text}
    </a>
  )
}
