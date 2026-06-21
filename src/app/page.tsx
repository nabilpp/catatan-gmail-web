"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState([{ gmail: '', bind: '', kode: '', harga: '' }]);

  // Mengambil data saat aplikasi dibuka
  useEffect(() => {
    const saved = localStorage.getItem('catatanGhozi');
    if (saved) setData(JSON.parse(saved));
  }, []);

  // Menyimpan data setiap kali ada perubahan
  const updateData = (index: number, field: string, value: string) => {
    const newData = [...data];
    newData[index][field as keyof typeof newData[0]] = value;
    setData(newData);
    localStorage.setItem('catatanGhozi', JSON.stringify(newData));
  };

  return (
    <main className="min-h-screen bg-[#0d1421] p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-cyan-400 mb-8">Ghozi Smart Table</h1>
        <div className="bg-[#1a2333] p-6 rounded-lg border border-gray-700">
          {data.map((row, index) => (
            <div key={index} className="flex gap-4 items-center mb-2">
              <input className="flex-1 bg-transparent border border-gray-600 rounded p-1" value={row.gmail} onChange={(e) => updateData(index, 'gmail', e.target.value)} placeholder="Gmail..." />
              <input className="w-56 bg-transparent border border-gray-600 rounded p-1" value={row.bind} onChange={(e) => updateData(index, 'bind', e.target.value)} placeholder="Status bind..." />
              <input className="w-32 bg-transparent border border-gray-600 rounded p-1" value={row.kode} onChange={(e) => updateData(index, 'kode', e.target.value)} placeholder="Key..." />
              <input className="w-24 bg-transparent border border-gray-600 rounded p-1" value={row.harga} onChange={(e) => updateData(index, 'harga', e.target.value)} placeholder="Harga..." />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}