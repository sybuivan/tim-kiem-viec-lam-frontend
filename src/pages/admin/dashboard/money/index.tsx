import React from 'react';
import { Paper, Box, Typography, Grid } from '@mui/material';
import numeral from 'numeral';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { optionsDoughnut, formatPrice } from 'src/utils/function';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const dataLine = ({
  labels,
  data,
}: {
  labels: string[];
  data: number[];
}) => {
  return {
    labels,
    datasets: [
      {
        label: 'Tổng tiền',
        data,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
};

const options = {
  scales: {
    y: {
      ticks: {
        callback: function (value: number) {
          // Định dạng số tiền
          return formatPrice(value);
        },
      },
    },
  },
  tooltips: {
    callbacks: {
      label: function (tooltipItem: any) {
        // Định dạng số tiền trong tooltip
        return formatPrice(tooltipItem.yLabel);
      },
    },
  },
};

const Money = ({
  total_revenue,
  total_data_month,
}: {
  total_revenue: number;
  total_data_month: {
    month: string;
    total_revenue: number;
  }[];
}) => {
  return (
    <Grid container columnSpacing={2}>
      <Grid item lg={5}>
        <Paper
          variant="elevation"
          sx={{
            borderRadius: 2,
          }}
        >
          <Box p={4}>
            <Typography
              sx={{
                pb: 3,
              }}
              variant="h4"
              fontWeight="600"
            >
              Tổng doanh thu
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <Box>
                <CurrencyExchangeOutlinedIcon
                  sx={{
                    color: '#c3c306',
                  }}
                />
              </Box>
              <Typography variant="h5" gutterBottom>
                {formatPrice(Number(total_revenue))}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={7}>
        <Paper
          sx={{
            borderRadius: 2,
          }}
        >
          <Line
            options={{
              ...optionsDoughnut('Thống kê dịch vụ theo tháng'),
              ...options,
            }}
            data={dataLine({
              labels: total_data_month.map((item) => item.month),
              data: total_data_month.map((item) => item.total_revenue),
            })}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Money;
