import typeCoin from "./Models/typeCoin";

const Coins: { [pair: string]: typeCoin } = {};

Coins.BTCUSD = {
    Pair: "XBTUSD",
    KrakenPair: "XXBTZUSD",
    Minimum: 0.0001,
    Decimal: 1,
    SellOff_Percent: 1.05
};

Coins.XDGUSD = {
    Pair: "XDGUSD",
    KrakenPair: "XDGUSD",
    Minimum: 50,
    Decimal: 8,
    SellOff_Percent: 1.01
};

export default Coins;