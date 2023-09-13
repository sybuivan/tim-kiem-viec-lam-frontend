import { IJob } from './job';
import { IFollowList, INotification, IPayLoadCV, ISavedList } from './user';

export interface IPayloadLogin {
  email: string;
  password: string;
}
export interface IPayloadGetMe {
  email: string;
  id_role: string;
}

export interface IPayloadRegister extends IPayloadLogin {
  fullName: string;
}

export interface IInfoUser {
  saveJobList: ISavedList;
  followList: IFollowList;
  notification: {
    notificationList: INotification[];
    total_notification: number;
  };
  profile_cv: IPayLoadCV[];
  jobSuggets: {
    job_suggets_for_you: IJob[];
  };
  users: any;
  accessToken: any;
  refreshToken: any;
}
