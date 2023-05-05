const net = require("net");

const server = net.createServer();

const clients = [];

server.on("connection", (socket) => {
  console.log("Connected to the client");
  const clientId = clients.length + 1;

  clients.map((client) => {
    client.socket.write(`User ${clientId}: joined!`);
  });

  socket.on("end", () => {
    clients.map((client) => {
      client.socket.write(`User ${clientId}: left!`);
    });
  });


  socket.write(`id-${clientId}`);
  socket.on("data", (data) => {
    // socket.write(data)
    const dataString = data.toString("utf-8");
    const id = dataString.substring(0, dataString.indexOf("-"));
    const message = dataString.substring(dataString.indexOf("-message-") + 9);
    console.log('index - ',dataString.indexOf("-message-"))
    clients.map((client) => {
      client.socket.write(`> User ${id}: ${message}`);
    });
  });
  clients.push({ id: clientId.toString(), socket });
  // console.log('clients - ', clients)
});

server.listen(3000, () => {
  console.log("opened server on ", server.address());
});
