'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface CourseCard {
  id: number;
  number: string;
  title: string;
  description: string;
  bgColor: string;
  inactiveBgColor: string;
  image?: string;
}

const CourseStats = () => {
  const [activeCard, setActiveCard] = useState(0);

  const cards: CourseCard[] = [
    {
      id: 0,
      number: '23',
      title: 'All Courses',
      description: 'courses you\'re powering through right now.',
      bgColor: 'bg-[rgb(195,50,65)] ',
      inactiveBgColor: 'bg-[rgb(249,235,236)] ',
      image: '/next1.png',
    },
    {
      id: 1,
      number: '05',
      title: 'Upcoming Courses',
      description: 'exciting new courses waiting to boost your skills.',
      bgColor: 'bg-[rgb(195,50,65)] ',
      inactiveBgColor: 'bg-[rgb(249,235,236)] ',
      image: '/next1.png',
    },
    {
      id: 2,
      number: '10',
      title: 'Ongoing Courses',
      description: 'currently happening—don\'t miss out on the action!',
      bgColor: 'bg-[rgb(195,50,65)] ',
      inactiveBgColor: 'bg-[rgb(249,235,236)] ',
      image: '/next1.png',
    },
  ];

  const getCardWidth = (index: number) => {
    return activeCard === index ? 'md:col-span-2' : 'md:col-span-1';
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className={`${getCardWidth(index)} cursor-pointer h-full`}
              onClick={() => setActiveCard(index)}
              layout
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div
                className={`${activeCard === index ? card.bgColor : card.inactiveBgColor} rounded-3xl p-8 h-full flex flex-col justify-between min-h-[400px] md:min-h-[450px] overflow-hidden`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: activeCard === index ? 1.02 : 1.05 }}
              >
                {/* ACTIVE CARD CONTENT */}
                {activeCard === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col h-full justify-between"
                  >
                    {/* View all Courses button */}
                    <div className="flex justify-end mb-4">
                      <button className="text-white text-sm font-medium hover:opacity-80 transition-opacity">
                        View all Courses →
                      </button>
                    </div>

                    {/* Image */}
                    {card.image && (
                      <div className="relative w-full h-40 my-4">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}

                    {/* Bottom Section */}
                    <div className="flex gap-6 items-end mt-auto">
                      {/* Number Section */}
                      <div className="relative w-2/5 flex-shrink-0">
                        <span className="text-8xl lg:text-9xl font-bold leading-none text-white">
                          {card.number}
                        </span>
                        <span className="absolute -top-4 -right-2 text-3xl font-bold text-white">+</span>
                      </div>

                      {/* Title and Description */}
                      <div className="flex-1 pb-2">
                        <h3 className="text-4xl font-bold mb-1 text-white mb-4">{card.title}</h3>
                        <p className="text-md opacity-95 text-white">{card.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* INACTIVE CARD CONTENT */}
                {activeCard !== index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col h-full justify-between items-center py-4"
                  >
                    {/* Vertical Text Container */}
                    <div className="flex-1 flex items-start justify-center w-full">
                      <div 
                        className="text-[#c33241] font-bold text-center"
                        style={{ 
                          writingMode: 'vertical-rl',
                          textOrientation: 'mixed',
                          transform: 'rotate(180deg)'
                        }}
                      >
                        <h3 className="text-3xl md:text-3xl pl-2 font-bold mb-4">{card.title}</h3>
                        <p className="text-md md:text-md opacity-80 font-normal leading-relaxed max-h-[200px]">
                          {card.description}
                        </p>
                      </div>
                    </div>

                    {/* Number at bottom */}
                    <div className="relative mt-8">
                      <span className="text-6xl md:text-7xl font-bold text-[#c33241]">
                        {card.number}
                      </span>
                      <span className="absolute -top-2 -right-4 text-2xl font-bold text-[#c33241]">+</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseStats;