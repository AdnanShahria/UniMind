export const mockUsers = new Map<string, any>();
export const mockMetadataRequests = new Map<string, any>();

// Seed default approved metadata requests
const seedData = [
  // Institutions
  { type: 'institution', val: "Bangladesh University of Engineering and Technology (BUET) | Location: Dhaka, Bangladesh" },
  { type: 'institution', val: "University of Dhaka (DU) | Location: Dhaka, Bangladesh" },
  { type: 'institution', val: "Shahjalal University of Science & Technology (SUST) | Location: Sylhet, Bangladesh" },
  { type: 'institution', val: "Stanford University (SU) | Location: California, USA" },
  // Majors
  { type: 'major', val: "Computer Science & Engineering" },
  { type: 'major', val: "Electrical & Electronic Engineering" },
  { type: 'major', val: "Mechanical Engineering" },
  { type: 'major', val: "Civil Engineering" },
  { type: 'major', val: "Business Administration" },
  { type: 'major', val: "Economics" },
  { type: 'major', val: "Physics" },
  { type: 'major', val: "Mathematics" },
  { type: 'major', val: "Medicine" },
  { type: 'major', val: "Law" },
  // Sessions
  { type: 'session', val: "2019-2020" },
  { type: 'session', val: "2020-2021" },
  { type: 'session', val: "2021-2022" },
  { type: 'session', val: "2022-2023" },
  { type: 'session', val: "2023-2024" },
  { type: 'session', val: "2024-2025" },
  // Roles
  { type: 'role', val: "Undergraduate" },
  { type: 'role', val: "Graduate / PhD" },
  { type: 'role', val: "Researcher" },
  { type: 'role', val: "Professor" },
  { type: 'role', val: "Other" }
];

seedData.forEach((item, index) => {
  const id = 'seed-' + index;
  mockMetadataRequests.set(id, {
    id,
    requester_email: 'system@unimind.edu',
    request_type: item.type,
    action_type: 'add',
    old_value: null,
    new_value: item.val,
    status: 'approved',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });
});

export function generateUUID() {
  return crypto.randomUUID();
}

export async function hashPassword(password: string) {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function verifyToken(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.substring(7);
  try {
    const payload = JSON.parse(atob(token));
    if (payload && payload.userId) {
      return payload;
    }
  } catch (e) {
    return null;
  }
  return null;
}

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, apikey, Authorization",
};
