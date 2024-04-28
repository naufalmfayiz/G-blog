import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Post() {
  const [post, setPost] = useState([]);

  const fetchPosts = async () => {
    try {
      let { data } = await axios({
        method: "get",
        url: import.meta.env.VITE_API_BASE_URL + "/posts",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      // console.log(data);
      setPost(data);
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

  useEffect(() => {
    fetchPosts();
  }, []);

  async function handleDelete(id) {
    try {
      let { data } = await axios({
        method: "delete",
        url: "https://server-blogc1.naufalmf.my.id/posts/" + id,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      fetchPosts();
      // console.log(data);
      Swal.fire({
        title: "Success!",
        text: data.message,
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
  }

  return (
    <>
      <section
        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
        id="product-section"
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="display-2">Posts</h1>
          <Link to="/add">
            <button className="btn btn-primary rounded-pill" id="new-product">
              <span className="icon material-symbols-outlined">post_add</span>
              New Post
            </button>
          </Link>
        </div>
        <div className="row">
          <div className="col-12 table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Name</th>
                  <th scope="col" width="180px">
                    Image
                  </th>
                  <th scope="col" width="250px">
                    Content
                  </th>
                  <th scope="col">CategoryId</th>
                  <th scope="col">Author</th>
                  <th scope="col">AuthorId</th>
                  <th scope="col" width="50px" />
                </tr>
              </thead>
              <tbody>
                {post.map((post) => {
                  return (
                    <TableRow
                      post={post}
                      key={post.id}
                      handleDelete={handleDelete}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

function TableRow({ post, handleDelete }) {
  return (
    <>
      <tr>
        <td scope="row">{post.id}</td>
        <td className="fw-bold">{post.title}</td>
        <td>
          <img src={post.imgUrl} className="img-fluid" />
        </td>
        <td>{post.content}</td>
        <td className="text-center">{post.categoryId}</td>
        <td className="fw-bold">{post.User.email}</td>
        <td className="text-center">{post.authorId}</td>
        <td>
          <span className="d-flex">
            <Link
              className="ms-3"
              onClick={() => {
                handleDelete(post.id);
              }}
            >
              <span className="icon material-symbols-outlined text-danger">
                delete
              </span>
            </Link>
            <Link href="" className="ms-3" to={`update/${post.id}`}>
              <span className="icon material-symbols-outlined text-danger">
                edit
              </span>
            </Link>
            <Link href="" className="ms-3" to={`patch/${post.id}`}>
              <span className="icon material-symbols-outlined text-danger">
                image
              </span>
            </Link>
          </span>
        </td>
      </tr>
    </>
  );
}
