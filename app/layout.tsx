import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kelurahan Simokerto - Sistem Informasi',
  description: 'Sistem Informasi Kelurahan Simokerto, Kota Surabaya',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
