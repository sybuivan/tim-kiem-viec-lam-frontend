import React from 'react';
import HTMLString from 'react-html-string';
import { Box, Paper, Typography, Button } from '@mui/material';
import { FavoriteBorderOutlined } from '@mui/icons-material';

import theme from 'src/theme';
import ApplyModal from '../apply_modal';
import { MODAL_IDS } from 'src/constants';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import { FavoriteRounded } from '@mui/icons-material';
import { checkIsApply, checkIsSaveJob } from 'src/utils/common';
import LoginForm from 'src/pages/auth/login_form';
import { saveJob, unSavedJob } from 'src/redux_store/user/user_action';
import { toastMessage } from 'src/utils/toast';
import { unSaveJobById } from 'src/redux_store/user/user_slice';
import { socketIo } from 'src/clients/socket';

const JobDescription = ({
  description_job,
  benefits_job,
  required_job,
  id_job,
}: {
  required_job?: string;
  description_job?: string;
  benefits_job?: string;
  id_job: string;
}) => {
  const dispatch = useAppDispatch();
  const {
    token,
    me,
    saveJobList: { savedList },
  } = useAppSelector((state) => state.userSlice);
  const {
    applyList: { data },
  } = useAppSelector((state) => state.applySlice);

  const handleOnpenApply = () => {
    dispatch(
      openModal({
        modalId: MODAL_IDS.apply,
        dialogComponent: <ApplyModal id_job={id_job} />,
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
          fontSize: '16px',
          listStyle: 'inherit',
          paddingLeft: '20px',
          // fontWeight: '500',
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

      <Box display="flex" gap={2} py={4}>
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
