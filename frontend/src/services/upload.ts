import {type  Data  } from "../Types/FileType"
import { ApiUploadFile } from "../Types/FileType";

export const uploadfile = async(file:File):Promise<[Error?, Data?]> => {
 const formData = new FormData();
 formData.append("file", file);
 try {
    const resp =await fetch('http://localhost:3000/api/file',{
    method:'POST',
    body:formData,
    })
    if(!resp.ok) return [new Error(`Error uploading file: ${resp.statusText}`)];
    const json =await resp.json() as ApiUploadFile
    return[undefined, json.data]


 } catch (error) {
 if (error instanceof Error) return [error]
 }
 return [new Error('know error')]

}