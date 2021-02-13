import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JoinMatchPage } from './join-match.page';

describe('JoinMatchPage', () => {
  let component: JoinMatchPage;
  let fixture: ComponentFixture<JoinMatchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinMatchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JoinMatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
