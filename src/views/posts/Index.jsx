import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function PostIndex() {

    const token = localStorage.getItem('token')

    const [posts, setPosts] = useState([]);

    const [current_page, setCurrent_page] = useState();
    const [per_page, setPer_page] = useState();

    const [links, setLinks] = useState([])

    const [url, setUrl] = useState('http://localhost:8000/api/posts?page=1')

    const fetchData = async ( url) => {
    
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        try {
            await axios.get(url).
            then((response) => {
                setCurrent_page(response.data.data.current_page)
                setPer_page(response.data.data.per_page)
                setPosts(response.data.data.data)
                setLinks(response.data.data.links)                
            })
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        fetchData(url)
    },[url])

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-header">
                            POSTS
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-end mb-2">
                                <Link to={"/posts/create"} className="btn btn-primary">Add data</Link>
                            </div>
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
                                        {posts.map((post, index) =>(
                                            <tr key={post.id}>
                                                <th className="text-center">{(current_page - 1) * per_page + (index + 1) }</th>
                                                <td>{post.title}</td>
                                                <td>{post.content}</td>
                                                <td>{post.image}</td>
                                                <td></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        {links.map(link => (
                                            <li key={link.label} className="page-item"><a className={`page-link ${link.active && ( 'active' )} ${!link.url && ( 'disabled' )}`} href="#" onClick={() => setUrl(link.url)} dangerouslySetInnerHTML={{ __html: link.label }} ></a></li>
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
    )
}