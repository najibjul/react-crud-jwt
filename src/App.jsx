import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auths/AuthContext';
import Login from './views/Login';
import PostIndex from './views/posts/Index';
import PostCreate from './views/posts/Create';
import PostEdit from './views/posts/Edit';
import ProtectedRoute from './auths/ProtectedRoute';
import Registration from './views/Registration';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/posts" element={<ProtectedRoute element={<PostIndex />} />} />
                    <Route path="/posts/create" element={<ProtectedRoute element={<PostCreate />} />} />
                    <Route path="/posts/:id" element={<ProtectedRoute element={<PostEdit />} />} />
                    
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
