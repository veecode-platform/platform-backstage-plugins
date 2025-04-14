import { Typography } from '@mui/material';
import React from 'react';

export interface EmptyStateComponentMessageProps {
  children: string;
}

export const EmptyStateComponentMessage: React.FC<
  EmptyStateComponentMessageProps
> = ({ children }) => <Typography variant="body1">{children}</Typography>;
