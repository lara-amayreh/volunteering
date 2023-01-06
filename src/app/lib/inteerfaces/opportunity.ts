export interface opportunity{
    id?:string,
    userid?:string,
    name:string,
    logo:string,
    companyName:string,
    description:string,
    skills:string,
    range:range,
    numberOfVolunteers:number,
}

export interface range{
    start:any,
    end:any,
}