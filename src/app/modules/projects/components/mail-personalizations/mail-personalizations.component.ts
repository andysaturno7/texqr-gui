import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Stored } from 'src/app/models/utils.types';
import { IProject } from 'src/app/services/projects.service';

@Component({
  selector: 'texqr-mail-personalizations',
  templateUrl: './mail-personalizations.component.html',
  styleUrls: ['./mail-personalizations.component.css'],
})
export class MailPersonalizationsComponent implements OnInit {
  @Input('project') selectedProject: IProject;
  @Output('dataChange') changeEvent: EventEmitter<{}> = new EventEmitter();

  form: FormGroup = this.fb.group({
    mail_sender_text: [''],
    subject: [''],
    address: ['', Validators.email],
    response_email: ['', Validators.email],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.setData();
  }

  setData() {
    let { mail_sender_text, subject, response_email, address } =
      this.selectedProject.keys;
    this.form.setValue({ mail_sender_text, subject, response_email, address });
  }

  dataChange() {
    if (this.form.valid) return this.changeEvent.emit(this.form.value);
  }
}
