import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { ExternalLink } from 'lucide-react';
import { playBoing } from '../utils/audio';

const projects: Project[] = [
  {
    id: 1,
    title: "NextGen",
    category: "Next.js & MongoDB",
    tech: ["Next.js", "MongoDB", "NextAuth", "Protected APIs"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=80",
    description: "Production-ready e-commerce web app with secure NextAuth authentication, role-based access control, CRUD operations with protected API routes, and persistent Add to Cart system.",
    githubUrl: "https://github.com/SHAN0003"
  },
  {
    id: 2,
    title: "Shopezy",
    category: "React.js Platform",
    tech: ["React.js", "JavaScript", "Context API", "SCSS"],
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop&q=80",
    description: "Responsive e-commerce platform with product browsing, cart, and order management. Mobile-friendly layouts, fast load times, and RESTful APIs with React Hooks & Context API.",
    githubUrl: "https://github.com/SHAN0003"
  },
  {
    id: 3,
    title: "3D Physics Lab",
    category: "fotonVR / Three.js",
    tech: ["Three.js", "JavaScript", "WebGL", "Physics Simulation"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    description: "Developed over 10+ 3D interactive learning activities using Three.js, visualizing complex physics concepts like Projectile Motion, Hall Effect, and Photoelectric Effect.",
    githubUrl: "https://github.com/SHAN0003"
  },
  {
    id: 4,
    title: "Animated Portfolio",
    category: "React & Framer Motion",
    tech: ["React.js", "Framer Motion", "Tailwind CSS", "Neo-Brutalism"],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    description: "Animated portfolio showcasing smooth UI transitions, dynamic micro-interactions, responsive design, and motion design using Framer Motion.",
    githubUrl: "https://github.com/SHAN0003"
  }
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
      className="relative group w-full cursor-pointer"
      onClick={() => project.githubUrl && window.open(project.githubUrl, '_blank')}
      data-cursor-hover
    >
      <div className="w-full aspect-[4/3] bg-white border-[3px] border-black rounded-2xl overflow-hidden neo-shadow-lg relative z-10 group-hover:shadow-[12px_12px_0px_0px_#000] transition-shadow duration-200">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
        />

        {/* Overlay Label */}
        <div className="absolute top-4 left-4 bg-yellow-400 border-2 border-black px-3 py-1 rounded-full text-xs font-bold uppercase neo-shadow">
          {project.category}
        </div>
      </div>

      <div className="mt-6 pl-2">
        <h3 className="text-3xl md:text-4xl font-black mb-2 text-black group-hover:text-pink-500 transition-colors">{project.title}</h3>
        
        {project.tech && (
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tech.map((t, idx) => (
              <span key={idx} className="text-xs font-bold bg-yellow-100 border border-black px-2 py-0.5 rounded-md neo-shadow">
                {t}
              </span>
            ))}
          </div>
        )}
        
        <p className="text-gray-700 font-medium text-base md:text-lg leading-relaxed">{project.description}</p>
      </div>

      <div
        className="absolute top-[-20px] right-[-20px] p-4 rounded-full bg-blue-400 border-[3px] border-black z-20 scale-0 group-hover:scale-100 transition-transform duration-300 neo-shadow"
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
