import {
  ControlPointOutlined,
  DeleteForeverOutlined,
  ModeEditOutlined,
} from '@mui/icons-material/';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import IconButtonTooltip from 'src/components/icon_button_tooltip';
import { MODAL_IDS } from 'src/constants';
import { useAppDispatch } from 'src/hooks';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import theme from 'src/theme';
import AddFieldModal from '../add_field_modal';
import UpdateFieldModal from '../update_field_modal';

interface Field {
  id: string;
  name: string;
}

const SettingField = ({
  title_field,
  fields,
  id,
  name,
  type,
}: {
  title_field: string;
  id: string;
  name: string;
  fields: Field[];
  type: string;
}) => {
  const dispatch = useAppDispatch();
  const handleOpenModal = () => {
    dispatch(
      openModal({
        modalId: MODAL_IDS.addFiedlModal,
        dialogComponent: (
          <AddFieldModal
            title_field={title_field}
            name={name}
            id={id}
            type={type}
          />
        ),
      })
    );
  };
  const handleOpenModalUpdate = (field: any) => {
    dispatch(
      openModal({
        modalId: MODAL_IDS.updateFiedlModal,
        dialogComponent: (
          <UpdateFieldModal
            title_field={title_field}
            name={name}
            id={id}
            field={field}
            type={type}
          />
        ),
      })
    );
  };

  return (
    <>
      <Typography mb={2}>
        Trường dữ liệu <b style={{ fontWeight: 600 }}>{title_field}</b>
      </Typography>
      <Box border="1px solid #c1c1c1" borderRadius={1}>
        <Box display="flex" py={2} pl={1} borderBottom={`1px solid #c1c1c1`}>
          <Box flex="0.3">
            <Typography fontWeight={600}>Mã</Typography>
          </Box>
          <Box flex="0.4" fontWeight={600}>
            <Typography fontWeight={600}>Tên</Typography>
          </Box>
        </Box>
        {fields.map((item) => (
          <Box key={item.id} borderBottom={`1px solid #c1c1c1`} pl={1}>
            <Box display="flex" py={2} alignItems="center">
              <Box flex="0.3">{item.id}</Box>
              <Box flex="0.4">{item.name}</Box>
              <Box flex="0.3">
                <IconButton
                  color="inherit"
                  size="small"
                  onClick={() => handleOpenModalUpdate(item)}
                >
                  <ModeEditOutlined
                    fontSize="small"
                    sx={{
                      color: theme.palette.primary.main,
                    }}
                  />
                </IconButton>
                {/* <IconButton color="inherit" size="small">
                  <DeleteForeverOutlined
                    fontSize="small"
                    sx={{
                      color: theme.palette.error.main,
                    }}
                  />
                </IconButton> */}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Box display="flex" justifyContent="center">
        <IconButtonTooltip
          icon={
            <ControlPointOutlined
              sx={{
                color: theme.palette.primary.main,
              }}
            />
          }
          title={`Thêm trường ${title_field}`}
          onClick={handleOpenModal}
        />
      </Box>
    </>
  );
};

export default SettingField;
