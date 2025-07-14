-- Enable UUID extension for Supabase
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Base model table with proper UUID and timestamps
CREATE TABLE base_model (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table inheriting from base_model
CREATE TABLE users (
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Will store hashed passwords
    role VARCHAR(20) CHECK (role IN ('resident', 'admin')) NOT NULL DEFAULT 'resident'
) INHERITS (base_model);

-- Residents table for additional resident-specific data
CREATE TABLE residents (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    address TEXT,
    phone VARCHAR(20)
);

-- Reports table inheriting from base_model
CREATE TABLE reports (
    resident_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('roads', 'electricity', 'water', 'waste', 'safety', 'other')),
    location VARCHAR(500) NOT NULL,
    photo_url VARCHAR(500),
    status VARCHAR(20) CHECK (status IN ('pending', 'under_review', 'resolved', 'rejected')) NOT NULL DEFAULT 'pending',
    longitude DECIMAL(10, 8), -- Proper decimal for coordinates
    latitude DECIMAL(11, 8),  -- Proper decimal for coordinates
    priority VARCHAR(10) CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium'
) INHERITS (base_model);

-- Status updates table for tracking report status changes
CREATE TABLE status_updates (
    report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
    admin_id UUID REFERENCES users(id) ON DELETE SET NULL,
    previous_status VARCHAR(20),
    new_status VARCHAR(20) NOT NULL,
    admin_comment TEXT,
    updated_by VARCHAR(100) -- Admin name for display
) INHERITS (base_model);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_reports_resident_id ON reports(resident_id);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_category ON reports(category);
CREATE INDEX idx_reports_created_at ON reports(created_at);
CREATE INDEX idx_status_updates_report_id ON status_updates(report_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON reports
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_status_updates_updated_at BEFORE UPDATE ON status_updates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) for Supabase
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE residents ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_updates ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies
-- Users can read their own data
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid()::text = id::text);

-- Residents can read their own data
CREATE POLICY "Residents can view own data" ON residents
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Residents can update own data" ON residents
    FOR UPDATE USING (auth.uid()::text = user_id::text);

-- Reports policies
CREATE POLICY "Anyone can view reports" ON reports
    FOR SELECT USING (true);

CREATE POLICY "Residents can create reports" ON reports
    FOR INSERT WITH CHECK (auth.uid()::text = resident_id::text);

CREATE POLICY "Residents can update own reports" ON reports
    FOR UPDATE USING (auth.uid()::text = resident_id::text);

CREATE POLICY "Admins can update any report" ON reports
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Status updates policies
CREATE POLICY "Anyone can view status updates" ON status_updates
    FOR SELECT USING (true);

CREATE POLICY "Admins can create status updates" ON status_updates
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );