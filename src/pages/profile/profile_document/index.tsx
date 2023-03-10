import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import theme from 'src/theme';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { getProfileCV } from 'src/redux_store/user/user_action';

const ProfileDocument = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.userSlice);

  useEffect(() => {
    dispatch(getProfileCV(me.id_user));
  }, []);

  return (
    <Box>
      <Box
        bgcolor={theme.palette.common.white}
        p={2}
        display="flex"
        gap={1}
        mb={2}
      >
        <Typography fontSize="18px" fontWeight="600">
          Hồ sơ của bạn
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgcolor={theme.palette.common.white}
        p={2}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <img src="https://vieclam24h.vn/img/img-hsdk.png" alt="" />

          <Box>
            <Typography fontWeight="600" fontSize="17px">
              Hồ sơ đính kèm
            </Typography>
            <Typography fontWeight="500">
              Ứng tuyển nhanh chóng hơn với hồ sơ sẵn có
            </Typography>
          </Box>
        </Box>

        <Button
          onClick={() => {
            navigate('/thong-tin-ca-nhan/ho-so-dinh-kem');
          }}
          startIcon={<AttachmentOutlinedIcon />}
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.main,
          }}
        >
          Tạo hồ sơ đính kèm
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileDocument;
