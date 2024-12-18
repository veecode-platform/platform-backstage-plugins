export function generateBranchName():string{
const randomNumber = Math.floor(Math.random() * 10000); 

const branchName = `veecode-assistant-ai-patch${randomNumber}`;

  return branchName
}