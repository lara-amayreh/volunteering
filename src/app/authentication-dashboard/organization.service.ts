import { Injectable } from '@angular/core';
import { organization } from '../inteerfaces/organization';
@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
organizations:organization[]=[];
  constructor() { }
  addOrganization(organaization:organization){
    this.organizations.push(organaization);
  }
  getOrganization():organization[]{
return this.organizations;
  }
}
