import { useNavigate } from "react-router-dom";

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="container mt-5">
            <div className="text-center">
                <h1>Welcome to Communication Application</h1>
                <div className="mt-4">
                    <h2>Existing Users</h2>
                    <button className="btn btn-primary my-2" onClick={() => navigate('/login')}>Login</button>
                </div>
                <div className="mt-4">
                    <h2>New Users</h2>
                    <button className="btn btn-success my-2" onClick={() => navigate('/register')}>Register</button>
                </div>
            </div>
        </div>
    );
}

export default Welcome;
