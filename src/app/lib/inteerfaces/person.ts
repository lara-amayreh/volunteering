export interface person {
  id?: string,
  profileImg?: string,
  fullName: string,
  city: string,
  courses: courses[],
  skills: string[],
  phoneNumber: number,
  experience: string,
  range: drange,
  role: string,
  days: string,
}
export interface drange {
  start: any,
  end: any,
}
export interface courses {
  title: string,
  organization: string,
  hours: number,
}
