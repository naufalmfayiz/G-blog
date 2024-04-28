import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function Category() {
  const [category, setCategory] = useState([]);

  const fetchCategories = async () => {
    try {
      let { data } = await axios({
        method: "get",
        url: import.meta.env.VITE_API_BASE_URL + "/categories",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      // console.log(data);
      setCategory(data);
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
    fetchCategories();
  }, []);

  return (
    <>
      <section
        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
        id="category-section"
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="display-2">Categories</h1>
        </div>
        <div className="row">
          <div className="col-6">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Name</th>
                </tr>
              </thead>
              <tbody id="table-category">
                {category.map((category) => {
                  return <CategoryRow category={category} key={category.id} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

function CategoryRow({ category }) {
  return (
    <>
      <tr>
        <td scope="row">{category.id}</td>
        <td className="fw-bold">{category.name}</td>
      </tr>
    </>
  );
}
