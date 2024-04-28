import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [posts, setPost] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [filter, sort, page]);

  const fetchData = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_BASE_URL + `/pub/posts`,
        params: {
          search: search ? search : "",
          filter,
          sort,
          "page[size]": 9,
          "page[number]": page,
        },
      });
      setPost(data.data);
      setTotalPages(data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setPage(1);
    fetchData();
  };

  return (
    <>
      <section className="container bg-white bg-opacity-75 pb-3">
        <div className="row d-flex">
          <div className="col">
            <h1 className="text-center mt-4 mb-2 display-3">
              <img
                src="https://cdn-icons-png.freepik.com/512/9956/9956310.png?ga=GA1.1.1392924088.1712049123&"
                alt="G logo"
                width={90}
                height={90}
              />
            </h1>
          </div>
        </div>

        <div className="d-flex mt-0 mb-5 justify-content-center row">
          <div className="h1 text-center">
            Welcome to G-Blog, where simplicity at its finest.
          </div>
        </div>

        <div className="mt-5">
          <div className="h3 text-center">Our Poured Mind:</div>
        </div>

        {/* SEARCH BAR */}
        <div className="d-flex my-3 justify-content-center row">
          <form
            className="d-inline-flex col-10 col-md-6 "
            role="search"
            onSubmit={handleSearch}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search post..."
              aria-label="Search"
              name="search"
              style={{ borderColor: "green" }}
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <button className="btn btn-outline-success">Search</button>
          </form>
        </div>
        {/* END OF SEARCH BAR */}

        {/* FILTER & SORT */}
        <div className="d-flex justify-content-center row-3">
          <div className="d-inline-flex mb-3">
            {/* FILTER */}
            <select
              className="rounded form-select"
              aria-label="Filter by category"
              value={filter}
              onChange={(event) => {
                setFilter(event.target.value);
              }}
            >
              <option value="">All Categories</option>
              <option value="1">News</option>
              <option value="2">Tips</option>
              <option value="3">Mood</option>
            </select>
            {/* END OF FILTER */}

            {/* SORT */}
            <select
              className="rounded form-select"
              aria-label="Sort by"
              value={sort}
              onChange={(event) => {
                setSort(event.target.value);
              }}
            >
              <option value="">Sort by Date</option>
              <option value="asc">Oldest</option>
              <option value="desc">Newest</option>
            </select>
            {/* END OF SORT */}
          </div>
        </div>
        {/* END OF FILTER & SORT */}

        {/* POSTS CARD */}
        {posts.length === 0 ? (
          <div className="text-center h5 mt-3">No Data Found</div>
        ) : (
          <div className="d-flex justify-content-center gap-4 flex-wrap row">
            {posts.map((post) => {
              return (
                <div
                  className="card col-4"
                  style={{ width: "20rem" }}
                  key={post.id}
                >
                  <img src={post.imgUrl} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.content}</p>
                    <Link className="btn btn-primary" to={`/post/${post.id}`}>
                      Read more...
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* END OF POSTS CARD */}

        {/* PAGINATION */}
        <nav className="d-flex justify-content-center mt-4">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                aria-label="Previous"
                onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
                disabled={page === 1}
              >
                <span aria-hidden="true">«</span>
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                className={`page-item ${index + 1 === page ? "active" : ""}`}
                key={index}
              >
                <button
                  className="page-link"
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className="page-link"
                aria-label="Next"
                onClick={() =>
                  setPage((prevPage) => Math.min(prevPage + 1, totalPages))
                }
                disabled={page === totalPages}
              >
                <span aria-hidden="true">»</span>
              </button>
            </li>
          </ul>
        </nav>
        {/* END OF PAGINATION */}
      </section>
    </>
  );
}
