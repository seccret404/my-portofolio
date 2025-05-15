import Layout from "../../Components/Layout/Layout";

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

  return (
    <Layout>
      <div className="min-h-screen  mb-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-[#cee8ff] mb-2">Work Experience</h1>
          <p className="text-lg text-[#94A3B8] mb-12">My professional journey and contributions</p>
          
          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <div key={index} className="relative group">
                {/* Timeline dot */}
                <div className="absolute left-[-32px] top-5 h-4 w-4 rounded-full bg-[#3D5A80] border-4 border-[#1F3A5F] group-hover:bg-[#4d648d] transition-colors"></div>
                
                {/* Experience card */}
                <div className="bg-[#1F3A5F] rounded-lg p-6 border border-[#3D5A80] hover:border-[#4d648d] transition-all hover:shadow-lg">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white">{exp.company}</h2>
                      <h3 className="text-xl text-[#cee8ff]">{exp.role}</h3>
                    </div>
                    <div className="bg-[#3D5A80] text-white px-3 py-1 rounded-md text-sm">
                      {exp.period}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Key Contributions:</h4>
                    <ul className="space-y-2">
                      {exp.contributions.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-[#4d648d] mr-2">•</span>
                          <span className="text-[#E2E8F0]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.techStack.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-[#4d648d] rounded-full text-sm text-white">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}