import { Card, Radio, Switch } from "antd";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import "./styles.scss";

const CreateDeck = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('public');

  const handleCreateDeck = () => {
    const payload = {
      title,
      description,
      visibility
    };

    axios
      .post("/deck/create", payload)
      .then((res) => {
        const { id } = res.data;
        Swal.fire({
          icon: 'success',
          title: 'Deck Created Successfully!',
          text: 'You have successfully created a deck',
          confirmButtonColor: '#221daf',
        }).then(() => {
          window.location.replace(`/deck/${id}`);
        })
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Deck Creation Failed!',
          text: 'An error occurred, please try again',
          confirmButtonColor: '#221daf',
        })
      });
  };

  return (
    <div className="create-deck-page dashboard-commons">
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
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
                  <form className="col-md-12">
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        className="form-control"
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        required
                      />
                    </div>
                    <div className="visibility mt-4">
                      <Radio.Group className='d-flex justify-content-between' value={visibility} onChange={(e) => setVisibility(e.target.value)}>
                        <Radio value={'public'}>
                          Public <i className="lni lni-world"></i>
                        </Radio>
                        <Radio value={'private'}>
                          Private <i className="lni lni-lock-alt"></i>
                        </Radio>
                      </Radio.Group>
                    </div>
                    <div className="form-group mt-4 text-right mb-0">
                      <button className="btn" onClick={handleCreateDeck}>
                        <i className="lni lni-circle-plus mr-2"></i>
                        <span className="">Create Card</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateDeck;
