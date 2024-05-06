import {type ApiSearchResponse, type  Data  } from "../Types/FileType";
import {API_HOST} from "../config"
export const searchData = async(search:string):Promise<[Error?, Data?]> => {
 try {
    const resp =await fetch(`${API_HOST}/api/users?q=${search}`)

    if(!resp.ok) return [new Error(`Error search Data: ${resp.statusText}`)];
    const json =await resp.json() as ApiSearchResponse
    return[undefined, json.data]
 } catch (error) {
 if (error instanceof Error) return [error]
 }
 return [new Error('know error')]

}