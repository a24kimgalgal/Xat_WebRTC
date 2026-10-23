# Xat P2P

Aplicació mínima de xat punt a punt amb simple-peer i WebRTC. El servidor gestiona la llista d'usuaris i retransmet la senyalització per WebSocket; els missatges s'envien directament entre navegadors.

## Execució local

1. Instal·la Node.js.
2. Executa `npm install`.
3. Executa `npm start`.
4. Obre `http://localhost:3000` en dos navegadors o pestanyes diferents i entra amb noms diferents.

La pàgina carrega simple-peer des d'un CDN. Per provar-la des d'un altre dispositiu, cal publicar el servidor en una adreça accessible. En entorns de producció es recomana HTTPS, que també habilita WebSocket segur (WSS).
