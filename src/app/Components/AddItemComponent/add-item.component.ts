import { FormControl } from '@angular/forms';
import { SnackbarService } from '../../Services/snackbar.service';
import { SoccerTrackerApiService } from '../../Services/SoccerTrackerApi/soccer-tracker-api.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor(public service: SoccerTrackerApiService, public notification:SnackbarService) { }

  ngOnInit(): void {
  }

public date:Date | undefined;
  //var used to determine if value in box is empty or not ###Need more work on button in form field to clear value
  value = 'Clear me';
  //var for checkbox checking true or false, will use a more dynamic way for identifying home team
  checked = false;
  //event for date picking and storing value as string into events string[]
  events: string[] = [];

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${event.value}`);
  }

  onSubmit(){
    if (this.service.form.valid){
      console.log("Test Submit Correct");
      this.service.create(this.service.form.value);
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


