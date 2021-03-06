import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import Kraken from "../src/Kraken";
import Coins from "../src/Coins";
import typeCoin from "../src/Models/typeCoin";
import Data from "../src/Data";
import enumTrader from "../src/Models/enumTraders";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const ticker: string = req.query.ticker; //req.body.ticker;
  const trader: enumTrader = enumTrader[req.query.trader];
  const coin: typeCoin = Coins[ticker.toUpperCase()];
  const kraken: Kraken = new Kraken();
  const data: Data = new Data();
  const [currBalance, askBid] = await Promise.all([kraken.Balance(), kraken.AskBid(coin)]);

  console.log({
    ticker: ticker,
    pair: coin.Pair,
    type: "buy",
    ordertype: "limit",
    volume: coin.Minimum,
    price: askBid.Ask
  })

  if (coin.Minimum * askBid.Ask < currBalance) {

    const txid: string = await kraken.AddOrder({
      ticker: ticker,
      pair: coin.Pair,
      type: "buy",
      ordertype: "limit",
      volume: coin.Minimum,
      price: askBid.Ask
    });

    const krakenOrder = await kraken.QueryOrder(txid, coin);

    krakenOrder.trader = trader;
    data.Buyer_Save(krakenOrder);
  }
};

export default httpTrigger;