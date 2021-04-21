module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      gas: 3000000000,
      network_id: "*" // match any network
    }
  }
};