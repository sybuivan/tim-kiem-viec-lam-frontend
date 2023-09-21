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
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import { baseURL } from 'src/config';
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
        <Grid item xs={12} lg={6} md={12} sm={12}>
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
                <Box
                  sx={{
                    [theme.breakpoints.down('sm')]: {
                      display: 'none',
                    },
                  }}
                >
                  <img
                    alt=""
                    src={`${baseURL}/${jobItem.logo}`}
                    width="88"
                    height="88"
                  />
                </Box>
                <Box flex="1">
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                      [theme.breakpoints.down('sm')]: {
                        flexDirection: 'column',
                        alignItems: 'start',
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
                    <Typography
                      fontWeight="600"
                      sx={{
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        fontSize: '15px',
                        margin: 0,
                        maxWidth: '500px',
                        [theme.breakpoints.down('lg')]: {
                          maxWidth: '350px',
                        },
                        [theme.breakpoints.down('md')]: {
                          maxWidth: 'none',
                          whiteSpace: 'pre-wrap',
                        },
                      }}
                    >
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
      <Grid item lg={4} md={6} sm={12} xs={12}>
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
              <Box
                sx={{
                  [theme.breakpoints.down('sm')]: {
                    display: 'none',
                  },
                }}
              >
                <img
                  alt=""
                  src={`${baseURL}/${jobItem.logo}`}
                  width="88"
                  height="88"
                />
              </Box>

              <Box flex="1">
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  sx={{
                    [theme.breakpoints.down('sm')]: {
                      flexDirection: 'column',
                      alignItems: 'start',
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
                      size="small"
                    />
                  )}
                  {jobItem.is_new && (
                    <Chip
                      label="Mới"
                      sx={{
                        background: theme.palette.success.main,
                        color: theme.palette.common.white,
                        mr: 1,
                        borderRadius: '10px',
                        height: '25px',
                      }}
                      size="small"
                    />
                  )}
                  <Typography
                    fontWeight="600"
                    title={jobItem.name_job}
                    sx={{
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      fontSize: '15px',
                      margin: 0,
                      maxWidth: '215px',
                      [theme.breakpoints.down('md')]: {
                        maxWidth: 'none',
                        whiteSpace: 'pre-wrap',
                      },
                    }}
                  >
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
                    maxWidth: '215px',
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
                      maxWidth: '190px',
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
      </Grid>
    );
  };

  return <>{renderJobItem()}</>;
};

export default JobItem;
