export function generateBranchName(value:string):string{
const randomNumber = Math.floor(Math.random() * 10000); 

const branchName = `${value
  .toLowerCase()
  .trim()
  .replace(/ /g, '-')
  .replace('.', '-')}-patch${randomNumber}`;

  return branchName
}