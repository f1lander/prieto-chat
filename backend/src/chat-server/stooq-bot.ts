import { ChatMessage } from "../utils/types";
import { PRIETO_BOOT } from "../utils/constants";
const axios = require("axios");
interface IStock {
  Symbol: string;
  Date: string;
  Time: string;
  Open: string;
  High: string;
  Low: string;
  Close: string;
  Volume: string;
}
class StooqBot {
  stooqURL = (stock_code: string) =>
    `https://stooq.com/q/l/?s=${stock_code}&f=sd2t2ohlcv&h&e=csv`;

  regExp = /^\/stock_code=*/gm;
  defaultMessage: ChatMessage;
  constructor() {
    this.defaultMessage = PRIETO_BOOT;
  }

  parseCsv(csvData: string): IStock {
    const headers = csvData.split("\r\n")[0].split(",");
    const _obj: IStock & any = {};
    csvData
      .split("\r\n")[1]
      .split(",")
      .forEach((item, i) => {
        _obj[headers[i]] = item;
      });

    return _obj;
  }
  async respond(csv: any) {
    const { Symbol, Close } = this.parseCsv(csv);
    const responseMessage: ChatMessage = {
      author: PRIETO_BOOT.author,
      message: `${Symbol} quote is $ ${Close} per share`
    };
    console.log(responseMessage);
    return Promise.resolve(responseMessage);
  }

  async parseCommand(command: ChatMessage) {
    const { message } = command;

    if (message.startsWith("/stock_code="))
      return this.getStooqCsv(message.split("=")[1]);

    if (message.startsWith("/")) return Promise.resolve(this.defaultMessage);

    return Promise.resolve(null);
  }

  async getStooqCsv(command: string) {
    try {
      const csvRes = await axios.get(this.stooqURL(command));
      return await this.respond(csvRes.data);
    } catch (error) {}
  }
}
export default StooqBot;
