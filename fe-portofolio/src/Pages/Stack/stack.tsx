import Layout from "../../Components/Layout/Layout";

export default function StackPage() {
  const techStacks = {
    web: {
      title: "Web Development",
      items: [
        { name: "React", icon: "⚛️" },
        { name: "Next.js", icon: "⏭️" },
        { name: "TypeScript", icon: "📘" },
        { name: "Tailwind CSS", icon: "🎨" },
        { name: "Redux", icon: "🔄" },
        { name: "Vue.js", icon: "🟢" }
      ]
    },
    mobile: {
      title: "Mobile Development",
      items: [
        { name: "React Native", icon: "📱" },
        { name: "Flutter", icon: "🐦" },
        { name: "Kotlin", icon: "🟣" },
        { name: "Swift", icon: "🍏" },
        { name: "Expo", icon: "⚡" }
      ]
    },
    backend: {
      title: "Backend Development",
      items: [
        { name: "Node.js", icon: "🟩" },
        { name: "Express", icon: "🚂" },
        { name: "Python", icon: "🐍" },
        { name: "Django", icon: "🎸" },
        { name: "PostgreSQL", icon: "🐘" },
        { name: "MongoDB", icon: "🍃" },
        { name: "GraphQL", icon: "📊" }
      ]
    },
    tools: {
      title: "Tools & Platforms",
      items: [
        { name: "Git", icon: "🔀" },
        { name: "Docker", icon: "🐳" },
        { name: "AWS", icon: "☁️" },
        { name: "Firebase", icon: "🔥" },
        { name: "Figma", icon: "✏️" },
        { name: "Jira", icon: "📝" },
        { name: "VS Code", icon: "💻" }
      ]
    }
  };

  return (
    <Layout>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#cee8ff] mb-4">My Tech Stack</h1>
            <p className="text-xl text-[#94A3B8] max-w-2xl mx-auto">
              Technologies and tools I'm proficient with across different domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(techStacks).map(([key, stack]) => (
              <div 
                key={key}
                className="bg-[#1F3A5F]/80 backdrop-blur-sm rounded-xl p-6 border border-[#3D5A80] hover:border-[#4d648d] transition-all hover:shadow-lg"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="bg-[#3D5A80] w-10 h-10 rounded-full flex items-center justify-center mr-3">
                    {stack.items[0].icon}
                  </span>
                  {stack.title}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {stack.items.map((tech, index) => (
                    <div 
                      key={index}
                      className="flex items-center p-3 bg-[#3D5A80]/50 rounded-lg hover:bg-[#4d648d] transition-colors"
                    >
                      <span className="text-xl mr-2">{tech.icon}</span>
                      <span className="text-white font-medium">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
 
        </div>
      </div>
    </Layout>
  );
}