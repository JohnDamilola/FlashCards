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
import { Card, Radio } from "antd";
import EmptyImg from "assets/images/empty.svg";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import Swal from "sweetalert2";
import http from "utils/api";
import "./styles.scss";

interface Deck {
  id: string;
  title: string;
  description: string;
  visibility: string;
}

interface Card {
  front: string;
  back: string;
  hint: string;
}

const CreateCards = () => {
  const navigate = useNavigate();
  const emptyCard = {
    front: "",
    back: "",
    hint: "",
  };
  const [deck, setDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState([emptyCard]);
  const [originalCards, setOriginalCards] = useState([]);
  const [fetchingDeck, setFetchingDeck] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchingCards, setFetchingCards] = useState(false);

  const flashCardUser = window.localStorage.getItem("flashCardUser");
  const { localId } = (flashCardUser && JSON.parse(flashCardUser)) || {};

  useEffect(() => {
    fetchDeck();
    fetchCards();
  }, []);

  const { id } = useParams();

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
        if (cards.length !== 0) {
          setCards(cards);
        }
        setOriginalCards(cards);
        setFetchingCards(false);
      })
      .catch((err) => {
        setFetchingCards(false);
      });
  };

  const handleUpdate = (index: number, propertyName: string, e: any) => {
    e.preventDefault();
    const value = e.target.value;
    const _cards: Card[] = [...cards];
    const updatedCards = _cards.map((item, key) => {
      if (index === key) {
        return { ...item, [propertyName]: value };
      }
      return item;
    });
    setCards(updatedCards);
  };

  const addCard = () => {
    const _cards = [...cards];
    _cards.push(emptyCard);
    setCards(_cards);
  };

  const removeCard = (index: number) => {
    const _cards = [...cards];
    _cards.splice(index, 1);
    setCards(_cards);
  };

  const handleAddCards = async (e: any) => {
    e.preventDefault();
    const payload = {
      localId,
      cards,
    };
    setIsSubmitting(true);
    await http
      .post(`/deck/${id}/card/create`, payload)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Cards Added Successfully!",
          text: "You have successfully added cards to this deck",
          confirmButtonColor: "#221daf",
        }).then(() => {
          setIsSubmitting(false);
          window.location.replace(`/deck/${id}/practice`);
        });
      })
      .catch((err) => {
        setIsSubmitting(false);
      });
  };

  const { title } = deck || {};

  return (
    <div className="create-deck-page dashboard-page dashboard-commons">
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="row mt-4">
                <div className="col-md-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3 className="mb-0">
                        <Link to="/dashboard" className="text-edit">
                          <i className="lni lni-arrow-left back-icon"></i>
                        </Link>
                      </h3>
                      <h3 className="title">
                        <em>
                          <u>{title}</u>
                        </em>{" "}
                        Deck
                      </h3>
                    </div>
                    <button className="btn btn-mains">
                      <Link to={`/deck/${id}/edit`} className="text-edit">
                        <i className="lni lni-pencil-alt"></i> Edit Deck details
                      </Link>
                    </button>
                  </div>
                </div>
                <div className="col-md-12">
                  <p className="title">Add Cards to Deck</p>
                </div>
                <form onSubmit={handleAddCards}>
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
                    cards.map(({ front, back, hint }, index) => {
                      return (
                        <div className="col-md-12">
                          <div className="flash-card__content">
                            <div className="d-flex header justify-content-between align-items-center">
                              <span>Card {index + 1}</span>
                              <i
                                className="lni lni-trash-can"
                                style={{ cursor: "pointer" }}
                                onClick={() => removeCard(index)}
                              ></i>
                            </div>
                            <div className="row content">
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>Front</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={front}
                                    onChange={(e) =>
                                      handleUpdate(index, "front", e)
                                    }
                                    placeholder="Content on the front"
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>Back</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={back}
                                    onChange={(e) =>
                                      handleUpdate(index, "back", e)
                                    }
                                    placeholder="Content on the back"
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>Hint (optional)</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={hint}
                                    onChange={(e) =>
                                      handleUpdate(index, "hint", e)
                                    }
                                    placeholder="Content for the hint"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div className="row justify-content-end">
                    <div className="col-md-12 text-right">
                      <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={addCard}
                      >
                        <i className="lni lni-circle-plus mr-2"></i>
                        <span className="">Add Card</span>
                      </button>
                    </div>
                  </div>
                  <button
                    className="btn btn-submit btn-block mt-4"
                    type="submit"
                  >
                    <i className="lni lni-circle-plus mr-2"></i>
                    <span className="">
                      {originalCards.length === 0 ? "Create" : "Update"} Study
                      Deck
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateCards;
