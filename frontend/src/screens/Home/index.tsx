/*
MIT License

Copyright (c) 2022 John Damilola, Leo Hsiang, Swarangi Gaurkar, Kritika Javali, Aaron Dias Barreto

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
import Main from "assets/images/mh.svg";
import { Link } from "react-router-dom";
import "./styles.scss";

const Home = () => {
  const howItWorks = [
    {
      title: "Create",
      bgColor: "#FF9441",
      icon: <i className="lni lni-add-files"></i>,
    },
    {
      title: "Memorize",
      bgColor: "#FFA9B1",
      icon: <i className="lni lni-bookmark-alt"></i>,
    },
    {
      title: "Track Progress",
      bgColor: "#FFC544",
      icon: <i className="lni lni-ruler-alt"></i>,
    },
    {
      title: "Share",
      bgColor: "#84CAED",
      icon: <i className="lni lni-slideshare"></i>,
    },
  ];
  return (
    <div className="home">
      <section className="masthead">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1>A spaced repetition learning platform</h1>
              <p>
                Create, memorize and share your knowledge list as flashcards.
              </p>
              <div className="btn-flex mt-4">
                <Link to="/register">
                  <button className="btn btn-main">Get started for free</button>
                </Link>
                <Link to="/explore">
                  <button className="btn btn-outline">
                    Explore public cards
                  </button>
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <img
                className="img-fluid d-none d-lg-block"
                src={Main}
                alt="laptop with coffee"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="explore">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12 text-center">
              <h1>Explore Categories</h1>
              <p>Check out publicly shared flashcard categories.</p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-3">
                  <Link to="/explore">
                    <div className="explore-card">
                      <h4>Computer Science</h4>
                    </div>
                  </Link>
                  <Link to="/explore">
                    <div className="explore-card green">
                      <h4>People Directory</h4>
                    </div>
                  </Link>
                </div>
                <div className="col-md-3">
                  <Link to="/explore">
                    <div className="explore-card red">
                      <h4>Physics</h4>
                    </div>
                  </Link>
                  <Link to="/explore">
                    <div className="explore-card">
                      <h4>Human Resources</h4>
                    </div>
                  </Link>
                </div>
                <div className="col-md-3">
                  <Link to="/explore">
                    <div className="explore-card">
                      <h4>Philosophy</h4>
                    </div>
                  </Link>
                  <Link to="/explore">
                    <div className="explore-card purple">
                      <h4>French Language</h4>
                    </div>
                  </Link>
                </div>
                <div className="col-md-3">
                  <Link to="/explore">
                    <div className="explore-card red">
                      <h4>Trivia Tests</h4>
                    </div>
                  </Link>
                  <Link to="/explore">
                    <div className="explore-card explore">
                      <h4>
                        Explore more <i className="lni lni-arrow-right"></i>
                      </h4>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="how-it-works">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1>How it works</h1>
              <p>How to use Flashcards in only 4 simple steps.</p>
            </div>
            <div className="col-md-6">
              {howItWorks.map(({ title, icon, bgColor }, index) => {
                return (
                  <div
                    className="explainer-item"
                    style={{ background: bgColor }}
                    key={index}
                  >
                    <p>
                      {index + 1}. {title}
                    </p>
                    {icon}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
