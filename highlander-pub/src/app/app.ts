import { afterNextRender, Component, DestroyRef, ElementRef, HostListener, inject, NgZone, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { liveEvents, weeklyMusic } from './live-program';

@Component({
 selector: 'app-root', standalone: true, imports: [FormsModule],
 templateUrl: './app.html'
})
export class App {
 readonly weeklyMusic = weeklyMusic;
 readonly liveEvents = liveEvents;
 musicWhatsApp(message: string) { return this.whatsapp + '?text=' + encodeURIComponent(message); }

 constructor() {
  const root = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  const destroyRef = inject(DestroyRef);
  const zone = inject(NgZone);
  afterNextRender(() => zone.runOutsideAngular(() => {
   const preference = matchMedia('(prefers-reduced-motion: reduce)');
   const targets = Array.from(root.querySelectorAll<HTMLElement>('.section-heading, .story-photo, .story-copy, .food-card, .drink-card, .featured-event, .october-card, .sports > div, .gallery-grid > button, .reservation > div, .booking-form, .contact-copy, .map-box, .upcoming, .weekly-music-card, .live-event-card, .smart-city-feature, .music-agenda-heading'));
   const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(entries => {
    for (const entry of entries) {
     if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer?.unobserve(entry.target);
     }
    }
   }, { threshold: 0.08, rootMargin: '0px 0px -28px 0px' });
   if (observer && !preference.matches) targets.forEach((target, index) => {
    const effects = ['left', 'right', 'rise', 'rise'];
    target.dataset['reveal'] = target.matches('.section-heading') ? 'rise' : effects[index % effects.length];
    const siblings = Array.from(target.parentElement?.children ?? []);
    target.style.setProperty('--reveal-delay', target.matches('.food-card, .drink-card, .october-card, .gallery-grid > button') ? (siblings.indexOf(target) % 4) * 85 + 'ms' : '0ms');
    target.classList.add('reveal-target');
    observer.observe(target);
   });
   const header = root.querySelector<HTMLElement>('.header');
   const heroImage = root.querySelector<HTMLElement>('.hero-image');
   let frame = 0;
   const renderScroll = () => {
    frame = 0;
    const scroll = window.scrollY;
    const total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    header?.style.setProperty('--scroll-progress', String(Math.min(1, scroll / total)));
    header?.classList.toggle('is-scrolled', scroll > 20);
    if (heroImage) heroImage.style.setProperty('--parallax', preference.matches ? '0px' : Math.min(scroll * 0.12, window.innerWidth < 760 ? 30 : 80) + 'px');
   };
   const schedule = () => { if (!frame) frame = requestAnimationFrame(renderScroll); };
   const revealFocused = (event: FocusEvent) => {
    const target = event.target;
    if (target instanceof Element) target.closest('.reveal-target')?.classList.add('is-visible');
   };
   const stopMotion = () => {
    if (preference.matches) {
     observer?.disconnect();
     targets.forEach(target => target.classList.add('is-visible'));
    }
    schedule();
   };
   window.addEventListener('scroll', schedule, { passive: true });
   window.addEventListener('resize', schedule, { passive: true });
   root.addEventListener('focusin', revealFocused);
   preference.addEventListener('change', stopMotion);
   renderScroll();
   destroyRef.onDestroy(() => {
    observer?.disconnect();
    cancelAnimationFrame(frame);
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    root.removeEventListener('focusin', revealFocused);
    preference.removeEventListener('change', stopMotion);
   });
  }));
 }

 goToSection(event: MouseEvent, id: string) {
  if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const section = document.getElementById(id);
  if (!section) return;
  event.preventDefault();
  this.closeNavigation();
  requestAnimationFrame(() => {
   section.querySelectorAll('.reveal-target').forEach(element => element.classList.add('is-visible'));
   const headerHeight = document.querySelector('.header')?.getBoundingClientRect().height ?? 0;
   const top = Math.max(0, section.getBoundingClientRect().top + window.scrollY - headerHeight - 16);
   const hash = '#' + id;
   if (window.location.hash !== hash) history.pushState(null, '', hash);
   section.setAttribute('tabindex', '-1');
   section.focus({ preventScroll: true });
   window.scrollTo({ top, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  });
 }

 photoUrl(image: string, original = false) { const poster = ['oktoberfest', 'mojo', 'tribeauty', 'smartcity'].includes(image); return 'assets/' + image + (poster ? '-clean' : '') + (original ? (poster ? '.png' : '.jpg') : '.webp'); }

 @ViewChild('photoDialog') photoDialog?: ElementRef<HTMLDialogElement>;
 @ViewChild('menuDialog') menuDialog?: ElementRef<HTMLDialogElement>;
 @ViewChild('privacyDialog') privacyDialog?: ElementRef<HTMLDialogElement>;
 navOpen = false; drinkFilter = 'Tutti'; selectedPhoto = 0;
 name = ''; date = ''; time = '20:30'; people = 2;
 readonly today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Rome' }).format(new Date());
 readonly maps = 'https://www.google.com/maps/search/?api=1&query=Highlander%20Pub%20Piazza%20Armerina&query_place_id=ChIJP-BxH9ceERMRhe58yooC1oU';
 readonly whatsapp = 'https://wa.me/393343584843';
 readonly categories = [
  { name: 'Hamburger e panini', detail: 'Il lato più goloso del pub.', image: 'food' },
  { name: 'Antipasti e fritti', detail: 'Da dividere. O da tenere per sé.', image: 'food' },
  { name: 'Piatti tipici', detail: 'Sapori che fanno stare bene.', image: 'ribs' },
  { name: 'Specialità della casa', detail: 'La nostra anima steakhouse.', image: 'pork' }
 ];
 readonly filters = ['Tutti', 'Birre', 'Whiskey', 'Cocktail'];
 readonly drinks = [
  { name: 'Birre alla spina', type: 'Birre', note: 'Una pinta, due chiacchiere e la tua serata può cominciare.', tag: 'DALLA SPINA', icon: '◉' },
  { name: 'Birre artigianali', type: 'Birre', note: 'Chiedici le etichette disponibili e trova il tuo prossimo brindisi.', tag: 'DA SCOPRIRE', icon: '◈' },
  { name: 'Whiskey irlandesi', type: 'Whiskey', note: 'Il tempo di un buon bicchiere. Scopri la selezione al bancone.', tag: 'IRISH SPIRIT', icon: '◇' },
  { name: 'Cocktail e distillati', type: 'Cocktail', note: 'Classici e creazioni del bancone, con un tocco di Sicilia.', tag: 'MIXOLOGY', icon: '✧' }
 ];
 readonly octoberMenu = [
  { name: 'Costine di maiale locali', description: 'Marinate alla birra con erbe, spezie e verdure, servite con patate al forno.', price: '20', image: 'ribs' },
  { name: 'Wurstel bavarese', description: 'Servito con crauti, patatine e panino croccante.', price: '12', image: 'sausage' },
  { name: 'Stinco di suino al forno', description: 'Cotto lentamente alla birra, con erbe, servito con patate arrosto.', price: '20', image: 'pork' }
 ];
 readonly gallery = [
  { image: 'interior', caption: 'Dentro Highlander', alt: 'Gli interni del vero Highlander Pub a Piazza Armerina' },
  { image: 'food', caption: 'Il gusto del pub', alt: 'Un piatto servito al Highlander Pub' },
  { image: 'bar', caption: 'Ci vediamo al bancone', alt: 'Il bancone del Highlander Pub' },
  { image: 'cocktail', caption: 'Un brindisi alla serata', alt: 'Cocktail del Highlander Pub' },
  { image: 'oktoberfest', caption: 'Oktoberfest · 5–25 ottobre', alt: 'Locandina ufficiale Oktoberfest Highlander Pub' },
  { image: 'tribeauty', caption: 'Tribeauty · Venerdì 9 ottobre', alt: 'Locandina Tribeauty Super Live del 9 ottobre' },
  { image: 'mojo', caption: 'Mojo Vibes · 31 ottobre, ore 22:00', alt: 'Locandina Mojo Vibes live il 31 ottobre 2026 alle 22:00' },
  { image: 'smartcity', caption: 'Highlander e Piazza Smart City', alt: 'Annuncio adesione ufficiale Highlander Pub a Piazza Smart City' }
 ];
 get filteredDrinks() { return this.drinks.filter(d => this.drinkFilter === 'Tutti' || d.type === this.drinkFilter); }
 toggleNavigation() { this.navOpen = !this.navOpen; document.body.classList.toggle('menu-open', this.navOpen); }
 closeNavigation() { this.navOpen = false; document.body.classList.remove('menu-open'); }
 openDialog(dialog: HTMLDialogElement) { dialog.showModal(); document.body.classList.add('dialog-open'); }
 onDialogClose() { document.body.classList.remove('dialog-open'); }
 openPhoto(index: number) { this.selectedPhoto = index; if (this.photoDialog) this.openDialog(this.photoDialog.nativeElement); }
 private touchStart: { x: number; y: number } | null = null;
 startSwipe(event: TouchEvent) { this.touchStart = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null; }
 endSwipe(event: TouchEvent) {
  const start = this.touchStart; this.touchStart = null;
  if (!start || event.changedTouches.length !== 1) return;
  const dx = event.changedTouches[0].clientX - start.x;
  const dy = event.changedTouches[0].clientY - start.y;
  if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) this.movePhoto(dx < 0 ? 1 : -1);
 }
 @HostListener('window:resize')
 resizeNavigation() { if (window.innerWidth > 1024) this.closeNavigation(); }
 movePhoto(direction: number) { this.selectedPhoto = (this.selectedPhoto + direction + this.gallery.length) % this.gallery.length; }
 closeBackdrop(event: MouseEvent, dialog: HTMLDialogElement) { if (event.target === dialog) dialog.close(); }
 @HostListener('document:keydown', ['$event'])
 keydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && this.navOpen) { this.closeNavigation(); document.querySelector<HTMLButtonElement>('.mobile-toggle')?.focus(); }
  if (!this.photoDialog?.nativeElement.open) return;
  if (event.key === 'ArrowRight') this.movePhoto(1);
  if (event.key === 'ArrowLeft') this.movePhoto(-1);
 }
 get bookingUrl() {
  const text = 'Ciao Highlander Pub! Vorrei prenotare un tavolo' + (this.name.trim() ? ' a nome di ' + this.name.trim() : '') + (this.date ? ' per il ' + this.date.split('-').reverse().join('/') : '') + ' alle ' + this.time + ' per ' + this.people + ' persone. Potete confermare la disponibilità?';
  return this.whatsapp + '?text=' + encodeURIComponent(text);
 }
}