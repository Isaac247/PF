export const TECHNIQUES = [
  { id: 'cot',         icon: '🧠', name: 'Chain-of-Thought',   desc: 'Step-by-step reasoning before answer',     detail: 'Forces the model to reason explicitly — biggest single accuracy boost for complex tasks.' },
  { id: 'role',        icon: '🎭', name: 'Role Priming',        desc: 'Assign an expert persona & context',       detail: 'Telling the model who it is activates domain knowledge and calibrates tone and vocabulary.' },
  { id: 'fewshot',     icon: '📚', name: 'Few-Shot Examples',   desc: 'Include input/output demonstrations',      detail: 'One concrete example teaches format and intent more clearly than three paragraphs of instruction.' },
  { id: 'xml',         icon: '🏷️', name: 'XML Structure',       desc: 'Tag sections for maximum clarity',         detail: 'Claude excels with <context>, <task>, <format> tags — separates concerns, reduces ambiguity.' },
  { id: 'constraints', icon: '🚧', name: 'Explicit Constraints',desc: 'State exactly what NOT to do',             detail: 'Spelling out what to avoid prevents the most common failure modes before they happen.' },
  { id: 'prefill',     icon: '✏️', name: 'Output Prefill',      desc: "Seed the AI's opening words",              detail: "Priming the assistant's first words locks in format and tone from token one." },
  { id: 'critique',    icon: '🔍', name: 'Self-Critique Loop',  desc: 'Ask AI to review its own output',          detail: 'Instructing the model to verify and improve its own response catches errors a single pass misses.' },
  { id: 'positive',    icon: '✅', name: 'Positive Framing',    desc: 'Tell what TO do, not just what to avoid',  detail: 'Models follow positive instructions more reliably. "Be concise" beats "Don\'t be verbose".' },
];

export const TECHNIQUE_MAP = {
  cot:         'chain-of-thought reasoning — instruct it to think step by step before giving a final answer',
  role:        'role priming — open with a specific expert persona assignment',
  fewshot:     'few-shot examples — include 1–2 concrete input/output demonstrations inline',
  xml:         'XML tag structure — use <context>, <task>, <instructions>, <format> to separate sections',
  constraints: 'explicit constraints — clearly state what the model must NOT do, assume, or include',
  prefill:     "output prefill — begin the assistant's response with the first word or structural element",
  critique:    'self-critique loop — after generating, instruct the model to review and improve its own output',
  positive:    'positive framing — phrase all guidance as what TO do, not what to avoid',
};

export const MODEL_OPTIONS = [
  { value: 'claude',   label: 'Claude (Anthropic)' },
  { value: 'gpt4',     label: 'GPT-4 / GPT-4o (OpenAI)' },
  { value: 'gemini',   label: 'Gemini (Google)' },
  { value: 'llama',    label: 'LLaMA / Open-source' },
  { value: 'mistral',  label: 'Mistral' },
  { value: 'general',  label: 'General / Any LLM' },
];

export const FORMAT_OPTIONS = [
  { value: '',             label: 'Let the AI decide' },
  { value: 'markdown',     label: 'Markdown with sections' },
  { value: 'json',         label: 'Structured JSON' },
  { value: 'bullet',       label: 'Bullet points / list' },
  { value: 'table',        label: 'Comparison table' },
  { value: 'prose',        label: 'Flowing prose' },
  { value: 'code',         label: 'Code with comments' },
  { value: 'step-by-step', label: 'Numbered steps' },
  { value: 'xml',          label: 'XML tags (Claude-optimised)' },
];

export const TONE_OPTIONS = [
  { value: '',             label: 'No preference' },
  { value: 'concise',      label: 'Concise & direct' },
  { value: 'professional', label: 'Professional & formal' },
  { value: 'friendly',     label: 'Friendly & conversational' },
  { value: 'technical',    label: 'Technical & precise' },
  { value: 'creative',     label: 'Creative & exploratory' },
  { value: 'academic',     label: 'Academic & rigorous' },
  { value: 'simple',       label: 'Simple & plain English' },
];

export const TIPS = [
  { num: '01', title: 'Be Specific',       body: 'Vague tasks get vague outputs. Name the exact deliverable, the audience, and what "done well" looks like.' },
  { num: '02', title: 'Assign a Role',     body: '"You are a senior UX researcher" primes entirely different reasoning than providing no context at all.' },
  { num: '03', title: 'Chain-of-Thought',  body: '"Think step by step" is the single biggest accuracy boost for complex or multi-part tasks.' },
  { num: '04', title: 'Use XML Tags',      body: 'Claude processes <context>, <task>, <format> cleanly — structure reduces misinterpretation.' },
  { num: '05', title: 'Show an Example',   body: 'One concrete input→output example communicates your intent better than three paragraphs of instruction.' },
  { num: '06', title: 'Name Constraints',  body: 'List what to avoid explicitly — length limits, off-topic areas, forbidden assumptions. Prevention beats correction.' },
];
