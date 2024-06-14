import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserStorage from "../database/UserStorage";
import Modal from "./Modal";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);

    const handleChange = ({ target: { name, value } }) => setFormData(prev => ({ ...prev, [name]: value }));

    const validateForm = ({ email, password, confirmPassword }) => {
        const newErrors = {};
        if (UserStorage.emailExists(email)) newErrors.email = "Email already exists!";
        if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match!";
        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm(formData)) {
            const { name, email, password } = formData;
            UserStorage.saveUser({ id: Date.now(), name, email, password });
            setShowModal(true);
        }
    };

    return (
        <div className="container mt-5">
            <Link to="/welcome" className="btn btn-sm btn-outline-primary">Go Back</Link>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className="text-center">Register</h1>
                    <form onSubmit={handleSubmit}>
                        {['name', 'email', 'password', 'confirmPassword'].map(field => (
                            <div className="mb-3" key={field}>
                                <label htmlFor={field} className="form-label text-capitalize">
                                    {field === 'confirmPassword' ? 'Confirm Password' : field}
                                </label>
                                <input
                                    type={field.includes('assword') ? 'password' : 'text'}
                                    id={field}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder={`Enter ${field === 'confirmPassword' ? 'password again' : field}`}
                                    required
                                    minLength={field.includes('password') ? 8 : undefined}
                                />
                                {errors[field] && <div className="text-danger">{errors[field]}</div>}
                            </div>
                        ))}
                        <button type="submit" className="btn btn-primary w-100">Register</button>
                    </form>
                </div>
            </div>
            <Modal
                showModal={showModal}
                title="Registration Successful"
                body="Your registration was successful!"
                closeButton="Return to Home"
                onClose={() => navigate("/welcome")}
            />
        </div>
    );
};

export default Register;
