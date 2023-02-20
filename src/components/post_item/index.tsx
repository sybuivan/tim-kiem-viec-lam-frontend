import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const PostItem = () => {
  return (
    <Grid item xs={4}>
      <Box sx={{ cursor: 'pointer' }}>
        <img
          src="https://nghenghiep.vieclam24h.vn/wp-content/uploads/2023/02/entp-9.jpg"
          alt=""
          width="100%"
        />

        <Typography variant="h5" py={1}>
          Bậc thầy tranh luận ENTP là những người thú vị như thế nào?
        </Typography>
        <Typography>
          Được mệnh danh là “nhà phát minh”, “nhà tranh luận” hay “người nhìn xa
          trông rộng”, ENTP nổi bật với đam mê dành cho sáng tạo và cách sống
          hết mình vì lý tưởng{' '}
        </Typography>
      </Box>
    </Grid>
  );
};

export default PostItem;
