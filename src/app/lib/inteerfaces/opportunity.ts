export interface opportunity {
  id?: string;
  userid?: string;
  name: string;
  description: string;
  skills: string[];
  range: range;
  numberOfVolunteers: number;
  companyName?: string;
  companyLogo?: string;
  companyType?: string;
  numberOfApplicants: number;
  active: boolean;
  applicantsIds: string[];
}

export interface range {
  start: any;
  end: any;
}
