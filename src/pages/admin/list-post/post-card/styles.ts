import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles<Theme>(() => ({
  container: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#fff',
    marginBottom: '8px',
  },
  content: {
    width: '87%',
    height: '75px',
    marginLeft: '10px',
    position: 'relative',
  },
  description: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '82%',
    fontSize: '15px',
    height: '20px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'pre',
  },
  image: {
    width: '80px',
    height: '80px',
    overflow: 'hidden',
    margin: '0 8px',
    borderRadius: '5px',
    display: 'grid',
    placeItems: 'center',
  },
  icon: {
    width: '3%',
    height: '80px',
    display: 'block !important ',
    font: '20px !important',
    marginLeft: '20px',
  },
  title: {
    display: 'flex',
    fontWeight: '600',
    fontSize: '18px',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));
