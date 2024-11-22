import { PAYMENT_TYPE, TRANSACTION_TYPE } from "./constants";

export interface ITransactionDetail {
  userId: string;
  fullname: string;
  amount: number;
}

export interface ITransaction {
  id?: string;
  transDate: Date;
  totalAmount: number;
  transType: TRANSACTION_TYPE;
  paymentType: PAYMENT_TYPE;
  details: ITransactionDetail[];
}
