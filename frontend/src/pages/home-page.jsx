import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";
import PropertiesItem from "@/components/properties-item.jsx";
import api from "@/lib/axios.jsx";
import HomePageImage from "@/assets/homepage.jpg";

export default function HomePage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const res = await api.get("/renter/properties");
        setProperties(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    getProperties();
  }, []);

  const previewProperties = properties.slice(0, 4);

return (
    // 1. Added 'relative' to main so it contains everything properly
    <main className="relative w-full min-h-screen overflow-x-hidden">
      
      {/* 2. Changed 'absolute' to 'fixed'. 
             This ensures the image covers the screen even when you scroll down, 
             eliminating the white bar at the bottom. */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${HomePageImage})` }}
      />
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Hero Section */}
      <section className="relative z-20 flex flex-col items-center justify-center text-center pt-10 md:pt-14 px-6">
        <TextEffect
          preset="fade-in-blur"
          speedSegment={0.3}
          as="h1"
          className="mx-auto max-w-4xl text-5xl md:text-7xl font-bold text-white"
        >
          Welcome to Brook Rents
        </TextEffect>
        <TextEffect
          per="line"
          preset="fade-in-blur"
          speedSegment={0.3}
          delay={0.5}
          as="p"
          className="mx-auto mt-6 max-w-2xl text-xl text-white"
        >
          Connecting students and locals with the homes they deserve
        </TextEffect>

        <AnimatedGroup
          variants={{
            container: { visible: { transition: { staggerChildren: 0.05 } } },
            item: {
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
            },
          }}
          className="mt-10"
        >
          <Button
            size="lg"
            className=" px-10 py-4 text-white text-base transition-colors duration-200"
            style={{ backgroundColor: "rgb(153, 0, 0)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "rgb(107, 0, 13)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "rgb(153, 0, 0)")
            }
          >
            <Link to="/renter/properties">View Properties</Link>
          </Button>
        </AnimatedGroup>
      </section>

      <section className="relative z-20 mt-20 px-6 pb-10 bg">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
            style={{ color: "white" }}
          >
            Featured Properties
          </h2>

          {loading ? (
            <p className="text-white text-center">Loading properties...</p>
          ) : previewProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {previewProperties.map((property) => (
                <PropertiesItem key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <p className="text-white text-xl text-center">
              No houses available at the moment. Please check back soon!
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
