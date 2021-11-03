import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dynamic } from 'src/app/models/dynamic.interface';
import { RegistrantsService } from 'src/app/services/registrants.service';

@Component({
  selector: 'add-registrant',
  templateUrl: './add-registrant.component.html',
  styleUrls: ['./add-registrant.component.css'],
})
export class AddRegistrantComponent implements OnInit {
  controlsSettings = {
    firstName: ['', Validators.required],
    lastName: [''],
    email: ['', [Validators.required, Validators.email, Validators.pattern]],
    company: ['', Validators.maxLength(30)],
    country: ['', [Validators.maxLength(30)]],
    code: [''],
  };
  regisForm: FormGroup;
  dynamics: Dynamic[];

  constructor(
    private fb: FormBuilder,
    private _registrant: RegistrantsService
  ) {
    this.dynamics = this._registrant.getDynamicsValue();
    if (this.dynamics.length > 0) this.setDynamics();
    this.regisForm = this.fb.group(this.controlsSettings);
  }

  ngOnInit(): void {}

  send() {
    this._registrant.addOne(this.regisForm.value);
    this.regisForm.reset();
  }

  setDynamics() {
    this.dynamics.forEach((val, index) => {
      this.controlsSettings[val.field] = [''];
    });
  }
}
