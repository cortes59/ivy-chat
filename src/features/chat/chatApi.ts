import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5 * 1000, // 5 seconds timeout
});

export function submitPromptAPI(prompt: string) {
  return service.post<{ answer: string }>("/chat", { prompt });
}
