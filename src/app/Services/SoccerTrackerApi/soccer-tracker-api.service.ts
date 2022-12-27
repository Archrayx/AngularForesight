import { Injectable, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FormGroupService } from './formGroup.service';
import { SoccerModel } from 'src/app/Classes/soccer-model';
@Injectable({
  providedIn: 'root',
})
export class SoccerTrackerApiService implements OnInit {
  private subject = new BehaviorSubject([]);
  remoteData$ = this.subject.asObservable();

  baseUrl: string = 'https://localhost:7073/api/';
  baseUrl_2: string = 'http://73.198.21.178:325/api/';
  ipAddress = '';
  form: FormGroup;

  constructor(public http: HttpClient, private ApiFormGroup: FormGroupService) {
    this.form = this.ApiFormGroup.newFormGroup();
  }
  ngOnInit() {
    this.loadAllEntry();
  }

  private loadAllEntry() {
    const loadCourses$ = this.http.get<SoccerModel[]>(this.baseUrl + 'allSoccerTrackers').pipe(
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
        this.subject.next(x);
      })
    );

    loadCourses$.subscribe();
  }

  listEntry(): Observable<SoccerModel[]> {
    return this.http.get<SoccerModel[]>(this.baseUrl + 'allSoccerTrackers').pipe(
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
  getEntry(id: number): Observable<SoccerModel> {
    return this.http.get<SoccerModel>(`${this.baseUrl}SoccerTracker/${id}`);
  }

  create(data: SoccerModel): void {
    this.http
      .post(`${this.baseUrl}addSoccerTracker`, data)
      .subscribe((data) => {
        console.log(data);
      });
  }

  update(id: number, data: any): void {
    this.http
      .put(`${this.baseUrl}updateSoccerTracker/${id}`, data)
      .subscribe((data) => {
        console.log(data);
      });
  }

  delete(id: number): void {
    console.log(this.baseUrl + 'api/deletequote/' + id);
    this.http
      .delete(`${this.baseUrl}deleteSoccerTracker/${id}`)
      .subscribe((data) => {
        console.log(data);
      });
  }

  initializeFormGroup() {
    this.form = this.ApiFormGroup.initializeFormGroup(this.form);
  }
}
