# Sicherheitsprüfung – Schulbus Fahrer, Version 1.1

Geprüft am: 12.09.2026

## Ergebnis: ✅ Alles sauber

| Prüfung | Ergebnis |
|---|---|
| Virenscan (Microsoft Defender) der Datei `schulbus-fahrer-v1.1.zip` | **Keine Bedrohungen gefunden** |
| Karten-Bibliothek (Leaflet) | Wird nur noch mit Echtheits-Prüfsumme geladen – eine veränderte oder gefälschte Datei würde die App **nicht** akzeptieren |
| Schutzregeln im Browser (Content Security Policy) | Die App darf nur noch mit den nötigen Diensten reden (OpenStreetMap-Karte und Adresssuche) – sonst nichts |
| Datenübertragung | Die App sendet **keine** Fahrdaten ins Internet. Alles bleibt auf dem Handy gespeichert |
| Konto | Die PIN wird nur verschlüsselt (SHA-256) auf dem Gerät gespeichert |

## Prüfsumme der ZIP-Datei

Damit der Empfänger prüfen kann, dass die Datei unterwegs nicht verändert wurde:

```
SHA-256: 4917566EEC4685227217365099E3257CAB742DAEC931F7A20DFD418B3907BFEE
```

Der Empfänger kann auf seinem Windows-PC in der PowerShell eingeben:
`Get-FileHash schulbus-fahrer-v1.1.zip` – kommt dieselbe Zeichenfolge heraus, ist die Datei unverändert.

## Empfehlung für den Versand per E-Mail

**Am besten NICHT die ZIP-Datei anhängen, sondern nur den Link oder den QR-Code schicken:**

> https://edmarkieper-prog.github.io/Schulbus/?v=1.1

Gründe:

1. Viele E-Mail-Anbieter (Gmail, Outlook) blockieren ZIP-Anhänge mit Programmdateien oder stufen sie als Spam ein.
2. Der Link führt immer zur **neuesten, geprüften Version** – ein Anhang veraltet.
3. Die App ist eine Web-App: Es wird **nichts installiert**, es gibt keine .exe- oder .apk-Datei. Der Empfänger öffnet nur eine Internetseite und fügt sie zum Startbildschirm hinzu. Dadurch ist das Virusrisiko für den Empfänger praktisch null.
4. Der QR-Code (`app-qrcode.png`) kann bedenkenlos als Bild in die E-Mail eingefügt werden – ein Bild kann keine Viren übertragen.

Wenn es doch die ZIP-Datei sein soll: Sie wurde mit Microsoft Defender geprüft (keine Bedrohungen) und die Prüfsumme oben mitschicken.
