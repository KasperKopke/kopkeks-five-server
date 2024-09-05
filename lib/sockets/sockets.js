import { lights } from "../handlers/commands.handler.js";

const sockets = (socket) => {
  // Her lytter vi på en besked fra klienten

  socket.on("lights", () => {
    lights(socket); // Send socket-objektet videre til lights-funktionen
  });
};

export default sockets;
