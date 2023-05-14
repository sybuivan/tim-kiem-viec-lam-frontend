import modalSlice from './common/modal/modal_slice';
import apiSlice from './api/api_slice';
import userSlice from './user/user_slice';
import companySlice from './company/company_slices';
import jobSlice from './job/job_slices';
import applySlice from './apply/apply_slice';
import commonSlice from './common/field/field_slice';
import chatSlice from './chat/chat_slices';
import serviceSlice from './service/service_slice';
import adminSlice from './admin/admin_slice';
import postSlice from './post/post_slice';
import authSlice from './auth/authSlice';

export const reducer = {
  authSlice,
  modalSlice,
  commonSlice,
  apiSlice,
  userSlice,
  companySlice,
  jobSlice,
  applySlice,
  chatSlice,
  serviceSlice,
  adminSlice,
  postSlice,
};
