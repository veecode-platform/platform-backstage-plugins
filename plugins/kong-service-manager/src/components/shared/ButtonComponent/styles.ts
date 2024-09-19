import { makeStyles } from "@material-ui/core";

export const useButtonComponentStyles = makeStyles({
    root:{
        padding: '.8rem 2.5rem',
        margin: 'auto',
        outline: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '244px',
        fontSize: '12px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        transition: 'all .5s ease-in-out',
    },
})