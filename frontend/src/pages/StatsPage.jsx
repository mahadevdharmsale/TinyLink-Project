import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLinkStats } from "../services/api";

export default function StatsPage() {
  const { code } = useParams();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    getLinkStats(code)
      .then(setInfo)
      .catch(() => setInfo(false));
  }, [code]);

  if (info === false)
    return <div className="p-6 text-center text-red-600">Link not found!</div>;

  if (!info)
    return <div className="p-6 text-center">Loading…</div>;

  return (
    <div className="max-w-lg mx-auto p-6 space-y-4">
      <h2 className="text-xl font-bold">Stats for: {code}</h2>

      <div className="bg-white shadow p-4 rounded space-y-2">
        <p><strong>Target URL:</strong> {info.targetUrl}</p>
        <p><strong>Total Clicks:</strong> {info.clickCount}</p>
        <p><strong>Last Clicked:</strong> {info.lastClicked ? new Date(info.lastClicked).toLocaleString() : "Never"}</p>
        <p><strong>Created At:</strong> {new Date(info.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
}
