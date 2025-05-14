/*
  # Initial schema for LeaseLight

  1. New Tables
    - `profiles` - User profile information
    - `leases` - Lease agreements and their details
    - `payments` - Payments associated with leases
    - `journal_entries` - Accounting journal entries
    - `audit_logs` - Audit trail for all operations
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
*/

-- Create profiles table for storing user profile information
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  company TEXT,
  role TEXT DEFAULT 'user' NOT NULL,
  avatar_url TEXT
);

-- Create leases table for storing lease agreements
CREATE TABLE IF NOT EXISTS leases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  lessor TEXT NOT NULL,
  status TEXT DEFAULT 'active' NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  monthly_payment DECIMAL NOT NULL,
  classification TEXT NOT NULL,
  present_value DECIMAL,
  asset_life INTEGER,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  transfer_ownership BOOLEAN DEFAULT false NOT NULL,
  bargain_purchase_option BOOLEAN DEFAULT false NOT NULL,
  specialized_asset BOOLEAN DEFAULT false NOT NULL,
  document_url TEXT
);

-- Create payments table for tracking lease payments
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  lease_id UUID NOT NULL REFERENCES leases ON DELETE CASCADE,
  payment_date DATE NOT NULL,
  amount DECIMAL NOT NULL,
  principal DECIMAL NOT NULL,
  interest DECIMAL NOT NULL,
  status TEXT DEFAULT 'scheduled' NOT NULL,
  notes TEXT,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE
);

-- Create journal_entries table for accounting entries
CREATE TABLE IF NOT EXISTS journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  lease_id UUID NOT NULL REFERENCES leases ON DELETE CASCADE,
  entry_date DATE NOT NULL,
  description TEXT NOT NULL,
  debit_account TEXT NOT NULL,
  credit_account TEXT NOT NULL,
  amount DECIMAL NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  reference TEXT,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE
);

-- Create audit_logs table for tracking all operations
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  old_values JSONB,
  new_values JSONB,
  ip_address TEXT,
  user_agent TEXT
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leases ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Profiles: allow users to read/update their own profile
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Leases: allow users to CRUD their own leases
CREATE POLICY "Users can view own leases"
  ON leases
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create leases"
  ON leases
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own leases"
  ON leases
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own leases"
  ON leases
  FOR DELETE
  USING (auth.uid() = user_id);

-- Payments: allow users to CRUD payments for their leases
CREATE POLICY "Users can view own payments"
  ON payments
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create payments"
  ON payments
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own payments"
  ON payments
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own payments"
  ON payments
  FOR DELETE
  USING (auth.uid() = user_id);

-- Journal entries: allow users to CRUD journal entries for their leases
CREATE POLICY "Users can view own journal entries"
  ON journal_entries
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create journal entries"
  ON journal_entries
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own journal entries"
  ON journal_entries
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own journal entries"
  ON journal_entries
  FOR DELETE
  USING (auth.uid() = user_id);

-- Audit logs: allow users to view their own audit logs
CREATE POLICY "Users can view own audit logs"
  ON audit_logs
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating updated_at columns
CREATE TRIGGER set_updated_at_profiles
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_leases
BEFORE UPDATE ON leases
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Function to create audit log entries
CREATE OR REPLACE FUNCTION create_audit_log()
RETURNS TRIGGER AS $$
DECLARE
  old_values JSONB;
  new_values JSONB;
BEGIN
  IF TG_OP = 'UPDATE' THEN
    old_values = to_jsonb(OLD);
    new_values = to_jsonb(NEW);
  ELSIF TG_OP = 'DELETE' THEN
    old_values = to_jsonb(OLD);
    new_values = NULL;
  ELSIF TG_OP = 'INSERT' THEN
    old_values = NULL;
    new_values = to_jsonb(NEW);
  END IF;

  INSERT INTO audit_logs (
    user_id,
    action,
    entity_type,
    entity_id,
    old_values,
    new_values
  )
  VALUES (
    coalesce(auth.uid(), '00000000-0000-0000-0000-000000000000'),
    TG_OP,
    TG_TABLE_NAME,
    CASE
      WHEN TG_OP = 'DELETE' THEN OLD.id::text
      ELSE NEW.id::text
    END,
    old_values,
    new_values
  );

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create audit log triggers
CREATE TRIGGER audit_leases_trigger
AFTER INSERT OR UPDATE OR DELETE ON leases
FOR EACH ROW EXECUTE FUNCTION create_audit_log();

CREATE TRIGGER audit_payments_trigger
AFTER INSERT OR UPDATE OR DELETE ON payments
FOR EACH ROW EXECUTE FUNCTION create_audit_log();

CREATE TRIGGER audit_journal_entries_trigger
AFTER INSERT OR UPDATE OR DELETE ON journal_entries
FOR EACH ROW EXECUTE FUNCTION create_audit_log();

-- Create public function for user registration hook
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();