import { useRouter } from "next/navigation";

import { useSearchSongsQuery } from "@/services/search";
const useSearch = () => {
  const router = useRouter();
  const { data: search } = useSearchSongsQuery({});

  return {
    search,
  };
};

export default useSearch;
