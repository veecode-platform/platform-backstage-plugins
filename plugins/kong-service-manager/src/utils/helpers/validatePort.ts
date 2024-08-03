export const validatePort = (event: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>) => {
    if (['Backspace', 'Delete', 'Tab', 'Escape', 'Enter'].includes(event.key)) {
      return;
    }

    if (!/\d/.test(event.key)) {
      event.preventDefault();
    }
  };