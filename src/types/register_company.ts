export type TRegisterStatus = 'completed' | 'pending' | 'failed';

export interface IRegisterCompany {
  id: string;
  status: TRegisterStatus;
  name_company: string;
  companyField: string;
  phone: string;
  sourceName: string;
  email: string;
  amountCrypto: number;
  amount: number;
  cryptoCurrency: string;
  currency: string;
}
