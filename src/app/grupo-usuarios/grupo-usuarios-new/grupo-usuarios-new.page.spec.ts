import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GrupoUsuariosNewPage } from './grupo-usuarios-new.page';

describe('GrupoUsuariosNewPage', () => {
  let component: GrupoUsuariosNewPage;
  let fixture: ComponentFixture<GrupoUsuariosNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoUsuariosNewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GrupoUsuariosNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
