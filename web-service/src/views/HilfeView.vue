<template>
  <div class="help-container">
    <h2>Wie funktioniert Fototransfer?</h2>
    <p>
      In dieser Galerie siehst du alle hochgeladenen Bilder, die du vom Telefon
      hochgeladen hast.
    </p>
    <h3>Bilder auswählen</h3>
    <p>
      - Klicke auf ein Bild, um es auszuwählen oder abzuwählen.<br />
      - Alternativ kannst du den Button "<strong>Alle auswählen</strong>"
      nutzen, um alle Bilder auf einmal zu markieren.
    </p>
    <h3>Bilder herunterladen</h3>
    <p>
      - Sobald du mindestens ein Bild ausgewählt hast, erscheint der Button
      "<strong>Ausgewählte herunterladen</strong>".<br />
      - Klick darauf, um alle ausgewählten Bilder als ZIP-Datei herunterzuladen.
      <br />
      - Alternativ kannst du den Button "<strong>Alle herunterladen</strong>"
      nutzen, um alle Bilder auf einmal herunterzuladen.
    </p>
    <h3>Hinweis</h3>
    <p>
      Die Galerie lädt die Bilder automatisch von deinem Server.<br />
      Stelle sicher, dass du mit dem Internet verbunden bist und die Bilder
      hochgeladen wurden.
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.help-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  color: #333;
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

h2 {
  color: #2a9d8f;
  margin-bottom: 15px;
}

h3 {
  margin-top: 25px;
  color: #333;
}

p {
  margin-bottom: 15px;
  font-size: 16px;
}

strong {
  color: #e76f51;
}
</style>
