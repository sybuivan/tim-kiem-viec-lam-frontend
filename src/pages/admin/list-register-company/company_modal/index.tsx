import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import { MODAL_IDS } from 'src/constants';
import { ICompany } from 'src/types/company';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';
import { FormInput, FormSelect } from 'src/components/hook_form';

import DialogWrapper from 'src/components/modal/dialog_wrapper';
import BootstrapDialogTitle from 'src/components/modal/dialog_title';
import { LoadingButton } from '@mui/lab';
import { DeleteOutlineOutlined } from '@mui/icons-material';
import { SaveOutlined } from '@mui/icons-material';
import { CPersonnelSize } from 'src/constants/common';
import { updateActiveCompany } from 'src/redux_store/admin/admin_actions';
import { toastMessage } from 'src/utils/toast';

const CompanyModal = ({
  company,
  is_show = true,
}: {
  company: ICompany;
  is_show?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm({
    defaultValues: company,
  });
  const { cityfield, companyfield } = useAppSelector(
    (state) => state.commonSlice.fieldList
  );
  const handleClose = () => {
    dispatch(closeModal({ modalId: MODAL_IDS.companyModal }));
  };
  const handleOnSubmit = () => {
    if (company.id_company)
      dispatch(
        updateActiveCompany({
          active_status: 1,
          id_user: company.id_company,
        })
      )
        .unwrap()
        .then(() => {
          toastMessage.success('Xác nhận công ty thành công');
          handleClose();
        });
  };
  return (
    <DialogWrapper
      modalId={MODAL_IDS.companyModal}
      minWidth={400}
      maxWidth={800}
    >
      <Box p={1}>
        <BootstrapDialogTitle onClose={handleClose}>
          <Typography fontSize="16px">Thông tin công ty</Typography>
        </BootstrapDialogTitle>

        <Box>
          <Box
            sx={{
              px: 2,
            }}
          >
            <Box
              py={2}
              component="form"
              onSubmit={handleSubmit(handleOnSubmit)}
            >
              <Grid container columnSpacing={3} rowSpacing={2}>
                <Grid item xs={6}>
                  <FormInput
                    control={control}
                    label="Họ và tên nguời đại diện"
                    name="fullName"
                    placeholder="Nhập họ và tên"
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    control={control}
                    label="Tên công ty"
                    name="name_company"
                    placeholder="Nhập tên công ty"
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    control={control}
                    label="Email"
                    name="email"
                    placeholder="Nhập địa chỉ email"
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    control={control}
                    label="Số điện thoại"
                    name="phone"
                    placeholder="Nhập số điện thoại"
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormSelect
                    control={control}
                    name="city_company"
                    label="Tỉnh / Thành phố "
                    placeholder="Chọn tỉnh thành phô"
                    options={cityfield}
                    keyOption="id_city"
                    labelOption="name_city"
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    control={control}
                    label="Nhập địa chỉ"
                    name="address"
                    placeholder="Ví dụ: Số nhà 98A, phố Ngụy Như Kon Tum, phường ..."
                    disabled
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormSelect
                    control={control}
                    name="total_people"
                    options={CPersonnelSize}
                    keyOption="value"
                    label="Quy mô nhân sự"
                    labelOption="value"
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormSelect
                    control={control}
                    name="idCompanyField"
                    options={companyfield}
                    label="Lĩnh vực hoạt động"
                    keyOption="id_companyField"
                    labelOption="name_field"
                    disabled
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormInput
                    control={control}
                    label="Link website"
                    name="link_website"
                    placeholder="Nhập link website"
                    disabled
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormInput
                    control={control}
                    name="faxCode"
                    label="Mã số thuế"
                    placeholder="Nhập mã số thuế"
                    disabled
                  />
                </Grid>
              </Grid>

              <Box display="flex" justifyContent="flex-end" py={2}>
                <Box display="flex" gap={2}>
                  <Button
                    variant="outlined"
                    // startIcon={<DeleteOutlineOutlined />}
                    onClick={handleClose}
                  >
                    Đóng
                  </Button>
                  {is_show && (
                    <LoadingButton
                      startIcon={<SaveOutlined />}
                      variant="contained"
                      onClick={handleSubmit(handleOnSubmit)}
                    >
                      Xác nhận
                    </LoadingButton>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default CompanyModal;
