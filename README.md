# Web Push Demo

## Wymagania

 - Zainstalowany nodejs

# How to run?

```
node ./server.js
```

## Jak to działa?
1. Wygeneruj klucze VAPID

```shell
node ./vapidkey-generator.js
```

2. Rejestracja service workera

Następuje po wejściu na stronę przez użytkownika. Service worker to javascript chodzący w tle nawet po zamknięciu karty.

```js
var sw = await navigator.serviceWorker.register("./sw.js");
console.log("service worker registered!", sw);
```

3. Użytkownik zgadza się na subscrypcję

```js
var sw = await navigator.serviceWorker.ready;
var pushInfo = await sw.pushManager.subscribe({
userVisibleOnly: true,
applicationServerKey:
    "<wygenerowany-klucz-publiczny-VAPID"
});
```

4. Przesyłamy klucz użytkownika na serwer

```js
 fetch("/subscription", {
        method: "POST",
        body: JSON.stringify(pushInfo),
        headers: {
          "Content-Type": "application/json"
        }
      });
```

5. Serwer wysyła pusha używając swojego klucza i klucza użytkownika

```js
var push = require("web-push");

let vapidkey = {}; // klucz serwera

push.setVapidDetails("mailto:hello@example.com",vapidkey.publicKey,vapidkey.privateKey);

let sub = {}; // klucz użytkownika
push.sendNotification(sub);
```

6. Service worker odbiera informacje i wyświetla powiadomienie

```js
self.addEventListener("push", function(e) {
  e.waitUntil(self.registration.showNotification("Hello world!", {
    body: "Sample notification"
  }));
});
```