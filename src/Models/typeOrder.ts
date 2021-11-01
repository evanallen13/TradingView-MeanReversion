import enumTrader from "./enumTraders";

type typeOrder = {
    ticker: string,
    txid: string,
    pair: string,
    volume: number,
    price: number,
    sellPrice: number,
    createdOn: Date,
    fee:number,
    type: "buy" | "sell",
    ordertype: "market" | "limit" | "stop-loss",
    trader?: enumTrader

    buyerTxid?: string;
    sellType?: "SellOff" | "StopLoss"
}

export default typeOrder;