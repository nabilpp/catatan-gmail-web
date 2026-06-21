"use client";

import { useState, KeyboardEvent } from "react";

// 1. Struktur data baru: 'catatan' diganti menjadi 'gmail'
interface ItemCatatanKompleks {
  id: number;
  gmail: string;
  bind: string;
  kodeBind: string;
  harga: string;
}

export default function WebCatatanTabelKompleks() {
  // State menampung baris tabel dengan kolom Gmail
  const [daftarCatatan, setDaftarCatatan] = useState<ItemCatatanKompleks[]>([
    { id: 1, gmail: "", bind: "", kodeBind: "", harga: "" }
  ]);

  // Fungsi mendeteksi tombol Enter untuk membuat baris baru otomatis
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault();

      // Validasi: Kolom Gmail tidak boleh kosong saat menekan Enter
      if (daftarCatatan[index].gmail.trim() === "") {
        alert("Kolom Gmail tidak boleh kosong untuk membuat baris baru!");
        return;
      }

      // Jika enter ditekan di baris paling bawah, gelar baris baru
      if (index === daftarCatatan.length - 1) {
        const barisBaru: ItemCatatanKompleks = {
          id: daftarCatatan.length + 1,
          gmail: "",
          bind: "",
          kodeBind: "",
          harga: "",
        };

        setDaftarCatatan([...daftarCatatan, barisBaru]);

        // Otomatis pindahkan kursor fokus ke kolom 'gmail' di baris baru
        setTimeout(() => {
          const inputSelanjutnya = document.getElementById(`gmail-${daftarCatatan.length + 1}`);
          if (inputSelanjutnya) inputSelanjutnya.focus();
        }, 50);
      }
    }
  };

  // Fungsi dinamis untuk memperbarui data saat mengetik
  const handleUbahTeks = (nilaiBaru: string, index: number, kolomNama: keyof ItemCatatanKompleks) => {
    const dataDiperbarui = [...daftarCatatan];
    dataDiperbarui[index][kolomNama] = nilaiBaru as never; 
    setDaftarCatatan(dataDiperbarui);
  };

  // Fungsi hapus baris tabel
  const hapusBarisCatatan = (idCatatan: number) => {
    if (daftarCatatan.length === 1) {
      setDaftarCatatan([{ id: 1, gmail: "", bind: "", kodeBind: "", harga: "" }]);
      return;
    }

    const sisaData = daftarCatatan.filter((item) => item.id !== idCatatan);
    
    // Reset nomor urut ID agar tetap rapi dari angka 1
    const dataUrutUlang = sisaData.map((item, indeksBaru) => ({
      ...item,
      id: indeksBaru + 1,
    }));

    setDaftarCatatan(dataUrutUlang);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 font-sans flex flex-col items-center">
      
      <header className="w-full max-w-5xl text-center my-6">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Ghozi Smart Multi-Column Table
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Tekan <span className="px-1.5 py-0.5 bg-slate-800 text-cyan-400 rounded border border-slate-700 font-mono">Enter</span> di kolom mana saja untuk menggelar baris tabel baru.
        </p>
      </header>

      <main className="w-full max-w-5xl bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wider">
                <th className="w-12 py-3 text-center font-bold">No</th>
                <th className="py-3 text-left pl-3 font-semibold">Gmail</th>
                <th className="w-40 py-3 text-left pl-3 font-semibold">Bind</th>
                <th className="w-40 py-3 text-left pl-3 font-semibold">Kode Bind</th>
                <th className="w-44 py-3 text-left pl-3 font-semibold">Harga</th>
                <th className="w-20 py-3 text-center font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/40">
              {daftarCatatan.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-700/20 transition duration-150">
                  
                  {/* 1. KOLOM NOMOR */}
                  <td className="py-3 text-center font-mono text-cyan-400 font-bold text-sm">
                    {item.id}
                  </td>

                  {/* 2. KOLOM GMAIL (SUDAH DIUBAH) */}
                  <td className="py-2 px-1">
                    <input
                      id={`gmail-${item.id}`}
                      type="email"
                      value={item.gmail}
                      placeholder="contoh@gmail.com..."
                      onChange={(e) => handleUbahTeks(e.target.value, index, "gmail")}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-full bg-slate-900/40 border border-slate-700/60 outline-none py-1.5 px-2.5 text-sm text-slate-200 placeholder-slate-600 focus:border-cyan-500 rounded-lg transition"
                    />
                  </td>

                  {/* 3. KOLOM BIND */}
                  <td className="py-2 px-1">
                    <input
                      id={`bind-${item.id}`}
                      type="text"
                      value={item.bind}
                      placeholder="Status bind..."
                      onChange={(e) => handleUbahTeks(e.target.value, index, "bind")}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-full bg-slate-900/40 border border-slate-700/60 outline-none py-1.5 px-2.5 text-sm text-slate-200 placeholder-slate-600 focus:border-cyan-500 rounded-lg transition"
                    />
                  </td>

                  {/* 4. KOLOM KODE BIND */}
                  <td className="py-2 px-1">
                    <input
                      id={`kodebind-${item.id}`}
                      type="text"
                      value={item.kodeBind}
                      placeholder="Key / Code..."
                      onChange={(e) => handleUbahTeks(e.target.value, index, "kodeBind")}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-full bg-slate-900/40 border border-slate-700/60 outline-none py-1.5 px-2.5 text-sm text-slate-200 font-mono placeholder-slate-600 focus:border-cyan-500 rounded-lg transition"
                    />
                  </td>

                  {/* 5. KOLOM HARGA */}
                  <td className="py-2 px-1">
                    <input
                      id={`harga-${item.id}`}
                      type="text"
                      value={item.harga}
                      placeholder="Rp / $..."
                      onChange={(e) => handleUbahTeks(e.target.value, index, "harga")}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-full bg-slate-900/40 border border-slate-700/60 outline-none py-1.5 px-2.5 text-sm text-emerald-400 font-medium placeholder-slate-600 focus:border-cyan-500 rounded-lg transition"
                    />
                  </td>

                  {/* KOLOM AKSI HAPUS */}
                  <td className="py-2 text-center">
                    <button
                      onClick={() => hapusBarisCatatan(item.id)}
                      className="text-xs font-semibold px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white rounded-md transition duration-200"
                    >
                      Hapus
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center text-xs text-slate-400 font-mono">
          <span>Total Baris Data: {daftarCatatan.length}</span>
          <span className="text-cyan-400">Status: Grid Siap</span>
        </footer>
      </main>

    </div>
  );
}