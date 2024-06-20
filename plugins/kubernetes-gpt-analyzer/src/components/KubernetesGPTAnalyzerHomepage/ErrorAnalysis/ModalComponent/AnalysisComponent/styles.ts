import { makeStyles } from "@material-ui/core";

export const useAnalysisComponentStyles = makeStyles(theme=>({
    content:{
        background: theme.palette.background.paper,
        padding: '2rem',
        width: '100%',
        borderRadius:'0 20px 20px 20px',
        borderLeft: `5px solid ${theme.palette.linkHover}`,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '2rem',
    },
    label:{
        width:'100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap:'.8rem'
    },
    message: {
        maxWidth: '100%',
        textAlign: 'left',
        margin: '1.5rem auto',
        '&:after': {
          content: '""',
          borderRight: `.5rem solid ${theme.palette.linkHover}`,
          marginLeft: 5,
          opacity: 1,
          animation: '$blink .7s infinite',
        },
      },
      '@keyframes blink': {
        '0%, 100%': {
          opacity: 1,
        },
        '50%': {
          opacity: 0,
        },
      },
}))