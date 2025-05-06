import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FavouritesPage from './pages/FavouritesPage';
import TrendingPage from './pages/TrendingPage';
import RepoDetailsPage from './pages/RepoDetailsPage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import { useAppSelector } from './hooks/redux';

function App() {
    const { isAuthenticated } = useAppSelector(state => state.auth);

    return (
        <>
            <Navigation />
            <Routes>
                {/* Public routes */}
                <Route path="/login" element={<LoginPage />} />
                
                {/* Protected routes */}
                <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
                    <Route path="/search" element={<HomePage />} />
                    <Route path="/favourites" element={<FavouritesPage />} />
                    <Route path="/trending" element={<TrendingPage />} />
                    <Route path="/repo/:repoId" element={<RepoDetailsPage />} />
                </Route>
                
                {/* Role-specific dashboards */}
                <Route path="/user" element={<UserPage />} />
                <Route path="/admin" element={<AdminPage />} />
                
                {/* Redirect to login if not authenticated */}
                <Route path="*" element={
                    isAuthenticated 
                        ? <Navigate to="/" /> 
                        : <Navigate to="/login" />
                } />
                
                {/* Default route - redirect to login or home page */}
                <Route index element={
                    isAuthenticated 
                        ? <Navigate to="/" /> 
                        : <Navigate to="/login" />
                } />
            </Routes>
        </>
    );
}

export default App;
