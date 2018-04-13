import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { CursoService } from '../../services/curso.service';
import { Curso } from '../../services/curso';
import { Response } from '../../services/response';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-cadastro-curso',
  templateUrl: './cadastro.component.html',
  styleUrls: ["./cadastro.component.css"]
})
export class CadastroComponent implements OnInit {

  private titulo:string;
  private txtBtn:string;
  private curso:Curso = new Curso();

  constructor(private cursoService: CursoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
      this.activatedRoute.params.subscribe(parametro=>{

        if (parametro['id'] == undefined) {
          this.titulo = "Cadastro de Curso";
          this.txtBtn = "Salvar";
        } else {
          this.titulo = "Atualizar Curso";
          this.txtBtn = "Atualizar";
          this.cursoService.getCurso(Number(parametro['id'])).subscribe(res => this.curso = res);
        }

      });
  }

  /** Salvar ou Atualizar Curso */
  salvar():void {

    if (this.curso.id == undefined) {

      this.cursoService.addCurso(this.curso).subscribe(response => {

        // Pega o Response do retorno do serviço
        let res:Response = <Response> response;

        /* Se retornou 1 devemos mostrar a mensagem de sucesso
         * e limpar o formulário para inserir um novo registro */
        if (res.codigo == 1) {
          alert(res.mensagem);
          this.curso = new Curso();
        } else {
          /* Essa mensagem vai ser mostrada caso ocorra alguma exception */
          alert(res.mensagem);
        }

      },
        (erro) => {
            /* Aqui vamos mostrar os erros não tratados */
            alert(erro);
      });
    } else {
      this.cursoService.updateCurso(this.curso).subscribe(response => {
        // Pega o Response do retorno do serviço
        let res:Response = <Response>response;

        /* Se retornou 1 devemos mostrar a mensagem de sucesso
         * e redirecionar o usuário para a página de consulta */
        if (res.codigo == 1) {
          alert(res.mensagem);
          this.router.navigate(['/consulta-curso']);
        } else {
          /* Essa mensagem vai ser mostrada caso ocorra alguma exception */
          alert(res.mensagem);
        }
      },
      (erro) => {
        /* Aqui vamos mostrar os erros não tratados */
        alert(erro);
      });
    }

  }

}
