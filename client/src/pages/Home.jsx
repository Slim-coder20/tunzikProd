import HeroSection from "../components/HeroSection"
import LatestRelease from "../components/LatestRelease"
import About from "../components/About"
import NewLetter from "../components/NewsLetter";
const HomePage = () => {
  return (
    <div>
      {/* Contenu de la page d'accueil */}
      <HeroSection />
      <LatestRelease />
      <About />
      <NewLetter />
    </div>
  );
}

export default HomePage