import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DetailPage() {
  const [posts, setPost] = useState({});
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: import.meta.env.VITE_API_BASE_URL + "/pub/posts/" + id,
      });
      setPost(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //fetch data
    fetchData();
  }, []);

  return (
    <>
      <section className="container bg-white bg-opacity-75">
        <div className="pb-4 pt-5">
          <div className="d-flex justify-content-center gap-4">
            <img
              src={posts.imgUrl}
              alt="post picture"
              className="img-fluid"
              width={600}
              height={400}
            />
          </div>
          <h3 className="text-center mt-3">{posts.title}</h3>
          <p className="mx-auto text-justify col-10 fs-5">{posts.content}</p>
        </div>
      </section>
    </>
  );
}
