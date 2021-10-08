import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrantsService } from 'src/app/services/registrants.service';

@Component({
  selector: 'add-registrant',
  templateUrl: './add-registrant.component.html',
  styleUrls: ['./add-registrant.component.css'],
})
export class AddRegistrantComponent implements OnInit {
  regisForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    email: ['', [Validators.required, Validators.email, Validators.pattern]],
    company: ['', Validators.maxLength(30)],
    country: ['', [Validators.maxLength(30)]],
    code: [''],
  });

  constructor(
    private fb: FormBuilder,
    private _registrant: RegistrantsService
  ) {}

  ngOnInit(): void {}

  send() {
    this._registrant.addOne(this.regisForm.value);
    this.regisForm.reset();
  }
}
