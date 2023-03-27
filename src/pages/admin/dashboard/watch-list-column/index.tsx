import { Card, Box, Typography, Grid, useTheme } from '@mui/material';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { AvatarWrapper } from './styles';

function WatchListColumn() {
  const theme = useTheme();

  const chartOptions = {
    chart: {
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
    fill: {
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.1,
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    colors: [theme.palette.primary.main],
    dataLabels: {
      enabled: false,
    },
    theme: {
      mode: theme.palette.mode,
    },
    stroke: {
      show: true,
      colors: [theme.palette.primary.main],
      width: 3,
    },
    legend: {
      show: false,
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
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      tickAmount: 5,
    },
    tooltip: {
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
  const chart1Data = [
    {
      name: 'Bitcoin Price',
      data: [55.701, 57.598, 48.607, 46.439, 58.755, 46.978, 58.16],
    },
  ];
  const chart2Data = [
    {
      name: 'Ethereum Price',
      data: [13, 16, 14, 20, 8, 11, 20],
    },
  ];
  const chart3Data = [
    {
      name: 'Cardano Price',
      data: [51.85, 41.77, 22.09, 42.0, 71.9, 51.84, 31.84],
    },
  ];

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item md={4} xs={12}>
        <Card
          sx={{
            overflow: 'visible',
          }}
        >
          <Box
            sx={{
              p: 3,
            }}
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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                pt: 3,
              }}
            >
              <Typography
                sx={{
                  pr: 1,
                  fontSize: '20px',
                  fontWeight: '600',
                }}
              >
                $56,475.99
              </Typography>
              <Typography color={theme.palette.success.main}>
                <b>+12.5%</b>
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Typography color={theme.palette.success.main}>
                <b>+12.5%</b>
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  pl: 1,
                }}
              >
                last 24h
              </Typography>
            </Box>
          </Box>
          <Chart
            options={chartOptions}
            series={chart1Data}
            type="area"
            height={200}
          />
        </Card>
      </Grid>
      <Grid item md={4} xs={12}>
        <Card
          sx={{
            overflow: 'visible',
          }}
        >
          <Box
            sx={{
              p: 3,
            }}
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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                pt: 3,
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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Typography color={theme.palette.success.main}>
                <b>+12.5%</b>
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  pl: 1,
                }}
              >
                last 24h
              </Typography>
            </Box>
          </Box>
          <Chart
            options={chartOptions}
            series={chart2Data}
            type="area"
            height={200}
          />
        </Card>
      </Grid>
      <Grid item md={4} xs={12}>
        <Card
          sx={{
            overflow: 'visible',
          }}
        >
          <Box
            sx={{
              p: 3,
            }}
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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                pt: 3,
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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Typography color={theme.palette.success.main}>
                <b>+12.5%</b>
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  pl: 1,
                }}
              >
                last 24h
              </Typography>
            </Box>
          </Box>
          <Chart
            options={chartOptions}
            series={chart3Data}
            type="area"
            height={200}
          />
        </Card>
      </Grid>
    </Grid>
  );
}

export default WatchListColumn;
