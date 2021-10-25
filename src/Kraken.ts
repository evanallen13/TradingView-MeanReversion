const KrakenClient = require("kraken-api");
import typeOrder from "./Models/typeOrder";
import typeCoin from "./Models/typeCoin";
import typePrice from "./Models/typePrice";

class Kraken {
  kraken = new KrakenClient(process.env.krakenKey, process.env.krakenSecret);

  Price = async (ticker: string): Promise<number> => {
    const price = (await this.kraken.api("Ticker", { pair: ticker })).result[
      ticker
    ].a[0];
    return Number(price);
  };

  AskBid = async (coin: typeCoin): Promise<typePrice> => {
    const price = (await this.kraken.api("Ticker", { pair: coin.KrakenPair }))
      .result[coin.KrakenPair];
    const priceObj: typePrice = { Ask: price.a[0], Bid: price.b[0] };

    return priceObj;
  };

  Balance = async () => {
    const result = (await this.kraken.api("Balance")).result;
    return result.ZUSD;
  };

  AddOrder = async (order: typeOrder): Promise<string> => {
    try {
      const result = await this.kraken.api("AddOrder", {
        pair: order.pair,
        type: order.type,
        ordertype: order.ordertype,
        volume: order.volume,
        price: order.price,
      });

      return result.result.txid[0];
    } catch (err) {
      console.log("Error: " + err.message);
      return "Error";
    }
  };

  QueryOrder = async (id: string) => {
    const result = await this.kraken.api("QueryOrders", {
      txid: id,
    });

    return result.result[id];
  };
}

export default Kraken;