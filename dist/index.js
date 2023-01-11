"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const classe_model_1 = __importDefault(require("./classe.model"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const uri = "mongodb://localhost:27017/Biblio";
mongoose_1.default.connect(uri, (err) => {
    if (err)
        console.log(err);
    else
        console.log("mongo data base connected");
});
app.get("/", (_req, resp) => {
    resp.send("Hello Express");
});
app.get("/classes", (_req, resp) => {
    classe_model_1.default.find((err, classes) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(classes);
    });
});
app.get("/classes/:id", (req, resp) => {
    classe_model_1.default.findById(req.params.id, (err, classe) => {
        if (err) {
            resp.status(500).send(err);
        }
        else {
            resp.send(classe);
        }
    });
});
app.post("/classes", (req, resp) => {
    let classe = new classe_model_1.default(req.body);
    classe.save(err => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(classe);
    });
});
app.put("/classes/:id", (req, resp) => {
    classe_model_1.default.findByIdAndUpdate(req.params.id, req.body, (err, classe) => {
        if (err)
            resp.status(500).send(err);
    });
});
app.delete("/classes/:id", (req, resp) => {
    classe_model_1.default.findByIdAndDelete(req.params.id, (err) => {
        if (err)
            resp.status(500).send(err);
        // else resp.send("classe delete");
    });
});
app.get("/pclasses", (req, resp) => {
    var _a, _b;
    let p = parseInt(((_a = req.query.page) === null || _a === void 0 ? void 0 : _a.toString()) || '0');
    let size = parseInt(((_b = req.query.size) === null || _b === void 0 ? void 0 : _b.toString()) || '5');
    classe_model_1.default.paginate({}, { page: p, limit: size }, (err, classes) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(classes);
    });
});
app.get("/classes-search", (req, resp) => {
    var _a, _b, _c;
    let p = parseInt(((_a = req.query.page) === null || _a === void 0 ? void 0 : _a.toString()) || '0');
    let size = parseInt(((_b = req.query.size) === null || _b === void 0 ? void 0 : _b.toString()) || '5');
    let kw = ((_c = req.query.kw) === null || _c === void 0 ? void 0 : _c.toString()) || "";
    classe_model_1.default.paginate({ name: { $regex: ".*(?i)" + kw + ".*" } }, { page: p, limit: size }, (err, classes) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(classes);
    });
});
app.listen(8085, () => {
    console.log("Serve started");
});
