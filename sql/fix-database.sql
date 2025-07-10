-- Script to add missing columns to the database

-- Check if status column exists in reports table, if not add it
SET @columnExists = 0;
SELECT COUNT(*) INTO @columnExists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'lapor_maling' AND TABLE_NAME = 'reports' AND COLUMN_NAME = 'status';

SET @sqlStatement = IF(@columnExists = 0,
  'ALTER TABLE reports ADD COLUMN status ENUM("pending", "processing", "completed") DEFAULT "pending"',
  'SELECT "Status column already exists"'
);

PREPARE stmt FROM @sqlStatement;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Check if description column exists in reports table, if not add it
SET @columnExists = 0;
SELECT COUNT(*) INTO @columnExists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'lapor_maling' AND TABLE_NAME = 'reports' AND COLUMN_NAME = 'description';

SET @sqlStatement = IF(@columnExists = 0,
  'ALTER TABLE reports ADD COLUMN description TEXT AFTER address',
  'SELECT "Description column already exists"'
);

PREPARE stmt FROM @sqlStatement;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Update existing reports with description if it's empty
UPDATE reports SET description = CONCAT('Laporan dari ', address) 
WHERE description IS NULL OR description = '';

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_user_id ON reports(user_id);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_admin_username ON admin(username);
CREATE INDEX IF NOT EXISTS idx_admin_role ON admin(role);
