self.addEventListener("push", function(e) {
  e.waitUntil(self.registration.showNotification("Hello world!", {
    body: "Sample notification"
  }));
});
