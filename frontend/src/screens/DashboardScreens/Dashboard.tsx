import { Card, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import http from "utils/api";
import "./styles.scss";

interface Deck {
  id: string;
  title: string;
  description: string;
  visibility: string;
}

const Dashboard = () => {
  const _decks = [
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

  const [decks, setDecks] = useState<Deck[]>([]);
  const [fetchingDecks, setFetchingDecks] = useState(false);

  useEffect(() => {
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    setFetchingDecks(true);
    await http
      .get("/decks")
      .then((res) => {
        setDecks(_decks);
        setFetchingDecks(false);
      })
      .catch((err) => {
        setDecks(_decks);
        setFetchingDecks(false);
      });
  };

  const handleDeleteDeck = (id: any) => {
    // todo
  };

  return (
    <div className="dashboard-page dashboard-commons">
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Card className="welcome-card border-[#E7EAED]">
                <div className="flex justify-between items-center">
                  <div>
                    <h3>
                      <b>Welcome Back,</b> John 👋
                    </h3>
                    <p className="">
                        Let's start creating, memorizing and sharing your flashcards.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="flash-card__list row mt-4">
            <div className="col-md-12">
              <p className="title">Your Library</p>
            </div>
            {fetchingDecks ? (
                <div className='col-md-12 text-center d-flex justify-content-center align-items-center' style={{height: '300px'}}>
                    <PropagateLoader color="#221daf" />
                </div>
            ) : (
              decks.map(({ id, title, description, visibility }, index) => {
                return (
                  <div className="col-md-4">
                    <div className="flash-card__item">
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to={`/deck/${id}/${title}/practice`}>
                          <h5>{title}</h5>
                        </Link>
                        <div className='d-flex gap-2 visibility-status align-items-center'>
                            {visibility === "public" ? (
                            <i className="lni lni-world"></i>
                            ) : visibility === "private" ? (
                            <i className="lni lni-lock-alt"></i>
                            ) : null} {visibility}
                        </div>
                      </div>
                      <p className="description">{description}</p>
                      <p className="items-count">4 items</p>

                      <div className="d-flex menu">
                        <div className="col">
                            <Link to={`/deck/${id}/${title}/practice`}>
                                <button className="btn text-left">
                                    <i className="lni lni-book"></i> Practice
                                </button>
                            </Link>
                        </div>
                        <div className="col d-flex justify-content-center">
                            <Link to={`/deck/${id}/${title}/update`}>
                                <button className="btn text-edit">
                                    <i className="lni lni-pencil-alt"></i> Update
                                </button>
                            </Link>
                        </div>
                        <div className="col d-flex justify-content-end">
                            <Popconfirm
                                title="Are you sure to delete this task?"
                                onConfirm={() => handleDeleteDeck(id)}
                                okText="Yes"
                                cancelText="No"
                            >
                            <button className="btn text-danger">
                                <i className="lni lni-trash-can"></i> Delete
                            </button>
                            </Popconfirm>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
