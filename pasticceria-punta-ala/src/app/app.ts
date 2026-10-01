import { afterNextRender, Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { siteContent } from './site-content';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly content = siteContent;
  protected readonly menuOpen = signal(false);
  protected readonly mapVisible = signal(false);
  protected readonly mapUrl =
    'https://www.google.com/maps/dir/?api=1&destination=42.8053453%2C10.7694705';
  protected readonly mapEmbedUrl = inject(DomSanitizer).bypassSecurityTrustResourceUrl(
    'https://maps.google.com/maps?q=42.8053453,10.7694705&output=embed',
  );
  protected readonly contactUrl = siteContent.whatsappEnabled
    ? 'https://wa.me/393291544558?text=' +
      encodeURIComponent(
        'Buongiorno! Vorrei informazioni sui vostri prodotti e sulla disponibilità.',
      )
    : 'tel:+393291544558';
  protected readonly cakeUrl = siteContent.whatsappEnabled
    ? 'https://wa.me/393291544558?text=' +
      encodeURIComponent(
        'Buongiorno! Vorrei informazioni per una torta: occasione, data e numero di persone.',
      )
    : 'tel:+393291544558';
  protected readonly hours = [
    { day: 'Lunedì', time: 'Chiuso' },
    { day: 'Martedì', time: 'Chiuso' },
    { day: 'Mercoledì', time: 'Chiuso' },
    { day: 'Giovedì', time: '07:30–12:30' },
    { day: 'Venerdì', time: '07:30–12:30' },
    { day: 'Sabato', time: '07:30–12:30' },
    { day: 'Domenica', time: '07:30–12:30' },
  ];
  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef);
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined' || typeof matchMedia === 'undefined') return;
      const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
      if (motionPreference.matches) return;
      const targets = Array.from(
        element.nativeElement.querySelectorAll<HTMLElement>(
          '.section, .card, .story-photos > figure, .gallery-item, .values-grid > article, .reviews-grid > figure',
        ),
      );
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.08, rootMargin: '0px 0px -24px 0px' },
      );
      targets.forEach((target, index) => {
        const sectionEffects = ['left', 'right', 'rise', 'turn', 'left', 'right', 'rise'];
        const sections = Array.from(element.nativeElement.querySelectorAll('.section'));
        const effect = target.classList.contains('section')
          ? sectionEffects[sections.indexOf(target) % sectionEffects.length]
          : target.matches('.story-interior')
            ? 'left'
            : target.matches('.story-sign')
              ? 'turn'
              : target.matches('.gallery-item')
                ? index % 3 === 0
                  ? 'turn'
                  : 'rise'
                : index % 2 === 0
                  ? 'left'
                  : 'right';
        target.dataset['reveal'] = effect;
        target.style.setProperty(
          '--reveal-delay',
          target.classList.contains('section') ? '0ms' : (index % 3) * 85 + 'ms',
        );
        target.classList.add('reveal-target');
        observer.observe(target);
      });
      const stopMotion = () => {
        if (!motionPreference.matches) return;
        observer.disconnect();
        targets.forEach((target) => target.classList.add('is-visible'));
      };
      motionPreference.addEventListener('change', stopMotion);
      destroyRef.onDestroy(() => {
        observer.disconnect();
        motionPreference.removeEventListener('change', stopMotion);
      });
    });
  }

  protected closeMenu() {
    this.menuOpen.set(false);
  }
}
