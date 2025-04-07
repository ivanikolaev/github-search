import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FavouritesPage from './pages/FavouritesPage';
import TrendingPage from './pages/TrendingPage';
import RepoDetailsPage from './pages/RepoDetailsPage';
import Navigation from './components/Navigation';

function App() {
    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/favourites" element={<FavouritesPage />} />
                <Route path="/trending" element={<TrendingPage />} />
                <Route path="/repo/:repoId" element={<RepoDetailsPage />} />
            </Routes>
        </>
    );
}

export default App;
