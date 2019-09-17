import StooqBot from "./stooq-bot";
import { expect } from "chai";
import { PRIETO_BOOT_DEFAULT } from "../utils/constants";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { ChatMessage } from "../utils/types";
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe("StooqBot Class", () => {
  it("should return the default message from the bot", () => {
    const stooqBot = new StooqBot();

    expect(stooqBot.defaultMessage).to.equal(PRIETO_BOOT_DEFAULT);
  });

  it("should parse the csv util function", () => {
    const stooqBot = new StooqBot();
    const csvData =
      "Symbol,Date,Time,Open,High,Low,Close,Volume\r\nMSFT.US,2019-09-13,22:00:01,137.78,138.06,136.57,137.32,23363057\r\n";

    const exampleCsvParsed = {
      Symbol: "MSFT.US",
      Date: "2019-09-13",
      Time: "22:00:01",
      Open: "137.78",
      High: "138.06",
      Low: "136.57",
      Close: "137.32",
      Volume: "23363057"
    };

    const parsedCSV = stooqBot._parseCsvUtil(csvData);
    expect(parsedCSV).to.be.deep.equal(exampleCsvParsed);
  });

  it("should return parsed csv in message format", () => {
    const stooqBot = new StooqBot();

    const message: ChatMessage = {
      author: "Prieto Stooq-Bot🤖",
      message: "MSFT.US quote is $ 137.32 per share"
    };

    const csvData =
      "Symbol,Date,Time,Open,High,Low,Close,Volume\r\nMSFT.US,2019-09-13,22:00:01,137.78,138.06,136.57,137.32,23363057\r\n";

    const parsedCSV = stooqBot.parseCsv(csvData);
    expect(parsedCSV).to.be.deep.equal(message);
  });

  it("should GET the csv data", async () => {
    const stooqBot = new StooqBot();
    const mock = new MockAdapter(axios);

    const stooqURL = "https://stooq.com/q/l/?s=msft.us&f=sd2t2ohlcv&h&e=csv";

    const csvData =
      "Symbol,Date,Time,Open,High,Low,Close,Volume\r\nMSFT.US,2019-09-13,22:00:01,137.78,138.06,136.57,137.32,23363057\r\n";

    mock.onGet(stooqURL).reply(200, {
      response: { data: csvData }
    });
    try {
      const response = await stooqBot.getStooqCsv(stooqURL);
      expect(csvData).to.equal(response.data);
    } catch (error) {}
  });
});
