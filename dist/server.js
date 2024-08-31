"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
const router_1 = __importDefault(require("./router"));
const dev = process.env.NODE_ENV !== "production";
const app = (0, next_1.default)({ dev });
const handle = app.getRequestHandler();
const port = 3000;
(async () => {
    try {
        await app.prepare();
        const server = (0, express_1.default)();
        server.use(express_1.default.json());
        server.use(express_1.default.urlencoded({
            extended: true
        }));
        // server.use(cors());
        server.use("/api", router_1.default);
        // server.get("/api", (req: Request, res: Response) => {
        //     return res.json("GET API endpoint");
        // });
        server.all("/*", (req, res) => {
            return handle(req, res);
        });
        server.listen(port, (err) => {
            if (err)
                throw err;
            console.log(`> Server started on: http://127.0.0.1:${port}`);
        });
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
})();
