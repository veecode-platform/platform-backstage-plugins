import { makeStyles } from "@material-ui/core";
import { themeVariables } from "../../../utils/constants/theme";

export const useMarkdowRendererStyles = makeStyles({
  wrapper: {
    width: "100%",
    maxWidth: "52vw",
    maxHeight: "48vh",
    color: themeVariables.colors.white,
    paddingBottom: "2rem",
    overflowY: "scroll",
    fontSize: '1rem'
  }
});
