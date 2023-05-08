import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeesService } from './services/employees.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreeService } from './core/coree.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  displayedColumns: string[] = ['id',
  'firstName',
  'lastName',
  'email',
  'dob',
  'gender',
  'education',
  'area',
  'salary',
  'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog,
              private _empService: EmployeesService,
              private _coreServices: CoreeService ){}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm(){
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val){
          this.getEmployeeList();
        }
      }
    })
  }

  getEmployeeList(){
    this._empService.getEmployeeList().subscribe({
      next: (res)=>{
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator

      },
      error: (err)=>{
          console.log(err);

      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number){
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        this._coreServices.openSnackBar('Employee deleted!', 'Done')
        this.getEmployeeList();
      },
      error: console.log

    })
  }
  openEditForm(data: any){
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getEmployeeList();
        }
      },
    });

  }
}


