import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NovoGrupoPage } from './novo-grupo.page';

describe('NovoGrupoPage', () => {
  let component: NovoGrupoPage;
  let fixture: ComponentFixture<NovoGrupoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoGrupoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NovoGrupoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
