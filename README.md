# 1DV449 Laboration 3 - MashUp

#### Memos
If you want to do some work on this repo locally then first make sure you've got node.js installed. After that run npm install in the root directory to install dependencies needed like angular source files and such which isn't present in this repo. This repo is kind of a compiled version so to say to avoid unneccessary files.
   
Make sure you concatinate and minify the javascript and css files after changing them in the following way: Make sure so you've got Grunt installed and just use a terminal to run the 'grunt' command in the project root. Now you're good to go.

Johnny Pesola, December 2015

-----

## Reflektionsfrågor

### Vad finns det för krav du måste anpassa dig efter i de olika API:erna?

Ett krångligt krav att anpassa sig efter var det JSON specifika Date objektet ifrån SR:s API som jag inte kunde hitta något annat sätt än att helt enkelt parsa strängen på den till ett nytt Date objekt. Att tillämpa google maps API in i angular gör det krångligt att komma åt och använda google maps API direkt, eftersom jag valde att använda angular pluginen ng-maps. Det är allmänt svårt att hitta bra dokumentation för att få till önskade lösningar och man får ibland gissa och prova sig fram för att nå önskade effekter och förlita sig på lite tur. När jag hämtade lite information ifrån SR:s API så lyckades jag inte använda API:ets specifika sorteringsparamtrar. Vilket gjorde att jag inte garanterat kunde få ut de senaste händelserna om jag inte hämtade alla händelser på en gång.

### Hur och hur länge cachar du ditt data för att slippa anropa API:erna i onödan?

Datat som hämtas ifrån SR:s api lagras i webbläsarens localstorage genom pluginet angular-cache. Har inte webbläsaren stöd för detta så lagras detta endast i webbläsarens minne. Max livslängden är 15 minuter för http-requesten ifrån SR:s api, vilket gör att nytt data hämtas tidigast var 15:e minut. Dock är cachen inställd på att flushas var 60:e minut, så det kan hända att data ibland lagras kortare än 15 minuter.
    
Allmänt kan 15 minuter för en sådan här app tyckas vara lite för lång tid att vänta för en uppdatering, men det är nog SR glada för.

### Vad finns det för risker kring säkerhet och stabilitet i din applikation?

När angular hämtar ny data ifrån cachen eller SR:s api så försvinner markersen på google-kartan för en kort stund i samband med att marker-värderna uppdateras. Detta kan bli jobbigt om angular kollar efter uppdaterad data för alldeles för ofta. Eftersom jag använder mig av olika plugins till angular så kan risken caching biblioteket inte fungerar som det ska om applikationen står på under lång tid. Men jag har inte märkt någon prestandaförminkning eller ovanlig minnesallokering för webbläsaren hittills. Den stora riksen är att jag förlitar mig mycket på att angular fungerar som det ska och det är svårt för mig att sätta mig in i exakt hur angular fungerar i motsvarighet om jag hade kodat allt själv från början.
    
Det finns en potentiell risk för XSS attack ifrån SR:s API, men angular nautraliserar detta på ett accepterat sätt. Mer om detta i rubriken nedan.

### Hur har du tänkt kring säkerheten i din applikation?

Jag provade mig på simulera XSS attacker genom att skriva javascript i GET-datan in i angular, men angular sköter detta bra genom att skriva ut strängarna som de är utan att koden körs i klientens webbläsare.

### Hur har du tänkt kring optimeringen i din applikation?

Jag har konfigurerat verktyget Grunt för att konkatinera och minifiera alla javascript-filer i applikationen till en enda fil med namnet "all.concat.min.js", lika så med alla CSS stilmallar till filen "all.concat.min.css". Det här inkluderar alla javasript bibliotek som applikationen är beroende av samt alla applikationsspecifika javascript-filer. CSS-filerna som berörs är bootstrap.css och app.css. Dock så rensade jag bootstrap filen på onödiga stilar för glyphs, vilka jag inte använder i applikationen.
