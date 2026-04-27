import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { EmptyStateComponent } from './empty-state.component';

@Component({
  standalone: true,
  imports: [EmptyStateComponent],
  template: `
    <app-empty-state
      testId="es-1"
      emoji="🌳"
      title="Próximamente"
      description="Esta sección está en construcción"
    />
  `,
})
class TestHostWithDescription {}

@Component({
  standalone: true,
  imports: [EmptyStateComponent],
  template: `<app-empty-state testId="es-2" title="Vacío" />`,
})
class TestHostNoDescription {}

describe('EmptyStateComponent', () => {
  describe('with description', () => {
    let fixture: ComponentFixture<TestHostWithDescription>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({ imports: [TestHostWithDescription] }).compileComponents();
      fixture = TestBed.createComponent(TestHostWithDescription);
      fixture.detectChanges();
    });

    it('sets data-testid on host', () => {
      const host = fixture.debugElement.query(By.css('[data-testid="es-1"]'));
      expect(host).toBeTruthy();
    });

    it('renders title', () => {
      const title = fixture.debugElement.query(By.css('[data-testid="empty-state-title"]'));
      expect(title.nativeElement.textContent.trim()).toBe('Próximamente');
    });

    it('renders description', () => {
      const desc = fixture.debugElement.query(By.css('[data-testid="empty-state-description"]'));
      expect(desc).toBeTruthy();
      expect(desc.nativeElement.textContent.trim()).toBe('Esta sección está en construcción');
    });
  });

  describe('without description', () => {
    let fixture: ComponentFixture<TestHostNoDescription>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({ imports: [TestHostNoDescription] }).compileComponents();
      fixture = TestBed.createComponent(TestHostNoDescription);
      fixture.detectChanges();
    });

    it('does not render description element', () => {
      const desc = fixture.debugElement.query(By.css('[data-testid="empty-state-description"]'));
      expect(desc).toBeNull();
    });

    it('uses default emoji when not provided', () => {
      const span = fixture.debugElement.query(By.css('span')).nativeElement as HTMLElement;
      expect(span.textContent?.trim()).toBe('🚧');
    });
  });
});
