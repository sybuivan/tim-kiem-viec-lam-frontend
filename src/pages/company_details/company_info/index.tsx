import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import {
  LocationOnOutlined,
  LanguageOutlined,
  RemoveRedEyeOutlined,
  DoneOutlined,
} from '@mui/icons-material';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import theme from 'src/theme';
import { checkIsFollow } from 'src/utils/common';
import {
  followCompany,
  unFollowCompany,
} from 'src/redux_store/user/user_action';
import LoginForm from 'src/pages/auth/login_form';
import { MODAL_IDS } from 'src/constants';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import {
  addFollowere,
  updateFollowere,
} from 'src/redux_store/company/company_slices';

const CompanyInfo = () => {
  const dispatch = useAppDispatch();
  const {
    companyDetail: {
      company: { cover_image, link_website, logo, name_company, id_company },
      followere,
    },
  } = useAppSelector((state) => state.companySlice);
  const { me } = useAppSelector((state) => state.userSlice);

  const handleFollow = () => {
    if (me?.id_user && id_company) {
      dispatch(
        followCompany({
          id_company,
          id_user: me?.id_user,
        })
      )
        .unwrap()
        .then((data) => {
          dispatch(
            addFollowere({
              id_company,
              id_user: me?.id_user,
            })
          );
        });
    } else {
      dispatch(
        openModal({
          modalId: MODAL_IDS.login,
          dialogComponent: <LoginForm />,
        })
      );
    }
  };

  const handleUnFollow = () => {
    if (id_company) {
      dispatch(
        unFollowCompany({
          id_company,
          id_user: me?.id_user,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(updateFollowere(me?.id_user));
        });
    }
  };
  return (
    <Paper
      sx={{
        paddingBottom: 3,
      }}
    >
      <Box position="relative">
        <div
          style={{
            width: '100%',
            height: '300px',
            backgroundSize: 'cover',
            backgroundPosition: '50%',
            backgroundImage: `url("${cover_image}")`,
            borderRadius: '0 0 20px 20px',
          }}
        ></div>

        <Container
          sx={{
            maxWidth: '1000px!important',
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" gap={2}>
              <Box
                width="150px"
                height="150px"
                sx={{
                  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                  borderRadius: '20px',
                  position: 'absolute',
                  bottom: '20px',
                }}
              >
                <img alt="" src={logo} width="100%" height="100%" />
              </Box>

              <Box
                sx={{
                  ml: '170px',
                  pt: 2,
                }}
              >
                <Typography fontWeight="600" fontSize="20px">
                  {name_company}
                </Typography>
                <Box display="flex" gap={3}>
                  <Box display="flex" gap={1} alignItems="center">
                    <LocationOnOutlined
                      sx={{
                        color: theme.palette.primary.main,
                      }}
                    />
                    <Typography>TP.HCM</Typography>
                  </Box>
                  <Box display="flex" gap={1} alignItems="center">
                    <LanguageOutlined
                      sx={{
                        color: theme.palette.primary.main,
                      }}
                    />
                    <Link to="/">{link_website}</Link>
                  </Box>
                </Box>
              </Box>
            </Box>
            {checkIsFollow(followere, me?.id_user) ? (
              <Button
                onClick={handleUnFollow}
                startIcon={<DoneOutlined />}
                variant="outlined"
                sx={{
                  color: theme.palette.success.main,
                  border: `1px solid ${theme.palette.success.main}`,
                  px: 4,
                  py: 1,
                }}
              >
                Đang theo dõi •{followere?.length > 0 && followere?.length}
              </Button>
            ) : (
              <Button
                onClick={handleFollow}
                startIcon={<RemoveRedEyeOutlined />}
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                  px: 4,
                  py: 1,
                }}
              >
                Theo dõi •{followere?.length > 0 && followere?.length}
              </Button>
            )}
          </Box>
        </Container>
      </Box>
    </Paper>
  );
};

export default CompanyInfo;
