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
      mlPrice: new FormControl(''),
      _205: new FormControl(''),
      priceDelta: new FormControl(''),
      column1: new FormControl(''),
      priceDelta1: new FormControl(''),
      result: new FormControl('', Validators.required),
      firstHalfResult: new FormControl('', Validators.required),
      finalScore: new FormControl('', Validators.required),
      shots: new FormControl(''),
      sog: new FormControl(''),
      dangerousAttacks: new FormControl(''),
      attacks: new FormControl(''),
      acr: new FormControl(''),
      possession: new FormControl(''),
      cardCount: new FormControl(''),
      scoreFirstYN: new FormControl('', Validators.required),
      leagueTournament: new FormControl(''),
      redCardYN: new FormControl(''),
      clw: new FormControl(''),

      //add'1' for radio button, add integer for drop down menu selector
    });
  }
  initializeFormGroup(form: FormGroup) {
    form.setValue({
      id: null,
      team1: '',
      team2: '',
      date: '',
      mlPrice: '',
      _205: '',
      priceDelta: '',
      column1: '',
      priceDelta1: '',
      result: '',
      firstHalfResult: '',
      finalScore: '',
      shots: '',
      sog: '',
      dangerousAttacks: '',
      attacks: '',
      acr: '',
      possession: '',
      cardCount: '',
      scoreFirstYN: '',
      leagueTournament:'',
      redCardYN:'',
      clw:''
      //add'1' for radio button, add integer for drop down menu selector
    });
    return form;
  }
}
