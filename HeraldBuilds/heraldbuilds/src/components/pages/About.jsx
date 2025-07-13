import React, { useEffect } from "react";
import HeroSection from "./AboutHero";
import OurStory from "./AboutOurStory";
import OurMission from "./AboutOurMission";
import OurValues from "./AboutOurValues";
import OurTeam from "./AboutOurTeam";
import Header from "./Header";
import Footer from "./Footer";
import "./Styles/About_styles.css";

const About = () => {
  useEffect(() => {
    document.title = "About Us - Herald Builds";
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