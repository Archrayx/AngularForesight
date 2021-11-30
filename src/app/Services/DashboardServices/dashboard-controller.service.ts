import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DashboardControllerService {
  constructor() {}

  filterObjGenerate() {
    return [
      // {
      //   key: "id",
      //   header: "Entry#",
      //   search: "",
      //   filterOptions: [],
      //   form: new FormControl('')
      // },

      {
        key: 'Team_1',
        header: 'Team 1',
        search: '',
        filterOptions: [],
        form: new FormControl(''),
      },
      {
        key: 'Team_2',
        header: 'Team 2',
        search: '',
        filterOptions: [],
        form: new FormControl(''),
      },
      {
        key: 'Date',
        header: 'Date',
        search: '',
        filterOptions: [],
        form: new FormControl(''),
      },
      {
        key: 'ML_Price',
        header: 'ML Price',
        search: '',
        filterOptions: [],
        form: new FormControl(''),
        formGroup: new FormGroup({
          MLMin: new FormControl(),
          MLMax: new FormControl(),
        }),
      },
      {
        key: 'C_205',
        header: 'K.O Price',
        search: '',
        filterOptions: [],
        form: new FormControl(''),
      },
      // {
      //   key: "Price___delta",
      //   header: "Price%Delta",
      //   search: "",
      //   filterOptions: []
      // },
      // {
      //   key: "Column1",
      //   header: "Column 1",
      //   search: "",
      //   filterOptions: []
      // },
      {
        key: 'Price_Delta',
        header: 'Price Delta',
        search: '',
        filterOptions: [],
        form: new FormControl(''),
      },
      {
        key: 'Result',
        header: 'Result',
        search: '',
        filterOptions: [],
        form: new FormControl(''),
        trueVal: Number,
        Colors: [
          { none: 'white' },
          { L: 'red' },
          { W: 'green' },
          { Tied: 'yellow' },
        ],
      },
      {
        key: 'First_Half_Result',
        header: 'First Half Result',
        search: '',
        filterOptions: [],
        form: new FormControl(''),
        trueVal: Number,
        Colors: [
          { none: 'white' },
          { L: 'red' },
          { W: 'green' },
          { Tied: 'yellow' },
        ],
      },
      {
        key: 'Final_Score',
        header: 'Final Score',
        search: '',
        filterOptions: [],
        form: new FormControl(''),
      },
      {
        key: 'Shots',
        header: 'Shots',
        search: '',
        filterOptions: [],
        form: new FormControl(''),
      },
      {
        key: 'SOG',
        header: 'SOG',
        search: '',
        filterOptions: [],
        form: new FormControl(''),
      },
      {
        key: 'Dangerous_Attacks',
        header: 'Dangerous Attacks',
        search: '',
        filterOptions: [],
        form: new FormControl(''),
      },
      {
        key: 'Attacks',
        header: 'Attacks',
        search: '',
        filterOptions: [],
        form: new FormControl(''),
      },
      {
        key: 'ACR',
        header: 'ACR',
        search: '',
        filterOptions: [],
        form: new FormControl(''),
      },
      {
        key: 'Possession',
        header: 'Possession',
        search: '',
        filterOptions: [],
        form: new FormControl(''),
      },
      {
        key: 'Card_Count',
        header: 'Card Count',
        search: '',
        filterOptions: [],
        form: new FormControl(''),
      },
      {
        key: 'Score_First___Yes_No_',
        header: 'Score First(Y/N)',
        search: '',
        filterOptions: [],
        form: new FormControl(''),
      },
    ];
  }
}
