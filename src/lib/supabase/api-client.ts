import { supabase } from './client';
import { Database } from './types';

type TableName = keyof Database['public']['Tables'];

export const supabaseApiClient = {
  async get<T>(table: TableName, filters?: Record<string, any>): Promise<T[]> {
    let query = supabase.from(table).select('*');
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data as T[];
  },

  async getById<T>(table: TableName, id: string): Promise<T | null> {
    const { data, error } = await supabase.from(table).select('*').eq('id', id).single();
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "No rows found"
    return data as T | null;
  },

  async create<T>(table: TableName, data: Partial<T>): Promise<T> {
    const { data: newData, error } = await supabase.from(table).insert(data).select().single();
    if (error) throw error;
    return newData as T;
  },

  async update<T>(table: TableName, id: string, data: Partial<T>): Promise<T> {
    const { data: updatedData, error } = await supabase.from(table).update(data).eq('id', id).select().single();
    if (error) throw error;
    return updatedData as T;
  },

  async delete(table: TableName, id: string): Promise<void> {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) throw error;
  },

  async getPaginated<T>(
    table: TableName,
    page: number,
    limit: number,
    filters?: Record<string, any>
  ): Promise<{ data: T[] | null; error: any; count: number | null; totalPages: number | null }> {
    const offset = (page - 1) * limit;
    let query = supabase.from(table).select('*', { count: 'exact' });

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (key !== 'page' && key !== 'limit' && value) {
          query = query.eq(key, value);
        }
      });
    }

    const { data, error, count } = await query.range(offset, offset + limit - 1);

    if (error) {
      return { data: null, error, count: null, totalPages: null };
    }

    const totalPages = count ? Math.ceil(count / limit) : 0;
    return { data: data as T[], error: null, count, totalPages };
  },

  async search<T>(table: TableName, searchTerm: string, fields: string[]): Promise<{ data: T[] | null; error: any }> {
    let query = supabase.from(table).select('*');

    if (searchTerm && fields.length > 0) {
      const searchConditions = fields.map(field => `${field}.ilike.%${searchTerm}%`).join(',');
      query = query.or(searchConditions);
    }

    const { data, error } = await query;
    return { data: data as T[], error };
  },
};