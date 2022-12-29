import { FilterItem } from './../../Classes/filter-item';
import { FilterRangeComponent } from './../FilterRangeComponent/filter-range.component';
import { SoccerModel } from '../../Classes/soccer-model';
import { Observable, BehaviorSubject } from 'rxjs';
import { SoccerTrackerApiService } from '../../Services/SoccerTrackerApi/soccer-tracker-api.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddItemComponent } from '../AddItemComponent/add-item.component';
import { UpdateItemComponent } from '../UpdateItemComponent/update-item.component';
import { MatTableFilter } from 'mat-table-filter';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/Services/AuthService/auth.service';
import { DashboardControllerService } from 'src/app/Services/DashboardServices/dashboard-controller.service';
import { ColorPalleteService } from 'src/app/Services/DashboardServices/ColorPallete.service';
import { MatDrawer } from '@angular/material/sidenav';
const CACHE_KEY = 'dashboard_key';

@Component({
  selector: 'app-home-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [SoccerTrackerApiService],
})
export class DashboardComponent implements OnInit {
  //Sets up Variable that will be used through the component methods
  filterValues: any = {};
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //data source for mat-table
  repo?: Observable<SoccerModel[]>;
  dashBoardData: MatTableDataSource<SoccerModel> | undefined;
  displayedColumns : string[] = [];
  filterFormsObject: FilterItem[];
  ColumnsForm : FormGroup;


  //is Atuhenticated for Action Column

  isAuthenticated = true;

  /*Sets up and array of customizable entries which is used for setting up matTable headers,column rows, forms and
  any other future properties the table or component might need in regards to dataSource property matching.
   helps with matching mat-cell values with that in dataSource properties per entry, sets value for header placeholder, form control per header,
   and filter list options by unique value( currently disable at the bottom of this file) */
  constructor(
    public authService: AuthService,
    public service: SoccerTrackerApiService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private datePipe: DatePipe,
    private dashboardController: DashboardControllerService,
    private colorPalletes: ColorPalleteService
  ) {
    this.filterFormsObject = this.dashboardController.filterObjGenerate();
    this.ColumnsForm = this.setColumnForm()

  }

  //calls generate and createDisplayedColumns method
  async ngOnInit() {
    this.getRemoteData();
    // this.refresh();
    // this.isAuthenticated = await this.authService.checkAuthenticated();
    //this.checkIP();
  }
  //method that generates displayed columns on table which references object in filterSelectObject in constructor
  //it is done by calling each index in variable and taking the 'key' property as reference for table column matching
  //also since this is used onInit, it calls the filter method of dataSource which it uses based on filterValues array
  //being generated on value change. it creates key and value on valueChange the filters accourdingly. (look at createFilter for how its filtered)
  //
  //Calls to Assign dataSource for matTable. includes value transformations for specific columns
  async getRemoteData() {
    if (localStorage[CACHE_KEY] != undefined) {
      const itemVal = new BehaviorSubject(localStorage.getItem(CACHE_KEY));
      itemVal.subscribe((x: any) => {
        console.log('using Cache');
        this.assignMatTableProperties(JSON.parse(x));
        this.createDisplayedColumns();
      });
    } else {
      this.repo = this.service.listEntry();
      this.repo.subscribe({
        next:
        (x: SoccerModel[]) => {
          //Retrieves remote data and assigns it to var remote data
          this.dataManipulate(x);
          this.createDisplayedColumns();
        },
        error : (error: any) => {
          //Error callback
          console.error('error caught in component');
          let errorMessage = error;
          let loading = false;
        },
        complete: () => {}
      }
      );
    }
  }
  setSubscribers(){
    this.filterFormsObject.forEach((item, index) => {
      // console.log(this.ColumnsForm.controls[item.key].value)

      if (index == 3 || index == 4)
      {
        item.form.
        valueChanges.subscribe
        (
          (name: any) =>
          {
            console.log(name)
            this.filterValues[this.filterFormsObject[index].key] = name;
            if (this.dashBoardData)
              this.dashBoardData.filter = JSON.stringify(this.filterValues)
          }
        );

        item.RangeForm
        .get('Min')!
        .valueChanges.subscribe
        (
          (name: any) =>
          {
            if(this.dashBoardData)
            this.dashBoardData.filter = JSON.stringify(this.filterValues);
          }
        )

        item.RangeForm
        .get('Max')!
        .valueChanges.subscribe
        (
          (name: any) =>
          {
            if(this.dashBoardData)
            this.dashBoardData.filter = JSON.stringify(this.filterValues);
          }
        );

      }
      else {
        item.form.valueChanges.subscribe((name: any) => {
          this.filterValues[item.key] = name;
          this.dashBoardData!.filter = JSON.stringify(this.filterValues);
        });
      }
    });
  }
  //custom cells func
  createDisplayedColumns() {
    this.setSubscribers();
   this.displayedColumns = this.filterFormsObject.filter(cd => !cd.hide.value).map(cd => cd.key);
    if (this.isAuthenticated) {
      this.displayedColumns.push('Actions')
    }
  }

  updateDisplayedColumns( item : FilterItem, event?: any){
    item.hide.setValue(event.checked)
    this.createDisplayedColumns();
  }
  setColumnForm() : FormGroup
  {
    let form : FormGroup = new FormGroup({})
    this.filterFormsObject.forEach(item => form.addControl(item.key, item.hide))
    return form
  }
  dataManipulate(x: SoccerModel[]) {
    const remoteData: SoccerModel[] = x;
    let vals = ['T', 'F'];

    //when objects are recieved, transformation are done to the data of ACR, Price_Delta, and Date using foreach item in remoteData
    //this allows proper string representation to be shown on table
    Object.keys(remoteData).forEach((key, index ) => {
      let TF = {
        TournamentGameColor: vals[Math.floor(Math.random() * vals.length)],
        redCardYN: vals[Math.floor(Math.random() * vals.length)],
      };
      if (remoteData[index].result != null) {
        remoteData[index].resultColor = this.colorPalletes.resultColorPallete(
          remoteData[index].result
        );
      }
      if (remoteData[index].firstHalfResult != null) {
        remoteData[index].resultColorFH = this.colorPalletes.resultColorPallete(
          remoteData[index].firstHalfResult
        );
      }

      if (remoteData[index].leagueTournament == null) {
        remoteData[index].Team1GameColor = this.colorPalletes.teamColorPallete(
          TF
          //remoteData[index].leagueTournament
        );
      }
      if (remoteData[index].leagueTournament == null) {
        remoteData[index].Team2GameColor = this.colorPalletes.teamColorPallete(
          TF
          //remoteData[index].leagueTournament
        );
      }
      if (remoteData[index].redCardYN == null) {
        remoteData[index].FinalScoreColor =
          this.colorPalletes.finalScoreColorPallete(
            TF,
            //remoteData[index].leagueTournament
          );
      }

    });
    this.assignMatTableProperties(remoteData);
  }

  async assignMatTableProperties(remoteData: SoccerModel[]) {
    console.log('assigning Table Properties...');
    this.dashBoardData = new MatTableDataSource(remoteData);
    this.dashBoardData.sort = this.sort;
    this.dashBoardData.paginator = this.paginator;
    this.dashBoardData.filterPredicate = this.createFilter();
    console.log('done Assigning table Properties...');
  }

  /**
  * METHOD THAT RESETS FILTERED ITEMS IN FITLER FORMS OBJECT
  *   1.) BY SETTINGTHE VALUES BACK TO THERE INITIALIZED VALUE
  *   2.) THROWS ERROR IF IT FAILS
  */
  resetFilters() {
    this.filterValues = {};
    this.filterFormsObject.forEach((value, index) => {
      value.form.reset();
      if(index == 3 || index == 4){
      value.RangeForm.get('Min')!.setValue(-10000);
      value.RangeForm.get('Max')!.setValue(10000);}

    });
    try{
      if(this.dashBoardData)
        this.dashBoardData.filter = '';
      else
        throw "problem in reseting filter";
    }
    catch(e){
      console.error(e);
    }
  }

  /**
   * METHOD ATTACHED TO DOM BUTTON ICON THAT PROMPTS THE USER IF THEY WOULD LIKE TO DELETE AN ENTRY ROW
   * 1.) USES SOCCER TRACKER SERVICE TOSENDS AN API CALL TO BACKEND THAT DELETES THE ENTITY FROM THE DATABASE
   * 2.) HAS DOUBLE VERIFICATION TO ENSURE THE USER WOULD LIKE TO SEND THE API REQUEST TO DELETE ROW
  */
  deleteEntry(id: any) {
    if (confirm('Are you Sure You Want To Delete Entry ' + id)) {
      this.service.delete(id.id);
    }
  }

  /**
   * METHOD ATTACHED TO DOM BUTTON, IN SIDE MAT MENU, THAT DISPLAYS A FORMS PAGE FOR SOCCER MODEL
   * 1.) FORM PAGE THAT USERS CAN FILL OUT TO GENERATE A SOCCER MODEL OBJECT
   * 2.) GENERATED FORM IS USED TO SEND A SOCCER TRACKER SERVICE 'POST' REQUEST
   * 3.) DATA SUBMITTED IS SENT TO BACK END TO SAVE INTO DATABASE
   * 4.) ROUTED TO ADDITEMCOMPONENT
   */
  openDialogAdd() {
    this.service.form.reset;
    this.service.initializeFormGroup();
    this.dialog.open(AddItemComponent, {
      height: 'auto',
      width: '60%',
    });
  }

  /**
   * METHOD ATTACHED TO DOM BUTTON ICON TO UPDATE AN ENTITY WITH NEW VALUES
   *  1.)USES THE SERVICE FORM TO GENERATE A POPULATED FORM GROUP WITH ALL VALUES FROM
   *    THE ROW SELECTED TO UPDATE
   *  2.) OPENS A DIALOG MENU THAT CONTAINS FIELDS BINDED TO DATA PROPERTIES FROM THE ROW SELECTED TO UPDATE
   *  3.)USES THE SERVICE FORM KEY AS THE KEY FOR THE FORM CONTROL TO LOCATE AND POPULATE
   *  4.) PASSES THE SERVICE FORM AS A THE DATA VALUE
   *  5.) BINDED TO THE UpdateItemComponent
  */
  openDialogUpdate(item: any) {
    Object.keys(this.service.form.controls).forEach((key, index) => {
      if (key == "date"){
        this.service.form.patchValue ({[key]: new Date(item[key])})
      }
      else{
        this.service.form.patchValue({ [key]: item[key] });
      }
    });
    this.dialog.open(UpdateItemComponent, {
      height: 'auto',
      width: '70%',
      data: this.service.form,
    });
  }

  /*
  OPENS THE FILTER RANGE MENU OPTION WITHIN THE MAT SIDE MENU
    1.) PASSES THE FILTER FORM LIST AND DATA SOURCE DATA ALONG WITH
        THE PROPERTIES OF THE MENU SIZE THAT IS TO BE OPENED
    2.) DATA BINDS THE DATA BACK TO DASHBOARD COMPONENT
    3.) BINDED TO FilterRangeComponent
 */
    openFilterRangeMenu(drawer : MatDrawer) {
      drawer.close();
      const config = new MatDialogConfig();
      const data = {
        filterItems: {
          type : 'FilterItem[]',
          value : this.filterFormsObject
        },
        data : {
          type : 'MatTableDataSource<SoccerModel> | undefined',
          value : this.dashBoardData
        }
      };
      this.dialog.open(FilterRangeComponent, {
        height: 'auto',
        width: '60%',
        data : data
      });
    }

  refresh() {
    this.getRemoteData();
    this.changeDetectorRefs.detectChanges();
  }

  checkIP() {
    this.service.http
      .get('http://api.ipify.org/?format=json')
      .subscribe((res: any) => {
        this.service.ipAddress = res.ip;
        if (this.service.ipAddress != '73.198.21.178') {
          this.service.baseUrl = this.service.baseUrl_2;
        }
      });
  }

  /*VERY IMPORTANT! DO NOT TOUCH THIS CODE UNLESS ABSOLUTELY NECESSARY */
  //filter Predicate used for filtering. checks generated filterValues on valueChange to filter per Column.
  //Match Case For all columns that wish to be filtered
  createFilter() {
    return (data: any, filter: any): boolean => {
      let searchTerms = JSON.parse(filter);
      //goes through the filter range form with the specific index of the columns to determine if the row meets filter condition
      for (let index = 0; index < this.filterFormsObject.length; index++){

        if(index == 3 || index == 4){
        if(this.filterFormsObject[index].RangeForm.value.Min != undefined || this.filterFormsObject[index].RangeForm.value.Max != undefined){
            if(
              +data[this.filterFormsObject[index].key] < this.filterFormsObject[index].RangeForm.value.Min ||
              +data[this.filterFormsObject[index].key] > this.filterFormsObject[index].RangeForm.value.Max){
                return false;
              }
            }
          }
        }
      for (var property in searchTerms) {
        //checks for a property in search property AND if there is a value in said filter array
        if (searchTerms.hasOwnProperty(property) && searchTerms[property]) {
          //first check to see if values are null or undefined if so return false for that entry
          if (data[property] == null || data[property] == undefined) {
            return false;
          }
          /*
            if values exist on property, then check if a match is present,
            which if not then return false else return true to pop item into filtered table
          */
          if (
            data[property]
              .toString()
              .toLowerCase()
              .indexOf(searchTerms[property].toString().toLowerCase()) === -1
          ) {
            return false;
          }
        }
      }
      return true;
    };
  }
}




