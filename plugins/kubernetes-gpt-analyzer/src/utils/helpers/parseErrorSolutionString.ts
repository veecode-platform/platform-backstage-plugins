import { AiChat } from "../types/aiChat";

export function parseErrorSolutionString(inputString:string) : AiChat {
  const lines = inputString.trim().split('\n');
  const errorLines = [];
  const solutionLines = [];
  let currentSection = '';

  for (let line of lines) {
    line = line.trim();
    if (line.startsWith('Error:')) {
      currentSection = 'Error';
      errorLines.push(line.replace('Error: ', ''));
    } else if (line.startsWith('Solution:')) {
      currentSection = 'Solution';
      solutionLines.push(line.replace('Solution: ', ''));
    } else {
      if (currentSection === 'Error') {
        errorLines.push(line);
      } else if (currentSection === 'Solution') {
        solutionLines.push(line);
      }
    }
  }

  return {
    error: errorLines.join(' ').trim(),
    solution: solutionLines.join('\n').trim(),
  };
  }
  
  