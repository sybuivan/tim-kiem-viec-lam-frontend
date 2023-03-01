import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import {
  LocationOnOutlined,
  LanguageOutlined,
  RemoveRedEyeOutlined,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'src/hooks';
import theme from 'src/theme';

const CompanyInfo = () => {
  const {
    companyDetail: {
      company: { cover_image, link_website, logo, name_company },
    },
  } = useAppSelector((state) => state.companySlice);
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
              <img
                width="150px"
                height="150px"
                alt=""
                src={logo}
                style={{
                  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                  borderRadius: '20px',
                  position: 'absolute',
                  bottom: '20px',
                }}
              />

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
            <Button
              startIcon={<RemoveRedEyeOutlined />}
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
                px: 4,
                py: 1,
              }}
            >
              Theo dõi
            </Button>
          </Box>
        </Container>
      </Box>
    </Paper>
  );
};

export default CompanyInfo;
