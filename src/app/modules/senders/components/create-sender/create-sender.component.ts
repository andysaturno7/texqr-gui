import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SenderService, iSender } from '../../sender.service';
import { Location } from '@angular/common';

@Component({
  selector: 'texqr-create-sender',
  templateUrl: './create-sender.component.html',
  styleUrls: ['./create-sender.component.css'],
})
export class CreateSenderComponent implements OnInit {
  form: FormGroup = this.fb.group({
    user: ['', Validators.required],
    password: ['', Validators.required],
    name: ['', Validators.required],
    host: ['', Validators.required],
    port: [465, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private _sender: SenderService,
    private location: Location
  ) {}

  ngOnInit(): void {}

  async create() {
    let sender: iSender = this.form.value;
    this._sender.createSender(sender).subscribe(
      (res) => {
        this.location.back();
      },
      (error) => {
        console.log({ error });
      }
    );
  }
}
