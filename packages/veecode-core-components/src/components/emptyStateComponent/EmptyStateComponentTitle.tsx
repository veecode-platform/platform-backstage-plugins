import { Typography } from '@mui/material';
import React from 'react';

export interface EmptyStateComponentTitleProps {
  children: string;
}

export const EmptyStateComponentTitle: React.FC<
  EmptyStateComponentTitleProps
> = ({ children }) => <Typography variant="h5">😟 {children}</Typography>;
