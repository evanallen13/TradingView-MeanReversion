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
        let vol: number = 0;

        for (let buy of buys) {
            vol += Number(buy.Volume);
        }

        // const order: typeOrder = {
        //     pair: coin.KrakenPair,
        //     type: "sell",
        //     ordertype: "market",
        //     price: 20,
        //     volume: 333
        // };


    } else {
        responseMessage = "Need both Trader and Ticker";
    }

    context.res = {
        body: responseMessage
    };

};

export default httpTrigger;