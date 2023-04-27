import { CircleOutlined, PictureAsPdfOutlined } from '@mui/icons-material';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import { Box, IconButton, Link, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import theme from 'src/theme';
import { IPayLoadCV } from 'src/types/user';

interface IChooseFileCV {
  onClick: (id_profile: string) => void;
  document: IPayLoadCV;
  idProfile: string;
}

const ChooseFileCV = ({ document, onClick, idProfile }: IChooseFileCV) => {
  const { file_name, created_at, file_cv, id_profile } = document;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap={1}
      sx={{
        width: '100%',
        mb: 2,
        p: 1,
        border: '2px solid #2c95ff',
        borderRadius: '4px',
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={() => id_profile && onClick(id_profile)}>
          {idProfile === id_profile ? (
            <CircleRoundedIcon
              sx={{
                color: '#2c95ff',
                cursor: 'pointer',
              }}
            />
          ) : (
            <CircleOutlined
              sx={{
                color: '#2c95ff',
                cursor: 'pointer',
              }}
            />
          )}
        </IconButton>
        <Box>
          <Typography fontWeight="600">{file_name}</Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography
              display="flex"
              alignItems="center"
              fontSize="14px"
              color={theme.palette.secondary.contrastText}
            >
              <PictureAsPdfOutlined
                sx={{
                  color: theme.palette.error.main,
                  fontSize: '14px',
                }}
              />
              Hồ sơ đính kèm: {moment(created_at).format('DD/MM/YYYY')}
            </Typography>
            <Link
              href={`${file_cv}`}
              target="_blank"
              color="#2c95ff"
              sx={{
                cursor: 'pointer',
              }}
            >
              Xem hồ sơ
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChooseFileCV;
