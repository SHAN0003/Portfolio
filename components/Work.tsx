import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { ExternalLink } from 'lucide-react';
import { playBoing } from '../utils/audio';

const projects: Project[] = [
  {
    id: 1,
    title: "DEV-CIRCLE",
    category: "Social Media",
    image: "/devcircle_social_thumbnail_1791118580291.jpg",
    description: "A social media platform for developers.",
    url: "https://devcircle-three.vercel.app/"
  },
  // { 
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, rotate: index % 2 === 0 ? 2 : -2 }}
      onMouseEnter={() => playBoing()}
      transition={{ type: "spring", stiffness: 200 }}
      className="relative group w-full"
      data-cursor-hover
    >
      <div className="w-full aspect-[4/3] bg-white border-[3px] border-black rounded-2xl overflow-hidden neo-shadow-lg relative z-10 group-hover:shadow-[12px_12px_0px_0px_#000] transition-shadow duration-200">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
        />

        {/* Overlay Label */}
        <div className="absolute top-4 left-4 bg-yellow-400 border-2 border-black px-3 py-1 rounded-full text-xs font-bold uppercase">
          {project.category}
        </div>
      </div>

      <div className="mt-6 pl-2">
        <h3 className="text-3xl md:text-4xl font-black mb-2 text-black group-hover:text-pink-500 transition-colors">{project.title}</h3>
        <p className="text-gray-600 font-medium text-lg leading-relaxed">{project.description}</p>
      </div>

      <div onClick={() => project.url ? window.open(project.url, "_blank") : null}
        className="absolute top-[-20px] right-[-20px] p-4 rounded-full bg-blue-400 border-[3px] border-black z-20 scale-0 group-hover:scale-100 transition-transform duration-300"
      >
        <ExternalLink className="text-black w-8 h-8" strokeWidth={3} />
      </div>
    </motion.div>
  );
};

export const Work: React.FC = () => {
  return (
    <section id="work" className="relative z-10 py-20 md:py-32 px-4 md:px-12 bg-white">
      {/* Decorative background blob */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-20 text-center md:text-left"
        >
          <h2 className="text-5xl md:text-8xl font-black mb-4 text-black drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">COOL <span className="text-pink-500">STUFF</span></h2>
          <div className="h-4 w-32 bg-black rounded-full mx-auto md:mx-0" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {projects.map((project, index) => (
            <div key={project.id} className={index % 2 === 1 ? "md:mt-32" : ""}>
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
