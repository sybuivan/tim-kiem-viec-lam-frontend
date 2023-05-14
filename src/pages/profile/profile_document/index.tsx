import React, { useEffect } from 'react';
import { Box, Typography, Button, Link } from '@mui/material';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import theme from 'src/theme';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { getProfileCV } from 'src/redux_store/user/user_action';
import { PictureAsPdfOutlined } from '@mui/icons-material';
import { setProfileDetail } from 'src/redux_store/user/user_slice';

const ProfileDocument = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { profileCV } = useAppSelector((state) => state.userSlice);
  const { me } = useAppSelector((state) => state.authSlice);

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

      {profileCV.length > 0 &&
        profileCV.map((item) => (
          <Box bgcolor={theme.palette.common.white} p={2} key={item.id_profile}>
            <Box
              sx={{
                border: '1px solid rgba(234,240,246,1)',
                px: 2,
                py: 1,
                mb: 2,
                borderRadius: '4px',
                fontWeight: '600',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box gap={2} display="flex" alignItems="center">
                <PictureAsPdfOutlined
                  sx={{
                    color: theme.palette.error.main,
                    fontSize: '30px',
                  }}
                />
                <Box>
                  <Typography fontWeight="600">{item.file_name}</Typography>
                  <Link href={`${item.file_cv}`} target="_blank">
                    Xem hồ sơ
                  </Link>
                </Box>
              </Box>
              <Button
                variant="outlined"
                startIcon={
                  <AutoFixHighOutlinedIcon
                    sx={{
                      color: theme.palette.primary.main,
                    }}
                  />
                }
                onClick={() => {
                  navigate(`/thong-tin-ca-nhan/ho-so-dinh-kem`);
                  dispatch(setProfileDetail(item));
                }}
              >
                Cập nhật hồ sơ
              </Button>
            </Box>
          </Box>
        ))}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgcolor={theme.palette.common.white}
        p={2}
        mt={2}
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
            if (me?.is_update_profle) {
              return navigate('/thong-tin-ca-nhan/them-moi-ho-so');
            }
            navigate('/thong-tin-ca-nhan');
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
