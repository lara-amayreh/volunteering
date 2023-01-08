export interface opportunity{
    id?:string,
    userid?:string,
    name:string,
    description:string,
    skills:string,
    range:range,
    numberOfVolunteers:number,
    companyName?:string,
    companyLogo?:string,
}

export interface range{
    start:any,
    end:any,
}