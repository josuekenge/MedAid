import { NextRequest, NextResponse } from 'next/server';
import { supabaseApiClient } from '@/lib/supabase/api-client';

// Helper function to convert Supabase nurse to our Nurse type
const convertSupabaseNurse = (supabaseNurse: any) => ({
  id: supabaseNurse.id,
  name: supabaseNurse.name,
  email: supabaseNurse.email,
  phone: supabaseNurse.phone,
  specialties: supabaseNurse.specialties || [],
  availability: supabaseNurse.availability,
  status: supabaseNurse.status,
  notes: supabaseNurse.notes,
  createdAt: supabaseNurse.created_at,
  updatedAt: supabaseNurse.updated_at,
});

// GET /api/nurses - Get all nurses
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const { data, error, count, totalPages } = await supabaseApiClient.getPaginated(
      'nurses',
      page,
      limit
    );

    if (error) {
      return NextResponse.json(
        { error: `Failed to fetch nurses: ${error.message}` },
        { status: 500 }
      );
    }

    const nurses = data?.map(convertSupabaseNurse) || [];

    return NextResponse.json({
      data: nurses,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: totalPages || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching nurses:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/nurses - Create a new nurse
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const supabaseData = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      specialties: body.specialties || [],
      availability: body.availability,
      status: body.status || 'active',
      notes: body.notes,
    };

    const { data, error } = await supabaseApiClient.create('nurses', supabaseData);

    if (error) {
      return NextResponse.json(
        { error: `Failed to create nurse: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: convertSupabaseNurse(data!),
      message: 'Nurse created successfully',
    });
  } catch (error) {
    console.error('Error creating nurse:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


