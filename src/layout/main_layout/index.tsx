import { Box, IconButton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { Outlet, useLocation, useParams } from 'react-router';
import VerticalAlignTopOutlinedIcon from '@mui/icons-material/VerticalAlignTopOutlined';
import Header from 'src/components/header';
import Footer from 'src/components/footer';
import theme from 'src/theme';

const MainLayout = () => {
  const location = useLocation();
  const { id_room_message, id_profile } = useParams();
  const [isShowTop, setIsShowTop] = useState<boolean>(true);
  const refScroll = useRef<any>();

  const pathList = (id_room?: string, id_profile?: string) => [
    '/thong-tin-ca-nhan/them-moi-ho-so',
    `/thong-tin-ca-nhan/ho-so-dinh-kem/${id_profile}`,
    '/users/message',
    `/users/message/${id_room}`,
  ];

  const isShow = pathList(id_room_message, id_profile).includes(
    location.pathname
  );

  const handleScroll = () => {
    const scrollTop = refScroll.current.getScrollTop();
    scrollTop > 100 ? setIsShowTop(true) : setIsShowTop(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    refScroll.current?.scrollToTop({ behavior: 'smooth', block: 'start' });
  }, [location]);

  return (
    <Box bgcolor="#f2f3f7">
      <Box
        sx={{
          position: 'fixed',
          width: '100%',
          zIndex: 1000,
        }}
      >
        <Header />
      </Box>
      <Box
        pt="70px"
        height="100vh"
        sx={{
          overflowX: 'hidden',
        }}
      >
        <Scrollbars
          ref={refScroll}
          onScroll={handleScroll}
          renderTrackHorizontal={(props) => (
            <div
              {...props}
              className="track-horizontal"
              style={{ display: 'none' }}
            />
          )}
        >
          <Outlet />
          {!isShow && <Footer />}
        </Scrollbars>
      </Box>
      <IconButton
        onClick={() => {
          refScroll.current?.scrollToTop({
            behavior: 'smooth',
            block: 'start',
          });
        }}
        sx={{
          position: 'fixed',
          zIndex: 1000,
          bottom: '3rem',
          fontSize: '3rem',
          right: '3rem',
          background: theme.palette.primary.main,
          color: theme.palette.common.white,
          '&:hover': {
            background: theme.palette.primary.main,
            color: theme.palette.common.white,
          },
          visibility: `${isShowTop ? 'visible' : 'hidden'}`,
        }}
      >
        <VerticalAlignTopOutlinedIcon />
      </IconButton>
    </Box>
  );
};

export default MainLayout;
