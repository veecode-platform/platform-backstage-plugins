import React from 'react';
import { Box, Button, Chip, TextField } from '@material-ui/core';
import AlertComponent from '../../shared/Alert/Alert';

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

  const [show, setShow] = React.useState<boolean>(false);
  const [status] = React.useState<string>('warning');
  const [messageStatus, setMessageStatus] = React.useState<string>('');

  const handleClose = (reason: string) => {
    if (reason === 'clickaway') return;
    setShow(false);
  };

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
      if (label === 'Paths') {
        newItem.value = (newItem.value.charAt(0) !== '/') ? `/${newItem.value}` : newItem.value;
      } else if ((label === 'Sources' || label === 'Destinations') && !validateIP(newItem.id)) {
        setShow(true)
        setMessageStatus(`invalid ip or cidr range: ${newItem.id}`);
        return;
      }
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>, label: string) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddItem();
    }

    (label === 'Sources' || label === 'Destinations') && validatePort(event);
  };
  
  const validatePort = (event: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>) => {
    if (['Backspace', 'Delete', 'Tab', 'Escape', 'Enter'].includes(event.key)) {
      return;
    }

    if (!/\d/.test(event.key)) {
      event.preventDefault();
    }
  };

  const validateIP = (ip: string): boolean => {
    const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Pattern = /^(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}$/;
    return ipv4Pattern.test(ip) || ipv6Pattern.test(ip);
  }

  let indexLabel = (twoFields) && `Enter a ${label} name`;
  let inputLabel = (twoFields) ? `Enter a ${label} value` : `Enter a ${label}`;

  if (label === 'Sources' || label === 'Destinations') {
    indexLabel = `Enter a ${label} IP`;
    inputLabel = `Enter a ${label} port`;
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={2}>
        {twoFields && (
          <TextField
            label={indexLabel}
            variant="filled"
            value={indexValue}
            onChange={handleIndexChange}
            onKeyDown={(event) => handleKeyDown(event, '')}
            style={{ marginRight: '10px' }}
            fullWidth
          />
        )}
        <TextField
          label={inputLabel}
          variant="filled"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(event) => handleKeyDown(event, label)}
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
      <AlertComponent
        open={show}
        close={handleClose}
        message={messageStatus}
        status={status}
      />
    </Box>
  );
};

export default StringInputList;
