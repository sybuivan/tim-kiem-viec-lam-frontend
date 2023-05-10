import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import theme from 'src/theme';

export const useStyles = makeStyles<Theme>(() => ({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  body: {
    position: 'absolute',
    padding: '8px',
    width: '100%',
    height: '94%',
  },
  boxFilter: {
    width: '100%',
    height: 'auto',
    padding: '5px 16px 8px',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: '1px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  boxPostsManageMent: {
    width: '100%',
    height: '92%',
    marginTop: '8px',
    borderRadius: '1px',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '4px',
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
  },

  filterFormInput: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('md')]: {
      width: '60%',
    },
    [theme.breakpoints.up('md')]: {
      width: '80%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '80%',
    },
  },
  boxPagination: {
    position: 'absolute',
    left: '8px',
    bottom: '2px',
    height: '45px',
    width: '99%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 16px',
  },
}));
