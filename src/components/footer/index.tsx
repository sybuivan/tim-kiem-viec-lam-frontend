import { Grid, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import LOGO from 'src/assets/images/logo.png';
import FOOTERS from 'src/assets/images/footer.jpg';

const Footer = () => {
  return (
    <footer id={styles.footer}>
      <Container
        sx={{
          height: '100%',
          minWidth: '1300px',
        }}
      >
        <Grid container>
          <Grid item xs={3}>
            <div>
              <img src={LOGO} alt="" className={styles.image} />
            </div>
          </Grid>
          <Grid xs={5}>
            <div>
              <ul className={styles.listFooter}>
                <li>
                  <h4 style={{ margin: 0 }}>Tìm việc ngay</h4>
                </li>
                <li>Địa chỉ: 72 Đinh Tiên Hoàng - Hải Châu - Đà Nẵng</li>
                <li>
                  <Link to=""> Website: https://timkiemvieclam.vn</Link>
                </li>
                <li>Email: sybuivan1429@.vn</li>
                <li>Điện thoại: 0947895039</li>
              </ul>
            </div>
          </Grid>
          <Grid xs={2}>
            <div>
              <ul className={styles.listFooter}>
                <li>Liên hệ</li>
                <li>Điều khoản dịch vụ</li>
                <li>Chính sách bảo mật</li>
                <li>Quy định sử dụng</li>
              </ul>
            </div>
          </Grid>
          <Grid xs={2}>
            <ul className={styles.listFooter}>
              <li>
                <h4 style={{ margin: 0 }}>Kết nối với chúng tôi</h4>
              </li>
            </ul>

            <img src={FOOTERS} alt="" width="100%" />
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
