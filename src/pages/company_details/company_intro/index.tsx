import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import {
  LocationOnOutlined,
  Groups2Outlined,
  FactoryOutlined,
  HourglassBottomOutlined,
} from '@mui/icons-material';
import theme from 'src/theme';

const CompanyIntro = () => {
  return (
    <Paper
      sx={{
        p: 1,
        mt: '40px',
      }}
    >
      <Container
        sx={{
          maxWidth: '1000px!important',
        }}
      >
        <Box my={4}>
          <Typography fontWeight="600" fontSize="24px" mb={2}>
            Giới thiệu doanh nghiệp
          </Typography>

          <Typography fontWeight="500" fontSize="16px">
            Sức khỏe và vẻ đẹp luôn là khao khát của tất cả mọi người. Đặc biệt
            là sau hành trình mang thai và làm mẹ, chăm sóc sức khỏe của Mẹ và
            em bé là mối quan tâm của các chị em phụ nữ. Chăm sóc sức khỏe và
            sắc đẹp là một phần biểu hiện sự trân trọng bản thân và trân trọng
            cuộc sống tạo hóa đã ban tặng cho ta. Hiểu được những trăn trở của
            các chị em phụ nữ, các Mẹ, công ty TNHH Thương mại và Dịch vụ Wonmom
            đã cho ra đời các dòng sản phẩm mỹ phẩm kế thừa tinh hoa y học cổ
            truyền và cải tiến theo y học hiện đại để tăng cường và phục hồi sức
            khỏe, lấy lại vóc dáng thon gon sau sinh cho mẹ. Bên cạnh đó, Wonmom
            cũng cho ra đời các dòng sản phẩm chăm sóc bé yêu sạch và an toàn để
            các chị em phụ nữ yên tâm khi lựa chọn cho bé yêu của mình. Với
            phương trâm mong muốn giúp cho việc chăm sóc sức khỏe và làm đẹp
            theo phương pháp truyền thống dễ tiếp cận đến tất cả chị em phụ nữ,
            các mẹ để các chị em phụ nữ có cơ hôi trải nghiệm và chăm sóc gia
            đình mình theo những giải pháp và liệu trình sản phẩm phù hợp{' '}
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
};

export default CompanyIntro;
