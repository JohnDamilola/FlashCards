import React, { Fragment } from 'react'

export default function CardListEmpty() {
  return (
    <Fragment>
      <h5 className="card-title text-center my-3">You have no flash cards.</h5>
      <div className="card-body text-center">
      <a className="my-5" href="#new-card">
        <button className="btn btn-primary">Make One</button>
      </a>
      </div>
    </Fragment>
  )
}
