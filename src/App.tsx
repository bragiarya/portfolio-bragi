import CursorGlow from "./components/CursorGlow";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <div className="scene-backdrop" aria-hidden="true" />
      <CursorGlow />
      <Navigation />
      <main className="relative z-10 w-full bg-transparent pt-20">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
