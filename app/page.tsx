"use client"

import { useState, useEffect } from "react"
import Sidebar from "@/components/sidebar"
import Hero from "@/components/hero"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Certificates from "@/components/certificates"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import ChatBot from "@/components/chatbot"
import BottomNavbar from "@/components/Navbar"


export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-row min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main 
        className="flex-1 relative w-full overflow-x-hidden"
      >
        <div className="w-full">
          <BottomNavbar/>
          <Hero />
          <Skills />
          <Projects />
          <Certificates />
          <Contact />
          <Footer />
          
        </div>

        {/* Chatbot */}
        <ChatBot />
      </main>
    </div>
  )
}
