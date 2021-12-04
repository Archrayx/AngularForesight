import { Injectable, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FormGroupService } from './formGroup.service';
@Injectable({
  providedIn: 'root',
})
export class SoccerTrackerApiService implements OnInit {
  private subject = new BehaviorSubject([]);
  remoteData$ = this.subject.asObservable();

  baseUrl: string = 'http://localhost:325/api/';
  baseUrl_2: string = 'http://73.198.21.178:325/api/';
  ipAddress = '';
  form: any;

  constructor(public http: HttpClient, private ApiFormGroup: FormGroupService) {
    this.form = this.ApiFormGroup.newFormGroup();
  }
  ngOnInit() {
    this.loadAllEntry();
  }

  private loadAllEntry() {
    const loadCourses$ = this.http.get(this.baseUrl + 'allsoccerTrackers').pipe(
      catchError((err) => {
        const error = new Error(err);
        throwError(() => {
          error;
        });
        console.log('error caught in service');
        console.error(err);
        //Handle the error here
        return throwError(error); //Rethrow it back to component
      }),
      tap((x: any) => {
        console.log('it did something...');
        this.subject.next(x);
      })
    );

    loadCourses$.subscribe();
  }

  listEntry(): Observable<any> {
    return this.http.get(this.baseUrl + 'allsoccerTrackers').pipe(
      catchError((err) => {
        const error = new Error(err);
        throwError(() => {
          error;
        });
        console.log('error caught in service');
        console.error(err);
        //Handle the error here
        return throwError(error); //Rethrow it back to component
      }),
      tap((x: any) => {
        console.log('it did something...');
        this.subject.next(x);
      })
    );
  }

  //create new item
  getEntry(id: any): any {
    return this.http.get(`${this.baseUrl}SoccerTracker/${id}`);
  }

  create(data: any): void {
    this.http
      .post(`${this.baseUrl}addsoccerTracker`, data)
      .subscribe((data) => {
        console.log(data);
      });
  }

  update(id: any, data: any): void {
    this.http
      .put(`${this.baseUrl}updatesoccerTracker/${id}`, data)
      .subscribe((data) => {
        console.log(data);
      });
  }

  delete(id: any): void {
    console.log(this.baseUrl + 'api/deletequote/' + id);
    this.http
      .delete(`${this.baseUrl}deletesoccerTracker/${id}`)
      .subscribe((data) => {
        console.log(data);
      });
  }

  initializeFormGroup() {
    this.form = this.ApiFormGroup.initializeFormGroup(this.form);
  }
}
