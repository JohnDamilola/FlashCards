import { Card, Radio, Switch } from "antd";
import axios from "axios";
import { useState } from "react";
import "./styles.scss";

const CreateDeck = () => {
  const emptyCard = {
    front: "",
    back: "",
    hint: "",
  };
  const [cards, setCards] = useState([emptyCard]);

  const addCard = () => {
    const _cards = [...cards];
    _cards.push(emptyCard);
    setCards(_cards);
  };

  const handleCreateDeck = () => {
    const payload = {
      title: "",
      description: "",
      cards: [],
    };

    axios
      .post("/deck/create", payload)
      .then((res) => {})
      .catch((err) => {});
  };

  return (
    <div className="create-deck-page dashboard-commons">
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="header-card">
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    <div className="page-header">
                      <div className="row justify-content-between align-items-center">
                        <h3>Create a new study deck</h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flash-card__list row justify-content-center mt-2">
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        placeholder="Description"
                      />
                    </div>
                    <div className="visibility mt-2">
                      <Radio.Group onChange={() => null}>
                        <Radio value={1}>
                          <i className="lni lni-world"></i> Public
                        </Radio>
                        <Radio value={2}>
                          <i className="lni lni-lock-alt"></i> Private
                        </Radio>
                      </Radio.Group>
                    </div>
                    <div className="form-group mt-4 text-right mb-0">
                      <button className="btn btn-secondary" onClick={addCard}>
                        <i className="lni lni-circle-plus mr-2"></i>
                        <span className="">Add Card</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-12">
                  <p>Add Cards</p>
                </div>
                {cards.map((item, index) => {
                  return (
                    <div className="col-md-12">
                      <div className="flash-card__content">
                        <div className="d-flex header justify-content-between align-items-center">
                          <span>Card {index + 1}</span>
                          <i className="lni lni-trash-can"></i>
                        </div>
                        <div className="row content">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Front</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Content on the front"
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Back</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Content on the back"
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Hint (optional)</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Content for the hint"
                              />
                            </div>
                          </div>
                          <button
                            className="btn btn-secondary"
                            onClick={addCard}
                          >
                            <i className="lni lni-circle-plus mr-2"></i>
                            <span className="">Add Card</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="row justify-content-end">
                <div className="col-md-12 text-right">
                  <button className="btn btn-secondary" onClick={addCard}>
                    <i className="lni lni-circle-plus mr-2"></i>
                    <span className="">Add Card</span>
                  </button>
                </div>
              </div>
              <button
                className="btn btn-main btn-block mt-4"
                onClick={handleCreateDeck}
              >
                <i className="lni lni-circle-plus mr-2"></i>
                <span className="">Create Study Deck</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateDeck;
