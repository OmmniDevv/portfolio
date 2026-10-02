import { Suspense } from "react";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Journey from "@/components/Journey";
import WaifuShowcase from "@/components/WaifuShowcase";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ProjectsSkeleton from "@/components/ProjectsSkeleton";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Journey />
      <WaifuShowcase />
      <Skills />
      <Suspense fallback={<ProjectsSkeleton />}>
        <Projects />
      </Suspense>
      <Services />
      <Contact />
      <Newsletter />
      <Footer />
    </>
  );
}
