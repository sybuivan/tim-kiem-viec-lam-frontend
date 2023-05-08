import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import { AiOutlineArrowRight } from 'react-icons/ai';
import theme from 'src/theme';

interface IDiscover {
  title: string;
  icon: any;
  count: number;
}

const Discover = ({ item }: { item: IDiscover }) => {
  const { title, icon, count } = item;
  return (
    <Grid item xs={2.4}>
      <Box
        sx={{
          borderRadius: 2,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid #c1c1c1',
          '&:hover': {
            background: theme.palette.primary.main,
            transition: '0.4s all',
            cursor: 'pointer',
          },

          '&:hover p': {
            color: theme.palette.common.white,
          },
          '&:hover button': {
            visibility: 'visible',
            transition: '0.4s all',
          },
        }}
      >
        <Box
          sx={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: theme.palette.primary.contrastText,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& svg': {
              color: theme.palette.primary.main,
            },
          }}
        >
          {icon}
        </Box>
        <Typography fontWeight="600" fontSize="18px" py={2}>
          {title}
        </Typography>
        <Typography fontSize="16px">({count} việc làm)</Typography>

        <Box>
          <Button
            endIcon={<AiOutlineArrowRight />}
            sx={{
              color: theme.palette.common.white,
              border: `1px solid ${theme.palette.common.white}`,
              visibility: 'hidden',
              mt: 1,
            }}
          >
            Khám phá ngay
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default Discover;
