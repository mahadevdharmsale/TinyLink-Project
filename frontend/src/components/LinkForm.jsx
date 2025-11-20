import React, { useState } from "react";
import toast from "react-hot-toast";

export default function LinkForm({ onCreate }) {
  const [targetUrl, setTargetUrl] = useState("");
  const [customCode, setCustomCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!targetUrl.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }

    try {
      await onCreate({ targetUrl, customCode });
      toast.success("Short link created!");
      setTargetUrl("");
      setCustomCode("");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <input
          type="text"
          placeholder="Enter long URL"
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="text"
          placeholder="Custom short code (optional)"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
        />

      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg transition transform hover:scale-105"
      >
        Create Short Link
      </button>

    </form>
  );
}
