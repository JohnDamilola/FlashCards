import './cardlist_style.scss'

const Card = () => {
    return (
        <div className="flip-card">
        <div className="flip-card-inner">
            <div className="flip-card-front">
            <h1>Who is he?</h1>
            </div>
            <div className="flip-card-back">
            <h1>John Doe</h1>
            <p>Architect & Engineer</p>
            <p>We love that guy</p>
            </div>
        </div>
        </div>
    )
  }
  
  export default Card