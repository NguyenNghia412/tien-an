"use client";

import DataTable from "@/components/ui/data-table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ITransaction } from "@/constant/tien-an/models";
import MyButton from "@/components/ui/my-button";
import toast, { Toaster } from "react-hot-toast";
import { columns } from "./columns";

const Page = () => {
  const [listTienAn, setListTienAn] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const onDelete = (item: ITransaction) => {
    toast(
      (t) => (
        <div className="text-center">
          <span className="font-bold">Chắc chắn chưa?</span>
          <div className="flex flex-row mt-2 gap-2">
            <MyButton
              onClick={() => {
                handleDelete(item.id || "");
                toast.dismiss(t.id);
              }}
              className="bg-red-700 hover:bg-red-500 px-3 py-1 text-sm"
              label="Xóa luôn"
            />
            <MyButton
              onClick={() => toast.dismiss(t.id)}
              className="bg-white hover:bg-slate-100 !text-black px-3 py-1 text-sm"
              label="Hủy"
            />
          </div>
        </div>
      ),
      {
        position: "top-center",
      }
    );
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/tien-an`);
      if (!response.ok) {
        toast.error("Không tải được dữ liệu. Vui lòng thử lại sau.");
        return;
      }
      const data = await response.json();
      setListTienAn(data);
    } catch (error: any) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/tien-an/${id}`, {
        method: "DELETE", // Specify DELETE HTTP method
        headers: {
          "Content-Type": "application/json", // Ensure the server knows the type of data being sent
        },
      });

      if (!response.ok) {
        toast.error("Có sự cố. Vui lòng thử lại sau.");
        return;
      }

      await fetchData();
      toast.success("Đã xóa giao dịch");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto mt-5 px-2">
      <Toaster position="top-right" />
      <h1 className="text-xl lg:text-2xl font-bold mb-3">
        Danh sách giao dịch
        <br className="inline lg:hidden" />(
        <Link
          className="text-blue-700 font-semibold underline"
          href={"/admin/tien-an/create"}
        >
          Thêm giao dịch
        </Link>
        )
      </h1>
      <div className="py-5">
        <DataTable
          columnDefs={columns(onDelete)}
          data={listTienAn}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Page;
