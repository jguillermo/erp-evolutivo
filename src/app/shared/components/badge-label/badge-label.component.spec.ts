import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { BadgeLabelComponent } from './badge-label.component';

@Component({
  standalone: true,
  imports: [BadgeLabelComponent],
  template: `
    <app-badge-label
      testId="bl-1"
      badgeTestId="badge-bl-1"
      badgeColor="indigo"
      badgeText="FASE 1"
      labelText="Descripción del tier"
    />
  `,
})
class TestHostDescription {}

@Component({
  standalone: true,
  imports: [BadgeLabelComponent],
  template: `
    <app-badge-label
      testId="bl-2"
      badgeTestId="badge-bl-2"
      badgeColor="amber-solid"
      badgeText="BEACHHEAD"
      labelText="Foco de lanzamiento"
      variant="title"
    />
  `,
})
class TestHostTitle {}

describe('BadgeLabelComponent', () => {
  describe('variant description (default)', () => {
    let fixture: ComponentFixture<TestHostDescription>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({ imports: [TestHostDescription] }).compileComponents();
      fixture = TestBed.createComponent(TestHostDescription);
      fixture.detectChanges();
    });

    it('sets data-testid on host', () => {
      const host = fixture.debugElement.query(By.css('[data-testid="bl-1"]'));
      expect(host).toBeTruthy();
    });

    it('renders badge with correct testId', () => {
      const badge = fixture.debugElement.query(By.css('[data-testid="badge-bl-1"]'));
      expect(badge).toBeTruthy();
    });

    it('renders label with description classes', () => {
      const span = fixture.debugElement.queryAll(By.css('span'))[1].nativeElement as HTMLElement;
      expect(span.className).toContain('text-gray-400');
      expect(span.className).toContain('text-2xs');
    });

    it('renders label text', () => {
      const span = fixture.debugElement.queryAll(By.css('span'))[1].nativeElement as HTMLElement;
      expect(span.textContent?.trim()).toBe('Descripción del tier');
    });
  });

  describe('variant title', () => {
    let fixture: ComponentFixture<TestHostTitle>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({ imports: [TestHostTitle] }).compileComponents();
      fixture = TestBed.createComponent(TestHostTitle);
      fixture.detectChanges();
    });

    it('renders label with title classes', () => {
      const span = fixture.debugElement.queryAll(By.css('span'))[1].nativeElement as HTMLElement;
      expect(span.className).toContain('text-warning-100');
      expect(span.className).toContain('font-bold');
    });
  });
});
