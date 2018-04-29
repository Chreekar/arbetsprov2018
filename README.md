# Arbetsprov 2018
Lista och redigera påhittade avdelningar och anställda, spara i en databas i minnet

### Installationsintruktioner

Öppna solution i Visual Studio (.NET Core SDK behöver vara installerat), bygg och kör.

### Noteringar om ServiceStack

* AppHost.cs är ServiceStacks ingång och den som registrerar tjänster, databaskoppling mm
* En licensnyckel behöver anges i appsettings.json för att kunna köra i en annan miljö än localhost
* Mer info finns på http://docs.servicestack.net/create-your-first-webservice