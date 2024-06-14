import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Welcome from "./components/Welcome";
import Login from './components/Login';
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import NavBar from "./components/NavBar";
import LoginSuccess from "./components/LoginSuccess";
import GroupChat from './components/GroupChat';
import Users from "./components/Users";
import EditUser from './components/EditUser';
import Documents from "./components/Documents";
import ShareDocument from "./components/ShareDocument";

import UserStorage from "./database/UserStorage";

const App = () => {

    const guestUser = () => !UserStorage.getUserFromSession();

    const PrivateRoute = ({ children }) => !guestUser() ? children : <Navigate to="/welcome" />;

    const PublicRoute = ({ children }) => guestUser() ? children : <Navigate to="/" />;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PrivateRoute><NavBar /></PrivateRoute>}>
                    <Route index element={<LoginSuccess />} />
                    <Route path="chat" element={<GroupChat />} />
                    <Route path="users" element={<Users />} />
                    <Route path="users/edit/:id" element={<EditUser />} />
                    <Route path="documents" element={<Documents />} />
                    <Route path="documents/share/:documentId" element={<ShareDocument />} />
                </Route>
                <Route path="welcome" element={<PublicRoute><Welcome /></PublicRoute>} />
                <Route path="login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="register" element={<PublicRoute><Register /></PublicRoute>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
