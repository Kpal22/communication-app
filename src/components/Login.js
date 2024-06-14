import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserStorage from "../database/UserStorage";
import Modal from "./Modal";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showModal, setShowModal] = useState(false);

    const handleChange = ({ target: { name, value } }) => setFormData(prev => ({ ...prev, [name]: value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formData;
        const user = UserStorage.findUser(email, password);
        if (user) {
            UserStorage.saveUserToSession(user);
            navigate("/");
        } else {
            setShowModal(true);
        }
    };

    return (
        <div className="container mt-5">
            <Link to="/welcome" className="btn btn-sm btn-outline-primary">Go Back</Link>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className="text-center">Login</h1>
                    <form onSubmit={handleSubmit}>
                        {["email", "password"].map(field => (
                            <div className="mb-3" key={field}>
                                <label htmlFor={field} className="form-label text-capitalize">
                                    {field}
                                </label>
                                <input
                                    type={field}
                                    id={field}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder={`Enter ${field}`}
                                    required
                                />
                            </div>
                        ))}
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                </div>
            </div>
            <Modal
                showModal={showModal}
                title="Login Failed"
                body="User does not exist!"
                closeButton="OK"
                onClose={() => setShowModal(false)}
            />
        </div>
    );
};

export default Login;
