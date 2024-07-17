import React from 'react';
import { Box, Button, Chip, TextField } from '@material-ui/core';

interface StringInputListProps {
  label: string;
    buttonText: string;
    onItemsChange?: (items: { id: string; value: string }[]) => void;
    initialItems?: { id: string; value: string }[];
    twoFields?: boolean;
}

const StringInputList: React.FC<StringInputListProps> = ({ label, buttonText, onItemsChange, initialItems = [], twoFields = false }) => {
  const [inputValue, setInputValue] = React.useState<string>('');
  const [indexValue, setIndexValue] = React.useState<string>('');
  const [items, setItems] = React.useState<{ id: string; value: string }[]>(initialItems);

  React.useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleIndexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIndexValue(event.target.value);
  };

  const handleAddItem = () => {
    if (inputValue.trim() !== '' && (!twoFields || indexValue.trim() !== '')) {
      const newItem = { id: twoFields ? indexValue.trim() : (items.length + 1).toString(), value: inputValue.trim() };
      const newItems = [...items, newItem];
      setItems(newItems);
      setInputValue('');
      setIndexValue('');
      if (onItemsChange) {
        onItemsChange(newItems);
      }
    }
  };

  const handleDeleteItem = (itemToDelete: { id: string; value: string }) => () => {
    const newItems = items.filter(item => item !== itemToDelete);
    setItems(newItems);
    if (onItemsChange) {
      onItemsChange(newItems);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddItem();
    }
  };
  
  const indexLabel = (twoFields) && `Enter a ${label} name`;
  const inputLabel = (twoFields) ? `Enter a ${label} value` : `Enter a ${label}`;

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={2}>
        {twoFields && (
          <TextField
            label={indexLabel}
            variant="filled"
            value={indexValue}
            onChange={handleIndexChange}
            onKeyDown={handleKeyDown}
            style={{ marginRight: '10px' }}
            fullWidth
          />
        )}
        <TextField
          label={inputLabel}
          variant="filled"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          fullWidth 
        />
        <Button variant="contained" color="primary" onClick={handleAddItem} style={{ marginLeft: '10px' }}>
          {buttonText}
        </Button>
      </Box>
      <Box display="flex" flexWrap="wrap">
        {items.map((item, index) => (
          <Chip
            key={index}
            label={`${item.id}: ${item.value}`}
            onDelete={handleDeleteItem(item)}
            style={{ margin: '5px' }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default StringInputList;
