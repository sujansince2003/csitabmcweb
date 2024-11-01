"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function ProfessionalHero() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center">
              <Image
                src="/placeholder.svg"
                alt="CSIT Logo"
                width={40}
                height={40}
                className="w-auto h-8 md:h-10"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">CSIT</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-900 hover:text-blue-600 transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-900 hover:text-blue-600 transition-colors font-medium"
              >
                About
              </Link>
              <Link
                href="/notices"
                className="text-gray-900 hover:text-blue-600 transition-colors font-medium"
              >
                Notices
              </Link>
              <Link
                href="/contact"
                className="text-gray-900 hover:text-blue-600 transition-colors font-medium"
              >
                Contact
              </Link>
              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Link href="/events">Events</Link>
              </Button>
            </div>
            <button className="md:hidden p-2" aria-label="Menu">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 lg:pt-0 min-h-screen flex items-center bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0"
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Empowering Future Tech Leaders at{" "}
                <span className="text-blue-600">CSIT</span>
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-700 mb-6">
                We are{" "}
                
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join us in shaping the future of technology. Our programs are designed to nurture your skills and prepare you for the challenges of tomorrow's tech landscape.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                >
                  <Link href="/programs">
                    Explore Programs
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <Image
                src="/placeholder.svg"
                alt="CSIT Students"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}