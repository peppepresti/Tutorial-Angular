// Appuntamenti comunicati dal titolare; concerti dalle locandine fornite.
// Aggiungere le prossime band a liveEvents mantenendo la data ISO per <time>.
export const weeklyMusic = [
 { day: 'GIOVEDÌ', title: 'Jam session', description: 'Il giovedì ci si incontra al pub per suonare insieme. Una serata di musica condivisa, incontri e improvvisazione.', message: 'Ciao Highlander! Vorrei informazioni sulla jam session di giovedì e sulla disponibilità di un tavolo.' },
 { day: 'VENERDÌ', title: 'Una band diversa. Ogni settimana.', description: 'Il venerdì sera il palco cambia voce: una band diversa ogni settimana, la stessa voglia di vivere la musica dal vivo.', message: 'Ciao Highlander! Quale band suona questo venerdì? Vorrei informazioni e prenotare un tavolo.' }
] as const;
export const liveEvents = [
 { name: 'Tribeauty', label: 'VENERDÌ LIVE', date: '2026-10-09', displayDate: 'Venerdì 9 ottobre', time: '', description: 'Super Live al pub con il power trio Tribeauty. Il prossimo appuntamento del venerdì.', image: 'tribeauty', photoIndex: 5 },
 { name: 'Mojo Vibes', label: 'EVENTO SPECIALE', date: '2026-10-31', displayDate: 'Sabato 31 ottobre', time: '22:00', description: 'Mojo Vibes live all’Highlander Pub. Una serata speciale per chiudere ottobre a ritmo di musica.', image: 'mojo', photoIndex: 6 }
] as const;
