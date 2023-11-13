// constants and functions
import { AI_ROUTE_SUMMARY } from "@/constants";
import { formatBoardForAI } from "./formatBoardForAI";

export const getBoardSummary = async (boardData: any) => {
  const formattedData = formatBoardForAI(boardData);

  const response = await fetch(AI_ROUTE_SUMMARY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ board: formattedData }),
  });

  const data = await response.json();

  return data.content;
};
