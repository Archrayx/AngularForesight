import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

//this is to create a form group aka the properties of the columns that come from the api
@Injectable({
  providedIn: 'root',
})
export class FormGroupService {
  constructor() {}

  newFormGroup() {
    return new FormGroup({
      id: new FormControl(null),
      team1: new FormControl('', Validators.required),
      team2: new FormControl('', Validators.required),
      date: new FormControl(''),
      mlPrice: new FormControl(0),
      _205: new FormControl(0),
      priceDelta: new FormControl(0),
      column1: new FormControl(0),
      priceDelta1: new FormControl(0),
      result: new FormControl('', Validators.required),
      firstHalfResult: new FormControl('', Validators.required),
      finalScore: new FormControl('', Validators.required),
      shots: new FormControl(0),
      sog: new FormControl(0),
      dangerousAttacks: new FormControl(0),
      attacks: new FormControl(0),
      acr: new FormControl(0),
      possession: new FormControl(0),
      cardCount: new FormControl(0),
      scoreFirstYN: new FormControl('', Validators.required),
      leagueTournament: new FormControl(''),
      redCardYN: new FormControl(''),
      clw: new FormControl(''),

      //add'1' for radio button, add integer for drop down menu selector
    });
  }
  initializeFormGroup(form: FormGroup): FormGroup {
    form.setValue({
      id: null,
      team1: '',
      team2: '',
      date: '',
      mlPrice: 0,
      _205: 0,
      priceDelta: 0,
      column1: 0,
      priceDelta1: 0,
      result: '',
      firstHalfResult: '',
      finalScore: '',
      shots: 0,
      sog: 0,
      dangerousAttacks: 0,
      attacks: 0,
      acr: 0,
      possession: 0,
      cardCount: 0,
      scoreFirstYN: '',
      leagueTournament:'',
      redCardYN:'',
      clw:''
      //add'1' for radio button, add integer for drop down menu selector
    });
    return form;
  }
}
