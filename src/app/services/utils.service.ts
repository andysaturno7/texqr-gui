import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}
}

export class ServerSideDataSource {
  constructor() {}
  getRows(params) {
    console.log({ params: params.request });
    params.fail();
  }
}
