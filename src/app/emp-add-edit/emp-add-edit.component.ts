import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { EmployeesService } from '../services/employees.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreeService } from '../core/coree.service';




@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {

  empForm: FormGroup;

  education: string[] = [
    'Student',
    'Practicing',
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
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
      lastName:new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
      email: ['', [Validators.required, Validators.email]],
      dob:'',
      gender:new FormControl('', [Validators.required]),
      education:new FormControl('', [Validators.required]),
      area:new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
      salary:new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),

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
