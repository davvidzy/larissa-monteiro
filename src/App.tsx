import { useEffect } from "react";
import { track } from "./lib/analytics";
import { Header } from "./components/sections/Header";
import { Hero } from "./components/sections/Hero";
import { VideoSection } from "./components/sections/VideoSection";
import { About } from "./components/sections/About";
import { Testimonials } from "./components/sections/Testimonials";
import { WhatsInside } from "./components/sections/WhatsInside";
import { Bonuses } from "./components/sections/Bonuses";
import { Plans } from "./components/sections/Plans";
import { Faq } from "./components/sections/Faq";
import { Footer } from "./components/sections/Footer";

let pageViewTracked = false;

export default function App() {
  useEffect(() => {
    if (pageViewTracked) return;
    pageViewTracked = true;
    track("page_view");
    // Chegada à oferta; quiz_result indica de qual resultado do quiz a visitante veio
    const quizResult = new URLSearchParams(window.location.search).get("quiz_result") ?? undefined;
    track("landing_page_viewed", { from_quiz: !!quizResult, quiz_result: quizResult });
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <VideoSection />
        <About />
        <Testimonials />
        <WhatsInside />
        <Bonuses />
        <Plans />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
