import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'add-dynamics',
  templateUrl: './add-dynamics.component.html',
  styleUrls: ['./add-dynamics.component.css'],
})
export class AddDynamicsComponent implements OnInit {
  form = this.fb.group({
    table: ['Registrant'],
    field: ['', Validators.required],
    fieldLabel: ['', Validators.required],
    type: ['text', Validators.required],
    selectOptions: this.fb.array([this.fb.control('')]),
    required: [],
  });

  @Output('submit') submit: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  get selectOptions() {
    return this.form.get('selectOptions') as FormArray;
  }

  get type() {
    return this.form.get('type').value;
  }

  addOption() {
    this.selectOptions.push(this.fb.control(''));
  }

  removeOption(i: number) {
    this.selectOptions.removeAt(i);
  }

  formSubmit() {
    this.submit.emit(this.form.value);
  }
}
