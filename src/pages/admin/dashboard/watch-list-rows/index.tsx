import {
  Button,
  Card,
  Box,
  CardActions,
  Typography,
  Stack,
  Divider,
  useTheme,
} from '@mui/material';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import TrendingDownTwoToneIcon from '@mui/icons-material/TrendingDownTwoTone';
import TrendingUpTwoToneIcon from '@mui/icons-material/TrendingUpTwoTone';
import TrendingFlatTwoToneIcon from '@mui/icons-material/TrendingFlatTwoTone';
import { AvatarWrapper } from '../watch-list-column/styles';

function WatchListRow() {
  const theme = useTheme();

  const Box1Options = {
    chart: {
      animations: {
        enabled: false,
      },
      background: 'transparent',
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
      zoom: {
        enabled: false,
      },
    },
    labels: [
      'Monday',
      'Tueday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    stroke: {
      curve: 'smooth',
      colors: [theme.palette.primary.main],
      width: 2,
    },
    yaxis: {
      show: false,
    },
    colors: [theme.palette.primary.main],
    grid: {
      padding: {
        top: 10,
        right: 5,
        bottom: 10,
        left: 5,
      },
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      fixed: {
        enabled: true,
      },
      x: {
        show: true,
      },
      y: {
        title: {
          formatter: function () {
            return 'Price: $';
          },
        },
      },
      marker: {
        show: false,
      },
    },
  };

  const Box1Data = [
    {
      name: 'Bitcoin',
      data: [55.701, 57.598, 48.607, 46.439, 58.755, 46.978, 58.16],
    },
  ];

  const Box2Data = [
    {
      name: 'Ethereum',
      data: [1.854, 1.873, 1.992, 2.009, 1.909, 1.942, 1.884],
    },
  ];

  const Box3Data = [
    {
      name: 'Cardano',
      data: [13, 16, 14, 18, 8, 11, 20],
    },
  ];

  return (
    <Card>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="stretch"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={0}
      >
        <Box
          sx={{
            width: '100%',
            p: 3,
          }}
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <AvatarWrapper>
                <img
                  alt="BTC"
                  src="/static/images/placeholders/logo/bitcoin.png"
                />
              </AvatarWrapper>
              <Box>
                <Typography variant="h4" noWrap>
                  Bitcoin
                </Typography>
                <Typography variant="subtitle1" noWrap>
                  BTC
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            mt={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Typography
                sx={{
                  pr: 1,
                  fontWeight: '600',
                  fontSize: '20px',
                }}
              >
                $56,475.99
              </Typography>
              <Typography color={theme.palette.success.main}>
                <b>+12.5%</b>
              </Typography>
            </Box>
            <TrendingUpTwoToneIcon
              sx={{
                color: `${theme.palette.success.main}`,
              }}
            />
          </Box>
          <Box pt={2}>
            <Chart
              options={Box1Options}
              series={Box1Data}
              type="line"
              height={100}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            p: 3,
          }}
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <AvatarWrapper>
                <img
                  alt="ETH"
                  src="/static/images/placeholders/logo/ethereum.png"
                />
              </AvatarWrapper>
              <Box>
                <Typography variant="h4" noWrap>
                  Ethereum
                </Typography>
                <Typography variant="subtitle1" noWrap>
                  ETH
                </Typography>
              </Box>
            </Box>
            <Typography color={theme.palette.success.main}>
              <b>+12.5%</b>
            </Typography>{' '}
          </Box>
          <Box
            mt={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Typography
                sx={{
                  pr: 1,
                  fontWeight: '600',
                  fontSize: '20px',
                }}
              >
                $1,968.00
              </Typography>
              <Typography color={theme.palette.success.main}>
                <b>+12.5%</b>
              </Typography>
            </Box>
            <TrendingDownTwoToneIcon
              sx={{
                color: `${theme.palette.error.main}`,
              }}
            />
          </Box>
          <Box pt={2}>
            <Chart
              options={Box1Options}
              series={Box2Data}
              type="line"
              height={100}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            p: 3,
          }}
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <AvatarWrapper>
                <img
                  alt="ADA"
                  src="/static/images/placeholders/logo/cardano.png"
                />
              </AvatarWrapper>
              <Box>
                <Typography variant="h4" noWrap>
                  Cardano
                </Typography>
                <Typography variant="subtitle1" noWrap>
                  ADA
                </Typography>
              </Box>
            </Box>
            <Typography color={theme.palette.success.main}>
              <b>+12.5%</b>
            </Typography>{' '}
          </Box>
          <Box
            mt={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Typography
                sx={{
                  pr: 1,
                  fontWeight: '600',
                  fontSize: '20px',
                }}
              >
                $23.00
              </Typography>
              <Typography color={theme.palette.success.main}>
                <b>+12.5%</b>
              </Typography>
            </Box>
            <TrendingFlatTwoToneIcon
              sx={{
                color: `${theme.palette.warning.main}`,
              }}
            />
          </Box>
          <Box pt={2}>
            <Chart
              options={Box1Options}
              series={Box3Data}
              type="line"
              height={100}
            />
          </Box>
        </Box>
      </Stack>
      <Divider />
      <CardActions
        disableSpacing
        sx={{
          p: 3,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button variant="outlined">View more assets</Button>
      </CardActions>
    </Card>
  );
}

export default WatchListRow;
