import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  paper: { overflow: 'initial !important' },
  dialog: {
    position: 'relative',
    paddingTop: 20,
    minWidth: 340,
  },
  dialogTitle: {
    '& h2': {
      fontSize: 20,
    },
  },
  actionButton: {
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    '& button:first-child': {
      marginRight: 10,
    },
  },
  wrapperButton: {
    position: 'relative',
  },
}));
