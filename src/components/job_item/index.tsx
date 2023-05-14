import React from 'react';
import { Box, Typography, Grid, IconButton, Chip } from '@mui/material';
import {
  LocationOnOutlined,
  PaidOutlined,
  FavoriteBorderOutlined,
  FavoriteRounded,
} from '@mui/icons-material';
import moment from 'moment';
import { IJob } from 'src/types/job';
import theme from 'src/theme';
import { useNavigate } from 'react-router';
import { checkIsSaveJob } from 'src/utils/common';
import { useAppSelector, useSaveJob } from 'src/hooks';
import { getSubTimeFromDayFNS } from 'src/utils/function';
import { differenceInDays, parse } from 'date-fns';

interface IJobItem {
  jobItem: IJob;
  col?: number;
  isPage?: boolean;
  m?: number;
}

const JobItem = (props: IJobItem) => {
  const { jobItem, col = 4, isPage = false, m = 0 } = props;
  const navigate = useNavigate();
  const {
    saveJobList: { savedList },
  } = useAppSelector((state) => state.userSlice);

  const { me, token } = useAppSelector((state) => state.authSlice);

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
      <Box position="relative" m={m}>
        <Box
          sx={{
            border: '1px solid #c1c1c1',
            borderRadius: '4px',
            padding: 1,
            '&:hover': {
              border: `1px solid ${theme.palette.primary.dark}`,
              cursor: 'pointer',
            },
            backgroundColor: theme.palette.common.white,
          }}
          onClick={handleClick}
        >
          {!isPage && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                fontWeight="600"
                sx={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  fontSize: '15px',
                  margin: 0,
                  maxWidth: '360px',
                }}
              >
                {jobItem.name_job}
              </Typography>
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
                  <Typography
                    fontWeight="600"
                    sx={{
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      fontSize: '15px',
                      margin: 0,
                      maxWidth: '330px',
                    }}
                  >
                    {jobItem.name_job}
                  </Typography>
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
              {isPage && (
                <Box mt={1} display="flex" gap={1}>
                  <Chip
                    label={`Cập nhật ${getSubTimeFromDayFNS(
                      jobItem.created_at
                    )}`}
                  />
                  <Chip label={`Còn ${jobItem.days_left} ngày tuyển dụng`} />
                </Box>
              )}
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
