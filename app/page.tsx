import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Landing from "@/sections/Landing";
import Projects from "@/sections/Projects";
import BackgroundTextures from "@/lib/BackgroundTextures";

export default function Home() {
  return (
    <>
      <BackgroundTextures />
      <Nav />
      <main className="relative z-10">
        <Landing />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
