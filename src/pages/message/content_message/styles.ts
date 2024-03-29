import theme from 'src/theme';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    position: 'relative',
    overflow: 'hidden',
  },
  boxContent: {
    height: 'calc(100vh - 70px - 78px)',
  },

  client: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '5px',
    '& > p': {
      maxWidth: '80%',
      backgroundColor: 'rgba(34, 51, 84, 0.1);',
      border: '1px solid #c1c1c1',
    },
  },
  textMessage: {
    padding: '12px 1rem',
    borderRadius: '8px',
    fontSize: '14px',
  },
  user: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '8px',
    marginRight: '14px',
    '& > p': {
      maxWidth: '80%',
      backgroundColor: '#5569ff',
      color: theme.palette.common.white,
    },
  },

  formChat: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    margin: 'auto',
    bottom: '140px',
    [theme.breakpoints.down('sm')]: {
      bottom: '1rem!important',
    },
  },
});
