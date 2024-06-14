import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserStorage from '../database/UserStorage';
import Modal from './Modal';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const currentUser = UserStorage.getUserFromSession();

    useEffect(() => setUsers(UserStorage.getUsersList()), []);

    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    const handleDeleteConfirm = () => {
        if (selectedUser) {
            UserStorage.deleteUser(selectedUser.id);
            const updatedUsers = UserStorage.getUsersList();
            setUsers(updatedUsers);
            setShowModal(false);
            setSelectedUser(null);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <h1 className="text-center mb-4">Users</h1>
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.email}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link to={`/users/edit/${user.id}`} className="btn btn-primary btn-sm mr-2">Edit</Link>
                                        <span className="action-divider mx-2">|</span>
                                        <button
                                            className={`btn btn-danger btn-sm ${user.id === currentUser.id ? 'disabled-btn' : ''}`}
                                            onClick={() => handleDeleteClick(user)}
                                            disabled={user.id === currentUser.id}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal
                showModal={showModal}
                title="Delete User?"
                body={`Are you sure you want to delete ${selectedUser?.name} (${selectedUser?.email})?`}
                actionButton="Delete"
                closeButton="Cancel"
                onAction={handleDeleteConfirm}
                onClose={handleModalClose}
            />
        </div>
    );
};

export default Users;
