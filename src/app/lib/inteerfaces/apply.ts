import { range } from "./opportunity";
import { person } from "./person";

export interface apply{
    uid?:string,
    availabledate:range
    whyApply:string,
    VolunteerIn:string,
    userdetails:person,
   state?:MyEnum
        
    }


   export enum MyEnum {
        wait,
        reject,
        approve,
      }