// // @ts-nocheck
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "../../ui/table";
// import { use, useEffect, useState } from "react";
// import axios, { isCancel } from "axios";

// export default function ReferTable() {
//   const [userData, setUserData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const token = localStorage.getItem("fatafatLoanToken");

//   const getUserList = async () => {
//     try {
//       setLoading(true);

//       const response = await axios.get(
//         `${import.meta.env.VITE_APP_URL}api/admin/withdraw-req-list`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setUserData(response.data?.data);
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getUserList();
//   }, []);

//   const handleAccept = async (user, status) => {
//     try {
//       const res = await axios.patch(
//         `${import.meta.env.VITE_APP_URL}api/admin/send-payment`,
//         {
//           _id: user?._id,
//           userId: user.userId?._id,
//           amount: user.amount,
//           isAccept: status,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       getUserList();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) return <p>Loading totoearn...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
//       <div className=" overflow-x-auto">
//         {" "}
//         {/* Adjusted height and scroll */}
//         <Table>
//           <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] sticky top-0 bg-white dark:bg-white/[0.03]">
//             <TableRow>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Name
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Email
//               </TableCell>

//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 User Account Number
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 IFSC Code
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Amount Request
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Total Withdraw Amount
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Wallet Amount
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 IsAccept
//               </TableCell>

//               <TableCell
//                 isHeader
//                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
//               >
//                 Created Date
//               </TableCell>
//               <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">UTR Number</TableCell>
//               <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Proof Image</TableCell>

//             </TableRow>
//           </TableHeader>

//           {/* // ... (existing imports) */}

//           <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
//             {userData?.map((user) => (
//               <TableRow key={user._id}>
//                 <TableCell className="px-5 py-4 sm:px-6 text-start">
//                   <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
//                     {user?.userId?.name}
//                   </span>
//                 </TableCell>

//                 {/* Naya Column: Withdrawal Level */}
//                 <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
//                   Level {user.level}
//                 </TableCell>

//                 <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
//                   {user.bankAccount || 'N/A'}
//                 </TableCell>

//                 {/* Naya Column: Processing Fee jo user ne pay ki */}
//                 <TableCell className="px-4 py-3 text-gray-500 text-theme-sm text-red-500 font-bold">
//                   ₹{user.processingFee}
//                 </TableCell>

//                 <TableCell className="px-4 py-3 text-gray-500 text-theme-sm font-bold text-green-600">
//                   ₹{user.amount}
//                 </TableCell>

//                 {/* Naya Column: UTR Number */}
//                 <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
//                   <span className="bg-gray-100 px-2 py-1 rounded border font-mono text-xs">
//                     {user.utrNumber}
//                   </span>
//                 </TableCell>

//                 {/* Naya Column: Screenshot Link */}
//                 <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
//                   {user.paymentImage && (
//                     <button
//                       onClick={() => window.open(`${import.meta.env.VITE_APP_URL}uploads/${user.paymentImage}`, '_blank')}
//                       className="text-blue-500 hover:text-blue-700 font-bold text-xs"
//                     >
//                       VIEW PROOF 👁️
//                     </button>
//                   )}
//                 </TableCell>

//                 <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
//                   <select
//                     value={user.status === 'approved' ? "Accepted" : user.status === 'rejected' ? "Rejected" : "Pending"}
//                     onChange={(e) => handleAccept(user, e.target.value)}
//                     className={`px-3 py-1 rounded-full font-medium cursor-pointer border ${user.status === "approved" ? "bg-green-100 text-green-700 border-green-400" : "bg-yellow-100 text-yellow-700"
//                       }`}
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Accepted">Accepted</option>
//                     <option value="Rejected">Rejected</option>
//                   </select>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }



// @ts-nocheck
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Success/Error msg dikhane ke liye

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
        { headers: { Authorization: `Bearer ${token}` } }
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

  // UPDATED: Sahi API call aur logic
  const handleAccept = async (withdrawal, status) => {
    if (status === "Pending") return; // Kuch mat karo agar wapis pending chuna
    
    try {
      // Humein usi API ko call karna hai jo humne backend mein banayi hai
      const res = await axios.put(
        `${import.meta.env.VITE_APP_URL}api/admin/approve-withdraw/${withdrawal._id}`,
        { isAccept: status }, // Status bhej rahe hain (Accepted/Rejected)
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success(res.data.message);
      getUserList(); // Table ko refresh karein
    } catch (err) {
      toast.error(err.response?.data?.message || "Error processing withdrawal");
    }
  };

  if (loading) return <p className="p-10 text-center font-bold">Loading totoearn...</p>;

  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] sticky top-0 bg-white dark:bg-white/[0.03]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 text-start">User Info</TableCell>
              <TableCell isHeader className="px-5 py-3 text-start">Level</TableCell>
              <TableCell isHeader className="px-5 py-3 text-start">Account & IFSC</TableCell>
              <TableCell isHeader className="px-5 py-3 text-start">Fee Paid</TableCell>
              <TableCell isHeader className="px-5 py-3 text-start">Withdraw Amt</TableCell>
              <TableCell isHeader className="px-5 py-3 text-start">UTR & Proof</TableCell>
              <TableCell isHeader className="px-5 py-3 text-start">Wallet Status</TableCell>
              <TableCell isHeader className="px-5 py-3 text-start">Action</TableCell>
              <TableCell isHeader className="px-5 py-3 text-start">Date</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {userData?.map((row) => (
              <TableRow key={row._id}>
                {/* User Info */}
                <TableCell className="px-5 py-4">
                  <div className="font-medium text-gray-800 dark:text-white">{row.userId?.name}</div>
                  <div className="text-xs text-gray-500">{row.userId?.email}</div>
                </TableCell>

                {/* Level */}
                <TableCell className="px-5 py-4">Level {row.level}</TableCell>

                {/* Bank Details */}
                <TableCell className="px-5 py-4">
                  <div className="text-theme-sm font-bold">{row.bankAccount}</div>
                  <div className="text-xs text-gray-400">{row.ifscCode}</div>
                </TableCell>

                {/* Processing Fee */}
                <TableCell className="px-5 py-4 text-red-500 font-bold">₹{row.processingFee}</TableCell>

                {/* Withdrawal Amount */}
                <TableCell className="px-5 py-4 text-green-600 font-bold">₹{row.amount}</TableCell>

                {/* UTR & Proof */}
                <TableCell className="px-5 py-4">
                  <div className="text-xs font-mono bg-gray-50 mb-1 px-1 border">{row.utrNumber}</div>
                  {row.paymentImage && (
                    <button 
                      onClick={() => window.open(`${import.meta.env.VITE_APP_URL}uploads/${row.paymentImage}`, '_blank')}
                      className="text-blue-500 text-[10px] font-black underline uppercase"
                    >
                      View Image 👁️
                    </button>
                  )}
                </TableCell>

                {/* Wallet Details */}
                <TableCell className="px-5 py-4">
                  <div className="text-xs">Bal: <span className="font-bold">₹{row.userId?.walletAmount}</span></div>
                  <div className="text-xs">Total: ₹{row.userId?.totalAmount || 0}</div>
                </TableCell>

                {/* Select Box Action */}
                <TableCell className="px-5 py-4">
                  <select
                    disabled={row.status === 'approved' || row.status === 'rejected'}
                    value={row.status === 'approved' ? "Accepted" : row.status === 'rejected' ? "Rejected" : "Pending"}
                    onChange={(e) => handleAccept(row, e.target.value)}
                    className={`px-3 py-1 rounded-full text-xs font-bold border cursor-pointer ${
                      row.status === "approved" ? "bg-green-100 text-green-700 border-green-400" : 
                      row.status === "rejected" ? "bg-red-100 text-red-700 border-red-400" :
                      "bg-yellow-100 text-yellow-700 border-yellow-400"
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accept & Pay</option>
                    <option value="Rejected">Reject</option>
                  </select>
                </TableCell>

                {/* Date */}
                <TableCell className="px-5 py-4 text-xs">
                  {new Date(row.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}