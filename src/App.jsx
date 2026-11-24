import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import CoursesPage from './pages/CoursesPage';
import InscriptionPage from './pages/InscriptionPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

/**
 * Composant racine : met en place le routeur et la structure commune
 * (Header / contenu de la page / Footer).
 */
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projets" element={<ProjectsPage />} />
            <Route path="/formations" element={<CoursesPage />} />
            {/* Route dynamique : :courseId est optionnel */}
            <Route path="/inscription/:courseId?" element={<InscriptionPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
