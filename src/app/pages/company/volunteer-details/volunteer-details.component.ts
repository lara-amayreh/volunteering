import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { person } from 'src/app/lib/inteerfaces/person';
import { UserService } from 'src/app/lib/services/user/user.service';

@Component({
  selector: 'app-volunteer-details',
  templateUrl: './volunteer-details.component.html',
  styleUrls: ['./volunteer-details.component.css']
})
export class VolunteerDetailsComponent {
  volunteer$!: Observable<person | undefined>;
  id!: string;
  constructor(private route: ActivatedRoute, 
    private userservice: UserService,
    private router: Router){
      this.volunteer$ = this.route.paramMap.pipe(

    switchMap((value)=> {
      this.id = value.get('id')+'';
      console.log(this.id);

      return this.userservice.getuserById(this.id) ;


    
    }

    )
  )}

}
