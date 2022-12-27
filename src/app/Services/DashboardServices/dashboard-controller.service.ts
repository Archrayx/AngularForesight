import { FilterItem } from './../../Classes/filter-item';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RangeFormModel } from 'src/app/Classes/range-form-model';


//This File is to add Columns to the table, the tables auto fix to fit in size
//keys name must match api key values
@Injectable({
  providedIn: 'root',
})
export class DashboardControllerService {
  constructor() {}

  filterObjGenerate() : FilterItem[]{
    return [
      // {
      //   key: "id",
      //   header: "Entry#",
      //   search: "",
      //   filterOptions: [],
      //   form: new FormControl('')
      // },

      {
        key: 'team1',
        header: 'Team 1',
        search: '',
        filterOptions: [],
        RangeForm : new FormGroup({}),
        form: new FormControl(''),
        hide: new FormControl(false),
      },
      {
        key: 'team2',
        header: 'Team 2',
        search: '',
        filterOptions: [],
        RangeForm : new FormGroup({}),
        form: new FormControl(''),
        hide: new FormControl(false),
      },
      {
        key: 'date',
        header: 'Date',
        search: '',
        filterOptions: [],
        RangeForm : new FormGroup({}),
        form: new FormControl(''),
        hide: new FormControl(false),
      },
      {
        key: 'mlPrice',
        header: 'ML Price',
        search: '',
        filterOptions: [],
        form: new FormControl(''),
        RangeForm : new RangeFormModel().RangeForm(),
        hide: new FormControl(false),
      },
      {
        key: '_205',
        header: 'K.O Price',
        search: '',
        filterOptions: [],
        RangeForm : new RangeFormModel().RangeForm(),
        form: new FormControl(''),
        hide: new FormControl(false),
      },
      // {
      //   key: "priceDelta1",
      //   header: "Price%Delta",
      //   search: "",
      //   filterOptions: []
      // },
      // {
      //   key: "column1",
      //   header: "Column 1",
      //   search: "",
      //   filterOptions: []
      // },
      {
        key: 'priceDelta1',
        header: 'Price Delta',
        search: '',
        filterOptions: [],
        RangeForm : new FormGroup({}),
        form: new FormControl(''),
        hide:  new FormControl(false),
      },
      {
        key: 'result',
        header: 'Result',
        search: '',
        filterOptions: [],
        RangeForm : new FormGroup({}),
        form: new FormControl(''),
        Colors: [
          { none: 'white' },
          { L: 'red' },
          { W: 'green' },
          { Tied: 'yellow' },
        ],
        hide: new FormControl(false),
      },
      {
        key: 'firstHalfResult',
        header: 'First Half Result',
        search: '',
        filterOptions: [],
        RangeForm : new FormGroup({}),
        form: new FormControl(''),
        Colors: [
          { none: 'white' },
          { L: 'red' },
          { W: 'green' },
          { Tied: 'yellow' },
        ],
        hide: new FormControl(false),
      },
      {
        key: 'finalScore',
        header: 'Final Score',
        search: '',
        filterOptions: [],
        RangeForm : new FormGroup({}),
        form: new FormControl(''),
        hide: new FormControl(false),
      },
      {
        key: 'shots',
        header: 'Shots',
        search: '',
        filterOptions: [],
        RangeForm : new FormGroup({}),
        form: new FormControl(''),
        hide: new FormControl(false),
      },
      {
        key: 'sog',
        header: 'SOG',
        search: '',
        filterOptions: [],
        RangeForm : new FormGroup({}),
        form: new FormControl(''),
        hide: new FormControl(false),
      },
      {
        key: 'dangerousAttacks',
        header: 'Dangerous Attacks',
        search: '',
        filterOptions: [],
        RangeForm : new FormGroup({}),
        form: new FormControl(''),
        hide: new FormControl(false),
      },
      {
        key: 'attacks',
        header: 'Attacks',
        search: '',
        filterOptions: [],
        RangeForm : new FormGroup({}),
        form: new FormControl(''),
        hide: new FormControl(false),
      },
      {
        key: 'acr',
        header: 'ACR',
        search: '',
        filterOptions: [],
        RangeForm : new FormGroup({}),
        form: new FormControl(''),
        hide: new FormControl(false),
      },
      {
        key: 'possession',
        header: 'Possession',
        search: '',
        filterOptions: [],
        RangeForm : new FormGroup({}),
        form: new FormControl(''),
        hide: new FormControl(false),
      },
      {
        key: 'cardCount',
        header: 'Card Count',
        search: '',
        filterOptions: [],
        RangeForm : new FormGroup({}),
        form: new FormControl(''),
        hide: new FormControl(false),
      },
      {
        key: 'scoreFirstYN',
        header: 'Score First(Y/N)',
        search: '',
        filterOptions: [],
        RangeForm : new FormGroup({}),
        form: new FormControl(''),
        hide: new FormControl(false),
      },
      {
        key: 'leagueTournament',
        header: 'League',
        search: '',
        filterOptions: [],
        RangeForm : new FormGroup({}),
        form: new FormControl(''),
        hide: new FormControl(true),
      },
      {
        key: 'redCardYN',
        header: 'Red Card',
        search: '',
        filterOptions: [],
        RangeForm : new FormGroup({}),
        form: new FormControl(''),
        hide: new FormControl(true),
      },
      {
        key: 'clw',
        header: 'TW',
        search: '',
        filterOptions: [],
        RangeForm : new FormGroup({}),
        form: new FormControl(''),
        hide: new FormControl(true),
      },
    ];
  }
}
