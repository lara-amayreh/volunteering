export interface person {
    id?:string,
    profileImg?:string,
    fullName:string,
    city:string,
    courses:courses[],
<<<<<<< HEAD
    skills:any,
=======
    skills:string[],
>>>>>>> 79236132446034c752f2538a4f8b4116c8f7d0b2
    phoneNumber:number,
    experience:string,
    range:drange,
    role:string,
    days:string,
   
   
}
export interface drange{
    start:any,
    end:any,
}
export interface courses{
    title:string,
    organization:string,
    hours:number,
}