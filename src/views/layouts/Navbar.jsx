import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

    const token = localStorage.getItem("token");

    const navigate = useNavigate()

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const handleLogout = async (e) => {
        
        e.preventDefault()

        localStorage.removeItem('token')

        await axios.post('http://localhost:8000/api/logout')
        .then(() => {
            navigate('/')
        })
    }

    return (
        <>
            <div className="navbar bg-base-100 border rounded">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">React CRUD</a>
                </div>
                <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <FontAwesomeIcon icon={faUserCircle} className="fa-2xl" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><a href="#" onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}