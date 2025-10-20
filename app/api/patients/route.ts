import { NextRequest, NextResponse } from 'next/server';
import { supabaseApiClient } from '@/lib/supabase/api-client';

// Helper function to convert Supabase patient to our Patient type
const convertSupabasePatient = (supabasePatient: any) => ({
  id: supabasePatient.id,
  name: supabasePatient.name,
  email: supabasePatient.email,
  phone: supabasePatient.phone,
  dateOfBirth: supabasePatient.date_of_birth,
  address: supabasePatient.address,
  emergencyContact: supabasePatient.emergency_contact,
  status: supabasePatient.status,
  notes: supabasePatient.notes,
  createdAt: supabasePatient.created_at,
  updatedAt: supabasePatient.updated_at,
});

// GET /api/patients - Get all patients
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const { data, error, count, totalPages } = await supabaseApiClient.getPaginated(
      'patients',
      page,
      limit
    );

    if (error) {
      return NextResponse.json(
        { error: `Failed to fetch patients: ${error.message}` },
        { status: 500 }
      );
    }

    const patients = data?.map(convertSupabasePatient) || [];

    return NextResponse.json({
      data: patients,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: totalPages || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/patients - Create a new patient
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const supabaseData = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      date_of_birth: body.dateOfBirth,
      address: body.address,
      emergency_contact: body.emergencyContact,
      status: body.status || 'active',
      notes: body.notes,
    };

    const { data, error } = await supabaseApiClient.create('patients', supabaseData);

    if (error) {
      return NextResponse.json(
        { error: `Failed to create patient: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: convertSupabasePatient(data!),
      message: 'Patient created successfully',
    });
  } catch (error) {
    console.error('Error creating patient:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


