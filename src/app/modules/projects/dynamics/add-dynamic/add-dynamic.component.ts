import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dynamic } from 'src/app/models/dynamic.interface';

@Component({
  selector: 'add-dynamic',
  templateUrl: './add-dynamic.component.html',
  styleUrls: ['./add-dynamic.component.css'],
})
export class AddDynamicComponent implements OnInit {
  @Output('add') addEvent: EventEmitter<Dynamic> = new EventEmitter();

  form: FormGroup = this.fb.group({
    table: ['Registrant'],
    field: ['', Validators.required],
    fieldLabel: ['', Validators.required],
    type: ['text', Validators.required],
    required: [true, Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  launchAddEvent() {
    let data: Dynamic = this.form.value;
    this.addEvent.emit(data);
  }
}
