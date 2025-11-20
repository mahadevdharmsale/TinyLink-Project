import React, { useEffect, useState } from "react";
import { getLinks, createLink, deleteLink } from "../services/api";
import LinkForm from "../components/LinkForm";
import LinkTable from "../components/LinkTable";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLinks = async () => {
    const data = await getLinks();
    setLinks(data);
    setLoading(false);
  };

  useEffect(() => {
    //loadLinks();
  }, []);

  const totalClicks = links.reduce((sum, l) => sum + l.clickCount, 0);

  return (
    <div className="min-h-screen bg-gray-900 bg-gradient-to-br from-[#8a8c8f] to-[#101111] text-gray-800">

      {/* NAVBAR */}
      <nav className="backdrop-blur-lg bg-white/40 shadow-sm border-b border-white/30 px-10 py-5 sticky top-0 z-50">
        <h1 className="text-3xl font-extrabold tracking-tight">
          TinyLink <span className="text-blue-600">Dashboard</span>
        </h1>
      </nav>

      <div className="max-w-6xl mx-auto p-6 space-y-10">

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-white/40 cursor-pointer">
            <p className="text-gray-600">Total Links</p>
            <h2 className="text-5xl font-extrabold mt-2">{links.length}</h2>
          </div>

          <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-white/40 cursor-pointer">
            <p className="text-gray-600">Total Clicks</p>
            <h2 className="text-5xl font-extrabold mt-2">{totalClicks}</h2>
          </div>

        </div>

        {/* CREATE NEW LINK */}
        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-white/40 hover:shadow-2xl transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4">Create Short Link</h2>

          <LinkForm
            onCreate={async (data) => {
              await createLink(data);
              loadLinks();
            }}
          />
        </div>

        {/* TABLE */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 p-6 hover:shadow-2xl transition-all duration-300">
          {loading ? (
            <p className="text-center py-4 text-lg text-gray-500 animate-pulse">
              Loading…
            </p>
          ) : (
            <LinkTable
              links={links}
              onDelete={async (code) => {
                await deleteLink(code);
                loadLinks();
              }}
            />
          )}
        </div>

      </div>
    </div>
  );
}
