const api = "http://localhost:3030";

export interface PostTransfer {
  title: string;
  description?: string;
  amount: number;
  date: string;
  isNegative: boolean;
}

export const createTransfer = (transfer: PostTransfer) => {
  console.log(transfer);
  fetch(`${api}/transfers`, {
    method: "POST",
    body: JSON.stringify(transfer),
    headers: { "Content-Type": "application/json" },
  });
};
