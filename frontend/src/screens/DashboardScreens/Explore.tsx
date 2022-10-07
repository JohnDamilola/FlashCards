import { Link } from "react-router-dom";
import "./styles.scss";

const Explore = () => {
  const decks = [
    {
      id: "1",
      title: "Biology",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam recusandae veritatis.",
      visibility: "public",
    },
    {
      id: "2",
      title: "Computer Science",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam recusandae veritatis.",
      visibility: "private",
    },
    {
      id: "3",
      title: "Plilosophy",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam recusandae veritatis.",
      visibility: "public",
    },
    {
      id: "4",
      title: "Maths",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam recusandae veritatis.",
      visibility: "public",
    },
    {
      id: "5",
      title: "Physics",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam recusandae veritatis.",
      visibility: "public",
    },
    {
      id: "6",
      title: "Chemistry",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam recusandae veritatis.",
      visibility: "private",
    },
  ];
  return (
    <div className="explore-page dashboard-commons">
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="masthead">
                <h2>Find step-by-step expert solutions</h2>
                <p>Millions of solutions for your toughest homework problems</p>
              </div>
            </div>
          </div>

          <div className="row search-pane justify-content-center">
            <div className="col-md-9">
              <input
                className="form-control"
                placeholder="Search subjects, decks or cards"
              />
            </div>
          </div>

          <div className="flash-card__list row mt-4">
            <div className="col-md-12">
              <p>Your Library</p>
            </div>
            {decks.map(({ id, title, description, visibility }, index) => {
              return (
                <div className="col-md-4">
                  <Link aria-current="page" to={"/deck/" + id + "/" + title}>
                    <div className="flash-card__item">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5>{title}</h5>
                        {visibility === "public" ? (
                          <i className="lni lni-world"></i>
                        ) : visibility === "private" ? (
                          <i className="lni lni-lock-alt"></i>
                        ) : null}
                      </div>
                      <p className="description">{description}</p>
                      <p className="items-count">4 items</p>

                      <div className="bottom-section">
                        <p>Created by you 2 days ago</p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Explore;
