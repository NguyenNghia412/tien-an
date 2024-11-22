export enum TRANSACTION_TYPE {
  TIEN_AN = 1,
  TIEN_DIEN = 2,
  TIEN_NUOC = 3,
  TIEN_MANG = 4,
  TIEN_QUY = 5,
  TIEN_RAC = 6,
  KHAC = 7,
}

export enum PAYMENT_TYPE {
  GHI_NO = 1,
  CHI_TIEN = 2,
}

export const TRANSACTION_TYPE_NAME: { [key: number]: string } = {
  [TRANSACTION_TYPE.TIEN_AN]: 'Tiền ăn',
  [TRANSACTION_TYPE.TIEN_DIEN]: 'Tiền điện',
  [TRANSACTION_TYPE.TIEN_NUOC]: 'Tiền nước',
  [TRANSACTION_TYPE.TIEN_MANG]: 'Tiền mạng',
  [TRANSACTION_TYPE.TIEN_QUY]: 'Tiền quỹ',
  [TRANSACTION_TYPE.TIEN_RAC]: 'Tiền rác',
  [TRANSACTION_TYPE.KHAC]: 'Khác',
}

export const PAYMENT_TYPE_NAME: { [key: number]: string } = {
  [PAYMENT_TYPE.GHI_NO]: 'Ghi nợ',
  [PAYMENT_TYPE.CHI_TIEN]: 'Chi tiền'
}