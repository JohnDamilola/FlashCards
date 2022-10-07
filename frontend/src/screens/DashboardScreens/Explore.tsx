import { Link } from "react-router-dom";
import "./styles.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const [query, setQuery] = useState("");
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
                <p className='title'>Your Library</p>
              </div>
              {decks
                .filter((post) => {
                  if (query === "") {
                    return post;
                  } else if (
                    post.title.toLowerCase().includes(query.toLowerCase()) ||
                    post.description.toLowerCase().includes(query.toLowerCase())
                  ) {
                    return post;
                  }
                })
                .map(({ id, title, description, visibility }, index) => {
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
                })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Explore;
