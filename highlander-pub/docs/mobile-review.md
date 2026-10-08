# Verifica mobile — 8 ottobre 2026

La navigazione compatta si attiva fino a 1024 px. Il pannello scorre verticalmente anche con il telefono in orizzontale, blocca lo scorrimento della pagina sottostante, si chiude scegliendo una sezione, premendo Escape o toccando lo sfondo. Include la prenotazione.

Pulsanti e controlli principali hanno bersagli touch di almeno 44 px. I campi usano caratteri da 16 px; sui telefoni fino a 420 px ciascun campo occupa una riga. Le locandine della galleria rimangono complete. I dialoghi rispettano il viewport dinamico e mantengono raggiungibili chiusura e frecce; le foto supportano lo swipe orizzontale.

## Immagini

Le versioni WebP per la pagina sono ricavate con ridimensionamento proporzionale a massimo 1024 px e qualità 88% (logo 192 px). Nessuna modifica ai contenuti delle locandine. Gli originali restano disponibili nell'ingrandimento. I nove PNG elaborati totalizzano 22.222.938 byte; i corrispondenti WebP 2.741.926 byte, circa 88% in meno.

## Controlli

Build Angular di produzione con base /Tutorial-Angular/highlander-pub/: riuscita.
Verifica automatizzata in Edge/Chromium con emulazione viewport:
320×740, 360×800, 390×844, 430×932, 768×1024, 820×1180,
844×390, 1024×768 e desktop 1440×900.

Controllati assenza di overflow laterale, logo, navigazione alle sezioni, chiusura del pannello, dialoghi entro lo schermo, pulsante di chiusura del menù durante lo scorrimento, cambio foto, caricamento di tutte le immagini e messaggio WhatsApp con il nome inserito. Verifiche visive sulle schermate del browser. Non equivale a un test su dispositivi fisici iOS/Android.
