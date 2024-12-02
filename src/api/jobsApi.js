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
    sortOption,
    page = 1,
    limit = 10,
  }
) {
  try {
    const supabase = await supabaseClient(token);

    // Start building the base query
    let baseQuery = supabase.from("job").select("id", { count: "exact" }); // Minimal select with count for total rows

    // Include filters in the base query
    let companyIds = [];
    if (industries.length > 0) {
      const { data: companies, error: companyError } = await supabase
        .from("company")
        .select("id")
        .in("industry", industries);

      if (companyError) {
        throw companyError;
      }

      companyIds = companies.map((company) => company.id);
    }

    if (companyIds.length > 0 && industries.length > 0) {
      baseQuery = baseQuery.in("company_id", companyIds);
    } else if (industries.length > 0 && companyIds.length === 0) {
      baseQuery = baseQuery.in("company_id", companyIds);
    }

    if (location) {
      baseQuery = baseQuery.eq("city", location);
    }

    if (education && education.length > 0) {
      baseQuery = baseQuery.in("education", education);
    }

    if (jobType) {
      baseQuery = baseQuery.eq("employment_type", jobType);
    }

    if (!showInActiveJobs) {
      baseQuery = baseQuery.eq("status", "Active");
    }

    if (company_id) {
      baseQuery = baseQuery.eq("company_id", company_id);
    }

    if (searchQuery) {
      baseQuery = baseQuery.or(
        `title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%,employment_type.ilike.%${searchQuery}%,experience_level.ilike.%${searchQuery}%,skills_required.ilike.%${searchQuery}%`
      );
    }

    // Execute the base query to get the total count
    const { count: totalCount, error: countError } = await baseQuery;
    if (countError) {
      throw countError;
    }

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    // Start building the query for data retrieval
    let dataQuery = supabase
      .from("job")
      .select("*, company (*), saved_job(user_id)");

    // Apply the same filters as baseQuery
    if (companyIds.length > 0 && industries.length > 0) {
      dataQuery = dataQuery.in("company_id", companyIds);
    } else if (industries.length > 0 && companyIds.length === 0) {
      dataQuery = dataQuery.in("company_id", companyIds);
    }

    if (location) {
      dataQuery = dataQuery.eq("city", location);
    }

    if (education && education.length > 0) {
      dataQuery = dataQuery.in("education", education);
    }

    if (jobType) {
      dataQuery = dataQuery.eq("employment_type", jobType);
    }

    if (!showInActiveJobs) {
      dataQuery = dataQuery.eq("status", "Active");
    }

    if (company_id) {
      dataQuery = dataQuery.eq("company_id", company_id);
    }

    if (searchQuery) {
      dataQuery = dataQuery.or(
        `title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%,employment_type.ilike.%${searchQuery}%,experience_level.ilike.%${searchQuery}%,skills_required.ilike.%${searchQuery}%`
      );
    }

    // Apply pagination
    const start = (page - 1) * limit;
    const end = start + limit - 1;
    dataQuery = dataQuery.range(start, end);

    if (sortOption === "date") {
      dataQuery = dataQuery.order("created_at", { ascending: true });
    }

    // Execute the data query
    const { data, error } = await dataQuery;

    if (error) {
      throw error;
    }

    return {
      data,
      pagination: {
        totalCount,
        totalPages,
        currentPage: Number(page),
      },
    };
  } catch (e) {
    console.error("Error fetching jobs:", e);
    return {
      data: null,
      pagination: {
        totalCount: 0,
        totalPages: 0,
        currentPage: page,
      },
    };
  }
}

export async function getJobDetails(token, { jobId = null }) {
  try {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase
      .from("job")
      .select("*, company (*), saved_job(user_id), application: application (*)")
      .eq("id", jobId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (e) {
    console.error("Error fetching job details:", e);
    return null;
  }
}
