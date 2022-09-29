import './styles.scss'

const socials = [
  {
    icon: <i className='lni lni-twitter-filled'></i>,
    url: 'https://twitter.com/keepeveryhq/',
  },
  {
    icon: <i className='lni lni-instagram-original'></i>,
    url: 'https://www.instagram.com/keepeveryhq/',
  },
  {
    icon: <i className='lni lni-facebook-original'></i>,
    url: 'https://fb.me/keepeveryhq',
  },
  {
    icon: <i className='lni lni-linkedin-original'></i>,
    url: 'https://www.linkedin.com/company/keepevery/',
  },
]

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-lg-8'>
            <div className='footer-text-p'>
              FlashCards{' '}
              <span>
                / A spaced repetition learning platform.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
