import { Link } from 'react-router-dom'
import './styles.scss'

const Login = () => {
  return (
    <div className='login-page'>
      <section>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-5'>
              <div className='login-card'>
                <h3>Welcome back! 👋🏼</h3>
                <form>
                  <div className='form-group'>
                    <label>Email address</label>
                    <input type='email' placeholder='you@mail.com' className='form-control' />
                  </div>
                  <div className='form-group'>
                    <label>Password</label>
                    <input type='password' placeholder='password' className='form-control' />
                  </div>
                  <button className='btn btn-main btn-block mb-3'>Login</button>
                  <p>I don’t have an account? <Link to='/register'>Create account</Link></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
