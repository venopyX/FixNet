-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS earthdistance CASCADE;
CREATE EXTENSION IF NOT EXISTS cube;

-- Users table with role-based access
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL DEFAULT 'managed_by_supabase_auth',
    role VARCHAR(20) NOT NULL DEFAULT 'resident' CHECK (role IN ('resident', 'agency_staff', 'admin', 'super_admin')),
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    contact_enabled BOOLEAN DEFAULT true,
    agency VARCHAR(255),
    assigned_categories TEXT[],
    last_login TIMESTAMP WITH TIME ZONE,
    permissions TEXT[] DEFAULT ARRAY['create_report', 'view_own_reports'],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Residents additional info
CREATE TABLE residents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    address TEXT,
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories for report classification
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(7) DEFAULT '#6B7280',
    is_active BOOLEAN DEFAULT true,
    assigned_agency VARCHAR(255),
    estimated_response_time INTEGER DEFAULT 72,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reports table with spatial support
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resident_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('roads', 'electricity', 'water', 'waste', 'safety', 'other')),
    location VARCHAR(500) NOT NULL,
    photo_url VARCHAR(500),
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'resolved', 'rejected')),
    longitude DECIMAL(10, 8),
    latitude DECIMAL(11, 8),
    geom GEOMETRY(POINT, 4326),
    priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    resolution_comment TEXT,
    estimated_completion DATE,
    actual_completion DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Status updates for report tracking
CREATE TABLE status_updates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
    admin_id UUID REFERENCES users(id) ON DELETE SET NULL,
    previous_status VARCHAR(20),
    new_status VARCHAR(20) NOT NULL,
    admin_comment TEXT,
    updated_by VARCHAR(100),
    is_public BOOLEAN DEFAULT true,
    attachment_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications system
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('new_report', 'status_update', 'assignment', 'high_priority', 'reminder')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    related_report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Report attachments
CREATE TABLE report_attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
    file_url VARCHAR(500) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100),
    file_size INTEGER,
    uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
    attachment_type VARCHAR(50) DEFAULT 'initial' CHECK (attachment_type IN ('initial', 'progress', 'completion')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User sessions tracking
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit logs for system tracking
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_reports_resident_id ON reports(resident_id);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_category ON reports(category);
CREATE INDEX idx_reports_created_at ON reports(created_at DESC);
CREATE INDEX idx_reports_lat_lng ON reports(latitude, longitude);
CREATE INDEX idx_status_updates_report_id ON status_updates(report_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

-- Update geometry from coordinates
CREATE OR REPLACE FUNCTION update_report_geometry()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.latitude IS NOT NULL AND NEW.longitude IS NOT NULL THEN
        NEW.geom = ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
CREATE TRIGGER update_report_geom_trigger
    BEFORE INSERT OR UPDATE ON reports
    FOR EACH ROW EXECUTE FUNCTION update_report_geometry();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON reports
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_status_updates_updated_at BEFORE UPDATE ON status_updates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON notifications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Default categories
INSERT INTO categories (name, display_name, description, icon, color, assigned_agency, estimated_response_time) VALUES
('roads', 'Roads & Infrastructure', 'Road maintenance, potholes, traffic signs', '🛣️', '#6B7280', 'Public Works Department', 48),
('electricity', 'Electrical Systems', 'Power outages, streetlights, electrical hazards', '⚡', '#F59E0B', 'Electrical Department', 24),
('water', 'Water & Plumbing', 'Water leaks, pipe bursts, water quality', '💧', '#3B82F6', 'Water Department', 12),
('waste', 'Waste Management', 'Garbage collection, recycling, cleanup', '🗑️', '#10B981', 'Sanitation Department', 72),
('safety', 'Public Safety', 'Safety hazards, security concerns', '🛡️', '#EF4444', 'Safety Department', 6),
('other', 'Other Issues', 'General community issues', '📋', '#8B5CF6', 'General Administration', 96);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE residents ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Working RLS policies for users
CREATE POLICY "users_insert_during_signup" ON users
    FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "users_read_own_data" ON users
    FOR SELECT 
    USING (id = auth.uid() OR auth.uid() IS NULL);

CREATE POLICY "users_update_own_data" ON users
    FOR UPDATE 
    USING (id = auth.uid());

CREATE POLICY "users_delete_own_data" ON users
    FOR DELETE 
    USING (id = auth.uid());

-- Reports policies
CREATE POLICY "reports_public_read" ON reports
    FOR SELECT USING (true);

CREATE POLICY "reports_owner_insert" ON reports
    FOR INSERT WITH CHECK (resident_id = auth.uid());

CREATE POLICY "reports_owner_update" ON reports
    FOR UPDATE USING (resident_id = auth.uid());

-- Status updates policies
CREATE POLICY "status_updates_public_read" ON status_updates
    FOR SELECT USING (is_public = true OR EXISTS (
        SELECT 1 FROM reports WHERE id = report_id AND resident_id = auth.uid()
    ));

CREATE POLICY "status_updates_staff_insert" ON status_updates
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Notifications policies
CREATE POLICY "notifications_owner_access" ON notifications
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "notifications_system_insert" ON notifications
    FOR INSERT WITH CHECK (true);

-- Categories policies
CREATE POLICY "categories_public_read" ON categories
    FOR SELECT USING (is_active = true);

CREATE POLICY "categories_auth_write" ON categories
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "categories_auth_update" ON categories
    FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Report attachments policies
CREATE POLICY "attachments_public_read" ON report_attachments
    FOR SELECT USING (true);

CREATE POLICY "attachments_owner_write" ON report_attachments
    FOR INSERT WITH CHECK (EXISTS (
        SELECT 1 FROM reports WHERE id = report_id AND resident_id = auth.uid()
    ));

-- Residents policies
CREATE POLICY "residents_owner_access" ON residents
    FOR ALL USING (user_id = auth.uid());

-- User sessions policies
CREATE POLICY "sessions_owner_access" ON user_sessions
    FOR ALL USING (user_id = auth.uid());

-- Audit logs policies
CREATE POLICY "audit_logs_no_access" ON audit_logs
    FOR ALL USING (false);

-- Helper functions
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

CREATE OR REPLACE FUNCTION find_nearby_reports(
    target_lat DECIMAL,
    target_lng DECIMAL,
    radius_km DECIMAL DEFAULT 5.0,
    limit_count INTEGER DEFAULT 10
)
RETURNS TABLE (
    id UUID,
    title VARCHAR,
    category VARCHAR,
    status VARCHAR,
    distance_km DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        r.id,
        r.title,
        r.category,
        r.status,
        ROUND((
            111.045 * SQRT(
                POW(r.latitude - target_lat, 2) + 
                POW((r.longitude - target_lng) * COS(RADIANS(target_lat)), 2)
            )
        )::DECIMAL, 2) as distance_km
    FROM reports r
    WHERE r.latitude IS NOT NULL 
    AND r.longitude IS NOT NULL
    AND ABS(r.latitude - target_lat) <= (radius_km / 111.045)
    AND ABS(r.longitude - target_lng) <= (radius_km / (111.045 * COS(RADIANS(target_lat))))
    ORDER BY (
        POW(r.latitude - target_lat, 2) + 
        POW((r.longitude - target_lng) * COS(RADIANS(target_lat)), 2)
    )
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;