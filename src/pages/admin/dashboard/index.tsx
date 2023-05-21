import { Grid, Paper } from '@mui/material';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useEffect } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import LoadingLinear from 'src/components/loading/loading_linear';
import { useAppDispatch, useAppSelector, useIsRequestPending } from 'src/hooks';
import { statistical } from 'src/redux_store/admin/admin_actions';
import { optionsDoughnut, renderColors, renderdata } from 'src/utils/function';
import Money from './money';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const labels = ['Người dùng hệ thống', 'Nhà tuyển dụng', 'Quản trị viên'];

const Dashboard = () => {
  const {
    statistical: {
      jobs_by_industry,
      users_by_industry,
      city_by_industry,
      total_revenue,
      total_data_month,
    },
  } = useAppSelector((state) => state.adminSlice);

  const dispatch = useAppDispatch();
  const isLoading = useIsRequestPending('admin', 'statistical');

  useEffect(() => {
    dispatch(statistical());
  }, []);

  if (isLoading) return <LoadingLinear />;

  return (
    <Grid
      container
      direction="row"
      alignItems="stretch"
      rowSpacing={2}
      columnSpacing={2}
      mb={2}
    >
      <Grid item xs={12} lg={4}>
        <Paper
          sx={{
            borderRadius: 2,
          }}
        >
          <Doughnut
            options={optionsDoughnut('Thông kê việc làm theo ngành')}
            data={renderdata({
              data: jobs_by_industry.map((item) => item.job_count),
              labels: jobs_by_industry.map((item) => item.name_field),
              colors: renderColors(jobs_by_industry.length),
              title: 'Thông kê việc làm theo ngành',
              label: 'Công việc',
            })}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Paper>
          <Doughnut
            options={optionsDoughnut('Thông kê người dùng hệ thống')}
            data={renderdata({
              data: users_by_industry.map((item) => item.user_count),
              labels,
              colors: renderColors(jobs_by_industry.length),
              title: 'Thông kê người dùng hệ thống',
              label: 'Người dùng',
            })}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Paper>
          <Doughnut
            options={optionsDoughnut('Thông kê công việc tỉnh thành')}
            data={renderdata({
              data: city_by_industry.map((item) => item.city_count),
              labels: city_by_industry.map((item) => item.name_city),
              colors: renderColors(jobs_by_industry.length),
              title: 'Thông kê công việc tỉnh thành',
              label: 'Công việc',
            })}
          />
        </Paper>
      </Grid>

      <Grid item lg={12}>
        <Money
          total_revenue={total_revenue}
          total_data_month={total_data_month}
        />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
