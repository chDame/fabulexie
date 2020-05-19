import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagerComponent } from './doc-manager.component';

describe('DocManagerComponent', () => {
  let component: DocManagerComponent;
  let fixture: ComponentFixture<DocManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
