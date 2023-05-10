import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import {
  Chip,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { MODAL_IDS } from 'src/constants';
import { useAppDispatch } from 'src/hooks';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import theme from 'src/theme';
import { ICompany } from 'src/types/company';
import CompanyModal from '../../company_modal';

const CompanyRow = ({ company }: { company: ICompany }) => {
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    dispatch(
      openModal({
        modalId: MODAL_IDS.companyModal,
        dialogComponent: <CompanyModal company={company} />,
      })
    );
  };

  return (
    <TableRow hover key={company.id_company}>
      <TableCell>
        <Typography
          variant="body1"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
          noWrap
          title={company.name_company}
          sx={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            fontSize: '15px',
            margin: 0,
            maxWidth: '150px',
          }}
        >
          {company.name_company}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap></Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
          noWrap
        >
          {company.fullName}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
          noWrap
        >
          {company.phone}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            fontSize: '15px',
            margin: 0,
            maxWidth: '100px',
          }}
        >
          {company.email}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Typography variant="body2" color="text.secondary" noWrap>
          {company.name_field}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Chip variant="outlined" label="Đang chờ" />
      </TableCell>
      <TableCell align="right">
        <Tooltip title="Xem chi tiết" arrow>
          <IconButton
            sx={{
              color: theme.palette.primary.main,
            }}
            color="inherit"
            size="small"
            onClick={handleOpenModal}
          >
            <PreviewOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default CompanyRow;
