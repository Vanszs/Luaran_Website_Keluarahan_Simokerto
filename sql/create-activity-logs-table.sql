-- Create activity_logs table for tracking all system activities
CREATE TABLE IF NOT EXISTS activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    user_role VARCHAR(20),
    user_name VARCHAR(100),
    action VARCHAR(50) NOT NULL,
    table_name VARCHAR(50),
    record_id INT,
    old_data JSON,
    new_data JSON,
    description TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_table_name (table_name),
    INDEX idx_created_at (created_at)
);

-- Insert sample data for demonstration
INSERT INTO activity_logs (user_id, user_role, user_name, action, table_name, record_id, description) VALUES
(1, 'superadmin', 'Super Admin', 'LOGIN', NULL, NULL, 'User logged into the system'),
(2, 'admin1', 'Admin Satu', 'CREATE', 'users', 5, 'Created new user account'),
(1, 'superadmin', 'Super Admin', 'UPDATE', 'laporan', 3, 'Changed report status from pending to approved'),
(3, 'admin2', 'Admin Dua', 'UPDATE', 'laporan', 7, 'Updated report status to rejected'),
(2, 'admin1', 'Admin Satu', 'DELETE', 'admin', 8, 'Deleted admin account'),
(4, 'petugas', 'Petugas Kelurahan', 'CREATE', 'users', 12, 'Added new citizen data');
