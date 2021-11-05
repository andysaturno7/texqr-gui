import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dynamic } from 'src/app/models/dynamic.interface';
import {
  CustomEventSelects,
  CustomselectsService,
} from 'src/app/services/customselects.service';
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
    participation: ['', [Validators.required]],
    event: ['', Validators.required],
    area: [''],
    activity: [''],
    specialization: [''],
    code: [''],
  };
  regisForm: FormGroup;
  dynamics: Dynamic[];

  eventOptions: string[] = this.ctmCS.getCompanies();
  areasOptions: string[] = [];
  activitiesOptions: string[] = [];
  specializationsOptions: string[] = [];
  participationsOptions: string[] = this.ctmCS.getParticipantsType();

  constructor(
    private fb: FormBuilder,
    private _registrant: RegistrantsService,
    private ctmCS: CustomselectsService
  ) {
    this.dynamics = this._registrant.getDynamicsValue();
    if (this.dynamics.length > 0) this.setDynamics();
    this.regisForm = this.fb.group(this.controlsSettings);
  }

  ngOnInit(): void {}

  send() {
    let dynamics = {};
    this.dynamics.forEach((val, index) => {
      dynamics[val.field] = this.regisForm.value[val.field];
      delete this.regisForm.value[val.field];
    });
    this.regisForm.value['dynamics'] = dynamics;
    console.log(this.regisForm.value);

    this._registrant.addOne(this.regisForm.value);
    this.regisForm.reset();
  }

  setDynamics() {
    this.dynamics.forEach((val, index) => {
      this.controlsSettings[val.field] = [''];
    });
  }

  loadCustomCompaniesSelects() {
    this.areasOptions = this.ctmCS.getFields(
      'areas',
      this.regisForm.value.event
    );
    this.activitiesOptions = this.ctmCS.getFields(
      'activities',
      this.regisForm.value.event
    );
    this.specializationsOptions = this.ctmCS.getFields(
      'specializations',
      this.regisForm.value.event
    );
  }
}
