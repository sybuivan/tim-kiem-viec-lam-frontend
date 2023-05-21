import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import {
  Box,
  Button,
  Link,
  Typography,
  FormControlLabel,
  Switch,
} from '@mui/material';

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { ReactComponent as PdfSvg } from 'src/assets/svg/pdf.svg';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import {
  getProfileCV,
  updateIsPublicCV,
} from 'src/redux_store/user/user_action';
import theme from 'src/theme';

const ProfileDocument = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { profileCV } = useAppSelector((state) => state.userSlice);
  const { me } = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    dispatch(getProfileCV(me.id_user));
  }, []);

  const handleOnChangeIsPublic = (
    e: React.ChangeEvent<HTMLInputElement>,
    id_profile: string
  ) => {
    dispatch(
      updateIsPublicCV({
        id_profile,
        id_user: me.id_user,
        is_public: e.target.checked,
      })
    );
  };

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
                <PdfSvg />
                <Box>
                  <Typography fontWeight="600">{item.file_name}</Typography>
                  <Link href={`${item.file_cv}`} target="_blank">
                    Xem hồ sơ
                  </Link>
                </Box>
              </Box>
              <Box display="flex" gap={1}>
                <Box borderRight="2px solid #c1c1c1">
                  <FormControlLabel
                    control={
                      <Switch
                        size="medium"
                        checked={item.is_public}
                        onChange={(e) => {
                          if (item.id_profile)
                            handleOnChangeIsPublic(e, item.id_profile);
                        }}
                      />
                    }
                    label="Cho phép tìm kiếm "
                  />
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
                    navigate(
                      `/thong-tin-ca-nhan/ho-so-dinh-kem/${item.id_profile}`
                    );
                  }}
                  sx={{
                    ml: 1,
                  }}
                >
                  Cập nhật hồ sơ
                </Button>
              </Box>
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
