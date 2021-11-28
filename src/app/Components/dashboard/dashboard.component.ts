import { SoccerModel } from '../../Classes/soccer-model';
import { Observable } from 'rxjs';
import { SoccerTrackerApiService } from '../../Services/soccer-tracker-api.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddItemComponent } from '../add-item/add-item.component';
import { UpdateItemComponent } from '../update-item/update-item.component';
import { MatTableFilter } from 'mat-table-filter';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { AuthService } from 'src/app/Services/AuthService/auth.service';



@Component({
  selector: 'app-home-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //Sets up Variable that will be used through the component methods
  filterValues: any = {};
  @ViewChild(MatSort) sort: MatSort = new MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  //data source for mat-table
  dataSource : any;
  displayedColumns:any[] = [];
  filterSelectObj : any[];
  MLMin: number = -1000;
  MLMax: number = 700;
  MLArray: number[] = [];

 //is Atuhenticated for Action Column

  isAuthenticated = true;

  /*Sets up and array of customizable entries which is used for setting up matTable headers,column rows, forms and
  any other future properties the table or component might need in regards to dataSource property matching.
   helps with matching mat-cell values with that in dataSource properties per entry, sets value for header placeholder, form control per header,
   and filter list options by unique value( currently disable at the bottom of this file) */
  constructor(public authService: AuthService,public service: SoccerTrackerApiService, public dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef, private datePipe : DatePipe) {

    // this.authService.isAuthenticated.subscribe(
    //   (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    // );

    this.filterSelectObj = [
      // {
      //   key: "id",
      //   header: "Entry#",
      //   search: "",
      //   filterOptions: [],
      //   form: new FormControl('')
      // },

      {
        key: "Team_1",
        header: "Team 1",
        search: "",
        filterOptions: [],
        form: new FormControl('')
      },
      {
        key: "Team_2",
        header: "Team 2",
        search: "",
        filterOptions: [],
        form: new FormControl('')
      },
      {
        key: "Date",
        header: "Date",
        search: "",
        filterOptions: [],
        form: new FormControl('')
      },
      {
        key: "ML_Price",
        header: "ML Price",
        search: "",
        filterOptions: [],
        form: new FormControl(''),
        formGroup: new FormGroup({
          MLMin: new FormControl(),
          MLMax: new FormControl()
        })
      },
      {
        key: "C_205",
        header: "K.O Price",
        search: "",
        filterOptions: [],
        form: new FormControl('')
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
        key: "Price_Delta",
        header: "Price Delta",
        search: "",
        filterOptions: [],
        form: new FormControl(''),

      },
      {
        key: "Result",
        header: "Result",
        search: "",
        filterOptions: [],
        form: new FormControl(''),
        trueVal: Number,
        Colors: [{ none: "white" }, { "L": "red" }, { "W": "green" }, { "Tied": "yellow" }]
      },
      {
        key: "First_Half_Result",
        header: "First Half Result",
        search: "",
        filterOptions: [],
        form: new FormControl(''),
        trueVal: Number,
        Colors: [{ none: "white" }, { "L": "red" }, { "W": "green" }, { "Tied": "yellow" }]
      },
      {
        key: "Final_Score",
        header: "Final Score",
        search: "",
        filterOptions: [],
        form: new FormControl('')
      },
      {
        key: "Shots",
        header: "Shots",
        search: "",
        filterOptions: [],
        form: new FormControl('')
      },
      {
        key: "SOG",
        header: "SOG",
        search: "",
        filterOptions: [],
        form: new FormControl('')
      },
      {
        key: "Dangerous_Attacks",
        header: "Dangerous Attacks",
        search: "",
        filterOptions: [],
        form: new FormControl('')
      },
      {
        key: "Attacks",
        header: "Attacks",
        search: "",
        filterOptions: [],
        form: new FormControl('')
      },
      {
        key: "ACR",
        header: "ACR",
        search: "",
        filterOptions: [],
        form: new FormControl('')
      },
      {
        key: "Possession",
        header: "Possession",
        search: "",
        filterOptions: [],
        form: new FormControl('')
      },
      {
        key: "Card_Count",
        header: "Card Count",
        search: "",
        filterOptions: [],
        form: new FormControl('')
      },
      {
        key: "Score_First___Yes_No_",
        header: "Score First(Y/N)",
        search: "",
        filterOptions: [],
        form: new FormControl('')
      }
    ];
   }

  //calls generate and createDisplayedColumns method
  async ngOnInit(): Promise<void> {
    // this.isAuthenticated = await this.authService.checkAuthenticated();
    this.checkIP();
    this.getRemoteData();
    this.refresh();
  }
  //method that generates displayed columns on table which references object in filterSelectObject in constructor
  //it is done by calling each index in variable and taking the 'key' property as reference for table column matching
  //also since this is used onInit, it calls the filter method of dataSource which it uses based on filterValues array
  //being generated on value change. it creates key and value on valueChange the filters accourdingly. (look at createFilter for how its filtered)
  //
  createDisplayedColumns(){
    let tempDisplayedColumns = [];
     Object.keys(this.filterSelectObj).forEach((keys,index) =>{
       if (index == 3){
        //  console.log(keys);
         this.filterSelectObj[index].form.valueChanges.subscribe((name: any) => {
           this.filterValues[this.filterSelectObj[index].key] = name
           this.dataSource.filter = JSON.stringify(this.filterValues)
         })
         this.filterSelectObj[index].formGroup.get("MLMin").valueChanges.subscribe((name: any) => {
           this.dataSource.filter = JSON.stringify(this.filterValues)
         })
         this.filterSelectObj[index].formGroup.get("MLMax").valueChanges.subscribe((name: any) => {
           this.dataSource.filter = JSON.stringify(this.filterValues)
         })
       }
       else{
       this.filterSelectObj[index].form.valueChanges.subscribe((name: any) => {
         this.filterValues[this.filterSelectObj[index].key] = name
         this.dataSource.filter = JSON.stringify(this.filterValues)
       })
      }
       tempDisplayedColumns.push(this.filterSelectObj[index].key)
    })

    if(this.isAuthenticated){
      tempDisplayedColumns.push('Actions')};
      this.displayedColumns = tempDisplayedColumns;
    console.log("new FilterValues:" + this.filterValues + "\nnew DisplayedColumns: " + this.displayedColumns);
  }

//Calls to Assign dataSource for matTable. includes value transformations for specific columns
getRemoteData(){
   this.service.listEntry().subscribe((x) => {
    //Retrieves remote data and assigns it to var remote data
     const remoteData: any[] = x;
     let tempMLArray:number[] = [];
    //when objects are recieved, transformation are done to the data of ACR, Price_Delta, and Date using foreach item in remoteData
    //this allows proper string representation to be shown on table
     Object.keys(remoteData).forEach((key,index) =>{
       //Data Manipulations Area with if statements before inserting into table columns
       if (remoteData[index].ML_Price != null) {

         tempMLArray.push(+remoteData[index].ML_Price);

       }

       if (remoteData[index].Price_Delta != null){

         remoteData[index].Price_Delta = (((remoteData[index].Price_Delta) * 100).toFixed(2)).toString() + "%";
     }
     //
       if (remoteData[index].ACR != null){
       remoteData[index].ACR =  (((remoteData[index].ACR) * 100).toFixed(2)).toString() + "%";
       }
       if (remoteData[index].Date != null) {

         remoteData[index].Date = this.datePipe.transform(remoteData[index].Date, 'MM/dd/yyyy');

       }
       if (remoteData[index].Result != null) {
         remoteData[index].resultColor = this.colorPallete(remoteData[index].Result);
       }
       if (remoteData[index].First_Half_Result != null) {

         //remoteData[index].First_Half_Result = remoteData[index].First_Half_Result.length;
         remoteData[index].resultColorFH = this.colorPallete(remoteData[index].First_Half_Result);
       }
       if (remoteData[index].Possession != null) {

         remoteData[index].Possession = (((remoteData[index].Possession) * 100).toFixed(0)).toString() + "%";
       }
    }
     )
//console.log(remoteData);
    //sets dataSource var as matTableDataSource to be used for mat table
    //commented out call to get filter objects is disabled for feature use with entry listing if need
    //sets filter predicate function return by createFilter method (dug deep on github repo comments for it)
     console.log('remoteData Saved');
     console.log("ML ARRAY:  ", this.MLArray);
     this.MLArray = tempMLArray;
     this.MLMax = Math.max(...tempMLArray);
     this.filterSelectObj[3].formGroup.get("MLMax").setValue(this.MLMax);
     this.MLMin = Math.min(...tempMLArray);
     this.filterSelectObj[3].formGroup.get("MLMin").setValue(this.MLMin);
     this.dataSource = new MatTableDataSource(remoteData);
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
     this.dataSource.filterPredicate = this.createFilter();
    this.createDisplayedColumns();
     console.log("filter Predicate Assigned")
   },
     (error) => {                              //Error callback
       console.error('error caught in component')
       let errorMessage = error;
       let loading = false;
      }
   );
}

  //filter Predicate used for filtering. checks generated filterValues on valueChange to filter per Column.
  //Match Case For all columns that wish to be filtered
  createFilter() {

    return (data:any, filter:any): boolean =>
    {
       let searchTerms = JSON.parse(filter);
      // console.log("This is MLMin in filter: ",this.filterSelectObj[3].formGroup.value.MLMin);
      // console.log("This is MLMax in filter: ", this.filterSelectObj[3].formGroup.value.MLMax);
      // console.log("Data Vals: ", +data["ML_Price"])
      //console.log("this is data: ",data);
      //console.log("filter is: " + filter +"\searchTerm Rep: " + searchTerms)
      if (+data["ML_Price"] < this.filterSelectObj[3].formGroup.value.MLMin || +data["ML_Price"] > this.filterSelectObj[3].formGroup.value.MLMax) {
        return false;
      }
       for (var property in searchTerms)
        {
          //console.log(property);
          //console.log("has own protery:  ",searchTerms.hasOwnProperty(property), searchTerms[property]);
          //checks for a property in search property   AND if there is a value in said filter array
         if (searchTerms.hasOwnProperty(property) && searchTerms[property]){

           //first check to see if values are null or undefined if so return false for that entry
             if (data[property] == null || data[property] == undefined)
              {
                 return false;
              }
          //if values exist on property, then check if a match is present, which if not then return false else return true to pop item into filtered table
             if (data[property].toString().toLowerCase().indexOf(searchTerms[property].toString().toLowerCase()) === -1)
             {
               return false
             };
            }}
          //console.log("This is a true search");
          return true;
         };
         }


  //Resets filterValue Array as a command that can be called (onClick) in the DOM
  resetFilters() {
    this.filterValues = {}
    this.filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    })
    this.dataSource.filter = "";
  }

  //calls angular service Delete httpRequest in SoccerTackerApi service with parameter being the id of the entry wanting to be deleted
  //also calls dropdown confirm dialog for double confirmation
  deleteEntry(id:any){
    if(confirm("Are you Sure You Want To Delete Entry " + id )){
      console.log(id.id)
    this.service.delete(id.id);
    }

  }

  //opens angular material dialog which is routed to the AddItemComponet with config for window size
  openDialogAdd(){
    this.service.form.reset;
    this.service.initializeFormGroup();
 this.dialog.open(AddItemComponent,{
   height:'auto',
   width:'60%'
 });
  }

  //opens angular material dialog which is routed to the updatetemComponet with config for window size.
  //single parameter is the item row that was requested to be updated which fills in formGroup properties
  //with formControl entries matching that of the items row properties. (check updateItemComponent to see how its done)
  openDialogUpdate(item:any){
    console.log(item)
    Object.keys(this.service.form.controls).forEach((key, index) => {
      console.log("Key: " + key + "\nindex: " + index)
      this.service.form.patchValue({ [key]: item[key] })
      console.log(item[key]);
    })


this.dialog.open(UpdateItemComponent,{
  height:'auto',
  width:'60%',
  data:this.service.form
})
  }

    //function used to assign color variable to both result and result FH dataSource columns
  colorPallete(item:any){
    if (item == 'L'){

      return '#ec7b7b';
    }
    if (item == 'W') {
      return '#82d469';
    }
    if (item == 'Tied') {
      return '#edf05d';
    }
    return;
  }


  //Not used but will be for refreshing page anytime a change is made to an entry in the datatable
  refresh(){
    this.getRemoteData();
    this.changeDetectorRefs.detectChanges();
  }
  checkIP() {

    this.service.http.get("http://api.ipify.org/?format=json").subscribe((res: any) => {
      console.log(res.ip);
      this.service.ipAddress = res.ip;
      console.log("This is the new IPADDRESS: " + this.service.ipAddress);
      if (this.service.ipAddress == "73.198.21.178") {
        console.log("local machine");
      }
    });
  }
}



 // getFilterObject(fullObj: any, key: any) {
  //   const uniqChk: any[] = [];
  //   fullObj.filter((obj: any) => {
  //     if (!uniqChk.includes(obj[key])) {
  //       uniqChk.push(obj[key]);
  //     }
  //     return obj;
  //   });
  //   return uniqChk;
  // }

  //if range tool sliders need to be adjusted for other columns its possible by setting filter predicate with for loop to
  //check if min and max form group exists and if it does loop through the properties of indexed form group and check
  //if value is in between min and max form control values; e.g:
  //  Object.keys(this.filterSelectObj).foreach((keys,index)=>{
  //    if filterSelectObj[index].contains("formGroup"){//possibly check if value is null or undefined
//        if (+data[filterSelectObj[index].key] < this.filterSelectObj[index].formGroup.value.Min || +data[filterSelectObj[index].key] < this.filterSelectObj[index].formGroup.value.Max) {
//             return false;
//          }
  // })
  //
  //}
//will also need to subscribe to form groups in displayed columns or create new function that subscribes to all formgGroups
//in filterSelectObj formgroup control
