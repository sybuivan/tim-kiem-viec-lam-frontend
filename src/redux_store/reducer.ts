import modalSlice from './common/modal/modal_slice';
import apiSlice from './api/api_slice';
import userSlice from './user/user_slice';
import companySlice from './company/company_slices';
import jobSlice from './job/job_slices';
import applySlice from './apply/apply_slice';
import commonSlice from './common/field/field_slice';

export const reducer = {
  modalSlice,
  commonSlice,
  apiSlice,
  userSlice,
  companySlice,
  jobSlice,
  applySlice,
};
