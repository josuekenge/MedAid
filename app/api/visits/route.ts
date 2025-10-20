import { NextRequest, NextResponse } from 'next/server';
import { supabaseApiClient } from '@/lib/supabase/api-client';

// Helper function to convert Supabase visit to our Visit type
const convertSupabaseVisit = (supabaseVisit: any) => ({
  id: supabaseVisit.id,
  patientId: supabaseVisit.patient_id,
  nurseId: supabaseVisit.nurse_id,
  serviceId: supabaseVisit.service_id,
  carePlanId: supabaseVisit.care_plan_id,
  date: supabaseVisit.date,
  windowStart: supabaseVisit.window_start,
  windowEnd: supabaseVisit.window_end,
  status: supabaseVisit.status,
  reasonForVisit: supabaseVisit.reason_for_visit,
  notes: supabaseVisit.notes,
  checkInTime: supabaseVisit.check_in_time,
  checkOutTime: supabaseVisit.check_out_time,
  location: supabaseVisit.location,
  isUrgent: supabaseVisit.is_urgent,
  isAfterHours: supabaseVisit.is_after_hours,
  createdAt: supabaseVisit.created_at,
  updatedAt: supabaseVisit.updated_at,
});

// GET /api/visits - Get all visits
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const { data, error, count, totalPages } = await supabaseApiClient.getPaginated(
      'visits',
      page,
      limit
    );

    if (error) {
      return NextResponse.json(
        { error: `Failed to fetch visits: ${error.message}` },
        { status: 500 }
      );
    }

    const visits = data?.map(convertSupabaseVisit) || [];

    return NextResponse.json({
      data: visits,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: totalPages || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching visits:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/visits - Create a new visit
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const supabaseData = {
      patient_id: body.patientId,
      nurse_id: body.nurseId,
      service_id: body.serviceId,
      care_plan_id: body.carePlanId,
      date: body.date,
      window_start: body.windowStart,
      window_end: body.windowEnd,
      status: body.status || 'scheduled',
      reason_for_visit: body.reasonForVisit,
      notes: body.notes,
      check_in_time: body.checkInTime,
      check_out_time: body.checkOutTime,
      location: body.location,
      is_urgent: body.isUrgent || false,
      is_after_hours: body.isAfterHours || false,
    };

    const { data, error } = await supabaseApiClient.create('visits', supabaseData);

    if (error) {
      return NextResponse.json(
        { error: `Failed to create visit: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: convertSupabaseVisit(data!),
      message: 'Visit created successfully',
    });
  } catch (error) {
    console.error('Error creating visit:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


