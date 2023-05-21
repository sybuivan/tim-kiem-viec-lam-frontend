import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { Outlet, useLocation, useParams } from 'react-router';
import Header from 'src/components/header';
import Footer from 'src/components/footer';

const MainLayout = () => {
  const location = useLocation();
  const { id_room_message, id_profile } = useParams();
  const refScroll = useRef<any>();

  useEffect(() => {
    refScroll.current?.scrollToTop({ behavior: 'smooth', block: 'start' });
  }, [location]);

  const pathList = (id_room?: string, id_profile?: string) => [
    '/thong-tin-ca-nhan/them-moi-ho-so',
    `/thong-tin-ca-nhan/ho-so-dinh-kem/${id_profile}`,
    '/users/message',
    `/users/message/${id_room}`,
  ];
  const isShow = pathList(id_room_message, id_profile).includes(
    location.pathname
  );

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
        <Scrollbars ref={refScroll}>
          <Outlet />
          {!isShow && <Footer />}
        </Scrollbars>
      </Box>
    </Box>
  );
};

export default MainLayout;
