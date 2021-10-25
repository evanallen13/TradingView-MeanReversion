
type typeOrder = {
    ticker: string,
    txid?: string,
    pair: string,
    volume: number,
    price?: number,
    sellPrice: number,
    createdOn: Date,
    stopLoss: number,
    fee:number,
    type: "buy" | "sell",
    ordertype: "market" | "limit" | "stop-loss",
}

export default typeOrder;