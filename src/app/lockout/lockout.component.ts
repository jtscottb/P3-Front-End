import { getLocaleDateFormat, getLocaleTimeFormat, Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Covid19VerificationModel } from '../models/covid19-verification-model';
import { Covid19VerificationService } from '../services/covid19-verification.service';

@Component({
  selector: 'app-lockout',
  templateUrl: './lockout.component.html',
  styleUrls: ['./lockout.component.css']
})
export class LockoutComponent implements OnInit {

  public userId:number = 1;
  public time:any='';
  
  constructor(private cvs:Covid19VerificationService) { 
    window.setInterval(() => this.setTime(),1000);
  }

  ngOnInit(): void {
    this.getTimestamp();
  }

    // Update the count down every 1 second

  setTime() {
    let countDownDate = this.time.getTime()+1209600000;
    //let countDownDate = new Date(month+day+year+"08:00:00").getTime();
    let now = new Date().getTime();
    console.log(countDownDate)
console.log(now)
    let distance = countDownDate - now;
    console.log(distance)
  
    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  

    document.getElementById("timer")!.innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
  
    // If the count down is finished, write some text
    if (distance < 0) {
      document.getElementById("timer")!.innerHTML = "EXPIRED";
    };
 
}

  getTimestamp() {
    this.cvs.getFormServ(2).subscribe((data: Object) => {
      console.log(Object.values(data))
      let dateArray:any[] = Object.values(data);
      let dateTime=dateArray[1];
      let date = new Date(dateTime);
      this.time = date;
console.log(this.time)

    })
  }
}








