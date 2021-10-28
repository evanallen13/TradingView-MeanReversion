const sql = require("mssql");
const con = process.env.con;
import typeOrder from "./Models/typeOrder";
class Data {

    OpenBuy_Grid = async () => {
        try {
            await sql.connect(con);
            const request = new sql.Request();
            const result = await request.execute("OpenBuy_Grid");
            return await result.recordset;
        } catch (err) {
            console.log("OpenBuy_Grid " + err.message);
        }
    };

    OpenBuy_Select = async (pair: string, trader: string) => {
        try {
            await sql.connect(con);
            const request = new sql.Request()
                .input("Ticker", pair)
                .input("Trader", trader)
            const result = await request.execute("OpenBuy_Select");

            return await result.recordset;
        } catch (err) {
            console.log("OpenBuy_Select " + err.message);
        }
    };

    Buyer_Save = async (order: typeOrder) => {
        try {
            await sql.connect(con);
            const request = new sql.Request()
                .input("TXID", order.txid)
                .input("Ticker", order.ticker)
                .input("CreatedOn", order.createdOn)
                .input("BuyPrice", order.price)
                .input("SellOff", order.sellPrice)
                .input("StopLoss", 0)
                .input("Volume", order.volume)
                .input("Fee", order.fee)
                .input("Trader", order.trader);
            const result = request.execute("Buy_Save");
            
        } catch (err) {
            console.log("OpenBuy_Grid " + err.message);
        }
    };
}

export default Data;