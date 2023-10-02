import React from "react";
import Navbar from "../components/Navbar";
import img from "../assets/background.jpg";
import Footer from "../components/Footer";

const Homepage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="w-full min-h-screen bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${img})` }}
      >
        <Navbar />
        <div className="flex-grow">
          <div className="container mx-auto py-8">
            <h1 className="text-white text-center text-2xl">
              Welcome to My App
            </h1>
            <p className="text-white text-center text-lg">
              Get started with our awesome features.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
