import EmptyImg from "assets/images/empty.svg";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import http from "utils/api";
import "./styles.scss";

interface Deck {
  id: string;
  userId: string;
  title: string;
  description: string;
  visibility: string;
}

const Explore = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [fetchingDecks, setFetchingDecks] = useState(false);

  const flashCardUser = window.localStorage.getItem("flashCardUser");
  const { localId } = (flashCardUser && JSON.parse(flashCardUser)) || {};
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    setFetchingDecks(true);
    const params = { localId };
    await http
      .get("/deck/all", {
        params,
      })
      .then((res) => {
        const { decks: _decks } = res.data || {};
        setDecks(_decks);
        setFetchingDecks(false);
      })
      .catch((err) => {
        setDecks([]);
        setFetchingDecks(false);
      });
  };

  return (
    <div className="explore-page dashboard-commons">
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="masthead">
                <h2>Find flashcards that interests you.</h2>
              </div>
            </div>
          </div>

          <div className="row search-pane justify-content-center">
            <div className="col-md-9">
              <input
                type="text"
                onChange={(event) => setQuery(event.target.value)}
                className="form-control"
                placeholder="Search by subject title or description"
              />
            </div>
            <div className="flash-card__list row mt-4">
              <div className="col-md-12">
                <p className="title">Your Library</p>
              </div>
              {fetchingDecks ? (
                <div
                  className="col-md-12 text-center d-flex justify-content-center align-items-center"
                  style={{ height: "300px" }}
                >
                  <PropagateLoader color="#221daf" />
                </div>
              ) : decks.length === 0 ? (
                <div className="row justify-content-center empty-pane">
                  <div className="text-center">
                    <img className="img-fluid" src={EmptyImg} />
                    <p>No Study Deck Created Yet</p>
                  </div>
                </div>
              ) : (
                decks
                  .filter((post) => {
                    if (query === "") {
                      return post;
                    } else if (
                      post.title.toLowerCase().includes(query.toLowerCase()) ||
                      post.description
                        .toLowerCase()
                        .includes(query.toLowerCase())
                    ) {
                      return post;
                    }
                  })
                  .map(
                    ({ id, title, description, visibility }, index) => {
                      return (
                        <div className="col-md-4">
                          <Link
                            aria-current="page"
                            to={"/deck/" + id + "/" + title}
                          >
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
                    }
                  )
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Explore;
