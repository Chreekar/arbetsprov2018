# Arbetsprov 2018
Lista och redigera påhittade avdelningar och anställda, spara i en databas i minnet

### Installationsintruktioner

1. Öppna solution i Visual Studio (.NET Core SDK behöver vara installerat), rebuild solution.
2. Öppna kommandoprompt och navigera till mappen EmployeesExample.Www
3. kör `npm install`
4. kör `node node_modules/webpack/bin/webpack.js --config webpack.config.vendor.js`
5. kör `node node_modules/webpack/bin/webpack.js`
6. Debugga eller kör från Visual Studio

### Noteringar om ServiceStack

* AppHost.cs är ServiceStacks ingång och den som registrerar tjänster, databaskoppling mm
* En licensnyckel behöver anges i appsettings.json för att kunna köra i en annan miljö än localhost
* Mer info finns på http://docs.servicestack.net/create-your-first-webservice