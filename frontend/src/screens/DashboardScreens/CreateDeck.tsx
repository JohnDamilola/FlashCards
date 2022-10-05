import { Card, Radio, Switch } from "antd";
import { useState } from "react";
import "./styles.scss";

const CreateDeck = () => {
  const emptyCard = {
    front: "",
    back: "",
    hint: ""
  }
  const [cards, setCards] = useState([emptyCard]);
  return (
    <div className="create-deck-page dashboard-commons">
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-header">
                <div className="row justify-content-between align-items-center">
                  <h3>Create a new deck</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="flash-card__list row mt-4">
            <div className="col-md-6">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" placeholder="Description" />
              </div>
              <div className="visibility mt-4">
                <Radio.Group onChange={() => null}>
                  <Radio value={1}>
                    <i className="lni lni-world"></i> Public
                  </Radio>
                  <Radio value={2}>
                    <i className="lni lni-lock-alt"></i> Private
                  </Radio>
                </Radio.Group>
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
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Front</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Content on the front"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Back</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Content on the back"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Hint</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Content for the hint"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="btn btn-main">
            <i className="lni lni-circle-plus mr-2"></i>
            <span className="">Create Deck</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default CreateDeck;
