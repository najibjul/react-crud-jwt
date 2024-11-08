import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function PostEdit() {

    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const [title, setTitle] = useState('')

    const [image, setImage] = useState('')
    
    const [content, setContent] = useState('')

    const [errors, setErrors] = useState('')

    const {id} = useParams()

    const navigate = useNavigate()

    const handleImageChange = (e) => {
        setImage(e.target.files[0])
    }

    const fetchDetailPost = async () => {

        await axios.get(`http://localhost:8000/api/posts/${id}`).

        then((response) => {
            setTitle(response.data.data.title)
            setContent(response.data.data.content)
        })
        .catch(errors => {
            setErrors(errors.response.data)
        })
    }

    useEffect(()=>{
        fetchDetailPost()
    },[])

    const handleUpdatePost = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('title', title)
        formData.append('content', content)
        formData.append('image', image)

        try {
            await axios.post(`http://localhost:8000/api/posts/update/${id}`, formData)
            .then((response) => {
                
                sessionStorage.setItem('successMessage', response.data.message)
                navigate('/posts')
            })
        } catch (error) {
            setErrors(error.response.data)
        }
    } 

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            HALAMAN POST EDIT

                            <form onSubmit={handleUpdatePost}>

                                <div className="mt-2 mb-4">
                                    <label htmlFor="title" className="mb-2">Title</label>
                                    <input type="text" id="title" className="form-control" onChange={(e) => setTitle(e.target.value)} value={title} />
                                    {errors && ( <div className="alert alert-danger">{errors.title[0]}</div> )}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="content" className="mb-2">Content</label>
                                    <input type="text" id="content" className="form-control" onChange={(e) => setContent(e.target.value)} value={content} />
                                    { errors.content && ( <div className="alert alert-danger">{errors.content[0]}</div> ) }
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="image" className="mb-2">Image</label>
                                    <input type="file" id="image" className="form-control" onChange={(e) => handleImageChange(e)} />
                                    { errors.image && ( <div className="alert alert-danger">{errors.image[0]}</div> ) }
                                </div>

                                <button className="btn btn-warning" type="submit">Update</button>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostEdit