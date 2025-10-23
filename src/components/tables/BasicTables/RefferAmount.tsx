// @ts-nocheck
import { useEffect, useState } from "react";
import axios from "axios";

export default function ReferAmounts() {
  const [amount, setAmount] = useState(""); // only one amount
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const token = localStorage.getItem("fatafatLoanToken");

  // Fetch current referral amount
  const getAmount = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/refer-amount`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAmount(response.data.amount); // assuming { amount: 100 }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const updateAmount = async () => {
    if (!amount) return;
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_URL}api/admin/refer-amount`,
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Referral amount updated successfully!");
      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update amount");
    }
  };

  useEffect(() => {
    getAmount();
  }, []);

  if (loading) return <p>Loading referral amount...</p>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6">
      <h2 className="text-xl font-semibold mb-4">Referral Amount</h2>

      {error && (
        <p className="mb-3 p-2 bg-red-100 text-red-600 rounded">{error}</p>
      )}
      {success && (
        <p className="mb-3 p-2 bg-green-100 text-green-600 rounded">
          {success}
        </p>
      )}

      <div className="flex gap-3">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter referral amount"
          className="border rounded px-3 py-2 flex-1"
        />
        <button
          onClick={updateAmount}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </div>
    </div>
  );
}
