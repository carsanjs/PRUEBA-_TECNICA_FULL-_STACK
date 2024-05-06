import React, { useEffect, useState } from "react";
import { Data } from "../Types/FileType";
import { searchData } from "../services/search";

export const Search = ({ initialize }: { initialize: Data }) => {
  const [data, setData] = useState<Data>(initialize); //datos pasados desde el prop
  const [search, setSearch] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const newPathname = search === '' ? window.location.pathname: `?q=${search}`
    window.history.pushState({}, "", newPathname);
  }, [search]);

  useEffect(()=>{
//llamar a la api para filtrar los resultados
searchData(search).then(() => {
    res
})

  },[])
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
    </>
  );
};
