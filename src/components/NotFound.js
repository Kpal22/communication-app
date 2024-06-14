import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container d-flex align-items-center justify-content-center">
            <div className="text-center">
                <h1 className="display-1">Page Not Found</h1>
                <Link to="/welcome" className="btn btn-primary">Go to Home</Link>
            </div>
        </div>
    );
};

export default NotFound;
