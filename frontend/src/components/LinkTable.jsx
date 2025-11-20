import React from "react";
import toast from "react-hot-toast";

const BACKEND = "https://tinylink-project-qtuk.onrender.com";

export default function LinkTable({ links, onDelete }) {
  const handleCopy = (code) => {
    navigator.clipboard.writeText(`${BACKEND}/${code}`);
    toast.success("Short URL copied!");
  };

  return (
    <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl shadow-xl border border-white/10">
      <h2 className="text-xl font-semibold text-black mb-4">Your Links</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-white/10 text-black-300 uppercase text-sm tracking-wide">
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Target URL</th>
              <th className="p-3 text-left">Clicks</th>
              <th className="p-3 text-left">Last Clicked</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {links.map((row, index) => (
              <tr
                key={index}
                className="border-b border-white/10 hover:bg-white/5 transition-all"
              >
                <td className="p-3 text-blue-400 underline cursor-pointer">
                  {row.code}
                </td>

                <td className="p-3 text-black-200 break-all">
                  {row.targetUrl}
                </td>

                <td className="p-3 text-black-300">{row.clickCount}</td>

                <td className="p-3 text-black-400">
                  {row.lastClicked
                    ? new Date(row.lastClicked).toLocaleString()
                    : "Never"}
                </td>

                <td className="p-3 space-x-3">
                  <button
                    onClick={() => handleCopy(row.code)}
                    className="px-4 py-1.5 bg-emerald-500 text-white rounded-lg 
                              hover:bg-emerald-600 hover:scale-105 transition-all"
                  >
                    Copy
                  </button>

                  <button
                    onClick={() => onDelete(row.code)}
                    className="px-4 py-1.5 bg-red-500 text-white rounded-lg 
                              hover:bg-red-600 hover:scale-105 transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
