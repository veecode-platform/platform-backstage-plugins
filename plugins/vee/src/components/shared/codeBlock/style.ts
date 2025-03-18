import makeStyles from "@mui/styles/makeStyles";
import { themeVariables } from "../../../utils/constants/theme";

export const useCodeBlockStyles = makeStyles({
    root: {
        width: '100%',
        minHeight: '100%',
        overflowY: 'auto', 
        maxHeight: '65vh',
        backgroundColor: themeVariables.codeBlock.dark,
        "&::-webkit-scrollbar": {
            width: "6px",
            height: "4px",
            backgroundColor: themeVariables.background.dark,
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: `inset 0 0 5px ${themeVariables.blur.dark}15`,
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: themeVariables.border.main,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: themeVariables.background.secondary,
            cursor: 'pointer'
          },
    }
})