import { AssignmentOutlined, PreviewOutlined } from '@mui/icons-material';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import { Box, Checkbox, Chip, Grid, Typography } from '@mui/material';
import moment from 'moment';

import React from 'react';
import { useForm } from 'react-hook-form';
import { FormSelect } from 'src/components/hook_form';
import IconButtonTooltip from 'src/components/icon_button_tooltip';
import { MODAL_IDS } from 'src/constants';
import { COptionStatusApply } from 'src/constants/common';
import { useAppDispatch } from 'src/hooks';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import theme from 'src/theme';
import { IApplyUser } from 'src/types/apply';
import { renderLabelStatus, renderColorStatus } from 'src/utils/function';
import MessageModal from '../message_modal';
import ProfileModal from '../profile_modal';

const ApplyItem = ({
  apply,
  onCheck,
  onSelect,
  index,
  control,
}: {
  index: number;
  control: any;
  apply: IApplyUser;
  onCheck: (id_apply: string, checked: boolean) => void;
  onSelect: (id_apply: string, value: number) => void;
}) => {
  const {
    fullName,
    birthDay,
    name_rank,
    file_cv,
    id_apply,
    name_job,
    created_at,
  } = apply;

  const dispatch = useAppDispatch();

  const { handleSubmit } = useForm<any>({
    defaultValues: apply,
  });

  const handleOnChange = (e: any, checked: boolean) => {
    onCheck(id_apply, checked);
  };

  const handleOnChangeSelected = (name: string, value: number) => {
    onSelect(id_apply, value);
  };

  const handleOpenModal = () => {
    dispatch(
      openModal({
        dialogComponent: <MessageModal apply={apply} />,
        modalId: MODAL_IDS.messageApplied,
      })
    );
  };

  const handleOpenProfile = () => {
    dispatch(
      openModal({
        dialogComponent: <ProfileModal apply={apply} />,
        modalId: MODAL_IDS.profileModal,
      })
    );
  };

  return (
    <Box
      py={2}
      sx={{
        borderBottom: '1px solid #c1c1c1',
      }}
    >
      <Grid container alignItems="center">
        <Grid item xs={0.5}>
          <Checkbox checked={apply.checked} onChange={handleOnChange} />
        </Grid>
        <Grid item xs={3}>
          <Box>
            <Box display="flex" gap={1}>
              <Typography fontWeight="600">{fullName}</Typography>
              <Typography fontWeight="500" color={theme.palette.grey[500]}>
                {moment(birthDay).format('DD/MM/YYYY')}
              </Typography>
            </Box>
            <Box display="flex" gap={0.5}>
              <AssignmentOutlined
                sx={{
                  color: theme.palette.primary.light,
                  fontSize: '20px',
                }}
              />
              <Typography fontWeight="600">{name_rank}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Typography fontWeight="500">{name_job}</Typography>
        </Grid>

        <Grid item xs={1}>
          <Typography textAlign="center">
            {moment(created_at).format('MM/DD/YYYY')}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography textAlign="center">
            {file_cv ? 'Nộp file' : 'Nộp trực tuyến'}
          </Typography>
        </Grid>
        <Grid item xs={1.5}>
          {apply.checked ? (
            <FormSelect
              name={`applied.${index}.status`}
              placeholder="Chọn"
              control={control}
              options={COptionStatusApply}
              keyOption="status"
              labelOption="label"
              handleChange={handleOnChangeSelected}
            />
          ) : (
            <Box textAlign="center">
              <Chip
                variant="outlined"
                label={renderLabelStatus(apply.status)}
                sx={{
                  background: renderColorStatus(apply.status),
                  color: theme.palette.common.white,
                }}
              />
            </Box>
          )}
        </Grid>
        <Grid item xs={2}>
          <Box display="flex" gap={1} justifyContent="center">
            <IconButtonTooltip
              onClick={handleOpenModal}
              title="Nhắn tin"
              icon={
                <SmsOutlinedIcon
                  sx={{
                    color: theme.palette.success.main,
                  }}
                />
              }
            />
            <IconButtonTooltip
              onClick={handleOpenProfile}
              title="Xem hồ sơ"
              icon={
                <PreviewOutlined
                  fontSize="small"
                  sx={{
                    color: theme.palette.success.main,
                  }}
                />
              }
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ApplyItem;
