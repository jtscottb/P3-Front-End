import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8081/'
  })
};

@Injectable({
  providedIn: 'root'
})

export class PatientService {

  private backendUrl = 'http://localhost:8081/wellnet/patient'
  public patient?: Patient;
  constructor(private http: HttpClient/*private patientIn: Patient*/) { 
    //this.patient = patientIn;
  }

  setPatient(){
   // this.patient = this.getPatient("bob", "white", "12-25-00");
  }

  getPatient(firstName: string, lastName: string, dob: Date): Observable<Patient>{
    console.log(this.backendUrl+"?firstname="+firstName+"&lastname="+lastName+"&dob="+dob);
    return this.http.get(this.backendUrl+"?firstname="+firstName+"&lastname="+lastName+"&dob="+dob, httpOptions) as Observable<Patient>;
  }
/*


http://localhost:8081/wellnet/patient?firstname=Captain&lastname=America&dob=1920-03-31


  updatePatient(){
    // put statement
  }

  updateWeight(weight:number){
    this.patient.weight = weight;
    this.updatePatient();
}

updateHeight(height:number):Patient{
   // this.patient.height = height;
   // this.updatePatient();
   // return this.patient;
}

addVaccination(vaccination:object){
 // this.patient.vaccinations?.push(vaccination);
  //this.updatePatient();
}

addAllergy(Allergy:object){
  this.patient.allergies?.push(Allergy);
  this.updatePatient();
}

  // input a diagnosis by a nurse

  // approve/deny/override diagnosis by a doctor

  // prescribe a treatment for a patient 
*/

}
