

export type Data = Array<Record<string, string>>;

export type ApiUploadFile ={
    message: string,
    data:Data
}


export type ApiSearchResponse = {
    data:Data
}