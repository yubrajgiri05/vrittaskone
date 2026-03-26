'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface CardData {
  id: string;
  frontImage: string;
  frontTitle: string;
  frontSubtitle: string;
  frontDescription: string;
  frontLayout: 'left-bottom' | 'right-bottom';
  backImage: string;
  backTitle: string;
  bgColor: string;
  textColor?: string;
  backLayout?: 'default' | 'full-bg' | 'overlay' | 'bottom-image';
}

function FlipCard({
  frontImage,
  frontTitle,
  frontSubtitle,
  frontDescription,
  frontLayout,
  backImage,
  backTitle,
  bgColor,
  textColor = 'white',
  backLayout = 'default',
}: CardData) {
  const [isHovered, setIsHovered] = useState(false);
  const isLeftBottom = frontLayout === 'left-bottom';

  return (
    <div className="overflow-visible h-[320px] my-8">
      <motion.div
        className={`relative overflow-visible rounded-3xl cursor-pointer ${bgColor} h-full`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={false}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* FRONT CARD */}
        <motion.div
          className="absolute inset-0 p-8 flex items-center overflow-visible"
          animate={{
            x: isHovered ? '-100%' : '0%',
            opacity: isHovered ? 0 : 1,
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {isLeftBottom ? (
            <>
              {/* Image container - 35% width, full height */}
              <div className="relative w-[35%] h-full self-end z-10 overflow-visible">
                <motion.div 
                  className="absolute bottom-[-15%] left-[-15%] w-[150%] h-[150%] -mb-8 -ml-12"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 2, -2, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Image
                    src={frontImage}
                    alt={frontTitle}
                    fill
                    className="object-contain object-bottom-left"
                    sizes="35vw"
                  />
                </motion.div>
              </div>

              {/* Text 65% */}
              <div className={`w-[65%] text-${textColor} pl-4`}>
                <h3 className="text-4xl font-bold mb-3 leading-tight">{frontTitle}</h3>
                <p className={`text-lg font-semibold opacity-95 mb-4`}>
                  {frontSubtitle}
                </p>
                <p className={`text-sm opacity-80 leading-relaxed`}>
                  {frontDescription}
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Text 65% */}
              <div className={`w-[65%] text-${textColor} pr-4`}>
                <h3 className="text-4xl font-bold mb-3 leading-tight">{frontTitle}</h3>
                <p className={`text-lg font-semibold opacity-95 mb-4`}>
                  {frontSubtitle}
                </p>
                <p className={`text-sm opacity-80 leading-relaxed`}>
                  {frontDescription}
                </p>
              </div>

              {/* Image container - 35% width, full height - FIXED to overflow bottom-right */}
              <div className="relative w-[35%] h-full self-end z-10 overflow-visible">
                <motion.div 
                  className="absolute bottom-[-10%] right-[-20%] w-[180%] h-[150%] -mb-8 -mr-12"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 2, -2, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Image
                    src={frontImage}
                    alt={frontTitle}
                    fill
                    className="object-contain object-bottom-right"
                    sizes="35vw"
                  />
                </motion.div>
              </div>
            </>
          )}
        </motion.div>

        {/* BACK CARD */}
        <AnimatePresence>
          {isHovered && (
            <>
              {backLayout === 'bottom-image' ? (
                // Bottom image layout: Text on top, image on bottom touching card edge
                <motion.div
                  className={`absolute inset-0 ${bgColor} rounded-3xl overflow-hidden`}
                  initial={{ x: '100%', opacity: 0 }}
                  animate={{ x: '0%', opacity: 1 }}
                  exit={{ x: '100%', opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="flex flex-col h-full relative">
                    {/* Text on top */}
                    <motion.div 
                      className={`pt-12 px-6 text-${textColor} text-center`}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <h2 className="text-2xl font-bold leading-tight">
                        {backTitle}
                      </h2>
                    </motion.div>

                    {/* Image on bottom - takes remaining space and touches bottom */}
                    <motion.div 
                      className="flex-1 relative mt-8 mx-6 mb-0"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <div className="relative w-full h-full rounded-2xl overflow-hidden">
                        <Image
                          src={backImage}
                          alt={backTitle}
                          fill
                          className="object-cover object-center"
                          sizes="100vw"
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Navigation arrows */}
                  <motion.div 
                    className="absolute left-2 top-1/2 -translate-y-1/2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <button className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  </motion.div>

                  <motion.div 
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <button className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </motion.div>
                </motion.div>
              ) : backLayout === 'overlay' ? (
                // Overlay layout: Image fills card bottom with text in top-left
                <motion.div
                  className={`absolute inset-0 ${bgColor} rounded-3xl overflow-hidden`}
                  initial={{ x: '100%', opacity: 0 }}
                  animate={{ x: '0%', opacity: 1 }}
                  exit={{ x: '100%', opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="relative w-full h-full flex flex-col">
                    {/* Text on top-left */}
                    <motion.div 
                      className={`pt-8 px-6 text-${textColor} text-left`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <h2 className="text-2xl font-bold leading-tight">
                        {backTitle}
                      </h2>
                    </motion.div>

                    {/* Image on bottom - takes remaining space and touches bottom */}
                    <motion.div 
                      className="flex-1 relative mt-6 mx-6 mb-0"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <div className="relative w-full h-full rounded-2xl overflow-hidden">
                        <Image
                          src={backImage}
                          alt={backTitle}
                          fill
                          className="object-cover object-center"
                          sizes="100vw"
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Navigation arrows */}
                  <motion.div 
                    className="absolute left-2 top-1/2 -translate-y-1/2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <button className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  </motion.div>

                  <motion.div 
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <button className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </motion.div>
                </motion.div>
              ) : backLayout === 'full-bg' ? (
                // New layout: Full background with 60% image, 40% text
                <motion.div
                  className={`absolute inset-0 ${bgColor} rounded-3xl overflow-hidden`}
                  initial={{ x: '100%', opacity: 0 }}
                  animate={{ x: '0%', opacity: 1 }}
                  exit={{ x: '100%', opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="flex h-full relative">
                    {/* Image - 60% */}
                    <motion.div 
                      className="relative w-3/5 h-full"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <Image
                        src={backImage}
                        alt={backTitle}
                        fill
                        className="object-cover object-center"
                        sizes="60vw"
                      />
                    </motion.div>

                    {/* Text - 40% */}
                    <motion.div 
                      className={`w-2/5 p-8 flex flex-col justify-center text-${textColor}`}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <h2 className="text-2xl font-bold leading-tight">
                        {backTitle}
                      </h2>
                    </motion.div>
                  </div>

                  {/* Navigation arrows */}
                  <motion.div 
                    className="absolute left-2 top-1/2 -translate-y-1/2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <button className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  </motion.div>

                  <motion.div 
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <button className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </motion.div>
                </motion.div>
              ) : (
                // Original layout for other cards
                <motion.div
                  className={`absolute inset-0 ${bgColor} rounded-3xl overflow-hidden`}
                  initial={{ x: '100%', opacity: 0 }}
                  animate={{ x: '0%', opacity: 1 }}
                  exit={{ x: '100%', opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="flex h-full">
                    <motion.div 
                      className="relative w-1/2 h-full"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <Image
                        src={backImage}
                        alt={backTitle}
                        fill
                        className="object-cover object-center"
                        sizes="50vw"
                      />
                    </motion.div>

                    <motion.div 
                      className={`w-1/2 p-6 flex flex-col justify-center text-${textColor}`}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <h2 className="text-xl md:text-2xl font-bold leading-tight">
                        {backTitle}
                      </h2>
                    </motion.div>
                  </div>

                  <motion.div 
                    className="absolute left-2 top-1/2 -translate-y-1/2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <button className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  </motion.div>

                  <motion.div 
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <button className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function CardStack() {
  const cards: CardData[] = [
    {
      id: '1',
      frontImage: '/img4.png',
      frontTitle: 'Start with Clarity',
      frontSubtitle: 'Step into a better learning path.',
      frontDescription: 'Overwhelmed by too many learning options? SkillShikshya provides a clear, curated roadmap from the start. Whether you\'re a beginner or upskilling, we have a path tailored to your growth.',
      frontLayout: 'left-bottom',
      backImage: '/backimg3.png',
      backTitle: 'Clarity unlocked— stickers, sips, and skills all in one go!',
      bgColor: 'bg-red-500',
      backLayout: 'full-bg',
    },
    {
      id: '2',
      frontImage: '/img1.png',
      frontTitle: 'Learn by Doing',
      frontSubtitle: 'Practical skills, real projects.',
      frontDescription: 'Theory is great, but action is better. At SkillShikshya, you learn by doing. Hands-on projects and real-world scenarios help you build, break, and create—leading to true mastery.',
      frontLayout: 'right-bottom',
      backImage: '/backimg1.png',
      backTitle: 'Focused faces—learning mode: ON!',
      bgColor: 'bg-teal-600',
      backLayout: 'bottom-image',
    },
    {
      id: '3',
      frontImage: '/img2.png',
      frontTitle: 'Get Mentored & Supported',
      frontSubtitle: 'You\'re not learning alone.',
      frontDescription: 'Stuck? Need feedback? Our community has your back—with live support, interactive discussions, and expert insights.',
      frontLayout: 'left-bottom',
      backImage: '/backimg2.png',
      backTitle: 'Focused faces—learning mode: ON!',
      bgColor: 'bg-purple-600',
      backLayout: 'overlay',
    },
    {
      id: '4',
      frontImage: '/img3.png',
      frontTitle: 'Achieve & Showcase',
      frontSubtitle: 'Build your portfolio, get job-ready.',
      frontDescription: 'Your journey ends with real impact. Each completed project builds up your résumé, strengthens your career, and gets you ready to present your best version.',
      frontLayout: 'right-bottom',
      backImage: '/backimg1.png',
      backTitle: 'Laptops, lessons, and a whole lot of growth!',
      bgColor: 'bg-amber-700',
      backLayout: 'bottom-image',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {cards.map((card) => (
          <FlipCard key={card.id} {...card} />
        ))}
      </div>
    </section>
  );
}