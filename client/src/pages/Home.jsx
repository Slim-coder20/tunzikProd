import HeroSection from "../components/HeroSection"
import LatestRelease from "../components/LatestRelease"
import About from "../components/About"
import NewLetter from "../components/NewsLetter";
import ScrollArtists from "../components/ScrollArtists";
const HomePage = () => {
  return (
    <div>
      {/* Contenu de la page d'accueil */}
      <HeroSection />
      <LatestRelease />
      <About />
      <ScrollArtists />
      <NewLetter />
    </div>
  );
}

export default HomePage