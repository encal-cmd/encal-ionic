import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditGrupoPage } from './edit-grupo.page';

describe('EditGrupoPage', () => {
  let component: EditGrupoPage;
  let fixture: ComponentFixture<EditGrupoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGrupoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditGrupoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
