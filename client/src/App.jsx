import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Artistes from "./pages/Artistes"
import Label from "./pages/Label"
import Adhesion from "./pages/Adhesion"
import Contact from "./pages/Contact"
import About from "./pages/About"

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artistes" element={<Artistes />} />
          <Route path="/label" element={<Label />} />
          <Route path="/adhesion" element={<Adhesion />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/a-propos" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
