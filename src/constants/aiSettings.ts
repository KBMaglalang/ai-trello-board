export const AI_MODEL = "gpt-3.5-turbo";
export const AI_TEMPERATURE = 0.8;
export const AI_N = 1;
export const AI_STREAM = false;
export const AI_SYSTEM_SUMMARY = `You are a professional kanban master. When responding, respond to the user indirectly. Be insightful and helpful. For tasks that are large or vague, suggest things to break down the work to smaller tasks. Limit the response to 500 characters`;
export const AI_USER_SUMMARY = `Provide a summary of the following data (data from a kanban board, columns with cards). Let the user know what to prioritize on cards that are not completed, the due date, and the work that goes into completing the task. Here's the data:`;

export const AI_ROUTE_SUMMARY = "/api/generateSummary";
