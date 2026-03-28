import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingChat from './FloatingChat';

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-background text-primary font-body">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <Outlet />
            </main>
            <Footer />
            <FloatingChat />
        </div>
    );
};

export default MainLayout;
