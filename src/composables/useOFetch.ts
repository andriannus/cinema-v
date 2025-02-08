import { useRuntimeConfig } from "#app";

export const useOFetch = () => {
  const config = useRuntimeConfig();

  const ofetch = $fetch.create({
    baseURL: config.public.tmdbServiceURL,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${config.public.tmdbAPIToken}`,
    },
  });

  return { ofetch };
};
