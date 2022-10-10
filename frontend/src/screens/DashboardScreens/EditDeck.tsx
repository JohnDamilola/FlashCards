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
import { Radio } from "antd";
import { useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import http from "utils/api";
import "./styles.scss";

const EditDeck = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const flashCardUser = window.localStorage.getItem('flashCardUser');
  const { localId } = flashCardUser && JSON.parse(flashCardUser) || {};
  const { id } = useParams();

  const handleEditDeck = async(e: any) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      visibility,
      localId
    };
    setIsSubmitting(true);

    await http
      .patch(`/deck/update/${id}`, payload)
      .then((res) => {
        const { id } = res.data;
        Swal.fire({
          icon: 'success',
          title: 'Deck Updated Successfully!',
          text: 'You have successfully updated a deck',
          confirmButtonColor: '#221daf',
        }).then(() => {
          setIsSubmitting(false);
          window.location.replace(`/dashboard`);
        })
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Deck Creation Failed!',
          text: 'An error occurred, please try again',
          confirmButtonColor: '#221daf',
        })
        setIsSubmitting(false);
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
                        <h3>Edit a study deck</h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flash-card__list row justify-content-center mt-2">
                  <form className="col-md-12" onSubmit={handleEditDeck}>
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
                      <button className="btn" type='submit'>
                        <i className="lni lni-circle-plus mr-2"></i>
                        <span className="">{isSubmitting ? 'Editing Deck...' : 'Edit Deck'}</span>
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

export default EditDeck;
