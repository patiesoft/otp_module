const smpp = require("smpp");
const session = new smpp.Session({ host: "10.103.19.74", port: 5002 });
let isConnected = false;

// console.log(session);

session.on("connect", () => {
  isConnected = true;
});

session.bind_transceiver(
  {
    system_id: "Genesys",
    password: "sYs@1321",
    system_type: "GsYs",
  },
  (pdu) => {
    if (pdu.commad_status == 0) {
      console.log("Succeffully Bound");
    }
  }
);

session.on("close", () => {
  console.log("smpp is now disnonnected");
  if (isConnected) {
    session.connect();
  }
});

session.on("error", (error) => {
  console.log("smpp error", error);
  isConnected = false;
});
