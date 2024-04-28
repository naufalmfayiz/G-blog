import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChangeInput = (event) => {
    const { type, value } = event.target;
    setInput({ ...input, [type]: value });
  };

  const submitLogin = async (event) => {
    event.preventDefault();

    try {
      let { data } = await axios({
        method: "post",
        url: import.meta.env.VITE_API_BASE_URL + "/login",
        data: input,
      });
      // console.log(data.access_token);
      localStorage.access_token = data.access_token;
      localStorage.email = data.email;
      navigate("/");
    } catch (error) {
      console.log(error);
      const errMsg = error.response.data.message;
      Swal.fire({
        title: "Error!",
        text: errMsg,
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <>
      {/* Login Section */}
      <section className="container" id="login-section">
        <div className="col-12 col-lg-8 offset-lg-2 my-5 bg-white bg-opacity-50">
          <div className="row">
            <div className="col-12 col-md-6 border-end p-4 text-left">
              <img
                src="https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width="350px"
                height="400px"
                alt="sofa"
              />
            </div>
            <div className="col-12 col-md-6 p-5 text-left">
              <div className="form-signin m-auto">
                <form id="login-form" onSubmit={submitLogin}>
                  <h1 className="h3 mb-3 display-5 fw-bold text-center">
                    LOG IN
                  </h1>
                  <p className="mb-3 fw-bold">
                    Login and it will be getting good.
                  </p>
                  <div className="mb-3 mt-3">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="login-email">Email</label>
                      <label className="text-danger text-end fw-bold">*</label>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      id="login-email"
                      placeholder="Enter email address ..."
                      autoComplete="off"
                      required=""
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="login-password">Password</label>
                      <label className="text-danger text-end fw-bold">*</label>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      id="login-password"
                      placeholder="Enter your password ..."
                      autoComplete="off"
                      required=""
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="checkbox mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="login-remember"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="login-remember"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <button
                    className="btn btn-lg btn-primary rounded-pill w-100 p-2"
                    type="submit"
                  >
                    Log In
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Login Section */}
    </>
  );
}
