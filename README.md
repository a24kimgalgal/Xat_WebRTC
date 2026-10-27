# Xat P2P

Aplicació mínima de xat punt a punt amb simple-peer i WebRTC. El servidor gestiona la llista d'usuaris i retransmet la senyalització per WebSocket; els missatges s'envien directament entre navegadors. La llibreria `simple-peer` es carrega localment des de `node_modules`, sense dependre d'un CDN.

## Execució local

1. Instal·la Node.js.
2. Executa `npm install` per instal·lar les dependències del projecte.
3. Executa `npm start`.
4. Obre `http://localhost:40603` en dos navegadors o pestanyes diferents i entra amb noms diferents.
