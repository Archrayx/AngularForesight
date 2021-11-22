import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) { }
config: MatSnackBarConfig = {
  duration:3000,
  horizontalPosition: 'center',
  verticalPosition: 'bottom'
};
  success(msg: string){
    this.config['panelClass'] = ['notification','success'];
    this.snackbar.open(msg,'', this.config);
  }
}
