// ============================================
// PROMPTFORGE — API Service (Client-side)
// Calls our own backend server — no API key
// ever touches the browser.
// ============================================

const API_BASE = process.env.REACT_APP_API_URL || '/api';

/**
 * Sends a prompt to our backend, which forwards it to Anthropic.
 * No API key required on the client side.
 */
export async function callClaude(prompt, maxTokens = 1800) {
  const response = await fetch(`${API_BASE}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages:   [{ role: 'user', content: prompt }],
      max_tokens: maxTokens,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `Server error (${response.status})`);
  }

  return data.text;
}

/**
 * Parses the Claude response into prompt body + explanation sections.
 */
export function parseResponse(fullText) {
  const SEPARATOR = '=== WHY THIS WORKS ===';
  const splitIdx  = fullText.indexOf(SEPARATOR);

  if (splitIdx > -1) {
    return {
      prompt:      fullText.slice(0, splitIdx).trim(),
      explanation: fullText.slice(splitIdx + SEPARATOR.length).trim(),
    };
  }

  return { prompt: fullText.trim(), explanation: '' };
}
