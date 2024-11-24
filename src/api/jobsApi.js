import supabaseClient from "@/utils/superbase";

export async function getJobs(token, { location, company_id, searchQuery }) {
  try {
    const supabase = await supabaseClient(token);

    // Start building the query
    let query = supabase.from("job").select("*, company (*), saved_job(user_id)");

    // Filter by location
    if (location) {
      query = query.eq("city", location);
    }

    // Filter by company ID
    if (company_id) {
      query = query.eq("company_id", company_id);
    }

    if (searchQuery) {
      query = query.or(
        `title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%,employment_type.ilike.%${searchQuery}%,experience_level.ilike.%${searchQuery}%,skills_required.ilike.%${searchQuery}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return data;
  } catch (e) {
    console.error("Error fetching jobs:", e);
    return null;
  }
}
