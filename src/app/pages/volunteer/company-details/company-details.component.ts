import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { organization } from 'src/app/lib/inteerfaces/organization';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { UserService } from 'src/app/lib/services/user/user.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent  {
  organization$!: Observable<organization | undefined>;
  id!: string;
  constructor(private route: ActivatedRoute, 
    private userservice: UserService,
    private router: Router){
      this.organization$ = this.route.paramMap.pipe(

    switchMap((value)=> {
      this.id = value.get('id')+'';
      console.log(this.id);

      return this.userservice.getuserById(this.id);


    
    }

    )
  )}

}
