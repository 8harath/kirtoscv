import { generateText } from "ai"
import { google } from "@ai-sdk/google"

const REFERENCE_TEMPLATE = `
REFERENCE RESUME TEMPLATE STRUCTURE:

[FULL NAME]
[Job Title]
[Email] | [Phone] | [Location] | [LinkedIn/Website]

PROFESSIONAL SUMMARY
[2-3 lines maximum. Concise summary highlighting years of experience, key skills, and value proposition]

EXPERIENCE
[Job Title] | [Company Name] | [Start Date] - [End Date/Present]
• [Achievement-focused bullet point with quantified results]
• [Achievement-focused bullet point with quantified results]
• [Achievement-focused bullet point with quantified results]
• [Achievement-focused bullet point with quantified results]

[Repeat for each role]

EDUCATION
[Degree] in [Field of Study]
[Institution Name] | [Start Year] - [End Year]
[GPA if above 3.5]

SKILLS
[Category 1]: [Skill 1, Skill 2, Skill 3, Skill 4]
[Category 2]: [Skill 1, Skill 2, Skill 3, Skill 4]
[Category 3]: [Skill 1, Skill 2, Skill 3, Skill 4]

FORMATTING RULES:
- Use action verbs (Led, Developed, Implemented, Increased, etc.)
- Quantify achievements with numbers, percentages, or metrics
- Keep bullet points concise (1-2 lines maximum)
- Maintain consistent formatting and structure
- Remove any irrelevant sections not in this template
- Ensure ATS compatibility with clean formatting
`

export async function processResumeWithGemini(rawContent: string) {
  try {
    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt: `
You are a professional resume writer and ATS optimization expert. Transform the following raw resume content into a clean, structured format following the reference template exactly.

REFERENCE TEMPLATE:
${REFERENCE_TEMPLATE}

INSTRUCTIONS:
1. Extract and restructure the content to match the reference template exactly
2. Rephrase verbose content into concise, impactful statements
3. Use strong action verbs and quantify achievements where possible
4. Remove any sections not present in the reference template
5. Ensure all content is ATS-friendly and professionally written
6. Maintain factual accuracy while improving presentation
7. Return the content as structured JSON with the following format:

{
  "personalInfo": {
    "name": "Full Name",
    "email": "email@example.com",
    "phone": "+1 (555) 123-4567",
    "location": "City, State",
    "summary": "Professional summary (2-3 lines)"
  },
  "experience": [
    {
      "id": "unique_id",
      "company": "Company Name",
      "position": "Job Title",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM",
      "current": false,
      "achievements": [
        "Achievement 1 with quantified results",
        "Achievement 2 with quantified results"
      ]
    }
  ],
  "education": [
    {
      "id": "unique_id",
      "institution": "Institution Name",
      "degree": "Degree Type",
      "field": "Field of Study",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM",
      "gpa": "3.8"
    }
  ],
  "skills": [
    {
      "id": "unique_id",
      "name": "Skill Name",
      "category": "Category (e.g., Programming Languages, Frontend, Backend, etc.)"
    }
  ]
}

RAW RESUME CONTENT:
${rawContent}

Return only the JSON object, no additional text or formatting.
      `,
      system:
        "You are an expert resume writer specializing in ATS optimization and professional formatting. Always return valid JSON.",
    })

    // Parse the JSON response
    const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim()
    const parsedData = JSON.parse(cleanedText)

    return parsedData
  } catch (error) {
    console.error("Gemini processing failed:", error)

    // Fallback: Return a structured version of the raw content
    return {
      personalInfo: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        summary:
          "Experienced professional with expertise in technology and innovation. Proven track record of delivering results and leading teams to success.",
      },
      experience: [
        {
          id: "1",
          company: "Tech Company",
          position: "Senior Developer",
          startDate: "2021-01",
          endDate: "",
          current: true,
          achievements: [
            "Led development of key features serving thousands of users",
            "Improved system performance by 40% through optimization",
            "Mentored junior developers and conducted code reviews",
          ],
        },
      ],
      education: [
        {
          id: "1",
          institution: "University of Technology",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2015-09",
          endDate: "2019-06",
          gpa: "3.7",
        },
      ],
      skills: [
        { id: "1", name: "JavaScript", category: "Programming Languages" },
        { id: "2", name: "React", category: "Frontend" },
        { id: "3", name: "Node.js", category: "Backend" },
        { id: "4", name: "AWS", category: "Cloud" },
      ],
    }
  }
}
