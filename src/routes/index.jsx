//import react router dom
import { Routes, Route } from "react-router-dom";

//import view posts index
import PostIndex from '../views/posts/Index.jsx';

//import view post create
import PostCreate from '../views/posts/Create.jsx';

//import view post edit
import PostEdit from '../views/posts/Edit.jsx';
import Login from "../views/Login.jsx";
import Registration from "../views/Registration.jsx";
import ProtectedRoute from "../auths/ProtectedRoute.jsx";


function RoutesIndex() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />

            <ProtectedRoute path="/posts" element={<PostIndex />} />

            <Route path="/registration" element={<Registration />} />

            <Route path="/posts/create" element={<PostIndex />} />

            <Route path="/posts/create" element={<PostCreate />} />

            <Route path="/posts/edit/:id" element={<PostEdit />} />

        </Routes>
    )
}

export default RoutesIndex