import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrestadoresPage } from './prestadores.page';

describe('PrestadoresPage', () => {
  let component: PrestadoresPage;
  let fixture: ComponentFixture<PrestadoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestadoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrestadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
