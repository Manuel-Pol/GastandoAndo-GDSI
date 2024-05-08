const api = "http://localhost:3030";

export interface PostTransfer {
  title: string;
  description?: string;
  amount: number;
  date: Date;
  isNegative: boolean;
}

export const createTransfer = (transfer: PostTransfer) => {
  fetch(`${api}/transfer`, {
    method: "POST",
    body: JSON.stringify(transfer),
    headers: { "Content-Type": "application/json" },
  });
};
