import { ChatMessage, IStock } from "../utils/types";
import {
  PRIETO_BOOT_DEFAULT,
  PRIETO_BOOT_BAD_REQUEST
} from "../utils/constants";
const axios = require("axios");

class StooqBot {
  stooqURL = (stock_code: string) =>
    `https://stooq.com/q/l/?s=${stock_code}&f=sd2t2ohlcv&h&e=csv`;

  regExp = /^\/stock_code=*/gm;
  defaultMessage: ChatMessage;
  constructor() {
    this.defaultMessage = PRIETO_BOOT_DEFAULT;
  }

  _parseCsvUtil(csvData: string): IStock {
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

  parseCsv(csv: any) {
    const { Symbol, Close } = this._parseCsvUtil(csv);
    const responseMessage: ChatMessage = {
      author: PRIETO_BOOT_DEFAULT.author,
      message: `${Symbol} quote is $ ${Close} per share`,
      timestamp: new Date()
    };
    return responseMessage;
  }

  async parseCommand(command: ChatMessage) {
    const { message } = command;
    let result;

    if (message.startsWith("/stock_code=")) {
      result = message.split("=")[1];
      if (result !== "" && result) return Promise.resolve(result);

      return Promise.reject(PRIETO_BOOT_BAD_REQUEST);
    }

    if (message.startsWith("/")) return Promise.reject(PRIETO_BOOT_DEFAULT);

    return Promise.resolve(null);
  }

  async getStooqCsv(command: string) {
    return axios.get(this.stooqURL(command));
  }
}
export default StooqBot;
