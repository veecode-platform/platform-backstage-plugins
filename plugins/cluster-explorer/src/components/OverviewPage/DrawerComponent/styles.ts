import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useDrawerStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            width: '50%',
            padding: theme.spacing(2.5),
        },
    }),
);