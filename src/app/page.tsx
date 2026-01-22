'use client'
import ConstructionDialog from "@/components/home/ConstructionDialog";
import Contact from "@/components/home/Contact";
import Experience from "@/components/home/Experience";
import Hero from "@/components/home/Hero";
import HomeCarousel from "@/components/home/HomeCarousel";
import Marquee from "@/components/home/Marquee";
import TreeSteps from "@/components/home/ThreeSteps";

export default function Home() {
  return (
    <div className=" text-display">
      <div className="mt-8 lg:mt-12">
        <Marquee />
      </div>
      <div className="pb-8 mt-8 lg:mt-12">
        <Hero />
      </div>
      <div className="mt-8 lg:mt-12">
        <TreeSteps />
      </div>
      <div className="mt-8 lg:mt-12">
        <HomeCarousel />
      </div>
      <div className="mt-8 lg:mt-12">
        <Contact />
      </div>
      <div className="mt-8 lg:mt-12">
        <Experience />
      </div>
      <ConstructionDialog />
    </div>
  )
}