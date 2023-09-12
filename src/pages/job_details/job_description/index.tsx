import { FavoriteBorderOutlined, FavoriteRounded } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import HTMLString from 'react-html-string';
import { socketIo } from 'src/clients/socket';

import { MODAL_IDS } from 'src/constants';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import LoginForm from 'src/pages/auth/login_form';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import { saveJob, unSavedJob } from 'src/redux_store/user/user_action';
import { unSaveJobById } from 'src/redux_store/user/user_slice';
import theme from 'src/theme';
import { IJob } from 'src/types/job';
import { checkIsApply, checkIsSaveJob } from 'src/utils/common';
import { toastMessage } from 'src/utils/toast';
import ApplyModal from '../apply_modal';

const JobDescription = ({ job }: { job: IJob }) => {
  const {
    required_job,
    benefits_job,
    description_job,
    id_job,
    name_job,
    name_company,
  } = job;
  const dispatch = useAppDispatch();
  const {
    saveJobList: { savedList },
  } = useAppSelector((state) => state.userSlice);

  const { token, me } = useAppSelector((state) => state.authSlice);

  const {
    applyList: { data },
  } = useAppSelector((state) => state.applySlice);

  const handleOnpenApply = () => {
    if (name_company)
      dispatch(
        openModal({
          modalId: MODAL_IDS.apply,
          dialogComponent: (
            <ApplyModal
              id_job={id_job}
              name_job={name_job}
              name_company={name_company}
            />
          ),
        })
      );
  };
  const handleOnSave = () => {
    if (token) {
      dispatch(
        saveJob({
          id_job,
          id_user: me?.id_user,
        })
      )
        .unwrap()
        .then(() => {
          toastMessage.success('Lưu thành công');
        });
    } else {
      dispatch(
        openModal({
          modalId: MODAL_IDS.login,
          dialogComponent: <LoginForm socket={socketIo} />,
        })
      );
    }
  };

  const handleOnUnSaved = () => {
    if (token) {
      dispatch(
        unSavedJob({
          id_job: id_job,
          id_user: me?.id_user,
        })
      )
        .unwrap()
        .then(() => {
          toastMessage.success('Bỏ lưu thành công');
          dispatch(unSaveJobById(id_job));
        });
    }
  };

  return (
    <Box
      sx={{
        '&  li': {
          paddingBottom: '5px',
        },
        '& ul': {
          fontSize: '14px',
          listStyle: 'inherit',
          paddingLeft: '20px',
        },
      }}
    >
      <Box>
        <Typography fontWeight="600" py={2} fontSize="20px">
          Mô tả công việc
        </Typography>
        <HTMLString html={description_job} />
      </Box>
      <Box>
        <Typography fontWeight="600" py={2} fontSize="20px">
          Yêu cầu công việc
        </Typography>

        <HTMLString html={required_job} />
      </Box>
      <Box>
        <Typography fontWeight="600" py={2} fontSize="20px">
          Quyền lợi
        </Typography>
        <HTMLString html={benefits_job} />
      </Box>

      <Box
        display="flex"
        gap={2}
        py={4}
        sx={{
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
          },
        }}
      >
        {checkIsApply(data, id_job) ? (
          <Box
            sx={{
              color: theme.palette.warning.main,
              px: 6,
              py: 2,
              border: `1px solid ${theme.palette.warning.main}`,
              borderRadius: '4px',
              '&:hover': {
                cursor: 'no-drop',
              },
            }}
          >
            Đã nộp hồ sơ
          </Box>
        ) : (
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
              px: 6,
              py: 2,
            }}
            onClick={handleOnpenApply}
          >
            Nộp hồ sơ
          </Button>
        )}
        {checkIsSaveJob(savedList, id_job) ? (
          <Button
            startIcon={<FavoriteRounded />}
            variant="outlined"
            sx={{
              px: 5,
              color: theme.palette.primary.main,
            }}
            onClick={handleOnUnSaved}
          >
            Đã lưu
          </Button>
        ) : (
          <>
            <Button
              startIcon={<FavoriteBorderOutlined />}
              variant="outlined"
              sx={{
                px: 5,
              }}
              onClick={handleOnSave}
            >
              Lưu
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default JobDescription;
