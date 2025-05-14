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
      leases: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          description: string | null
          lessor: string
          status: string
          start_date: string
          end_date: string
          monthly_payment: number
          classification: string
          present_value: number | null
          asset_life: number | null
          user_id: string
          transfer_ownership: boolean
          bargain_purchase_option: boolean
          specialized_asset: boolean
          document_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          description?: string | null
          lessor: string
          status?: string
          start_date: string
          end_date: string
          monthly_payment: number
          classification: string
          present_value?: number | null
          asset_life?: number | null
          user_id: string
          transfer_ownership?: boolean
          bargain_purchase_option?: boolean
          specialized_asset?: boolean
          document_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          description?: string | null
          lessor?: string
          status?: string
          start_date?: string
          end_date?: string
          monthly_payment?: number
          classification?: string
          present_value?: number | null
          asset_life?: number | null
          user_id?: string
          transfer_ownership?: boolean
          bargain_purchase_option?: boolean
          specialized_asset?: boolean
          document_url?: string | null
        }
      }
      payments: {
        Row: {
          id: string
          created_at: string
          lease_id: string
          payment_date: string
          amount: number
          principal: number
          interest: number
          status: string
          notes: string | null
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          lease_id: string
          payment_date: string
          amount: number
          principal: number
          interest: number
          status?: string
          notes?: string | null
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          lease_id?: string
          payment_date?: string
          amount?: number
          principal?: number
          interest?: number
          status?: string
          notes?: string | null
          user_id?: string
        }
      }
      journal_entries: {
        Row: {
          id: string
          created_at: string
          lease_id: string
          entry_date: string
          description: string
          debit_account: string
          credit_account: string
          amount: number
          status: string
          reference: string | null
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          lease_id: string
          entry_date: string
          description: string
          debit_account: string
          credit_account: string
          amount: number
          status?: string
          reference?: string | null
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          lease_id?: string
          entry_date?: string
          description?: string
          debit_account?: string
          credit_account?: string
          amount?: number
          status?: string
          reference?: string | null
          user_id?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          created_at: string
          user_id: string
          action: string
          entity_type: string
          entity_id: string
          old_values: Json | null
          new_values: Json | null
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          action: string
          entity_type: string
          entity_id: string
          old_values?: Json | null
          new_values?: Json | null
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          action?: string
          entity_type?: string
          entity_id?: string
          old_values?: Json | null
          new_values?: Json | null
          ip_address?: string | null
          user_agent?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          first_name: string | null
          last_name: string | null
          company: string | null
          role: string
          avatar_url: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          first_name?: string | null
          last_name?: string | null
          company?: string | null
          role?: string
          avatar_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          company?: string | null
          role?: string
          avatar_url?: string | null
        }
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