const KrakenClient = require("kraken-api");
import typeOrder from "./Models/typeOrder";
import typeCoin from "./Models/typeCoin";
import typePrice from "./Models/typePrice";
import Calc from "./Calc";

class Kraken {
  kraken = new KrakenClient(process.env.krakenKey, process.env.krakenSecret);
  calc: Calc = new Calc();

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

  Balance = async (): Promise<number> => {
    const result = (await this.kraken.api("Balance")).result;
    return result.ZUSD;
  };

  AddOrder = async (order): Promise<string> => {
    try {
      const result = await this.kraken.api("AddOrder", {
        pair: order.pair,
        type: order.type,
        ordertype: order.ordertype,
        volume: order.volume,
        price: order.price,
      });

      return await result.result.txid[0];
    } catch (err) {
      console.log("Error AddOrder: " + err.message);
      return "Error";
    }
  };

  QueryOrder = async (id: string, coin: typeCoin): Promise<typeOrder> => {
    const response = await this.kraken.api("QueryOrders", {
      txid: id,
    })
    const result = response.result[id];

    const sellOff = this.calc.MinSellPrice_WithFee(
      Number(result.price),
      coin.Minimum,
      0.0026,
      0.01
    );

    const order: typeOrder = {
      ticker: coin.Pair,
      txid: id,
      pair: result.descr.pair,
      volume: result.vol,
      price: result.price,
      sellPrice: sellOff,
      createdOn: new Date(),
      fee: result.fee,
      type: result.descr.type,
      ordertype: result.descr.ordertype,
    }

    return order;
  };
}

export default Kraken;