import React from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRPopup({ code, onClose }) {
  const url = `${window.location.origin}/${code}`;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[999]">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 w-[350px] text-center relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        <h2 className="text-lg font-bold mb-4 dark:text-white">QR Code</h2>

        <QRCodeCanvas value={url} size={200} />

        <button
          onClick={() => {
            const canvas = document.querySelector("canvas");
            const link = document.createElement("a");
            link.download = `${code}_QR.png`;
            link.href = canvas.toDataURL();
            link.click();
          }}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Download
        </button>
      </div>
    </div>
  );
}
