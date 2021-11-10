import { AzureFunction, Context } from "@azure/functions"
import Kraken from "../src/Kraken";
import Data from "../src/Data";
import Coins from "../src/Coins";
import typeCoin from "../src/Models/typeCoin";
import typeOrder from "../src/Models/typeOrder";

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    
    const kraken: Kraken = new Kraken();
    const data: Data = new Data();
    const buys = await data.OpenBuy_Grid();

    for (let buy of buys) {
        const coin: typeCoin = Coins[buy.Ticker];
        const price = (await kraken.AskBid(coin)).Bid;
        
        if(price >= buy.SellOff){
            const currBalance = await kraken.AskBid(coin);
            const txid: string = await kraken.AddOrder({
                pair: coin.KrakenPair,
                type: "sell",
                ordertype: "market",
                price: currBalance.Bid,
                volume: buy.Volume
            });

            const krakenOrder = await kraken.QueryOrder(txid, coin);

           const order: typeOrder = {
                ticker: coin.KrakenPair,
                txid: txid,
                pair: coin.Pair,
                volume: Number(buy.vol),
                price: buy.Volume,
                sellPrice: krakenOrder.sellPrice,
                createdOn: new Date(),
                fee: krakenOrder.fee,
                type: "sell",
                ordertype: "market",
                buyerTxid: buy.TXID,
                sellType: "SellOff",
            }

            const res = data.Seller_Save(order);
        }
    }
};

export default timerTrigger;
