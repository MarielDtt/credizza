'use client'
import ConstructionDialog from "@/components/home/ConstructionDialog";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";




export default function Home() {
  return (
    <div className="space-y-6 text-display">
      <Marquee />
      <Hero />
      <ConstructionDialog />

    </div>
  )
}