# Quick Test Guide

## IMPORTANT: Run SQL Schema First!

Before testing anything, you MUST run the SQL schema in Supabase:
1. Go to https://supabase.com/dashboard
2. Select your project: `bsehgieuxjbnuiqmrnui`
3. Click "SQL Editor" in the left sidebar
4. Open `supabase-schema-updated.sql` from your project root
5. Copy ALL the content and paste it into the SQL Editor
6. Click "Run"

Without this step, NOTHING will work!

---

## Testing Instructions

Open your browser console (F12) before testing any page. All operations now have detailed logging.

### Test 1: Patients Page

**Navigate to**: http://localhost:3000/patients

**Expected logs on page load**:
```
[Patients] Loading patients from Supabase...
[Patients] Loaded X patients: [...]
```

**Test Add Patient**:
1. Click "Add Patient" button
2. Fill out the form
3. Click submit
4. Expected console logs:
```
[Patients] Submitting new patient: {...}
[Patients] Create response: {success: true, ...}
[Patients] Patient created successfully, reloading list...
[Patients] Loading patients from Supabase...
[Patients] Loaded X patients: [...]
[Patients] List reloaded
```

**Test Delete Patient**:
1. Click trash icon on a patient
2. Confirm deletion
3. Expected console logs:
```
[Patients] Deleting patient: xxx-xxx-xxx
[Patients] Delete response: {success: true}
[Patients] Patient deleted successfully, reloading list...
[Patients] Loading patients from Supabase...
[Patients] Loaded X patients: [...]
[Patients] List reloaded
```

---

### Test 2: Nurses Page

**Navigate to**: http://localhost:3000/nurses

**Expected logs on page load**:
```
[Nurses] Loading nurses from Supabase...
[Nurses] Loaded X nurses: [...]
```

**Test Add Nurse**:
Expected console logs:
```
[Nurses] Submitting new nurse: {...}
[Nurses] Create response: {success: true, ...}
[Nurses] Nurse created successfully, reloading list...
[Nurses] Loading nurses from Supabase...
[Nurses] Loaded X nurses: [...]
[Nurses] List reloaded
```

**Test Delete Nurse**:
Expected console logs:
```
[Nurses] Deleting nurse: xxx-xxx-xxx
[Nurses] Delete response: {success: true}
[Nurses] Nurse deleted successfully, reloading list...
[Nurses] Loading nurses from Supabase...
[Nurses] Loaded X nurses: [...]
[Nurses] List reloaded
```

---

### Test 3: Services Page

**Navigate to**: http://localhost:3000/services

**Expected logs on page load**:
```
[Services] Loading services from Supabase...
[Services] Loaded X services: [...]
```

**Test Add Service**:
Expected console logs:
```
[Services] Submitting new service: {...}
[Services] Create response: {success: true, ...}
[Services] Service created successfully, reloading list...
[Services] Loading services from Supabase...
[Services] Loaded X services: [...]
[Services] List reloaded
```

**Test Delete Service**:
Expected console logs:
```
[Services] Deleting service: xxx-xxx-xxx
[Services] Delete response: {success: true}
[Services] Service deleted successfully, reloading list...
[Services] Loading services from Supabase...
[Services] Loaded X services: [...]
[Services] List reloaded
```

---

### Test 4: Visits Page

**Navigate to**: http://localhost:3000/visits

**Expected logs on page load**:
```
[Visits] Loading data from Supabase...
[Visits] Loaded X visits
[Visits] Loaded X patients
[Visits] Loaded X nurses
[Visits] Loaded X services
```

**Test Add Visit**:
Expected console logs:
```
[Visits] Submitting new visit: {...}
[Visits] Create response: {success: true, ...}
[Visits] Visit created successfully, reloading data...
[Visits] Loading data from Supabase...
[Visits] Loaded X visits
[Visits] Loaded X patients
[Visits] Loaded X nurses
[Visits] Loaded X services
[Visits] Data reloaded
```

**Test Delete Visit**:
Expected console logs:
```
[Visits] Deleting visit: xxx-xxx-xxx
[Visits] Delete response: {success: true}
[Visits] Visit deleted successfully, reloading data...
[Visits] Loading data from Supabase...
[Visits] Loaded X visits
[Visits] Loaded X patients
[Visits] Loaded X nurses
[Visits] Loaded X services
[Visits] Data reloaded
```

---

## Common Issues & Fixes:

### Issue: No console logs at all
**Fix**: Make sure dev server is running (`npm run dev`)

### Issue: "Failed to fetch" errors
**Fix**: Run the SQL schema in Supabase SQL Editor (see top of this guide)

### Issue: "table doesn't exist" error
**Fix**: You didn't run the SQL schema yet

### Issue: Data added but list doesn't update
**Fix**:
1. Check if you see "List reloaded" or "Data reloaded" in console
2. If YES but still no update: Check Supabase Table Editor to see if data actually saved
3. If data is in Supabase but not showing: Possible state update issue - share console logs

### Issue: "success: false" in response
**Fix**: Check the full error message in console. Usually means:
- Required fields missing
- Invalid data format
- RLS policy blocking the operation

---

## Current Status:
- ✅ Logging added to all pages (patients, nurses, visits, services)
- ✅ All CRUD operations use `await` for proper sequencing
- ✅ Detailed error logging for debugging
- ⏳ Waiting for user to test and share console logs
