import { message } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import http from "utils/api";
import "./styles.scss";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e: any) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };
    setIsSubmitting(true);

    await http
      .post("/signup", payload)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'You have successfully created an account',
          confirmButtonColor: '#221daf',
        }).then(() => {
          window.location.replace("/login");
        })
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed!',
          text: 'An error occurred, please try again',
          confirmButtonColor: '#221daf',
        })
        setIsSubmitting(false);
      });
  };

  return (
    <div className="register-page">
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="login-card">
                <h3>Create an account</h3>
                <form onSubmit={handleRegister}>
                  {/* <div className="form-group">
                    <label>Full name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div> */}
                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      type="email"
                      placeholder="you@mail.com"
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button className="btn btn-main btn-block mb-3" type="submit">
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </button>
                  <p>
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
