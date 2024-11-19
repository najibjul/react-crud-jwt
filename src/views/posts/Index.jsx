import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SuccessAlert from "../components/SuccessAlert";
import Body from "../layouts/Body";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

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

    const [selectedId, setSelectedId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');

    const [errors, setErrors] = useState([])

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

                    const modalElement = document.getElementById(`post${id}`);
                    const modal = bootstrap.Modal.getInstance(modalElement);
                    modal.hide();

                    setSuccessMessage(response.data.message);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const handleModalEdit = async (e, id, title, content) => {
        e.preventDefault()
        
        setSelectedId(id)
        setTitle(title)
        setContent(content)

        document.getElementById('modalEdit').showModal()
    }

    const handleUpdate = async (e, postId) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('title', title)
        formData.append('content', content)
        formData.append('image', image)

        try {
            await axios.post(`http://localhost:8000/api/posts/update/${postId}`, formData)
                .then((response) => {
                    sessionStorage.setItem('successMessage', response.data.message)
                    fetchData(url);
                    setSuccessMessage(response.data.message);
                    document.getElementById('modalEdit').close()
                })
        } catch (error) {            
            setErrors(error.response.data)
        }
    }

    const handleModalCreate = async (e) => {
        e.preventDefault()

        setTitle('')
        setContent('')
        setImage('')

        document.getElementById('modalCreate').showModal()
    }

    const handleStore = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('title', title)
        formData.append('content', content)
        formData.append('image', image)

        try {
            await axios.post(`http://localhost:8000/api/posts/store`, formData)
                .then((response) => {
                    sessionStorage.setItem('successMessage', response.data.message)
                    fetchData(url);
                    setSuccessMessage(response.data.message);
                    document.getElementById('modalCreate').close()
                })
                .catch((error)=>{
                    setErrors(error.response.data)
                })
        } catch (error) {                        
            setErrors(error.response.data)
        }
    }

    const handleModalDelete = async (e, postId) => {
        e.preventDefault()

        setSelectedId(postId)

        document.getElementById('modalDelete').showModal()
    }

    const handleDestroy = async (e, postId) => {
        e.preventDefault()

        try {
            await axios.delete(`http://localhost:8000/api/posts/${postId}`)
                .then((response) => {
                    sessionStorage.setItem('successMessage', response.data.message)
                    fetchData(url);
                    setSuccessMessage(response.data.message);
                    document.getElementById('modalDelete').close()
                })
        } catch (error) {            
            setErrors(error.response.data)
        }
    }

    return (
        <>
            <Body>
                <div className="place-self-end">
                    <button type="button" className="btn btn-primary mb-2" onClick={(e) => handleModalCreate(e) }>Create</button>
                </div>
                <div className="card bg-base-100">
                    <div className="card-body">
                        <SuccessAlert message={successMessage} />
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Title</th>
                                        <th>Content</th>
                                        <th>Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map((post, index) => (
                                        <tr key={post.id}>
                                            <th>{(current_page - 1) * per_page + (index + 1)}</th>
                                            <td>{post.title}</td>
                                            <td>{post.content}</td>
                                            <td>
                                                <div className="avatar">
                                                    <div className="w-24 rounded">
                                                        <img src={post.image} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex">
                                                    <div>
                                                        <div className="tooltip me-1" data-tip="Edit">
                                                            <button type="button" className="btn btn-warning btn-sm" onClick={(e) => handleModalEdit(e, post.id, post.title, post.content) }>
                                                                <FontAwesomeIcon icon={faEdit} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="tooltip" data-tip="Delete">
                                                            <button className="btn btn-error btn-sm" onClick={(e) => handleModalDelete(e, post.id) }>
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <dialog id="modalCreate" className="modal">
                                <div className="modal-box">
                                    <form method="dialog">
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>

                                    <h3 className="font-bold text-lg mb-5">Create</h3>

                                    <div className="mb-3">
                                        <label htmlFor="titleCreate">Title</label>
                                        <input type="text" placeholder="Type title here" value={title} id="titleCreate" className="input input-bordered w-full" onChange={(e) => setTitle(e.target.value)} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="contentCreate">Content</label>
                                        <input type="text" placeholder="Type content here" value={content} id="contentCreate" className="input input-bordered w-full" onChange={(e) => setContent(e.target.value)} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="imageCreate">Image</label>
                                        <input type="file" id="imageCreate" className="input input-bordered w-full" onChange={(e) => setImage(e.target.files[0])} />
                                    </div>

                                    <div className="modal-action">
                                        <form method="dialog">
                                            <button className="btn">Close</button>
                                        </form>
                                        <form onSubmit={(e) => handleStore(e)}>
                                            <button className="btn btn-primary">Create</button>
                                        </form>
                                    </div>

                                </div>
                            </dialog>

                            <dialog id="modalEdit" className="modal">
                                <div className="modal-box">
                                    <form method="dialog">
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>

                                    <h3 className="font-bold text-lg mb-5">Edit</h3>

                                    <div className="mb-3">
                                        <label htmlFor="titleEdit">Title</label>
                                        <input type="text" value={title} id="titleEdit" className="input input-bordered w-full" onChange={(e) => setTitle(e.target.value)} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="contentEdit">Content</label>
                                        <input type="text" value={content} id="contentEdit" className="input input-bordered w-full" onChange={(e) => setContent(e.target.value)} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="imageEdit">Image</label>
                                        <input type="file" id="imageEdit" className="input input-bordered w-full" onChange={(e) => setImage(e.target.files[0])} />
                                    </div>

                                    <div className="modal-action">
                                        <form method="dialog">
                                            <button className="btn">Close</button>
                                        </form>
                                        <form onSubmit={(e) => handleUpdate(e, selectedId)}>
                                            <button className="btn btn-warning">Update</button>
                                        </form>
                                    </div>

                                </div>
                            </dialog>

                            <dialog id="modalDelete" className="modal">
                                <div className="modal-box">
                                    <form method="dialog">
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>

                                    <h3 className="font-bold text-lg mb-5">Delete</h3>

                                    <div className="mb-3">
                                        <p>Delete this post?</p>
                                    </div>

                                    <div className="modal-action">
                                        <form method="dialog">
                                            <button className="btn">Close</button>
                                        </form>
                                        <form onSubmit={(e) => handleDestroy(e, selectedId)}>
                                            <button className="btn btn-error">Delete</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                    </div>
                </div>
            </Body>
        </>
    );
}
