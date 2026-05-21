import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

const HIGHLIGHT_CLASSES: Record<string, string> = {
  hl:    'hl',
  hl2:   'hl2',
  hl3:   'hl3',
  ai:    'hl-ai',
};

@Pipe({
  name: 'md',
  standalone: true,
})
export class MarkdownPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(value: string | null | undefined, boldVariant: keyof typeof HIGHLIGHT_CLASSES = 'hl'): SafeHtml {
    if (!value) return '';
    const boldClass = HIGHLIGHT_CLASSES[boldVariant] ?? HIGHLIGHT_CLASSES['hl'];
    const html = this.escape(value)
      .replace(/~~(.+?)~~/g, '<del>$1</del>')
      .replace(/\*\*(.+?)\*\*/g, `<strong class="${boldClass}">$1</strong>`)
      .replace(/`([^`]+?)`/g, '<code>$1</code>')
      .replace(/(^|[^*\w])\*(?!\s)([^*\n]+?)\*(?!\w)/g, '$1<em>$2</em>');
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  private escape(s: string): string {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}
