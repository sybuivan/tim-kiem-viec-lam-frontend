import {
  Box,
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import EmptyData from 'src/components/empty_data';
import { ICompany } from 'src/types/company';
import CompanyRow from './company_row';

const RecentOrdersTable = ({ companyList }: { companyList: ICompany[] }) => {
  return (
    <Card>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên công ty</TableCell>
              <TableCell>Người đại diện</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Lĩnh vực</TableCell>
              <TableCell align="right">Trạng thái</TableCell>
              <TableCell align="right">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companyList.length > 0 && (
              <>
                {companyList.map((company) => (
                  <CompanyRow company={company} key={company.id_company} />
                ))}{' '}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {companyList.length === 0 && (
        <Box>
          <EmptyData title="Chưa có công ty nào đăng ký" />
        </Box>
      )}
    </Card>
  );
};

export default RecentOrdersTable;
