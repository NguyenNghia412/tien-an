"use client";

import MyButton from "@/components/ui/my-button";
import {
  PAYMENT_TYPE,
  PAYMENT_TYPE_NAME,
  TRANSACTION_TYPE,
  TRANSACTION_TYPE_NAME,
} from "@/constant/tien-an/constants";
import { ITransaction } from "@/constant/tien-an/models";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

import Rodal from "rodal";

// include styles
import "rodal/lib/rodal.css";

import * as yup from "yup";

const userList = [
  { id: "1", fullname: "Tuấn" },
  { id: "2", fullname: "Chính" },
  { id: "3", fullname: "Huy" },
  { id: "4", fullname: "Thiện" },
  { id: "5", fullname: "Dương" },
  { id: "6", fullname: "Nghĩa" },
];

const schema = yup.object({
  transDate: yup.string().required("Ngày giao dịch không được bỏ trống"),
  totalAmount: yup
    .number()
    .required("Tổng tiền không được bỏ trống")
    .min(0, "Tổng tiền phải lớn hơn bằng 0"),
  transType: yup.number().default(TRANSACTION_TYPE.TIEN_AN),
  // .oneOf(Object.values(TRANSACTION_TYPE), "Loại giao dịch không hợp lệ")
  // .required("Loại giao dịch không được bỏ trống"),
  paymentType: yup.number().default(PAYMENT_TYPE.GHI_NO),
  // .mixed()
  // .oneOf(Object.values(PAYMENT_TYPE), "Loại thanh toán không hợp lệ")
  // .required("Loại thanh toán không được bỏ trống"),
  details: yup.array().of(
    yup.object({
      userId: yup.string(),
      fullname: yup.string(),
      // .required("Tên người không được bỏ trống"),
      amount: yup.number(),
      // .required("Số tiền không được bỏ trống")
      // .min(0, "Số tiền nhỏ nhất phải lớn hơn bằng 0"),
    })
  ),
});

type FormData = yup.InferType<typeof schema>;

const Create = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      transDate: new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date()),
      totalAmount: 0,
      details: userList.map((user) => ({
        amount: 0,
        fullname: user.fullname,
        userId: user.id,
      })),
    },
  });
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const chiaDeu = () => {
    console.log("chia-deu");
    setIsOpenDialog(true);
  };

  const handleCheckboxChange = (id: string) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const handleEquallyDivide = () => {
    const oldDetails = getValues("details");
    const totalAmount = getValues("totalAmount");
    const count = selectedUsers.length;

    if (count > 0) {
      const amount = Math.round(totalAmount / count);

      setValue(
        "details",
        oldDetails?.map((x) => {
          if (selectedUsers.includes(x.userId || "")) {
            return { ...x, amount };
          }
          return { ...x };
        })
      );
      setIsOpenDialog(false);
    }
  };

  const handleSave = (data: FormData) => {
    saveTienAn({
      transDate: new Date(data.transDate),
      transType: data.transType,
      paymentType: data.paymentType,
      totalAmount: data.totalAmount,
      details: (data.details || []).map((x) => ({
        amount: x.amount || 0,
        fullname: x.fullname || "",
        userId: x.userId || "",
      })),
    });
  };

  const saveTienAn = async (body: ITransaction) => {
    try {
      // Make a POST request to the API
      const response = await fetch("/api/admin/tien-an", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        toast.error("Có sự cố. Vui lòng thử lại sau.");
        return;
      }

      // Parse the response
      const data = await response.json();
      toast.success("Đã tạo giao dịch");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto mt-5 px-2">
      <Toaster position="top-right" />
      <h1 className="text-xl lg:text-2xl font-bold mb-3">Tạo giao dịch</h1>
      <form
        onSubmit={handleSubmit(handleSave)}
        className="border rounded-md px-5 py-3 "
      >
        <h3 className="text-base lg:text-xl font-bold">Thông tin chung</h3>
        <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="transDate"
              className="mb-2 font-semibold text-sm lg:text-base"
            >
              Ngày giao dịch
            </label>
            <input
              id="transDate"
              type="date"
              {...register("transDate")}
              className="border p-2 rounded-md"
            />
            <p className="text-red-600">{errors.transDate?.message}</p>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="totalAmount"
              className="mb-2 font-semibold text-sm lg:text-base"
            >
              Tổng tiền
            </label>
            <div className="flex flex-row space-x-2">
              <input
                id="totalAmount"
                type="number"
                {...register("totalAmount")}
                className="border p-2 rounded-md w-full"
              />
              <MyButton label="Chia đều" type="button" onClick={chiaDeu} />
            </div>
            <p className="text-red-600">{errors.totalAmount?.message}</p>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="transType"
              className="mb-2 font-semibold text-sm lg:text-base"
            >
              Loại giao dịch
            </label>
            <select
              id="transType"
              {...register("transType")}
              className="border p-2 rounded-md"
            >
              {Object.keys(TRANSACTION_TYPE_NAME).map((key) => (
                <option key={key} value={key}>
                  {TRANSACTION_TYPE_NAME[+key]}
                </option>
              ))}
            </select>
            <p className="text-red-600">{errors.transType?.message}</p>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="paymentType"
              className="mb-2 font-semibold text-sm lg:text-base"
            >
              Loại thanh toán
            </label>
            <select
              id="paymentType"
              {...register("paymentType")}
              className="border p-2 rounded-md"
            >
              {Object.keys(PAYMENT_TYPE_NAME).map((key) => (
                <option key={key} value={key}>
                  {PAYMENT_TYPE_NAME[+key]}
                </option>
              ))}
            </select>
            <p className="text-red-600">{errors.paymentType?.message}</p>
          </div>
        </div>
        <hr className="mt-8 mb-2" />
        <h3 className="text-base lg:text-xl font-bold">Người ăn</h3>
        <div className="mt-2 grid grid-cols-2 gap-2 mx-auto">
          {userList.map((user, index) => (
            <div key={user.fullname}>
              <div className="text-sm lg:text-base font-semibold mb-2">
                {user.fullname}
              </div>
              <input
                id="amount"
                type="number"
                {...register(`details.${index}.amount`)}
                className="border p-2 rounded-md w-full"
              />
              {errors.details?.[index]?.fullname && (
                <p className="text-red-600">
                  {errors.details[index].amount?.message}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-end space-x-2 mt-5">
          <Link
            href={"/admin/tien-an"}
            className="px-5 py-2 uppercase rounded-md font-semibold border border-blue-700 text-blue-500 bg-white"
          >
            Quay lại
          </Link>
          <MyButton label="Lưu" type="submit" />
        </div>
      </form>
      <Rodal
        visible={isOpenDialog}
        onClose={() => setIsOpenDialog(false)}
        height={300}
      >
        <h4 className="text-xl lg:text-2xl font-semibold lg:font-bold">
          Chia đều tiền ăn
        </h4>
        <div className="mt-2">
          <h6 className="text-base lg:text-lg">Chọn người</h6>
          {userList &&
            userList.map((user, index) => (
              <div key={index}>
                <label className="text-sm lg:text-base">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                  />
                  {user.fullname}
                </label>
              </div>
            ))}
        </div>
        <div className="flex flex-row justify-end space-x-2 mt-5">
          <MyButton
            label="Hủy"
            type="button"
            onClick={() => setIsOpenDialog(false)}
            className=" border border-blue-700 !text-blue-700 bg-white"
          />
          <MyButton
            label="Xác nhận"
            type="button"
            onClick={handleEquallyDivide}
          />
        </div>
      </Rodal>
    </div>
  );
};

export default Create;
