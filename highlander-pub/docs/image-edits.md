# Immagini e movimento — revisione

Immagini rielaborate con lo strumento integrato Imagegen a partire dalle locandine del committente, con gli originali conservati in public/assets.

Asset finali:
- public/assets/logo-clean.png: emblema arancione completo su fondo trasparente.
- public/assets/oktoberfest-clean.png: locandina senza barre Android e margini WhatsApp.
- public/assets/menu-oktoberfest-clean.png: locandina dei tre menù senza interfaccia del telefono.
- public/assets/ribs-clean.png, sausage-clean.png, pork-clean.png: immagini separate delle tre specialità.

Prompt: estrarre il logo completo, preservando spada, scudo, quadrifoglio e scritte; ritagliare le due locandine mantenendo bordi, testi, telefono e prezzi; estrarre ciascuno dei tre piatti senza testi o cornici. Migliorare chiarezza e nitidezza senza cambiare pietanze, colori o disposizione. Il risultato AI può ricostruire piccoli dettagli rispetto allo screenshot originale.

Movimento: effetti di ingresso alternati e sfalsati con IntersectionObserver, leggera parallasse della hero, indicatore di avanzamento e feedback al passaggio del mouse. Aggiornamenti di scorrimento tramite requestAnimationFrame fuori dal rilevamento Angular. Animazioni disattivate con prefers-reduced-motion; tutti gli osservatori e listener rimossi alla distruzione del componente.
