import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorPalleteService {
  constructor() {}
  resultColorPallete(item: any) {
    if (item == 'L') {
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

  teamColorPallete(item: any) {
    if (item == 'T') {
      return '#f1aa25';
    }
    return;
  }
}
