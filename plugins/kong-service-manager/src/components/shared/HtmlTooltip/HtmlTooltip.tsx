import { Tooltip, withStyles } from '@material-ui/core';

export const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      minWidth: '900px',
      backgroundColor: theme.palette.background.default,
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: theme.typography.pxToRem(12),
      border: `1px solid ${theme.palette.border}`,
      borderRadius: '8px',
      padding: '1rem'
    },
  }))(Tooltip);
