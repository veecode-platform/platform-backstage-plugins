import { makeStyles } from "@mui/styles";
import { themeVariables } from "../../../../../utils/constants/theme";
import { accordionSummaryClasses } from '@mui/material/AccordionSummary';


export const useOptionsListStyles = makeStyles({
  root:{
    width: "100%"
  },
  accordion: {
    width: "100% !important",
    border: `1px solid ${themeVariables.colors.dark}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&::before': {
      display: 'none',
    },
  },
  accordionSummary: {
    width: "100% !important",
    backgroundColor: `${themeVariables.colors.black} !important`,
    flexDirection: 'row-reverse',
    position: "relative",
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
      transform: 'rotate(90deg)',
    },
    [`& .${accordionSummaryClasses.content}`]: {
      marginLeft: '.5rem',
    },
    // '&.dark': {
    //   backgroundColor: 'rgba(255, 255, 255, .05)',
    // },
  },
  accordionDetails: {
    padding:'1rem',
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    backgroundColor: themeVariables.background.dark
  },
  accordionActions: {
    position: 'absolute',
    right: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '.5rem'
  },
  editButton:{
    padding: '.4rem',
    bordeRadius: '50%'
  },
  deleteButton:{
    padding: '.4rem',
    bordeRadius: '50%',
    transition: 'all .5s ease-in',
    '&: hover':{
      color: themeVariables.colors.red,
      transform: 'scale(1.05)',
      transition: 'all .5s ease-in-out'
    }
  },
  input: {
    width: "100% !important",
    minHeight: "52px !important",
    padding: ".5rem",
    '& input[type=number]': {
      '-moz-appearance': 'textfield'
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    }
  },
});