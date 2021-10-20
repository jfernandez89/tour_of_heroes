import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  public static readonly MODAL_ID = 'user-dialog-id';
  public static readonly MODAL_PANEL_CLASS = 'user-dialog';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string }, private dialog: MatDialog) {}

  ngOnInit(): void {}
}
