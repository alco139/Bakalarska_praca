import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyMatchesPage } from './my-matches.page';

describe('MyMatchesPage', () => {
  let component: MyMatchesPage;
  let fixture: ComponentFixture<MyMatchesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMatchesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyMatchesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
