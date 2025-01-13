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

export async function fetchApplications(token, { jobId = null }) {
  if (!jobId) {
    throw new Error("Job id is required");
  }

  try {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase
      .from("application")
      .select("*")
      .eq("job_id", jobId)
      .select();

    if (error) {
      throw error;
    }

    return data;
  } catch (e) {
    console.log("Error while fetching applications");
    return null;
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
