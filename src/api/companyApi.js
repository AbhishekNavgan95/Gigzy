import supabaseClient from "@/utils/superbase";

export async function getCompanies(token) {
  const supabase = await supabaseClient(token);

  try {
    const { data, error } = await supabase.from("company").select("*");

    if (error) {
      throw error;
    }

    return data;
  } catch (e) {
    console.log(e);
  }
}
