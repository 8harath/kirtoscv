import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function optimizeResumeContent(
  content: string,
  targetRole: string,
  experienceLevel: "intern" | "beginner" | "experienced",
): Promise<string> {
  const experiencePrompts = {
    intern: "Focus on education, projects, and transferable skills. Emphasize learning potential and enthusiasm.",
    beginner: "Highlight relevant skills and any professional experience. Show growth potential and adaptability.",
    experienced: "Emphasize leadership, achievements, and advanced technical skills. Focus on impact and results.",
  }

  const prompt = `
You are a professional resume writer. Optimize the following resume for a ${targetRole} position at the ${experienceLevel} level.

${experiencePrompts[experienceLevel]}

Guidelines:
- Keep the same person's information and experiences
- Improve formatting and structure
- Use action verbs and quantify achievements where possible
- Tailor the language to the target role
- Ensure ATS-friendly formatting
- Maintain professional tone
- Keep it concise but comprehensive

Original Resume:
${content}

Please provide the optimized resume:
`

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      system:
        "You are an expert resume writer with 10+ years of experience helping professionals land their dream jobs.",
    })

    return text
  } catch (error) {
    console.error("AI optimization failed:", error)
    // Fallback: return original content with basic formatting
    return content
  }
}
