import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import Kraken from "../src/Kraken";
import Coins from "../src/Coins";
import typeCoin from "../src/Models/typeCoin";
import Data from "../src/Data";
import enumTrader from "../src/Models/enumTraders"; 

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    const ticker: string = req.query.ticker; //req.body.ticker;
    const trader: enumTrader = enumTrader[req.query.trader];
    const kraken: Kraken = new Kraken();
    const coin: typeCoin = Coins[ticker];
    const data: Data = new Data();

    // Need Ticker 
    const buys = await data.OpenBuy_Select(ticker, trader);

    for(let buy of buys){
        context.log(buy.Ticker)
    }


};

export default httpTrigger;