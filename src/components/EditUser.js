import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import UserStorage from '../database/UserStorage';
import Modal from './Modal';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [originalUser, setOriginalUser] = useState(null);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const usr = UserStorage.getUserById(id);
        setUser(usr);
        setOriginalUser(usr);
    }, [id]);

    const handleInputChange = ({ target: { name, value } }) => setUser(prev => ({ ...prev, [name]: value }));

    const handleSubmit = (event) => {
        event.preventDefault();

        if (user.name === originalUser.name && user.email === originalUser.email) {
            setShowModal(true);
            return;
        }

        if (user.email !== originalUser.email && UserStorage.emailExists(user.email, id)) {
            setError('Email already exists.');
            return;
        }

        UserStorage.updateUser(user);
        navigate('/users');
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {user ? (
                        <>
                            <h1 className="text-center">Edit User</h1>
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        {['name', 'email'].map((field) => (
                                            <div className="form-group mb-3" key={field}>
                                                <label htmlFor={field} className="form-label text-capitalize">{field}</label>
                                                <input
                                                    type={field === 'email' ? 'email' : 'text'}
                                                    className={`form-control ${error && field === 'email' ? 'is-invalid' : ''}`}
                                                    id={field}
                                                    name={field}
                                                    value={user[field]}
                                                    onChange={handleInputChange}
                                                    placeholder={`Enter ${field}`}
                                                    required
                                                />
                                                {error && field === 'email' && <div className="invalid-feedback">{error}</div>}
                                            </div>
                                        ))}
                                        <div className="d-flex justify-content-center mt-4">
                                            <Link to="/users" className="btn btn-sm btn-primary mx-2">Cancel</Link>
                                            <button type="submit" className="btn btn-sm btn-success mx-2">Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className="text-center">User Not Found</h1>
                            <p className="text-center">The user you are trying to edit does not exist.</p>
                            <div className="text-center">
                                <Link to="/users" className="btn btn-primary">Go Back</Link>
                            </div>
                        </>
                    )}
                </div>
                <Modal
                    showModal={showModal}
                    title="Please update details!"
                    closeButton="OK"
                    onClose={() => setShowModal(false)}
                />
            </div>
        </div>
    );
};

export default EditUser;
