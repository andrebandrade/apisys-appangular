import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { CursoService } from '../../services/curso.service'
import { AlunoService } from '../../services/aluno.service'
import { Curso } from '../../services/curso';
import { Aluno } from '../../services/aluno';
import { Response } from '../../services/response';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './aluno.cadastro.component.html',
  styleUrls: ["./aluno.cadastro.component.css"]
})
export class AlunoCadastroComponent implements OnInit {

  private titulo: string;
  private txtBtn: string;
  private cursos: Curso[] = new Array();
  private aluno: Aluno = new Aluno();
  private cursoSelecionado: Curso = new Curso();

  constructor(private cursoService: CursoService,
    private alunoService: AlunoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.cursoService.getCursos().subscribe(res => this.cursos = res);

    this.activatedRoute.params.subscribe(parametro => {

      if(parametro["id"] == undefined) {
        this.titulo = 'Cadastro de Aluno';
        this.txtBtn = 'Salvar';
      } else {
        this.titulo = 'Atualizar Aluno';
        this.txtBtn = 'Atualizar';
        this.alunoService.getAluno(Number(parametro["id"])).subscribe(res => this.aluno = res);
        this.cursoSelecionado = this.aluno.curso;
      }
    });
  }

  salvar():void {

      if (this.aluno.id == undefined) {

        this.aluno.curso = this.cursoSelecionado;

        this.alunoService.addAluno(this.aluno).subscribe(response => {

          let res:Response = <Response> response;

          if (res.codigo == 1) {
            alert(res.mensagem);
            this.aluno = new Aluno();
          } else {
            alert(res.mensagem);
          }
        },
        (erro) => {
          alert(erro);
        });
      } else {

        this.aluno.curso = this.cursoSelecionado;

        this.alunoService.updateAluno(this.aluno).subscribe(response => {

          let res:Response = <Response> response;

          if (res.codigo == 1) {
            alert(res.mensagem);
            this.router.navigate(['/consulta-aluno']);
          } else {
            alert(res.mensagem);
          }
        },
        (erro) => {
          alert(erro);
        });
      }
  }

}
