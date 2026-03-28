import { Link } from 'react-router-dom';

const NotFoundScreen = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-9xl font-heading font-bold text-primary mb-4">404</h1>
            <p className="text-2xl text-gray-600 mb-8 font-medium">Oops! The page you are looking for does not exist.</p>
            <div className="flex gap-4">
                <Link
                    to="/"
                    className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition shadow-lg hover:shadow-xl"
                >
                    Go Home
                </Link>
                <Link
                    to="/contact"
                    className="bg-white text-primary border-2 border-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition"
                >
                    Contact Support
                </Link>
            </div>
            <div className="mt-12 text-gray-400 text-sm">
                Error Code: 404 Not Found
            </div>
        </div>
    );
};

export default NotFoundScreen;
