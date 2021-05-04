import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GrupoUsuariosPage } from './grupo-usuarios.page';

describe('GrupoUsuariosPage', () => {
  let component: GrupoUsuariosPage;
  let fixture: ComponentFixture<GrupoUsuariosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoUsuariosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GrupoUsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
