import { messageRequired } from 'src/utils/common';
import * as yup from 'yup';
import { phoneRegExp } from './common';

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

export const schemaProfileCompany = yup.object().shape({
  fullName: yup.string().required(messageRequired('Họ và tên')),
  city: yup.string().required(messageRequired('Tỉnh thành')),
  phone: yup
    .string()
    .required(messageRequired('Số điện thoại'))
    .matches(phoneRegExp, 'Không đúng định dạng số điện thoại')
    .min(9, 'Không đúng định dạng số điện thoại')
    .max(10, 'Không đúng định dạng số điện thoại'),
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required(messageRequired('Email')),
  address: yup.string().required(messageRequired('Địa chỉ')),
  idCompanyField: yup.string().required(messageRequired('Lĩnh vực hoạt động')),
  name_company: yup.string().required(messageRequired('Tên công ty')),
  total_people: yup.string().required(messageRequired('Quy mô')),
  //   faxCode: yup.string(),
  //   link_website: yup.string(),
});

export const schemaRegister = yup.object().shape({
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Email không được bỏ trống.'),
  password: yup.string().required('Xin vui lòng nhập lại mật khẩu.').min(6),
  fullName: yup.string().required('Họ và tên không được bỏ trống'),

  phone: yup
    .string()
    .required(messageRequired('Số điện thoại'))
    .matches(phoneRegExp, 'Không đúng định dạng số điện thoại')
    .min(9, 'Không đúng định dạng số điện thoại')
    .max(10, 'Không đúng định dạng số điện thoại'),
  name_company: yup.string().required('Tên công ty không được bỏ trống'),
  total_people: yup.string().required('Quy mô nhân sự không được bỏ trống'),
  city: yup.string().required('Địa điểm không được bỏ trống'),
  address: yup.string().required('Địa chỉ công ty không được bỏ trống'),
  fieldOfActivity: yup
    .string()
    .required('Lĩnh vực hoạt động không được bỏ trống'),
  faxCode: yup.string().required('Mã thuế không được bỏ trống'),
});

export const typeFile = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
];
