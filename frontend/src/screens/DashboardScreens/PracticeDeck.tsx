import { Card } from "antd";
import Flashcard from "components/PracticeDeck";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import EmptyImg from "assets/images/empty.svg";
import http from "utils/api";
import "./styles.scss";

interface Deck {
  id: string;
  userId: string;
  title: string;
  description: string;
  visibility: string;
}

interface Card {
  front: string;
  back: string;
  hint: string;
}

const PracticeDeck = () => {
  const navigate = useNavigate();
  const [deck, setDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [fetchingDeck, setFetchingDeck] = useState(false);
  const [fetchingCards, setFetchingCards] = useState(false);

  const flashCardUser = window.localStorage.getItem("flashCardUser");
  const { localId } = (flashCardUser && JSON.parse(flashCardUser)) || {};

  const { id } = useParams();

  useEffect(() => {
    fetchDeck();
    fetchCards();
  }, []);

  const fetchDeck = async () => {
    setFetchingDeck(true);
    await http
      .get(`/deck/${id}`)
      .then((res) => {
        const { deck: _deck } = res.data || {};
        setDeck(_deck);
        setFetchingDeck(false);
      })
      .catch((err) => {
        setFetchingDeck(false);
      });
  };

  const fetchCards = async () => {
    setFetchingCards(true);
    await http
      .get(`/deck/${id}/card/all`)
      .then((res) => {
        const { cards } = res.data || {};
        setCards(cards);
        setFetchingCards(false);
      })
      .catch((err) => {
        setFetchingCards(false);
      });
  };

  const { title, description, userId } = deck || {};

  return (
    <div className="dashboard-page dashboard-commons">
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Card className="welcome-card practice-deck">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h3>
                      <i
                        className="lni lni-arrow-left back-icon"
                        onClick={() => navigate(-1)}
                      ></i>
                    </h3>
                    <div>
                      <h3>
                        <b>{title}</b>
                      </h3>
                      <p className="">{description}</p>
                    </div>
                  </div>
                  {
                    localId === userId &&
                    <Link to={`/deck/${id}/update`}>
                      <button className="btn btn-white">Update Deck</button>
                    </Link>
                  }
                </div>
              </Card>
            </div>
          </div>

          <div className="flash-card__list row justify-content-center mt-4">
            <div className="col-md-8">
              {fetchingCards ? (
                <div
                  className="col-md-12 text-center d-flex justify-content-center align-items-center"
                  style={{ height: "300px" }}
                >
                  <PropagateLoader color="#221daf" />
                </div>
              ) : cards.length === 0 ? (
                <div className="row justify-content-center empty-pane">
                  <div className="text-center">
                    <img className="img-fluid" src={EmptyImg} />
                    <p>No Cards Added Yet</p>
                  </div>
                </div>
              ) : (
                <Flashcard cards={cards} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PracticeDeck;
