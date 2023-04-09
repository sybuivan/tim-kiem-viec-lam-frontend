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
    marginBottom: '10px',
    '& > p': {
      backgroundColor: theme.palette.primary.contrastText,
      border: '1px solid #c1c1c1',
    },
  },
  textMessage: {
    padding: '12px 1rem',
    borderRadius: '8px',
    fontSize: '1.4rem',
  },
  user: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '1rem',
    marginRight: '14px',
    '& > p': {
      backgroundColor: theme.palette.grey[400],
    },
  },

  formChat: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    margin: 'auto',
    bottom: '140px',
  },
});
