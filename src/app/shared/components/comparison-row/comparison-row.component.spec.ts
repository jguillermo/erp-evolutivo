import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { ComparisonRowComponent } from './comparison-row.component';

@Component({
  standalone: true,
  imports: [ComparisonRowComponent],
  template: `
    <app-comparison-row competitor="Libreta y Excel" testId="cr-1">
      Digitalización sin trauma
    </app-comparison-row>
  `,
})
class TestHost {}

describe('ComparisonRowComponent', () => {
  let fixture: ComponentFixture<TestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHost] }).compileComponents();
    fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
  });

  it('sets data-testid on host', () => {
    const host = fixture.debugElement.query(By.css('[data-testid="cr-1"]'));
    expect(host).toBeTruthy();
  });

  it('renders competitor label with vs. prefix', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    expect(paragraphs[0].nativeElement.textContent.trim()).toBe('vs. Libreta y Excel:');
  });

  it('renders label with muted color class', () => {
    const label = fixture.debugElement.queryAll(By.css('p'))[0].nativeElement as HTMLElement;
    expect(label.className).toContain('text-slate-400');
    expect(label.className).toContain('font-bold');
  });

  it('renders description with print class', () => {
    const desc = fixture.debugElement.queryAll(By.css('p'))[1].nativeElement as HTMLElement;
    expect(desc.className).toContain('print:text-print-xs');
    expect(desc.className).toContain('pl-2');
  });

  it('projects description content', () => {
    const desc = fixture.debugElement.queryAll(By.css('p'))[1].nativeElement as HTMLElement;
    expect(desc.textContent?.trim()).toBe('Digitalización sin trauma');
  });
});
