import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Projects from "@/sections/Projects";
import BackgroundTextures from "@/lib/BackgroundTextures";

export default function ProjectsPage() {
  return (
    <>
      <BackgroundTextures />
      <Nav />
      <main className="relative z-10">
        <Projects />
      </main>
      <Footer />
    </>
  );
}
