'use strict';

//The code exports an object with two asynchronous functions: register and bootstrap.

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {

    //Socket.io Setup:
    //The bootstrap function import the socket.io library and create a new Server instance
    const { Server } = require("socket.io");

    // The Server instance is configured with CORS settings to allow all origins and only GET and POST methods
    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: "*", // Allow all origins to connect
        methods: ["GET", "POST"], // Allow only GET and POST methods
      },
    });

    //Connection Event:
    //The io.on("connection") event listener is set up to log when a user connects to the socket.io server.
    // Listen for new connections to the socket.io server
    io.on("connection", (socket) => {

      //Send-Changes Event:
      //The socket.on("send-changes") event listener listens for changes sent by a client.
      //When changes are received, they are broadcast to all other connected clients using socket.broadcast.emit("receive-changes", delta).
      // Listen for "send-changes" events from the client
      socket.on("send-changes", (data) => {
        // Broadcast the received changes to all other connected clients
        socket.broadcast.emit("receive-changes", data);
      });

  
    });
  },
};
