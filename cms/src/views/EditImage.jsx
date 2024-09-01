import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";
import Uploading from "../assets/Uploading.svg";

export default function EditImage({ serverUrl }) {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [imageUpload, setImageUpload] = useState({});
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  async function fetchImage() {
    try {
      const { data } = await axios.get(`${serverUrl}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setName(data.product.name);
      setImgUrl(data.product.imgUrl);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleImageSelect(event) {
    try {
      event.preventDefault();
      const image = event.target.files[0];
      setImageUpload(image);

      if (image) {
        const imgUrl = URL.createObjectURL(image);
        setImgUrl(imgUrl);
      }
    } catch (error) {}
  }

  async function handleSubmit(event) {
    try {
      setUploading(true);
      event.preventDefault();
      const formData = new FormData();
      formData.append("image", imageUpload);

      const { data } = await axios.patch(
        `${serverUrl}/products/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      Toastify({
        text: `${data.message}`,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#008000",
        },
        onClick: function () {}, // Callback after click
      }).showToast();

      navigate("/");
    } catch (error) {
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#FF0000",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    } finally {
      setUploading(false);
    }
  }

  useEffect(() => {
    fetchImage();
  }, [id]);

  return (
    <>
      <div className="flex flex-col justify-center items-center pt-20 gap-10">
        <h1 className="text-2xl text-black">{`Edit Image for ${name}`}</h1>
        <img src={imgUrl} alt="image" className="w-56" />
        <form action="" method="POST" className="flex flex-col gap-10">
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={(event) => handleImageSelect(event)}
          />

          <button
            onClick={(event) => handleSubmit(event)}
            className="btn btn-primary"
          >
            Save Image
          </button>
        </form>
        {uploading ? (
          <>
            <div className="flex gap-1 justify-center items-center w-full">
              <img src={Uploading} className="h-10" />
              <p className="text-black">uploading...</p>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
