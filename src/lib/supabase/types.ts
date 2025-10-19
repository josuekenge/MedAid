export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: 'admin' | 'nurse_manager' | 'nurse' | 'billing_manager' | 'viewer'
          avatar_url: string | null
          is_active: boolean
          last_login_at: string | null
          preferences: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          role: 'admin' | 'nurse_manager' | 'nurse' | 'billing_manager' | 'viewer'
          avatar_url?: string | null
          is_active?: boolean
          last_login_at?: string | null
          preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'admin' | 'nurse_manager' | 'nurse' | 'billing_manager' | 'viewer'
          avatar_url?: string | null
          is_active?: boolean
          last_login_at?: string | null
          preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      patients: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          date_of_birth: string
          address: Json
          emergency_contact: Json
          medical_history: Json | null
          allergies: string[] | null
          status: 'active' | 'inactive' | 'discharged'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          date_of_birth: string
          address: Json
          emergency_contact: Json
          medical_history?: Json | null
          allergies?: string[] | null
          status?: 'active' | 'inactive' | 'discharged'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          date_of_birth?: string
          address?: Json
          emergency_contact?: Json
          medical_history?: Json | null
          allergies?: string[] | null
          status?: 'active' | 'inactive' | 'discharged'
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      nurses: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          license_number: string
          specialties: string[]
          certifications: Json | null
          availability: Json | null
          location: Json | null
          status: 'active' | 'inactive' | 'on_leave'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          license_number: string
          specialties: string[]
          certifications?: Json | null
          availability?: Json | null
          location?: Json | null
          status?: 'active' | 'inactive' | 'on_leave'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          license_number?: string
          specialties?: string[]
          certifications?: Json | null
          availability?: Json | null
          location?: Json | null
          status?: 'active' | 'inactive' | 'on_leave'
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          id: string
          name: string
          description: string | null
          base_price: number
          min_minutes: number
          max_minutes: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          base_price: number
          min_minutes: number
          max_minutes: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          base_price?: number
          min_minutes?: number
          max_minutes?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      visits: {
        Row: {
          id: string
          patient_id: string
          nurse_id: string
          service_id: string
          care_plan_id: string | null
          date: string
          window_start: string
          window_end: string
          status: 'requested' | 'scheduled' | 'en_route' | 'in_progress' | 'completed' | 'cancelled' | 'delayed'
          reason_for_visit: string
          notes: string | null
          check_in_time: string | null
          check_out_time: string | null
          location: Json | null
          is_urgent: boolean
          is_after_hours: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          nurse_id: string
          service_id: string
          care_plan_id?: string | null
          date: string
          window_start: string
          window_end: string
          status?: 'requested' | 'scheduled' | 'en_route' | 'in_progress' | 'completed' | 'cancelled' | 'delayed'
          reason_for_visit: string
          notes?: string | null
          check_in_time?: string | null
          check_out_time?: string | null
          location?: Json | null
          is_urgent?: boolean
          is_after_hours?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          nurse_id?: string
          service_id?: string
          care_plan_id?: string | null
          date?: string
          window_start?: string
          window_end?: string
          status?: 'requested' | 'scheduled' | 'en_route' | 'in_progress' | 'completed' | 'cancelled' | 'delayed'
          reason_for_visit?: string
          notes?: string | null
          check_in_time?: string | null
          check_out_time?: string | null
          location?: Json | null
          is_urgent?: boolean
          is_after_hours?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "visits_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visits_nurse_id_fkey"
            columns: ["nurse_id"]
            isOneToOne: false
            referencedRelation: "nurses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visits_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
