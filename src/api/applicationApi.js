import supabaseClient, { supabaseUrl } from "@/utils/superbase";

export async function applyForJob(token, {}, jobData) {
  try {
    const supabase = await supabaseClient(token);

    const random = Math.floor(Math.random() * 90000);
    const fileName = `resume-${random}-${jobData.candidate_id}`;

    const { data: resumeData, error: storageError } = await supabase.storage
      .from("resume")
      .upload(fileName, jobData.resume);

    if (storageError) {
      console.log("something went wrong while uploading the resume");
      throw storageError;
    }

    const resume = `${supabaseUrl}/storage/v1/object/public/resume/${fileName}`;

    const { data, error } = await supabase
      .from("application")
      .insert([{ ...jobData, resume }])
      .select();

    if (error) {
      console.log("something went wrong while submitting the application");
      throw error;
    }

    return data;
  } catch (e) {
    console.error("Error fetching job details:", e);
    return null;
  }
}

export async function fetchApplications(
  token,
  { jobId = null },
  page = 1,
  limit = 10
) {

  if (!jobId) {
    throw new Error("Job ID is required");
  }

  try {
    const supabase = await supabaseClient(token);

    const { count: totalCount, error: countError } = await supabase
      .from("application")
      .select("*", { count: "exact" })
      .eq("job_id", jobId)
      .limit(1);

    if (countError) {
      throw countError;
    }

    const totalPages = Math.ceil(totalCount / limit);
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    const { data, error } = await supabase
      .from("application")
      .select("*")
      .eq("job_id", jobId)
      .range(start, end);

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
    console.error("Error while fetching applications: ", e);

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

export async function updateApplicationStatus(
  token,
  {},
  applicationIdList,
  status
) {
  try {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase
      .from("application")
      .update({ status })
      .in("id", applicationIdList)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (e) {
    console.error("Error updating job status: ", e.message);
    return null;
  }
}
