import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles<Theme>((theme) => ({
  liItem: {
    padding: '4px 8px',
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover': {
      background: '#341678',
    },
  },
}));

export default useStyles;
