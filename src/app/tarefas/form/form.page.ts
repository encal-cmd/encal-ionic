import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/usuarios/usuario.model';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { TarefasService } from '../tarefas.service';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  isLoading = false;
  form: FormGroup;
  avaliadores = [];
  avaliadoresString = '';
  data = {};
  currentUser: Usuario;
  responsaveis: Usuario[];
  usuarios = [];
  data_limite_string;
  tipo = 'tarefa';

  private currentUserSub: Subscription;
  tarefa = {
    id: 0,
    titulo: '',
    descricao: '',
    data_limite: '',
    user_id: '',
    user_criou_id: 0,
    status: ''
  };

  constructor(
    private loadingCtrl: LoadingController,
    private tarefasService: TarefasService,
    private usuarioService: UsuariosService,
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController) {
      this.currentUserSub = this.usuarioService.current_user_obs.subscribe(usuario => {
        this.currentUser = usuario;
      });
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }


  ngOnInit() {
    this.form = new FormGroup({
      titulo: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
      descricao: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
      data_limite: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
      user_id: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] })
    });

    this.usuarioService.usuarios.subscribe(usuarios => {
      this.usuarios = usuarios;

      this.route.paramMap.subscribe(paramMap => {
        if (paramMap.get('id') !== 'new') {
          this.tarefasService.getItem(paramMap.get('id')).subscribe(tarefa => {
            console.log(tarefa);
            this.tarefa = tarefa;
            this.form.patchValue({
              titulo: tarefa.titulo,
              descricao: tarefa.descricao,
              data_limite: tarefa.data_limite,
              user_id: usuarios.filter(p => tarefa.user_id.split('||').includes(p.id.toString())),
            });
            this.tipo = tarefa.tipo;
            this.isLoading = false;
            this.responsaveis = usuarios.filter(p => tarefa.user_id.split('||').includes(p.id.toString()));
            this.data_limite_string = new Date(tarefa.data_limite).toLocaleString();
          });
        }
      });

    });
  }

  onCreate() {
    const form_val = this.form.value;
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Criando tarefa...'
    }).then(loadingEl => {
      loadingEl.present();
      // tslint:disable-next-line: max-line-length
      this.tarefasService.criar(
        form_val.titulo,
        form_val.descricao,
        form_val.data_limite,
        form_val.user_id,
        this.tipo
        ).subscribe(resp => {
        loadingEl.dismiss();
        if (resp.status === 'OK') {
          this.form.reset();
          this.router.navigate(['/tarefas']);
        } else {
          this.alertCtrl.create({header: 'Ops!', message: resp.status, buttons: ['OK']}).then(alertEl => alertEl.present());
        }
      });
    });
  }

  onEditar() {
    const form_val = this.form.value;
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Editando tarefa...'
    }).then(loadingEl => {
      loadingEl.present();
      // tslint:disable-next-line: max-line-length
      this.tarefasService.editar(
        this.tarefa.id,
        form_val.titulo,
        form_val.descricao,
        form_val.data_limite,
        form_val.user_id,
        this.tipo,
        ).subscribe(resp => {
        loadingEl.dismiss();
        if (resp.status === 'OK') {
          this.form.reset();
          this.router.navigate(['/tarefas']);
        } else {
          this.alertCtrl.create({header: 'Ops!', message: resp.status, buttons: ['OK']}).then(alertEl => alertEl.present());
        }
      });
    });
  }

  finalizarTarefa() {
    this.loadingCtrl.create({
      message: 'Criando tarefa...'
    }).then(loadingEl => {
      loadingEl.present();
      // tslint:disable-next-line: max-line-length
      this.tarefasService.finalizar(this.tarefa.id).subscribe(resp => {
        loadingEl.dismiss();
        if (resp.status === 'OK') {
          this.form.reset();
          this.router.navigate(['/tarefas']);
        } else {
          this.alertCtrl.create({header: 'Ops!', message: resp.status, buttons: ['OK']}).then(alertEl => alertEl.present());
        }
      });
    });
  }

  trocaTipo(event) {
    console.log(event);
    this.tipo = event.detail.value;
    console.log(this.tipo);
  }

}
