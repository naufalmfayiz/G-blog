import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function ImageForm() {
  const [file, setFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // handle change input image
  const handleChange = (event) => {
    const image = event.target.files[0]; // ambil imagenya dari sini
    setFile(image);
    console.log(image);
  };

  // handle untuk submit form
  const handleSubmitForm = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(); // buat form data

      formData.append("iniImageUrl", file); // append ke formData
      // param ke 1 sesuaikan dengan field input di servernya, param ke 2 dari state "file"

      // axios
      const { data } = await axios({
        method: "patch",
        url: import.meta.env.VITE_API_BASE_URL + `/posts/${id}/img-url`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
          "Content-Type": "multipart/form-data", // wajib menambahkan line ini pas nge axios
        },
        data: formData,
      });
      console.log(data);
      navigate(`/`);
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
  };
  return (
    <>
      <form id="register-form" onChange={handleChange}>
        <h1 className="h3 mb-3 display-1">Update Image</h1>
        <div className="input-group mb-3">
          <input
            type="file"
            className="form-control pt-3"
            id="inputGroupFile02"
            autoComplete="off"
            required=""
            name="imgUrl"
          />
        </div>
        <button
          className="btn btn-lg btn-primary rounded-pill w-100 p-2 mt-3"
          type="submit"
          onClick={handleSubmitForm}
        >
          Update Image
        </button>
      </form>
    </>
  );
}
