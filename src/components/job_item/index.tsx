import {
  FavoriteBorderOutlined,
  FavoriteRounded,
  LocationOnOutlined,
  PaidOutlined,
} from '@mui/icons-material';
import {
  Box,
  Chip,
  Grid,
  IconButton,
  Typography,
  Tooltip,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector, useSaveJob } from 'src/hooks';
import theme from 'src/theme';
import { IJob } from 'src/types/job';
import { checkIsSaveJob } from 'src/utils/common';
import { getSubTimeFromDayFNS } from 'src/utils/function';

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

  const renderJobItem = () => {
    if (isPage)
      return (
        <Grid item xs={12} lg={6} md={6} sm={12}>
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
              <Box display="flex" gap={1}>
                <img alt="" src={jobItem.logo} width="88" height="88" />

                <Box flex="1">
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
                        [theme.breakpoints.up('xs')]: {
                          maxWidth: '300px',
                        },
                      }}
                    >
                      {jobItem.urgency === 1 && (
                        <Chip
                          label="Gấp"
                          sx={{
                            background: theme.palette.error.main,
                            color: theme.palette.common.white,
                            mr: 1,
                            borderRadius: '10px',
                            height: '25px',
                          }}
                        />
                      )}
                      {jobItem.name_job}
                    </Typography>
                  </Box>
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

                      {jobItem.cities?.map((item) => item.name_city + ', ')}
                    </Typography>
                  </Box>
                  <Box mt={1} display="flex" gap={1} flexWrap="wrap">
                    <Chip
                      label={`Cập nhật ${getSubTimeFromDayFNS(
                        jobItem.created_at
                      )}`}
                    />
                    <Chip label={`Còn ${jobItem.days_left} ngày tuyển dụng`} />
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
    return (
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
          <Box display="flex" gap={1}>
            <img alt="" src={jobItem.logo} width="88" height="88" />

            <Box flex="1">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  fontWeight="600"
                  title={jobItem.name_job}
                  sx={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    fontSize: '15px',
                    margin: 0,
                    maxWidth: '265px',
                  }}
                >
                  {jobItem.urgency === 1 && (
                    <Chip
                      label="Gấp"
                      sx={{
                        background: theme.palette.error.main,
                        color: theme.palette.common.white,
                        mr: 1,
                        borderRadius: '10px',
                        height: '25px',
                      }}
                    />
                  )}
                  {jobItem.name_job}
                </Typography>
              </Box>
              <Typography
                pb={isPage ? 1 : 2.5}
                color={theme.palette.grey[600]}
                title={jobItem.name_company}
                fontWeight="600"
                sx={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  fontSize: '15px',
                  margin: 0,
                  maxWidth: '265px',
                }}
              >
                {jobItem.name_company}
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                justifyContent="space-between"
              >
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
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    fontSize: '15px',
                    margin: 0,
                    maxWidth: '180px',
                    mr: 1,
                  }}
                >
                  <LocationOnOutlined />
                  {jobItem.cities &&
                    jobItem.cities.length > 0 &&
                    jobItem.cities[0].name_city}{' '}
                  {jobItem.cities && jobItem.cities?.length - 1 > 0 && (
                    <Tooltip
                      title={jobItem.cities
                        .slice(1)
                        .map((item) => item.name_city)
                        .join(', ')}
                    >
                      <Typography ml={1}>
                        {'  '}+ {jobItem.cities.length - 1}
                      </Typography>
                    </Tooltip>
                  )}
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
    );
  };

  return <>{renderJobItem()}</>;
};

export default JobItem;
