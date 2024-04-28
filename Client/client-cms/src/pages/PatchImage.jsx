import { useEffect, useState } from "react";
import ImageForm from "../components/ImageForm";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function PatchImage() {
  const [post, setPost] = useState({});
  const { id } = useParams();

  async function fetchPostById() {
    try {
      let { data } = await axios({
        method: "get",
        url: import.meta.env.VITE_API_BASE_URL + "/posts/" + id,
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
  }

  useEffect(() => {
    fetchPostById();
  }, []);

  return (
    <>
      <>
        <section
          className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
          id="update-product-section"
        >
          <div className="row mt-3">
            <div className="col-12 col-md-6">
              <h1 className="h3 mb-3 display-1">{post.title}</h1>
              <img
                src={post.imgUrl}
                width={500}
                height={300}
                alt="post picture"
              />
              <div className="pt-3 pb-2 mb-3">
                <ImageForm fetchPostById />
              </div>
            </div>
          </div>
        </section>
      </>
    </>
  );
}
