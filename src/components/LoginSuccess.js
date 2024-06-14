import UserStorage from "../database/UserStorage";

const LoginSuccess = () => {
    const user = UserStorage.getUserFromSession();

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card text-center">
                        <div className="card-header">
                            <h1 className="card-title">Login Successful</h1>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Welcome!</h5>
                            <p className="card-text"><strong>{user.name}</strong></p>
                            <p className="card-text"><em>{user.email}</em></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginSuccess;
