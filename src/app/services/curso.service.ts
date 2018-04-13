import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { Curso } from '../services/curso';
import { ConfigService } from './config.service';

@Injectable()
export class CursoService {

  private baseUrlService:string = '';
  private headers:Headers;
  private options:RequestOptions;

  constructor(private http:Http,
    private configService:ConfigService) {

    /** Configurando a URL do serviço REST que vai ser acessado */
    this.baseUrlService = configService.getUrlService() + '/curso/';

    /* Adicionando JSON no header */
    this.headers = new Headers({'Content-Type':'application/json;charset=UTF-8'});
    this.options = new RequestOptions({headers: this.headers});
  }

  /** Consultar todos os cursos */
  getCursos() {
    return this.http.get(this.baseUrlService + 'listar').map(res => res.json());
  }

  /** Consultar um curso pelo id */
  getCurso(id:number) {
      return this.http.get(this.baseUrlService + id).map(res => res.json());
  }

  /** Adicionar um curso */
  addCurso(curso: Curso) {
    return this.http.post(this.baseUrlService + 'add', JSON.stringify(curso), this.options)
      .map(res => res.json());
  }

  /** Atualizar um curso */
  updateCurso(curso:Curso) {
    return this.http.put(this.baseUrlService + 'update', JSON.stringify(curso), this.options)
      .map(res => res.json());
  }

  /** Remover um curso */
  deleteCurso(id:number) {
    return this.http.delete(this.baseUrlService + id).map(res => res.json());
  }

}
