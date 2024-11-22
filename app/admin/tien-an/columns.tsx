import MyButton from "@/components/ui/my-button";
import {
  PAYMENT_TYPE_NAME,
  TRANSACTION_TYPE_NAME,
} from "@/constant/tien-an/constants";
import { ITransactionDetail } from "@/constant/tien-an/models";
import { currencyFormatter } from "@/utils/utils";
import { ColDef } from "ag-grid-community";

export const columns = (onDelete: (item: any) => void): ColDef[] => [
  {
    headerName: "Ngày giao dịch",
    field: "transDate",
    valueFormatter: (val) =>
      new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(val.value)),
  },
  {
    headerName: "Loại giao dịch",
    field: "transType",
    valueFormatter: (val) => TRANSACTION_TYPE_NAME[val.value],
  },
  {
    headerName: "Loại thanh toán",
    field: "paymentType",
    valueFormatter: (val) => PAYMENT_TYPE_NAME[val.value],
  },
  {
    headerName: "Tổng tiền",
    field: "totalAmount",
    valueFormatter: (val) => currencyFormatter(val.value),
  },
  {
    headerName: "Chi tiết",
    field: "details",
    flex: 1,
    valueFormatter: (val) => {
      const rslt = (val.value || [])
        .map(
          (item: ITransactionDetail) =>
            `${item.fullname}: ${currencyFormatter(item.amount)}`
        )
        .join(" | ");
      return rslt;
    },
  },
  {
    headerName: "Thao tác",
    cellRenderer: (props: any) => (
      <div>
        <MyButton
          label="Xóa"
          className="bg-red-700 px-3 py-1 text-sm"
          onClick={() => onDelete(props.data)}
        />
      </div>
    ),
  },
];
