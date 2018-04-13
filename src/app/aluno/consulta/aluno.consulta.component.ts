import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AlunoService } from '../../services/aluno.service';
import { Aluno } from '../../services/aluno';
import { Response } from '../../services/response';

@Component({
  selector: 'app-consulta-aluno',
  templateUrl: './aluno.consulta.component.html',
  styleUrls: ["./aluno.consulta.component.css"]
})
export class AlunoConsultaComponent implements OnInit {

  private alunos: Aluno[] = new Array();
  private title:string;

  constructor(private alunoService:AlunoService,
    private router:Router) {}

  ngOnInit() {
    this.title = 'Cadastro de Aluno';
    this.alunoService.getAlunos().subscribe(res => this.alunos = res);
  }

  remover(id:number, index:number):void {

    if (confirm("Deseja realmente remover esse registro?")) {

      this.alunoService.deleteAluno(id).subscribe(response => {

        let res:Response = <Response> response;

        if (res.codigo == 1) {
          alert(res.mensagem);
          this.alunos.splice(index, 1);
        } else {
          alert(res.mensagem);
        }
      },
      (erro) => {
        alert(erro);
      });
    }
  }

  editar(id:number):void {
    this.router.navigate(['/cadastro-aluno', id]);
  }

}
