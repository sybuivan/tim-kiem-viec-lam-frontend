import { Box, Button, Grid, Link, Typography } from '@mui/material';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useEffect, useState } from 'react';
import { ReactComponent as PdfSvg } from 'src/assets/svg/pdf.svg';
import { LabelOptions } from 'src/components/hook_form/label_options';
import DialogWrapper from 'src/components/modal/dialog_wrapper';
import { baseURL } from 'src/config';
import { MODAL_IDS } from 'src/constants';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';
import {
  getProfileCVById,
  updateStatusApplied,
} from 'src/redux_store/company/company_action';
import { IPayLoadCV } from 'src/types/user';
import { updateStatusApllied } from 'src/redux_store/company/company_slices';
import theme from 'src/theme';
import { IApplyUser } from 'src/types/apply';
import { messageMail } from 'src/utils/common';
import { formatPrice } from 'src/utils/function';
import { FieldItem } from '../../saved_profile/profile_user_modal';

const RenderCVOnline = ({ item }: { item: IPayLoadCV }) => {
  const {
    fieldList: {
      cityfield,
      companyfield,
      experiencefield,
      workingformfield,
      typerankfield,
    },
  } = useAppSelector((state) => state.commonSlice);
  return (
    <Box
      sx={{
        border: '1px solid #c1c1c1',
        borderRadius: '8px',
        p: 2,
        mb: 2,
      }}
    >
      <Grid container rowSpacing={2}>
        <Grid item xs={4}>
          <Box gap={2} display="flex" alignItems="center">
            <PdfSvg />
            <Box>
              <Typography fontWeight="600">{item.file_name}</Typography>
              <Link href={`${item.file_cv}`} target="_blank">
                Xem hồ sơ
              </Link>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <FieldItem title="Vị trí mong muốn" content={item.career_goals} />
        </Grid>
        <Grid item xs={4}>
          <LabelOptions
            value={item.id_type_current}
            options={typerankfield}
            title="Cấp bậc hiện tại"
            keyOption="id_rank"
            labelOption="name_rank"
          />
        </Grid>
        <Grid item xs={4}>
          <LabelOptions
            value={item.id_type_current}
            options={typerankfield}
            title="Cấp bậc mong muốn"
            keyOption="id_rank"
            labelOption="name_rank"
          />
        </Grid>
        <Grid item xs={4}>
          <FieldItem
            title="Mức lương mong muốn"
            content={formatPrice(item.desired_salary)}
          />
        </Grid>
        <Grid item xs={4}>
          <LabelOptions
            value={item.id_experience}
            options={experiencefield}
            title="Số năm kinh nghiệm"
            keyOption="id_experience"
            labelOption="name_experience"
          />
        </Grid>
        <Grid item xs={4}>
          <LabelOptions
            value={item.id_working_form}
            options={workingformfield}
            title="Hình thức làm việc"
            keyOption="id_working_form"
            labelOption="name_working_form"
          />
        </Grid>
        <Grid item xs={4}>
          <LabelOptions
            value={item.id_company_field}
            options={companyfield}
            title="Nghề nghiệp"
            keyOption="id_companyField"
            labelOption="name_field"
          />
        </Grid>
        <Grid item xs={4}>
          <LabelOptions
            value={item.id_city}
            options={cityfield}
            title="Địa điểm làm việc"
            keyOption="id_city"
            labelOption="name_city"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const ProfileModal = ({ apply }: { apply: IApplyUser }) => {
  const {
    id_apply,
    id_user,
    name_job,
    fullName,
    status,
    introducing_letter,
    email,
    file_online,
    file_desktop,
    id_profile,
  } = apply;
  const {
    me: { phone, name_company, address },
  } = useAppSelector((state) => state.authSlice);
  const [payloadCV, setPayloadCV] = useState<IPayLoadCV>();
  const [file, setFile] = useState<any>(() => {
    if (file_online) {
      return file_online;
    } else {
      return file_desktop;
    }
  });

  const dispatch = useAppDispatch();
  const handleOnLoad = () => {
    if (status === 0)
      dispatch(
        updateStatusApplied([
          {
            id_apply,
            status: 1,
            id_user,
            name_job,
            email,
            fullName,
            messageMailer: messageMail(
              1,
              name_job,
              fullName,
              phone,
              name_company,
              address
            ),
          },
        ])
      )
        .unwrap()
        .then(() => {
          dispatch(updateStatusApllied({ id_apply, status: 1 }));
        });
  };

  const handleClose = () => [
    dispatch(
      closeModal({
        modalId: MODAL_IDS.profileModal,
      })
    ),
  ];

  const handleOnRefuse = () => {
    dispatch(
      updateStatusApplied([
        {
          id_apply,
          status: 4,
          id_user,
          name_job,
          email,
          fullName,
          messageMailer: messageMail(
            status,
            name_job,
            fullName,
            phone,
            name_company,
            address
          ),
        },
      ])
    )
      .unwrap()
      .then(() => {
        dispatch(updateStatusApllied({ id_apply, status: 4 }));
      });
  };

  useEffect(() => {
    if (id_profile) {
      dispatch(getProfileCVById(id_profile))
        .unwrap()
        .then((data) => {
          setPayloadCV(data);
        });
    }
  }, []);

  return (
    <DialogWrapper modalId={MODAL_IDS.profileModal} minWidth={800}>
      <Box p={1}>
        <Typography
          fontSize="16px"
          color={theme.palette.primary.main}
          fontWeight="600"
          my={1}
        >
          CV ứng viên: {fullName}
        </Typography>

        <Typography
          fontSize="16px"
          color={theme.palette.primary.main}
          fontWeight="600"
          my={2}
        >
          Thư chào:{' '}
          <p
            style={{
              color: theme.palette.common.black,
              fontSize: '14px',
            }}
          >
            {' '}
            {introducing_letter}{' '}
          </p>
        </Typography>

        {payloadCV && <RenderCVOnline item={payloadCV} />}

        <div
          style={{
            border: '1px solid rgba(0, 0, 0, 0.3)',
            height: '500px',
          }}
        >
          <Viewer
            fileUrl={`${baseURL}/${file}`}
            onDocumentLoad={handleOnLoad}
          />
        </div>

        <Box my={2} display="flex" justifyContent="flex-end" gap={2}>
          {status !== 4 && (
            <Button
              variant="outlined"
              sx={{
                color: theme.palette.error.main,
              }}
              onClick={handleOnRefuse}
              disabled={status === 3}
            >
              Từ chối
            </Button>
          )}
          <Button variant="outlined" sx={{}} onClick={handleClose}>
            Đóng
          </Button>
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default ProfileModal;
