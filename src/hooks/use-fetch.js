import { useSession } from "@clerk/clerk-react";
import { useCallback } from "react";
import { useState } from "react";

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { session } = useSession();

  const fn = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      let response;

      try {
        const supabaseAccessToken = await session.getToken({
          template: "supabase",
        });
        response = await cb(supabaseAccessToken, options, ...args);
        setData(response);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
      return response;
    },
    [cb, options, session]
  );

  return { data, loading, error, fn };
};

export default useFetch;
