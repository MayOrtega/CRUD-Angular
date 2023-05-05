import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { EmployeesService } from '../services/employees.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreeService } from '../core/coree.service';




@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {

  empForm: FormGroup;

  education: string[] = [
    'B.S. in Computer Science',
    'M.S. in Computer Science',
    'Intermediate',
    'Diploma',
    'Graduate',
    'Post-Graduate'

  ]
  private _coreServices: any;

  constructor(
     private _fb:FormBuilder,
     private _empService: EmployeesService,
     private _dialogRef:MatDialogRef<EmpAddEditComponent>,
     @Inject(MAT_DIALOG_DATA) public data:any,
     private _coreService : CoreeService
    ){


    this.empForm = this._fb.group({
      firstName: '',
      lastName:'',
      email: '',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:'',

    })
  }

  ngOnInit(): void {
      this.empForm.patchValue(this.data)

  }

 onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val:any) => {
            this._coreService.openSnackBar('Employee detail updated!')
            this._dialogRef.close(true);


          },
          error: (err: any) => {
            console.error(err);

          }
        })

      }else{
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val:any) => {
            this._coreService.openSnackBar('Employee added succesfully')
            this._dialogRef.close(true);

          },
          error: (err: any) => {
            console.error(err);
          }
        })

      }

    }
  }

}
