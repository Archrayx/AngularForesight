import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormGroupService {
  constructor() {}

  newFormGroup() {
    return new FormGroup({
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
  }
  initializeFormGroup(form: FormGroup) {
    form.setValue({
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
    return form;
  }
}
