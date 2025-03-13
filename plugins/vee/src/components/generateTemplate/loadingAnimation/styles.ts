import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../.../../../../utils/constants/theme";

export const useLoadingAnimationStyles = makeStyles(theme =>({
    root:{
        color: themeVariables.colors.white,
        zIndex: theme.zIndex.drawer + 1 
    }
}))