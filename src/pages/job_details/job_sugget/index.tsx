import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import {
  LocationOnOutlined,
  AttachMoneyOutlined,
  BusinessCenterOutlined,
  FavoriteBorderOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import theme from 'src/theme';
import { IJob } from 'src/types/job';
import { useAppSelector, useSaveJob } from 'src/hooks';
import { FavoriteRounded } from '@mui/icons-material';
import { checkIsSaveJob } from 'src/utils/common';

const JobItem = ({ job }: { job: IJob }) => {
  const {
    name_range,
    name_company,
    logo,
    name_experience,
    name_job,
    work_location,
    id_job,
  } = job;

  const {
    saveJobList: { savedList },
  } = useAppSelector((state) => state.userSlice);
  const { me, token } = useAppSelector((state) => state.authSlice);

  const { handleOnUnSaved, handleOnSave } = useSaveJob(
    token,
    id_job,
    me?.id_user
  );

  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/viec-lam/${id_job}`);
  };
  return (
    <Box position="relative">
      <Box
        sx={{
          border: '1px solid #c1c1c1',
          borderRadius: '4px',
          padding: 1,
          cursor: 'pointer',
        }}
        onClick={handleOnClick}
      >
        <Box display="flex" gap={2}>
          <img width="50" height="50" alt="" src={logo} />
          <Box>
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
              {name_job}
            </Typography>

            <Typography fontWeight="500">{name_company}</Typography>
          </Box>
        </Box>
        <Box pl={7} display="flex" justifyContent="space-between">
          <Box>
            <Box display="flex" gap={1}>
              <LocationOnOutlined
                sx={{
                  color: theme.palette.grey[600],
                }}
              />
              <Typography>{work_location}</Typography>
            </Box>
            <Box display="flex" gap={1}>
              <AttachMoneyOutlined
                sx={{
                  color: theme.palette.grey[600],
                }}
              />
              <Typography>{name_range}</Typography>
            </Box>
            <Box display="flex" gap={1}>
              <BusinessCenterOutlined
                sx={{
                  color: theme.palette.grey[600],
                }}
              />
              <Typography>{name_experience}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box position="absolute" bottom="30px" right="20px">
        {checkIsSaveJob(savedList, id_job) ? (
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

const JobSugget = ({ job_suggets }: { job_suggets: IJob[] }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography fontWeight="600" fontSize="20px">
        Việc làm tương tự cho bạn
      </Typography>
      {job_suggets.map((job) => (
        <JobItem job={job} key={job.id_job} />
      ))}
    </Box>
  );
};

export default JobSugget;
