import { Injectable } from '@angular/core';

export interface CustomEventSelects {
  activities: string[];
  areas: string[];
  specializations: string[];
}

@Injectable({
  providedIn: 'root',
})
export class CustomselectsService {
  private TCE: CustomEventSelects = {
    activities: [
      'A1. GESTION / ADMINISTRACION - EDIFICIO COMERCIAL',
      'A1. GESTION / ADMINISTRACION - EDIFICIO CORP.',
      'A1. GESTION / ADMINISTRACION - EDIFICIO EDUCATIVO',
      'A1. GESTION / ADMINISTRACION - EDIFICIO INDUSTRIAL',
      'A1. GESTION / ADMINISTRACION - EDIFICIO RESIDENCIAL',
      'A1. GESTION / ADMINISTRACION - EDIFICIO SALUD',
      'A2. CONSTRUCTORA / ARQUITECTOS / DISENO INTERIOR',
      'A2. CONTRATISTA / INSTALACION - SISTEMAS CVAC/R',
      'A2. CONTRATISTA / INSTALACION - SISTEMAS ELECTRONICOS',
      'A2. INTEGRACION DE SISTEMAS',
      'A3. INGENIERIA / CONSULTORIA - SISTEMAS CVAC/R',
      'A3. INGENIERIA / CONSULTORIA - SISTEMAS ELECTRONICOS',
      'A3. INGENIERIA / CONSULTORIA - SISTEMAS MISC.',
      'B1. DISTRIBUIDOR / MAYORISTA - EQUIPOS CVAC/R',
      'B1. DISTRIBUIDOR / MAYORISTA - EQUIPOS ELECTRONICOS',
      'B2. SERVICIO - SEGURIDAD INFORMATICA',
      'B2. SERVICIO - VIGILANCIA Y MONITOREO',
      'M. PROVEEDOR - EQUIPOS CVAC/R',
      'M. PROVEEDOR - EQUIPOS ELECTRONICOS',
      'M. PROVEEDOR - OTROS',
      'N. INSTITUTO / INVESTIGACION / ASCN. GREMIAL',
    ],
    areas: [
      'A. GERENCIA GENERAL',
      'B. GERENCIA DE INGENIERIA',
      'C. GERENCIA TECNICA',
      'D. GERENCIA DE COMPRAS',
      'G. GERENCIA DE VENTAS & MARKETING',
      'H. GERENCIA FINANCIERA',
      'I. INVESTIGACION & DESARROLLO',
      'J. SERVICIOS DE INSTALACION',
      'K. GERENCIA DE MANTENIMIENTO',
    ],
    specializations: [
      'A. VIVIENDA',
      'B. COMERCIAL / INDUSTRIAL',
      'C. AMBOS [A + B]',
    ],
  };
  private RFA: CustomEventSelects = {
    activities: [
      'A1. CONTRATISTA / INSTALACION - SISTEMAS CVAC/R',
      'A3. FIRMA CONSULTORIA / DISENO - SISTEMAS CVAC/R',
      'A3. FIRMA INGENIERIA - SISTEMAS CVAC/R',
      'A4. USUARIO FINAL - EQUIPOS CVAC/R',
      'B1. DISTRIBUIDOR / MAYORISTA - EQUIPOS CVAC/R',
      'M. FABRICANTE - EQUIPOS CVAC/R',
      'N. INSTITUTO / INVESTIGACION / ASCN. GREMIAL',
    ],
    areas: [
      'A. GERENCIA GENERAL',
      'B. GERENCIA DE INGENIERIA',
      'C. GERENCIA TECNICA',
      'D. GERENCIA DE COMPRAS',
      'E. GERENCIA DE PRODUCTO',
      'G. GERENCIA DE VENTAS & MARKETING',
      'H. GERENCIA FINANCIERA',
      'I. INVESTIGACION & DESARROLLO',
      'J. SERVICIOS DE INSTALACION',
      'K. GERENCIA DE MANTENIMIENTO',
    ],
    specializations: [
      'A. VIVIENDA',
      'B. COMERCIAL / INDUSTRIAL',
      'C. AMBOS [A + B]',
    ],
  };

  constructor() {}

  getFields(fields: string, company: string): string[] {
    return this[company][fields];
  }

  getCompanies(): string[] {
    return ['TCE', 'RFA'];
  }

  getParticipantsType() {
    return ['Visitante', 'Expositor', 'Asistente', 'Congreso'];
  }
}
