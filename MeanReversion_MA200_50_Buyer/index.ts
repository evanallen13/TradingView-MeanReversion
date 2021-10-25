import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import Kraken from "../src/Kraken";
import Coins from "../src/Coins";
import typePrice from "../src/Models/typePrice";
import typeBuy from "../src/Models/typeBuy";
import typeCoin from "../src/Models/typeCoin";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const ticker: string = req.query.ticker; //req.body.ticker;
    const kraken: Kraken = new Kraken();
    const coin: typeCoin = Coins[ticker];
    const [currBalance, askBid] = await Promise.all([kraken.Balance(), kraken.AskBid(coin)]);

    // if (coin.Minimum * askBid.Ask < currBalance) {
    //     context.log("Buy");
    // }

    const responseMessage = `Ther price of ${coin.KrakenPair} is $${askBid.Ask}. \n Current bal ${currBalance}`;

    context.res = {
        body: responseMessage
    };
};

export default httpTrigger;