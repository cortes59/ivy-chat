export interface IChatItem {
  type: "question" | "answer";
  text: string;

  createdAt: number;
}
