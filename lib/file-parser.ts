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
          // For demo purposes, we'll return sample extracted text
          resolve(`
ALEX JOHNSON
Senior Software Engineer
alex.johnson@email.com | (555) 123-4567 | San Francisco, CA | linkedin.com/in/alexjohnson

PROFESSIONAL SUMMARY
Experienced software engineer with 6+ years of experience in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of leading teams and delivering scalable solutions for high-traffic applications.

EXPERIENCE

Senior Software Engineer | TechCorp Inc. | March 2021 - Present
• Led development of microservices architecture serving 2M+ daily active users
• Implemented CI/CD pipelines reducing deployment time by 60%
• Mentored 5 junior developers and conducted technical interviews
• Collaborated with product managers to define technical requirements
• Optimized database queries improving application performance by 40%

Software Engineer | StartupXYZ | January 2019 - February 2021
• Built responsive web applications using React, Redux, and TypeScript
• Developed RESTful APIs with Node.js and Express.js
• Integrated third-party payment systems and APIs
• Participated in agile development processes and sprint planning
• Wrote comprehensive unit and integration tests

Junior Developer | WebSolutions | June 2017 - December 2018
• Maintained and enhanced existing web applications
• Fixed bugs and implemented new features based on client requirements
• Learned modern development practices and version control with Git
• Collaborated with designers to implement pixel-perfect UI components

EDUCATION

Bachelor of Science in Computer Science
University of California, Berkeley | September 2013 - May 2017
GPA: 3.7/4.0
Relevant Coursework: Data Structures, Algorithms, Database Systems, Software Engineering

SKILLS

Programming Languages: JavaScript, TypeScript, Python, Java, SQL
Frontend: React, Vue.js, HTML5, CSS3, Sass, Tailwind CSS
Backend: Node.js, Express.js, Django, Flask, REST APIs, GraphQL
Databases: PostgreSQL, MongoDB, Redis, MySQL
Cloud & DevOps: AWS, Docker, Kubernetes, Jenkins, GitHub Actions
Tools: Git, Webpack, Jest, Cypress, Figma, Jira
          `)
        } else if (file.type.includes("word")) {
          // In a real implementation, you'd use mammoth.js or similar
          resolve(`
SARAH CHEN
Product Manager
sarah.chen@email.com | (555) 987-6543 | New York, NY

PROFESSIONAL SUMMARY
Results-driven product manager with 5+ years of experience leading cross-functional teams to deliver innovative digital products. Expertise in user research, data analysis, and agile methodologies with a track record of increasing user engagement and revenue.

EXPERIENCE

Senior Product Manager | InnovateTech | April 2022 - Present
• Led product strategy for B2B SaaS platform with 50K+ users
• Increased user retention by 35% through feature optimization and UX improvements
• Managed product roadmap and prioritized features based on user feedback and business goals
• Collaborated with engineering, design, and marketing teams on product launches
• Conducted competitive analysis and market research to identify growth opportunities

Product Manager | GrowthCorp | June 2020 - March 2022
• Owned end-to-end product development for mobile application
• Launched 3 major features that increased monthly active users by 25%
• Analyzed user behavior data to inform product decisions and A/B test strategies
• Worked closely with UX designers to create intuitive user experiences
• Presented product updates and metrics to executive leadership team

Associate Product Manager | StartupABC | August 2018 - May 2020
• Supported senior product managers in feature development and user research
• Created detailed product requirements documents and user stories
• Coordinated with development teams to ensure timely delivery of features
• Conducted user interviews and usability testing sessions
• Analyzed product metrics and created reports for stakeholders

EDUCATION

Master of Business Administration
Stanford Graduate School of Business | September 2016 - June 2018
Concentration: Technology and Innovation

Bachelor of Science in Engineering
Massachusetts Institute of Technology | September 2012 - June 2016
GPA: 3.8/4.0

SKILLS

Product Management: Product Strategy, Roadmap Planning, User Research, A/B Testing
Analytics: Google Analytics, Mixpanel, Amplitude, SQL, Excel, Tableau
Design: Figma, Sketch, Wireframing, Prototyping, User Experience Design
Technical: HTML/CSS, JavaScript, API Integration, Agile/Scrum, Jira
Business: Market Research, Competitive Analysis, Go-to-Market Strategy
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
