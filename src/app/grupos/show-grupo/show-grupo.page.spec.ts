import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowGrupoPage } from './show-grupo.page';

describe('ShowGrupoPage', () => {
  let component: ShowGrupoPage;
  let fixture: ComponentFixture<ShowGrupoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowGrupoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowGrupoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
