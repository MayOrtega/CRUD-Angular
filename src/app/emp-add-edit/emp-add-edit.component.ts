import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { EmployeesService } from '../services/employees.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';



@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent {

  empForm: FormGroup;

  education: string[] = [
    'B.S. in Computer Science',
    'M.S. in Computer Science',
    'Intermediate',
    'Diploma',
    'Graduate',
    'Post-Graduate'

  ]

  constructor(
     private _fb:FormBuilder,
     private _empService: EmployeesService,
     private _dialogRef:MatDialogRef<EmpAddEditComponent>,
     @inject(MAT_DIALOG_DATA) private data: any
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

 onFormSubmit(){
    if(this.empForm.valid){
      this._empService.addEmployee(this.empForm.value).subscribe({
        next: (val:any) => {
          alert('Employy added succesfully');
          this._dialogRef.close(true);

        },
        error: (err: any) => {
          console.error(err);

        }
      })
    }
  }

}
