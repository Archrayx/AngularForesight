import { SnackbarService } from './../../Services/snackbar.service';
import { SoccerTrackerApiService } from '../../Services/SoccerTrackerApi/soccer-tracker-api.service';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {
  public date: Date | undefined;
  //var used to determine if value in box is empty or not ###Need more work on button in form field to clear value
  value = 'Clear me';
  //var for checkbox checking true or false, will use a more dynamic way for identifying home team
  checked = false;
  //event for date picking and storing value as string into events string[]
  events: string[] = [];
currentItem:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public service: SoccerTrackerApiService, public notification: SnackbarService) {

   }

  ngOnInit(): void {

this.service.form = this.data;
console.log("form: " + this.service.form);
console.log("data: " + this.data)
  }



  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${event.value}`);
  }

  onSubmit() {

    if (this.service.form.valid) {
      console.log("Test Submit Correct");
      this.service.update(this.service.form.controls['id'].value, this.service.form.value);
    }

    this.service.form.reset;
    this.service.initializeFormGroup();
    this.notification.success('Submitted Successfully 🙌');
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    //this.notification.success(' Submitted Successfully 🙌');

  }

}
//[(ngModel)]="data.Team_1"
