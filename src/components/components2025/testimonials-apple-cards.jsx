"use client"

import { useEffect, useRef, useState, useContext } from "react"
import { motion, AnimatePresence } from "motion/react"
import { IconX } from "@tabler/icons-react"
import { CarouselContext, Carousel } from "@components/ui/apple-cards-carousel"
import { useOutsideClick } from "../../hooks/outside-click"
import testimonialsData from "../../data/2025/testimonials.json"

const TestimonialExpandedContent = ({ testimonial }) => {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
  }

  return (
    <div className="space-y-4">
      {/* Author header */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          {getInitials(testimonial.name)}
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
          <p className="text-white/70 text-sm">{testimonial.institution}</p>
        </div>
      </div>

      {/* Full testimonial */}
      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
        <svg className="w-8 h-8 text-white/60 mb-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
        </svg>
        <blockquote className="text-white text-base leading-relaxed">"{testimonial.testimonial}"</blockquote>
      </div>
    </div>
  )
}

const TestimonialCard = ({ card, index }) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const { onCardClose } = useContext(CarouselContext)

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
  }

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") handleClose()
    }

    document.body.style.overflow = open ? "hidden" : "auto"
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  useOutsideClick(containerRef, () => handleClose())

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    onCardClose(index)
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              ref={containerRef}
              className="relative z-60 w-full max-w-lg rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6"
            >
              <button
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                onClick={handleClose}
              >
                <IconX className="h-5 w-5 text-white" />
              </button>
              <div className="pt-2">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleOpen}
        className="relative z-10 h-96 w-72 md:h-[28rem] md:w-80 lg:w-96 overflow-hidden rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-6 text-left flex flex-col hover:bg-white/15 transition-all duration-300"
      >
        {/* Quote icon */}
        <svg className="w-10 h-10 text-white/60 mb-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
        </svg>

        {/* Testimonial text */}
        <div className="flex-1 mb-4">
          <p className="text-white text-base leading-relaxed font-light line-clamp-6">{card.testimonial.testimonial}</p>
        </div>

        {/* Author section */}
        <div className="flex items-center space-x-3 mt-auto">
          <div
            className={`w-12 h-12 rounded-full bg-gradient-to-br ${card.avatarColor} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
          >
            {getInitials(card.testimonial.name)}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-white font-semibold text-base truncate">{card.testimonial.name}</h4>
            <p className="text-white/70 text-sm truncate">{card.testimonial.institution}</p>
          </div>
        </div>
      </motion.button>
    </>
  )
}

const TestimonialsAppleCards = () => {
  const avatarColors = [
    "from-teal-400 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-purple-600 to-indigo-600",
    "from-blue-500 to-purple-500",
  ]

  const cards = testimonialsData.map((testimonial, index) => ({
    testimonial,
    avatarColor: avatarColors[index % avatarColors.length],
    content: <TestimonialExpandedContent testimonial={testimonial} />,
  }))

  const cardsElements = cards.map((card, index) => <TestimonialCard key={index} card={card} index={index} />)

  return (
    <div  id="testimonial" className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">What Our Participants Say</h2>
          <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">
            Hear from the amazing individuals who joined our workshop.
          </p>
        </div>
        <Carousel items={cardsElements} />
      </div>
    </div>
  )
}

export default TestimonialsAppleCards