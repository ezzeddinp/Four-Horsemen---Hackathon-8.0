// Pasien.ts
export type Pasien = {
  id: string;
  email: string;
  nama_lengkap: string;
  nomor_telepon: string;
  alamat: string;
  nik: string;
  avatar_url?: string;
};

// Dokter.ts
export type Dokter = {
  id: string;
  nama_lengkap: string;
  spesialis: string;
  sertifikat: string;
  keahlian: string
  avatar_url:string
};

// RumahSakit.ts
export type RumahSakit = {
  id: string;
  nama: string;
  alamat: string;
  telepon: string;
  logo_url?: string;
};
