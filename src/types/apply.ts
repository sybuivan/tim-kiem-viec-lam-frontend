export interface IApply {
  id_user: string;
  id_apply: string;
  id_job: string;
  introducing_letter: string;
  created_at: Date | string;
  id_company?: string;
  name_company?: string;
  name_job?: string;
  cv_file?: string;
  deadline?: Date | string;
  status: number;
}

export interface IApplyUser {
  fullName: string;
  email: string;
  id_user: string;
  birthDay: Date;
  position_nominee?: string;
  id_apply: string;
  name_job: string;
  id_job: string;
  name_rank?: string;
  checked?: boolean;
  status?: any;
  avatar?: string;
  introducing_letter?: string;
  created_at: Date | string;
  date?: any;
  hour?: any;
  file_online?: string;
  file_desktop?: string;
  id_profile?: string;
}

export interface IApplyList {
  data: IApply[];
  total: number;
}
