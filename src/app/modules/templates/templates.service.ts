import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stored } from 'src/app/models/utils.types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TemplatesService {
  private uri = environment.uri;
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<StoredTemplate[]>(`${this.uri}/templates`);
  }

  getById(templateId: string) {
    return this.http.get<StoredTemplate>(`${this.uri}/templates/${templateId}`);
  }

  createTemplate(template: iTemplate) {
    return this.http.post<StoredTemplate>(`${this.uri}/templates`, template);
  }

  updateTemplate(template: StoredTemplate) {
    return this.http.patch(`${this.uri}/templates/${template.id}`, template);
  }

  deleteTemplate(templateId: string) {
    return this.http.delete(`${this.uri}/templates/${templateId}`);
  }
}

export interface iTemplate {
  name: string;
  template: string;
  type: 'mail' | 'sticker';
  engine: 'ejs' | 'hbs';
  keys: {
    paper_size: {
      width: number;
      height: number;
    };
  };
}

export type StoredTemplate = Stored<iTemplate>;
