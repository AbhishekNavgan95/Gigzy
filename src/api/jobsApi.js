import supabaseClient from "@/utils/superbase";

export async function getJobs(
  token,
  {
    location,
    company_id,
    searchQuery,
    jobType,
    showInActiveJobs,
    industries = [],
    education,
  }
) {
  try {
    const supabase = await supabaseClient(token);

    // Start building the query
    let query = supabase
      .from("job")
      .select("*, company (*), saved_job(user_id)");

    // if checking for foreign key table, first filter out the companies and then based on the output filter jobs table
    let companyIds = [];
    if (industries.length > 0) {
      const { data: companies, error: companyError } = await supabase
        .from("company")
        .select("id")
        .in("industry", industries);

      if (companyError) {
        throw companyError;
      }

      // Get the company IDs
      companyIds = companies.map((company) => company.id);
    }

    // include rows accoring to industries matching
    if (companyIds.length > 0 && industries.length > 0) {
      query = query.in("company_id", companyIds);
    } else if (industries.length > 0 && companyIds.length === 0) {
      query = query.in("company_id", companyIds);
    }

    // Filter by location
    if (location) {
      query = query.eq("city", location);
    }

    // filter by education required
    if (education && education.length > 0) {
      query = query.in("education", education);
    }

    // filter by job type
    if (jobType) {
      query = query.eq("employment_type", jobType);
    }

    // filter by status
    if (!showInActiveJobs) {
      query = query.eq("status", "Active");
    }

    // Filter by company ID
    if (company_id) {
      query = query.eq("company_id", company_id);
    }

    // filter by search query
    if (searchQuery) {
      query = query.or(
        `title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%,employment_type.ilike.%${searchQuery}%,experience_level.ilike.%${searchQuery}%,skills_required.ilike.%${searchQuery}%`
      );
    }

    const { data, error } = await query;

    // console.log("data : ", data);

    if (error) {
      throw error;
    }

    return data;
  } catch (e) {
    console.error("Error fetching jobs:", e);
    return null;
  }
}
