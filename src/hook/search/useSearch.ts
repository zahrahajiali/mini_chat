import { useRouter } from "next/navigation";

import { useGetAllSongsQuery } from "@/services/songs";
const useSearch = () => {
  const router = useRouter();
  const { data: songs } = useGetAllSongsQuery({});

  return {
    songs,
  };
};

export default useSearch;
