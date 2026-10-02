import Hero from "@/components/Hero";
import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Projects from "@/components/Projects";
import Journey from "@/components/Journey";
import BlogTeaser from "@/components/BlogTeaser";
import Contact from "@/components/Contact";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Capabilities />
      <Projects />
      <Journey />
      <BlogTeaser />
      <Contact />
      <Newsletter />
      <Footer />
    </>
  );
}
