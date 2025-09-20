import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage"


interface SearchHistoryItems {

    id:string;
    query:string;
    lat:number;
    lon:number;
    name:string;
    country:string;
    state?:string;
    searchedAt:number;


}



export function useSearchHistory() {
  const[history,setHistory] =  useLocalStorage<SearchHistoryItems[]>(
  "search-history",
  [] 
        

  );

  useQuery({
    queryKey:["search-history"],
    queryFn:()=> history,
    initialData:history,
  });

  const addTohistory()=useMutation({
    mutationFn:async(
      search:Omit<SearchHistoryItem,"id" | "searchedAt"> )
      =>{
        const newSearch: SearchHistoryItems={
          ...search,
          id:`${search.lat}-${search.lon}-${Date.now()}`,
          searchedAt:Date.now(),
          


        };

      }
       
    
  })
}  