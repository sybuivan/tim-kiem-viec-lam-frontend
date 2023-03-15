import { Box, Typography, Grid, IconButton } from '@mui/material';
import React from 'react';
import {
  LocationOnOutlined,
  PaidOutlined,
  FavoriteBorderOutlined,
  FavoriteRounded,
} from '@mui/icons-material';
import { IJob } from 'src/types/job';
import theme from 'src/theme';
import { useNavigate } from 'react-router';
import { checkIsSaveJob } from 'src/utils/common';
import { useAppSelector, useSaveJob } from 'src/hooks';

interface IJobItem {
  jobItem: IJob;
  col?: number;
  isPage?: boolean;
}

const JobItem = (props: IJobItem) => {
  const { jobItem, col = 4, isPage = false } = props;
  const navigate = useNavigate();
  const {
    saveJobList: { savedList },
    token,
    me,
  } = useAppSelector((state) => state.userSlice);
  const { handleOnUnSaved, handleOnSave } = useSaveJob(
    token,
    jobItem.id_job,
    me?.id_user
  );

  const handleClick = () => {
    navigate(`/viec-lam/${jobItem.id_job}`);
  };

  return (
    <Grid item xs={col}>
      <Box position="relative">
        <Box
          sx={{
            border: '1px solid #c1c1c1',
            borderRadius: '4px',
            padding: 1,
            '&:hover': {
              border: `1px solid ${theme.palette.primary.dark}`,
              cursor: 'pointer',
            },
            backgroundColor: isPage ? '#fff5e7' : theme.palette.common.white,
          }}
          onClick={handleClick}
        >
          {!isPage && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontWeight="600">{jobItem.name_job}</Typography>
            </Box>
          )}

          <Box display="flex" gap={1}>
            <img alt="" src={jobItem.logo} width="88" height="88" />

            <Box flex="1">
              {isPage && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography fontWeight="600">{jobItem.name_job}</Typography>
                </Box>
              )}
              <Typography
                pb={isPage ? 1 : 2.5}
                color={theme.palette.grey[600]}
                fontWeight="600"
              >
                {jobItem.name_company}
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <PaidOutlined />
                  {jobItem.name_range}
                </Typography>
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <LocationOnOutlined />

                  {jobItem.name_city}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box position="absolute" top="2px" right="10px">
          {checkIsSaveJob(savedList, jobItem.id_job) ? (
            <IconButton onClick={handleOnUnSaved}>
              <FavoriteRounded
                sx={{
                  color: theme.palette.primary.main,
                }}
              />
            </IconButton>
          ) : (
            <IconButton onClick={handleOnSave}>
              <FavoriteBorderOutlined />
            </IconButton>
          )}
        </Box>
      </Box>
    </Grid>
  );
};

export default JobItem;
