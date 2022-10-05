// import { Link } from 'react-router-dom'
import './form_styles.scss'

const Card = () => {
  return (
    <div className='add-card-page'>
      <section>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-5'>
              <div className='login-card'>
                <h3>Create Card</h3>
                <form>
                  <div className='form-group'>
                    <label>Question</label>
                    <input type='text' placeholder='Favorite Color' className='form-control' />
                  </div>
                  <div className='form-group'>
                    <label>Answer</label>
                    <input type='text' placeholder='Red' className='form-control' />
                  </div>
                  <button className='btn btn-main btn-block mb-3'>Submit</button>
                  {/* <p>I don’t have an account? <Link to='/register'>Create account</Link></p> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Card