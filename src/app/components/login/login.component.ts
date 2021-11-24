import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import * as firebase from 'firebase/compat';
import { Userinfo } from 'src/app/user-auth/models/userinfo';
import { FirebaseService } from 'src/app/user-auth/services/firebase.service';
import firebase from 'firebase/compat/app';
import { UserService } from 'src/app/services/user.service'
import { Covid19VerificationService } from 'src/app/services/covid19-verification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  log:boolean=false;
  constructor(public firebaseService : FirebaseService, private router: Router, public userService : UserService, public cvs:Covid19VerificationService) { }
 
  register()
  {
    this.router.navigate(['registration']);
  }

  onSignin(email : string, password : string)
  {
    console.log('sign in');
    this.firebaseService.login(email, password).subscribe(
      res=> {
        console.log(res);
        const userData = JSON.parse(localStorage.getItem('userinfo') || '{}');
        // get custom claims to find role
        this.cvs.getFormServByString(userData.id).subscribe(
          data=>{
            console.log(JSON.stringify(data));

            let dataArray= Object.values(data);
            console.log(dataArray);
            console.log(dataArray[3]);
            if(dataArray[3]==true){
              console.log("hello");
              this.router.navigate(['lockout']);

            }
            
            else{
            let now = new Date().getTime();
            let date = new Date(dataArray[2]).getTime();
            console.log(now-date)
            if ((now - date) < 86400000){
              this.userService.getUser(userData.id).subscribe(
                data =>{
                  console.log(JSON.stringify(data));
                  if(data.role.role=='nurse'){
                    // nurseUI()
                    this.router.navigate(['nurse']);
                  }else if(data.role.role=='doctor'){
                    // doctorUI()
                    this.router.navigate(['doctor']);
                  }else{
                    // user does not have a role / could not find users role
                    console.error('this user does not have a role');
                  }
                }
              )
            
            }
            else{
              this.router.navigate(['/covid-verification']);
            }}
          }
        )
        // this.userService.getUser(userData.id).subscribe(
        //   data =>{
        //     console.log(JSON.stringify(data));
        //     if(data.role.role=='nurse'){
        //       // nurseUI()
        //       this.router.navigate(['nurse']);
        //     }else if(data.role.role=='doctor'){
        //       // doctorUI()
        //       this.router.navigate(['doctor']);
        //     }else{
        //       // user does not have a role / could not find users role
        //       console.error('this user does not have a role');
        //     }
        //   }
        // )
      
        // this.router.navigate([whichPage]);
      }
    )
  }
  

  logout()
  {
    this.firebaseService.logout();
  }

  //dummy example of sending an http request requiring an authorization header
  getUser()
  {
    this.firebaseService.gettest().subscribe(data=>{
      console.log(data);
    })
  }


  ngOnInit(): void {
    this.log = localStorage.getItem('userinfo') != null;
    //this.firebaseService.logout();
  }

  refreshToken()
  {
    this.firebaseService.refreshToken().subscribe(()=>{
      console.log("refreshed token");
    });
  }

}