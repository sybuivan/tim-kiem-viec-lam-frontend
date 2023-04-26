import { messageRequired } from 'src/utils/common';
import * as yup from 'yup';

export const schemaProfileCV = yup.object().shape({
  career_goals: yup.string().required(messageRequired('Vị trí mong muốn')),
  id_company_field: yup.string().required(messageRequired('Nghề nghiệp')),
  id_type_current: yup.string().required(messageRequired('Cấp bậc hiện tại')),
  id_type_desired: yup.string().required(messageRequired('Cấp bậc mong muốn')),
  desired_salary: yup
    .number()
    .required(messageRequired('Mức lương mong muốn'))
    .min(1000000, 'Số tiền phải lớn hơn 1000000'),
  id_experience: yup.string().required(messageRequired('Số năm kinh nghiệm')),
  id_working_form: yup.string().required(messageRequired('Hình thức làm việc')),
  id_city: yup.string().required(messageRequired('Thành phố')),
});

export const typeFile = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
];
