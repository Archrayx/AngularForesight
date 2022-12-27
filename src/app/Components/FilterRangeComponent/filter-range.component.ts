import { FilterItem } from './../../Classes/filter-item';
import { Component, EventEmitter, Inject, Input, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SoccerModel } from 'src/app/Classes/soccer-model';
import { MatMenuModule } from '@angular/material/menu';
@Component({
  selector: 'app-filter-range',
  templateUrl: './filter-range.component.html',
  styleUrls: ['./filter-range.component.css']
})
export class FilterRangeComponent implements OnInit {
  filterItems : FilterItem[];
  currentFilterItem : FilterItem | undefined;
  dashbaordData : MatTableDataSource<SoccerModel>;
  Min : number = 0;
  Max : number = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public data : any) {
    this.filterItems = data.filterItems.value;
    this.dashbaordData = data.data.value;
    console.log(this.filterItems)
    console.log(this.dashbaordData.data)
  }



  ngOnInit(): void {

  }

  setMinMax(index: number){

    let MinMaxArray: number[] = []
    let property = this.filterItems[index].key
    this.currentFilterItem = this.filterItems[index]
    Object.keys(this.dashbaordData.data).forEach((k, i)=>{
      const row = this.dashbaordData.data[i]
      if(this.dashbaordData.data[i][property]){
        this.currentFilterItem?.filterOptions.push(+row.mlPrice)
      }
    })
    this.Min = Math.min(...this.currentFilterItem?.filterOptions)
    this.filterItems[index].RangeForm.get('Min')!.setValue(this.Min)
    this.Max = Math.max(...this.currentFilterItem?.filterOptions)
    this.filterItems[index].RangeForm.get('Max')!.setValue(this.Max)
  }

/**
 * INDEX TO FILTER:
 *  3 -> MLPRICE
 * Date
 * KOPrice
 * PriceDelta
 * Shots
 * SOG
 */
}
