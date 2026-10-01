# Pasticceria Siciliana — Punta Ala

Landing Angular 22, SCSS, responsive.

## Avvio e verifica

Node 26.10.0 installato permanentemente. Riaprire il terminale se l'aggiornamento non viene rilevato.

- npm install
- npm start
- npm run build
- npm test -- --watch=false

## Contenuti confermati

- Pasticceria Siciliana, a gestione familiare.
- Condominio Il Delfino, Via Lattea, 58043 Punta Ala (GR).
- Telefono e WhatsApp: +39 329 154 4558.
- Giovedì–domenica 07:30–12:30; lunedì–mercoledì chiuso.
- Torte su ordinazione.

La pagina propone Hero, Specialità, Chi siamo, Gallery, Torte su ordinazione, Valori, Contatti e Footer.
WhatsApp usa messaggi precompilati per informazioni e richieste di torte; non invia messaggi automaticamente.

## Da completare prima della pubblicazione

La landing usa le foto reali recuperate dalla scheda Google Maps. Fonti: public/images/google-maps/manifest.json.
Sostituirle con fotografie dell'attività e confermare le categorie colazione e pasticceria.
Inserire eventuali recensioni reali con autore e fonte, social, dati fiscali e informativa privacy pertinente.
La sezione recensioni appare soltanto se contiene dati; non ci sono testimonianze inventate.
La mappa Google viene caricata solo al clic su Mostra mappa.

## Struttura

- src/app/site-content.ts: servizi attivi, gallery e recensioni.
- src/app/app.html: sezioni e contenuti.
- src/app/app.scss: stile e breakpoint.
- src/app/app.ts: orari, menu, WhatsApp e mappa.
- src/app/app.spec.ts: contatti, menu, messaggi e caricamento della mappa.
- vitest.config.mts: un worker thread per l'ambiente Windows.

## Posizione esatta e fotografie
Plus Code: RQ49+4Q Punta Ala, Provincia di Grosseto. Coordinate verificate: 42.8053453, 10.7694705.
Mappa e indicazioni puntano alle coordinate esatte.
Archiviati 11 file: 10 foto uniche e un duplicato. Google Maps indica 88 foto ma la consultazione senza accesso ne rende disponibili soltanto 10 uniche.
La galleria contiene tutte le 10 foto uniche accessibili, inclusa la stessa insegna fornita dal cliente. I precedenti file Unsplash sono conservati ma non utilizzati.

## Anniversario e recensioni
Nel 2026 ricorre il 50° anno di gestione, informazione confermata dal cliente.
Recensioni Google Maps verificate il 1 ottobre 2026: 4,6/5 su 97 recensioni. Tre estratti e sintesi con autori e valutazioni originali; preservate anche le osservazioni critiche. Fonti e ID: public/google-reviews-sources.json.

## Navigazione e recensioni aggiornate
Navbar persistente durante lo scroll, con Perché sceglierci e Recensioni; menu compatto sotto 1100px.
Nella pagina si mostrano solo i nomi Alessandra, Marco e Sam. Tatiana sostituita con Sam Mir; testo verificato nella raccolta Sluurpy delle recensioni Google, fonte salvata nel manifest.
