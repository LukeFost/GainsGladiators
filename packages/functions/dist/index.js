"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("@phala/wapo-env");
var tiny_1 = require("hono/tiny");
var guest_1 = require("@phala/wapo-env/guest");
var accounts_1 = require("viem/accounts");
var viem_1 = require("viem");
var chains_1 = require("viem/chains");
var superjson_1 = require("superjson");
exports.app = new tiny_1.Hono();
var publicClient = (0, viem_1.createPublicClient)({
    chain: chains_1.baseSepolia,
    transport: (0, viem_1.http)(),
});
var walletClient = (0, viem_1.createWalletClient)({
    chain: chains_1.baseSepolia,
    transport: (0, viem_1.http)(),
});
function getECDSAAccount(salt) {
    var derivedKey = Wapo.deriveSecret(salt);
    var keccakPrivateKey = (0, viem_1.keccak256)(derivedKey);
    return (0, accounts_1.privateKeyToAccount)(keccakPrivateKey);
}
function signData(account, data) {
    return __awaiter(this, void 0, void 0, function () {
        var result, publicKey, signature;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = {
                        derivedPublicKey: account.address,
                        data: data,
                        signature: ''
                    };
                    publicKey = account.address;
                    console.log("Signing data [".concat(data, "] with Account [").concat(publicKey, "]"));
                    return [4 /*yield*/, account.signMessage({
                            message: data,
                        })];
                case 1:
                    signature = _a.sent();
                    console.log("Signature: ".concat(signature));
                    result.signature = signature;
                    return [2 /*return*/, result];
            }
        });
    });
}
function verifyData(account, data, signature) {
    return __awaiter(this, void 0, void 0, function () {
        var result, publicKey, valid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = {
                        derivedPublicKey: account.address,
                        data: data,
                        signature: signature,
                        valid: false
                    };
                    publicKey = account.address;
                    console.log("Verifying Signature with PublicKey ", publicKey);
                    return [4 /*yield*/, (0, viem_1.verifyMessage)({
                            address: publicKey,
                            message: data,
                            signature: signature,
                        })];
                case 1:
                    valid = _a.sent();
                    console.log("Is signature valid? ", valid);
                    result.valid = valid;
                    return [2 /*return*/, result];
            }
        });
    });
}
function sendTransaction(account, to, gweiAmount) {
    return __awaiter(this, void 0, void 0, function () {
        var result, hash, receipt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = {
                        derivedPublicKey: account.address,
                        to: to,
                        gweiAmount: gweiAmount,
                        hash: '',
                        receipt: {}
                    };
                    console.log("Sending Transaction with Account ".concat(account.address, " to ").concat(to, " for ").concat(gweiAmount, " gwei"));
                    return [4 /*yield*/, walletClient.sendTransaction({
                            account: account,
                            to: to,
                            value: (0, viem_1.parseGwei)("".concat(gweiAmount)),
                        })];
                case 1:
                    hash = _a.sent();
                    console.log("Transaction Hash: ".concat(hash));
                    return [4 /*yield*/, publicClient.waitForTransactionReceipt({ hash: hash })];
                case 2:
                    receipt = _a.sent();
                    console.log("Transaction Status: ".concat(receipt.status));
                    result.hash = hash;
                    result.receipt = receipt;
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.app.get('/', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    var vault, queries, result, secretSalt, getType, account, data, _a, _b, error_1, _c, json, meta;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                vault = {};
                queries = c.req.queries() || {};
                result = {};
                try {
                    vault = JSON.parse(process.env.secret || '');
                }
                catch (e) {
                    console.error(e);
                    return [2 /*return*/, c.json({ error: "Failed to parse secrets" })];
                }
                secretSalt = (vault.secretSalt) ? vault.secretSalt : 'SALTY_BAE';
                getType = (queries.type) ? queries.type[0] : '';
                account = getECDSAAccount(secretSalt);
                data = (queries.data) ? queries.data[0] : '';
                console.log("Type: ".concat(getType, ", Data: ").concat(data));
                _d.label = 1;
            case 1:
                _d.trys.push([1, 15, , 16]);
                if (!(getType == 'sendTx')) return [3 /*break*/, 5];
                if (!(queries.to && queries.gweiAmount)) return [3 /*break*/, 3];
                return [4 /*yield*/, sendTransaction(account, queries.to[0], queries.gweiAmount[0])];
            case 2:
                _a = _d.sent();
                return [3 /*break*/, 4];
            case 3:
                _a = { message: 'Missing query [to] or [gweiAmount] in URL' };
                _d.label = 4;
            case 4:
                result = _a;
                return [3 /*break*/, 14];
            case 5:
                if (!(getType == 'sign')) return [3 /*break*/, 9];
                if (!(data)) return [3 /*break*/, 7];
                return [4 /*yield*/, signData(account, data)];
            case 6:
                _b = _d.sent();
                return [3 /*break*/, 8];
            case 7:
                _b = { message: 'Missing query [data] in URL' };
                _d.label = 8;
            case 8:
                result = _b;
                return [3 /*break*/, 14];
            case 9:
                if (!(getType == 'verify')) return [3 /*break*/, 13];
                if (!(data && queries.signature)) return [3 /*break*/, 11];
                return [4 /*yield*/, verifyData(account, data, queries.signature[0])];
            case 10:
                result = _d.sent();
                return [3 /*break*/, 12];
            case 11:
                result = { message: 'Missing query [data] or [signature] in URL' };
                _d.label = 12;
            case 12: return [3 /*break*/, 14];
            case 13:
                result = { derivedPublicKey: account.address };
                _d.label = 14;
            case 14: return [3 /*break*/, 16];
            case 15:
                error_1 = _d.sent();
                console.error('Error:', error_1);
                result = { message: error_1 };
                return [3 /*break*/, 16];
            case 16:
                _c = superjson_1.default.serialize(result), json = _c.json, meta = _c.meta;
                return [2 /*return*/, c.json(json)];
        }
    });
}); });
exports.app.post('/', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, c.req.json()];
            case 1:
                data = _a.sent();
                console.log('user payload in JSON:', data);
                return [2 /*return*/, c.json(data)];
        }
    });
}); });
exports.default = (0, guest_1.handle)(exports.app);
