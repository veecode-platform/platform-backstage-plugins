import { Drawer, Grid, IconButton } from '@material-ui/core';
import { useDrawerStyles } from './styles';
import CloseIcon from '@material-ui/icons/Close';
import { InfoCard } from '@backstage/core-components';

export type DrawerComponentProps = {
  isOpen: boolean;
  toggleDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DrawerComponent: React.FC<DrawerComponentProps> = props => {
  const { isOpen, toggleDrawer } = props;
  const { paper } = useDrawerStyles();

  return (
    <Drawer
      classes={{
        paper: paper,
      }}
      anchor="right"
      open={isOpen}
      onClose={() => toggleDrawer(false)}
    >
      <Grid container>
        <Grid item md={12}>
          <IconButton
            key="dismiss"
            title="Close the drawer"
            onClick={() => toggleDrawer(false)}
            color="inherit"
          >
            <CloseIcon />
          </IconButton>
        </Grid>

        <Grid item md={12}>
          <InfoCard title="Information">
            <h3>TO DO</h3>
          </InfoCard>
        </Grid>
      </Grid>
    </Drawer>
  );
};
