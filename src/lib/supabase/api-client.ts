import { createClient } from './client';
import { Database } from './types';

type Tables = Database['public']['Tables'];

export class SupabaseApiClient {
  private supabase = createClient();

  // Generic CRUD operations
  async get<T extends keyof Tables>(
    table: T,
    filters?: Record<string, any>
  ): Promise<{ data: Tables[T]['Row'][] | null; error: any }> {
    let query = this.supabase.from(table).select('*');
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      });
    }

    return await query;
  }

  async getById<T extends keyof Tables>(
    table: T,
    id: string
  ): Promise<{ data: Tables[T]['Row'] | null; error: any }> {
    return await this.supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();
  }

  async create<T extends keyof Tables>(
    table: T,
    data: Tables[T]['Insert']
  ): Promise<{ data: Tables[T]['Row'] | null; error: any }> {
    return await this.supabase
      .from(table)
      .insert(data)
      .select()
      .single();
  }

  async update<T extends keyof Tables>(
    table: T,
    id: string,
    data: Tables[T]['Update']
  ): Promise<{ data: Tables[T]['Row'] | null; error: any }> {
    return await this.supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();
  }

  async delete<T extends keyof Tables>(
    table: T,
    id: string
  ): Promise<{ error: any }> {
    return await this.supabase
      .from(table)
      .delete()
      .eq('id', id);
  }

  // Search functionality
  async search<T extends keyof Tables>(
    table: T,
    searchTerm: string,
    searchColumns: string[]
  ): Promise<{ data: Tables[T]['Row'][] | null; error: any }> {
    let query = this.supabase.from(table).select('*');
    
    // Use textSearch for full-text search if available, otherwise use ilike
    const searchConditions = searchColumns.map(column => `${column}.ilike.%${searchTerm}%`);
    
    if (searchConditions.length > 0) {
      query = query.or(searchConditions.join(','));
    }

    return await query;
  }

  // Pagination
  async getPaginated<T extends keyof Tables>(
    table: T,
    page: number = 1,
    limit: number = 10,
    filters?: Record<string, any>
  ): Promise<{ 
    data: Tables[T]['Row'][] | null; 
    error: any;
    count: number | null;
    totalPages: number;
  }> {
    const offset = (page - 1) * limit;
    
    let query = this.supabase
      .from(table)
      .select('*', { count: 'exact' });
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      });
    }

    const result = await query
      .range(offset, offset + limit - 1);

    const totalPages = result.count ? Math.ceil(result.count / limit) : 0;

    return {
      ...result,
      totalPages
    };
  }

  // Real-time subscriptions
  subscribe<T extends keyof Tables>(
    table: T,
    callback: (payload: any) => void,
    filter?: string
  ) {
    let subscription = this.supabase
      .channel(`${table}_changes`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: table as string,
          filter: filter
        }, 
        callback
      )
      .subscribe();

    return subscription;
  }

  // Get the Supabase client for direct use
  getClient() {
    return this.supabase;
  }
}

export const supabaseApiClient = new SupabaseApiClient();
