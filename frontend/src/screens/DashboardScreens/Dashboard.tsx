import { Card, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptyImg from "assets/images/empty.svg";
import { PropagateLoader } from "react-spinners";
import http from "utils/api";
import "./styles.scss";
import Swal from "sweetalert2";

interface Deck {
  id: string;
  userId: string;
  title: string;
  description: string;
  visibility: string;
  cards_count: number;
}

const Dashboard = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [fetchingDecks, setFetchingDecks] = useState(false);

  const flashCardUser = window.localStorage.getItem("flashCardUser");
  const { localId } = (flashCardUser && JSON.parse(flashCardUser)) || {};

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

  const handleDeleteDeck = async(id: any) => {

    await http
      .delete(`/deck/delete/${id}`)
      .then((res) => {
        const { id } = res.data;
        Swal.fire({
          icon: 'success',
          title: 'Deck Deleted Successfully!',
          text: 'You have successfully deleted a deck',
          confirmButtonColor: '#221daf',
        }).then(() => {
          window.location.replace(`/dashboard`);
        })
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Deck Deletion Failed!',
          text: 'An error occurred, please try again',
          confirmButtonColor: '#221daf',
        })
      });
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
                      <b>Hey, Welcome Back!</b> 👋
                    </h3>
                    <p className="">
                      Let's start creating, memorizing and sharing your
                      flashcards.
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
              decks.map(
                ({ id, title, description, visibility, cards_count }, index) => {
                  return (
                    <div className="col-md-4">
                      <div className="flash-card__item">
                        <div className="d-flex justify-content-between align-items-center">
                          <Link to={`/deck/${id}/practice`}>
                            <h5>{title}</h5>
                          </Link>
                          <div className="d-flex gap-2 visibility-status align-items-center">
                            {visibility === "public" ? (
                              <i className="lni lni-world"></i>
                            ) : visibility === "private" ? (
                              <i className="lni lni-lock-alt"></i>
                            ) : null}{" "}
                            {visibility}
                          </div>
                        </div>
                        <p className="description">{description}</p>
                        <p className="items-count">{cards_count} item(s)</p>

                        <div className="d-flex menu">
                          <div className="col">
                            <Link to={`/deck/${id}/practice`}>
                              <button className="btn text-left">
                                <i className="lni lni-book"></i> Practice
                              </button>
                            </Link>
                          </div>
                          <div className="col d-flex justify-content-center">
                            <Link to={`/deck/${id}/update`}>
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
                }
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
