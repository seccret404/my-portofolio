import Layout from "../../Components/Layout/Layout";
import { motion } from "framer-motion";

export default function ExperiencePage() {
  const experiences = [
    {
      company: "Tech Solutions Inc.",
      role: "Senior Frontend Developer",
      period: "Jan 2022 - Present",
      contributions: [
        "Led migration from legacy AngularJS to React, improving performance by 40%",
        "Implemented CI/CD pipeline reducing deployment time by 65%",
        "Mentored 5 junior developers in modern JavaScript practices",
        "Designed and implemented new UI component library"
      ],
      techStack: ["React", "TypeScript", "GraphQL", "Jest", "AWS"]
    },
    {
      company: "Digital Innovations Ltd.",
      role: "Full Stack Developer",
      period: "Mar 2019 - Dec 2021",
      contributions: [
        "Developed RESTful APIs handling 10,000+ requests per minute",
        "Optimized database queries reducing response time by 30%",
        "Implemented real-time features using WebSockets",
        "Collaborated with UX team to redesign customer portal"
      ],
      techStack: ["Node.js", "Express", "MongoDB", "React", "Docker"]
    },
    {
      company: "StartUp Ventures",
      role: "Junior Web Developer",
      period: "Jun 2017 - Feb 2019",
      contributions: [
        "Built responsive landing pages increasing conversion by 25%",
        "Implemented A/B testing framework",
        "Maintained legacy PHP applications",
        "Automated internal reporting tools"
      ],
      techStack: ["JavaScript", "PHP", "MySQL", "Bootstrap", "jQuery"]
    }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        when: "beforeChildren"
      } 
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <Layout>
      <div className="min-h-screen mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeIn}
            className="text-center mb-16"
          >
            <motion.h1 
              className="text-5xl font-bold text-[#cee8ff] mb-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Work Experience
            </motion.h1>
            <motion.p 
              className="text-lg text-[#94A3B8] mb-12"
              whileHover={{ scale: 1.01 }}
            >
              My professional journey and contributions
            </motion.p>
          </motion.div>

          <motion.div 
            className="relative"
            initial="hidden"
            animate="show"
            variants={container}
          >
            <div className="space-y-10">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  variants={item}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {/* Experience card */}
                  <motion.div
                    className="bg-[#1F3A5F] rounded-lg p-6 border border-[#3D5A80] hover:border-[#4d648d] transition-all hover:shadow-lg"
                    whileHover={{ 
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div>
                        <motion.h2 
                          className="text-2xl font-bold text-white"
                          whileHover={{ color: "#cee8ff" }}
                        >
                          {exp.company}
                        </motion.h2>
                        <motion.h3 
                          className="text-xl text-[#cee8ff]"
                          whileHover={{ scale: 1.01 }}
                        >
                          {exp.role}
                        </motion.h3>
                      </div>
                      <motion.div 
                        className="bg-[#3D5A80] text-white px-3 py-1 rounded-md text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {exp.period}
                      </motion.div>
                    </div>

                    <div className="mt-6">
                      <motion.h4 
                        className="text-lg font-semibold text-white mb-3"
                        whileHover={{ x: 5 }}
                      >
                        Key Contributions:
                      </motion.h4>
                      <ul className="space-y-2">
                        {exp.contributions.map((item, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i, duration: 0.4 }}
                            viewport={{ once: true }}
                          >
                            <motion.span 
                              className="text-[#4d648d] mr-2"
                              animate={{ rotate: [0, 10, 0] }}
                              transition={{ 
                                repeat: Infinity,
                                repeatType: "reverse",
                                duration: 2,
                                delay: i * 0.3
                              }}
                            >
                              •
                            </motion.span>
                            <span className="text-[#E2E8F0]">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6">
                      <motion.h4 
                        className="text-lg font-semibold text-white mb-3"
                        whileHover={{ x: 5 }}
                      >
                        Tech Stack:
                      </motion.h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.techStack.map((tech, i) => (
                          <motion.span 
                            key={i} 
                            className="px-3 py-1 bg-[#4d648d] rounded-full text-sm text-white"
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ 
                              scale: 1.1,
                              backgroundColor: "#3D5A80"
                            }}
                            transition={{ 
                              type: "spring",
                              stiffness: 500,
                              damping: 15,
                              delay: i * 0.1
                            }}
                            viewport={{ once: true }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}