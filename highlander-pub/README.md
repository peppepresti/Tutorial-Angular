# Highlander Pub

Landing page Angular standalone, responsive. Tutte le nove sezioni richieste.

## Avvio

`npm install`
`npm start`

## Produzione

`npm run build` produce gli asset statici in dist.

## Fonti e contenuti

Locandine fornite dal committente: Oktoberfest 5–25 ottobre, menù €20/€12/€20 con bibita inclusa, telefono e indirizzo. Le locandine non riportano un anno; non se ne attribuisce uno all’evento.
Google Maps place ID: ChIJP-BxH9ceERMRhe58yooC1oU. Accesso diretto alla scheda non riuscito. Orari confrontati con Wanderlog, Restaurant Guru e MT Magazine: martedì–domenica 17:00–02:00, lunedì chiuso. Alcune directory riportano orari diversi nel weekend: confermare con il titolare.
Fonti: https://wanderlog.com/place/details/1288798/highlander-pub ; https://restaurantguru.it/Highlander-Pub-Piazza-Armerina ; https://mtmagazine.it/inserzioni/highlander-pub/
Storia: famiglia Scroppo da MT Magazine, testo originale sintetico.

## Da completare con il titolare

PDF del menù ordinario; etichette effettive di birre e whiskey; calendario di concerti/quiz e delle dirette sportive; Instagram ufficiale; ragione sociale, P.IVA e informativa privacy completa. Il sito non inventa partite o eventi confermati. Il pulsante del menù mostra la locandina disponibile e permette di richiedere il menù completo via WhatsApp.
Le immagini della locandina sono illustrazioni promozionali, non foto scattate ai piatti. Foto pubbliche Google: verificare autorizzazioni per pubblicazione commerciale.
Il modulo prepara un messaggio WhatsApp; non conserva dati e non conferma prenotazioni. Mappa Google incorporata; nessuna analitica.

## Provenienza delle foto integrate

- interior.jpg: https://mtmagazine.it/wp-content/uploads/2021/04/DSC04450-1024x704.jpg
- bar.jpg: https://mtmagazine.it/wp-content/uploads/2021/04/DSC04786-1024x370.jpg
- cocktail.jpg: https://itin-dev.wanderlogstatic.com/freeImage/bETTrd8jWzpLjX7Gdk8yweeOnrtDIeKm
- food.jpg: https://menu.sluurpy.it/foto-piatti/231376/57530223.jpg
- meat.jpg: https://menu.sluurpy.it/foto-piatti/231376/57530222.jpg

Le foto rappresentano il locale e sono state recuperate da pagine dedicate su MT Magazine, Wanderlog e Sluurpy. Non sono state estratte direttamente da Google Maps. Il marchio mostrato nella testata è un ritaglio visivo CSS della locandina fornita, senza modificare il file originale. Il favicon è un quadrifoglio stilizzato arancione.
La registrazione Sites privata è conservata in .openai/hosting.json; la pubblicazione non è stata completata perché l’ambiente Windows non permette il terminale interattivo richiesto dal flusso di caricamento. Gli asset statici compilati in dist possono essere serviti da qualsiasi hosting statico.

## Pubblicazione GitHub Pages

Il pub viene pubblicato in /Tutorial-Angular/highlander-pub/ nello stesso repository della pasticceria, che mantiene la pagina principale. Il workflow ../.github/workflows/pages.yml compila entrambi i progetti e carica un unico artefatto GitHub Pages a ogni push su main.

Build: npm run build -- --base-href /Tutorial-Angular/highlander-pub/
Le immagini usano percorsi relativi alla base. Originali screenshot e configurazione Sites restano locali e non vengono pubblicati.
