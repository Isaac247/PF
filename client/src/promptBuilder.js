import { TECHNIQUE_MAP } from './constants';

export function buildMetaPrompt({ task, model, role, format, tone, context, techniques, language = 'en' }) {
  const techLines = techniques.length > 0
    ? techniques.map(t => `  • ${TECHNIQUE_MAP[t] || t}`).join('\n')
    : '  • General best practices for clarity and specificity';

  const LANGUAGE_NAMES = {
    en:     'English',
    pidgin: 'Nigerian Pidgin English',
    ha:     'Hausa',
    yo:     'Yoruba',
    ig:     'Igbo',
  };

  const outputLanguage = LANGUAGE_NAMES[language] || 'English';
  const languageInstruction = language !== 'en'
    ? `IMPORTANT: You must write the entire generated prompt in ${outputLanguage}. The "=== WHY THIS WORKS ===" explanation should also be in ${outputLanguage}.`
    : '';

  return `You are a world-class prompt engineer with deep mastery of Anthropic's prompt engineering methodology. Craft an exceptional, production-ready LLM prompt based on the specifications below.

<specifications>
  <task>${task}</task>
  <target_model>${model}</target_model>
  <role>${role || 'Infer and assign the most effective expert role for this task'}</role>
  <format>${format || 'Choose the most appropriate format for the task'}</format>
  <tone>${tone || 'Professional, clear, and purposeful'}</tone>
  <context>${context || 'None provided — make reasonable professional assumptions'}</context>
  <output_language>${outputLanguage}</output_language>
</specifications>

<techniques_to_apply>
${techLines}
</techniques_to_apply>

<instructions>
${languageInstruction}

Generate a complete, copy-paste-ready prompt that:
1. Opens with a compelling, specific role assignment if role priming is selected
2. Provides precise task framing with zero ambiguity about what success looks like
3. Integrates each selected technique naturally — not mechanically bolted on
4. Specifies exact output format, structure, and quality bar
5. Ends with a clear, unambiguous closing instruction

RULES: No placeholder text like [YOUR TOPIC]. No meta-commentary inside the prompt body. Every sentence must earn its place. The prompt must be immediately usable.

After the complete prompt, write this separator on its own line:
=== WHY THIS WORKS ===

Then write 3–5 pointed observations about what makes this prompt effective, referencing the specific techniques applied.
</instructions>`;
}

export function buildRefinePrompt(existingPrompt) {
  return `Improve this LLM prompt:

<prompt>
${existingPrompt}
</prompt>

Apply these improvements:
1. Cut 10–15% of words — remove any redundant phrasing
2. Sharpen the opening — the first sentence must immediately establish authority and direction
3. Strengthen the most critical instruction — make it more specific and unambiguous
4. Ensure the output format is crystal clear

Return only the improved prompt. No commentary or explanation.`;
}

export function calculateScore({ techniques, task, context, role }) {
  let score = 35;
  score += Math.min(techniques.size * 7, 35);
  if (task.length > 80)    score += 8;
  if (task.length > 160)   score += 4;
  if (context.length > 30) score += 8;
  if (role.length > 5)     score += 7;
  return Math.min(score, 98);
}
