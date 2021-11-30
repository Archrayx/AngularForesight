import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


interface CacheContent {
  expiry: number;
  value: any;
}
@Injectable({
  providedIn: 'root'
})
export class CacheServiceService {
  private cache: Map<string, CacheContent> = new Map<string, CacheContent>();
  private inFlightObservables: Map<string, Subject<any>> = new Map<string, Subject<any>>();

  constructor() { }
}
