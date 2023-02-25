import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { FavoriteBorderOutlined } from '@mui/icons-material';

import theme from 'src/theme';

const JobDescription = () => {
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
        <ul>
          <li>
            Làm việc trực tiếp tại Chi nhánh Ngân hàng hàng đầu Việt Nam, xây
            dựng mối quan hệ và hỗ trợ nhân viên Ngân hàng và Chi nhánh trong
            các hoạt động kinh doanh
          </li>
          <li>Được hỗ trợ nguồn khách hàng từ nhân viên ngân hàng</li>
          <li>
            Hỗ trợ nhân viên Ngân hàng giới thiệu, tư vấn cho khách hàng về kế
            hoạch tài chính, giải pháp và chương trình Bảo hiểm
          </li>
          <li>
            Tham gia xây dựng kế hoạch kinh doanh theo từng giai đoạn; định kỳ
            báo cáo và cập nhật kết quả kinh doanh đến Quản lý kinh doanh trực
            tiếp
          </li>
          <li>Trao đổi trực tiếp khi phỏng vấns</li>
        </ul>
      </Box>
      <Box>
        <Typography fontWeight="600" py={2} fontSize="20px">
          Yêu cầu công việc
        </Typography>

        <ul>
          <li>Trình độ: Cao đẳng / Đại học</li>
          <li>
            Kinh nghiệm: Ít nhất 6th trong lãnh vực Sales. Có kinh nghiệm trong
            lãnh vực Ngân hàng/ Tài chính/ Bảo hiểm là một lợi thế Tác phong:
            chuyên nghiệp, nhanh nhẹn
          </li>
          <li>Kỹ năng: giao tiếp và đàm phán, chăm sóc khách hàng tốt</li>
        </ul>
      </Box>
      <Box>
        <Typography fontWeight="600" py={2} fontSize="20px">
          Quyền lợi
        </Typography>

        <ul>
          <li>Chế độ lương và phúc lợi: LƯƠNG CỐ ĐỊNH + hoa hồng + thưởngc</li>
          <li>Chính sách hoa hồng hấp dẫn, cạnh tranh</li>
          <li>
            Các khoản thưởng hiệu quả kinh doanh vượt trội định kì (tháng, quý,
            năm) và thưởng “nóng” nếu đạt thành tích xuất sắc Chế độ thưởng
          </li>
          <li>Chăm sóc sức khỏe</li>
          <li>Chăm sóc sức khỏe</li>
        </ul>
      </Box>

      <Box display="flex" gap={2} py={4}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            px: 6,
            py: 2,
          }}
        >
          Nộp hồ sơ
        </Button>
        <Button startIcon={<FavoriteBorderOutlined />} variant="outlined">
          Lưu hồ sơ
        </Button>
      </Box>
    </Box>
  );
};

export default JobDescription;
