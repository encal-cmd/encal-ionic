import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormProjetoPage } from './form-projeto.page';

describe('FormProjetoPage', () => {
  let component: FormProjetoPage;
  let fixture: ComponentFixture<FormProjetoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProjetoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormProjetoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
