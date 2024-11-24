import supabaseClient from "@/utils/superbase";

export async function saveJob(token, { alreadySaved }, saveData) {
  const supabase = await supabaseClient(token);

  try {
    if (alreadySaved) {
      const { data, error } = await supabase
        .from("saved_job")
        .delete()
        .eq("job_id", saveData.job_id)
        .select();

      if (error) {
        console.error("Error Deleting Saved Job : ");
        throw error;
      }
      
      return undefined;
    } else {
      const { data, error } = await supabase
      .from("saved_job")
      .insert([saveData])
      .select();
      
      if (error) {
        console.error("Error Saving Job : ");
        throw error;
      }
      
      return data;
    }
  } catch (e) {
    console.log(e);
  }
}
