import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { TierSectionComponent } from './tier-section.component';
import { ListItemComponent } from '../list/list-item.component';

@Component({
  standalone: true,
  imports: [TierSectionComponent, ListItemComponent],
  template: `
    <app-tier-section
      testId="ts-1"
      badgeTestId="badge-ts-1"
      badgeColor="amber"
      badgeText="FASE 2"
      tierDescription="4–15 personas"
      listTestId="ts-1-list">
      <app-list-item>Restaurantes</app-list-item>
    </app-tier-section>
  `,
})
class TestHost {}

describe('TierSectionComponent', () => {
  let fixture: ComponentFixture<TestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHost] }).compileComponents();
    fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
  });

  it('sets data-testid on host', () => {
    const host = fixture.debugElement.query(By.css('[data-testid="ts-1"]'));
    expect(host).toBeTruthy();
  });

  it('renders badge with correct testId', () => {
    const badge = fixture.debugElement.query(By.css('[data-testid="badge-ts-1"]'));
    expect(badge).toBeTruthy();
  });

  it('renders list with correct testId', () => {
    const list = fixture.debugElement.query(By.css('[data-testid="ts-1-list"]'));
    expect(list).toBeTruthy();
  });

  it('projects list items into the list', () => {
    const items = fixture.debugElement.queryAll(By.css('li'));
    expect(items.length).toBe(1);
    expect(items[0].nativeElement.textContent.trim()).toBe('Restaurantes');
  });
});
