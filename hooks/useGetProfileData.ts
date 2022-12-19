import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { baseUrl } from "../utils";
import { UserProfile } from "../types/types";

export const useGetProfileData = () => {
  const { data: session } = useSession();
  const [response, setResponse] = useState<UserProfile | null>(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  const config = {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  };
  const fetchData = () => {
    axios
      .get<UserProfile>(`${baseUrl}/athlete`, config)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [session]);

  return { response, error, loading };
};
