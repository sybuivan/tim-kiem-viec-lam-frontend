import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { unFollowCompany } from 'src/redux_store/user/user_action';

const Company = ({
  company,
}: {
  company: {
    name_company: string;
    id_company: string;
    created_at: string;
    address: string;
    total_people: number;
    logo: string;
  };
}) => {
  const {
    me: { id_user },
  } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  const handleUnFollow = () => {
    dispatch(
      unFollowCompany({
        id_user,
        id_company: company.id_company,
      })
    );
  };
  return (
    <Box
      sx={{
        borderBottom: '1px solid #adbebf',
        py: 2,
        '&:last-child': {
          borderBottom: 'none',
        },
      }}
    >
      <Box display="flex" gap={5} alignItems="center">
        <Box flex="0.7" display="flex" gap={2}>
          <img
            src={company.logo}
            alt=""
            width="100px"
            height="100px"
            style={{
              borderRadius: '10px',
              border: '1px solid #c1c1c1',
            }}
          />
          <Box>
            <Typography
              fontWeight="600"
              py={0.5}
              sx={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                fontSize: '15px',
                margin: 0,
                maxWidth: '330px',
              }}
            >
              {company.name_company}
            </Typography>
            <Typography
              title={company.address}
              sx={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                fontSize: '15px',
                margin: 0,
                maxWidth: '330px',
              }}
              py={0.5}
            >
              {company.address}
            </Typography>
            <Typography>Trên {company.total_people} người</Typography>
          </Box>
        </Box>

        <Box flex="0.2">
          <Typography pl="15px">81 vị trí</Typography>
        </Box>
        <Box flex="0.2">
          <Typography pl="10px">
            {moment(company.created_at).format('DD/MM/YYYY')}
          </Typography>
        </Box>
        <Box flex="0.2">
          <Button variant="outlined" onClick={handleUnFollow}>
            Hủy theo dõi
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Company;
