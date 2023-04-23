declare module 'openai' {
  export class Auth {
    constructor(options: { api_key: string });
  }

  export interface CompletionOptions {
    model: string;
    prompt: string;
    temperature: number;
    max_tokens: number;
    top_p: number;
    frequency_penalty: number;
    presence_penalty: number;
  }

  export interface CompletionResult {
    choices: {
      text: string;
      index: number;
      logprobs: null;
      finish_reason: string;
    }[];
    created: number;
    id: string;
    model: string;
    object: string;
    prompt: string;
    search_model: string;
    selected_model: string;
    status: string;
    temperature: number;
    time: number;
  }

  export function completions(
    auth: Auth,
    options: CompletionOptions,
  ): Promise<CompletionResult>;
}
