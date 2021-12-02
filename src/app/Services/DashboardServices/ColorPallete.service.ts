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
    let vals = ['T', 'F'];
    let TF = {
      TournamentGameColor: vals[Math.floor(Math.random() * vals.length)],
      RedCard: vals[Math.floor(Math.random() * vals.length)],
    };
    if (TF.TournamentGameColor == 'T') {
      if (TF.RedCard == 'T') {
        return '#00d9ff';
      } else {
        return '#f1aa25';
      }
    }
    return;
  }

  finalScoreColorPallete(item: any) {
    let vals = ['T', 'F'];
    let TF = {
      TournamentGameColor: vals[Math.floor(Math.random() * vals.length)],
      RedCard: vals[Math.floor(Math.random() * vals.length)],
    };
    if (TF.RedCard == 'T') {
      return '#00d9ff';
    }
    return;
  }
}
