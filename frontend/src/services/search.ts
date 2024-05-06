import {type  Data  } from "../Types/FileType"
import {type ApiSearchResponse } from "../Types/FileType";

export const searchData = async(search:string):Promise<[Error?, Data?]> => {
 try {
    const resp =await fetch(`http://localhost:3000/api/users?q=${search}`)

    if(!resp.ok) return [new Error(`Error search Data: ${resp.statusText}`)];
    const json =await resp.json() as ApiSearchResponse
    return[undefined, json.data]


 } catch (error) {
 if (error instanceof Error) return [error]
 }
 return [new Error('know error')]

}