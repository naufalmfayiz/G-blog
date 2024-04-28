import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function RegisterForm() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });
  const navigate = useNavigate();

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleForm = async (event) => {
    event.preventDefault();
    // console.log(input);
    try {
      let { data } = await axios({
        method: "post",
        url: import.meta.env.VITE_API_BASE_URL + "/add-user",
        data: input,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      console.log(data);
      navigate("/");
      Swal.fire({
        title: "Success!",
        text: `data with id: ${data.id} and email: ${data.email} registered successfully`,
        icon: "success",
        confirmButtonText: "Okay",
      });
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
      <section
        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
        id="new-user-section"
      >
        <div className="row">
          <div className="col-12 col-md-6">
            <div className=" p-3 mt-3 mb-3 bg-white bg-opacity-50">
              <form id="register-form" onSubmit={handleForm}>
                <h1 className="h3 mb-3 display-1">Register User</h1>
                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <label htmlFor="register-email">Email</label>
                    <label className="text-danger text-end fw-bold">*</label>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    id="register-email"
                    placeholder="Enter email address ..."
                    autoComplete="off"
                    required=""
                    name="email"
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <label htmlFor="register-password">Password</label>
                    <label className="text-danger text-end fw-bold">*</label>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    id="register-password"
                    placeholder="Enter password ..."
                    autoComplete="off"
                    required=""
                    name="password"
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="register-phone">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="register-phone"
                    placeholder="Enter phone number (optional) ..."
                    autoComplete="off"
                    name="phoneNumber"
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="register-address">Address</label>
                  <textarea
                    id="register-address"
                    className="form-control"
                    rows={3}
                    placeholder="Enter address (optional) ..."
                    autoComplete="off"
                    name="address"
                    onChange={handleChangeInput}
                  />
                </div>
                <button
                  className="btn btn-lg btn-primary rounded-pill w-100 p-2 mt-3"
                  type="submit"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
