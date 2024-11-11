import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SuccessAlert from "../components/SuccessAlert";
import Body from "../templates/Body";

export default function PostIndex() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [posts, setPosts] = useState([]);

  const [current_page, setCurrent_page] = useState();

  const [per_page, setPer_page] = useState();

  const [links, setLinks] = useState([]);

  const [url, setUrl] = useState("http://localhost:8000/api/posts?page=1");

  const [successMessage, setSuccessMessage] = useState("");

  const sectionRef = useRef(null);

  const sessionSuccess = sessionStorage.getItem("successMessage");

  const fetchData = async (url) => {
    try {
      await axios.get(url).then((response) => {
        setCurrent_page(response.data.data.current_page);
        setPer_page(response.data.data.per_page);
        setPosts(response.data.data.data);
        setLinks(response.data.data.links);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (sessionSuccess) {
      setSuccessMessage(sessionSuccess);
      sessionStorage.removeItem("successMessage");
    }

    fetchData(url);
  }, [url]);

  const handleUrl = (e, url) => {
    e.preventDefault();
    setUrl(url);
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();

    try {
      await axios
        .delete(`http://127.0.0.1:8000/api/posts/${id}`)
        .then((response) => {
          fetchData(url);
          setSuccessMessage(response.data.message);
          $(`#post${id}`).modal("hide");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Body>
        <div>
          <div className="row">
            <div className="col-md-12">
              <div className="card border-0 rounded shadow">
                <div className="card-header" id="header" ref={sectionRef}>
                  <h4>POSTS INDEX</h4>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-end mb-2">
                    <Link to={"/posts/create"} className="btn btn-primary">
                      Add data
                    </Link>
                  </div>
                  <SuccessAlert message={successMessage} />
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr className="text-center">
                          <th>No</th>
                          <th>Title</th>
                          <th>Content</th>
                          <th>Image</th>
                          <th>Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        {posts.map((post, index) => (
                          <tr key={post.id}>
                            <th className="text-center">
                              {(current_page - 1) * per_page + (index + 1)}
                            </th>
                            <td>{post.title}</td>
                            <td>{post.content}</td>
                            <td>
                              <img
                                src={post.image}
                                alt={post.title}
                                width="200"
                                className="rounded"
                              />
                            </td>
                            <td>
                              <div className="d-flex">
                                <Link
                                  to={`/posts/${post.id}`}
                                  className="btn btn-warning"
                                >
                                  Edit
                                </Link>

                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  data-toggle="modal"
                                  data-target={`#post${post.id}`}
                                >
                                  Delete
                                </button>
                              </div>

                              <div
                                className="modal fade"
                                id={`post${post.id}`}
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                              >
                                <div className="modal-dialog">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5
                                        className="modal-title"
                                        id="exampleModalLabel"
                                      >
                                        Delete post
                                      </h5>
                                      <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                      >
                                        <span aria-hidden="true">×</span>
                                      </button>
                                    </div>
                                    <div className="modal-body">
                                      Delete this post?
                                    </div>
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                      >
                                        Close
                                      </button>
                                      <form
                                        onSubmit={(e) =>
                                          handleDelete(e, post.id)
                                        }
                                      >
                                        <button
                                          type="submit"
                                          className="btn btn-danger"
                                        >
                                          Yes, delete
                                        </button>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        {links.map((link) => (
                          <li key={link.label} className="page-item">
                            <button
                              className={`page-link ${
                                link.active && "active"
                              } ${!link.url && "disabled"}`}
                              onClick={(e) => handleUrl(e, link.url)}
                              dangerouslySetInnerHTML={{ __html: link.label }}
                            ></button>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>

                  {/* <div>
                                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} > Previous </button>
                                <span> Page {currentPage} of {totalPages} </span>
                                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} > Next </button>
                            </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Body>
    </>
  );
}
