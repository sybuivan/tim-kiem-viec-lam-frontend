import { Card } from '@mui/material';
import { IRegisterCompany } from 'src/types/register_company';
import { useAppSelector } from 'src/hooks';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  const {
    companyList: { company_list },
  } = useAppSelector((state) => state.adminSlice);

  return (
    <Card>
      <RecentOrdersTable companyList={company_list} />
    </Card>
  );
}

export default RecentOrders;
