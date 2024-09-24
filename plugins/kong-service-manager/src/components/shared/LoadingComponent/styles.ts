import { makeStyles } from "@material-ui/core";

export const useLoadingComponentStyles = makeStyles({
    root:{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center',
    }
})