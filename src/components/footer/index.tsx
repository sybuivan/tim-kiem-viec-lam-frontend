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
          // minWidth: '1300px',
        }}
      >
        <Grid container spacing={1}>
          <Grid item lg={3} md={2} sm={2} xs={12}>
            <div>
              <img src={LOGO} alt="" className={styles.image} />
            </div>
          </Grid>
          <Grid item lg={5} md={4} sm={6} xs={12}>
            <div>
              <ul className={styles.listFooter}>
                <li>
                  <h4 style={{ margin: 0 }}>Tìm việc ngay</h4>
                </li>
                <li>Địa chỉ: 72 Đinh Tiên Hoàng - Hải Châu - Đà Nẵng</li>
                <li>
                  <Link
                    to=""
                    style={{
                      color: '#fff',
                    }}
                  >
                    {' '}
                    Website: https://timkiemvieclam.vn
                  </Link>
                </li>
                <li>Email: sybuivan1429@.vn</li>
                <li>Điện thoại: 0947895039</li>
              </ul>
            </div>
          </Grid>
          <Grid item lg={2} md={4} sm={4} xs={12}>
            <div>
              <ul className={styles.listFooter}>
                <li>Liên hệ</li>
                <li>Điều khoản dịch vụ</li>
                <li>Chính sách bảo mật</li>
                <li>Quy định sử dụng</li>
              </ul>
            </div>
          </Grid>
          <Grid item lg={2} md={2} sm={6} xs={12}>
            <ul className={styles.listFooter}>
              <li>
                <h4 style={{ margin: 0 }}>Kết nối với chúng tôi</h4>
              </li>
            </ul>

            <img src={FOOTERS} alt="" width="50%" />
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
