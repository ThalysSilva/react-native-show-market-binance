import { ConsultSymbolUseCase } from "../consult-symbol-use-case";
import WS from "jest-websocket-mock";
import { responseMiniTickerMock } from "../mocks/mockResponses";

const server = new WS("ws://localhost:1234");
const createWebSocket = () => new WebSocket('ws://localhost:1234')

const consultSymbolUseCase = new ConsultSymbolUseCase('BTCBRL','miniTicker',null,false,createWebSocket)

describe("Prepare Message receving an websocket",() => {
    it.skip('Shoud be able to create one message string with data of generic websocket', async () => {
        consultSymbolUseCase.execute()
        await expect(consultSymbolUseCase.execute()).toContain('BTC')
        server.send(JSON.stringify(responseMiniTickerMock))
    })
})