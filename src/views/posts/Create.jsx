import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Body from "../templates/Body";

function PostCreate() {
  const token = localStorage.getItem("token");

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    try {
      await axios
        .post("http://localhost:8000/api/posts/store", formData)
        .then((response) => {
          sessionStorage.setItem("successMessage", response.data.message);
          navigate("/posts");
        });
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <>
      <Body>
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-md-12">
              <div className="card border-0 rounded shadow">
                <div className="card-header">
                  <h4>POST CREATE</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="title">Title</label>
                      <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className={`form-control ${
                          errors.title ? "is-invalid" : ""
                        }`}
                        placeholder="Type here..."
                        required
                      />
                      {errors.title && (
                        <div className="alert alert-danger">
                          {errors.title[0]}
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="content">Content</label>
                      <input
                        onChange={(e) => setContent(e.target.value)}
                        type="text"
                        className={`form-control ${
                          errors.content ? "is-invalid" : ""
                        }`}
                        placeholder="Type here..."
                        required
                      />
                      {errors.content && (
                        <div className="alert alert-danger">
                          {errors.content[0]}
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="image">image</label>
                      <input
                        onChange={handleImageChange}
                        type="file"
                        className={`form-control ${
                          errors.image ? "is-invalid" : ""
                        }`}
                        placeholder="Type here..."
                        required
                      />
                      {errors.image && (
                        <div className="alert alert-danger">
                          {errors.image[0]}
                        </div>
                      )}
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Body>
    </>
  );
}

export default PostCreate;