import HeroSection from "../components/HeroSection"
import LatestRelease from "../components/LatestRelease"
import About from "../components/About"
const HomePage = () => {
  return (
    <div>
      {/* Contenu de la page d'accueil */}
      <HeroSection/>
      <LatestRelease/>
      <About/>
    </div>  
  )
}

export default HomePage