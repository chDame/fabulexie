import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocBrowserComponent } from './doc-browser.component';

describe('DocBrowserComponent', () => {
  let component: DocBrowserComponent;
  let fixture: ComponentFixture<DocBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
