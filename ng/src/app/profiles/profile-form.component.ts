import { Component, OnInit} from '@angular/core';
import { Profile } from '../models/profile';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfilesService } from '../services/profiles.service';
import { NgForm, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './profile-form.component.html',
})
export class ProfileFormComponent implements OnInit {
  profile: Profile = new Profile()
  constructor(private profilesService: ProfilesService, 
    private route : ActivatedRoute, 
    private router : Router, private toastr : ToastrService, private http: HttpClient) { }

  ngOnInit() {
    let bid = this.route.snapshot.params['id']
    if(bid !== undefined){
      this.profilesService.getProfile(bid).subscribe( orig => Object.assign(this.profile, orig))
    }
  }
 

  

  onSubmit(f: NgForm){
    if(f.valid){
      if(this.profile._id === undefined){
        this.profilesService.createProfile(this.profile).subscribe(res => {
          this.profile = res
          this.toastr.success("The profile was successfully created.")
        })
      }else{
        this.profilesService.updateProfile(this.profile).subscribe(res => {
          this.profile = res
          this.toastr.success("The profile was successfully updated.")
        })
      }

      this.router.navigate(['/profiles'])
    } else {
      for(let c in f.controls){
        f.controls[c].markAsDirty()
      }
    }
  }

}
