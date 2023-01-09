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
    numberOfApplicants:number,
    active:boolean;
}

export interface range{
    start:any,
    end:any,
}