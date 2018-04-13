import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx'

import { ConfigService } from './config.service';
import { Aluno } from '../services/aluno';

@Injectable()
export class AlunoService {

  private baseUrlService:string = '';
  private headers:Headers;
  private options:RequestOptions;

  constructor(private http: Http,
    private configService: ConfigService) {
        /** Configurando a URL do serviço REST que vai ser acessado */
        this.baseUrlService = configService.getUrlService() + '/aluno/';

        /* Adicionando JSON no header */
        this.headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        this.options = new RequestOptions({headers: this.headers});
    }

    /** Consulta todos os alunos */
    getAlunos() {
        return this.http.get(this.baseUrlService + 'listar').map(res => res.json());
    }

    /** Consulta um aluno pelo id */
    getAluno(id:number) {
      return this.http.get(this.baseUrlService + id).map(res => res.json());
    }

    /** Adiciona um Aluno */
    addAluno(aluno: Aluno) {
      return this.http.post(this.baseUrlService + 'add', JSON.stringify(aluno), this.options)
        .map(res => res.json());
    }

    /** Atualizar um aluno */
    updateAluno(aluno:Aluno) {
      return this.http.put(this.baseUrlService + 'update', JSON.stringify(aluno), this.options)
        .map(res => res.json());
    }

    /** Remove um aluno */
    deleteAluno(id:number) {
      return this.http.delete(this.baseUrlService + id).map(res => res.json());
    }

}
