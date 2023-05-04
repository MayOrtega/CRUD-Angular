import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';

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

  constructor(private _fb:FormBuilder){
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
      console.log(this.empForm.value);

    }
  }

}
