-- Enable UUID extension for Supabase
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Base model table with proper UUID and timestamps
CREATE TABLE base_model (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table inheriting from base_model with enhanced role system
CREATE TABLE users (
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Will store hashed passwords
    role VARCHAR(20) CHECK (role IN ('resident', 'agency_staff', 'admin', 'super_admin')) NOT NULL DEFAULT 'resident',
    status VARCHAR(20) CHECK (status IN ('active', 'inactive', 'suspended')) NOT NULL DEFAULT 'active',
    contact_enabled BOOLEAN DEFAULT false,
    agency VARCHAR(255), -- Agency/Department name for staff and admins
    assigned_categories TEXT[], -- Array of categories assigned to agency staff
    last_login TIMESTAMP WITH TIME ZONE,
    permissions TEXT[] -- Array of permissions for role-based access
) INHERITS (base_model);

-- Residents table for additional resident-specific data
CREATE TABLE residents (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    address TEXT,
    phone VARCHAR(20)
);

-- Reports table inheriting from base_model with enhanced features
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
    priority VARCHAR(10) CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL, -- Agency staff assigned to this report
    resolution_comment TEXT, -- Comment when report is resolved
    estimated_completion DATE, -- Estimated completion date
    actual_completion DATE -- Actual completion date
) INHERITS (base_model);

-- Status updates table for tracking report status changes
CREATE TABLE status_updates (
    report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
    admin_id UUID REFERENCES users(id) ON DELETE SET NULL,
    previous_status VARCHAR(20),
    new_status VARCHAR(20) NOT NULL,
    admin_comment TEXT,
    updated_by VARCHAR(100), -- Admin name for display
    is_public BOOLEAN DEFAULT true, -- Whether this update is visible to residents
    attachment_url VARCHAR(500) -- Optional attachment for status updates
) INHERITS (base_model);

-- Notifications table for user notifications
CREATE TABLE notifications (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('new_report', 'status_update', 'assignment', 'high_priority', 'reminder')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    related_report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
    metadata JSONB -- Additional data for the notification
) INHERITS (base_model);

-- User sessions table for authentication tracking
CREATE TABLE user_sessions (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    is_active BOOLEAN DEFAULT true
) INHERITS (base_model);

-- Audit log table for tracking important system changes
CREATE TABLE audit_logs (
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT
) INHERITS (base_model);

-- Report attachments table for multiple file uploads
CREATE TABLE report_attachments (
    report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
    file_url VARCHAR(500) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100),
    file_size INTEGER,
    uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
    attachment_type VARCHAR(50) CHECK (attachment_type IN ('initial', 'progress', 'completion')) DEFAULT 'initial'
) INHERITS (base_model);

-- Categories table for managing report categories
CREATE TABLE categories (
    name VARCHAR(50) PRIMARY KEY,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(7), -- Hex color code
    is_active BOOLEAN DEFAULT true,
    assigned_agency VARCHAR(255),
    estimated_response_time INTEGER DEFAULT 72 -- Hours
) INHERITS (base_model);

-- Insert default categories
INSERT INTO categories (name, display_name, description, icon, color, assigned_agency, estimated_response_time) VALUES
('roads', 'Roads & Infrastructure', 'Road maintenance, potholes, traffic signs', '🛣️', '#6B7280', 'Public Works Department', 48),
('electricity', 'Electrical Systems', 'Power outages, streetlights, electrical hazards', '⚡', '#F59E0B', 'Electrical Department', 24),
('water', 'Water & Plumbing', 'Water leaks, pipe bursts, water quality', '💧', '#3B82F6', 'Water Department', 12),
('waste', 'Waste Management', 'Garbage collection, recycling, cleanup', '🗑️', '#10B981', 'Sanitation Department', 72),
('safety', 'Public Safety', 'Safety hazards, security concerns', '🛡️', '#EF4444', 'Safety Department', 6),
('other', 'Other Issues', 'General community issues', '📋', '#8B5CF6', 'General Administration', 96);

-- Create comprehensive indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_agency ON users(agency);
CREATE INDEX idx_users_assigned_categories ON users USING GIN(assigned_categories);
CREATE INDEX idx_users_last_login ON users(last_login);

CREATE INDEX idx_reports_resident_id ON reports(resident_id);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_category ON reports(category);
CREATE INDEX idx_reports_priority ON reports(priority);
CREATE INDEX idx_reports_assigned_to ON reports(assigned_to);
CREATE INDEX idx_reports_created_at ON reports(created_at DESC);
CREATE INDEX idx_reports_location ON reports USING GIST(ll_to_earth(latitude, longitude));

CREATE INDEX idx_status_updates_report_id ON status_updates(report_id);
CREATE INDEX idx_status_updates_admin_id ON status_updates(admin_id);
CREATE INDEX idx_status_updates_created_at ON status_updates(created_at DESC);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_related_report_id ON notifications(related_report_id);

CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX idx_user_sessions_expires_at ON user_sessions(expires_at);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_table_name ON audit_logs(table_name);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);

CREATE INDEX idx_report_attachments_report_id ON report_attachments(report_id);
CREATE INDEX idx_report_attachments_type ON report_attachments(attachment_type);

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

CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON notifications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_sessions_updated_at BEFORE UPDATE ON user_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_audit_logs_updated_at BEFORE UPDATE ON audit_logs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_report_attachments_updated_at BEFORE UPDATE ON report_attachments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create audit trigger function
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO audit_logs (user_id, action, table_name, record_id, new_values)
        VALUES (
            COALESCE(current_setting('app.user_id', true)::UUID, NULL),
            TG_OP,
            TG_TABLE_NAME,
            NEW.id,
            row_to_json(NEW)
        );
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_logs (user_id, action, table_name, record_id, old_values, new_values)
        VALUES (
            COALESCE(current_setting('app.user_id', true)::UUID, NULL),
            TG_OP,
            TG_TABLE_NAME,
            NEW.id,
            row_to_json(OLD),
            row_to_json(NEW)
        );
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit_logs (user_id, action, table_name, record_id, old_values)
        VALUES (
            COALESCE(current_setting('app.user_id', true)::UUID, NULL),
            TG_OP,
            TG_TABLE_NAME,
            OLD.id,
            row_to_json(OLD)
        );
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Add audit triggers for important tables
CREATE TRIGGER audit_users_trigger
    AFTER INSERT OR UPDATE OR DELETE ON users
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_reports_trigger
    AFTER INSERT OR UPDATE OR DELETE ON reports
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_status_updates_trigger
    AFTER INSERT OR UPDATE OR DELETE ON status_updates
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- Enable Row Level Security (RLS) for Supabase
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE residents ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Enhanced RLS policies

-- Users policies
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Super admins can view all users" ON users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'super_admin'
        )
    );

CREATE POLICY "Super admins can manage all users" ON users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'super_admin'
        )
    );

-- Residents policies
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

CREATE POLICY "Agency staff can update assigned category reports" ON reports
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role IN ('agency_staff', 'admin', 'super_admin')
            AND (
                role IN ('admin', 'super_admin') 
                OR category = ANY(assigned_categories)
            )
        )
    );

-- Status updates policies
CREATE POLICY "Anyone can view public status updates" ON status_updates
    FOR SELECT USING (is_public = true);

CREATE POLICY "Report owners can view all status updates" ON status_updates
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM reports 
            WHERE id = report_id AND resident_id = auth.uid()
        )
    );

CREATE POLICY "Agency staff can create status updates" ON status_updates
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role IN ('agency_staff', 'admin', 'super_admin')
        )
    );

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON notifications
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own notifications" ON notifications
    FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "System can create notifications" ON notifications
    FOR INSERT WITH CHECK (true);

-- User sessions policies
CREATE POLICY "Users can view own sessions" ON user_sessions
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can manage own sessions" ON user_sessions
    FOR ALL USING (auth.uid()::text = user_id::text);

-- Audit logs policies
CREATE POLICY "Admins can view audit logs" ON audit_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
        )
    );

-- Report attachments policies
CREATE POLICY "Anyone can view report attachments" ON report_attachments
    FOR SELECT USING (true);

CREATE POLICY "Report owners can manage attachments" ON report_attachments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM reports 
            WHERE id = report_id AND resident_id = auth.uid()
        )
    );

CREATE POLICY "Agency staff can manage attachments for assigned categories" ON report_attachments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users u
            JOIN reports r ON r.id = report_id
            WHERE u.id = auth.uid() 
            AND u.role IN ('agency_staff', 'admin', 'super_admin')
            AND (
                u.role IN ('admin', 'super_admin') 
                OR r.category = ANY(u.assigned_categories)
            )
        )
    );

-- Categories policies
CREATE POLICY "Anyone can view active categories" ON categories
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage categories" ON categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
        )
    );

-- Create helper functions for common operations

-- Function to get user's assigned reports
CREATE OR REPLACE FUNCTION get_assigned_reports(user_uuid UUID)
RETURNS TABLE (
    id UUID,
    title VARCHAR,
    category VARCHAR,
    status VARCHAR,
    priority VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT r.id, r.title, r.category, r.status, r.priority, r.created_at
    FROM reports r
    JOIN users u ON u.id = user_uuid
    WHERE (
        u.role = 'super_admin' OR
        u.role = 'admin' OR
        (u.role = 'agency_staff' AND r.category = ANY(u.assigned_categories))
    )
    ORDER BY r.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create notifications
CREATE OR REPLACE FUNCTION create_notification(
    target_user_id UUID,
    notification_type VARCHAR,
    notification_title VARCHAR,
    notification_message TEXT,
    report_id UUID DEFAULT NULL,
    notification_metadata JSONB DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    notification_id UUID;
BEGIN
    INSERT INTO notifications (user_id, type, title, message, related_report_id, metadata)
    VALUES (target_user_id, notification_type, notification_title, notification_message, report_id, notification_metadata)
    RETURNING id INTO notification_id;
    
    RETURN notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update report status with automatic notification
CREATE OR REPLACE FUNCTION update_report_status_with_notification(
    report_uuid UUID,
    new_status VARCHAR,
    admin_uuid UUID,
    comment TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    old_status VARCHAR;
    report_title VARCHAR;
    report_owner UUID;
    admin_name VARCHAR;
BEGIN
    -- Get current status and report info
    SELECT status, title, resident_id INTO old_status, report_title, report_owner
    FROM reports WHERE id = report_uuid;
    
    -- Get admin name
    SELECT CONCAT(first_name, ' ', last_name) INTO admin_name
    FROM users WHERE id = admin_uuid;
    
    -- Update report status
    UPDATE reports SET 
        status = new_status,
        updated_at = NOW()
    WHERE id = report_uuid;
    
    -- Create status update record
    INSERT INTO status_updates (report_id, admin_id, previous_status, new_status, admin_comment, updated_by)
    VALUES (report_uuid, admin_uuid, old_status, new_status, comment, admin_name);
    
    -- Create notification for report owner
    PERFORM create_notification(
        report_owner,
        'status_update',
        'Report Status Updated',
        'Your report "' || report_title || '" has been ' || new_status,
        report_uuid,
        jsonb_build_object('old_status', old_status, 'new_status', new_status)
    );
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create views for common queries

-- View for report summary with user info
CREATE VIEW report_summary AS
SELECT 
    r.id,
    r.title,
    r.description,
    r.category,
    r.location,
    r.status,
    r.priority,
    r.created_at,
    r.updated_at,
    CONCAT(u.first_name, ' ', u.last_name) as reporter_name,
    u.email as reporter_email,
    CONCAT(a.first_name, ' ', a.last_name) as assigned_to_name,
    c.display_name as category_display_name,
    c.color as category_color,
    c.estimated_response_time
FROM reports r
JOIN users u ON r.resident_id = u.id
LEFT JOIN users a ON r.assigned_to = a.id
LEFT JOIN categories c ON r.category = c.name;

-- View for user statistics
CREATE VIEW user_statistics AS
SELECT 
    u.id,
    u.first_name,
    u.last_name,
    u.email,
    u.role,
    u.status,
    u.agency,
    u.created_at,
    u.last_login,
    COALESCE(report_counts.total_reports, 0) as total_reports,
    COALESCE(report_counts.resolved_reports, 0) as resolved_reports,
    COALESCE(report_counts.pending_reports, 0) as pending_reports
FROM users u
LEFT JOIN (
    SELECT 
        resident_id,
        COUNT(*) as total_reports,
        COUNT(CASE WHEN status = 'resolved' THEN 1 END) as resolved_reports,
        COUNT(CASE WHEN status IN ('pending', 'under_review') THEN 1 END) as pending_reports
    FROM reports
    GROUP BY resident_id
) report_counts ON u.id = report_counts.resident_id;

-- View for agency dashboard statistics
CREATE VIEW agency_statistics AS
SELECT 
    u.agency,
    COUNT(DISTINCT u.id) as staff_count,
    ARRAY_AGG(DISTINCT category) as all_categories,
    COUNT(DISTINCT r.id) as total_reports,
    COUNT(CASE WHEN r.status = 'resolved' THEN 1 END) as resolved_reports,
    COUNT(CASE WHEN r.status = 'pending' THEN 1 END) as pending_reports,
    COUNT(CASE WHEN r.status = 'under_review' THEN 1 END) as under_review_reports,
    COUNT(CASE WHEN r.priority = 'high' THEN 1 END) as high_priority_reports
FROM users u
LEFT JOIN LATERAL unnest(u.assigned_categories) as category ON true
LEFT JOIN reports r ON r.category = category
WHERE u.role = 'agency_staff' AND u.agency IS NOT NULL
GROUP BY u.agency;