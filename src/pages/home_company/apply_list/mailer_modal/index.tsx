import { LoadingButton } from '@mui/lab';
import { Box, Button, Chip, TextField, Typography } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import '@react-pdf-viewer/core/lib/styles/index.css';
import moment from 'moment';
import React, { useState } from 'react';
import DialogWrapper from 'src/components/modal/dialog_wrapper';
import SunEditorComponent from 'src/components/suneditor';
import { MODAL_IDS } from 'src/constants';
import { useAppDispatch, useAppSelector, useIsRequestPending } from 'src/hooks';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';
import { updateStatusApplied } from 'src/redux_store/company/company_action';
import {
  changePayloadMail,
  resetMail,
} from 'src/redux_store/company/company_slices';
import theme from 'src/theme';
import { renderColorStatus } from 'src/utils/function';
import { toastMessage } from 'src/utils/toast';

export const messageMail = (
  status: number | string | any,
  name_job: string,
  fullName: string,
  phone: string,
  name_company: string,
  address?: string,
  date?: any,
  hour?: any
) => {
  if (status === 1)
    return `
  <p style="text-align: start">Chào ${fullName}</p>

  <p style="text-align: start">Tôi hy vọng bạn đang có một ngày tốt lành. Tôi viết email này để thông báo rằng chúng tôi đã xem xét kỹ hồ sơ của bạn cho vị trí <b>${name_job}</b> tại <b>${name_company}</b> và rất ấn tượng với kinh nghiệm và kỹ năng mà bạn đã tích luỹ.</p>

  <p style="text-align: start">Tôi muốn mời bạn tham gia cuộc phỏng vấn với chúng tôi để có cơ hội trao đổi thêm về kỹ năng, kinh nghiệm và sự phù hợp với công việc. Cuộc phỏng vấn sẽ diễn ra vào ngày <b>${
    date ? date : `[ngày]`
  }</b> và thời gian <b>${
      hour ? hour : `[giờ]`
    }</b> tại văn phòng của chúng tôi tại <b>
  ${address} </b>
  .</p>

  <p style="text-align: start">Vui lòng xác nhận lại sự tham gia của bạn bằng cách trả lời email này trước ngày [ngày xác nhận]. Nếu bạn không thể tham gia vào thời điểm này, xin vui lòng cho chúng tôi biết để chúng tôi có thể sắp xếp lại lịch phỏng vấn phù hợp.</p>

  <p style="text-align: start">Trong cuộc phỏng vấn, chúng tôi sẽ thảo luận chi tiết về vai trò, công việc và các yêu cầu cụ thể. Đồng thời, đây cũng là cơ hội cho bạn để tìm hiểu thêm về công ty và môi trường làm việc.</p>

  <p style="text-align: start">Nếu bạn cần thêm thông tin hoặc có bất kỳ câu hỏi nào trước cuộc phỏng vấn, xin vui lòng liên hệ với tôi qua email này hoặc số điện thoại <b>${phone}</b>. Tôi sẽ sẵn lòng giúp bạn.</p>

  <p style="text-align: start">Chúng tôi rất mong được gặp bạn trong cuộc phỏng vấn và chúc bạn mọi điều tốt lành cho giai đoạn tiếp theo của quá trình tuyển dụng.</p>

  <p style="text-align: start">Trân trọng,
  </p> Liên hệ: ${phone} </p>
  <p>${name_company} </p>
  `;
  if (status === 2)
    return `
  <p style="text-align: start">Chào ${fullName}</p>

  <p style="text-align: start">Tôi hy vọng bạn đang có một ngày tuyệt vời. Tôi viết email này để gửi lời cảm ơn chân thành từ ${name_company} đối với hồ sơ ứng tuyển mà bạn đã gửi cho chúng tôi.</p>

  <p style="text-align: start">Tôi muốn cho bạn biết rằng chúng tôi đã xem qua CV của bạn và rất ấn tượng với kinh nghiệm và kỹ năng mà bạn đã tích luỹ trong lĩnh vực. Chúng tôi đánh giá cao sự quan tâm và sự đầu tư mà bạn đã đặt vào quá trình nộp đơn.</p>

  <p style="text-align: start">Hiện tại, chúng tôi đang tiến hành quá trình xem xét và phân tích hồ sơ của tất cả các ứng viên tiềm năng cho vị trí <b>${name_job}</b>. Điều này có thể mất một thời gian nhất định, vì vậy tôi xin lỗi vì bất kỳ sự chậm trễ nào trong việc trả lời của chúng tôi. Tuy nhiên, tôi cam đoan rằng bạn sẽ nhận được phản hồi từ chúng tôi trong khoảng thời gian ngắn.</p>


  <p style="text-align: start">Trong khi chờ đợi, nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, xin vui lòng liên hệ với tôi qua email này hoặc số điện thoại ${phone}. Tôi sẽ rất vui lòng trả lời mọi câu hỏi mà bạn có thể có.</p>

  <p style="text-align: start">Một lần nữa, tôi muốn cảm ơn bạn vì đã quan tâm đến cơ hội làm việc tại ${name_company}. Chúng tôi đánh giá cao những nỗ lực mà bạn đã bỏ ra và hy vọng có cơ hội để tiếp tục gặp gỡ và thảo luận chi tiết về khả năng hợp tác trong tương lai gần.</p>

  <p style="text-align: start">Chúc bạn một ngày tốt lành!</p>

  <p style="text-align: start">Trân trọng,
  </p>
  </p> Liên hệ: ${phone} </p>
  <p>${name_company} </p>
   `;
  else
    return `<p style="text-align: start">Chào ${fullName},</p>

  <p style="text-align: start">Tôi hy vọng bạn đang có một ngày tốt lành. Tôi viết email này để thông báo rằng sau khi xem xét kỹ hồ sơ và thảo luận nội bộ, chúng tôi đã quyết định không tiến tới giai đoạn tiếp theo trong quá trình tuyển dụng cho vị trí <b>${name_job}</b> tại <b>${name_company}</b>.</p>
  
  <p style="text-align: start">Chúng tôi đã đánh giá cao kinh nghiệm và nỗ lực mà bạn đã đưa ra trong hồ sơ ứng tuyển. Tuy nhiên, sau khi xem xét kỹ lưỡng và so sánh với những ứng viên khác, chúng tôi phải đưa ra quyết định khó khăn và lựa chọn những ứng viên phù hợp nhất với yêu cầu và tiêu chí của chúng tôi.</p>
  
  <p style="text-align: start">Đây không phải là một quyết định dễ dàng và chúng tôi đánh giá cao sự quan tâm của bạn đối với công ty chúng tôi. Chúng tôi khuyến khích bạn tiếp tục tìm kiếm cơ hội tương tự và chúc bạn thành công trong sự nghiệp của mình.</p>
  
  <p style="text-align: start">Một lần nữa, tôi xin chân thành cảm ơn bạn đã quan tâm và gửi hồ sơ đến chúng tôi. Chúc bạn mọi điều tốt lành trong tương lai.</p>
  
  <p style="text-align: start">Trân trọng,</p>
  
  </p> Liên hệ: ${phone} </p>
  <p>${name_company} </p>
  `;
};

const MailerModal = () => {
  const dispatch = useAppDispatch();
  const {
    timeMail,
    me: { id_company, name_company, phone, address },
  } = useAppSelector((state) => state.companySlice);
  const isLoading = useIsRequestPending('company', 'updateStatusApplied');
  const [indexSelected, setIndex] = useState<number>(0);

  const handleClose = () => [
    dispatch(
      closeModal({
        modalId: MODAL_IDS.mailerModal,
      })
    ),
    dispatch(resetMail()),
  ];

  const handleOnSubmit = () => {
    dispatch(updateStatusApplied(timeMail))
      .unwrap()
      .then(() => {
        toastMessage.success('Xác nhận và gửi mail hồ sơ thành công');
        handleClose();
      });
  };

  const handleOnChangeDate = (
    newDate: any,
    name: string,
    index: number,
    item: any
  ) => {
    const newPayload = {
      ...timeMail[index],
      [name]: newDate,
      index,
      messageMailer: messageMail(
        item.status,
        item.name_job,
        item.fullName,
        phone,
        name_company,
        address,
        moment(name === 'date' ? newDate : item.date).format('DD/MM/YYYY'),
        moment(name === 'hour' ? newDate : item.hour).format('HH:mm')
      ),
    };

    console.log(newPayload);

    dispatch(changePayloadMail(newPayload));
  };
  const handleOnChange = () => {};

  return (
    <DialogWrapper modalId={MODAL_IDS.mailerModal} minWidth={400}>
      <Box p={1}>
        <Box display="flex" gap={1} alignItems="center" mb={3}>
          <Typography fontSize="16px" fontWeight="600" my={1}>
            Xác nhận và gửi mail đến ứng viên:
          </Typography>
          <Box display="flex" gap={1}>
            {timeMail.map((item, index) => (
              <Chip
                variant="outlined"
                key={item.id_apply}
                label={item.email}
                onClick={() => setIndex(index)}
                sx={{
                  background: renderColorStatus(item.status),
                  border: `1px solid ${index === indexSelected} ? #000 : #fff`,
                  color:
                    item.status === 0
                      ? theme.palette.common.black
                      : theme.palette.common.white,
                  '&:hover': {
                    background: `${renderColorStatus(item.status)}!important`,
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {timeMail.map((item, index) => (
          <>
            {item.status === 1 && indexSelected === index && (
              <Box display="flex" gap={2} my={2}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    minDate={new Date()}
                    label="Chọn ngày phỏng vấn"
                    value={item.date}
                    onChange={(newValue) => {
                      handleOnChangeDate(newValue, 'date', index, item);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="DD/MM/YYYY" />
                    )}
                  />{' '}
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <MobileTimePicker
                    label="Chọn giờ"
                    value={item.hour}
                    onChange={(newValue) => {
                      handleOnChangeDate(newValue, 'hour', index, item);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
            )}
          </>
        ))}

        {timeMail.map((item, index) => (
          <>
            {indexSelected === index && (
              <>
                {console.log(
                  'mess',
                  messageMail(
                    item.status,
                    item.name_job,
                    item.fullName,
                    phone,
                    name_company,
                    address,
                    moment(item.date).format('DD/MM/YYYY'),
                    moment(item.hour).format('HH:mm')
                  )
                )}
                <SunEditorComponent
                  content={messageMail(
                    item.status,
                    item.name_job,
                    item.fullName,
                    phone,
                    name_company,
                    address,
                    moment(item.date).format('DD/MM/YYYY'),
                    moment(item.hour).format('HH:mm')
                  )}
                  onChange={handleOnChange}
                  height="40vh"
                  key={item.id_apply}
                />
              </>
            )}
          </>
        ))}

        <Box my={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="outlined"
            sx={{
              color: theme.palette.error.main,
            }}
            onClick={handleClose}
          >
            Đóng
          </Button>
          <LoadingButton
            loading={isLoading}
            variant="contained"
            sx={{}}
            onClick={handleOnSubmit}
          >
            Xác nhận và gửi mail
          </LoadingButton>
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default MailerModal;
