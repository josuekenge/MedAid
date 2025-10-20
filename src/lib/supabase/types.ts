export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          supabase_id: string;
          name: string;
          email: string;
          role: 'admin' | 'nurse_manager' | 'nurse' | 'billing_manager' | 'viewer';
          avatar_url: string | null;
          phone: string | null;
          organization: string | null;
          is_active: boolean;
          last_login_at: string | null;
          preferences: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          supabase_id: string;
          name: string;
          email: string;
          role?: 'admin' | 'nurse_manager' | 'nurse' | 'billing_manager' | 'viewer';
          avatar_url?: string | null;
          phone?: string | null;
          organization?: string | null;
          is_active?: boolean;
          last_login_at?: string | null;
          preferences?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          supabase_id?: string;
          name?: string;
          email?: string;
          role?: 'admin' | 'nurse_manager' | 'nurse' | 'billing_manager' | 'viewer';
          avatar_url?: string | null;
          phone?: string | null;
          organization?: string | null;
          is_active?: boolean;
          last_login_at?: string | null;
          preferences?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      patients: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          email: string | null;
          phone: string | null;
          date_of_birth: string | null;
          address: Json | null;
          emergency_contact: Json | null;
          status: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          name: string;
          email?: string | null;
          phone?: string | null;
          date_of_birth?: string | null;
          address?: Json | null;
          emergency_contact?: Json | null;
          status?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          name?: string;
          email?: string | null;
          phone?: string | null;
          date_of_birth?: string | null;
          address?: Json | null;
          emergency_contact?: Json | null;
          status?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      nurses: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          email: string;
          phone: string | null;
          specialties: string[] | null;
          availability: Json | null;
          status: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          email: string;
          phone?: string | null;
          specialties?: string[] | null;
          availability?: Json | null;
          status?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          specialties?: string[] | null;
          availability?: Json | null;
          status?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      visits: {
        Row: {
          id: string;
          patient_id: string;
          nurse_id: string | null;
          service_id: string | null;
          care_plan_id: string | null;
          date: string;
          window_start: string;
          window_end: string;
          status: string;
          reason_for_visit: string | null;
          notes: string | null;
          check_in_time: string | null;
          check_out_time: string | null;
          location: Json | null;
          is_urgent: boolean;
          is_after_hours: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          patient_id: string;
          nurse_id?: string | null;
          service_id?: string | null;
          care_plan_id?: string | null;
          date: string;
          window_start: string;
          window_end: string;
          status?: string;
          reason_for_visit?: string | null;
          notes?: string | null;
          check_in_time?: string | null;
          check_out_time?: string | null;
          location?: Json | null;
          is_urgent?: boolean;
          is_after_hours?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          patient_id?: string;
          nurse_id?: string | null;
          service_id?: string | null;
          care_plan_id?: string | null;
          date?: string;
          window_start?: string;
          window_end?: string;
          status?: string;
          reason_for_visit?: string | null;
          notes?: string | null;
          check_in_time?: string | null;
          check_out_time?: string | null;
          location?: Json | null;
          is_urgent?: boolean;
          is_after_hours?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          base_price: number;
          min_minutes: number | null;
          max_minutes: number | null;
          is_active: boolean;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          base_price: number;
          min_minutes?: number | null;
          max_minutes?: number | null;
          is_active?: boolean;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          base_price?: number;
          min_minutes?: number | null;
          max_minutes?: number | null;
          is_active?: boolean;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: 'admin' | 'nurse_manager' | 'nurse' | 'billing_manager' | 'viewer';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}