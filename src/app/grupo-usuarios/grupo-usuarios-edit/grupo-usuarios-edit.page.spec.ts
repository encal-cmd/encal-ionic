import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GrupoUsuariosEditPage } from './grupo-usuarios-edit.page';

describe('GrupoUsuariosEditPage', () => {
  let component: GrupoUsuariosEditPage;
  let fixture: ComponentFixture<GrupoUsuariosEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoUsuariosEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GrupoUsuariosEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
