import './styles.scss'
import { ReactComponent as CustomizeIcon } from 'assets/icons/icon.svg'
import Main from 'assets/images/mh.svg'

const Home = () => {

  const howItWorks = [
    {
      title: "Create",
      bgColor: "#FF9441",
      icon: <CustomizeIcon />
    },
    {
      title: "Memorize",
      bgColor: "#FFA9B1",
      icon: <CustomizeIcon />
    },
    {
      title: "Track Progress",
      bgColor: "#FFC544",
      icon: <CustomizeIcon />
    },
    {
      title: "Share",
      bgColor: "#84CAED",
      icon: <CustomizeIcon />
    }
  ]
  return (
    <div className='home'>
      <section className='masthead'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-md-6'>
              <h1>A spaced repetition learning platform</h1>
              <p>Create, memorize and share your knowledge list as flashcards.</p>
              <div className='btn-flex mt-4'>
                <button className='btn btn-main'>Get started for free</button>
                <button className='btn btn-outline'>Explore public cards</button>
              </div>
            </div>
            <div className='col-md-6'>
              <img className='img-fluid' src={Main} alt="laptop with coffee" />
            </div>
          </div>
        </div>
      </section>
      <section className='explore'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-md-12 text-center'>
              <h1>Explore Categories</h1>
              <p>Check out publicly shared flashcard categories.</p>
            </div>
          </div>
          <div className='row justify-content-center'>
            <div className='col-md-10'>
              <div className='row'>
                <div className='col-md-3'>
                  <div className='explore-card'>
                    <h4>Computer Science</h4>
                  </div>
                  <div className='explore-card green'>
                    <h4>People Directory</h4>
                  </div>
                </div>
                <div className='col-md-3'>
                  <div className='explore-card red'>
                    <h4>Computer Science</h4>
                  </div>
                  <div className='explore-card'>
                      <h4>Human Resources</h4>
                    </div>
                </div>
                <div className='col-md-3'>
                  <div className='explore-card'>
                    <h4>Philosophy</h4>
                  </div>
                  <div className='explore-card purple'>
                    <h4>French Language</h4>
                  </div>
                </div>
                <div className='col-md-3'>
                  <div className='explore-card red'>
                    <h4>Trivia Tests</h4>
                  </div>
                  <div className='explore-card explore'>
                    <h4>Explore more <i className="lni lni-arrow-right"></i></h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='how-it-works'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-md-6'>
              <h1>How it works</h1>
              <p>How to use Flashcards in only 4 simple steps.</p>
            </div>
            <div className='col-md-6'>
              {
                howItWorks.map(({ title, icon, bgColor }, index) => {
                  return (
                    <div className='explainer-item' style={{background: bgColor}} key={index}>
                      <p>{title}</p>
                      {icon}
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
