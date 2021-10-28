import typeCoin from "./Models/typeCoin";

const Coins: { [pair: string]: typeCoin } = {};

Coins.BTCUSD = {
    Pair: "BTCUSD",
    KrakenPair: "XXBTZUSD",
    Minimum: 0.0001,
    Decimal: 1,
};

Coins.DOGEUSD = {
    Pair: "DOGEUSD",
    KrakenPair: "XDGUSD",
    Minimum: 50,
    Decimal: 7,
};

// Coins.XRPUSD = {
//     Pair: "XRPUSD",
//     KrakenPair: "XXRPZUSD",
//     Minimum: 5,
//     Decimal: 8,
// };

export default Coins;