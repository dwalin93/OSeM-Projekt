# OSeM-Projekt

Dass ist das Readme zum Studienprojekt "Interfacing Geogames and Sensors". Ziel des Projektes war es, die OpenSenseMap zu gamifizieren und somit den Anreiz zu erhöhen,
neue Boxen zu registrieren und Sensoren hinzuzufügen, um bessere und flächendeckendere Messungen durchzuführen. 

Um dies zu erreichen, wurde die OpenSensemap um ein Usermanagement erweitert und ein Spiel eingebunden, welches den spielerischen Aspekt darstellt. 

Im Master-Branch liegt der erste Ansatz mit einer eigenen API vor. 

In den beiden Anderen (`api-branch` und `osemOhneApi`) findet man die endgültige Version mit der OSeM-API. 

Im api-branch liegt die originale OSeM-API, welche durch unsere Funktionen erweitert wurde. Im osemOhneApi liegt das originale Frontend, welches ebenfalls um unsere Views und Funktionen 
erweitert wurden. 

Um den Master-Branch zu starten, sind folgende Schritte notwendig:

**install:**
- node.js
- mongoDB

Dann muss zunächst der `npm install` und der `bower install` durchgeführt werden

Anschließend muss man einen data ordner im Projekt anlegen. Dann muss man die Mongodatenbank aus der Konsole mit dem Befehl: `mongod --dbpath `<data ordner>``

Danach muss noch der Nodeserver gestartet werden mit dem Befehl: `node ./bin/www`

Um den api-branch zu starten sind folgende Schritte notwendig:

**install**
- docker
- docker-compose

Dann muss in der Konsole `docker-compose up` ausgeführt werden

Um den osemOhneApi Branch zu starten sind folgende Schritte notwendig:

Zuerst muss der `npm install` und der `bower install` durchgeführt werden

Dann muss in der Konsole `grunt serve` ausgeführt werden