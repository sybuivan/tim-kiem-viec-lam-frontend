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

export interface IApplyList {
  data: IApply[];
  total: number;
}
