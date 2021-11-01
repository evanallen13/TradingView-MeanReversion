import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import Kraken from "../src/Kraken";
import Coins from "../src/Coins";
import typeCoin from "../src/Models/typeCoin";
import Data from "../src/Data";
import enumTrader from "../src/Models/enumTraders";
import typeOrder from "../src/Models/typeOrder";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const ticker: string = req.body.ticker; //req.query.ticker
    const trader: enumTrader = enumTrader[req.body.trader];

    let responseMessage: string = "Went through";
    const kraken: Kraken = new Kraken();
    const coin: typeCoin = Coins[ticker];
    const data: Data = new Data();

    if (ticker !== undefined && trader !== undefined) {

        const buys = await data.OpenBuy_Select(ticker, trader);
        let orders: typeOrder[] = [];
        let vol: number = 0;

        for (let buy of buys) {
            vol += Number(buy.Volume);

            orders.push({
                ticker: coin.KrakenPair,
                txid: null,
                pair: coin.Pair,
                volume: Number(buy.vol),
                price: buy.Volume,
                sellPrice: null,
                createdOn: new Date(),
                fee: null,
                type: "sell",
                ordertype: "market",

                buyerTxid: buy.TXID,
                sellType: "StopLoss",
            })
        }

        const currBalance = await kraken.AskBid(coin);

        const txid: string = await kraken.AddOrder({
            pair: coin.KrakenPair,
            type: "sell",
            ordertype: "market",
            price: currBalance.Bid,
            volume: vol
        });

        const krakenOrder = await kraken.QueryOrder(txid, coin);

        for (let sale of orders) {
            sale.txid = txid;
            sale.fee = krakenOrder.fee;
            const res = data.Seller_Save(sale);
        }


    } else {
        responseMessage = "Need both Trader and Ticker";
    }

    context.res = {
        body: responseMessage
    };

};

export default httpTrigger;