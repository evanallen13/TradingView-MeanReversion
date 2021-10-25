const sql = require("mssql");
const con = process.env.con;
import typeOrder from "./Models/typeOrder";
class SqlData {

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

    Buyer_Save = async (order: typeOrder) => {
        try {
            await sql.connect(con);
            const request = new sql.Request()
                .input("TXID", order.txid)
                .input("Ticker", order.ticker)
                .input("CreatedOn", order.createdOn)
                .input("BuyPrice", order.price)
                .input("SellOff", order.sellPrice)
                .input("StopLoss", order.stopLoss)
                .input("Volume", order.volume)
                .input("Fee", order.fee);
            const result = request.execute("Buy_Save");
        } catch (err) {
            console.log("OpenBuy_Grid " + err.message);
        }
    };
}

export default SqlData;