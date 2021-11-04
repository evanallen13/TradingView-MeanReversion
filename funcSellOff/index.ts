import { AzureFunction, Context } from "@azure/functions"
import Kraken from "../src/Kraken";
import Data from "../src/Data";
import Coins from "../src/Coins";
import typeCoin from "../src/Models/typeCoin";

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    
    const kraken: Kraken = new Kraken();
    const data: Data = new Data();
    const buys = await data.OpenBuy_Grid();

    for (let buy of buys) {
        const coin: typeCoin = Coins[buy.Ticker];
        const price = (await kraken.AskBid(coin)).Bid;
        console.log(buy);
        if(price >= buy.SellOff){
            console.log("Sell Off");
        }
    }
};

export default timerTrigger;
