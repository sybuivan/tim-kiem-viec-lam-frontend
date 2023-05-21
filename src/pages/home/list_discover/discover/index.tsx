import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { BsFillBriefcaseFill } from 'react-icons/bs';
import { useNavigate } from 'react-router';
import theme from 'src/theme';
import { IJobTop } from 'src/types/job';
import { useAppSelector } from 'src/hooks';
import queryString from 'query-string';

const Discover = ({ item }: { item: IJobTop }) => {
  const { id_rank, name_rank, total_count } = item;
  const navigate = useNavigate();
  const { jobFilters } = useAppSelector((state) => state.jobSlice);
  return (
    <Grid item xs={6} lg={2.4} md={3} sm={4}>
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
          <BsFillBriefcaseFill />
        </Box>
        <Typography fontWeight="600" fontSize="18px" py={2}>
          {name_rank}
        </Typography>
        <Typography fontSize="16px">({total_count} việc làm)</Typography>

        <Box>
          <Button
            endIcon={<AiOutlineArrowRight />}
            sx={{
              color: theme.palette.common.white,
              border: `1px solid ${theme.palette.common.white}`,
              visibility: 'hidden',
              mt: 1,
            }}
            onClick={() => {
              const newJobFilters = {
                ...jobFilters,
                id_rank,
              };
              const stringifiedParams = queryString.stringify(newJobFilters);
              navigate(`/co-hoi-viec-lam?${stringifiedParams}`);
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
