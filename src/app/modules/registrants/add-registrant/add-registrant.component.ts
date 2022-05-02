import {
  Component,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dynamic } from 'src/app/models/dynamic.interface';
import { CustomselectsService } from 'src/app/services/customselects.service';
import {
  Registrant,
  RegistrantsService,
} from 'src/app/services/registrants.service';

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
    code: [''],
  };
  regisForm: FormGroup;
  dynamics: Dynamic[];
  @ViewChild('DynamicsRender') dynamicsRender;
  @Output('added') AddEvent: EventEmitter<Registrant> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private _registrant: RegistrantsService
  ) {
    this.dynamics = this._registrant.getDynamicsValue();
    this.regisForm = this.fb.group(this.controlsSettings);
  }

  ngOnInit(): void {}

  send() {
    let data = this.regisForm.value;
    if (this.dynamics.length > 0) data['dynamics'] = this.dynamicsValues;
    this._registrant
      .addOne(data)
      .subscribe((res) => this.AddEvent.emit(res), console.log);
    this.resetForm();
  }

  get dynamicsValues() {
    return this.dynamicsRender.value;
  }

  resetForm() {
    this.regisForm.reset();
    this.dynamicsRender.clean();
  }
}
