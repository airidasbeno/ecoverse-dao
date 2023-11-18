import React from 'react';
import HeroSection from "./homepage/HeroSection";
import AboutUs from "./homepage/AboutUs";
import OurMission from "./homepage/OurMission";

const Homepage: React.FC = () => {
    return (
        <>
            <HeroSection />
            <OurMission />
            <AboutUs />
        </>
    )
}

export default Homepage;
