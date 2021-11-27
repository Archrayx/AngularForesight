import { Injectable, OnInit,  } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SoccerTrackerApiService implements OnInit {

  baseUrl: string = "http://localhost:325/api/"
  // baseUrl: string = "http://73.198.21.178:325/api/";
  ipAddress = '';
  constructor(public http: HttpClient) { }

  form:FormGroup = new FormGroup({
    id: new FormControl(null),
    Team_1: new FormControl('', Validators.required),
    Team_2: new FormControl('', Validators.required),
    Date: new FormControl(''),
    ML_Price: new FormControl(''),
    C_205: new FormControl(''),
    Price___delta: new FormControl(''),
     Column1: new FormControl(''),
     Price_Delta: new FormControl(''),
    Result: new FormControl('', Validators.required),
    First_Half_Result: new FormControl('', Validators.required),
    Final_Score: new FormControl('', Validators.required),
    Shots: new FormControl(''),
    SOG: new FormControl(''),
    Dangerous_Attacks: new FormControl(''),
    Attacks: new FormControl(''),
    ACR: new FormControl(''),
    Possession: new FormControl(''),
    Card_Count: new FormControl(''),
    Score_First___Yes_No_: new FormControl('', Validators.required),
    //add'1' for radio button, add integer for drop down menu selector
  });

  initializeFormGroup(){
    this.form.setValue({
      id: null,
      Team_1: '',
      Team_2: '',
      Date: '',
      ML_Price: '',
      C_205: '',
       Price___delta: '',
       Column1: '',
      Price_Delta: '',
      Result: '',
      First_Half_Result: '',
      Final_Score: '',
      Shots: '',
      SOG: '',
      Dangerous_Attacks: '',
      Attacks: '',
      ACR: '',
      Possession: '',
      Card_Count: '',
      Score_First___Yes_No_: '',
      //add'1' for radio button, add integer for drop down menu selector
    });

  }
  ngOnInit() {


}

  listEntry(): Observable<any> {


    return this.http.get(this.baseUrl + "allsoccerTrackers").pipe(catchError((err) => {
      const error = new Error(err);
      throwError(() => {error})
      console.log('error caught in service')
      console.error(err);
      //Handle the error here
      return throwError(error);    //Rethrow it back to component
    }))
  }

  //create new item
  getEntry(id: any): any {
    return this.http.get(`${this.baseUrl}SoccerTracker/${id}`)
  }

  create(data: any): void {
    this.http.post(`${this.baseUrl}addsoccerTracker`, data).subscribe(data => {
      console.log(data);
    });
  }

  update(id: any, data: any): void {
    this.http.put(`${this.baseUrl}updatesoccerTracker/${id}`, data).subscribe(data => {
      console.log(data);
    });
  }

  delete(id: any): void {
    console.log(this.baseUrl + "api/deletequote/" + id);
    this.http.delete(`${this.baseUrl}deletesoccerTracker/${id}`).subscribe(data => {
      console.log(data);
    });
  }



}
