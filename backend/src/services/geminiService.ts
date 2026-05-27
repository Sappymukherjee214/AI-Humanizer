import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const processAITask = async (text: string, mode: string, toolId: string = 'humanizer') => {
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  const getSystemPrompt = (id: string, currentMode: string) => {
    switch (id) {
      case 'researcher':
        return 'You are an AI Researcher. Provide a deep analysis, key facts, and comprehensive structured information about the topic provided. Focus on accuracy and depth.';
      case 'fact-checker':
        return 'You are a Fact Checker. Verify the claims in the following text. Identify what is verified, what is false, and what is unverified with specific reasoning.';
      case 'chatbot':
        return 'You are a highly intelligent and helpful AI assistant. Engage with the user’s request naturally, provide clear answers, and follow any specific instructions given.';
      case 'plagiarism':
        return 'Analyze the text for potential plagiarism. Identify common or unoriginal phrases and provide suggestions on how to rewrite them for maximum uniqueness.';
      case 'detector':
        return 'You are an AI Content Detector. Analyze the provided text and determine if it sounds like it was written by an AI or a human. Provide a detailed linguistic breakdown.';
      case 'paraphrase':
        return 'Paraphrase the following text. Maintain the original meaning perfectly but completely transform the sentence structure, tone, and vocabulary choice.';
      case 'converter':
        return 'You are a File and Data Converter. Process the input into the requested format (e.g., converting a list to a table, a paragraph to bullet points, or structured data formats).';
      case 'long-article':
        return 'Generate a high-quality, comprehensive long-form article (minimum 1,200 words). Include structured headings, in-depth analysis, and an engaging narrative.';
      case 'analyze-file':
        return 'You are an Expert Document Analyst. Review the contents of the file/text provided and provide a deep dive analysis, summary, and answer any implied questions.';
      case 'grammar':
        return 'You are a Grammar and Syntax Expert. Correct all errors in grammar, punctuation, spelling, and flow. Return ONLY the corrected version of the text.';
      case 'summarizer':
        return 'Summarize the input text into its most essential points. Focus on brevity while ensuring no critical information is lost. Use high-impact bullet points.';
      case 'citation':
        return 'You are a Citation Specialist. Generate accurate citations for the provided sources or text in APA, MLA, or Harvard styles as appropriate.';
      case 'analyze-website':
        return 'Analyze the content of the Provided link or webpage description. Discuss its purpose, key messaging, and effectiveness.';
      case 'medium-article':
        return 'Generate an SEO-friendly, "Medium-style" blog post (approx 900 words). Focus on storytelling, engagement, and readability.';
      case 'rewrite':
        return 'Rewrite the following text with one click. Improve the flow, vocabulary, and overall impact while keeping the core message identical.';
      case 'essay':
        return 'You are an Academic Essay Writer. Produce a high-quality essay based on the input. Follow a clear structural path: introduction, body paragraphs, and conclusion.';
      case 'extend':
        return 'Expand upon the provided text with additional details, context, and robustness. Perfect for reaching higher word counts without losing quality.';
      case 'instagram':
        return 'Create 5 unique, high-energy Instagram captions for the provided content. Include relevant emojis and popular hashtags to maximize reach.';
      case 'emails':
        return 'Draft a professional and effective email based on the context provided. Ensure the subject line is catchy and the tone is perfectly suited for the recipient.';
      case 'tiktok':
        return 'Generate a catchy, viral-style TikTok video script. Include visual scene descriptions, text-over-screen prompts, and high-energy dialogue.';
      case 'youtube-script':
        return `You are an expert YouTube scriptwriter. Generate a complete, structured video script with these clearly labeled sections:

        **[HOOK]** (0-30 sec): Open with a bold question or surprising statement that grabs attention immediately.

        **[INTRO]** (30-60 sec): Introduce the topic, establish credibility, and tease what the viewer will learn.

        **[MAIN CONTENT]**: Break into numbered sections with headings. Use conversational language. Add [B-ROLL] or [CUT TO] cues where helpful.

        **[CONCLUSION]**: Summarize the top 2-3 takeaways briefly.

        **[CALL TO ACTION]**: Ask viewers to like, comment, and subscribe. Keep it natural, not salesy.

        Write in a conversational human tone optimized for audience retention.`;
      case 'facebook':
        return 'Draft high-converting Facebook Ad copy. Focus on a strong hook, emotional benefits, and a clear, urgent call to action.';
      case 'product':
        return 'Write a persuasive, authentic product description. Focus on selling the "solution" and benefits rather than just features. Use sensory language.';
      case 'google-ad':
        return 'Generate high-performing Google search ad copies. Include multiple headline options and compelling descriptions optimized for high CTR.';
      case 'book-writer':
        return 'You are a Creative Book Author. Write a detailed book chapter based on the provided concept. Focus on atmosphere, character internal monologue, and plot progression.';
      case 'academic':
        return 'Provide advanced academic support. Explain complex concepts using scholarly logic, structured evidence, and precise terminology.';
      case 'refine_human':
        return 'Take the following text and make it sound even more human. Focus on natural variations in sentence length, emotional resonance, and idiomatic expressions.';
      case 'refine_pro':
        return 'Synthesize the following text into a highly professional, corporate, and polished version. Focus on clarity, authoritative tone, and business-ready language.';
      case 'refine_academic':
        return 'Transform the following text into a formal academic style. Use scholarly terminology, maintain an objective third-person perspective, and enhance structural logic.';
      case 'refine_short':
        return 'Condense the following text to its absolute essence. Remove all fluff while retaining 100% of the core message and impact.';
      case 'refine_expand':
        return 'Build upon the existing text by adding relevant details, deeper explanations, and more context. Ensure the expansion feels natural and value-adding.';
      default:
        return `You are a world-class ghostwriter and expert linguistic editor. 
        Transform the input text into high-quality human writing.
        CURRENT MODE: ${currentMode.toUpperCase()}`;
    }
  };

  const systemPrompt = getSystemPrompt(toolId, mode);
  const prompt = `### INSTRUCTIONS:\n${systemPrompt}\n\n### INPUT TEXT:\n${text}\n\n### TASK:\nExecute the instructions above. Produce only the resulting text.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
