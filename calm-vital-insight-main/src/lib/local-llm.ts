/**
 * Local LLM client for Mind Coach — integrated with the Python assistant logic.
 *
 * Assumes an Ollama-compatible server running on the user's machine
 * (the standard way to serve GGUF models such as hadad/LFM2.5-1.2B:Q4_K_M).
 *
 * Start the model on your Kali box with:
 *   ollama pull hadad/LFM2.5-1.2B:Q4_K_M
 *   OLLAMA_ORIGINS="*" ollama serve
 *
 * Default endpoint: http://127.0.0.1:11434/api/chat
 */

export type ChatRole = "system" | "user" | "assistant";
export type ChatMessage = { role: ChatRole; content: string };

export type LocalLLMConfig = {
  baseUrl: string; // e.g. http://127.0.0.1:11434
  model: string; // e.g. hadad/LFM2.5-1.2B:Q4_K_M
  temperature: number;
};

const STORAGE_KEY = "mindcare.localLLM.v1";

// Defaults mirror the working Python script (IP form is more stable than "localhost").
export const DEFAULT_CONFIG: LocalLLMConfig = {
  baseUrl: "http://127.0.0.1:11434",
  model: "hadad/LFM2.5-1.2B:Q4_K_M",
  temperature: 0.7,
};

export const MENTAL_HEALTH_SYSTEM_PROMPT = `You are "Mind Coach", a warm, private, on-device mental wellness companion inside the Mind Care app.

Your role:
- Offer supportive, non-judgmental listening and evidence-informed coping strategies
  (CBT reframes, grounding, breathwork, sleep hygiene, mindfulness, behavioural activation).
- Validate emotions before suggesting tools. Reflect what the user said in one short sentence,
  then — only if appropriate — offer ONE small, concrete next step.
- Keep replies short (2–5 sentences). Use plain, gentle language. No lists unless the user asks.
- Ask at most one open question per reply. Never interrogate.
- Celebrate small wins. Normalize struggle. Encourage self-compassion.

Hard safety rules:
- You are NOT a therapist, doctor, or diagnostician. Never claim to be.
- Never give medical, medication, or clinical diagnostic advice.
- If the user mentions self-harm, suicide, harming others, abuse, or an immediate
  crisis: respond with calm empathy, tell them they are not alone, and clearly
  encourage them to use the in-app "urgent help" options or call a local emergency
  number / crisis line (e.g. 988 in the US, 112 in the EU, or their local equivalent).
  Do not attempt to talk them out of contacting help.
- Never ask for personally identifying information. Never promise confidentiality
  beyond "this conversation stays on your device".
- If the user asks for something outside mental wellness (coding, homework, news, etc.),
  gently redirect to the app's purpose.

Tone: calm, soft, slightly warm. Think "trusted friend who happens to know the basics
of psychology", not "clinician". Avoid clichés like "I hear you" on repeat.`;

export function loadConfig(): LocalLLMConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    const parsed = JSON.parse(raw) as Partial<LocalLLMConfig>;
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveConfig(cfg: LocalLLMConfig) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  } catch {
    /* ignore quota errors */
  }
}

function trimBase(url: string) {
  return url.replace(/\/+$/, "");
}

/**
 * Clean text logic adapted from the Python `clean_text_for_speech`.
 * Ensures the UI doesn't display artifacts like (laughs) or [smiles].
 */
function cleanTextForUI(text: string): string {
  return text
    .replace(/\(.*?\)/g, "")
    .replace(/\[.*?\]/g, "")
    .replace(/[<>^|{}]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Quick health probe. Returns true if the Ollama server responds. */
export async function pingLocalLLM(cfg: LocalLLMConfig, signal?: AbortSignal): Promise<boolean> {
  try {
    const res = await fetch(`${trimBase(cfg.baseUrl)}/api/tags`, {
      method: "GET",
      signal,
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Stream a chat completion from the local Ollama server.
 * Invokes `onToken` for every token chunk so the UI can render live.
 * Returns the cleaned full response (artifacts like (laughs)/[smiles] stripped).
 */
export async function streamChat({
  config,
  messages,
  onToken,
  signal,
}: {
  config: LocalLLMConfig;
  messages: ChatMessage[];
  onToken: (chunk: string) => void;
  signal?: AbortSignal;
}): Promise<string> {
  // Ensure a system prompt is present, mirroring the Python logic.
  const hasSystemPrompt = messages.some((m) => m.role === "system");
  const requestMessages: ChatMessage[] = hasSystemPrompt
    ? messages
    : [{ role: "system", content: MENTAL_HEALTH_SYSTEM_PROMPT }, ...messages];

  const res = await fetch(`${trimBase(config.baseUrl)}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: config.model,
      messages: requestMessages,
      stream: true,
      options: {
        temperature: config.temperature,
        num_predict: 250, // Keep replies concise, matching the prompt guidance.
      },
    }),
    signal,
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "Unknown Error");
    throw new Error(`Ollama Error (${res.status}): ${errorText}`);
  }

  const reader = res.body?.getReader();
  if (!reader) throw new Error("Response body is null");

  const decoder = new TextDecoder();
  let fullResponse = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split("\n");

    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const json = JSON.parse(line) as {
          message?: { role?: string; content?: string };
          done?: boolean;
          error?: string;
        };
        if (json.error) throw new Error(json.error);

        const content = json.message?.content ?? "";
        if (content) {
          fullResponse += content;
          onToken(content);
        }
      } catch {
        // Silently skip partial JSON chunks until the next read.
        continue;
      }
    }
  }

  return cleanTextForUI(fullResponse);
}
