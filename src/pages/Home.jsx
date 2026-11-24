import Hero from '../components/Hero';
import ProjectsSection from '../components/ProjectsSection';
import CoursesSection from '../components/CoursesSection';

/** Page d'accueil (route "/") : Hero + section Projets + section Formations. */
function Home() {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <hr className="container" />
      <CoursesSection />
    </>
  );
}

export default Home;
