export async function extractTextFromFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = async (event) => {
      try {
        const result = event.target?.result

        if (file.type === "text/plain") {
          resolve(result as string)
        } else if (file.type === "application/pdf") {
          // In a real implementation, you'd use PDF.js here
          // For demo purposes, we'll return placeholder text
          resolve(`
JOHN DOE
Software Engineer
john.doe@email.com | (555) 123-4567 | LinkedIn: linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Experienced software engineer with 5+ years of experience in full-stack development. 
Proficient in React, Node.js, and cloud technologies. Strong problem-solving skills 
and passion for creating efficient, scalable solutions.

EXPERIENCE
Senior Software Engineer | Tech Company Inc. | 2021 - Present
• Developed and maintained web applications using React and Node.js
• Collaborated with cross-functional teams to deliver high-quality software
• Implemented CI/CD pipelines and improved deployment efficiency by 40%

Software Engineer | StartupXYZ | 2019 - 2021
• Built responsive web applications with modern JavaScript frameworks
• Optimized database queries and improved application performance
• Mentored junior developers and conducted code reviews

EDUCATION
Bachelor of Science in Computer Science
University of Technology | 2015 - 2019

SKILLS
• Programming Languages: JavaScript, TypeScript, Python, Java
• Frontend: React, Vue.js, HTML5, CSS3, Tailwind CSS
• Backend: Node.js, Express, Django, REST APIs
• Databases: PostgreSQL, MongoDB, Redis
• Cloud: AWS, Docker, Kubernetes
• Tools: Git, Jenkins, Jira, VS Code
          `)
        } else if (file.type.includes("word")) {
          // In a real implementation, you'd use mammoth.js or similar
          resolve(`
JANE SMITH
Product Manager
jane.smith@email.com | (555) 987-6543

PROFESSIONAL SUMMARY
Results-driven product manager with 4+ years of experience leading cross-functional 
teams to deliver innovative products. Expertise in agile methodologies, user research, 
and data-driven decision making.

EXPERIENCE
Senior Product Manager | Innovation Corp | 2022 - Present
• Led product strategy and roadmap for B2B SaaS platform
• Increased user engagement by 35% through feature optimization
• Managed product lifecycle from conception to launch

Product Manager | Growth Startup | 2020 - 2022
• Collaborated with engineering and design teams on product development
• Conducted user research and analyzed market trends
• Launched 3 major features that increased revenue by 25%

EDUCATION
MBA in Business Administration
Business School | 2018 - 2020

Bachelor of Arts in Economics
State University | 2014 - 2018

SKILLS
• Product Strategy & Roadmapping
• Agile/Scrum Methodologies
• User Research & Analytics
• A/B Testing & Data Analysis
• Stakeholder Management
• Wireframing & Prototyping
          `)
        } else {
          reject(new Error("Unsupported file type"))
        }
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => reject(new Error("Failed to read file"))

    if (file.type === "text/plain") {
      reader.readAsText(file)
    } else {
      reader.readAsArrayBuffer(file)
    }
  })
}
