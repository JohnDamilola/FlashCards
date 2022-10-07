import "./styles.scss";
import { Link } from "react-router-dom";

const Navbar = ({ isDashboard }: any) => {
  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img className='img-fluid' src={require('assets/images/logo.png')} />
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          {isDashboard ? (
            <div className="navbar-nav ml-auto navbar-centers gap-4">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/explore"
                >
                  Explore
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/dashboard"
                >
                  Your Library
                </Link>
              </li>
              <Link to="/create-deck">
                <button className="btn btn-main">
                  <i className="lni lni-circle-plus mr-2"></i> 
                  <span className=''>Create Deck</span>
                </button>
              </Link>
            </div>
          ) : (
            <div className="navbar-nav ml-auto navbar-centers gap-4">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/explore"
                >
                  Explore
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <Link to="/register">
                <button className="btn btn-main">Register</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
