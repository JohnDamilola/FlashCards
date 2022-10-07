import { Card } from "antd";
import Flashcard from "components/PracticeDeck";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "utils/api";
import "./styles.scss";

interface Deck {
  id: string;
  title: string;
  description: string;
  visibility: string;
}

const PracticeDeck = () => {
  const navigate = useNavigate();
  const [deck, setDeck] = useState<Deck | null>(null);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [fetchingDecks, setFetchingDecks] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetchDeck()
  }, [])

  const fetchDeck = async () => {
    setIsSubmitting(true);
    await http
      .get(`/deck/${id}`)
      .then((res) => {
        const { deck: _deck } = res.data || {};
        setDeck(_deck);
        setIsSubmitting(false);
      })
      .catch((err) => {
        setIsSubmitting(false);
      });
  };

  const handleDeleteDeck = (id: any) => {
    // todo
  };

  const { title, description } = deck || {}

  return (
    <div className="dashboard-page dashboard-commons">
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Card className="welcome-card practice-deck">
                <div className="flex justify-between items-center">
                  <div>
                    <h3>
                      <i
                        className="lni lni-arrow-left back-icon"
                        onClick={() => navigate(-1)}
                      ></i>
                    </h3>
                  </div>
                  <div>
                    <h3>
                      <b>{title}</b>
                    </h3>
                    <p className="">
                      {description}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="flash-card__list row justify-content-center mt-4">
            <div className="col-md-8">
              <Flashcard />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PracticeDeck;
