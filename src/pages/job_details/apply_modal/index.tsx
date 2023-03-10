import { Typography, Box, Button, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BootstrapDialogTitle from 'src/components/modal/dialog_title';
import DialogWrapper from 'src/components/modal/dialog_wrapper';
import {
  CircleOutlined,
  FileUploadOutlined,
  CheckCircleOutlineOutlined,
  PictureAsPdfOutlined,
} from '@mui/icons-material';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import { MODAL_IDS } from 'src/constants';
import theme from 'src/theme';
import { FormInput } from 'src/components/hook_form';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';
import { LoadingButton } from '@mui/lab';

const ApplyModal = () => {
  const dispatch = useAppDispatch();
  const [filePdf, setFilePdf] = useState({
    name: '',
  });

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isActiveFile, setIsActiveFile] = useState<boolean>(false);
  const { me } = useAppSelector((state) => state.userSlice);
  const { control, reset } = useForm({});

  useEffect(() => {
    reset(me);
  }, []);

  const handleCloseModal = () => {
    dispatch(
      closeModal({
        modalId: MODAL_IDS.apply,
      })
    );
  };

  const handleOnChangeFile = (e: any) => {
    setFilePdf(e.target.files[0]);
    setIsActive(false);
    setIsActiveFile(true);
  };

  const handleClick = () => {
    setIsActive((pre) => !pre);
    setIsActiveFile(false);
  };

  const handleClickFile = () => {
    setIsActiveFile(true);
    setIsActive(false);
  };

  console.log({ filePdf });
  return (
    <DialogWrapper
      modalId={MODAL_IDS.apply}
      sx={{
        width: '600px',
        height: '100%',
        '& h2 > button': {
          top: '10px!important',
        },
        '& h2': {
          marginBottom: '16px!important',
        },
      }}
    >
      <BootstrapDialogTitle onClose={handleCloseModal}>
        <Typography
          fontWeight="600"
          fontSize="12px"
          color={theme.palette.secondary.contrastText}
        >
          ???ng tuy???n v??o v??? tr??
        </Typography>
        <Typography fontWeight="600" fontSize="16px" py={1}>
          Nh??n Vi??n Ch??m S??c Kh??ch H??ng - ??i L??m Ngay
        </Typography>
        <Typography
          fontWeight="600"
          fontSize="12px"
          color={theme.palette.secondary.contrastText}
        >
          C??ng Ty TNHH Dksh Vi???t Nam
        </Typography>
      </BootstrapDialogTitle>
      <Box p={2}>
        {filePdf.name ? (
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
              <IconButton onClick={handleClickFile}>
                {isActiveFile ? (
                  <CheckCircleOutlineOutlined
                    sx={{
                      color: '#2c95ff',
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
                <Typography>{filePdf?.name}</Typography>
                <Typography
                  color="#2c95ff"
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  Xem h??? s??
                </Typography>
              </Box>
            </Box>
            <Button
              startIcon={<FileUploadOutlined />}
              variant="outlined"
              component="label"
              sx={{
                py: 1,
              }}
            >
              Thay th??? h??? s??
              <input hidden type="file" onChange={handleOnChangeFile} />
            </Button>
          </Box>
        ) : (
          <Button
            startIcon={<FileUploadOutlined />}
            variant="outlined"
            component="label"
            sx={{
              width: '100%',
              mb: 2,
              py: 1,
            }}
          >
            T???i h??? s?? c?? s???n
            <input hidden type="file" onChange={handleOnChangeFile} />
          </Button>
        )}

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
            <IconButton onClick={handleClick}>
              {isActive ? (
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
              <Typography fontWeight="600">Fresher Front - End</Typography>
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
                  H??? s?? ????nh k??m: 01/03/2023
                </Typography>
                <Typography
                  color="#2c95ff"
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  Xem h??? s??
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <FormInput
          name="fullName"
          control={control}
          label="H??? v?? t??n"
          disabled
        />
        <FormInput name="email" control={control} label="Email" disabled />
        <FormInput
          name="phone"
          control={control}
          label="S??? ??i???n tho???i"
          disabled
        />
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="outlined"
            sx={{ marginTop: 1 }}
            onClick={handleCloseModal}
          >
            ????ng
          </Button>
          <LoadingButton
            type="submit"
            // loading={isLoading}
            variant="contained"
            sx={{ marginTop: 1, ml: 1 }}
          >
            N???p h??? s??
          </LoadingButton>
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default ApplyModal;
