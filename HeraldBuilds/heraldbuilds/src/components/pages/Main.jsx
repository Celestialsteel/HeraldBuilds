import React, { useEffect } from "react";
import HeroSection from "./Hero";
import OurStory from "./OurStory";
import OurMission from "./OurMission";
import OurValues from "./OurValues";
import OurTeam from "./OurTeam";
import Header from "../components/pages/Header";
import Footer from "../components/pages/Footer";
import "../components/pages/Styles/About_styles.css";

const About = () => {
  useEffect(() => {
    document.title = "About Us";
  }, []);

  return (
    <div className="about-page">
      <Header />
      <main className="about-container">
        <HeroSection />
        <OurStory />
        <OurMission />
        <OurValues />
        <OurTeam />
      </main>
      <Footer />
    </div>
  );
};

export default About;
