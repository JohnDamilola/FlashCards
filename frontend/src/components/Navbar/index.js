import './styles.scss'
import { Link } from 'react-router-dom'

const Navbar = (path) => {
  return (
    <nav className='navbar navbar-expand-lg sticky-top'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          FlashCard
        </Link>
        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <div className='navbar-nav ml-auto navbar-centers gap-4'>
            <li className='nav-item'>
              <Link className='nav-link active' aria-current='page' to='#'>
                Explore
              </Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link active' aria-current='page' to='/cards'>
                Cards
              </Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link active' aria-current='page' to='/new-card'>
                New Card
              </Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link active' aria-current='page' to='/practice'>
               Practice
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link active' aria-current='page' to='/login'>
                Login
              </Link>
            </li>
            <Link to='/register'>
              <button className='btn btn-main'>Register</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar