// @ts-nocheck
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { use, useEffect, useState } from "react";
import axios, { isCancel } from "axios";

export default function ReferTable() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("fatafatLoanToken");

  const getUserList = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/withdraw-req-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserData(response.data?.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  const handleAccept = async (user, status) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_URL}api/admin/send-payment`,
        {
          _id: user?._id,
          userId: user.userId?._id,
          amount: user.amount,
          isAccept: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getUserList();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading totoearn...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-h-[400px] overflow-y-auto overflow-x-auto">
        {" "}
        {/* Adjusted height and scroll */}
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] sticky top-0 bg-white dark:bg-white/[0.03]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Email
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Upi Id
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Amount Request
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Total Withdraw Amount
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Wallet Amount
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                IsAccept
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Created Date
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {userData?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {user?.userId?.name}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user?.userId?.email}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user?.upiId}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user.amount}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user.userId?.totalAmount}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user.userId?.walletAmount}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <select
                    value={user.isAccept || "Pending"}
                    onChange={(e) => handleAccept(user, e.target.value)}
                    className={`px-3 py-1 rounded-full font-medium cursor-pointer border ${
                      user.isAccept === "Accepted"
                        ? "bg-green-100 text-green-700 border-green-400"
                        : user.isAccept === "Rejected"
                        ? "bg-red-100 text-red-700 border-red-400"
                        : "bg-yellow-100 text-yellow-700 border-yellow-400"
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
