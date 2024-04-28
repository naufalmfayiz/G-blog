import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddUpdate() {
  const [input, setInput] = useState({
    title: "",
    content: "",
    imgUrl: "",
    categoryId: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  //>>>> PUT
  useEffect(() => {
    if (id) {
      async function fetchPostById() {
        try {
          let { data } = await axios({
            method: "get",
            url: import.meta.env.VITE_API_BASE_URL + `/posts/${id}`,
            headers: {
              Authorization: `Bearer ${localStorage.access_token}`,
            },
          });
          console.log(data);
          let { title, content, imgUrl, categoryId } = data;
          setInput({ title, content, imgUrl, categoryId });
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
      }
      fetchPostById();
    }
  }, []);

  const handleForm = async (event) => {
    event.preventDefault();
    // console.log(input);
    try {
      let data = await axios({
        method: id ? "put" : "post",
        url: id
          ? import.meta.env.VITE_API_BASE_URL + "/posts/" + id
          : import.meta.env.VITE_API_BASE_URL + "/posts",
        data: input,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      console.log(data);
      navigate("/");
      Swal.fire({
        title: "Success!",
        text: "Post successfully added/updated",
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
        id="new-product-section"
      >
        <div className="row mt-3">
          <div className="col-12 col-md-6 bg-white bg-opacity-50">
            <form id="product-form" onSubmit={handleForm}>
              <h1 className="display-2">{id ? "Update" : "New"} Post</h1>
              <div className="mb-3">
                <label htmlFor="product-name">
                  Title <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="product-name"
                  placeholder="Enter post title"
                  autoComplete="off"
                  name="title"
                  required=""
                  value={input.title}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="product-desc">
                  Content <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="product-desc"
                  placeholder="Enter post content"
                  autoComplete="off"
                  name="content"
                  required=""
                  value={input.content}
                  onChange={handleChangeInput}
                />
              </div>
              {!id ? (
                <div className="mb-3">
                  <label htmlFor="product-image">Image</label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-image"
                    placeholder="Enter post image url"
                    autoComplete="off"
                    name="imgUrl"
                    value={input.imgUrl}
                    onChange={handleChangeInput}
                  />
                </div>
              ) : (
                <></>
              )}
              <div className="mb-3">
                <label htmlFor="product-category">
                  Category <span className="text-danger fw-bold">*</span>
                </label>
                <select
                  id="product-category"
                  className="form-select"
                  required=""
                  name="categoryId"
                  onChange={handleChangeInput}
                  value={input.categoryId}
                >
                  <option value="" disabled>
                    -- Select Category --
                  </option>
                  <option value={1}>News</option>
                  <option value={2}>Tips</option>
                  <option value={3}>Mood</option>
                </select>
              </div>
              <div className="row mt-5 mb-3">
                <div className="col-6">
                  <Link
                    className="btn btn-lg btn-danger rounded-pill w-100 p-2"
                    to="/"
                  >
                    Cancel
                  </Link>
                </div>
                <div className="col-6">
                  <button
                    className="btn btn-lg btn-primary rounded-pill w-100 p-2"
                    type="submit"
                    href=""
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
