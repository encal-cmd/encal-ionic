import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormPrestadorPage } from './form-prestador.page';

describe('FormPrestadorPage', () => {
  let component: FormPrestadorPage;
  let fixture: ComponentFixture<FormPrestadorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPrestadorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormPrestadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
