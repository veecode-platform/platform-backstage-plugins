import { makeStyles } from "@material-ui/core";

export const useInfracostDashboardStyles = makeStyles(theme =>
    ({
        root: {
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
        },
        details:{
            display: 'grid',
            gridTemplateColumns: 'repeat(2,1fr)',
            gap: '1rem',
            [theme.breakpoints.down('md')]: {
                gridTemplateColumns: '1fr',
             },
        }
    })
)