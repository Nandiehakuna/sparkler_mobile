import { useState } from "react";
import { DataError } from "../api/client";

interface ApiResponse<T> {
  ok: boolean;
  data: T;
  status?: number;
  [key: string]: any;
}

export default function useApi<T>(
  apiFunc: (...args: any[]) => Promise<ApiResponse<T>>
) {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args: any[]) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    if (response.ok) {
      setData(response.data as T[]);
    } else setError(true);

    return response;
  };

  return { data, error, loading, request };
}
