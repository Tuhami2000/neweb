'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

export function Page() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const sectionRefs = [useRef(null), useRef(null)]

  useEffect(() => {
    const handleScroll = () => {
      const pageYOffset = window.pageYOffset
      let newActiveSection = 0

      sectionRefs.forEach((ref, index) => {
        if (ref.current && pageYOffset >= ref.current.offsetTop - 50) {
          newActiveSection = index
        }
      })

      setActiveSection(newActiveSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [/* other dependencies */, sectionRefs])

  const scrollToSection = (index) => {
    sectionRefs[index].current?.scrollIntoView({ behavior: 'smooth' })
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="bg-black text-white">
      <section ref={sectionRefs[0]} className="h-screen flex flex-col justify-center items-center relative">
        <motion.h1 
          className="text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Almacenes Tuhami SL
        </motion.h1>
        <motion.p 
          className="text-xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Tu socio de confianza en Melilla
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => scrollToSection(1)}
            className="bg-white text-black hover:bg-gray-200 border-white"
          >
            Descubre más
          </Button>
        </motion.div>
        <motion.div
          className="absolute bottom-8 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <ChevronDown 
            className="animate-bounce" 
            size={32}
            onClick={() => scrollToSection(1)}
          />
        </motion.div>
      </section>

      <section ref={sectionRefs[1]} className="min-h-screen flex flex-col justify-center items-center py-16">
        <motion.h2 
          className="text-4xl font-bold mb-12"
          {...fadeInUp}
        >
          Información de Contacto
        </motion.h2>
        <motion.div {...fadeInUp}>
          <Card className="bg-gray-900 text-white w-full max-w-md">
            <CardContent className="space-y-6 p-6">
              <motion.div className="flex items-start space-x-4" {...fadeInUp}>
                <MapPin size={24} className="mt-1" />
                <div className="text-lg flex flex-col">
                  <span>C/General Margallo 13</span>
                  <span>52002 Melilla</span>
                  <span>España</span>
                </div>
              </motion.div>
              <motion.div className="flex items-center space-x-4" {...fadeInUp}>
                <Phone size={24} />
                <span className="text-lg">0034952680124</span>
              </motion.div>
              <motion.div className="flex items-center space-x-4" {...fadeInUp}>
                <Mail size={24} />
                <a href="mailto:info@tuhami.es" className="text-lg hover:underline">
                  info@tuhami.es
                </a>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <footer className="absolute bottom-0 w-full py-4 text-center text-gray-400">
        © 2023 Almacenes Tuhami SL. Todos los derechos reservados.
      </footer>
    </div>
  )
}
