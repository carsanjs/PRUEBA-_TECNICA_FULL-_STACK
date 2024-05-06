import React, { useEffect, useState } from "react";
import { Data } from "../Types/FileType";
import { searchData } from "../services/search";
import { toast } from "sonner";
import {useDebounce} from "@uidotdev/usehooks"



const DEBOUNCE_TIME = 500
export const Search = ({ initialize }: { initialize: Data }) => {
  const [data, setData] = useState<Data>(initialize); //datos pasados desde el prop
  const [search, setSearch] = useState<string>(()=>{
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("q") ?? "";
  });
const devouncedSearch = useDebounce(search, DEBOUNCE_TIME)
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const newPathname =
    devouncedSearch === "" ? window.location.pathname : `?q=${devouncedSearch}`;
    window.history.pushState({}, "", newPathname);
  }, [devouncedSearch]);

  useEffect(() => {

    if(!devouncedSearch){
      setData(initialize);
      return;
    }
    //llamar a la api para filtrar los resultados
    searchData(devouncedSearch).then((response) => {
      const [err, newData] = response;
      if (err) {
        toast.error(`error: ${err}`);
        return;
      }
      if (newData) setData(newData);
    });
  }, [devouncedSearch,initialize]);
  return (
    <>
      <h1>Search</h1>
      <form>
        <input
          type="search"
          onChange={handleSearch}
          name="search"
          placeholder="Buscar datos.."
        />
      </form>

      <ul>
        <>
          {data.map((row) => {
            <li key={row.id}>
              <article>
                <ul>
                  {Object.entries(row).map(([key, value]) => {
                    return (
                      <p key={key}>
                        <strong>{key}:</strong>
                        {value}
                      </p>
                    );
                    // return <li key={key}>{key}: {value}</li>;
                  })}

                  {/* {
        Object.keys(row).map(key =>(

          <li>
            <strong>{key}</strong>:{row[key]}
          </li>
        )
      )
      }  manera de hacerlo*/}
                </ul>
              </article>
            </li>;
          })}
        </>
      </ul>
    </>
  );
};
