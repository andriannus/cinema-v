import { useFetch, useRuntimeConfig } from "#app";

export const useMyFetch: typeof useFetch = (request, opts?) => {
  const config = useRuntimeConfig();

  return useFetch(request, {
    baseURL: config.public.tmdbServiceURL,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${config.public.tmdbAPIToken}`,
    },
    ...opts,
  });
};
