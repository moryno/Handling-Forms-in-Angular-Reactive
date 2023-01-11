import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ["Anna", "Chris"];
  
  ngOnInit(){
    this.signupForm =  new FormGroup({
      "userData": new FormGroup({
        "username": new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
       "email": new FormControl(null, [Validators.required, Validators.email], [this.forbiddenEmail]),
      }),
      "gender": new FormControl("male"), 
      "hobbies": new FormArray([])
    })
  }

  onSubmit(){
    console.log(this.signupForm)
  }

  onAddHobbies(){
    const control =  new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get("hobbies")).push(control);
  }
  
  getControls(){
    return (<FormArray>this.signupForm.get("hobbies")).controls;
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean}{
   if(this.forbiddenUsernames.indexOf(control.value) !== -1){
        return {"Name is forbiden": true}
   }
   return null
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise((resolve, reject)=>{
      setTimeout(() => {
        if(control.value === "test@email.com"){
          resolve({"InvalidEmail": true})
        }else{
          resolve(null)
        }
      }, 2000);
    })
    return promise
  }
}
