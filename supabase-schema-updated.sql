-- MedAid Healthcare Management System - Updated Supabase Database Schema
-- This matches your existing TypeScript types
-- Execute this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- DROP EXISTING TABLES (if they exist)
-- =====================================================
DROP TABLE IF EXISTS visits CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS nurses CASCADE;
DROP TABLE IF EXISTS patients CASCADE;

-- =====================================================
-- PATIENTS TABLE (Matches TypeScript types)
-- =====================================================
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    date_of_birth TEXT NOT NULL,
    address TEXT NOT NULL,
    emergency_contact TEXT NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'discharged')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_patients_email ON patients(email);
CREATE INDEX idx_patients_status ON patients(status);

-- =====================================================
-- NURSES TABLE (Matches TypeScript types)
-- =====================================================
CREATE TABLE nurses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    specialties TEXT[] DEFAULT '{}',
    availability TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_leave')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_nurses_email ON nurses(email);
CREATE INDEX idx_nurses_status ON nurses(status);

-- =====================================================
-- SERVICES TABLE (Matches TypeScript types)
-- =====================================================
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    base_price DECIMAL(10, 2) DEFAULT 0,
    min_minutes INTEGER DEFAULT 0,
    max_minutes INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_services_is_active ON services(is_active);

-- =====================================================
-- VISITS TABLE (Matches TypeScript types)
-- =====================================================
CREATE TABLE visits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    nurse_id UUID NOT NULL REFERENCES nurses(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id) ON DELETE SET NULL,
    care_plan_id UUID,
    date TEXT NOT NULL,
    window_start TEXT,
    window_end TEXT,
    status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'in_progress')),
    reason_for_visit TEXT,
    notes TEXT,
    check_in_time TIMESTAMPTZ,
    check_out_time TIMESTAMPTZ,
    location TEXT,
    is_urgent BOOLEAN DEFAULT false,
    is_after_hours BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_visits_patient_id ON visits(patient_id);
CREATE INDEX idx_visits_nurse_id ON visits(nurse_id);
CREATE INDEX idx_visits_service_id ON visits(service_id);
CREATE INDEX idx_visits_date ON visits(date);
CREATE INDEX idx_visits_status ON visits(status);

-- =====================================================
-- AUTO-UPDATE TIMESTAMP FUNCTION
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- =====================================================
-- TRIGGERS FOR AUTO-UPDATE
-- =====================================================
CREATE TRIGGER update_patients_updated_at
    BEFORE UPDATE ON patients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_nurses_updated_at
    BEFORE UPDATE ON nurses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_visits_updated_at
    BEFORE UPDATE ON visits
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE nurses ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now (you can restrict this later)
CREATE POLICY "Allow all operations on patients" ON patients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on nurses" ON nurses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on services" ON services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on visits" ON visits FOR ALL USING (true) WITH CHECK (true);

-- =====================================================
-- SAMPLE DATA FOR TESTING
-- =====================================================
INSERT INTO patients (name, email, phone, date_of_birth, address, emergency_contact, status, notes) VALUES
('John Doe', 'john.doe@example.com', '555-0101', '1980-05-15', '123 Main St, Toronto, ON M5H 2N2', 'Jane Doe - 555-0102', 'active', 'Regular checkups needed'),
('Sarah Johnson', 'sarah.j@example.com', '555-0103', '1975-08-22', '456 Oak Ave, Toronto, ON M4C 1B5', 'Michael Johnson - 555-0104', 'active', 'Diabetic patient'),
('Robert Smith', 'robert.smith@example.com', '555-0105', '1990-12-10', '789 Pine Rd, Mississauga, ON L5B 3Y4', 'Emma Smith - 555-0106', 'active', 'Post-surgery care');

INSERT INTO nurses (name, email, phone, specialties, availability, status, notes) VALUES
('Emily Wilson', 'emily.wilson@medaid.com', '555-0201', ARRAY['Wound Care', 'Medication Management'], 'Monday-Friday 9AM-5PM', 'active', 'Senior nurse'),
('Michael Chen', 'michael.chen@medaid.com', '555-0202', ARRAY['IV Therapy', 'Post-Operative Care'], 'Tuesday-Saturday 8AM-4PM', 'active', 'Post-op specialist'),
('Jessica Brown', 'jessica.brown@medaid.com', '555-0203', ARRAY['General Care', 'Vital Signs'], 'Monday-Friday 7AM-3PM', 'active', 'Elderly care specialist');

INSERT INTO services (name, description, base_price, min_minutes, max_minutes, is_active) VALUES
('Wound Care', 'Professional wound cleaning, dressing, and monitoring', 125.00, 30, 60, true),
('Medication Administration', 'Administer prescribed medications', 85.00, 15, 30, true),
('Vital Signs Check', 'Check blood pressure, temperature, pulse', 65.00, 15, 30, true),
('Post-Operative Care', 'Monitor recovery after surgery', 150.00, 45, 90, true),
('IV Therapy', 'Intravenous medication administration', 175.00, 60, 120, true);

-- =====================================================
-- DONE! Your database is ready.
-- =====================================================
