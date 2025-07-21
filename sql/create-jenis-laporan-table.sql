-- Tabel untuk master jenis laporan
CREATE TABLE IF NOT EXISTS jenis_laporan_master (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default jenis laporan
INSERT IGNORE INTO jenis_laporan_master (nama) VALUES 
('Pencurian'),
('Keamanan'),
('Kebersihan'),
('Infrastruktur'),
('Kebisingan'),
('Narkoba'),
('Kekerasan'),
('Lingkungan');
