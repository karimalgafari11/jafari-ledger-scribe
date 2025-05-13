export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          account_code: string
          company_id: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          parent_account_id: string | null
          type: string | null
        }
        Insert: {
          account_code: string
          company_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          parent_account_id?: string | null
          type?: string | null
        }
        Update: {
          account_code?: string
          company_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          parent_account_id?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounts_parent_account_id_fkey"
            columns: ["parent_account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string | null
          changes: Json | null
          company_id: string | null
          id: string
          record_id: string | null
          table_name: string | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          action?: string | null
          changes?: Json | null
          company_id?: string | null
          id?: string
          record_id?: string | null
          table_name?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string | null
          changes?: Json | null
          company_id?: string | null
          id?: string
          record_id?: string | null
          table_name?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      branches: {
        Row: {
          address: string | null
          company_id: string | null
          created_at: string | null
          id: string
          name: string | null
          phone: string | null
        }
        Insert: {
          address?: string | null
          company_id?: string | null
          created_at?: string | null
          id?: string
          name?: string | null
          phone?: string | null
        }
        Update: {
          address?: string | null
          company_id?: string | null
          created_at?: string | null
          id?: string
          name?: string | null
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "branches_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          company_id: string | null
          created_at: string
          email: string | null
          id: string
          name: string | null
          phone: string | null
          user_id: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          user_id?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          address: string | null
          company_id: string | null
          created_at: string | null
          currency: string | null
          email: string | null
          fiscal_year_start: string | null
          id: string
          language: string | null
          logo: string | null
          name: string
          phone: string | null
          tax_number: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          company_id?: string | null
          created_at?: string | null
          currency?: string | null
          email?: string | null
          fiscal_year_start?: string | null
          id?: string
          language?: string | null
          logo?: string | null
          name: string
          phone?: string | null
          tax_number?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          company_id?: string | null
          created_at?: string | null
          currency?: string | null
          email?: string | null
          fiscal_year_start?: string | null
          id?: string
          language?: string | null
          logo?: string | null
          name?: string
          phone?: string | null
          tax_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      currencies: {
        Row: {
          code: string
          exchange_rate_to_base: number | null
          id: string
          last_updated: string | null
          name: string | null
        }
        Insert: {
          code: string
          exchange_rate_to_base?: number | null
          id?: string
          last_updated?: string | null
          name?: string | null
        }
        Update: {
          code?: string
          exchange_rate_to_base?: number | null
          id?: string
          last_updated?: string | null
          name?: string | null
        }
        Relationships: []
      }
      expenses: {
        Row: {
          account_id: string | null
          amount: number | null
          company_id: string | null
          created_by: string | null
          description: string | null
          expense_date: string | null
          id: string
        }
        Insert: {
          account_id?: string | null
          amount?: number | null
          company_id?: string | null
          created_by?: string | null
          description?: string | null
          expense_date?: string | null
          id?: string
        }
        Update: {
          account_id?: string | null
          amount?: number | null
          company_id?: string | null
          created_by?: string | null
          description?: string | null
          expense_date?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "expenses_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          client_id: string | null
          company_id: string | null
          created_by: string | null
          date: string
          due_date: string | null
          id: string
          invoice_number: string | null
          status: string | null
          total_amount: number
        }
        Insert: {
          client_id?: string | null
          company_id?: string | null
          created_by?: string | null
          date: string
          due_date?: string | null
          id?: string
          invoice_number?: string | null
          status?: string | null
          total_amount: number
        }
        Update: {
          client_id?: string | null
          company_id?: string | null
          created_by?: string | null
          date?: string
          due_date?: string | null
          id?: string
          invoice_number?: string | null
          status?: string | null
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      journal_entries: {
        Row: {
          approved_by: string | null
          branch_id: string | null
          company_id: string | null
          created_at: string | null
          created_by: string | null
          date: string
          description: string | null
          id: string
        }
        Insert: {
          approved_by?: string | null
          branch_id?: string | null
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          date: string
          description?: string | null
          id?: string
        }
        Update: {
          approved_by?: string | null
          branch_id?: string | null
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          date?: string
          description?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "journal_entries_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "journal_entries_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "journal_entries_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "journal_entries_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      journal_lines: {
        Row: {
          account_id: string | null
          credit: number | null
          debit: number | null
          description: string | null
          id: string
          journal_entry_id: string | null
        }
        Insert: {
          account_id?: string | null
          credit?: number | null
          debit?: number | null
          description?: string | null
          id?: string
          journal_entry_id?: string | null
        }
        Update: {
          account_id?: string | null
          credit?: number | null
          debit?: number | null
          description?: string | null
          id?: string
          journal_entry_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "journal_lines_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "journal_lines_journal_entry_id_fkey"
            columns: ["journal_entry_id"]
            isOneToOne: false
            referencedRelation: "journal_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_settings: {
        Row: {
          channels: Json
          event_type: string
          id: string
          muted: boolean
          schedule_quiet: Json | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          channels?: Json
          event_type: string
          id?: string
          muted?: boolean
          schedule_quiet?: Json | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          channels?: Json
          event_type?: string
          id?: string
          muted?: boolean
          schedule_quiet?: Json | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      notification_templates: {
        Row: {
          channels: string[]
          content: string
          created_at: string
          id: string
          name: string
          subject: string
          updated_at: string
          variables: string[] | null
        }
        Insert: {
          channels: string[]
          content: string
          created_at?: string
          id?: string
          name: string
          subject: string
          updated_at?: string
          variables?: string[] | null
        }
        Update: {
          channels?: string[]
          content?: string
          created_at?: string
          id?: string
          name?: string
          subject?: string
          updated_at?: string
          variables?: string[] | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          channel: string
          created_at: string
          delivery_status: string | null
          event_type: string
          id: string
          message: string
          priority: string
          read: boolean
          related_entity_id: string | null
          related_entity_type: string | null
          retry_count: number | null
          title: string
          user_id: string | null
        }
        Insert: {
          channel: string
          created_at?: string
          delivery_status?: string | null
          event_type: string
          id?: string
          message: string
          priority: string
          read?: boolean
          related_entity_id?: string | null
          related_entity_type?: string | null
          retry_count?: number | null
          title: string
          user_id?: string | null
        }
        Update: {
          channel?: string
          created_at?: string
          delivery_status?: string | null
          event_type?: string
          id?: string
          message?: string
          priority?: string
          read?: boolean
          related_entity_id?: string | null
          related_entity_type?: string | null
          retry_count?: number | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number | null
          created_at: string | null
          id: string
          invoice_id: string | null
          notes: string | null
          payment_date: string | null
          payment_method: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          id?: string
          invoice_id?: string | null
          notes?: string | null
          payment_date?: string | null
          payment_method?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          id?: string
          invoice_id?: string | null
          notes?: string | null
          payment_date?: string | null
          payment_method?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          branch: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          is_active: boolean | null
          last_login: string | null
          phone: string | null
          role: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          branch?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          is_active?: boolean | null
          last_login?: string | null
          phone?: string | null
          role?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          branch?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          phone?: string | null
          role?: string | null
          username?: string | null
        }
        Relationships: []
      }
      sales_invoice_items: {
        Row: {
          code: string | null
          created_at: string | null
          description: string | null
          discount: number | null
          discount_type: string | null
          id: string
          invoice_id: string
          name: string
          notes: string | null
          price: number
          product_id: string
          quantity: number
          tax: number | null
          total: number
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          description?: string | null
          discount?: number | null
          discount_type?: string | null
          id: string
          invoice_id: string
          name: string
          notes?: string | null
          price: number
          product_id: string
          quantity: number
          tax?: number | null
          total: number
        }
        Update: {
          code?: string | null
          created_at?: string | null
          description?: string | null
          discount?: number | null
          discount_type?: string | null
          id?: string
          invoice_id?: string
          name?: string
          notes?: string | null
          price?: number
          product_id?: string
          quantity?: number
          tax?: number | null
          total?: number
        }
        Relationships: [
          {
            foreignKeyName: "sales_invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "sales_invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_invoices: {
        Row: {
          amount_paid: number | null
          created_at: string | null
          customer_account_number: string | null
          customer_id: string | null
          customer_name: string | null
          customer_phone: string | null
          date: string
          discount: number | null
          discount_type: string | null
          due_date: string | null
          id: string
          invoice_number: string
          notes: string | null
          payment_method: string
          status: string
          subtotal: number | null
          tax: number | null
          total_amount: number
          updated_at: string | null
          warehouse_id: string | null
          warehouse_name: string | null
        }
        Insert: {
          amount_paid?: number | null
          created_at?: string | null
          customer_account_number?: string | null
          customer_id?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          date: string
          discount?: number | null
          discount_type?: string | null
          due_date?: string | null
          id: string
          invoice_number: string
          notes?: string | null
          payment_method: string
          status: string
          subtotal?: number | null
          tax?: number | null
          total_amount: number
          updated_at?: string | null
          warehouse_id?: string | null
          warehouse_name?: string | null
        }
        Update: {
          amount_paid?: number | null
          created_at?: string | null
          customer_account_number?: string | null
          customer_id?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          date?: string
          discount?: number | null
          discount_type?: string | null
          due_date?: string | null
          id?: string
          invoice_number?: string
          notes?: string | null
          payment_method?: string
          status?: string
          subtotal?: number | null
          tax?: number | null
          total_amount?: number
          updated_at?: string | null
          warehouse_id?: string | null
          warehouse_name?: string | null
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          address: string | null
          company_name: string
          created_at: string | null
          currency: string | null
          email: string | null
          fiscal_year_start: string | null
          id: string
          language: string | null
          logo: string | null
          phone: string | null
          tax_number: string | null
          theme: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          company_name?: string
          created_at?: string | null
          currency?: string | null
          email?: string | null
          fiscal_year_start?: string | null
          id?: string
          language?: string | null
          logo?: string | null
          phone?: string | null
          tax_number?: string | null
          theme?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          company_name?: string
          created_at?: string | null
          currency?: string | null
          email?: string | null
          fiscal_year_start?: string | null
          id?: string
          language?: string | null
          logo?: string | null
          phone?: string | null
          tax_number?: string | null
          theme?: string | null
          updated_at?: string | null
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
