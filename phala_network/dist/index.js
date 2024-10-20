var module = module || { exports: {} };
"use strict";
var module = module || {};
module.exports = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __typeError = (msg) => {
    throw TypeError(msg);
  };
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod2) => function __require2() {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
    mod2
  ));
  var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
  var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
  var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);

  // node_modules/@phala/wapo-env/dist/index.js
  var require_dist = __commonJS({
    "node_modules/@phala/wapo-env/dist/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@msgpack/msgpack/dist.es5+esm/utils/utf8.mjs
  function utf8Count(str) {
    var strLength = str.length;
    var byteLength = 0;
    var pos = 0;
    while (pos < strLength) {
      var value = str.charCodeAt(pos++);
      if ((value & 4294967168) === 0) {
        byteLength++;
        continue;
      } else if ((value & 4294965248) === 0) {
        byteLength += 2;
      } else {
        if (value >= 55296 && value <= 56319) {
          if (pos < strLength) {
            var extra = str.charCodeAt(pos);
            if ((extra & 64512) === 56320) {
              ++pos;
              value = ((value & 1023) << 10) + (extra & 1023) + 65536;
            }
          }
        }
        if ((value & 4294901760) === 0) {
          byteLength += 3;
        } else {
          byteLength += 4;
        }
      }
    }
    return byteLength;
  }
  function utf8EncodeJs(str, output2, outputOffset) {
    var strLength = str.length;
    var offset = outputOffset;
    var pos = 0;
    while (pos < strLength) {
      var value = str.charCodeAt(pos++);
      if ((value & 4294967168) === 0) {
        output2[offset++] = value;
        continue;
      } else if ((value & 4294965248) === 0) {
        output2[offset++] = value >> 6 & 31 | 192;
      } else {
        if (value >= 55296 && value <= 56319) {
          if (pos < strLength) {
            var extra = str.charCodeAt(pos);
            if ((extra & 64512) === 56320) {
              ++pos;
              value = ((value & 1023) << 10) + (extra & 1023) + 65536;
            }
          }
        }
        if ((value & 4294901760) === 0) {
          output2[offset++] = value >> 12 & 15 | 224;
          output2[offset++] = value >> 6 & 63 | 128;
        } else {
          output2[offset++] = value >> 18 & 7 | 240;
          output2[offset++] = value >> 12 & 63 | 128;
          output2[offset++] = value >> 6 & 63 | 128;
        }
      }
      output2[offset++] = value & 63 | 128;
    }
  }
  function utf8EncodeTE(str, output2, outputOffset) {
    sharedTextEncoder.encodeInto(str, output2.subarray(outputOffset));
  }
  function utf8Encode(str, output2, outputOffset) {
    if (str.length > TEXT_ENCODER_THRESHOLD) {
      utf8EncodeTE(str, output2, outputOffset);
    } else {
      utf8EncodeJs(str, output2, outputOffset);
    }
  }
  function utf8DecodeJs(bytes2, inputOffset, byteLength) {
    var offset = inputOffset;
    var end = offset + byteLength;
    var units = [];
    var result = "";
    while (offset < end) {
      var byte1 = bytes2[offset++];
      if ((byte1 & 128) === 0) {
        units.push(byte1);
      } else if ((byte1 & 224) === 192) {
        var byte2 = bytes2[offset++] & 63;
        units.push((byte1 & 31) << 6 | byte2);
      } else if ((byte1 & 240) === 224) {
        var byte2 = bytes2[offset++] & 63;
        var byte3 = bytes2[offset++] & 63;
        units.push((byte1 & 31) << 12 | byte2 << 6 | byte3);
      } else if ((byte1 & 248) === 240) {
        var byte2 = bytes2[offset++] & 63;
        var byte3 = bytes2[offset++] & 63;
        var byte4 = bytes2[offset++] & 63;
        var unit = (byte1 & 7) << 18 | byte2 << 12 | byte3 << 6 | byte4;
        if (unit > 65535) {
          unit -= 65536;
          units.push(unit >>> 10 & 1023 | 55296);
          unit = 56320 | unit & 1023;
        }
        units.push(unit);
      } else {
        units.push(byte1);
      }
      if (units.length >= CHUNK_SIZE) {
        result += String.fromCharCode.apply(String, units);
        units.length = 0;
      }
    }
    if (units.length > 0) {
      result += String.fromCharCode.apply(String, units);
    }
    return result;
  }
  function utf8DecodeTD(bytes2, inputOffset, byteLength) {
    var stringBytes = bytes2.subarray(inputOffset, inputOffset + byteLength);
    return sharedTextDecoder.decode(stringBytes);
  }
  function utf8Decode(bytes2, inputOffset, byteLength) {
    if (byteLength > TEXT_DECODER_THRESHOLD) {
      return utf8DecodeTD(bytes2, inputOffset, byteLength);
    } else {
      return utf8DecodeJs(bytes2, inputOffset, byteLength);
    }
  }
  var sharedTextEncoder, TEXT_ENCODER_THRESHOLD, CHUNK_SIZE, sharedTextDecoder, TEXT_DECODER_THRESHOLD;
  var init_utf8 = __esm({
    "node_modules/@msgpack/msgpack/dist.es5+esm/utils/utf8.mjs"() {
      "use strict";
      sharedTextEncoder = new TextEncoder();
      TEXT_ENCODER_THRESHOLD = 50;
      CHUNK_SIZE = 4096;
      sharedTextDecoder = new TextDecoder();
      TEXT_DECODER_THRESHOLD = 200;
    }
  });

  // node_modules/@msgpack/msgpack/dist.es5+esm/ExtData.mjs
  var ExtData;
  var init_ExtData = __esm({
    "node_modules/@msgpack/msgpack/dist.es5+esm/ExtData.mjs"() {
      "use strict";
      ExtData = /** @class */
      /* @__PURE__ */ function() {
        function ExtData2(type, data) {
          this.type = type;
          this.data = data;
        }
        return ExtData2;
      }();
    }
  });

  // node_modules/@msgpack/msgpack/dist.es5+esm/DecodeError.mjs
  var __extends, DecodeError;
  var init_DecodeError = __esm({
    "node_modules/@msgpack/msgpack/dist.es5+esm/DecodeError.mjs"() {
      "use strict";
      __extends = /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      DecodeError = /** @class */
      function(_super) {
        __extends(DecodeError2, _super);
        function DecodeError2(message) {
          var _this = _super.call(this, message) || this;
          var proto = Object.create(DecodeError2.prototype);
          Object.setPrototypeOf(_this, proto);
          Object.defineProperty(_this, "name", {
            configurable: true,
            enumerable: false,
            value: DecodeError2.name
          });
          return _this;
        }
        return DecodeError2;
      }(Error);
    }
  });

  // node_modules/@msgpack/msgpack/dist.es5+esm/utils/int.mjs
  function setUint64(view, offset, value) {
    var high = value / 4294967296;
    var low = value;
    view.setUint32(offset, high);
    view.setUint32(offset + 4, low);
  }
  function setInt64(view, offset, value) {
    var high = Math.floor(value / 4294967296);
    var low = value;
    view.setUint32(offset, high);
    view.setUint32(offset + 4, low);
  }
  function getInt64(view, offset) {
    var high = view.getInt32(offset);
    var low = view.getUint32(offset + 4);
    return high * 4294967296 + low;
  }
  function getUint64(view, offset) {
    var high = view.getUint32(offset);
    var low = view.getUint32(offset + 4);
    return high * 4294967296 + low;
  }
  var UINT32_MAX;
  var init_int = __esm({
    "node_modules/@msgpack/msgpack/dist.es5+esm/utils/int.mjs"() {
      "use strict";
      UINT32_MAX = 4294967295;
    }
  });

  // node_modules/@msgpack/msgpack/dist.es5+esm/timestamp.mjs
  function encodeTimeSpecToTimestamp(_a4) {
    var sec = _a4.sec, nsec = _a4.nsec;
    if (sec >= 0 && nsec >= 0 && sec <= TIMESTAMP64_MAX_SEC) {
      if (nsec === 0 && sec <= TIMESTAMP32_MAX_SEC) {
        var rv = new Uint8Array(4);
        var view = new DataView(rv.buffer);
        view.setUint32(0, sec);
        return rv;
      } else {
        var secHigh = sec / 4294967296;
        var secLow = sec & 4294967295;
        var rv = new Uint8Array(8);
        var view = new DataView(rv.buffer);
        view.setUint32(0, nsec << 2 | secHigh & 3);
        view.setUint32(4, secLow);
        return rv;
      }
    } else {
      var rv = new Uint8Array(12);
      var view = new DataView(rv.buffer);
      view.setUint32(0, nsec);
      setInt64(view, 4, sec);
      return rv;
    }
  }
  function encodeDateToTimeSpec(date) {
    var msec = date.getTime();
    var sec = Math.floor(msec / 1e3);
    var nsec = (msec - sec * 1e3) * 1e6;
    var nsecInSec = Math.floor(nsec / 1e9);
    return {
      sec: sec + nsecInSec,
      nsec: nsec - nsecInSec * 1e9
    };
  }
  function encodeTimestampExtension(object) {
    if (object instanceof Date) {
      var timeSpec = encodeDateToTimeSpec(object);
      return encodeTimeSpecToTimestamp(timeSpec);
    } else {
      return null;
    }
  }
  function decodeTimestampToTimeSpec(data) {
    var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
    switch (data.byteLength) {
      case 4: {
        var sec = view.getUint32(0);
        var nsec = 0;
        return { sec, nsec };
      }
      case 8: {
        var nsec30AndSecHigh2 = view.getUint32(0);
        var secLow32 = view.getUint32(4);
        var sec = (nsec30AndSecHigh2 & 3) * 4294967296 + secLow32;
        var nsec = nsec30AndSecHigh2 >>> 2;
        return { sec, nsec };
      }
      case 12: {
        var sec = getInt64(view, 4);
        var nsec = view.getUint32(0);
        return { sec, nsec };
      }
      default:
        throw new DecodeError("Unrecognized data size for timestamp (expected 4, 8, or 12): ".concat(data.length));
    }
  }
  function decodeTimestampExtension(data) {
    var timeSpec = decodeTimestampToTimeSpec(data);
    return new Date(timeSpec.sec * 1e3 + timeSpec.nsec / 1e6);
  }
  var EXT_TIMESTAMP, TIMESTAMP32_MAX_SEC, TIMESTAMP64_MAX_SEC, timestampExtension;
  var init_timestamp = __esm({
    "node_modules/@msgpack/msgpack/dist.es5+esm/timestamp.mjs"() {
      "use strict";
      init_DecodeError();
      init_int();
      EXT_TIMESTAMP = -1;
      TIMESTAMP32_MAX_SEC = 4294967296 - 1;
      TIMESTAMP64_MAX_SEC = 17179869184 - 1;
      timestampExtension = {
        type: EXT_TIMESTAMP,
        encode: encodeTimestampExtension,
        decode: decodeTimestampExtension
      };
    }
  });

  // node_modules/@msgpack/msgpack/dist.es5+esm/ExtensionCodec.mjs
  var ExtensionCodec;
  var init_ExtensionCodec = __esm({
    "node_modules/@msgpack/msgpack/dist.es5+esm/ExtensionCodec.mjs"() {
      "use strict";
      init_ExtData();
      init_timestamp();
      ExtensionCodec = /** @class */
      function() {
        function ExtensionCodec2() {
          this.builtInEncoders = [];
          this.builtInDecoders = [];
          this.encoders = [];
          this.decoders = [];
          this.register(timestampExtension);
        }
        ExtensionCodec2.prototype.register = function(_a4) {
          var type = _a4.type, encode2 = _a4.encode, decode2 = _a4.decode;
          if (type >= 0) {
            this.encoders[type] = encode2;
            this.decoders[type] = decode2;
          } else {
            var index2 = 1 + type;
            this.builtInEncoders[index2] = encode2;
            this.builtInDecoders[index2] = decode2;
          }
        };
        ExtensionCodec2.prototype.tryToEncode = function(object, context) {
          for (var i = 0; i < this.builtInEncoders.length; i++) {
            var encodeExt = this.builtInEncoders[i];
            if (encodeExt != null) {
              var data = encodeExt(object, context);
              if (data != null) {
                var type = -1 - i;
                return new ExtData(type, data);
              }
            }
          }
          for (var i = 0; i < this.encoders.length; i++) {
            var encodeExt = this.encoders[i];
            if (encodeExt != null) {
              var data = encodeExt(object, context);
              if (data != null) {
                var type = i;
                return new ExtData(type, data);
              }
            }
          }
          if (object instanceof ExtData) {
            return object;
          }
          return null;
        };
        ExtensionCodec2.prototype.decode = function(data, type, context) {
          var decodeExt = type < 0 ? this.builtInDecoders[-1 - type] : this.decoders[type];
          if (decodeExt) {
            return decodeExt(data, type, context);
          } else {
            return new ExtData(type, data);
          }
        };
        ExtensionCodec2.defaultCodec = new ExtensionCodec2();
        return ExtensionCodec2;
      }();
    }
  });

  // node_modules/@msgpack/msgpack/dist.es5+esm/utils/typedArrays.mjs
  function ensureUint8Array(buffer2) {
    if (buffer2 instanceof Uint8Array) {
      return buffer2;
    } else if (ArrayBuffer.isView(buffer2)) {
      return new Uint8Array(buffer2.buffer, buffer2.byteOffset, buffer2.byteLength);
    } else if (buffer2 instanceof ArrayBuffer) {
      return new Uint8Array(buffer2);
    } else {
      return Uint8Array.from(buffer2);
    }
  }
  function createDataView(buffer2) {
    if (buffer2 instanceof ArrayBuffer) {
      return new DataView(buffer2);
    }
    var bufferView = ensureUint8Array(buffer2);
    return new DataView(bufferView.buffer, bufferView.byteOffset, bufferView.byteLength);
  }
  var init_typedArrays = __esm({
    "node_modules/@msgpack/msgpack/dist.es5+esm/utils/typedArrays.mjs"() {
      "use strict";
    }
  });

  // node_modules/@msgpack/msgpack/dist.es5+esm/Encoder.mjs
  var DEFAULT_MAX_DEPTH, DEFAULT_INITIAL_BUFFER_SIZE, Encoder;
  var init_Encoder = __esm({
    "node_modules/@msgpack/msgpack/dist.es5+esm/Encoder.mjs"() {
      "use strict";
      init_utf8();
      init_ExtensionCodec();
      init_int();
      init_typedArrays();
      DEFAULT_MAX_DEPTH = 100;
      DEFAULT_INITIAL_BUFFER_SIZE = 2048;
      Encoder = /** @class */
      function() {
        function Encoder2(options) {
          var _a4, _b, _c, _d, _e, _f, _g, _h;
          this.extensionCodec = (_a4 = options === null || options === void 0 ? void 0 : options.extensionCodec) !== null && _a4 !== void 0 ? _a4 : ExtensionCodec.defaultCodec;
          this.context = options === null || options === void 0 ? void 0 : options.context;
          this.useBigInt64 = (_b = options === null || options === void 0 ? void 0 : options.useBigInt64) !== null && _b !== void 0 ? _b : false;
          this.maxDepth = (_c = options === null || options === void 0 ? void 0 : options.maxDepth) !== null && _c !== void 0 ? _c : DEFAULT_MAX_DEPTH;
          this.initialBufferSize = (_d = options === null || options === void 0 ? void 0 : options.initialBufferSize) !== null && _d !== void 0 ? _d : DEFAULT_INITIAL_BUFFER_SIZE;
          this.sortKeys = (_e = options === null || options === void 0 ? void 0 : options.sortKeys) !== null && _e !== void 0 ? _e : false;
          this.forceFloat32 = (_f = options === null || options === void 0 ? void 0 : options.forceFloat32) !== null && _f !== void 0 ? _f : false;
          this.ignoreUndefined = (_g = options === null || options === void 0 ? void 0 : options.ignoreUndefined) !== null && _g !== void 0 ? _g : false;
          this.forceIntegerToFloat = (_h = options === null || options === void 0 ? void 0 : options.forceIntegerToFloat) !== null && _h !== void 0 ? _h : false;
          this.pos = 0;
          this.view = new DataView(new ArrayBuffer(this.initialBufferSize));
          this.bytes = new Uint8Array(this.view.buffer);
        }
        Encoder2.prototype.reinitializeState = function() {
          this.pos = 0;
        };
        Encoder2.prototype.encodeSharedRef = function(object) {
          this.reinitializeState();
          this.doEncode(object, 1);
          return this.bytes.subarray(0, this.pos);
        };
        Encoder2.prototype.encode = function(object) {
          this.reinitializeState();
          this.doEncode(object, 1);
          return this.bytes.slice(0, this.pos);
        };
        Encoder2.prototype.doEncode = function(object, depth) {
          if (depth > this.maxDepth) {
            throw new Error("Too deep objects in depth ".concat(depth));
          }
          if (object == null) {
            this.encodeNil();
          } else if (typeof object === "boolean") {
            this.encodeBoolean(object);
          } else if (typeof object === "number") {
            if (!this.forceIntegerToFloat) {
              this.encodeNumber(object);
            } else {
              this.encodeNumberAsFloat(object);
            }
          } else if (typeof object === "string") {
            this.encodeString(object);
          } else if (this.useBigInt64 && typeof object === "bigint") {
            this.encodeBigInt64(object);
          } else {
            this.encodeObject(object, depth);
          }
        };
        Encoder2.prototype.ensureBufferSizeToWrite = function(sizeToWrite) {
          var requiredSize = this.pos + sizeToWrite;
          if (this.view.byteLength < requiredSize) {
            this.resizeBuffer(requiredSize * 2);
          }
        };
        Encoder2.prototype.resizeBuffer = function(newSize) {
          var newBuffer = new ArrayBuffer(newSize);
          var newBytes = new Uint8Array(newBuffer);
          var newView = new DataView(newBuffer);
          newBytes.set(this.bytes);
          this.view = newView;
          this.bytes = newBytes;
        };
        Encoder2.prototype.encodeNil = function() {
          this.writeU8(192);
        };
        Encoder2.prototype.encodeBoolean = function(object) {
          if (object === false) {
            this.writeU8(194);
          } else {
            this.writeU8(195);
          }
        };
        Encoder2.prototype.encodeNumber = function(object) {
          if (!this.forceIntegerToFloat && Number.isSafeInteger(object)) {
            if (object >= 0) {
              if (object < 128) {
                this.writeU8(object);
              } else if (object < 256) {
                this.writeU8(204);
                this.writeU8(object);
              } else if (object < 65536) {
                this.writeU8(205);
                this.writeU16(object);
              } else if (object < 4294967296) {
                this.writeU8(206);
                this.writeU32(object);
              } else if (!this.useBigInt64) {
                this.writeU8(207);
                this.writeU64(object);
              } else {
                this.encodeNumberAsFloat(object);
              }
            } else {
              if (object >= -32) {
                this.writeU8(224 | object + 32);
              } else if (object >= -128) {
                this.writeU8(208);
                this.writeI8(object);
              } else if (object >= -32768) {
                this.writeU8(209);
                this.writeI16(object);
              } else if (object >= -2147483648) {
                this.writeU8(210);
                this.writeI32(object);
              } else if (!this.useBigInt64) {
                this.writeU8(211);
                this.writeI64(object);
              } else {
                this.encodeNumberAsFloat(object);
              }
            }
          } else {
            this.encodeNumberAsFloat(object);
          }
        };
        Encoder2.prototype.encodeNumberAsFloat = function(object) {
          if (this.forceFloat32) {
            this.writeU8(202);
            this.writeF32(object);
          } else {
            this.writeU8(203);
            this.writeF64(object);
          }
        };
        Encoder2.prototype.encodeBigInt64 = function(object) {
          if (object >= BigInt(0)) {
            this.writeU8(207);
            this.writeBigUint64(object);
          } else {
            this.writeU8(211);
            this.writeBigInt64(object);
          }
        };
        Encoder2.prototype.writeStringHeader = function(byteLength) {
          if (byteLength < 32) {
            this.writeU8(160 + byteLength);
          } else if (byteLength < 256) {
            this.writeU8(217);
            this.writeU8(byteLength);
          } else if (byteLength < 65536) {
            this.writeU8(218);
            this.writeU16(byteLength);
          } else if (byteLength < 4294967296) {
            this.writeU8(219);
            this.writeU32(byteLength);
          } else {
            throw new Error("Too long string: ".concat(byteLength, " bytes in UTF-8"));
          }
        };
        Encoder2.prototype.encodeString = function(object) {
          var maxHeaderSize = 1 + 4;
          var byteLength = utf8Count(object);
          this.ensureBufferSizeToWrite(maxHeaderSize + byteLength);
          this.writeStringHeader(byteLength);
          utf8Encode(object, this.bytes, this.pos);
          this.pos += byteLength;
        };
        Encoder2.prototype.encodeObject = function(object, depth) {
          var ext = this.extensionCodec.tryToEncode(object, this.context);
          if (ext != null) {
            this.encodeExtension(ext);
          } else if (Array.isArray(object)) {
            this.encodeArray(object, depth);
          } else if (ArrayBuffer.isView(object)) {
            this.encodeBinary(object);
          } else if (typeof object === "object") {
            this.encodeMap(object, depth);
          } else {
            throw new Error("Unrecognized object: ".concat(Object.prototype.toString.apply(object)));
          }
        };
        Encoder2.prototype.encodeBinary = function(object) {
          var size3 = object.byteLength;
          if (size3 < 256) {
            this.writeU8(196);
            this.writeU8(size3);
          } else if (size3 < 65536) {
            this.writeU8(197);
            this.writeU16(size3);
          } else if (size3 < 4294967296) {
            this.writeU8(198);
            this.writeU32(size3);
          } else {
            throw new Error("Too large binary: ".concat(size3));
          }
          var bytes2 = ensureUint8Array(object);
          this.writeU8a(bytes2);
        };
        Encoder2.prototype.encodeArray = function(object, depth) {
          var size3 = object.length;
          if (size3 < 16) {
            this.writeU8(144 + size3);
          } else if (size3 < 65536) {
            this.writeU8(220);
            this.writeU16(size3);
          } else if (size3 < 4294967296) {
            this.writeU8(221);
            this.writeU32(size3);
          } else {
            throw new Error("Too large array: ".concat(size3));
          }
          for (var _i = 0, object_1 = object; _i < object_1.length; _i++) {
            var item = object_1[_i];
            this.doEncode(item, depth + 1);
          }
        };
        Encoder2.prototype.countWithoutUndefined = function(object, keys) {
          var count = 0;
          for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (object[key] !== void 0) {
              count++;
            }
          }
          return count;
        };
        Encoder2.prototype.encodeMap = function(object, depth) {
          var keys = Object.keys(object);
          if (this.sortKeys) {
            keys.sort();
          }
          var size3 = this.ignoreUndefined ? this.countWithoutUndefined(object, keys) : keys.length;
          if (size3 < 16) {
            this.writeU8(128 + size3);
          } else if (size3 < 65536) {
            this.writeU8(222);
            this.writeU16(size3);
          } else if (size3 < 4294967296) {
            this.writeU8(223);
            this.writeU32(size3);
          } else {
            throw new Error("Too large map object: ".concat(size3));
          }
          for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var key = keys_2[_i];
            var value = object[key];
            if (!(this.ignoreUndefined && value === void 0)) {
              this.encodeString(key);
              this.doEncode(value, depth + 1);
            }
          }
        };
        Encoder2.prototype.encodeExtension = function(ext) {
          var size3 = ext.data.length;
          if (size3 === 1) {
            this.writeU8(212);
          } else if (size3 === 2) {
            this.writeU8(213);
          } else if (size3 === 4) {
            this.writeU8(214);
          } else if (size3 === 8) {
            this.writeU8(215);
          } else if (size3 === 16) {
            this.writeU8(216);
          } else if (size3 < 256) {
            this.writeU8(199);
            this.writeU8(size3);
          } else if (size3 < 65536) {
            this.writeU8(200);
            this.writeU16(size3);
          } else if (size3 < 4294967296) {
            this.writeU8(201);
            this.writeU32(size3);
          } else {
            throw new Error("Too large extension object: ".concat(size3));
          }
          this.writeI8(ext.type);
          this.writeU8a(ext.data);
        };
        Encoder2.prototype.writeU8 = function(value) {
          this.ensureBufferSizeToWrite(1);
          this.view.setUint8(this.pos, value);
          this.pos++;
        };
        Encoder2.prototype.writeU8a = function(values) {
          var size3 = values.length;
          this.ensureBufferSizeToWrite(size3);
          this.bytes.set(values, this.pos);
          this.pos += size3;
        };
        Encoder2.prototype.writeI8 = function(value) {
          this.ensureBufferSizeToWrite(1);
          this.view.setInt8(this.pos, value);
          this.pos++;
        };
        Encoder2.prototype.writeU16 = function(value) {
          this.ensureBufferSizeToWrite(2);
          this.view.setUint16(this.pos, value);
          this.pos += 2;
        };
        Encoder2.prototype.writeI16 = function(value) {
          this.ensureBufferSizeToWrite(2);
          this.view.setInt16(this.pos, value);
          this.pos += 2;
        };
        Encoder2.prototype.writeU32 = function(value) {
          this.ensureBufferSizeToWrite(4);
          this.view.setUint32(this.pos, value);
          this.pos += 4;
        };
        Encoder2.prototype.writeI32 = function(value) {
          this.ensureBufferSizeToWrite(4);
          this.view.setInt32(this.pos, value);
          this.pos += 4;
        };
        Encoder2.prototype.writeF32 = function(value) {
          this.ensureBufferSizeToWrite(4);
          this.view.setFloat32(this.pos, value);
          this.pos += 4;
        };
        Encoder2.prototype.writeF64 = function(value) {
          this.ensureBufferSizeToWrite(8);
          this.view.setFloat64(this.pos, value);
          this.pos += 8;
        };
        Encoder2.prototype.writeU64 = function(value) {
          this.ensureBufferSizeToWrite(8);
          setUint64(this.view, this.pos, value);
          this.pos += 8;
        };
        Encoder2.prototype.writeI64 = function(value) {
          this.ensureBufferSizeToWrite(8);
          setInt64(this.view, this.pos, value);
          this.pos += 8;
        };
        Encoder2.prototype.writeBigUint64 = function(value) {
          this.ensureBufferSizeToWrite(8);
          this.view.setBigUint64(this.pos, value);
          this.pos += 8;
        };
        Encoder2.prototype.writeBigInt64 = function(value) {
          this.ensureBufferSizeToWrite(8);
          this.view.setBigInt64(this.pos, value);
          this.pos += 8;
        };
        return Encoder2;
      }();
    }
  });

  // node_modules/@msgpack/msgpack/dist.es5+esm/encode.mjs
  function encode(value, options) {
    var encoder3 = new Encoder(options);
    return encoder3.encodeSharedRef(value);
  }
  var init_encode = __esm({
    "node_modules/@msgpack/msgpack/dist.es5+esm/encode.mjs"() {
      "use strict";
      init_Encoder();
    }
  });

  // node_modules/@msgpack/msgpack/dist.es5+esm/utils/prettyByte.mjs
  function prettyByte(byte) {
    return "".concat(byte < 0 ? "-" : "", "0x").concat(Math.abs(byte).toString(16).padStart(2, "0"));
  }
  var init_prettyByte = __esm({
    "node_modules/@msgpack/msgpack/dist.es5+esm/utils/prettyByte.mjs"() {
      "use strict";
    }
  });

  // node_modules/@msgpack/msgpack/dist.es5+esm/CachedKeyDecoder.mjs
  var DEFAULT_MAX_KEY_LENGTH, DEFAULT_MAX_LENGTH_PER_KEY, CachedKeyDecoder;
  var init_CachedKeyDecoder = __esm({
    "node_modules/@msgpack/msgpack/dist.es5+esm/CachedKeyDecoder.mjs"() {
      "use strict";
      init_utf8();
      DEFAULT_MAX_KEY_LENGTH = 16;
      DEFAULT_MAX_LENGTH_PER_KEY = 16;
      CachedKeyDecoder = /** @class */
      function() {
        function CachedKeyDecoder2(maxKeyLength, maxLengthPerKey) {
          if (maxKeyLength === void 0) {
            maxKeyLength = DEFAULT_MAX_KEY_LENGTH;
          }
          if (maxLengthPerKey === void 0) {
            maxLengthPerKey = DEFAULT_MAX_LENGTH_PER_KEY;
          }
          this.maxKeyLength = maxKeyLength;
          this.maxLengthPerKey = maxLengthPerKey;
          this.hit = 0;
          this.miss = 0;
          this.caches = [];
          for (var i = 0; i < this.maxKeyLength; i++) {
            this.caches.push([]);
          }
        }
        CachedKeyDecoder2.prototype.canBeCached = function(byteLength) {
          return byteLength > 0 && byteLength <= this.maxKeyLength;
        };
        CachedKeyDecoder2.prototype.find = function(bytes2, inputOffset, byteLength) {
          var records = this.caches[byteLength - 1];
          FIND_CHUNK: for (var _i = 0, records_1 = records; _i < records_1.length; _i++) {
            var record = records_1[_i];
            var recordBytes = record.bytes;
            for (var j = 0; j < byteLength; j++) {
              if (recordBytes[j] !== bytes2[inputOffset + j]) {
                continue FIND_CHUNK;
              }
            }
            return record.str;
          }
          return null;
        };
        CachedKeyDecoder2.prototype.store = function(bytes2, value) {
          var records = this.caches[bytes2.length - 1];
          var record = { bytes: bytes2, str: value };
          if (records.length >= this.maxLengthPerKey) {
            records[Math.random() * records.length | 0] = record;
          } else {
            records.push(record);
          }
        };
        CachedKeyDecoder2.prototype.decode = function(bytes2, inputOffset, byteLength) {
          var cachedValue = this.find(bytes2, inputOffset, byteLength);
          if (cachedValue != null) {
            this.hit++;
            return cachedValue;
          }
          this.miss++;
          var str = utf8DecodeJs(bytes2, inputOffset, byteLength);
          var slicedCopyOfBytes = Uint8Array.prototype.slice.call(bytes2, inputOffset, inputOffset + byteLength);
          this.store(slicedCopyOfBytes, str);
          return str;
        };
        return CachedKeyDecoder2;
      }();
    }
  });

  // node_modules/@msgpack/msgpack/dist.es5+esm/Decoder.mjs
  var __awaiter, __generator, __asyncValues, __await, __asyncGenerator, STATE_ARRAY, STATE_MAP_KEY, STATE_MAP_VALUE, isValidMapKeyType, HEAD_BYTE_REQUIRED, EMPTY_VIEW, EMPTY_BYTES, DataViewIndexOutOfBoundsError, MORE_DATA, sharedCachedKeyDecoder, Decoder;
  var init_Decoder = __esm({
    "node_modules/@msgpack/msgpack/dist.es5+esm/Decoder.mjs"() {
      "use strict";
      init_prettyByte();
      init_ExtensionCodec();
      init_int();
      init_utf8();
      init_typedArrays();
      init_CachedKeyDecoder();
      init_DecodeError();
      __awaiter = function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      __generator = function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2]) _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
          if (op[0] & 5) throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      __asyncValues = function(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i);
        function verb(n) {
          i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
              v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
          };
        }
        function settle(resolve, reject, d, v) {
          Promise.resolve(v).then(function(v2) {
            resolve({ value: v2, done: d });
          }, reject);
        }
      };
      __await = function(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
      };
      __asyncGenerator = function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i;
        function verb(n) {
          if (g[n]) i[n] = function(v) {
            return new Promise(function(a, b) {
              q.push([n, v, a, b]) > 1 || resume(n, v);
            });
          };
        }
        function resume(n, v) {
          try {
            step(g[n](v));
          } catch (e) {
            settle(q[0][3], e);
          }
        }
        function step(r) {
          r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f, v) {
          if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
        }
      };
      STATE_ARRAY = "array";
      STATE_MAP_KEY = "map_key";
      STATE_MAP_VALUE = "map_value";
      isValidMapKeyType = function(key) {
        return typeof key === "string" || typeof key === "number";
      };
      HEAD_BYTE_REQUIRED = -1;
      EMPTY_VIEW = new DataView(new ArrayBuffer(0));
      EMPTY_BYTES = new Uint8Array(EMPTY_VIEW.buffer);
      try {
        EMPTY_VIEW.getInt8(0);
      } catch (e) {
        if (!(e instanceof RangeError)) {
          throw new Error("This module is not supported in the current JavaScript engine because DataView does not throw RangeError on out-of-bounds access");
        }
      }
      DataViewIndexOutOfBoundsError = RangeError;
      MORE_DATA = new DataViewIndexOutOfBoundsError("Insufficient data");
      sharedCachedKeyDecoder = new CachedKeyDecoder();
      Decoder = /** @class */
      function() {
        function Decoder2(options) {
          var _a4, _b, _c, _d, _e, _f, _g;
          this.totalPos = 0;
          this.pos = 0;
          this.view = EMPTY_VIEW;
          this.bytes = EMPTY_BYTES;
          this.headByte = HEAD_BYTE_REQUIRED;
          this.stack = [];
          this.extensionCodec = (_a4 = options === null || options === void 0 ? void 0 : options.extensionCodec) !== null && _a4 !== void 0 ? _a4 : ExtensionCodec.defaultCodec;
          this.context = options === null || options === void 0 ? void 0 : options.context;
          this.useBigInt64 = (_b = options === null || options === void 0 ? void 0 : options.useBigInt64) !== null && _b !== void 0 ? _b : false;
          this.maxStrLength = (_c = options === null || options === void 0 ? void 0 : options.maxStrLength) !== null && _c !== void 0 ? _c : UINT32_MAX;
          this.maxBinLength = (_d = options === null || options === void 0 ? void 0 : options.maxBinLength) !== null && _d !== void 0 ? _d : UINT32_MAX;
          this.maxArrayLength = (_e = options === null || options === void 0 ? void 0 : options.maxArrayLength) !== null && _e !== void 0 ? _e : UINT32_MAX;
          this.maxMapLength = (_f = options === null || options === void 0 ? void 0 : options.maxMapLength) !== null && _f !== void 0 ? _f : UINT32_MAX;
          this.maxExtLength = (_g = options === null || options === void 0 ? void 0 : options.maxExtLength) !== null && _g !== void 0 ? _g : UINT32_MAX;
          this.keyDecoder = (options === null || options === void 0 ? void 0 : options.keyDecoder) !== void 0 ? options.keyDecoder : sharedCachedKeyDecoder;
        }
        Decoder2.prototype.reinitializeState = function() {
          this.totalPos = 0;
          this.headByte = HEAD_BYTE_REQUIRED;
          this.stack.length = 0;
        };
        Decoder2.prototype.setBuffer = function(buffer2) {
          this.bytes = ensureUint8Array(buffer2);
          this.view = createDataView(this.bytes);
          this.pos = 0;
        };
        Decoder2.prototype.appendBuffer = function(buffer2) {
          if (this.headByte === HEAD_BYTE_REQUIRED && !this.hasRemaining(1)) {
            this.setBuffer(buffer2);
          } else {
            var remainingData = this.bytes.subarray(this.pos);
            var newData = ensureUint8Array(buffer2);
            var newBuffer = new Uint8Array(remainingData.length + newData.length);
            newBuffer.set(remainingData);
            newBuffer.set(newData, remainingData.length);
            this.setBuffer(newBuffer);
          }
        };
        Decoder2.prototype.hasRemaining = function(size3) {
          return this.view.byteLength - this.pos >= size3;
        };
        Decoder2.prototype.createExtraByteError = function(posToShow) {
          var _a4 = this, view = _a4.view, pos = _a4.pos;
          return new RangeError("Extra ".concat(view.byteLength - pos, " of ").concat(view.byteLength, " byte(s) found at buffer[").concat(posToShow, "]"));
        };
        Decoder2.prototype.decode = function(buffer2) {
          this.reinitializeState();
          this.setBuffer(buffer2);
          var object = this.doDecodeSync();
          if (this.hasRemaining(1)) {
            throw this.createExtraByteError(this.pos);
          }
          return object;
        };
        Decoder2.prototype.decodeMulti = function(buffer2) {
          return __generator(this, function(_a4) {
            switch (_a4.label) {
              case 0:
                this.reinitializeState();
                this.setBuffer(buffer2);
                _a4.label = 1;
              case 1:
                if (!this.hasRemaining(1)) return [3, 3];
                return [4, this.doDecodeSync()];
              case 2:
                _a4.sent();
                return [3, 1];
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        };
        Decoder2.prototype.decodeAsync = function(stream) {
          var _a4, stream_1, stream_1_1;
          var _b, e_1, _c, _d;
          return __awaiter(this, void 0, void 0, function() {
            var decoded, object, buffer2, e_1_1, _e, headByte, pos, totalPos;
            return __generator(this, function(_f) {
              switch (_f.label) {
                case 0:
                  decoded = false;
                  _f.label = 1;
                case 1:
                  _f.trys.push([1, 6, 7, 12]);
                  _a4 = true, stream_1 = __asyncValues(stream);
                  _f.label = 2;
                case 2:
                  return [4, stream_1.next()];
                case 3:
                  if (!(stream_1_1 = _f.sent(), _b = stream_1_1.done, !_b)) return [3, 5];
                  _d = stream_1_1.value;
                  _a4 = false;
                  try {
                    buffer2 = _d;
                    if (decoded) {
                      throw this.createExtraByteError(this.totalPos);
                    }
                    this.appendBuffer(buffer2);
                    try {
                      object = this.doDecodeSync();
                      decoded = true;
                    } catch (e) {
                      if (!(e instanceof DataViewIndexOutOfBoundsError)) {
                        throw e;
                      }
                    }
                    this.totalPos += this.pos;
                  } finally {
                    _a4 = true;
                  }
                  _f.label = 4;
                case 4:
                  return [3, 2];
                case 5:
                  return [3, 12];
                case 6:
                  e_1_1 = _f.sent();
                  e_1 = { error: e_1_1 };
                  return [3, 12];
                case 7:
                  _f.trys.push([7, , 10, 11]);
                  if (!(!_a4 && !_b && (_c = stream_1.return))) return [3, 9];
                  return [4, _c.call(stream_1)];
                case 8:
                  _f.sent();
                  _f.label = 9;
                case 9:
                  return [3, 11];
                case 10:
                  if (e_1) throw e_1.error;
                  return [
                    7
                    /*endfinally*/
                  ];
                case 11:
                  return [
                    7
                    /*endfinally*/
                  ];
                case 12:
                  if (decoded) {
                    if (this.hasRemaining(1)) {
                      throw this.createExtraByteError(this.totalPos);
                    }
                    return [2, object];
                  }
                  _e = this, headByte = _e.headByte, pos = _e.pos, totalPos = _e.totalPos;
                  throw new RangeError("Insufficient data in parsing ".concat(prettyByte(headByte), " at ").concat(totalPos, " (").concat(pos, " in the current buffer)"));
              }
            });
          });
        };
        Decoder2.prototype.decodeArrayStream = function(stream) {
          return this.decodeMultiAsync(stream, true);
        };
        Decoder2.prototype.decodeStream = function(stream) {
          return this.decodeMultiAsync(stream, false);
        };
        Decoder2.prototype.decodeMultiAsync = function(stream, isArray3) {
          return __asyncGenerator(this, arguments, function decodeMultiAsync_1() {
            var isArrayHeaderRequired, arrayItemsLeft, _a4, stream_2, stream_2_1, buffer2, e_2, e_3_1;
            var _b, e_3, _c, _d;
            return __generator(this, function(_e) {
              switch (_e.label) {
                case 0:
                  isArrayHeaderRequired = isArray3;
                  arrayItemsLeft = -1;
                  _e.label = 1;
                case 1:
                  _e.trys.push([1, 15, 16, 21]);
                  _a4 = true, stream_2 = __asyncValues(stream);
                  _e.label = 2;
                case 2:
                  return [4, __await(stream_2.next())];
                case 3:
                  if (!(stream_2_1 = _e.sent(), _b = stream_2_1.done, !_b)) return [3, 14];
                  _d = stream_2_1.value;
                  _a4 = false;
                  _e.label = 4;
                case 4:
                  _e.trys.push([4, , 12, 13]);
                  buffer2 = _d;
                  if (isArray3 && arrayItemsLeft === 0) {
                    throw this.createExtraByteError(this.totalPos);
                  }
                  this.appendBuffer(buffer2);
                  if (isArrayHeaderRequired) {
                    arrayItemsLeft = this.readArraySize();
                    isArrayHeaderRequired = false;
                    this.complete();
                  }
                  _e.label = 5;
                case 5:
                  _e.trys.push([5, 10, , 11]);
                  _e.label = 6;
                case 6:
                  if (false) return [3, 9];
                  return [4, __await(this.doDecodeSync())];
                case 7:
                  return [4, _e.sent()];
                case 8:
                  _e.sent();
                  if (--arrayItemsLeft === 0) {
                    return [3, 9];
                  }
                  return [3, 6];
                case 9:
                  return [3, 11];
                case 10:
                  e_2 = _e.sent();
                  if (!(e_2 instanceof DataViewIndexOutOfBoundsError)) {
                    throw e_2;
                  }
                  return [3, 11];
                case 11:
                  this.totalPos += this.pos;
                  return [3, 13];
                case 12:
                  _a4 = true;
                  return [
                    7
                    /*endfinally*/
                  ];
                case 13:
                  return [3, 2];
                case 14:
                  return [3, 21];
                case 15:
                  e_3_1 = _e.sent();
                  e_3 = { error: e_3_1 };
                  return [3, 21];
                case 16:
                  _e.trys.push([16, , 19, 20]);
                  if (!(!_a4 && !_b && (_c = stream_2.return))) return [3, 18];
                  return [4, __await(_c.call(stream_2))];
                case 17:
                  _e.sent();
                  _e.label = 18;
                case 18:
                  return [3, 20];
                case 19:
                  if (e_3) throw e_3.error;
                  return [
                    7
                    /*endfinally*/
                  ];
                case 20:
                  return [
                    7
                    /*endfinally*/
                  ];
                case 21:
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        };
        Decoder2.prototype.doDecodeSync = function() {
          DECODE: while (true) {
            var headByte = this.readHeadByte();
            var object = void 0;
            if (headByte >= 224) {
              object = headByte - 256;
            } else if (headByte < 192) {
              if (headByte < 128) {
                object = headByte;
              } else if (headByte < 144) {
                var size3 = headByte - 128;
                if (size3 !== 0) {
                  this.pushMapState(size3);
                  this.complete();
                  continue DECODE;
                } else {
                  object = {};
                }
              } else if (headByte < 160) {
                var size3 = headByte - 144;
                if (size3 !== 0) {
                  this.pushArrayState(size3);
                  this.complete();
                  continue DECODE;
                } else {
                  object = [];
                }
              } else {
                var byteLength = headByte - 160;
                object = this.decodeUtf8String(byteLength, 0);
              }
            } else if (headByte === 192) {
              object = null;
            } else if (headByte === 194) {
              object = false;
            } else if (headByte === 195) {
              object = true;
            } else if (headByte === 202) {
              object = this.readF32();
            } else if (headByte === 203) {
              object = this.readF64();
            } else if (headByte === 204) {
              object = this.readU8();
            } else if (headByte === 205) {
              object = this.readU16();
            } else if (headByte === 206) {
              object = this.readU32();
            } else if (headByte === 207) {
              if (this.useBigInt64) {
                object = this.readU64AsBigInt();
              } else {
                object = this.readU64();
              }
            } else if (headByte === 208) {
              object = this.readI8();
            } else if (headByte === 209) {
              object = this.readI16();
            } else if (headByte === 210) {
              object = this.readI32();
            } else if (headByte === 211) {
              if (this.useBigInt64) {
                object = this.readI64AsBigInt();
              } else {
                object = this.readI64();
              }
            } else if (headByte === 217) {
              var byteLength = this.lookU8();
              object = this.decodeUtf8String(byteLength, 1);
            } else if (headByte === 218) {
              var byteLength = this.lookU16();
              object = this.decodeUtf8String(byteLength, 2);
            } else if (headByte === 219) {
              var byteLength = this.lookU32();
              object = this.decodeUtf8String(byteLength, 4);
            } else if (headByte === 220) {
              var size3 = this.readU16();
              if (size3 !== 0) {
                this.pushArrayState(size3);
                this.complete();
                continue DECODE;
              } else {
                object = [];
              }
            } else if (headByte === 221) {
              var size3 = this.readU32();
              if (size3 !== 0) {
                this.pushArrayState(size3);
                this.complete();
                continue DECODE;
              } else {
                object = [];
              }
            } else if (headByte === 222) {
              var size3 = this.readU16();
              if (size3 !== 0) {
                this.pushMapState(size3);
                this.complete();
                continue DECODE;
              } else {
                object = {};
              }
            } else if (headByte === 223) {
              var size3 = this.readU32();
              if (size3 !== 0) {
                this.pushMapState(size3);
                this.complete();
                continue DECODE;
              } else {
                object = {};
              }
            } else if (headByte === 196) {
              var size3 = this.lookU8();
              object = this.decodeBinary(size3, 1);
            } else if (headByte === 197) {
              var size3 = this.lookU16();
              object = this.decodeBinary(size3, 2);
            } else if (headByte === 198) {
              var size3 = this.lookU32();
              object = this.decodeBinary(size3, 4);
            } else if (headByte === 212) {
              object = this.decodeExtension(1, 0);
            } else if (headByte === 213) {
              object = this.decodeExtension(2, 0);
            } else if (headByte === 214) {
              object = this.decodeExtension(4, 0);
            } else if (headByte === 215) {
              object = this.decodeExtension(8, 0);
            } else if (headByte === 216) {
              object = this.decodeExtension(16, 0);
            } else if (headByte === 199) {
              var size3 = this.lookU8();
              object = this.decodeExtension(size3, 1);
            } else if (headByte === 200) {
              var size3 = this.lookU16();
              object = this.decodeExtension(size3, 2);
            } else if (headByte === 201) {
              var size3 = this.lookU32();
              object = this.decodeExtension(size3, 4);
            } else {
              throw new DecodeError("Unrecognized type byte: ".concat(prettyByte(headByte)));
            }
            this.complete();
            var stack = this.stack;
            while (stack.length > 0) {
              var state = stack[stack.length - 1];
              if (state.type === STATE_ARRAY) {
                state.array[state.position] = object;
                state.position++;
                if (state.position === state.size) {
                  stack.pop();
                  object = state.array;
                } else {
                  continue DECODE;
                }
              } else if (state.type === STATE_MAP_KEY) {
                if (!isValidMapKeyType(object)) {
                  throw new DecodeError("The type of key must be string or number but " + typeof object);
                }
                if (object === "__proto__") {
                  throw new DecodeError("The key __proto__ is not allowed");
                }
                state.key = object;
                state.type = STATE_MAP_VALUE;
                continue DECODE;
              } else {
                state.map[state.key] = object;
                state.readCount++;
                if (state.readCount === state.size) {
                  stack.pop();
                  object = state.map;
                } else {
                  state.key = null;
                  state.type = STATE_MAP_KEY;
                  continue DECODE;
                }
              }
            }
            return object;
          }
        };
        Decoder2.prototype.readHeadByte = function() {
          if (this.headByte === HEAD_BYTE_REQUIRED) {
            this.headByte = this.readU8();
          }
          return this.headByte;
        };
        Decoder2.prototype.complete = function() {
          this.headByte = HEAD_BYTE_REQUIRED;
        };
        Decoder2.prototype.readArraySize = function() {
          var headByte = this.readHeadByte();
          switch (headByte) {
            case 220:
              return this.readU16();
            case 221:
              return this.readU32();
            default: {
              if (headByte < 160) {
                return headByte - 144;
              } else {
                throw new DecodeError("Unrecognized array type byte: ".concat(prettyByte(headByte)));
              }
            }
          }
        };
        Decoder2.prototype.pushMapState = function(size3) {
          if (size3 > this.maxMapLength) {
            throw new DecodeError("Max length exceeded: map length (".concat(size3, ") > maxMapLengthLength (").concat(this.maxMapLength, ")"));
          }
          this.stack.push({
            type: STATE_MAP_KEY,
            size: size3,
            key: null,
            readCount: 0,
            map: {}
          });
        };
        Decoder2.prototype.pushArrayState = function(size3) {
          if (size3 > this.maxArrayLength) {
            throw new DecodeError("Max length exceeded: array length (".concat(size3, ") > maxArrayLength (").concat(this.maxArrayLength, ")"));
          }
          this.stack.push({
            type: STATE_ARRAY,
            size: size3,
            array: new Array(size3),
            position: 0
          });
        };
        Decoder2.prototype.decodeUtf8String = function(byteLength, headerOffset) {
          var _a4;
          if (byteLength > this.maxStrLength) {
            throw new DecodeError("Max length exceeded: UTF-8 byte length (".concat(byteLength, ") > maxStrLength (").concat(this.maxStrLength, ")"));
          }
          if (this.bytes.byteLength < this.pos + headerOffset + byteLength) {
            throw MORE_DATA;
          }
          var offset = this.pos + headerOffset;
          var object;
          if (this.stateIsMapKey() && ((_a4 = this.keyDecoder) === null || _a4 === void 0 ? void 0 : _a4.canBeCached(byteLength))) {
            object = this.keyDecoder.decode(this.bytes, offset, byteLength);
          } else {
            object = utf8Decode(this.bytes, offset, byteLength);
          }
          this.pos += headerOffset + byteLength;
          return object;
        };
        Decoder2.prototype.stateIsMapKey = function() {
          if (this.stack.length > 0) {
            var state = this.stack[this.stack.length - 1];
            return state.type === STATE_MAP_KEY;
          }
          return false;
        };
        Decoder2.prototype.decodeBinary = function(byteLength, headOffset) {
          if (byteLength > this.maxBinLength) {
            throw new DecodeError("Max length exceeded: bin length (".concat(byteLength, ") > maxBinLength (").concat(this.maxBinLength, ")"));
          }
          if (!this.hasRemaining(byteLength + headOffset)) {
            throw MORE_DATA;
          }
          var offset = this.pos + headOffset;
          var object = this.bytes.subarray(offset, offset + byteLength);
          this.pos += headOffset + byteLength;
          return object;
        };
        Decoder2.prototype.decodeExtension = function(size3, headOffset) {
          if (size3 > this.maxExtLength) {
            throw new DecodeError("Max length exceeded: ext length (".concat(size3, ") > maxExtLength (").concat(this.maxExtLength, ")"));
          }
          var extType = this.view.getInt8(this.pos + headOffset);
          var data = this.decodeBinary(
            size3,
            headOffset + 1
            /* extType */
          );
          return this.extensionCodec.decode(data, extType, this.context);
        };
        Decoder2.prototype.lookU8 = function() {
          return this.view.getUint8(this.pos);
        };
        Decoder2.prototype.lookU16 = function() {
          return this.view.getUint16(this.pos);
        };
        Decoder2.prototype.lookU32 = function() {
          return this.view.getUint32(this.pos);
        };
        Decoder2.prototype.readU8 = function() {
          var value = this.view.getUint8(this.pos);
          this.pos++;
          return value;
        };
        Decoder2.prototype.readI8 = function() {
          var value = this.view.getInt8(this.pos);
          this.pos++;
          return value;
        };
        Decoder2.prototype.readU16 = function() {
          var value = this.view.getUint16(this.pos);
          this.pos += 2;
          return value;
        };
        Decoder2.prototype.readI16 = function() {
          var value = this.view.getInt16(this.pos);
          this.pos += 2;
          return value;
        };
        Decoder2.prototype.readU32 = function() {
          var value = this.view.getUint32(this.pos);
          this.pos += 4;
          return value;
        };
        Decoder2.prototype.readI32 = function() {
          var value = this.view.getInt32(this.pos);
          this.pos += 4;
          return value;
        };
        Decoder2.prototype.readU64 = function() {
          var value = getUint64(this.view, this.pos);
          this.pos += 8;
          return value;
        };
        Decoder2.prototype.readI64 = function() {
          var value = getInt64(this.view, this.pos);
          this.pos += 8;
          return value;
        };
        Decoder2.prototype.readU64AsBigInt = function() {
          var value = this.view.getBigUint64(this.pos);
          this.pos += 8;
          return value;
        };
        Decoder2.prototype.readI64AsBigInt = function() {
          var value = this.view.getBigInt64(this.pos);
          this.pos += 8;
          return value;
        };
        Decoder2.prototype.readF32 = function() {
          var value = this.view.getFloat32(this.pos);
          this.pos += 4;
          return value;
        };
        Decoder2.prototype.readF64 = function() {
          var value = this.view.getFloat64(this.pos);
          this.pos += 8;
          return value;
        };
        return Decoder2;
      }();
    }
  });

  // node_modules/@msgpack/msgpack/dist.es5+esm/decode.mjs
  function decode(buffer2, options) {
    var decoder = new Decoder(options);
    return decoder.decode(buffer2);
  }
  function decodeMulti(buffer2, options) {
    var decoder = new Decoder(options);
    return decoder.decodeMulti(buffer2);
  }
  var init_decode = __esm({
    "node_modules/@msgpack/msgpack/dist.es5+esm/decode.mjs"() {
      "use strict";
      init_Decoder();
    }
  });

  // node_modules/@msgpack/msgpack/dist.es5+esm/utils/stream.mjs
  function isAsyncIterable(object) {
    return object[Symbol.asyncIterator] != null;
  }
  function assertNonNull(value) {
    if (value == null) {
      throw new Error("Assertion Failure: value must not be null nor undefined");
    }
  }
  function asyncIterableFromStream(stream) {
    return __asyncGenerator2(this, arguments, function asyncIterableFromStream_1() {
      var reader, _a4, done, value;
      return __generator2(this, function(_b) {
        switch (_b.label) {
          case 0:
            reader = stream.getReader();
            _b.label = 1;
          case 1:
            _b.trys.push([1, , 9, 10]);
            _b.label = 2;
          case 2:
            if (false) return [3, 8];
            return [4, __await2(reader.read())];
          case 3:
            _a4 = _b.sent(), done = _a4.done, value = _a4.value;
            if (!done) return [3, 5];
            return [4, __await2(void 0)];
          case 4:
            return [2, _b.sent()];
          case 5:
            assertNonNull(value);
            return [4, __await2(value)];
          case 6:
            return [4, _b.sent()];
          case 7:
            _b.sent();
            return [3, 2];
          case 8:
            return [3, 10];
          case 9:
            reader.releaseLock();
            return [
              7
              /*endfinally*/
            ];
          case 10:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }
  function ensureAsyncIterable(streamLike) {
    if (isAsyncIterable(streamLike)) {
      return streamLike;
    } else {
      return asyncIterableFromStream(streamLike);
    }
  }
  var __generator2, __await2, __asyncGenerator2;
  var init_stream = __esm({
    "node_modules/@msgpack/msgpack/dist.es5+esm/utils/stream.mjs"() {
      "use strict";
      __generator2 = function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2]) _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
          if (op[0] & 5) throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      __await2 = function(v) {
        return this instanceof __await2 ? (this.v = v, this) : new __await2(v);
      };
      __asyncGenerator2 = function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i;
        function verb(n) {
          if (g[n]) i[n] = function(v) {
            return new Promise(function(a, b) {
              q.push([n, v, a, b]) > 1 || resume(n, v);
            });
          };
        }
        function resume(n, v) {
          try {
            step(g[n](v));
          } catch (e) {
            settle(q[0][3], e);
          }
        }
        function step(r) {
          r.value instanceof __await2 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f, v) {
          if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
        }
      };
    }
  });

  // node_modules/@msgpack/msgpack/dist.es5+esm/decodeAsync.mjs
  function decodeAsync(streamLike, options) {
    return __awaiter2(this, void 0, void 0, function() {
      var stream, decoder;
      return __generator3(this, function(_a4) {
        stream = ensureAsyncIterable(streamLike);
        decoder = new Decoder(options);
        return [2, decoder.decodeAsync(stream)];
      });
    });
  }
  function decodeArrayStream(streamLike, options) {
    var stream = ensureAsyncIterable(streamLike);
    var decoder = new Decoder(options);
    return decoder.decodeArrayStream(stream);
  }
  function decodeMultiStream(streamLike, options) {
    var stream = ensureAsyncIterable(streamLike);
    var decoder = new Decoder(options);
    return decoder.decodeStream(stream);
  }
  var __awaiter2, __generator3, decodeStream;
  var init_decodeAsync = __esm({
    "node_modules/@msgpack/msgpack/dist.es5+esm/decodeAsync.mjs"() {
      "use strict";
      init_Decoder();
      init_stream();
      __awaiter2 = function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      __generator3 = function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2]) _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
          if (op[0] & 5) throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      decodeStream = void 0;
    }
  });

  // node_modules/@msgpack/msgpack/dist.es5+esm/index.mjs
  var dist_exports = {};
  __export(dist_exports, {
    DataViewIndexOutOfBoundsError: () => DataViewIndexOutOfBoundsError,
    DecodeError: () => DecodeError,
    Decoder: () => Decoder,
    EXT_TIMESTAMP: () => EXT_TIMESTAMP,
    Encoder: () => Encoder,
    ExtData: () => ExtData,
    ExtensionCodec: () => ExtensionCodec,
    decode: () => decode,
    decodeArrayStream: () => decodeArrayStream,
    decodeAsync: () => decodeAsync,
    decodeMulti: () => decodeMulti,
    decodeMultiStream: () => decodeMultiStream,
    decodeStream: () => decodeStream,
    decodeTimestampExtension: () => decodeTimestampExtension,
    decodeTimestampToTimeSpec: () => decodeTimestampToTimeSpec,
    encode: () => encode,
    encodeDateToTimeSpec: () => encodeDateToTimeSpec,
    encodeTimeSpecToTimestamp: () => encodeTimeSpecToTimestamp,
    encodeTimestampExtension: () => encodeTimestampExtension
  });
  var init_dist = __esm({
    "node_modules/@msgpack/msgpack/dist.es5+esm/index.mjs"() {
      "use strict";
      init_encode();
      init_decode();
      init_decodeAsync();
      init_Decoder();
      init_DecodeError();
      init_Encoder();
      init_ExtensionCodec();
      init_ExtData();
      init_timestamp();
    }
  });

  // node_modules/@phala/wapo-env/dist/guest.js
  var require_guest = __commonJS({
    "node_modules/@phala/wapo-env/dist/guest.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.handle = void 0;
      var msgpack_1 = (init_dist(), __toCommonJS(dist_exports));
      function handle2(app2) {
        return async function handler() {
          try {
            const data = JSON.parse(globalThis.scriptArgs?.[0]);
            const req = new Request(data.url, {
              method: data.method,
              headers: data.headers,
              body: data.body
            });
            const resp = await app2.fetch(req);
            const headers = {};
            for (const [k, v] of resp.headers.entries()) {
              headers[k] = v;
            }
            const body = await resp.text();
            globalThis.scriptOutput = (0, msgpack_1.encode)({ body, headers, status: resp.status });
          } catch (err) {
            globalThis.scriptOutput = (0, msgpack_1.encode)({ body: err.message, headers: {}, status: 500 });
          }
        };
      }
      exports.handle = handle2;
    }
  });

  // node_modules/@noble/hashes/esm/_assert.js
  function number(n) {
    if (!Number.isSafeInteger(n) || n < 0)
      throw new Error(`positive integer expected, not ${n}`);
  }
  function isBytes(a) {
    return a instanceof Uint8Array || a != null && typeof a === "object" && a.constructor.name === "Uint8Array";
  }
  function bytes(b, ...lengths) {
    if (!isBytes(b))
      throw new Error("Uint8Array expected");
    if (lengths.length > 0 && !lengths.includes(b.length))
      throw new Error(`Uint8Array expected of length ${lengths}, not of length=${b.length}`);
  }
  function hash(h) {
    if (typeof h !== "function" || typeof h.create !== "function")
      throw new Error("Hash should be wrapped by utils.wrapConstructor");
    number(h.outputLen);
    number(h.blockLen);
  }
  function exists(instance, checkFinished = true) {
    if (instance.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (checkFinished && instance.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function output(out, instance) {
    bytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
      throw new Error(`digestInto() expects output buffer of length at least ${min}`);
    }
  }
  var init_assert = __esm({
    "node_modules/@noble/hashes/esm/_assert.js"() {
      "use strict";
    }
  });

  // node_modules/@noble/hashes/esm/cryptoNode.js
  var nc, crypto;
  var init_cryptoNode = __esm({
    "node_modules/@noble/hashes/esm/cryptoNode.js"() {
      "use strict";
      nc = __toESM(__require("node:crypto"), 1);
      crypto = nc && typeof nc === "object" && "webcrypto" in nc ? nc.webcrypto : nc && typeof nc === "object" && "randomBytes" in nc ? nc : void 0;
    }
  });

  // node_modules/@noble/hashes/esm/utils.js
  function byteSwap32(arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = byteSwap(arr[i]);
    }
  }
  function utf8ToBytes(str) {
    if (typeof str !== "string")
      throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
    return new Uint8Array(new TextEncoder().encode(str));
  }
  function toBytes(data) {
    if (typeof data === "string")
      data = utf8ToBytes(data);
    bytes(data);
    return data;
  }
  function concatBytes(...arrays) {
    let sum = 0;
    for (let i = 0; i < arrays.length; i++) {
      const a = arrays[i];
      bytes(a);
      sum += a.length;
    }
    const res = new Uint8Array(sum);
    for (let i = 0, pad2 = 0; i < arrays.length; i++) {
      const a = arrays[i];
      res.set(a, pad2);
      pad2 += a.length;
    }
    return res;
  }
  function wrapConstructor(hashCons) {
    const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = () => hashCons();
    return hashC;
  }
  function wrapXOFConstructorWithOpts(hashCons) {
    const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts) => hashCons(opts);
    return hashC;
  }
  function randomBytes(bytesLength = 32) {
    if (crypto && typeof crypto.getRandomValues === "function") {
      return crypto.getRandomValues(new Uint8Array(bytesLength));
    }
    if (crypto && typeof crypto.randomBytes === "function") {
      return crypto.randomBytes(bytesLength);
    }
    throw new Error("crypto.getRandomValues must be defined");
  }
  var u32, createView, rotr, isLE, byteSwap, Hash, toStr;
  var init_utils = __esm({
    "node_modules/@noble/hashes/esm/utils.js"() {
      "use strict";
      init_cryptoNode();
      init_assert();
      u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
      createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
      rotr = (word, shift) => word << 32 - shift | word >>> shift;
      isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
      byteSwap = (word) => word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
      Hash = class {
        // Safe version that clones internal state
        clone() {
          return this._cloneInto();
        }
      };
      toStr = {}.toString;
    }
  });

  // node_modules/@noble/hashes/esm/hmac.js
  var HMAC, hmac;
  var init_hmac = __esm({
    "node_modules/@noble/hashes/esm/hmac.js"() {
      "use strict";
      init_assert();
      init_utils();
      HMAC = class extends Hash {
        constructor(hash3, _key) {
          super();
          this.finished = false;
          this.destroyed = false;
          hash(hash3);
          const key = toBytes(_key);
          this.iHash = hash3.create();
          if (typeof this.iHash.update !== "function")
            throw new Error("Expected instance of class which extends utils.Hash");
          this.blockLen = this.iHash.blockLen;
          this.outputLen = this.iHash.outputLen;
          const blockLen = this.blockLen;
          const pad2 = new Uint8Array(blockLen);
          pad2.set(key.length > blockLen ? hash3.create().update(key).digest() : key);
          for (let i = 0; i < pad2.length; i++)
            pad2[i] ^= 54;
          this.iHash.update(pad2);
          this.oHash = hash3.create();
          for (let i = 0; i < pad2.length; i++)
            pad2[i] ^= 54 ^ 92;
          this.oHash.update(pad2);
          pad2.fill(0);
        }
        update(buf) {
          exists(this);
          this.iHash.update(buf);
          return this;
        }
        digestInto(out) {
          exists(this);
          bytes(out, this.outputLen);
          this.finished = true;
          this.iHash.digestInto(out);
          this.oHash.update(out);
          this.oHash.digestInto(out);
          this.destroy();
        }
        digest() {
          const out = new Uint8Array(this.oHash.outputLen);
          this.digestInto(out);
          return out;
        }
        _cloneInto(to) {
          to || (to = Object.create(Object.getPrototypeOf(this), {}));
          const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
          to = to;
          to.finished = finished;
          to.destroyed = destroyed;
          to.blockLen = blockLen;
          to.outputLen = outputLen;
          to.oHash = oHash._cloneInto(to.oHash);
          to.iHash = iHash._cloneInto(to.iHash);
          return to;
        }
        destroy() {
          this.destroyed = true;
          this.oHash.destroy();
          this.iHash.destroy();
        }
      };
      hmac = (hash3, key, message) => new HMAC(hash3, key).update(message).digest();
      hmac.create = (hash3, key) => new HMAC(hash3, key);
    }
  });

  // node_modules/@noble/hashes/esm/_md.js
  function setBigUint64(view, byteOffset, value, isLE2) {
    if (typeof view.setBigUint64 === "function")
      return view.setBigUint64(byteOffset, value, isLE2);
    const _32n2 = BigInt(32);
    const _u32_max = BigInt(4294967295);
    const wh = Number(value >> _32n2 & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE2 ? 4 : 0;
    const l = isLE2 ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE2);
    view.setUint32(byteOffset + l, wl, isLE2);
  }
  var Chi, Maj, HashMD;
  var init_md = __esm({
    "node_modules/@noble/hashes/esm/_md.js"() {
      "use strict";
      init_assert();
      init_utils();
      Chi = (a, b, c) => a & b ^ ~a & c;
      Maj = (a, b, c) => a & b ^ a & c ^ b & c;
      HashMD = class extends Hash {
        constructor(blockLen, outputLen, padOffset, isLE2) {
          super();
          this.blockLen = blockLen;
          this.outputLen = outputLen;
          this.padOffset = padOffset;
          this.isLE = isLE2;
          this.finished = false;
          this.length = 0;
          this.pos = 0;
          this.destroyed = false;
          this.buffer = new Uint8Array(blockLen);
          this.view = createView(this.buffer);
        }
        update(data) {
          exists(this);
          const { view, buffer: buffer2, blockLen } = this;
          data = toBytes(data);
          const len = data.length;
          for (let pos = 0; pos < len; ) {
            const take = Math.min(blockLen - this.pos, len - pos);
            if (take === blockLen) {
              const dataView = createView(data);
              for (; blockLen <= len - pos; pos += blockLen)
                this.process(dataView, pos);
              continue;
            }
            buffer2.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
              this.process(view, 0);
              this.pos = 0;
            }
          }
          this.length += data.length;
          this.roundClean();
          return this;
        }
        digestInto(out) {
          exists(this);
          output(out, this);
          this.finished = true;
          const { buffer: buffer2, view, blockLen, isLE: isLE2 } = this;
          let { pos } = this;
          buffer2[pos++] = 128;
          this.buffer.subarray(pos).fill(0);
          if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
          }
          for (let i = pos; i < blockLen; i++)
            buffer2[i] = 0;
          setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE2);
          this.process(view, 0);
          const oview = createView(out);
          const len = this.outputLen;
          if (len % 4)
            throw new Error("_sha2: outputLen should be aligned to 32bit");
          const outLen = len / 4;
          const state = this.get();
          if (outLen > state.length)
            throw new Error("_sha2: outputLen bigger than state");
          for (let i = 0; i < outLen; i++)
            oview.setUint32(4 * i, state[i], isLE2);
        }
        digest() {
          const { buffer: buffer2, outputLen } = this;
          this.digestInto(buffer2);
          const res = buffer2.slice(0, outputLen);
          this.destroy();
          return res;
        }
        _cloneInto(to) {
          to || (to = new this.constructor());
          to.set(...this.get());
          const { blockLen, buffer: buffer2, length, finished, destroyed, pos } = this;
          to.length = length;
          to.pos = pos;
          to.finished = finished;
          to.destroyed = destroyed;
          if (length % blockLen)
            to.buffer.set(buffer2);
          return to;
        }
      };
    }
  });

  // node_modules/@noble/hashes/esm/sha256.js
  var SHA256_K, SHA256_IV, SHA256_W, SHA256, sha256;
  var init_sha256 = __esm({
    "node_modules/@noble/hashes/esm/sha256.js"() {
      "use strict";
      init_md();
      init_utils();
      SHA256_K = /* @__PURE__ */ new Uint32Array([
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ]);
      SHA256_IV = /* @__PURE__ */ new Uint32Array([
        1779033703,
        3144134277,
        1013904242,
        2773480762,
        1359893119,
        2600822924,
        528734635,
        1541459225
      ]);
      SHA256_W = /* @__PURE__ */ new Uint32Array(64);
      SHA256 = class extends HashMD {
        constructor() {
          super(64, 32, 8, false);
          this.A = SHA256_IV[0] | 0;
          this.B = SHA256_IV[1] | 0;
          this.C = SHA256_IV[2] | 0;
          this.D = SHA256_IV[3] | 0;
          this.E = SHA256_IV[4] | 0;
          this.F = SHA256_IV[5] | 0;
          this.G = SHA256_IV[6] | 0;
          this.H = SHA256_IV[7] | 0;
        }
        get() {
          const { A, B, C, D, E, F, G, H } = this;
          return [A, B, C, D, E, F, G, H];
        }
        // prettier-ignore
        set(A, B, C, D, E, F, G, H) {
          this.A = A | 0;
          this.B = B | 0;
          this.C = C | 0;
          this.D = D | 0;
          this.E = E | 0;
          this.F = F | 0;
          this.G = G | 0;
          this.H = H | 0;
        }
        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4)
            SHA256_W[i] = view.getUint32(offset, false);
          for (let i = 16; i < 64; i++) {
            const W15 = SHA256_W[i - 15];
            const W2 = SHA256_W[i - 2];
            const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
            const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
            SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
          }
          let { A, B, C, D, E, F, G, H } = this;
          for (let i = 0; i < 64; i++) {
            const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
            const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
            const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
            const T2 = sigma0 + Maj(A, B, C) | 0;
            H = G;
            G = F;
            F = E;
            E = D + T1 | 0;
            D = C;
            C = B;
            B = A;
            A = T1 + T2 | 0;
          }
          A = A + this.A | 0;
          B = B + this.B | 0;
          C = C + this.C | 0;
          D = D + this.D | 0;
          E = E + this.E | 0;
          F = F + this.F | 0;
          G = G + this.G | 0;
          H = H + this.H | 0;
          this.set(A, B, C, D, E, F, G, H);
        }
        roundClean() {
          SHA256_W.fill(0);
        }
        destroy() {
          this.set(0, 0, 0, 0, 0, 0, 0, 0);
          this.buffer.fill(0);
        }
      };
      sha256 = /* @__PURE__ */ wrapConstructor(() => new SHA256());
    }
  });

  // node_modules/@noble/hashes/esm/_u64.js
  function fromBig(n, le = false) {
    if (le)
      return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
    return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
  }
  function split(lst, le = false) {
    let Ah = new Uint32Array(lst.length);
    let Al = new Uint32Array(lst.length);
    for (let i = 0; i < lst.length; i++) {
      const { h, l } = fromBig(lst[i], le);
      [Ah[i], Al[i]] = [h, l];
    }
    return [Ah, Al];
  }
  var U32_MASK64, _32n, rotlSH, rotlSL, rotlBH, rotlBL;
  var init_u64 = __esm({
    "node_modules/@noble/hashes/esm/_u64.js"() {
      "use strict";
      U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
      _32n = /* @__PURE__ */ BigInt(32);
      rotlSH = (h, l, s) => h << s | l >>> 32 - s;
      rotlSL = (h, l, s) => l << s | h >>> 32 - s;
      rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
      rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
    }
  });

  // node_modules/@noble/curves/esm/abstract/utils.js
  var utils_exports = {};
  __export(utils_exports, {
    aInRange: () => aInRange,
    abool: () => abool,
    abytes: () => abytes,
    bitGet: () => bitGet,
    bitLen: () => bitLen,
    bitMask: () => bitMask,
    bitSet: () => bitSet,
    bytesToHex: () => bytesToHex,
    bytesToNumberBE: () => bytesToNumberBE,
    bytesToNumberLE: () => bytesToNumberLE,
    concatBytes: () => concatBytes2,
    createHmacDrbg: () => createHmacDrbg,
    ensureBytes: () => ensureBytes,
    equalBytes: () => equalBytes,
    hexToBytes: () => hexToBytes,
    hexToNumber: () => hexToNumber,
    inRange: () => inRange,
    isBytes: () => isBytes2,
    memoized: () => memoized,
    notImplemented: () => notImplemented,
    numberToBytesBE: () => numberToBytesBE,
    numberToBytesLE: () => numberToBytesLE,
    numberToHexUnpadded: () => numberToHexUnpadded,
    numberToVarBytesBE: () => numberToVarBytesBE,
    utf8ToBytes: () => utf8ToBytes2,
    validateObject: () => validateObject
  });
  function isBytes2(a) {
    return a instanceof Uint8Array || a != null && typeof a === "object" && a.constructor.name === "Uint8Array";
  }
  function abytes(item) {
    if (!isBytes2(item))
      throw new Error("Uint8Array expected");
  }
  function abool(title, value) {
    if (typeof value !== "boolean")
      throw new Error(`${title} must be valid boolean, got "${value}".`);
  }
  function bytesToHex(bytes2) {
    abytes(bytes2);
    let hex = "";
    for (let i = 0; i < bytes2.length; i++) {
      hex += hexes[bytes2[i]];
    }
    return hex;
  }
  function numberToHexUnpadded(num2) {
    const hex = num2.toString(16);
    return hex.length & 1 ? `0${hex}` : hex;
  }
  function hexToNumber(hex) {
    if (typeof hex !== "string")
      throw new Error("hex string expected, got " + typeof hex);
    return BigInt(hex === "" ? "0" : `0x${hex}`);
  }
  function asciiToBase16(char) {
    if (char >= asciis._0 && char <= asciis._9)
      return char - asciis._0;
    if (char >= asciis._A && char <= asciis._F)
      return char - (asciis._A - 10);
    if (char >= asciis._a && char <= asciis._f)
      return char - (asciis._a - 10);
    return;
  }
  function hexToBytes(hex) {
    if (typeof hex !== "string")
      throw new Error("hex string expected, got " + typeof hex);
    const hl = hex.length;
    const al = hl / 2;
    if (hl % 2)
      throw new Error("padded hex string expected, got unpadded hex of length " + hl);
    const array = new Uint8Array(al);
    for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
      const n1 = asciiToBase16(hex.charCodeAt(hi));
      const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
      if (n1 === void 0 || n2 === void 0) {
        const char = hex[hi] + hex[hi + 1];
        throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
      }
      array[ai] = n1 * 16 + n2;
    }
    return array;
  }
  function bytesToNumberBE(bytes2) {
    return hexToNumber(bytesToHex(bytes2));
  }
  function bytesToNumberLE(bytes2) {
    abytes(bytes2);
    return hexToNumber(bytesToHex(Uint8Array.from(bytes2).reverse()));
  }
  function numberToBytesBE(n, len) {
    return hexToBytes(n.toString(16).padStart(len * 2, "0"));
  }
  function numberToBytesLE(n, len) {
    return numberToBytesBE(n, len).reverse();
  }
  function numberToVarBytesBE(n) {
    return hexToBytes(numberToHexUnpadded(n));
  }
  function ensureBytes(title, hex, expectedLength) {
    let res;
    if (typeof hex === "string") {
      try {
        res = hexToBytes(hex);
      } catch (e) {
        throw new Error(`${title} must be valid hex string, got "${hex}". Cause: ${e}`);
      }
    } else if (isBytes2(hex)) {
      res = Uint8Array.from(hex);
    } else {
      throw new Error(`${title} must be hex string or Uint8Array`);
    }
    const len = res.length;
    if (typeof expectedLength === "number" && len !== expectedLength)
      throw new Error(`${title} expected ${expectedLength} bytes, got ${len}`);
    return res;
  }
  function concatBytes2(...arrays) {
    let sum = 0;
    for (let i = 0; i < arrays.length; i++) {
      const a = arrays[i];
      abytes(a);
      sum += a.length;
    }
    const res = new Uint8Array(sum);
    for (let i = 0, pad2 = 0; i < arrays.length; i++) {
      const a = arrays[i];
      res.set(a, pad2);
      pad2 += a.length;
    }
    return res;
  }
  function equalBytes(a, b) {
    if (a.length !== b.length)
      return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++)
      diff |= a[i] ^ b[i];
    return diff === 0;
  }
  function utf8ToBytes2(str) {
    if (typeof str !== "string")
      throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
    return new Uint8Array(new TextEncoder().encode(str));
  }
  function inRange(n, min, max) {
    return isPosBig(n) && isPosBig(min) && isPosBig(max) && min <= n && n < max;
  }
  function aInRange(title, n, min, max) {
    if (!inRange(n, min, max))
      throw new Error(`expected valid ${title}: ${min} <= n < ${max}, got ${typeof n} ${n}`);
  }
  function bitLen(n) {
    let len;
    for (len = 0; n > _0n; n >>= _1n, len += 1)
      ;
    return len;
  }
  function bitGet(n, pos) {
    return n >> BigInt(pos) & _1n;
  }
  function bitSet(n, pos, value) {
    return n | (value ? _1n : _0n) << BigInt(pos);
  }
  function createHmacDrbg(hashLen, qByteLen, hmacFn) {
    if (typeof hashLen !== "number" || hashLen < 2)
      throw new Error("hashLen must be a number");
    if (typeof qByteLen !== "number" || qByteLen < 2)
      throw new Error("qByteLen must be a number");
    if (typeof hmacFn !== "function")
      throw new Error("hmacFn must be a function");
    let v = u8n(hashLen);
    let k = u8n(hashLen);
    let i = 0;
    const reset = () => {
      v.fill(1);
      k.fill(0);
      i = 0;
    };
    const h = (...b) => hmacFn(k, v, ...b);
    const reseed = (seed = u8n()) => {
      k = h(u8fr([0]), seed);
      v = h();
      if (seed.length === 0)
        return;
      k = h(u8fr([1]), seed);
      v = h();
    };
    const gen2 = () => {
      if (i++ >= 1e3)
        throw new Error("drbg: tried 1000 values");
      let len = 0;
      const out = [];
      while (len < qByteLen) {
        v = h();
        const sl = v.slice();
        out.push(sl);
        len += v.length;
      }
      return concatBytes2(...out);
    };
    const genUntil = (seed, pred) => {
      reset();
      reseed(seed);
      let res = void 0;
      while (!(res = pred(gen2())))
        reseed();
      reset();
      return res;
    };
    return genUntil;
  }
  function validateObject(object, validators, optValidators = {}) {
    const checkField = (fieldName, type, isOptional) => {
      const checkVal = validatorFns[type];
      if (typeof checkVal !== "function")
        throw new Error(`Invalid validator "${type}", expected function`);
      const val = object[fieldName];
      if (isOptional && val === void 0)
        return;
      if (!checkVal(val, object)) {
        throw new Error(`Invalid param ${String(fieldName)}=${val} (${typeof val}), expected ${type}`);
      }
    };
    for (const [fieldName, type] of Object.entries(validators))
      checkField(fieldName, type, false);
    for (const [fieldName, type] of Object.entries(optValidators))
      checkField(fieldName, type, true);
    return object;
  }
  function memoized(fn) {
    const map = /* @__PURE__ */ new WeakMap();
    return (arg, ...args) => {
      const val = map.get(arg);
      if (val !== void 0)
        return val;
      const computed = fn(arg, ...args);
      map.set(arg, computed);
      return computed;
    };
  }
  var _0n, _1n, _2n, hexes, asciis, isPosBig, bitMask, u8n, u8fr, validatorFns, notImplemented;
  var init_utils2 = __esm({
    "node_modules/@noble/curves/esm/abstract/utils.js"() {
      "use strict";
      _0n = /* @__PURE__ */ BigInt(0);
      _1n = /* @__PURE__ */ BigInt(1);
      _2n = /* @__PURE__ */ BigInt(2);
      hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
      asciis = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
      isPosBig = (n) => typeof n === "bigint" && _0n <= n;
      bitMask = (n) => (_2n << BigInt(n - 1)) - _1n;
      u8n = (data) => new Uint8Array(data);
      u8fr = (arr) => Uint8Array.from(arr);
      validatorFns = {
        bigint: (val) => typeof val === "bigint",
        function: (val) => typeof val === "function",
        boolean: (val) => typeof val === "boolean",
        string: (val) => typeof val === "string",
        stringOrUint8Array: (val) => typeof val === "string" || isBytes2(val),
        isSafeInteger: (val) => Number.isSafeInteger(val),
        array: (val) => Array.isArray(val),
        field: (val, object) => object.Fp.isValid(val),
        hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
      };
      notImplemented = () => {
        throw new Error("not implemented");
      };
    }
  });

  // node_modules/@noble/curves/esm/abstract/modular.js
  function mod(a, b) {
    const result = a % b;
    return result >= _0n2 ? result : b + result;
  }
  function pow(num2, power, modulo) {
    if (modulo <= _0n2 || power < _0n2)
      throw new Error("Expected power/modulo > 0");
    if (modulo === _1n2)
      return _0n2;
    let res = _1n2;
    while (power > _0n2) {
      if (power & _1n2)
        res = res * num2 % modulo;
      num2 = num2 * num2 % modulo;
      power >>= _1n2;
    }
    return res;
  }
  function pow2(x, power, modulo) {
    let res = x;
    while (power-- > _0n2) {
      res *= res;
      res %= modulo;
    }
    return res;
  }
  function invert(number2, modulo) {
    if (number2 === _0n2 || modulo <= _0n2) {
      throw new Error(`invert: expected positive integers, got n=${number2} mod=${modulo}`);
    }
    let a = mod(number2, modulo);
    let b = modulo;
    let x = _0n2, y = _1n2, u = _1n2, v = _0n2;
    while (a !== _0n2) {
      const q = b / a;
      const r = b % a;
      const m = x - u * q;
      const n = y - v * q;
      b = a, a = r, x = u, y = v, u = m, v = n;
    }
    const gcd = b;
    if (gcd !== _1n2)
      throw new Error("invert: does not exist");
    return mod(x, modulo);
  }
  function tonelliShanks(P) {
    const legendreC = (P - _1n2) / _2n2;
    let Q, S, Z;
    for (Q = P - _1n2, S = 0; Q % _2n2 === _0n2; Q /= _2n2, S++)
      ;
    for (Z = _2n2; Z < P && pow(Z, legendreC, P) !== P - _1n2; Z++)
      ;
    if (S === 1) {
      const p1div4 = (P + _1n2) / _4n;
      return function tonelliFast(Fp2, n) {
        const root = Fp2.pow(n, p1div4);
        if (!Fp2.eql(Fp2.sqr(root), n))
          throw new Error("Cannot find square root");
        return root;
      };
    }
    const Q1div2 = (Q + _1n2) / _2n2;
    return function tonelliSlow(Fp2, n) {
      if (Fp2.pow(n, legendreC) === Fp2.neg(Fp2.ONE))
        throw new Error("Cannot find square root");
      let r = S;
      let g = Fp2.pow(Fp2.mul(Fp2.ONE, Z), Q);
      let x = Fp2.pow(n, Q1div2);
      let b = Fp2.pow(n, Q);
      while (!Fp2.eql(b, Fp2.ONE)) {
        if (Fp2.eql(b, Fp2.ZERO))
          return Fp2.ZERO;
        let m = 1;
        for (let t2 = Fp2.sqr(b); m < r; m++) {
          if (Fp2.eql(t2, Fp2.ONE))
            break;
          t2 = Fp2.sqr(t2);
        }
        const ge = Fp2.pow(g, _1n2 << BigInt(r - m - 1));
        g = Fp2.sqr(ge);
        x = Fp2.mul(x, ge);
        b = Fp2.mul(b, g);
        r = m;
      }
      return x;
    };
  }
  function FpSqrt(P) {
    if (P % _4n === _3n) {
      const p1div4 = (P + _1n2) / _4n;
      return function sqrt3mod4(Fp2, n) {
        const root = Fp2.pow(n, p1div4);
        if (!Fp2.eql(Fp2.sqr(root), n))
          throw new Error("Cannot find square root");
        return root;
      };
    }
    if (P % _8n === _5n) {
      const c1 = (P - _5n) / _8n;
      return function sqrt5mod8(Fp2, n) {
        const n2 = Fp2.mul(n, _2n2);
        const v = Fp2.pow(n2, c1);
        const nv = Fp2.mul(n, v);
        const i = Fp2.mul(Fp2.mul(nv, _2n2), v);
        const root = Fp2.mul(nv, Fp2.sub(i, Fp2.ONE));
        if (!Fp2.eql(Fp2.sqr(root), n))
          throw new Error("Cannot find square root");
        return root;
      };
    }
    if (P % _16n === _9n) {
    }
    return tonelliShanks(P);
  }
  function validateField(field) {
    const initial = {
      ORDER: "bigint",
      MASK: "bigint",
      BYTES: "isSafeInteger",
      BITS: "isSafeInteger"
    };
    const opts = FIELD_FIELDS.reduce((map, val) => {
      map[val] = "function";
      return map;
    }, initial);
    return validateObject(field, opts);
  }
  function FpPow(f, num2, power) {
    if (power < _0n2)
      throw new Error("Expected power > 0");
    if (power === _0n2)
      return f.ONE;
    if (power === _1n2)
      return num2;
    let p = f.ONE;
    let d = num2;
    while (power > _0n2) {
      if (power & _1n2)
        p = f.mul(p, d);
      d = f.sqr(d);
      power >>= _1n2;
    }
    return p;
  }
  function FpInvertBatch(f, nums) {
    const tmp = new Array(nums.length);
    const lastMultiplied = nums.reduce((acc, num2, i) => {
      if (f.is0(num2))
        return acc;
      tmp[i] = acc;
      return f.mul(acc, num2);
    }, f.ONE);
    const inverted = f.inv(lastMultiplied);
    nums.reduceRight((acc, num2, i) => {
      if (f.is0(num2))
        return acc;
      tmp[i] = f.mul(acc, tmp[i]);
      return f.mul(acc, num2);
    }, inverted);
    return tmp;
  }
  function nLength(n, nBitLength) {
    const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
    const nByteLength = Math.ceil(_nBitLength / 8);
    return { nBitLength: _nBitLength, nByteLength };
  }
  function Field(ORDER, bitLen2, isLE2 = false, redef = {}) {
    if (ORDER <= _0n2)
      throw new Error(`Expected Field ORDER > 0, got ${ORDER}`);
    const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, bitLen2);
    if (BYTES > 2048)
      throw new Error("Field lengths over 2048 bytes are not supported");
    const sqrtP = FpSqrt(ORDER);
    const f = Object.freeze({
      ORDER,
      BITS,
      BYTES,
      MASK: bitMask(BITS),
      ZERO: _0n2,
      ONE: _1n2,
      create: (num2) => mod(num2, ORDER),
      isValid: (num2) => {
        if (typeof num2 !== "bigint")
          throw new Error(`Invalid field element: expected bigint, got ${typeof num2}`);
        return _0n2 <= num2 && num2 < ORDER;
      },
      is0: (num2) => num2 === _0n2,
      isOdd: (num2) => (num2 & _1n2) === _1n2,
      neg: (num2) => mod(-num2, ORDER),
      eql: (lhs, rhs) => lhs === rhs,
      sqr: (num2) => mod(num2 * num2, ORDER),
      add: (lhs, rhs) => mod(lhs + rhs, ORDER),
      sub: (lhs, rhs) => mod(lhs - rhs, ORDER),
      mul: (lhs, rhs) => mod(lhs * rhs, ORDER),
      pow: (num2, power) => FpPow(f, num2, power),
      div: (lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER),
      // Same as above, but doesn't normalize
      sqrN: (num2) => num2 * num2,
      addN: (lhs, rhs) => lhs + rhs,
      subN: (lhs, rhs) => lhs - rhs,
      mulN: (lhs, rhs) => lhs * rhs,
      inv: (num2) => invert(num2, ORDER),
      sqrt: redef.sqrt || ((n) => sqrtP(f, n)),
      invertBatch: (lst) => FpInvertBatch(f, lst),
      // TODO: do we really need constant cmov?
      // We don't have const-time bigints anyway, so probably will be not very useful
      cmov: (a, b, c) => c ? b : a,
      toBytes: (num2) => isLE2 ? numberToBytesLE(num2, BYTES) : numberToBytesBE(num2, BYTES),
      fromBytes: (bytes2) => {
        if (bytes2.length !== BYTES)
          throw new Error(`Fp.fromBytes: expected ${BYTES}, got ${bytes2.length}`);
        return isLE2 ? bytesToNumberLE(bytes2) : bytesToNumberBE(bytes2);
      }
    });
    return Object.freeze(f);
  }
  function getFieldBytesLength(fieldOrder) {
    if (typeof fieldOrder !== "bigint")
      throw new Error("field order must be bigint");
    const bitLength = fieldOrder.toString(2).length;
    return Math.ceil(bitLength / 8);
  }
  function getMinHashLength(fieldOrder) {
    const length = getFieldBytesLength(fieldOrder);
    return length + Math.ceil(length / 2);
  }
  function mapHashToField(key, fieldOrder, isLE2 = false) {
    const len = key.length;
    const fieldLen = getFieldBytesLength(fieldOrder);
    const minLen = getMinHashLength(fieldOrder);
    if (len < 16 || len < minLen || len > 1024)
      throw new Error(`expected ${minLen}-1024 bytes of input, got ${len}`);
    const num2 = isLE2 ? bytesToNumberBE(key) : bytesToNumberLE(key);
    const reduced = mod(num2, fieldOrder - _1n2) + _1n2;
    return isLE2 ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
  }
  var _0n2, _1n2, _2n2, _3n, _4n, _5n, _8n, _9n, _16n, FIELD_FIELDS;
  var init_modular = __esm({
    "node_modules/@noble/curves/esm/abstract/modular.js"() {
      "use strict";
      init_utils2();
      _0n2 = BigInt(0);
      _1n2 = BigInt(1);
      _2n2 = BigInt(2);
      _3n = BigInt(3);
      _4n = BigInt(4);
      _5n = BigInt(5);
      _8n = BigInt(8);
      _9n = BigInt(9);
      _16n = BigInt(16);
      FIELD_FIELDS = [
        "create",
        "isValid",
        "is0",
        "neg",
        "inv",
        "sqrt",
        "sqr",
        "eql",
        "add",
        "sub",
        "mul",
        "pow",
        "div",
        "addN",
        "subN",
        "mulN",
        "sqrN"
      ];
    }
  });

  // node_modules/@noble/curves/esm/abstract/curve.js
  function wNAF(c, bits) {
    const constTimeNegate = (condition, item) => {
      const neg = item.negate();
      return condition ? neg : item;
    };
    const validateW = (W) => {
      if (!Number.isSafeInteger(W) || W <= 0 || W > bits)
        throw new Error(`Wrong window size=${W}, should be [1..${bits}]`);
    };
    const opts = (W) => {
      validateW(W);
      const windows = Math.ceil(bits / W) + 1;
      const windowSize = 2 ** (W - 1);
      return { windows, windowSize };
    };
    return {
      constTimeNegate,
      // non-const time multiplication ladder
      unsafeLadder(elm, n) {
        let p = c.ZERO;
        let d = elm;
        while (n > _0n3) {
          if (n & _1n3)
            p = p.add(d);
          d = d.double();
          n >>= _1n3;
        }
        return p;
      },
      /**
       * Creates a wNAF precomputation window. Used for caching.
       * Default window size is set by `utils.precompute()` and is equal to 8.
       * Number of precomputed points depends on the curve size:
       * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
       * - 𝑊 is the window size
       * - 𝑛 is the bitlength of the curve order.
       * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
       * @returns precomputed point tables flattened to a single array
       */
      precomputeWindow(elm, W) {
        const { windows, windowSize } = opts(W);
        const points = [];
        let p = elm;
        let base = p;
        for (let window = 0; window < windows; window++) {
          base = p;
          points.push(base);
          for (let i = 1; i < windowSize; i++) {
            base = base.add(p);
            points.push(base);
          }
          p = base.double();
        }
        return points;
      },
      /**
       * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
       * @param W window size
       * @param precomputes precomputed tables
       * @param n scalar (we don't check here, but should be less than curve order)
       * @returns real and fake (for const-time) points
       */
      wNAF(W, precomputes, n) {
        const { windows, windowSize } = opts(W);
        let p = c.ZERO;
        let f = c.BASE;
        const mask = BigInt(2 ** W - 1);
        const maxNumber = 2 ** W;
        const shiftBy = BigInt(W);
        for (let window = 0; window < windows; window++) {
          const offset = window * windowSize;
          let wbits = Number(n & mask);
          n >>= shiftBy;
          if (wbits > windowSize) {
            wbits -= maxNumber;
            n += _1n3;
          }
          const offset1 = offset;
          const offset2 = offset + Math.abs(wbits) - 1;
          const cond1 = window % 2 !== 0;
          const cond2 = wbits < 0;
          if (wbits === 0) {
            f = f.add(constTimeNegate(cond1, precomputes[offset1]));
          } else {
            p = p.add(constTimeNegate(cond2, precomputes[offset2]));
          }
        }
        return { p, f };
      },
      wNAFCached(P, n, transform) {
        const W = pointWindowSizes.get(P) || 1;
        let comp = pointPrecomputes.get(P);
        if (!comp) {
          comp = this.precomputeWindow(P, W);
          if (W !== 1)
            pointPrecomputes.set(P, transform(comp));
        }
        return this.wNAF(W, comp, n);
      },
      // We calculate precomputes for elliptic curve point multiplication
      // using windowed method. This specifies window size and
      // stores precomputed values. Usually only base point would be precomputed.
      setWindowSize(P, W) {
        validateW(W);
        pointWindowSizes.set(P, W);
        pointPrecomputes.delete(P);
      }
    };
  }
  function pippenger(c, field, points, scalars) {
    if (!Array.isArray(points) || !Array.isArray(scalars) || scalars.length !== points.length)
      throw new Error("arrays of points and scalars must have equal length");
    scalars.forEach((s, i) => {
      if (!field.isValid(s))
        throw new Error(`wrong scalar at index ${i}`);
    });
    points.forEach((p, i) => {
      if (!(p instanceof c))
        throw new Error(`wrong point at index ${i}`);
    });
    const wbits = bitLen(BigInt(points.length));
    const windowSize = wbits > 12 ? wbits - 3 : wbits > 4 ? wbits - 2 : wbits ? 2 : 1;
    const MASK = (1 << windowSize) - 1;
    const buckets = new Array(MASK + 1).fill(c.ZERO);
    const lastBits = Math.floor((field.BITS - 1) / windowSize) * windowSize;
    let sum = c.ZERO;
    for (let i = lastBits; i >= 0; i -= windowSize) {
      buckets.fill(c.ZERO);
      for (let j = 0; j < scalars.length; j++) {
        const scalar = scalars[j];
        const wbits2 = Number(scalar >> BigInt(i) & BigInt(MASK));
        buckets[wbits2] = buckets[wbits2].add(points[j]);
      }
      let resI = c.ZERO;
      for (let j = buckets.length - 1, sumI = c.ZERO; j > 0; j--) {
        sumI = sumI.add(buckets[j]);
        resI = resI.add(sumI);
      }
      sum = sum.add(resI);
      if (i !== 0)
        for (let j = 0; j < windowSize; j++)
          sum = sum.double();
    }
    return sum;
  }
  function validateBasic(curve) {
    validateField(curve.Fp);
    validateObject(curve, {
      n: "bigint",
      h: "bigint",
      Gx: "field",
      Gy: "field"
    }, {
      nBitLength: "isSafeInteger",
      nByteLength: "isSafeInteger"
    });
    return Object.freeze({
      ...nLength(curve.n, curve.nBitLength),
      ...curve,
      ...{ p: curve.Fp.ORDER }
    });
  }
  var _0n3, _1n3, pointPrecomputes, pointWindowSizes;
  var init_curve = __esm({
    "node_modules/@noble/curves/esm/abstract/curve.js"() {
      "use strict";
      init_modular();
      init_utils2();
      _0n3 = BigInt(0);
      _1n3 = BigInt(1);
      pointPrecomputes = /* @__PURE__ */ new WeakMap();
      pointWindowSizes = /* @__PURE__ */ new WeakMap();
    }
  });

  // node_modules/@noble/curves/esm/abstract/weierstrass.js
  function validateSigVerOpts(opts) {
    if (opts.lowS !== void 0)
      abool("lowS", opts.lowS);
    if (opts.prehash !== void 0)
      abool("prehash", opts.prehash);
  }
  function validatePointOpts(curve) {
    const opts = validateBasic(curve);
    validateObject(opts, {
      a: "field",
      b: "field"
    }, {
      allowedPrivateKeyLengths: "array",
      wrapPrivateKey: "boolean",
      isTorsionFree: "function",
      clearCofactor: "function",
      allowInfinityPoint: "boolean",
      fromBytes: "function",
      toBytes: "function"
    });
    const { endo, Fp: Fp2, a } = opts;
    if (endo) {
      if (!Fp2.eql(a, Fp2.ZERO)) {
        throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
      }
      if (typeof endo !== "object" || typeof endo.beta !== "bigint" || typeof endo.splitScalar !== "function") {
        throw new Error("Expected endomorphism with beta: bigint and splitScalar: function");
      }
    }
    return Object.freeze({ ...opts });
  }
  function weierstrassPoints(opts) {
    const CURVE = validatePointOpts(opts);
    const { Fp: Fp2 } = CURVE;
    const Fn = Field(CURVE.n, CURVE.nBitLength);
    const toBytes3 = CURVE.toBytes || ((_c, point, _isCompressed) => {
      const a = point.toAffine();
      return concatBytes2(Uint8Array.from([4]), Fp2.toBytes(a.x), Fp2.toBytes(a.y));
    });
    const fromBytes = CURVE.fromBytes || ((bytes2) => {
      const tail = bytes2.subarray(1);
      const x = Fp2.fromBytes(tail.subarray(0, Fp2.BYTES));
      const y = Fp2.fromBytes(tail.subarray(Fp2.BYTES, 2 * Fp2.BYTES));
      return { x, y };
    });
    function weierstrassEquation(x) {
      const { a, b } = CURVE;
      const x2 = Fp2.sqr(x);
      const x3 = Fp2.mul(x2, x);
      return Fp2.add(Fp2.add(x3, Fp2.mul(x, a)), b);
    }
    if (!Fp2.eql(Fp2.sqr(CURVE.Gy), weierstrassEquation(CURVE.Gx)))
      throw new Error("bad generator point: equation left != right");
    function isWithinCurveOrder(num2) {
      return inRange(num2, _1n4, CURVE.n);
    }
    function normPrivateKeyToScalar(key) {
      const { allowedPrivateKeyLengths: lengths, nByteLength, wrapPrivateKey, n: N } = CURVE;
      if (lengths && typeof key !== "bigint") {
        if (isBytes2(key))
          key = bytesToHex(key);
        if (typeof key !== "string" || !lengths.includes(key.length))
          throw new Error("Invalid key");
        key = key.padStart(nByteLength * 2, "0");
      }
      let num2;
      try {
        num2 = typeof key === "bigint" ? key : bytesToNumberBE(ensureBytes("private key", key, nByteLength));
      } catch (error) {
        throw new Error(`private key must be ${nByteLength} bytes, hex or bigint, not ${typeof key}`);
      }
      if (wrapPrivateKey)
        num2 = mod(num2, N);
      aInRange("private key", num2, _1n4, N);
      return num2;
    }
    function assertPrjPoint(other) {
      if (!(other instanceof Point2))
        throw new Error("ProjectivePoint expected");
    }
    const toAffineMemo = memoized((p, iz) => {
      const { px: x, py: y, pz: z } = p;
      if (Fp2.eql(z, Fp2.ONE))
        return { x, y };
      const is0 = p.is0();
      if (iz == null)
        iz = is0 ? Fp2.ONE : Fp2.inv(z);
      const ax = Fp2.mul(x, iz);
      const ay = Fp2.mul(y, iz);
      const zz = Fp2.mul(z, iz);
      if (is0)
        return { x: Fp2.ZERO, y: Fp2.ZERO };
      if (!Fp2.eql(zz, Fp2.ONE))
        throw new Error("invZ was invalid");
      return { x: ax, y: ay };
    });
    const assertValidMemo = memoized((p) => {
      if (p.is0()) {
        if (CURVE.allowInfinityPoint && !Fp2.is0(p.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x, y } = p.toAffine();
      if (!Fp2.isValid(x) || !Fp2.isValid(y))
        throw new Error("bad point: x or y not FE");
      const left = Fp2.sqr(y);
      const right = weierstrassEquation(x);
      if (!Fp2.eql(left, right))
        throw new Error("bad point: equation left != right");
      if (!p.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
      return true;
    });
    class Point2 {
      constructor(px, py, pz) {
        this.px = px;
        this.py = py;
        this.pz = pz;
        if (px == null || !Fp2.isValid(px))
          throw new Error("x required");
        if (py == null || !Fp2.isValid(py))
          throw new Error("y required");
        if (pz == null || !Fp2.isValid(pz))
          throw new Error("z required");
        Object.freeze(this);
      }
      // Does not validate if the point is on-curve.
      // Use fromHex instead, or call assertValidity() later.
      static fromAffine(p) {
        const { x, y } = p || {};
        if (!p || !Fp2.isValid(x) || !Fp2.isValid(y))
          throw new Error("invalid affine point");
        if (p instanceof Point2)
          throw new Error("projective point not allowed");
        const is0 = (i) => Fp2.eql(i, Fp2.ZERO);
        if (is0(x) && is0(y))
          return Point2.ZERO;
        return new Point2(x, y, Fp2.ONE);
      }
      get x() {
        return this.toAffine().x;
      }
      get y() {
        return this.toAffine().y;
      }
      /**
       * Takes a bunch of Projective Points but executes only one
       * inversion on all of them. Inversion is very slow operation,
       * so this improves performance massively.
       * Optimization: converts a list of projective points to a list of identical points with Z=1.
       */
      static normalizeZ(points) {
        const toInv = Fp2.invertBatch(points.map((p) => p.pz));
        return points.map((p, i) => p.toAffine(toInv[i])).map(Point2.fromAffine);
      }
      /**
       * Converts hash string or Uint8Array to Point.
       * @param hex short/long ECDSA hex
       */
      static fromHex(hex) {
        const P = Point2.fromAffine(fromBytes(ensureBytes("pointHex", hex)));
        P.assertValidity();
        return P;
      }
      // Multiplies generator point by privateKey.
      static fromPrivateKey(privateKey) {
        return Point2.BASE.multiply(normPrivateKeyToScalar(privateKey));
      }
      // Multiscalar Multiplication
      static msm(points, scalars) {
        return pippenger(Point2, Fn, points, scalars);
      }
      // "Private method", don't use it directly
      _setWindowSize(windowSize) {
        wnaf.setWindowSize(this, windowSize);
      }
      // A point on curve is valid if it conforms to equation.
      assertValidity() {
        assertValidMemo(this);
      }
      hasEvenY() {
        const { y } = this.toAffine();
        if (Fp2.isOdd)
          return !Fp2.isOdd(y);
        throw new Error("Field doesn't support isOdd");
      }
      /**
       * Compare one point to another.
       */
      equals(other) {
        assertPrjPoint(other);
        const { px: X1, py: Y1, pz: Z1 } = this;
        const { px: X2, py: Y2, pz: Z2 } = other;
        const U1 = Fp2.eql(Fp2.mul(X1, Z2), Fp2.mul(X2, Z1));
        const U2 = Fp2.eql(Fp2.mul(Y1, Z2), Fp2.mul(Y2, Z1));
        return U1 && U2;
      }
      /**
       * Flips point to one corresponding to (x, -y) in Affine coordinates.
       */
      negate() {
        return new Point2(this.px, Fp2.neg(this.py), this.pz);
      }
      // Renes-Costello-Batina exception-free doubling formula.
      // There is 30% faster Jacobian formula, but it is not complete.
      // https://eprint.iacr.org/2015/1060, algorithm 3
      // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
      double() {
        const { a, b } = CURVE;
        const b3 = Fp2.mul(b, _3n2);
        const { px: X1, py: Y1, pz: Z1 } = this;
        let X3 = Fp2.ZERO, Y3 = Fp2.ZERO, Z3 = Fp2.ZERO;
        let t0 = Fp2.mul(X1, X1);
        let t1 = Fp2.mul(Y1, Y1);
        let t2 = Fp2.mul(Z1, Z1);
        let t3 = Fp2.mul(X1, Y1);
        t3 = Fp2.add(t3, t3);
        Z3 = Fp2.mul(X1, Z1);
        Z3 = Fp2.add(Z3, Z3);
        X3 = Fp2.mul(a, Z3);
        Y3 = Fp2.mul(b3, t2);
        Y3 = Fp2.add(X3, Y3);
        X3 = Fp2.sub(t1, Y3);
        Y3 = Fp2.add(t1, Y3);
        Y3 = Fp2.mul(X3, Y3);
        X3 = Fp2.mul(t3, X3);
        Z3 = Fp2.mul(b3, Z3);
        t2 = Fp2.mul(a, t2);
        t3 = Fp2.sub(t0, t2);
        t3 = Fp2.mul(a, t3);
        t3 = Fp2.add(t3, Z3);
        Z3 = Fp2.add(t0, t0);
        t0 = Fp2.add(Z3, t0);
        t0 = Fp2.add(t0, t2);
        t0 = Fp2.mul(t0, t3);
        Y3 = Fp2.add(Y3, t0);
        t2 = Fp2.mul(Y1, Z1);
        t2 = Fp2.add(t2, t2);
        t0 = Fp2.mul(t2, t3);
        X3 = Fp2.sub(X3, t0);
        Z3 = Fp2.mul(t2, t1);
        Z3 = Fp2.add(Z3, Z3);
        Z3 = Fp2.add(Z3, Z3);
        return new Point2(X3, Y3, Z3);
      }
      // Renes-Costello-Batina exception-free addition formula.
      // There is 30% faster Jacobian formula, but it is not complete.
      // https://eprint.iacr.org/2015/1060, algorithm 1
      // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
      add(other) {
        assertPrjPoint(other);
        const { px: X1, py: Y1, pz: Z1 } = this;
        const { px: X2, py: Y2, pz: Z2 } = other;
        let X3 = Fp2.ZERO, Y3 = Fp2.ZERO, Z3 = Fp2.ZERO;
        const a = CURVE.a;
        const b3 = Fp2.mul(CURVE.b, _3n2);
        let t0 = Fp2.mul(X1, X2);
        let t1 = Fp2.mul(Y1, Y2);
        let t2 = Fp2.mul(Z1, Z2);
        let t3 = Fp2.add(X1, Y1);
        let t4 = Fp2.add(X2, Y2);
        t3 = Fp2.mul(t3, t4);
        t4 = Fp2.add(t0, t1);
        t3 = Fp2.sub(t3, t4);
        t4 = Fp2.add(X1, Z1);
        let t5 = Fp2.add(X2, Z2);
        t4 = Fp2.mul(t4, t5);
        t5 = Fp2.add(t0, t2);
        t4 = Fp2.sub(t4, t5);
        t5 = Fp2.add(Y1, Z1);
        X3 = Fp2.add(Y2, Z2);
        t5 = Fp2.mul(t5, X3);
        X3 = Fp2.add(t1, t2);
        t5 = Fp2.sub(t5, X3);
        Z3 = Fp2.mul(a, t4);
        X3 = Fp2.mul(b3, t2);
        Z3 = Fp2.add(X3, Z3);
        X3 = Fp2.sub(t1, Z3);
        Z3 = Fp2.add(t1, Z3);
        Y3 = Fp2.mul(X3, Z3);
        t1 = Fp2.add(t0, t0);
        t1 = Fp2.add(t1, t0);
        t2 = Fp2.mul(a, t2);
        t4 = Fp2.mul(b3, t4);
        t1 = Fp2.add(t1, t2);
        t2 = Fp2.sub(t0, t2);
        t2 = Fp2.mul(a, t2);
        t4 = Fp2.add(t4, t2);
        t0 = Fp2.mul(t1, t4);
        Y3 = Fp2.add(Y3, t0);
        t0 = Fp2.mul(t5, t4);
        X3 = Fp2.mul(t3, X3);
        X3 = Fp2.sub(X3, t0);
        t0 = Fp2.mul(t3, t1);
        Z3 = Fp2.mul(t5, Z3);
        Z3 = Fp2.add(Z3, t0);
        return new Point2(X3, Y3, Z3);
      }
      subtract(other) {
        return this.add(other.negate());
      }
      is0() {
        return this.equals(Point2.ZERO);
      }
      wNAF(n) {
        return wnaf.wNAFCached(this, n, Point2.normalizeZ);
      }
      /**
       * Non-constant-time multiplication. Uses double-and-add algorithm.
       * It's faster, but should only be used when you don't care about
       * an exposed private key e.g. sig verification, which works over *public* keys.
       */
      multiplyUnsafe(sc) {
        aInRange("scalar", sc, _0n4, CURVE.n);
        const I = Point2.ZERO;
        if (sc === _0n4)
          return I;
        if (sc === _1n4)
          return this;
        const { endo } = CURVE;
        if (!endo)
          return wnaf.unsafeLadder(this, sc);
        let { k1neg, k1, k2neg, k2 } = endo.splitScalar(sc);
        let k1p = I;
        let k2p = I;
        let d = this;
        while (k1 > _0n4 || k2 > _0n4) {
          if (k1 & _1n4)
            k1p = k1p.add(d);
          if (k2 & _1n4)
            k2p = k2p.add(d);
          d = d.double();
          k1 >>= _1n4;
          k2 >>= _1n4;
        }
        if (k1neg)
          k1p = k1p.negate();
        if (k2neg)
          k2p = k2p.negate();
        k2p = new Point2(Fp2.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
        return k1p.add(k2p);
      }
      /**
       * Constant time multiplication.
       * Uses wNAF method. Windowed method may be 10% faster,
       * but takes 2x longer to generate and consumes 2x memory.
       * Uses precomputes when available.
       * Uses endomorphism for Koblitz curves.
       * @param scalar by which the point would be multiplied
       * @returns New point
       */
      multiply(scalar) {
        const { endo, n: N } = CURVE;
        aInRange("scalar", scalar, _1n4, N);
        let point, fake;
        if (endo) {
          const { k1neg, k1, k2neg, k2 } = endo.splitScalar(scalar);
          let { p: k1p, f: f1p } = this.wNAF(k1);
          let { p: k2p, f: f2p } = this.wNAF(k2);
          k1p = wnaf.constTimeNegate(k1neg, k1p);
          k2p = wnaf.constTimeNegate(k2neg, k2p);
          k2p = new Point2(Fp2.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
          point = k1p.add(k2p);
          fake = f1p.add(f2p);
        } else {
          const { p, f } = this.wNAF(scalar);
          point = p;
          fake = f;
        }
        return Point2.normalizeZ([point, fake])[0];
      }
      /**
       * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
       * Not using Strauss-Shamir trick: precomputation tables are faster.
       * The trick could be useful if both P and Q are not G (not in our case).
       * @returns non-zero affine point
       */
      multiplyAndAddUnsafe(Q, a, b) {
        const G = Point2.BASE;
        const mul = (P, a2) => a2 === _0n4 || a2 === _1n4 || !P.equals(G) ? P.multiplyUnsafe(a2) : P.multiply(a2);
        const sum = mul(this, a).add(mul(Q, b));
        return sum.is0() ? void 0 : sum;
      }
      // Converts Projective point to affine (x, y) coordinates.
      // Can accept precomputed Z^-1 - for example, from invertBatch.
      // (x, y, z) ∋ (x=x/z, y=y/z)
      toAffine(iz) {
        return toAffineMemo(this, iz);
      }
      isTorsionFree() {
        const { h: cofactor, isTorsionFree } = CURVE;
        if (cofactor === _1n4)
          return true;
        if (isTorsionFree)
          return isTorsionFree(Point2, this);
        throw new Error("isTorsionFree() has not been declared for the elliptic curve");
      }
      clearCofactor() {
        const { h: cofactor, clearCofactor } = CURVE;
        if (cofactor === _1n4)
          return this;
        if (clearCofactor)
          return clearCofactor(Point2, this);
        return this.multiplyUnsafe(CURVE.h);
      }
      toRawBytes(isCompressed = true) {
        abool("isCompressed", isCompressed);
        this.assertValidity();
        return toBytes3(Point2, this, isCompressed);
      }
      toHex(isCompressed = true) {
        abool("isCompressed", isCompressed);
        return bytesToHex(this.toRawBytes(isCompressed));
      }
    }
    Point2.BASE = new Point2(CURVE.Gx, CURVE.Gy, Fp2.ONE);
    Point2.ZERO = new Point2(Fp2.ZERO, Fp2.ONE, Fp2.ZERO);
    const _bits = CURVE.nBitLength;
    const wnaf = wNAF(Point2, CURVE.endo ? Math.ceil(_bits / 2) : _bits);
    return {
      CURVE,
      ProjectivePoint: Point2,
      normPrivateKeyToScalar,
      weierstrassEquation,
      isWithinCurveOrder
    };
  }
  function validateOpts(curve) {
    const opts = validateBasic(curve);
    validateObject(opts, {
      hash: "hash",
      hmac: "function",
      randomBytes: "function"
    }, {
      bits2int: "function",
      bits2int_modN: "function",
      lowS: "boolean"
    });
    return Object.freeze({ lowS: true, ...opts });
  }
  function weierstrass(curveDef) {
    const CURVE = validateOpts(curveDef);
    const { Fp: Fp2, n: CURVE_ORDER } = CURVE;
    const compressedLen = Fp2.BYTES + 1;
    const uncompressedLen = 2 * Fp2.BYTES + 1;
    function modN2(a) {
      return mod(a, CURVE_ORDER);
    }
    function invN(a) {
      return invert(a, CURVE_ORDER);
    }
    const { ProjectivePoint: Point2, normPrivateKeyToScalar, weierstrassEquation, isWithinCurveOrder } = weierstrassPoints({
      ...CURVE,
      toBytes(_c, point, isCompressed) {
        const a = point.toAffine();
        const x = Fp2.toBytes(a.x);
        const cat = concatBytes2;
        abool("isCompressed", isCompressed);
        if (isCompressed) {
          return cat(Uint8Array.from([point.hasEvenY() ? 2 : 3]), x);
        } else {
          return cat(Uint8Array.from([4]), x, Fp2.toBytes(a.y));
        }
      },
      fromBytes(bytes2) {
        const len = bytes2.length;
        const head = bytes2[0];
        const tail = bytes2.subarray(1);
        if (len === compressedLen && (head === 2 || head === 3)) {
          const x = bytesToNumberBE(tail);
          if (!inRange(x, _1n4, Fp2.ORDER))
            throw new Error("Point is not on curve");
          const y2 = weierstrassEquation(x);
          let y;
          try {
            y = Fp2.sqrt(y2);
          } catch (sqrtError) {
            const suffix = sqrtError instanceof Error ? ": " + sqrtError.message : "";
            throw new Error("Point is not on curve" + suffix);
          }
          const isYOdd = (y & _1n4) === _1n4;
          const isHeadOdd = (head & 1) === 1;
          if (isHeadOdd !== isYOdd)
            y = Fp2.neg(y);
          return { x, y };
        } else if (len === uncompressedLen && head === 4) {
          const x = Fp2.fromBytes(tail.subarray(0, Fp2.BYTES));
          const y = Fp2.fromBytes(tail.subarray(Fp2.BYTES, 2 * Fp2.BYTES));
          return { x, y };
        } else {
          throw new Error(`Point of length ${len} was invalid. Expected ${compressedLen} compressed bytes or ${uncompressedLen} uncompressed bytes`);
        }
      }
    });
    const numToNByteStr = (num2) => bytesToHex(numberToBytesBE(num2, CURVE.nByteLength));
    function isBiggerThanHalfOrder(number2) {
      const HALF = CURVE_ORDER >> _1n4;
      return number2 > HALF;
    }
    function normalizeS(s) {
      return isBiggerThanHalfOrder(s) ? modN2(-s) : s;
    }
    const slcNum = (b, from, to) => bytesToNumberBE(b.slice(from, to));
    class Signature {
      constructor(r, s, recovery) {
        this.r = r;
        this.s = s;
        this.recovery = recovery;
        this.assertValidity();
      }
      // pair (bytes of r, bytes of s)
      static fromCompact(hex) {
        const l = CURVE.nByteLength;
        hex = ensureBytes("compactSignature", hex, l * 2);
        return new Signature(slcNum(hex, 0, l), slcNum(hex, l, 2 * l));
      }
      // DER encoded ECDSA signature
      // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
      static fromDER(hex) {
        const { r, s } = DER.toSig(ensureBytes("DER", hex));
        return new Signature(r, s);
      }
      assertValidity() {
        aInRange("r", this.r, _1n4, CURVE_ORDER);
        aInRange("s", this.s, _1n4, CURVE_ORDER);
      }
      addRecoveryBit(recovery) {
        return new Signature(this.r, this.s, recovery);
      }
      recoverPublicKey(msgHash) {
        const { r, s, recovery: rec } = this;
        const h = bits2int_modN(ensureBytes("msgHash", msgHash));
        if (rec == null || ![0, 1, 2, 3].includes(rec))
          throw new Error("recovery id invalid");
        const radj = rec === 2 || rec === 3 ? r + CURVE.n : r;
        if (radj >= Fp2.ORDER)
          throw new Error("recovery id 2 or 3 invalid");
        const prefix = (rec & 1) === 0 ? "02" : "03";
        const R = Point2.fromHex(prefix + numToNByteStr(radj));
        const ir = invN(radj);
        const u1 = modN2(-h * ir);
        const u2 = modN2(s * ir);
        const Q = Point2.BASE.multiplyAndAddUnsafe(R, u1, u2);
        if (!Q)
          throw new Error("point at infinify");
        Q.assertValidity();
        return Q;
      }
      // Signatures should be low-s, to prevent malleability.
      hasHighS() {
        return isBiggerThanHalfOrder(this.s);
      }
      normalizeS() {
        return this.hasHighS() ? new Signature(this.r, modN2(-this.s), this.recovery) : this;
      }
      // DER-encoded
      toDERRawBytes() {
        return hexToBytes(this.toDERHex());
      }
      toDERHex() {
        return DER.hexFromSig({ r: this.r, s: this.s });
      }
      // padded bytes of r, then padded bytes of s
      toCompactRawBytes() {
        return hexToBytes(this.toCompactHex());
      }
      toCompactHex() {
        return numToNByteStr(this.r) + numToNByteStr(this.s);
      }
    }
    const utils = {
      isValidPrivateKey(privateKey) {
        try {
          normPrivateKeyToScalar(privateKey);
          return true;
        } catch (error) {
          return false;
        }
      },
      normPrivateKeyToScalar,
      /**
       * Produces cryptographically secure private key from random of size
       * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
       */
      randomPrivateKey: () => {
        const length = getMinHashLength(CURVE.n);
        return mapHashToField(CURVE.randomBytes(length), CURVE.n);
      },
      /**
       * Creates precompute table for an arbitrary EC point. Makes point "cached".
       * Allows to massively speed-up `point.multiply(scalar)`.
       * @returns cached point
       * @example
       * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
       * fast.multiply(privKey); // much faster ECDH now
       */
      precompute(windowSize = 8, point = Point2.BASE) {
        point._setWindowSize(windowSize);
        point.multiply(BigInt(3));
        return point;
      }
    };
    function getPublicKey(privateKey, isCompressed = true) {
      return Point2.fromPrivateKey(privateKey).toRawBytes(isCompressed);
    }
    function isProbPub(item) {
      const arr = isBytes2(item);
      const str = typeof item === "string";
      const len = (arr || str) && item.length;
      if (arr)
        return len === compressedLen || len === uncompressedLen;
      if (str)
        return len === 2 * compressedLen || len === 2 * uncompressedLen;
      if (item instanceof Point2)
        return true;
      return false;
    }
    function getSharedSecret(privateA, publicB, isCompressed = true) {
      if (isProbPub(privateA))
        throw new Error("first arg must be private key");
      if (!isProbPub(publicB))
        throw new Error("second arg must be public key");
      const b = Point2.fromHex(publicB);
      return b.multiply(normPrivateKeyToScalar(privateA)).toRawBytes(isCompressed);
    }
    const bits2int = CURVE.bits2int || function(bytes2) {
      const num2 = bytesToNumberBE(bytes2);
      const delta = bytes2.length * 8 - CURVE.nBitLength;
      return delta > 0 ? num2 >> BigInt(delta) : num2;
    };
    const bits2int_modN = CURVE.bits2int_modN || function(bytes2) {
      return modN2(bits2int(bytes2));
    };
    const ORDER_MASK = bitMask(CURVE.nBitLength);
    function int2octets(num2) {
      aInRange(`num < 2^${CURVE.nBitLength}`, num2, _0n4, ORDER_MASK);
      return numberToBytesBE(num2, CURVE.nByteLength);
    }
    function prepSig(msgHash, privateKey, opts = defaultSigOpts) {
      if (["recovered", "canonical"].some((k) => k in opts))
        throw new Error("sign() legacy options not supported");
      const { hash: hash3, randomBytes: randomBytes2 } = CURVE;
      let { lowS, prehash, extraEntropy: ent } = opts;
      if (lowS == null)
        lowS = true;
      msgHash = ensureBytes("msgHash", msgHash);
      validateSigVerOpts(opts);
      if (prehash)
        msgHash = ensureBytes("prehashed msgHash", hash3(msgHash));
      const h1int = bits2int_modN(msgHash);
      const d = normPrivateKeyToScalar(privateKey);
      const seedArgs = [int2octets(d), int2octets(h1int)];
      if (ent != null && ent !== false) {
        const e = ent === true ? randomBytes2(Fp2.BYTES) : ent;
        seedArgs.push(ensureBytes("extraEntropy", e));
      }
      const seed = concatBytes2(...seedArgs);
      const m = h1int;
      function k2sig(kBytes) {
        const k = bits2int(kBytes);
        if (!isWithinCurveOrder(k))
          return;
        const ik = invN(k);
        const q = Point2.BASE.multiply(k).toAffine();
        const r = modN2(q.x);
        if (r === _0n4)
          return;
        const s = modN2(ik * modN2(m + r * d));
        if (s === _0n4)
          return;
        let recovery = (q.x === r ? 0 : 2) | Number(q.y & _1n4);
        let normS = s;
        if (lowS && isBiggerThanHalfOrder(s)) {
          normS = normalizeS(s);
          recovery ^= 1;
        }
        return new Signature(r, normS, recovery);
      }
      return { seed, k2sig };
    }
    const defaultSigOpts = { lowS: CURVE.lowS, prehash: false };
    const defaultVerOpts = { lowS: CURVE.lowS, prehash: false };
    function sign2(msgHash, privKey, opts = defaultSigOpts) {
      const { seed, k2sig } = prepSig(msgHash, privKey, opts);
      const C = CURVE;
      const drbg = createHmacDrbg(C.hash.outputLen, C.nByteLength, C.hmac);
      return drbg(seed, k2sig);
    }
    Point2.BASE._setWindowSize(8);
    function verify(signature, msgHash, publicKey, opts = defaultVerOpts) {
      const sg = signature;
      msgHash = ensureBytes("msgHash", msgHash);
      publicKey = ensureBytes("publicKey", publicKey);
      if ("strict" in opts)
        throw new Error("options.strict was renamed to lowS");
      validateSigVerOpts(opts);
      const { lowS, prehash } = opts;
      let _sig = void 0;
      let P;
      try {
        if (typeof sg === "string" || isBytes2(sg)) {
          try {
            _sig = Signature.fromDER(sg);
          } catch (derError) {
            if (!(derError instanceof DER.Err))
              throw derError;
            _sig = Signature.fromCompact(sg);
          }
        } else if (typeof sg === "object" && typeof sg.r === "bigint" && typeof sg.s === "bigint") {
          const { r: r2, s: s2 } = sg;
          _sig = new Signature(r2, s2);
        } else {
          throw new Error("PARSE");
        }
        P = Point2.fromHex(publicKey);
      } catch (error) {
        if (error.message === "PARSE")
          throw new Error(`signature must be Signature instance, Uint8Array or hex string`);
        return false;
      }
      if (lowS && _sig.hasHighS())
        return false;
      if (prehash)
        msgHash = CURVE.hash(msgHash);
      const { r, s } = _sig;
      const h = bits2int_modN(msgHash);
      const is = invN(s);
      const u1 = modN2(h * is);
      const u2 = modN2(r * is);
      const R = Point2.BASE.multiplyAndAddUnsafe(P, u1, u2)?.toAffine();
      if (!R)
        return false;
      const v = modN2(R.x);
      return v === r;
    }
    return {
      CURVE,
      getPublicKey,
      getSharedSecret,
      sign: sign2,
      verify,
      ProjectivePoint: Point2,
      Signature,
      utils
    };
  }
  function SWUFpSqrtRatio(Fp2, Z) {
    const q = Fp2.ORDER;
    let l = _0n4;
    for (let o = q - _1n4; o % _2n3 === _0n4; o /= _2n3)
      l += _1n4;
    const c1 = l;
    const _2n_pow_c1_1 = _2n3 << c1 - _1n4 - _1n4;
    const _2n_pow_c1 = _2n_pow_c1_1 * _2n3;
    const c2 = (q - _1n4) / _2n_pow_c1;
    const c3 = (c2 - _1n4) / _2n3;
    const c4 = _2n_pow_c1 - _1n4;
    const c5 = _2n_pow_c1_1;
    const c6 = Fp2.pow(Z, c2);
    const c7 = Fp2.pow(Z, (c2 + _1n4) / _2n3);
    let sqrtRatio = (u, v) => {
      let tv1 = c6;
      let tv2 = Fp2.pow(v, c4);
      let tv3 = Fp2.sqr(tv2);
      tv3 = Fp2.mul(tv3, v);
      let tv5 = Fp2.mul(u, tv3);
      tv5 = Fp2.pow(tv5, c3);
      tv5 = Fp2.mul(tv5, tv2);
      tv2 = Fp2.mul(tv5, v);
      tv3 = Fp2.mul(tv5, u);
      let tv4 = Fp2.mul(tv3, tv2);
      tv5 = Fp2.pow(tv4, c5);
      let isQR = Fp2.eql(tv5, Fp2.ONE);
      tv2 = Fp2.mul(tv3, c7);
      tv5 = Fp2.mul(tv4, tv1);
      tv3 = Fp2.cmov(tv2, tv3, isQR);
      tv4 = Fp2.cmov(tv5, tv4, isQR);
      for (let i = c1; i > _1n4; i--) {
        let tv52 = i - _2n3;
        tv52 = _2n3 << tv52 - _1n4;
        let tvv5 = Fp2.pow(tv4, tv52);
        const e1 = Fp2.eql(tvv5, Fp2.ONE);
        tv2 = Fp2.mul(tv3, tv1);
        tv1 = Fp2.mul(tv1, tv1);
        tvv5 = Fp2.mul(tv4, tv1);
        tv3 = Fp2.cmov(tv2, tv3, e1);
        tv4 = Fp2.cmov(tvv5, tv4, e1);
      }
      return { isValid: isQR, value: tv3 };
    };
    if (Fp2.ORDER % _4n2 === _3n2) {
      const c12 = (Fp2.ORDER - _3n2) / _4n2;
      const c22 = Fp2.sqrt(Fp2.neg(Z));
      sqrtRatio = (u, v) => {
        let tv1 = Fp2.sqr(v);
        const tv2 = Fp2.mul(u, v);
        tv1 = Fp2.mul(tv1, tv2);
        let y1 = Fp2.pow(tv1, c12);
        y1 = Fp2.mul(y1, tv2);
        const y2 = Fp2.mul(y1, c22);
        const tv3 = Fp2.mul(Fp2.sqr(y1), v);
        const isQR = Fp2.eql(tv3, u);
        let y = Fp2.cmov(y2, y1, isQR);
        return { isValid: isQR, value: y };
      };
    }
    return sqrtRatio;
  }
  function mapToCurveSimpleSWU(Fp2, opts) {
    validateField(Fp2);
    if (!Fp2.isValid(opts.A) || !Fp2.isValid(opts.B) || !Fp2.isValid(opts.Z))
      throw new Error("mapToCurveSimpleSWU: invalid opts");
    const sqrtRatio = SWUFpSqrtRatio(Fp2, opts.Z);
    if (!Fp2.isOdd)
      throw new Error("Fp.isOdd is not implemented!");
    return (u) => {
      let tv1, tv2, tv3, tv4, tv5, tv6, x, y;
      tv1 = Fp2.sqr(u);
      tv1 = Fp2.mul(tv1, opts.Z);
      tv2 = Fp2.sqr(tv1);
      tv2 = Fp2.add(tv2, tv1);
      tv3 = Fp2.add(tv2, Fp2.ONE);
      tv3 = Fp2.mul(tv3, opts.B);
      tv4 = Fp2.cmov(opts.Z, Fp2.neg(tv2), !Fp2.eql(tv2, Fp2.ZERO));
      tv4 = Fp2.mul(tv4, opts.A);
      tv2 = Fp2.sqr(tv3);
      tv6 = Fp2.sqr(tv4);
      tv5 = Fp2.mul(tv6, opts.A);
      tv2 = Fp2.add(tv2, tv5);
      tv2 = Fp2.mul(tv2, tv3);
      tv6 = Fp2.mul(tv6, tv4);
      tv5 = Fp2.mul(tv6, opts.B);
      tv2 = Fp2.add(tv2, tv5);
      x = Fp2.mul(tv1, tv3);
      const { isValid, value } = sqrtRatio(tv2, tv6);
      y = Fp2.mul(tv1, u);
      y = Fp2.mul(y, value);
      x = Fp2.cmov(x, tv3, isValid);
      y = Fp2.cmov(y, value, isValid);
      const e1 = Fp2.isOdd(u) === Fp2.isOdd(y);
      y = Fp2.cmov(Fp2.neg(y), y, e1);
      x = Fp2.div(x, tv4);
      return { x, y };
    };
  }
  var b2n, h2b, DER, _0n4, _1n4, _2n3, _3n2, _4n2;
  var init_weierstrass = __esm({
    "node_modules/@noble/curves/esm/abstract/weierstrass.js"() {
      "use strict";
      init_curve();
      init_modular();
      init_utils2();
      init_utils2();
      ({ bytesToNumberBE: b2n, hexToBytes: h2b } = utils_exports);
      DER = {
        // asn.1 DER encoding utils
        Err: class DERErr extends Error {
          constructor(m = "") {
            super(m);
          }
        },
        // Basic building block is TLV (Tag-Length-Value)
        _tlv: {
          encode: (tag, data) => {
            const { Err: E } = DER;
            if (tag < 0 || tag > 256)
              throw new E("tlv.encode: wrong tag");
            if (data.length & 1)
              throw new E("tlv.encode: unpadded data");
            const dataLen = data.length / 2;
            const len = numberToHexUnpadded(dataLen);
            if (len.length / 2 & 128)
              throw new E("tlv.encode: long form length too big");
            const lenLen = dataLen > 127 ? numberToHexUnpadded(len.length / 2 | 128) : "";
            return `${numberToHexUnpadded(tag)}${lenLen}${len}${data}`;
          },
          // v - value, l - left bytes (unparsed)
          decode(tag, data) {
            const { Err: E } = DER;
            let pos = 0;
            if (tag < 0 || tag > 256)
              throw new E("tlv.encode: wrong tag");
            if (data.length < 2 || data[pos++] !== tag)
              throw new E("tlv.decode: wrong tlv");
            const first = data[pos++];
            const isLong = !!(first & 128);
            let length = 0;
            if (!isLong)
              length = first;
            else {
              const lenLen = first & 127;
              if (!lenLen)
                throw new E("tlv.decode(long): indefinite length not supported");
              if (lenLen > 4)
                throw new E("tlv.decode(long): byte length is too big");
              const lengthBytes = data.subarray(pos, pos + lenLen);
              if (lengthBytes.length !== lenLen)
                throw new E("tlv.decode: length bytes not complete");
              if (lengthBytes[0] === 0)
                throw new E("tlv.decode(long): zero leftmost byte");
              for (const b of lengthBytes)
                length = length << 8 | b;
              pos += lenLen;
              if (length < 128)
                throw new E("tlv.decode(long): not minimal encoding");
            }
            const v = data.subarray(pos, pos + length);
            if (v.length !== length)
              throw new E("tlv.decode: wrong value length");
            return { v, l: data.subarray(pos + length) };
          }
        },
        // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
        // since we always use positive integers here. It must always be empty:
        // - add zero byte if exists
        // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
        _int: {
          encode(num2) {
            const { Err: E } = DER;
            if (num2 < _0n4)
              throw new E("integer: negative integers are not allowed");
            let hex = numberToHexUnpadded(num2);
            if (Number.parseInt(hex[0], 16) & 8)
              hex = "00" + hex;
            if (hex.length & 1)
              throw new E("unexpected assertion");
            return hex;
          },
          decode(data) {
            const { Err: E } = DER;
            if (data[0] & 128)
              throw new E("Invalid signature integer: negative");
            if (data[0] === 0 && !(data[1] & 128))
              throw new E("Invalid signature integer: unnecessary leading zero");
            return b2n(data);
          }
        },
        toSig(hex) {
          const { Err: E, _int: int, _tlv: tlv } = DER;
          const data = typeof hex === "string" ? h2b(hex) : hex;
          abytes(data);
          const { v: seqBytes, l: seqLeftBytes } = tlv.decode(48, data);
          if (seqLeftBytes.length)
            throw new E("Invalid signature: left bytes after parsing");
          const { v: rBytes, l: rLeftBytes } = tlv.decode(2, seqBytes);
          const { v: sBytes, l: sLeftBytes } = tlv.decode(2, rLeftBytes);
          if (sLeftBytes.length)
            throw new E("Invalid signature: left bytes after parsing");
          return { r: int.decode(rBytes), s: int.decode(sBytes) };
        },
        hexFromSig(sig) {
          const { _tlv: tlv, _int: int } = DER;
          const seq = `${tlv.encode(2, int.encode(sig.r))}${tlv.encode(2, int.encode(sig.s))}`;
          return tlv.encode(48, seq);
        }
      };
      _0n4 = BigInt(0);
      _1n4 = BigInt(1);
      _2n3 = BigInt(2);
      _3n2 = BigInt(3);
      _4n2 = BigInt(4);
    }
  });

  // node_modules/@noble/curves/esm/_shortw_utils.js
  function getHash(hash3) {
    return {
      hash: hash3,
      hmac: (key, ...msgs) => hmac(hash3, key, concatBytes(...msgs)),
      randomBytes
    };
  }
  function createCurve(curveDef, defHash) {
    const create = (hash3) => weierstrass({ ...curveDef, ...getHash(hash3) });
    return Object.freeze({ ...create(defHash), create });
  }
  var init_shortw_utils = __esm({
    "node_modules/@noble/curves/esm/_shortw_utils.js"() {
      "use strict";
      init_hmac();
      init_utils();
      init_weierstrass();
    }
  });

  // node_modules/@noble/curves/esm/abstract/hash-to-curve.js
  function i2osp(value, length) {
    anum(value);
    anum(length);
    if (value < 0 || value >= 1 << 8 * length) {
      throw new Error(`bad I2OSP call: value=${value} length=${length}`);
    }
    const res = Array.from({ length }).fill(0);
    for (let i = length - 1; i >= 0; i--) {
      res[i] = value & 255;
      value >>>= 8;
    }
    return new Uint8Array(res);
  }
  function strxor(a, b) {
    const arr = new Uint8Array(a.length);
    for (let i = 0; i < a.length; i++) {
      arr[i] = a[i] ^ b[i];
    }
    return arr;
  }
  function anum(item) {
    if (!Number.isSafeInteger(item))
      throw new Error("number expected");
  }
  function expand_message_xmd(msg, DST, lenInBytes, H) {
    abytes(msg);
    abytes(DST);
    anum(lenInBytes);
    if (DST.length > 255)
      DST = H(concatBytes2(utf8ToBytes2("H2C-OVERSIZE-DST-"), DST));
    const { outputLen: b_in_bytes, blockLen: r_in_bytes } = H;
    const ell = Math.ceil(lenInBytes / b_in_bytes);
    if (lenInBytes > 65535 || ell > 255)
      throw new Error("expand_message_xmd: invalid lenInBytes");
    const DST_prime = concatBytes2(DST, i2osp(DST.length, 1));
    const Z_pad = i2osp(0, r_in_bytes);
    const l_i_b_str = i2osp(lenInBytes, 2);
    const b = new Array(ell);
    const b_0 = H(concatBytes2(Z_pad, msg, l_i_b_str, i2osp(0, 1), DST_prime));
    b[0] = H(concatBytes2(b_0, i2osp(1, 1), DST_prime));
    for (let i = 1; i <= ell; i++) {
      const args = [strxor(b_0, b[i - 1]), i2osp(i + 1, 1), DST_prime];
      b[i] = H(concatBytes2(...args));
    }
    const pseudo_random_bytes = concatBytes2(...b);
    return pseudo_random_bytes.slice(0, lenInBytes);
  }
  function expand_message_xof(msg, DST, lenInBytes, k, H) {
    abytes(msg);
    abytes(DST);
    anum(lenInBytes);
    if (DST.length > 255) {
      const dkLen = Math.ceil(2 * k / 8);
      DST = H.create({ dkLen }).update(utf8ToBytes2("H2C-OVERSIZE-DST-")).update(DST).digest();
    }
    if (lenInBytes > 65535 || DST.length > 255)
      throw new Error("expand_message_xof: invalid lenInBytes");
    return H.create({ dkLen: lenInBytes }).update(msg).update(i2osp(lenInBytes, 2)).update(DST).update(i2osp(DST.length, 1)).digest();
  }
  function hash_to_field(msg, count, options) {
    validateObject(options, {
      DST: "stringOrUint8Array",
      p: "bigint",
      m: "isSafeInteger",
      k: "isSafeInteger",
      hash: "hash"
    });
    const { p, k, m, hash: hash3, expand, DST: _DST } = options;
    abytes(msg);
    anum(count);
    const DST = typeof _DST === "string" ? utf8ToBytes2(_DST) : _DST;
    const log2p = p.toString(2).length;
    const L = Math.ceil((log2p + k) / 8);
    const len_in_bytes = count * m * L;
    let prb;
    if (expand === "xmd") {
      prb = expand_message_xmd(msg, DST, len_in_bytes, hash3);
    } else if (expand === "xof") {
      prb = expand_message_xof(msg, DST, len_in_bytes, k, hash3);
    } else if (expand === "_internal_pass") {
      prb = msg;
    } else {
      throw new Error('expand must be "xmd" or "xof"');
    }
    const u = new Array(count);
    for (let i = 0; i < count; i++) {
      const e = new Array(m);
      for (let j = 0; j < m; j++) {
        const elm_offset = L * (j + i * m);
        const tv = prb.subarray(elm_offset, elm_offset + L);
        e[j] = mod(os2ip(tv), p);
      }
      u[i] = e;
    }
    return u;
  }
  function isogenyMap(field, map) {
    const COEFF = map.map((i) => Array.from(i).reverse());
    return (x, y) => {
      const [xNum, xDen, yNum, yDen] = COEFF.map((val) => val.reduce((acc, i) => field.add(field.mul(acc, x), i)));
      x = field.div(xNum, xDen);
      y = field.mul(y, field.div(yNum, yDen));
      return { x, y };
    };
  }
  function createHasher(Point2, mapToCurve, def) {
    if (typeof mapToCurve !== "function")
      throw new Error("mapToCurve() must be defined");
    return {
      // Encodes byte string to elliptic curve.
      // hash_to_curve from https://www.rfc-editor.org/rfc/rfc9380#section-3
      hashToCurve(msg, options) {
        const u = hash_to_field(msg, 2, { ...def, DST: def.DST, ...options });
        const u0 = Point2.fromAffine(mapToCurve(u[0]));
        const u1 = Point2.fromAffine(mapToCurve(u[1]));
        const P = u0.add(u1).clearCofactor();
        P.assertValidity();
        return P;
      },
      // Encodes byte string to elliptic curve.
      // encode_to_curve from https://www.rfc-editor.org/rfc/rfc9380#section-3
      encodeToCurve(msg, options) {
        const u = hash_to_field(msg, 1, { ...def, DST: def.encodeDST, ...options });
        const P = Point2.fromAffine(mapToCurve(u[0])).clearCofactor();
        P.assertValidity();
        return P;
      },
      // Same as encodeToCurve, but without hash
      mapToCurve(scalars) {
        if (!Array.isArray(scalars))
          throw new Error("mapToCurve: expected array of bigints");
        for (const i of scalars)
          if (typeof i !== "bigint")
            throw new Error(`mapToCurve: expected array of bigints, got ${i} in array`);
        const P = Point2.fromAffine(mapToCurve(scalars)).clearCofactor();
        P.assertValidity();
        return P;
      }
    };
  }
  var os2ip;
  var init_hash_to_curve = __esm({
    "node_modules/@noble/curves/esm/abstract/hash-to-curve.js"() {
      "use strict";
      init_modular();
      init_utils2();
      os2ip = bytesToNumberBE;
    }
  });

  // node_modules/@noble/curves/esm/secp256k1.js
  var secp256k1_exports = {};
  __export(secp256k1_exports, {
    encodeToCurve: () => encodeToCurve,
    hashToCurve: () => hashToCurve,
    schnorr: () => schnorr,
    secp256k1: () => secp256k1
  });
  function sqrtMod(y) {
    const P = secp256k1P;
    const _3n3 = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
    const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
    const b2 = y * y * y % P;
    const b3 = b2 * b2 * y % P;
    const b6 = pow2(b3, _3n3, P) * b3 % P;
    const b9 = pow2(b6, _3n3, P) * b3 % P;
    const b11 = pow2(b9, _2n4, P) * b2 % P;
    const b22 = pow2(b11, _11n, P) * b11 % P;
    const b44 = pow2(b22, _22n, P) * b22 % P;
    const b88 = pow2(b44, _44n, P) * b44 % P;
    const b176 = pow2(b88, _88n, P) * b88 % P;
    const b220 = pow2(b176, _44n, P) * b44 % P;
    const b223 = pow2(b220, _3n3, P) * b3 % P;
    const t1 = pow2(b223, _23n, P) * b22 % P;
    const t2 = pow2(t1, _6n, P) * b2 % P;
    const root = pow2(t2, _2n4, P);
    if (!Fp.eql(Fp.sqr(root), y))
      throw new Error("Cannot find square root");
    return root;
  }
  function taggedHash(tag, ...messages) {
    let tagP = TAGGED_HASH_PREFIXES[tag];
    if (tagP === void 0) {
      const tagH = sha256(Uint8Array.from(tag, (c) => c.charCodeAt(0)));
      tagP = concatBytes2(tagH, tagH);
      TAGGED_HASH_PREFIXES[tag] = tagP;
    }
    return sha256(concatBytes2(tagP, ...messages));
  }
  function schnorrGetExtPubKey(priv) {
    let d_ = secp256k1.utils.normPrivateKeyToScalar(priv);
    let p = Point.fromPrivateKey(d_);
    const scalar = p.hasEvenY() ? d_ : modN(-d_);
    return { scalar, bytes: pointToBytes(p) };
  }
  function lift_x(x) {
    aInRange("x", x, _1n5, secp256k1P);
    const xx = modP(x * x);
    const c = modP(xx * x + BigInt(7));
    let y = sqrtMod(c);
    if (y % _2n4 !== _0n5)
      y = modP(-y);
    const p = new Point(x, y, _1n5);
    p.assertValidity();
    return p;
  }
  function challenge(...args) {
    return modN(num(taggedHash("BIP0340/challenge", ...args)));
  }
  function schnorrGetPublicKey(privateKey) {
    return schnorrGetExtPubKey(privateKey).bytes;
  }
  function schnorrSign(message, privateKey, auxRand = randomBytes(32)) {
    const m = ensureBytes("message", message);
    const { bytes: px, scalar: d } = schnorrGetExtPubKey(privateKey);
    const a = ensureBytes("auxRand", auxRand, 32);
    const t = numTo32b(d ^ num(taggedHash("BIP0340/aux", a)));
    const rand = taggedHash("BIP0340/nonce", t, px, m);
    const k_ = modN(num(rand));
    if (k_ === _0n5)
      throw new Error("sign failed: k is zero");
    const { bytes: rx, scalar: k } = schnorrGetExtPubKey(k_);
    const e = challenge(rx, px, m);
    const sig = new Uint8Array(64);
    sig.set(rx, 0);
    sig.set(numTo32b(modN(k + e * d)), 32);
    if (!schnorrVerify(sig, m, px))
      throw new Error("sign: Invalid signature produced");
    return sig;
  }
  function schnorrVerify(signature, message, publicKey) {
    const sig = ensureBytes("signature", signature, 64);
    const m = ensureBytes("message", message);
    const pub = ensureBytes("publicKey", publicKey, 32);
    try {
      const P = lift_x(num(pub));
      const r = num(sig.subarray(0, 32));
      if (!inRange(r, _1n5, secp256k1P))
        return false;
      const s = num(sig.subarray(32, 64));
      if (!inRange(s, _1n5, secp256k1N))
        return false;
      const e = challenge(numTo32b(r), pointToBytes(P), m);
      const R = GmulAdd(P, s, modN(-e));
      if (!R || !R.hasEvenY() || R.toAffine().x !== r)
        return false;
      return true;
    } catch (error) {
      return false;
    }
  }
  var secp256k1P, secp256k1N, _1n5, _2n4, divNearest, Fp, secp256k1, _0n5, TAGGED_HASH_PREFIXES, pointToBytes, numTo32b, modP, modN, Point, GmulAdd, num, schnorr, isoMap, mapSWU, htf, hashToCurve, encodeToCurve;
  var init_secp256k1 = __esm({
    "node_modules/@noble/curves/esm/secp256k1.js"() {
      "use strict";
      init_sha256();
      init_utils();
      init_shortw_utils();
      init_hash_to_curve();
      init_modular();
      init_utils2();
      init_weierstrass();
      secp256k1P = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f");
      secp256k1N = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
      _1n5 = BigInt(1);
      _2n4 = BigInt(2);
      divNearest = (a, b) => (a + b / _2n4) / b;
      Fp = Field(secp256k1P, void 0, void 0, { sqrt: sqrtMod });
      secp256k1 = createCurve({
        a: BigInt(0),
        // equation params: a, b
        b: BigInt(7),
        // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
        Fp,
        // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
        n: secp256k1N,
        // Curve order, total count of valid points in the field
        // Base point (x, y) aka generator point
        Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
        Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
        h: BigInt(1),
        // Cofactor
        lowS: true,
        // Allow only low-S signatures by default in sign() and verify()
        /**
         * secp256k1 belongs to Koblitz curves: it has efficiently computable endomorphism.
         * Endomorphism uses 2x less RAM, speeds up precomputation by 2x and ECDH / key recovery by 20%.
         * For precomputed wNAF it trades off 1/2 init time & 1/3 ram for 20% perf hit.
         * Explanation: https://gist.github.com/paulmillr/eb670806793e84df628a7c434a873066
         */
        endo: {
          beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
          splitScalar: (k) => {
            const n = secp256k1N;
            const a1 = BigInt("0x3086d221a7d46bcde86c90e49284eb15");
            const b1 = -_1n5 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3");
            const a2 = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8");
            const b2 = a1;
            const POW_2_128 = BigInt("0x100000000000000000000000000000000");
            const c1 = divNearest(b2 * k, n);
            const c2 = divNearest(-b1 * k, n);
            let k1 = mod(k - c1 * a1 - c2 * a2, n);
            let k2 = mod(-c1 * b1 - c2 * b2, n);
            const k1neg = k1 > POW_2_128;
            const k2neg = k2 > POW_2_128;
            if (k1neg)
              k1 = n - k1;
            if (k2neg)
              k2 = n - k2;
            if (k1 > POW_2_128 || k2 > POW_2_128) {
              throw new Error("splitScalar: Endomorphism failed, k=" + k);
            }
            return { k1neg, k1, k2neg, k2 };
          }
        }
      }, sha256);
      _0n5 = BigInt(0);
      TAGGED_HASH_PREFIXES = {};
      pointToBytes = (point) => point.toRawBytes(true).slice(1);
      numTo32b = (n) => numberToBytesBE(n, 32);
      modP = (x) => mod(x, secp256k1P);
      modN = (x) => mod(x, secp256k1N);
      Point = secp256k1.ProjectivePoint;
      GmulAdd = (Q, a, b) => Point.BASE.multiplyAndAddUnsafe(Q, a, b);
      num = bytesToNumberBE;
      schnorr = /* @__PURE__ */ (() => ({
        getPublicKey: schnorrGetPublicKey,
        sign: schnorrSign,
        verify: schnorrVerify,
        utils: {
          randomPrivateKey: secp256k1.utils.randomPrivateKey,
          lift_x,
          pointToBytes,
          numberToBytesBE,
          bytesToNumberBE,
          taggedHash,
          mod
        }
      }))();
      isoMap = /* @__PURE__ */ (() => isogenyMap(Fp, [
        // xNum
        [
          "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa8c7",
          "0x7d3d4c80bc321d5b9f315cea7fd44c5d595d2fc0bf63b92dfff1044f17c6581",
          "0x534c328d23f234e6e2a413deca25caece4506144037c40314ecbd0b53d9dd262",
          "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa88c"
        ],
        // xDen
        [
          "0xd35771193d94918a9ca34ccbb7b640dd86cd409542f8487d9fe6b745781eb49b",
          "0xedadc6f64383dc1df7c4b2d51b54225406d36b641f5e41bbc52a56612a8c6d14",
          "0x0000000000000000000000000000000000000000000000000000000000000001"
          // LAST 1
        ],
        // yNum
        [
          "0x4bda12f684bda12f684bda12f684bda12f684bda12f684bda12f684b8e38e23c",
          "0xc75e0c32d5cb7c0fa9d0a54b12a0a6d5647ab046d686da6fdffc90fc201d71a3",
          "0x29a6194691f91a73715209ef6512e576722830a201be2018a765e85a9ecee931",
          "0x2f684bda12f684bda12f684bda12f684bda12f684bda12f684bda12f38e38d84"
        ],
        // yDen
        [
          "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffff93b",
          "0x7a06534bb8bdb49fd5e9e6632722c2989467c1bfc8e8d978dfb425d2685c2573",
          "0x6484aa716545ca2cf3a70c3fa8fe337e0a3d21162f0d6299a7bf8192bfd2a76f",
          "0x0000000000000000000000000000000000000000000000000000000000000001"
          // LAST 1
        ]
      ].map((i) => i.map((j) => BigInt(j)))))();
      mapSWU = /* @__PURE__ */ (() => mapToCurveSimpleSWU(Fp, {
        A: BigInt("0x3f8731abdd661adca08a5558f0f5d272e953d363cb6f0e5d405447c01a444533"),
        B: BigInt("1771"),
        Z: Fp.create(BigInt("-11"))
      }))();
      htf = /* @__PURE__ */ (() => createHasher(secp256k1.ProjectivePoint, (scalars) => {
        const { x, y } = mapSWU(Fp.create(scalars[0]));
        return isoMap(x, y);
      }, {
        DST: "secp256k1_XMD:SHA-256_SSWU_RO_",
        encodeDST: "secp256k1_XMD:SHA-256_SSWU_NU_",
        p: Fp.ORDER,
        m: 1,
        k: 128,
        expand: "xmd",
        hash: sha256
      }))();
      hashToCurve = /* @__PURE__ */ (() => htf.hashToCurve)();
      encodeToCurve = /* @__PURE__ */ (() => htf.encodeToCurve)();
    }
  });

  // node_modules/viem/_esm/errors/version.js
  var version;
  var init_version = __esm({
    "node_modules/viem/_esm/errors/version.js"() {
      "use strict";
      version = "2.21.30";
    }
  });

  // node_modules/viem/_esm/errors/base.js
  function walk(err, fn) {
    if (fn?.(err))
      return err;
    if (err && typeof err === "object" && "cause" in err)
      return walk(err.cause, fn);
    return fn ? null : err;
  }
  var errorConfig, BaseError;
  var init_base = __esm({
    "node_modules/viem/_esm/errors/base.js"() {
      "use strict";
      init_version();
      errorConfig = {
        getDocsUrl: ({ docsBaseUrl, docsPath: docsPath6 = "", docsSlug }) => docsPath6 ? `${docsBaseUrl ?? "https://viem.sh"}${docsPath6}${docsSlug ? `#${docsSlug}` : ""}` : void 0,
        version: `viem@${version}`
      };
      BaseError = class _BaseError extends Error {
        constructor(shortMessage, args = {}) {
          const details = (() => {
            if (args.cause instanceof _BaseError)
              return args.cause.details;
            if (args.cause?.message)
              return args.cause.message;
            return args.details;
          })();
          const docsPath6 = (() => {
            if (args.cause instanceof _BaseError)
              return args.cause.docsPath || args.docsPath;
            return args.docsPath;
          })();
          const docsUrl = errorConfig.getDocsUrl?.({ ...args, docsPath: docsPath6 });
          const message = [
            shortMessage || "An error occurred.",
            "",
            ...args.metaMessages ? [...args.metaMessages, ""] : [],
            ...docsUrl ? [`Docs: ${docsUrl}`] : [],
            ...details ? [`Details: ${details}`] : [],
            ...errorConfig.version ? [`Version: ${errorConfig.version}`] : []
          ].join("\n");
          super(message, args.cause ? { cause: args.cause } : void 0);
          Object.defineProperty(this, "details", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "docsPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "metaMessages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "shortMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "version", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "BaseError"
          });
          this.details = details;
          this.docsPath = docsPath6;
          this.metaMessages = args.metaMessages;
          this.name = args.name ?? this.name;
          this.shortMessage = shortMessage;
          this.version = version;
        }
        walk(fn) {
          return walk(this, fn);
        }
      };
    }
  });

  // node_modules/viem/_esm/errors/encoding.js
  var IntegerOutOfRangeError, InvalidBytesBooleanError, InvalidHexBooleanError, SizeOverflowError;
  var init_encoding = __esm({
    "node_modules/viem/_esm/errors/encoding.js"() {
      "use strict";
      init_base();
      IntegerOutOfRangeError = class extends BaseError {
        constructor({ max, min, signed, size: size3, value }) {
          super(`Number "${value}" is not in safe ${size3 ? `${size3 * 8}-bit ${signed ? "signed" : "unsigned"} ` : ""}integer range ${max ? `(${min} to ${max})` : `(above ${min})`}`, { name: "IntegerOutOfRangeError" });
        }
      };
      InvalidBytesBooleanError = class extends BaseError {
        constructor(bytes2) {
          super(`Bytes value "${bytes2}" is not a valid boolean. The bytes array must contain a single byte of either a 0 or 1 value.`, {
            name: "InvalidBytesBooleanError"
          });
        }
      };
      InvalidHexBooleanError = class extends BaseError {
        constructor(hex) {
          super(`Hex value "${hex}" is not a valid boolean. The hex value must be "0x0" (false) or "0x1" (true).`, { name: "InvalidHexBooleanError" });
        }
      };
      SizeOverflowError = class extends BaseError {
        constructor({ givenSize, maxSize }) {
          super(`Size cannot exceed ${maxSize} bytes. Given size: ${givenSize} bytes.`, { name: "SizeOverflowError" });
        }
      };
    }
  });

  // node_modules/viem/_esm/errors/data.js
  var SliceOffsetOutOfBoundsError, SizeExceedsPaddingSizeError, InvalidBytesLengthError;
  var init_data = __esm({
    "node_modules/viem/_esm/errors/data.js"() {
      "use strict";
      init_base();
      SliceOffsetOutOfBoundsError = class extends BaseError {
        constructor({ offset, position, size: size3 }) {
          super(`Slice ${position === "start" ? "starting" : "ending"} at offset "${offset}" is out-of-bounds (size: ${size3}).`, { name: "SliceOffsetOutOfBoundsError" });
        }
      };
      SizeExceedsPaddingSizeError = class extends BaseError {
        constructor({ size: size3, targetSize, type }) {
          super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (${size3}) exceeds padding size (${targetSize}).`, { name: "SizeExceedsPaddingSizeError" });
        }
      };
      InvalidBytesLengthError = class extends BaseError {
        constructor({ size: size3, targetSize, type }) {
          super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} is expected to be ${targetSize} ${type} long, but is ${size3} ${type} long.`, { name: "InvalidBytesLengthError" });
        }
      };
    }
  });

  // node_modules/viem/_esm/utils/data/pad.js
  function pad(hexOrBytes, { dir, size: size3 = 32 } = {}) {
    if (typeof hexOrBytes === "string")
      return padHex(hexOrBytes, { dir, size: size3 });
    return padBytes(hexOrBytes, { dir, size: size3 });
  }
  function padHex(hex_, { dir, size: size3 = 32 } = {}) {
    if (size3 === null)
      return hex_;
    const hex = hex_.replace("0x", "");
    if (hex.length > size3 * 2)
      throw new SizeExceedsPaddingSizeError({
        size: Math.ceil(hex.length / 2),
        targetSize: size3,
        type: "hex"
      });
    return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size3 * 2, "0")}`;
  }
  function padBytes(bytes2, { dir, size: size3 = 32 } = {}) {
    if (size3 === null)
      return bytes2;
    if (bytes2.length > size3)
      throw new SizeExceedsPaddingSizeError({
        size: bytes2.length,
        targetSize: size3,
        type: "bytes"
      });
    const paddedBytes = new Uint8Array(size3);
    for (let i = 0; i < size3; i++) {
      const padEnd = dir === "right";
      paddedBytes[padEnd ? i : size3 - i - 1] = bytes2[padEnd ? i : bytes2.length - i - 1];
    }
    return paddedBytes;
  }
  var init_pad = __esm({
    "node_modules/viem/_esm/utils/data/pad.js"() {
      "use strict";
      init_data();
    }
  });

  // node_modules/viem/_esm/utils/data/isHex.js
  function isHex(value, { strict = true } = {}) {
    if (!value)
      return false;
    if (typeof value !== "string")
      return false;
    return strict ? /^0x[0-9a-fA-F]*$/.test(value) : value.startsWith("0x");
  }
  var init_isHex = __esm({
    "node_modules/viem/_esm/utils/data/isHex.js"() {
      "use strict";
    }
  });

  // node_modules/viem/_esm/utils/data/size.js
  function size(value) {
    if (isHex(value, { strict: false }))
      return Math.ceil((value.length - 2) / 2);
    return value.length;
  }
  var init_size = __esm({
    "node_modules/viem/_esm/utils/data/size.js"() {
      "use strict";
      init_isHex();
    }
  });

  // node_modules/viem/_esm/utils/data/trim.js
  function trim(hexOrBytes, { dir = "left" } = {}) {
    let data = typeof hexOrBytes === "string" ? hexOrBytes.replace("0x", "") : hexOrBytes;
    let sliceLength = 0;
    for (let i = 0; i < data.length - 1; i++) {
      if (data[dir === "left" ? i : data.length - i - 1].toString() === "0")
        sliceLength++;
      else
        break;
    }
    data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
    if (typeof hexOrBytes === "string") {
      if (data.length === 1 && dir === "right")
        data = `${data}0`;
      return `0x${data.length % 2 === 1 ? `0${data}` : data}`;
    }
    return data;
  }
  var init_trim = __esm({
    "node_modules/viem/_esm/utils/data/trim.js"() {
      "use strict";
    }
  });

  // node_modules/viem/_esm/utils/encoding/toBytes.js
  function toBytes2(value, opts = {}) {
    if (typeof value === "number" || typeof value === "bigint")
      return numberToBytes(value, opts);
    if (typeof value === "boolean")
      return boolToBytes(value, opts);
    if (isHex(value))
      return hexToBytes2(value, opts);
    return stringToBytes(value, opts);
  }
  function boolToBytes(value, opts = {}) {
    const bytes2 = new Uint8Array(1);
    bytes2[0] = Number(value);
    if (typeof opts.size === "number") {
      assertSize(bytes2, { size: opts.size });
      return pad(bytes2, { size: opts.size });
    }
    return bytes2;
  }
  function charCodeToBase16(char) {
    if (char >= charCodeMap.zero && char <= charCodeMap.nine)
      return char - charCodeMap.zero;
    if (char >= charCodeMap.A && char <= charCodeMap.F)
      return char - (charCodeMap.A - 10);
    if (char >= charCodeMap.a && char <= charCodeMap.f)
      return char - (charCodeMap.a - 10);
    return void 0;
  }
  function hexToBytes2(hex_, opts = {}) {
    let hex = hex_;
    if (opts.size) {
      assertSize(hex, { size: opts.size });
      hex = pad(hex, { dir: "right", size: opts.size });
    }
    let hexString = hex.slice(2);
    if (hexString.length % 2)
      hexString = `0${hexString}`;
    const length = hexString.length / 2;
    const bytes2 = new Uint8Array(length);
    for (let index2 = 0, j = 0; index2 < length; index2++) {
      const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j++));
      const nibbleRight = charCodeToBase16(hexString.charCodeAt(j++));
      if (nibbleLeft === void 0 || nibbleRight === void 0) {
        throw new BaseError(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
      }
      bytes2[index2] = nibbleLeft * 16 + nibbleRight;
    }
    return bytes2;
  }
  function numberToBytes(value, opts) {
    const hex = numberToHex(value, opts);
    return hexToBytes2(hex);
  }
  function stringToBytes(value, opts = {}) {
    const bytes2 = encoder.encode(value);
    if (typeof opts.size === "number") {
      assertSize(bytes2, { size: opts.size });
      return pad(bytes2, { dir: "right", size: opts.size });
    }
    return bytes2;
  }
  var encoder, charCodeMap;
  var init_toBytes = __esm({
    "node_modules/viem/_esm/utils/encoding/toBytes.js"() {
      "use strict";
      init_base();
      init_isHex();
      init_pad();
      init_fromHex();
      init_toHex();
      encoder = /* @__PURE__ */ new TextEncoder();
      charCodeMap = {
        zero: 48,
        nine: 57,
        A: 65,
        F: 70,
        a: 97,
        f: 102
      };
    }
  });

  // node_modules/viem/_esm/utils/encoding/fromHex.js
  function assertSize(hexOrBytes, { size: size3 }) {
    if (size(hexOrBytes) > size3)
      throw new SizeOverflowError({
        givenSize: size(hexOrBytes),
        maxSize: size3
      });
  }
  function hexToBigInt(hex, opts = {}) {
    const { signed } = opts;
    if (opts.size)
      assertSize(hex, { size: opts.size });
    const value = BigInt(hex);
    if (!signed)
      return value;
    const size3 = (hex.length - 2) / 2;
    const max = (1n << BigInt(size3) * 8n - 1n) - 1n;
    if (value <= max)
      return value;
    return value - BigInt(`0x${"f".padStart(size3 * 2, "f")}`) - 1n;
  }
  function hexToBool(hex_, opts = {}) {
    let hex = hex_;
    if (opts.size) {
      assertSize(hex, { size: opts.size });
      hex = trim(hex);
    }
    if (trim(hex) === "0x00")
      return false;
    if (trim(hex) === "0x01")
      return true;
    throw new InvalidHexBooleanError(hex);
  }
  function hexToNumber2(hex, opts = {}) {
    return Number(hexToBigInt(hex, opts));
  }
  var init_fromHex = __esm({
    "node_modules/viem/_esm/utils/encoding/fromHex.js"() {
      "use strict";
      init_encoding();
      init_size();
      init_trim();
    }
  });

  // node_modules/viem/_esm/utils/encoding/toHex.js
  function toHex(value, opts = {}) {
    if (typeof value === "number" || typeof value === "bigint")
      return numberToHex(value, opts);
    if (typeof value === "string") {
      return stringToHex(value, opts);
    }
    if (typeof value === "boolean")
      return boolToHex(value, opts);
    return bytesToHex2(value, opts);
  }
  function boolToHex(value, opts = {}) {
    const hex = `0x${Number(value)}`;
    if (typeof opts.size === "number") {
      assertSize(hex, { size: opts.size });
      return pad(hex, { size: opts.size });
    }
    return hex;
  }
  function bytesToHex2(value, opts = {}) {
    let string = "";
    for (let i = 0; i < value.length; i++) {
      string += hexes2[value[i]];
    }
    const hex = `0x${string}`;
    if (typeof opts.size === "number") {
      assertSize(hex, { size: opts.size });
      return pad(hex, { dir: "right", size: opts.size });
    }
    return hex;
  }
  function numberToHex(value_, opts = {}) {
    const { signed, size: size3 } = opts;
    const value = BigInt(value_);
    let maxValue;
    if (size3) {
      if (signed)
        maxValue = (1n << BigInt(size3) * 8n - 1n) - 1n;
      else
        maxValue = 2n ** (BigInt(size3) * 8n) - 1n;
    } else if (typeof value_ === "number") {
      maxValue = BigInt(Number.MAX_SAFE_INTEGER);
    }
    const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
    if (maxValue && value > maxValue || value < minValue) {
      const suffix = typeof value_ === "bigint" ? "n" : "";
      throw new IntegerOutOfRangeError({
        max: maxValue ? `${maxValue}${suffix}` : void 0,
        min: `${minValue}${suffix}`,
        signed,
        size: size3,
        value: `${value_}${suffix}`
      });
    }
    const hex = `0x${(signed && value < 0 ? (1n << BigInt(size3 * 8)) + BigInt(value) : value).toString(16)}`;
    if (size3)
      return pad(hex, { size: size3 });
    return hex;
  }
  function stringToHex(value_, opts = {}) {
    const value = encoder2.encode(value_);
    return bytesToHex2(value, opts);
  }
  var hexes2, encoder2;
  var init_toHex = __esm({
    "node_modules/viem/_esm/utils/encoding/toHex.js"() {
      "use strict";
      init_encoding();
      init_pad();
      init_fromHex();
      hexes2 = /* @__PURE__ */ Array.from({ length: 256 }, (_v, i) => i.toString(16).padStart(2, "0"));
      encoder2 = /* @__PURE__ */ new TextEncoder();
    }
  });

  // node_modules/viem/_esm/errors/address.js
  var InvalidAddressError;
  var init_address = __esm({
    "node_modules/viem/_esm/errors/address.js"() {
      "use strict";
      init_base();
      InvalidAddressError = class extends BaseError {
        constructor({ address }) {
          super(`Address "${address}" is invalid.`, {
            metaMessages: [
              "- Address must be a hex value of 20 bytes (40 hex characters).",
              "- Address must match its checksum counterpart."
            ],
            name: "InvalidAddressError"
          });
        }
      };
    }
  });

  // node_modules/viem/_esm/utils/lru.js
  var LruMap;
  var init_lru = __esm({
    "node_modules/viem/_esm/utils/lru.js"() {
      "use strict";
      LruMap = class extends Map {
        constructor(size3) {
          super();
          Object.defineProperty(this, "maxSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.maxSize = size3;
        }
        get(key) {
          const value = super.get(key);
          if (super.has(key) && value !== void 0) {
            this.delete(key);
            super.set(key, value);
          }
          return value;
        }
        set(key, value) {
          super.set(key, value);
          if (this.maxSize && this.size > this.maxSize) {
            const firstKey = this.keys().next().value;
            if (firstKey)
              this.delete(firstKey);
          }
          return this;
        }
      };
    }
  });

  // node_modules/@noble/hashes/esm/sha3.js
  function keccakP(s, rounds = 24) {
    const B = new Uint32Array(5 * 2);
    for (let round = 24 - rounds; round < 24; round++) {
      for (let x = 0; x < 10; x++)
        B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
      for (let x = 0; x < 10; x += 2) {
        const idx1 = (x + 8) % 10;
        const idx0 = (x + 2) % 10;
        const B0 = B[idx0];
        const B1 = B[idx0 + 1];
        const Th = rotlH(B0, B1, 1) ^ B[idx1];
        const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
        for (let y = 0; y < 50; y += 10) {
          s[x + y] ^= Th;
          s[x + y + 1] ^= Tl;
        }
      }
      let curH = s[2];
      let curL = s[3];
      for (let t = 0; t < 24; t++) {
        const shift = SHA3_ROTL[t];
        const Th = rotlH(curH, curL, shift);
        const Tl = rotlL(curH, curL, shift);
        const PI = SHA3_PI[t];
        curH = s[PI];
        curL = s[PI + 1];
        s[PI] = Th;
        s[PI + 1] = Tl;
      }
      for (let y = 0; y < 50; y += 10) {
        for (let x = 0; x < 10; x++)
          B[x] = s[y + x];
        for (let x = 0; x < 10; x++)
          s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
      }
      s[0] ^= SHA3_IOTA_H[round];
      s[1] ^= SHA3_IOTA_L[round];
    }
    B.fill(0);
  }
  var SHA3_PI, SHA3_ROTL, _SHA3_IOTA, _0n6, _1n6, _2n5, _7n, _256n, _0x71n, SHA3_IOTA_H, SHA3_IOTA_L, rotlH, rotlL, Keccak, gen, sha3_224, sha3_256, sha3_384, sha3_512, keccak_224, keccak_256, keccak_384, keccak_512, genShake, shake128, shake256;
  var init_sha3 = __esm({
    "node_modules/@noble/hashes/esm/sha3.js"() {
      "use strict";
      init_assert();
      init_u64();
      init_utils();
      SHA3_PI = [];
      SHA3_ROTL = [];
      _SHA3_IOTA = [];
      _0n6 = /* @__PURE__ */ BigInt(0);
      _1n6 = /* @__PURE__ */ BigInt(1);
      _2n5 = /* @__PURE__ */ BigInt(2);
      _7n = /* @__PURE__ */ BigInt(7);
      _256n = /* @__PURE__ */ BigInt(256);
      _0x71n = /* @__PURE__ */ BigInt(113);
      for (let round = 0, R = _1n6, x = 1, y = 0; round < 24; round++) {
        [x, y] = [y, (2 * x + 3 * y) % 5];
        SHA3_PI.push(2 * (5 * y + x));
        SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
        let t = _0n6;
        for (let j = 0; j < 7; j++) {
          R = (R << _1n6 ^ (R >> _7n) * _0x71n) % _256n;
          if (R & _2n5)
            t ^= _1n6 << (_1n6 << /* @__PURE__ */ BigInt(j)) - _1n6;
        }
        _SHA3_IOTA.push(t);
      }
      [SHA3_IOTA_H, SHA3_IOTA_L] = /* @__PURE__ */ split(_SHA3_IOTA, true);
      rotlH = (h, l, s) => s > 32 ? rotlBH(h, l, s) : rotlSH(h, l, s);
      rotlL = (h, l, s) => s > 32 ? rotlBL(h, l, s) : rotlSL(h, l, s);
      Keccak = class _Keccak extends Hash {
        // NOTE: we accept arguments in bytes instead of bits here.
        constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
          super();
          this.blockLen = blockLen;
          this.suffix = suffix;
          this.outputLen = outputLen;
          this.enableXOF = enableXOF;
          this.rounds = rounds;
          this.pos = 0;
          this.posOut = 0;
          this.finished = false;
          this.destroyed = false;
          number(outputLen);
          if (0 >= this.blockLen || this.blockLen >= 200)
            throw new Error("Sha3 supports only keccak-f1600 function");
          this.state = new Uint8Array(200);
          this.state32 = u32(this.state);
        }
        keccak() {
          if (!isLE)
            byteSwap32(this.state32);
          keccakP(this.state32, this.rounds);
          if (!isLE)
            byteSwap32(this.state32);
          this.posOut = 0;
          this.pos = 0;
        }
        update(data) {
          exists(this);
          const { blockLen, state } = this;
          data = toBytes(data);
          const len = data.length;
          for (let pos = 0; pos < len; ) {
            const take = Math.min(blockLen - this.pos, len - pos);
            for (let i = 0; i < take; i++)
              state[this.pos++] ^= data[pos++];
            if (this.pos === blockLen)
              this.keccak();
          }
          return this;
        }
        finish() {
          if (this.finished)
            return;
          this.finished = true;
          const { state, suffix, pos, blockLen } = this;
          state[pos] ^= suffix;
          if ((suffix & 128) !== 0 && pos === blockLen - 1)
            this.keccak();
          state[blockLen - 1] ^= 128;
          this.keccak();
        }
        writeInto(out) {
          exists(this, false);
          bytes(out);
          this.finish();
          const bufferOut = this.state;
          const { blockLen } = this;
          for (let pos = 0, len = out.length; pos < len; ) {
            if (this.posOut >= blockLen)
              this.keccak();
            const take = Math.min(blockLen - this.posOut, len - pos);
            out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
            this.posOut += take;
            pos += take;
          }
          return out;
        }
        xofInto(out) {
          if (!this.enableXOF)
            throw new Error("XOF is not possible for this instance");
          return this.writeInto(out);
        }
        xof(bytes2) {
          number(bytes2);
          return this.xofInto(new Uint8Array(bytes2));
        }
        digestInto(out) {
          output(out, this);
          if (this.finished)
            throw new Error("digest() was already called");
          this.writeInto(out);
          this.destroy();
          return out;
        }
        digest() {
          return this.digestInto(new Uint8Array(this.outputLen));
        }
        destroy() {
          this.destroyed = true;
          this.state.fill(0);
        }
        _cloneInto(to) {
          const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
          to || (to = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
          to.state32.set(this.state32);
          to.pos = this.pos;
          to.posOut = this.posOut;
          to.finished = this.finished;
          to.rounds = rounds;
          to.suffix = suffix;
          to.outputLen = outputLen;
          to.enableXOF = enableXOF;
          to.destroyed = this.destroyed;
          return to;
        }
      };
      gen = (suffix, blockLen, outputLen) => wrapConstructor(() => new Keccak(blockLen, suffix, outputLen));
      sha3_224 = /* @__PURE__ */ gen(6, 144, 224 / 8);
      sha3_256 = /* @__PURE__ */ gen(6, 136, 256 / 8);
      sha3_384 = /* @__PURE__ */ gen(6, 104, 384 / 8);
      sha3_512 = /* @__PURE__ */ gen(6, 72, 512 / 8);
      keccak_224 = /* @__PURE__ */ gen(1, 144, 224 / 8);
      keccak_256 = /* @__PURE__ */ gen(1, 136, 256 / 8);
      keccak_384 = /* @__PURE__ */ gen(1, 104, 384 / 8);
      keccak_512 = /* @__PURE__ */ gen(1, 72, 512 / 8);
      genShake = (suffix, blockLen, outputLen) => wrapXOFConstructorWithOpts((opts = {}) => new Keccak(blockLen, suffix, opts.dkLen === void 0 ? outputLen : opts.dkLen, true));
      shake128 = /* @__PURE__ */ genShake(31, 168, 128 / 8);
      shake256 = /* @__PURE__ */ genShake(31, 136, 256 / 8);
    }
  });

  // node_modules/viem/_esm/utils/hash/keccak256.js
  function keccak256(value, to_) {
    const to = to_ || "hex";
    const bytes2 = keccak_256(isHex(value, { strict: false }) ? toBytes2(value) : value);
    if (to === "bytes")
      return bytes2;
    return toHex(bytes2);
  }
  var init_keccak256 = __esm({
    "node_modules/viem/_esm/utils/hash/keccak256.js"() {
      "use strict";
      init_sha3();
      init_isHex();
      init_toBytes();
      init_toHex();
    }
  });

  // node_modules/viem/_esm/utils/address/getAddress.js
  function checksumAddress(address_, chainId) {
    if (checksumAddressCache.has(`${address_}.${chainId}`))
      return checksumAddressCache.get(`${address_}.${chainId}`);
    const hexAddress = chainId ? `${chainId}${address_.toLowerCase()}` : address_.substring(2).toLowerCase();
    const hash3 = keccak256(stringToBytes(hexAddress), "bytes");
    const address = (chainId ? hexAddress.substring(`${chainId}0x`.length) : hexAddress).split("");
    for (let i = 0; i < 40; i += 2) {
      if (hash3[i >> 1] >> 4 >= 8 && address[i]) {
        address[i] = address[i].toUpperCase();
      }
      if ((hash3[i >> 1] & 15) >= 8 && address[i + 1]) {
        address[i + 1] = address[i + 1].toUpperCase();
      }
    }
    const result = `0x${address.join("")}`;
    checksumAddressCache.set(`${address_}.${chainId}`, result);
    return result;
  }
  function getAddress(address, chainId) {
    if (!isAddress(address, { strict: false }))
      throw new InvalidAddressError({ address });
    return checksumAddress(address, chainId);
  }
  var checksumAddressCache;
  var init_getAddress = __esm({
    "node_modules/viem/_esm/utils/address/getAddress.js"() {
      "use strict";
      init_address();
      init_toBytes();
      init_keccak256();
      init_lru();
      init_isAddress();
      checksumAddressCache = /* @__PURE__ */ new LruMap(8192);
    }
  });

  // node_modules/viem/_esm/utils/address/isAddress.js
  function isAddress(address, options) {
    const { strict = true } = options ?? {};
    const cacheKey2 = `${address}.${strict}`;
    if (isAddressCache.has(cacheKey2))
      return isAddressCache.get(cacheKey2);
    const result = (() => {
      if (!addressRegex.test(address))
        return false;
      if (address.toLowerCase() === address)
        return true;
      if (strict)
        return checksumAddress(address) === address;
      return true;
    })();
    isAddressCache.set(cacheKey2, result);
    return result;
  }
  var addressRegex, isAddressCache;
  var init_isAddress = __esm({
    "node_modules/viem/_esm/utils/address/isAddress.js"() {
      "use strict";
      init_lru();
      init_getAddress();
      addressRegex = /^0x[a-fA-F0-9]{40}$/;
      isAddressCache = /* @__PURE__ */ new LruMap(8192);
    }
  });

  // node_modules/viem/_esm/utils/data/concat.js
  function concat(values) {
    if (typeof values[0] === "string")
      return concatHex(values);
    return concatBytes3(values);
  }
  function concatBytes3(values) {
    let length = 0;
    for (const arr of values) {
      length += arr.length;
    }
    const result = new Uint8Array(length);
    let offset = 0;
    for (const arr of values) {
      result.set(arr, offset);
      offset += arr.length;
    }
    return result;
  }
  function concatHex(values) {
    return `0x${values.reduce((acc, x) => acc + x.replace("0x", ""), "")}`;
  }
  var init_concat = __esm({
    "node_modules/viem/_esm/utils/data/concat.js"() {
      "use strict";
    }
  });

  // node_modules/viem/_esm/errors/cursor.js
  var NegativeOffsetError, PositionOutOfBoundsError, RecursiveReadLimitExceededError;
  var init_cursor = __esm({
    "node_modules/viem/_esm/errors/cursor.js"() {
      "use strict";
      init_base();
      NegativeOffsetError = class extends BaseError {
        constructor({ offset }) {
          super(`Offset \`${offset}\` cannot be negative.`, {
            name: "NegativeOffsetError"
          });
        }
      };
      PositionOutOfBoundsError = class extends BaseError {
        constructor({ length, position }) {
          super(`Position \`${position}\` is out of bounds (\`0 < position < ${length}\`).`, { name: "PositionOutOfBoundsError" });
        }
      };
      RecursiveReadLimitExceededError = class extends BaseError {
        constructor({ count, limit }) {
          super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`, { name: "RecursiveReadLimitExceededError" });
        }
      };
    }
  });

  // node_modules/viem/_esm/utils/cursor.js
  function createCursor(bytes2, { recursiveReadLimit = 8192 } = {}) {
    const cursor = Object.create(staticCursor);
    cursor.bytes = bytes2;
    cursor.dataView = new DataView(bytes2.buffer, bytes2.byteOffset, bytes2.byteLength);
    cursor.positionReadCount = /* @__PURE__ */ new Map();
    cursor.recursiveReadLimit = recursiveReadLimit;
    return cursor;
  }
  var staticCursor;
  var init_cursor2 = __esm({
    "node_modules/viem/_esm/utils/cursor.js"() {
      "use strict";
      init_cursor();
      staticCursor = {
        bytes: new Uint8Array(),
        dataView: new DataView(new ArrayBuffer(0)),
        position: 0,
        positionReadCount: /* @__PURE__ */ new Map(),
        recursiveReadCount: 0,
        recursiveReadLimit: Number.POSITIVE_INFINITY,
        assertReadLimit() {
          if (this.recursiveReadCount >= this.recursiveReadLimit)
            throw new RecursiveReadLimitExceededError({
              count: this.recursiveReadCount + 1,
              limit: this.recursiveReadLimit
            });
        },
        assertPosition(position) {
          if (position < 0 || position > this.bytes.length - 1)
            throw new PositionOutOfBoundsError({
              length: this.bytes.length,
              position
            });
        },
        decrementPosition(offset) {
          if (offset < 0)
            throw new NegativeOffsetError({ offset });
          const position = this.position - offset;
          this.assertPosition(position);
          this.position = position;
        },
        getReadCount(position) {
          return this.positionReadCount.get(position || this.position) || 0;
        },
        incrementPosition(offset) {
          if (offset < 0)
            throw new NegativeOffsetError({ offset });
          const position = this.position + offset;
          this.assertPosition(position);
          this.position = position;
        },
        inspectByte(position_) {
          const position = position_ ?? this.position;
          this.assertPosition(position);
          return this.bytes[position];
        },
        inspectBytes(length, position_) {
          const position = position_ ?? this.position;
          this.assertPosition(position + length - 1);
          return this.bytes.subarray(position, position + length);
        },
        inspectUint8(position_) {
          const position = position_ ?? this.position;
          this.assertPosition(position);
          return this.bytes[position];
        },
        inspectUint16(position_) {
          const position = position_ ?? this.position;
          this.assertPosition(position + 1);
          return this.dataView.getUint16(position);
        },
        inspectUint24(position_) {
          const position = position_ ?? this.position;
          this.assertPosition(position + 2);
          return (this.dataView.getUint16(position) << 8) + this.dataView.getUint8(position + 2);
        },
        inspectUint32(position_) {
          const position = position_ ?? this.position;
          this.assertPosition(position + 3);
          return this.dataView.getUint32(position);
        },
        pushByte(byte) {
          this.assertPosition(this.position);
          this.bytes[this.position] = byte;
          this.position++;
        },
        pushBytes(bytes2) {
          this.assertPosition(this.position + bytes2.length - 1);
          this.bytes.set(bytes2, this.position);
          this.position += bytes2.length;
        },
        pushUint8(value) {
          this.assertPosition(this.position);
          this.bytes[this.position] = value;
          this.position++;
        },
        pushUint16(value) {
          this.assertPosition(this.position + 1);
          this.dataView.setUint16(this.position, value);
          this.position += 2;
        },
        pushUint24(value) {
          this.assertPosition(this.position + 2);
          this.dataView.setUint16(this.position, value >> 8);
          this.dataView.setUint8(this.position + 2, value & ~4294967040);
          this.position += 3;
        },
        pushUint32(value) {
          this.assertPosition(this.position + 3);
          this.dataView.setUint32(this.position, value);
          this.position += 4;
        },
        readByte() {
          this.assertReadLimit();
          this._touch();
          const value = this.inspectByte();
          this.position++;
          return value;
        },
        readBytes(length, size3) {
          this.assertReadLimit();
          this._touch();
          const value = this.inspectBytes(length);
          this.position += size3 ?? length;
          return value;
        },
        readUint8() {
          this.assertReadLimit();
          this._touch();
          const value = this.inspectUint8();
          this.position += 1;
          return value;
        },
        readUint16() {
          this.assertReadLimit();
          this._touch();
          const value = this.inspectUint16();
          this.position += 2;
          return value;
        },
        readUint24() {
          this.assertReadLimit();
          this._touch();
          const value = this.inspectUint24();
          this.position += 3;
          return value;
        },
        readUint32() {
          this.assertReadLimit();
          this._touch();
          const value = this.inspectUint32();
          this.position += 4;
          return value;
        },
        get remaining() {
          return this.bytes.length - this.position;
        },
        setPosition(position) {
          const oldPosition = this.position;
          this.assertPosition(position);
          this.position = position;
          return () => this.position = oldPosition;
        },
        _touch() {
          if (this.recursiveReadLimit === Number.POSITIVE_INFINITY)
            return;
          const count = this.getReadCount();
          this.positionReadCount.set(this.position, count + 1);
          if (count > 0)
            this.recursiveReadCount++;
        }
      };
    }
  });

  // node_modules/viem/_esm/constants/unit.js
  var etherUnits, gweiUnits;
  var init_unit = __esm({
    "node_modules/viem/_esm/constants/unit.js"() {
      "use strict";
      etherUnits = {
        gwei: 9,
        wei: 18
      };
      gweiUnits = {
        ether: -9,
        wei: 9
      };
    }
  });

  // node_modules/viem/_esm/utils/unit/formatUnits.js
  function formatUnits(value, decimals) {
    let display = value.toString();
    const negative = display.startsWith("-");
    if (negative)
      display = display.slice(1);
    display = display.padStart(decimals, "0");
    let [integer, fraction] = [
      display.slice(0, display.length - decimals),
      display.slice(display.length - decimals)
    ];
    fraction = fraction.replace(/(0+)$/, "");
    return `${negative ? "-" : ""}${integer || "0"}${fraction ? `.${fraction}` : ""}`;
  }
  var init_formatUnits = __esm({
    "node_modules/viem/_esm/utils/unit/formatUnits.js"() {
      "use strict";
    }
  });

  // node_modules/viem/_esm/utils/unit/formatEther.js
  function formatEther(wei, unit = "wei") {
    return formatUnits(wei, etherUnits[unit]);
  }
  var init_formatEther = __esm({
    "node_modules/viem/_esm/utils/unit/formatEther.js"() {
      "use strict";
      init_unit();
      init_formatUnits();
    }
  });

  // node_modules/viem/_esm/utils/unit/formatGwei.js
  function formatGwei(wei, unit = "wei") {
    return formatUnits(wei, gweiUnits[unit]);
  }
  var init_formatGwei = __esm({
    "node_modules/viem/_esm/utils/unit/formatGwei.js"() {
      "use strict";
      init_unit();
      init_formatUnits();
    }
  });

  // node_modules/viem/_esm/errors/transaction.js
  function prettyPrint(args) {
    const entries = Object.entries(args).map(([key, value]) => {
      if (value === void 0 || value === false)
        return null;
      return [key, value];
    }).filter(Boolean);
    const maxLength = entries.reduce((acc, [key]) => Math.max(acc, key.length), 0);
    return entries.map(([key, value]) => `  ${`${key}:`.padEnd(maxLength + 1)}  ${value}`).join("\n");
  }
  var FeeConflictError, InvalidLegacyVError, InvalidSerializableTransactionError, InvalidStorageKeySizeError, TransactionExecutionError, TransactionNotFoundError, TransactionReceiptNotFoundError, WaitForTransactionReceiptTimeoutError;
  var init_transaction = __esm({
    "node_modules/viem/_esm/errors/transaction.js"() {
      "use strict";
      init_formatEther();
      init_formatGwei();
      init_base();
      FeeConflictError = class extends BaseError {
        constructor() {
          super([
            "Cannot specify both a `gasPrice` and a `maxFeePerGas`/`maxPriorityFeePerGas`.",
            "Use `maxFeePerGas`/`maxPriorityFeePerGas` for EIP-1559 compatible networks, and `gasPrice` for others."
          ].join("\n"), { name: "FeeConflictError" });
        }
      };
      InvalidLegacyVError = class extends BaseError {
        constructor({ v }) {
          super(`Invalid \`v\` value "${v}". Expected 27 or 28.`, {
            name: "InvalidLegacyVError"
          });
        }
      };
      InvalidSerializableTransactionError = class extends BaseError {
        constructor({ transaction }) {
          super("Cannot infer a transaction type from provided transaction.", {
            metaMessages: [
              "Provided Transaction:",
              "{",
              prettyPrint(transaction),
              "}",
              "",
              "To infer the type, either provide:",
              "- a `type` to the Transaction, or",
              "- an EIP-1559 Transaction with `maxFeePerGas`, or",
              "- an EIP-2930 Transaction with `gasPrice` & `accessList`, or",
              "- an EIP-4844 Transaction with `blobs`, `blobVersionedHashes`, `sidecars`, or",
              "- an EIP-7702 Transaction with `authorizationList`, or",
              "- a Legacy Transaction with `gasPrice`"
            ],
            name: "InvalidSerializableTransactionError"
          });
        }
      };
      InvalidStorageKeySizeError = class extends BaseError {
        constructor({ storageKey }) {
          super(`Size for storage key "${storageKey}" is invalid. Expected 32 bytes. Got ${Math.floor((storageKey.length - 2) / 2)} bytes.`, { name: "InvalidStorageKeySizeError" });
        }
      };
      TransactionExecutionError = class extends BaseError {
        constructor(cause, { account, docsPath: docsPath6, chain, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value }) {
          const prettyArgs = prettyPrint({
            chain: chain && `${chain?.name} (id: ${chain?.id})`,
            from: account?.address,
            to,
            value: typeof value !== "undefined" && `${formatEther(value)} ${chain?.nativeCurrency?.symbol || "ETH"}`,
            data,
            gas,
            gasPrice: typeof gasPrice !== "undefined" && `${formatGwei(gasPrice)} gwei`,
            maxFeePerGas: typeof maxFeePerGas !== "undefined" && `${formatGwei(maxFeePerGas)} gwei`,
            maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== "undefined" && `${formatGwei(maxPriorityFeePerGas)} gwei`,
            nonce
          });
          super(cause.shortMessage, {
            cause,
            docsPath: docsPath6,
            metaMessages: [
              ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
              "Request Arguments:",
              prettyArgs
            ].filter(Boolean),
            name: "TransactionExecutionError"
          });
          Object.defineProperty(this, "cause", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.cause = cause;
        }
      };
      TransactionNotFoundError = class extends BaseError {
        constructor({ blockHash, blockNumber, blockTag, hash: hash3, index: index2 }) {
          let identifier = "Transaction";
          if (blockTag && index2 !== void 0)
            identifier = `Transaction at block time "${blockTag}" at index "${index2}"`;
          if (blockHash && index2 !== void 0)
            identifier = `Transaction at block hash "${blockHash}" at index "${index2}"`;
          if (blockNumber && index2 !== void 0)
            identifier = `Transaction at block number "${blockNumber}" at index "${index2}"`;
          if (hash3)
            identifier = `Transaction with hash "${hash3}"`;
          super(`${identifier} could not be found.`, {
            name: "TransactionNotFoundError"
          });
        }
      };
      TransactionReceiptNotFoundError = class extends BaseError {
        constructor({ hash: hash3 }) {
          super(`Transaction receipt with hash "${hash3}" could not be found. The Transaction may not be processed on a block yet.`, {
            name: "TransactionReceiptNotFoundError"
          });
        }
      };
      WaitForTransactionReceiptTimeoutError = class extends BaseError {
        constructor({ hash: hash3 }) {
          super(`Timed out while waiting for transaction with hash "${hash3}" to be confirmed.`, { name: "WaitForTransactionReceiptTimeoutError" });
        }
      };
    }
  });

  // node_modules/viem/_esm/constants/number.js
  var maxInt8, maxInt16, maxInt24, maxInt32, maxInt40, maxInt48, maxInt56, maxInt64, maxInt72, maxInt80, maxInt88, maxInt96, maxInt104, maxInt112, maxInt120, maxInt128, maxInt136, maxInt144, maxInt152, maxInt160, maxInt168, maxInt176, maxInt184, maxInt192, maxInt200, maxInt208, maxInt216, maxInt224, maxInt232, maxInt240, maxInt248, maxInt256, minInt8, minInt16, minInt24, minInt32, minInt40, minInt48, minInt56, minInt64, minInt72, minInt80, minInt88, minInt96, minInt104, minInt112, minInt120, minInt128, minInt136, minInt144, minInt152, minInt160, minInt168, minInt176, minInt184, minInt192, minInt200, minInt208, minInt216, minInt224, minInt232, minInt240, minInt248, minInt256, maxUint8, maxUint16, maxUint24, maxUint32, maxUint40, maxUint48, maxUint56, maxUint64, maxUint72, maxUint80, maxUint88, maxUint96, maxUint104, maxUint112, maxUint120, maxUint128, maxUint136, maxUint144, maxUint152, maxUint160, maxUint168, maxUint176, maxUint184, maxUint192, maxUint200, maxUint208, maxUint216, maxUint224, maxUint232, maxUint240, maxUint248, maxUint256;
  var init_number = __esm({
    "node_modules/viem/_esm/constants/number.js"() {
      "use strict";
      maxInt8 = 2n ** (8n - 1n) - 1n;
      maxInt16 = 2n ** (16n - 1n) - 1n;
      maxInt24 = 2n ** (24n - 1n) - 1n;
      maxInt32 = 2n ** (32n - 1n) - 1n;
      maxInt40 = 2n ** (40n - 1n) - 1n;
      maxInt48 = 2n ** (48n - 1n) - 1n;
      maxInt56 = 2n ** (56n - 1n) - 1n;
      maxInt64 = 2n ** (64n - 1n) - 1n;
      maxInt72 = 2n ** (72n - 1n) - 1n;
      maxInt80 = 2n ** (80n - 1n) - 1n;
      maxInt88 = 2n ** (88n - 1n) - 1n;
      maxInt96 = 2n ** (96n - 1n) - 1n;
      maxInt104 = 2n ** (104n - 1n) - 1n;
      maxInt112 = 2n ** (112n - 1n) - 1n;
      maxInt120 = 2n ** (120n - 1n) - 1n;
      maxInt128 = 2n ** (128n - 1n) - 1n;
      maxInt136 = 2n ** (136n - 1n) - 1n;
      maxInt144 = 2n ** (144n - 1n) - 1n;
      maxInt152 = 2n ** (152n - 1n) - 1n;
      maxInt160 = 2n ** (160n - 1n) - 1n;
      maxInt168 = 2n ** (168n - 1n) - 1n;
      maxInt176 = 2n ** (176n - 1n) - 1n;
      maxInt184 = 2n ** (184n - 1n) - 1n;
      maxInt192 = 2n ** (192n - 1n) - 1n;
      maxInt200 = 2n ** (200n - 1n) - 1n;
      maxInt208 = 2n ** (208n - 1n) - 1n;
      maxInt216 = 2n ** (216n - 1n) - 1n;
      maxInt224 = 2n ** (224n - 1n) - 1n;
      maxInt232 = 2n ** (232n - 1n) - 1n;
      maxInt240 = 2n ** (240n - 1n) - 1n;
      maxInt248 = 2n ** (248n - 1n) - 1n;
      maxInt256 = 2n ** (256n - 1n) - 1n;
      minInt8 = -(2n ** (8n - 1n));
      minInt16 = -(2n ** (16n - 1n));
      minInt24 = -(2n ** (24n - 1n));
      minInt32 = -(2n ** (32n - 1n));
      minInt40 = -(2n ** (40n - 1n));
      minInt48 = -(2n ** (48n - 1n));
      minInt56 = -(2n ** (56n - 1n));
      minInt64 = -(2n ** (64n - 1n));
      minInt72 = -(2n ** (72n - 1n));
      minInt80 = -(2n ** (80n - 1n));
      minInt88 = -(2n ** (88n - 1n));
      minInt96 = -(2n ** (96n - 1n));
      minInt104 = -(2n ** (104n - 1n));
      minInt112 = -(2n ** (112n - 1n));
      minInt120 = -(2n ** (120n - 1n));
      minInt128 = -(2n ** (128n - 1n));
      minInt136 = -(2n ** (136n - 1n));
      minInt144 = -(2n ** (144n - 1n));
      minInt152 = -(2n ** (152n - 1n));
      minInt160 = -(2n ** (160n - 1n));
      minInt168 = -(2n ** (168n - 1n));
      minInt176 = -(2n ** (176n - 1n));
      minInt184 = -(2n ** (184n - 1n));
      minInt192 = -(2n ** (192n - 1n));
      minInt200 = -(2n ** (200n - 1n));
      minInt208 = -(2n ** (208n - 1n));
      minInt216 = -(2n ** (216n - 1n));
      minInt224 = -(2n ** (224n - 1n));
      minInt232 = -(2n ** (232n - 1n));
      minInt240 = -(2n ** (240n - 1n));
      minInt248 = -(2n ** (248n - 1n));
      minInt256 = -(2n ** (256n - 1n));
      maxUint8 = 2n ** 8n - 1n;
      maxUint16 = 2n ** 16n - 1n;
      maxUint24 = 2n ** 24n - 1n;
      maxUint32 = 2n ** 32n - 1n;
      maxUint40 = 2n ** 40n - 1n;
      maxUint48 = 2n ** 48n - 1n;
      maxUint56 = 2n ** 56n - 1n;
      maxUint64 = 2n ** 64n - 1n;
      maxUint72 = 2n ** 72n - 1n;
      maxUint80 = 2n ** 80n - 1n;
      maxUint88 = 2n ** 88n - 1n;
      maxUint96 = 2n ** 96n - 1n;
      maxUint104 = 2n ** 104n - 1n;
      maxUint112 = 2n ** 112n - 1n;
      maxUint120 = 2n ** 120n - 1n;
      maxUint128 = 2n ** 128n - 1n;
      maxUint136 = 2n ** 136n - 1n;
      maxUint144 = 2n ** 144n - 1n;
      maxUint152 = 2n ** 152n - 1n;
      maxUint160 = 2n ** 160n - 1n;
      maxUint168 = 2n ** 168n - 1n;
      maxUint176 = 2n ** 176n - 1n;
      maxUint184 = 2n ** 184n - 1n;
      maxUint192 = 2n ** 192n - 1n;
      maxUint200 = 2n ** 200n - 1n;
      maxUint208 = 2n ** 208n - 1n;
      maxUint216 = 2n ** 216n - 1n;
      maxUint224 = 2n ** 224n - 1n;
      maxUint232 = 2n ** 232n - 1n;
      maxUint240 = 2n ** 240n - 1n;
      maxUint248 = 2n ** 248n - 1n;
      maxUint256 = 2n ** 256n - 1n;
    }
  });

  // node_modules/viem/_esm/errors/chain.js
  var ChainDoesNotSupportContract, ChainMismatchError, ChainNotFoundError, ClientChainNotConfiguredError, InvalidChainIdError;
  var init_chain = __esm({
    "node_modules/viem/_esm/errors/chain.js"() {
      "use strict";
      init_base();
      ChainDoesNotSupportContract = class extends BaseError {
        constructor({ blockNumber, chain, contract }) {
          super(`Chain "${chain.name}" does not support contract "${contract.name}".`, {
            metaMessages: [
              "This could be due to any of the following:",
              ...blockNumber && contract.blockCreated && contract.blockCreated > blockNumber ? [
                `- The contract "${contract.name}" was not deployed until block ${contract.blockCreated} (current block ${blockNumber}).`
              ] : [
                `- The chain does not have the contract "${contract.name}" configured.`
              ]
            ],
            name: "ChainDoesNotSupportContract"
          });
        }
      };
      ChainMismatchError = class extends BaseError {
        constructor({ chain, currentChainId }) {
          super(`The current chain of the wallet (id: ${currentChainId}) does not match the target chain for the transaction (id: ${chain.id} \u2013 ${chain.name}).`, {
            metaMessages: [
              `Current Chain ID:  ${currentChainId}`,
              `Expected Chain ID: ${chain.id} \u2013 ${chain.name}`
            ],
            name: "ChainMismatchError"
          });
        }
      };
      ChainNotFoundError = class extends BaseError {
        constructor() {
          super([
            "No chain was provided to the request.",
            "Please provide a chain with the `chain` argument on the Action, or by supplying a `chain` to WalletClient."
          ].join("\n"), {
            name: "ChainNotFoundError"
          });
        }
      };
      ClientChainNotConfiguredError = class extends BaseError {
        constructor() {
          super("No chain was provided to the Client.", {
            name: "ClientChainNotConfiguredError"
          });
        }
      };
      InvalidChainIdError = class extends BaseError {
        constructor({ chainId }) {
          super(typeof chainId === "number" ? `Chain ID "${chainId}" is invalid.` : "Chain ID is invalid.", { name: "InvalidChainIdError" });
        }
      };
    }
  });

  // node_modules/viem/_esm/errors/node.js
  var ExecutionRevertedError, FeeCapTooHighError, FeeCapTooLowError, NonceTooHighError, NonceTooLowError, NonceMaxValueError, InsufficientFundsError, IntrinsicGasTooHighError, IntrinsicGasTooLowError, TransactionTypeNotSupportedError, TipAboveFeeCapError, UnknownNodeError;
  var init_node = __esm({
    "node_modules/viem/_esm/errors/node.js"() {
      "use strict";
      init_formatGwei();
      init_base();
      ExecutionRevertedError = class extends BaseError {
        constructor({ cause, message } = {}) {
          const reason = message?.replace("execution reverted: ", "")?.replace("execution reverted", "");
          super(`Execution reverted ${reason ? `with reason: ${reason}` : "for an unknown reason"}.`, {
            cause,
            name: "ExecutionRevertedError"
          });
        }
      };
      Object.defineProperty(ExecutionRevertedError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 3
      });
      Object.defineProperty(ExecutionRevertedError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /execution reverted/
      });
      FeeCapTooHighError = class extends BaseError {
        constructor({ cause, maxFeePerGas } = {}) {
          super(`The fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`, {
            cause,
            name: "FeeCapTooHighError"
          });
        }
      };
      Object.defineProperty(FeeCapTooHighError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/
      });
      FeeCapTooLowError = class extends BaseError {
        constructor({ cause, maxFeePerGas } = {}) {
          super(`The fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)}` : ""} gwei) cannot be lower than the block base fee.`, {
            cause,
            name: "FeeCapTooLowError"
          });
        }
      };
      Object.defineProperty(FeeCapTooLowError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/
      });
      NonceTooHighError = class extends BaseError {
        constructor({ cause, nonce } = {}) {
          super(`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}is higher than the next one expected.`, { cause, name: "NonceTooHighError" });
        }
      };
      Object.defineProperty(NonceTooHighError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /nonce too high/
      });
      NonceTooLowError = class extends BaseError {
        constructor({ cause, nonce } = {}) {
          super([
            `Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}is lower than the current nonce of the account.`,
            "Try increasing the nonce or find the latest nonce with `getTransactionCount`."
          ].join("\n"), { cause, name: "NonceTooLowError" });
        }
      };
      Object.defineProperty(NonceTooLowError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /nonce too low|transaction already imported|already known/
      });
      NonceMaxValueError = class extends BaseError {
        constructor({ cause, nonce } = {}) {
          super(`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}exceeds the maximum allowed nonce.`, { cause, name: "NonceMaxValueError" });
        }
      };
      Object.defineProperty(NonceMaxValueError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /nonce has max value/
      });
      InsufficientFundsError = class extends BaseError {
        constructor({ cause } = {}) {
          super([
            "The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account."
          ].join("\n"), {
            cause,
            metaMessages: [
              "This error could arise when the account does not have enough funds to:",
              " - pay for the total gas fee,",
              " - pay for the value to send.",
              " ",
              "The cost of the transaction is calculated as `gas * gas fee + value`, where:",
              " - `gas` is the amount of gas needed for transaction to execute,",
              " - `gas fee` is the gas fee,",
              " - `value` is the amount of ether to send to the recipient."
            ],
            name: "InsufficientFundsError"
          });
        }
      };
      Object.defineProperty(InsufficientFundsError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /insufficient funds|exceeds transaction sender account balance/
      });
      IntrinsicGasTooHighError = class extends BaseError {
        constructor({ cause, gas } = {}) {
          super(`The amount of gas ${gas ? `(${gas}) ` : ""}provided for the transaction exceeds the limit allowed for the block.`, {
            cause,
            name: "IntrinsicGasTooHighError"
          });
        }
      };
      Object.defineProperty(IntrinsicGasTooHighError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /intrinsic gas too high|gas limit reached/
      });
      IntrinsicGasTooLowError = class extends BaseError {
        constructor({ cause, gas } = {}) {
          super(`The amount of gas ${gas ? `(${gas}) ` : ""}provided for the transaction is too low.`, {
            cause,
            name: "IntrinsicGasTooLowError"
          });
        }
      };
      Object.defineProperty(IntrinsicGasTooLowError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /intrinsic gas too low/
      });
      TransactionTypeNotSupportedError = class extends BaseError {
        constructor({ cause }) {
          super("The transaction type is not supported for this chain.", {
            cause,
            name: "TransactionTypeNotSupportedError"
          });
        }
      };
      Object.defineProperty(TransactionTypeNotSupportedError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /transaction type not valid/
      });
      TipAboveFeeCapError = class extends BaseError {
        constructor({ cause, maxPriorityFeePerGas, maxFeePerGas } = {}) {
          super([
            `The provided tip (\`maxPriorityFeePerGas\`${maxPriorityFeePerGas ? ` = ${formatGwei(maxPriorityFeePerGas)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)} gwei` : ""}).`
          ].join("\n"), {
            cause,
            name: "TipAboveFeeCapError"
          });
        }
      };
      Object.defineProperty(TipAboveFeeCapError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /max priority fee per gas higher than max fee per gas|tip higher than fee cap/
      });
      UnknownNodeError = class extends BaseError {
        constructor({ cause }) {
          super(`An error occurred while executing: ${cause?.shortMessage}`, {
            cause,
            name: "UnknownNodeError"
          });
        }
      };
    }
  });

  // node_modules/viem/_esm/utils/data/slice.js
  function slice(value, start, end, { strict } = {}) {
    if (isHex(value, { strict: false }))
      return sliceHex(value, start, end, {
        strict
      });
    return sliceBytes(value, start, end, {
      strict
    });
  }
  function assertStartOffset(value, start) {
    if (typeof start === "number" && start > 0 && start > size(value) - 1)
      throw new SliceOffsetOutOfBoundsError({
        offset: start,
        position: "start",
        size: size(value)
      });
  }
  function assertEndOffset(value, start, end) {
    if (typeof start === "number" && typeof end === "number" && size(value) !== end - start) {
      throw new SliceOffsetOutOfBoundsError({
        offset: end,
        position: "end",
        size: size(value)
      });
    }
  }
  function sliceBytes(value_, start, end, { strict } = {}) {
    assertStartOffset(value_, start);
    const value = value_.slice(start, end);
    if (strict)
      assertEndOffset(value, start, end);
    return value;
  }
  function sliceHex(value_, start, end, { strict } = {}) {
    assertStartOffset(value_, start);
    const value = `0x${value_.replace("0x", "").slice((start ?? 0) * 2, (end ?? value_.length) * 2)}`;
    if (strict)
      assertEndOffset(value, start, end);
    return value;
  }
  var init_slice = __esm({
    "node_modules/viem/_esm/utils/data/slice.js"() {
      "use strict";
      init_data();
      init_isHex();
      init_size();
    }
  });

  // node_modules/viem/_esm/utils/abi/formatAbiItem.js
  function formatAbiItem(abiItem, { includeName = false } = {}) {
    if (abiItem.type !== "function" && abiItem.type !== "event" && abiItem.type !== "error")
      throw new InvalidDefinitionTypeError(abiItem.type);
    return `${abiItem.name}(${formatAbiParams(abiItem.inputs, { includeName })})`;
  }
  function formatAbiParams(params, { includeName = false } = {}) {
    if (!params)
      return "";
    return params.map((param) => formatAbiParam(param, { includeName })).join(includeName ? ", " : ",");
  }
  function formatAbiParam(param, { includeName }) {
    if (param.type.startsWith("tuple")) {
      return `(${formatAbiParams(param.components, { includeName })})${param.type.slice("tuple".length)}`;
    }
    return param.type + (includeName && param.name ? ` ${param.name}` : "");
  }
  var init_formatAbiItem = __esm({
    "node_modules/viem/_esm/utils/abi/formatAbiItem.js"() {
      "use strict";
      init_abi();
    }
  });

  // node_modules/viem/_esm/errors/abi.js
  var AbiConstructorNotFoundError, AbiConstructorParamsNotFoundError, AbiDecodingDataSizeTooSmallError, AbiDecodingZeroDataError, AbiEncodingArrayLengthMismatchError, AbiEncodingBytesSizeMismatchError, AbiEncodingLengthMismatchError, AbiErrorSignatureNotFoundError, AbiEventSignatureEmptyTopicsError, AbiEventSignatureNotFoundError, AbiEventNotFoundError, AbiFunctionNotFoundError, AbiFunctionOutputsNotFoundError, AbiItemAmbiguityError, BytesSizeMismatchError, DecodeLogDataMismatch, DecodeLogTopicsMismatch, InvalidAbiEncodingTypeError, InvalidAbiDecodingTypeError, InvalidArrayError, InvalidDefinitionTypeError;
  var init_abi = __esm({
    "node_modules/viem/_esm/errors/abi.js"() {
      "use strict";
      init_formatAbiItem();
      init_size();
      init_base();
      AbiConstructorNotFoundError = class extends BaseError {
        constructor({ docsPath: docsPath6 }) {
          super([
            "A constructor was not found on the ABI.",
            "Make sure you are using the correct ABI and that the constructor exists on it."
          ].join("\n"), {
            docsPath: docsPath6,
            name: "AbiConstructorNotFoundError"
          });
        }
      };
      AbiConstructorParamsNotFoundError = class extends BaseError {
        constructor({ docsPath: docsPath6 }) {
          super([
            "Constructor arguments were provided (`args`), but a constructor parameters (`inputs`) were not found on the ABI.",
            "Make sure you are using the correct ABI, and that the `inputs` attribute on the constructor exists."
          ].join("\n"), {
            docsPath: docsPath6,
            name: "AbiConstructorParamsNotFoundError"
          });
        }
      };
      AbiDecodingDataSizeTooSmallError = class extends BaseError {
        constructor({ data, params, size: size3 }) {
          super([`Data size of ${size3} bytes is too small for given parameters.`].join("\n"), {
            metaMessages: [
              `Params: (${formatAbiParams(params, { includeName: true })})`,
              `Data:   ${data} (${size3} bytes)`
            ],
            name: "AbiDecodingDataSizeTooSmallError"
          });
          Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "params", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "size", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.data = data;
          this.params = params;
          this.size = size3;
        }
      };
      AbiDecodingZeroDataError = class extends BaseError {
        constructor() {
          super('Cannot decode zero data ("0x") with ABI parameters.', {
            name: "AbiDecodingZeroDataError"
          });
        }
      };
      AbiEncodingArrayLengthMismatchError = class extends BaseError {
        constructor({ expectedLength, givenLength, type }) {
          super([
            `ABI encoding array length mismatch for type ${type}.`,
            `Expected length: ${expectedLength}`,
            `Given length: ${givenLength}`
          ].join("\n"), { name: "AbiEncodingArrayLengthMismatchError" });
        }
      };
      AbiEncodingBytesSizeMismatchError = class extends BaseError {
        constructor({ expectedSize, value }) {
          super(`Size of bytes "${value}" (bytes${size(value)}) does not match expected size (bytes${expectedSize}).`, { name: "AbiEncodingBytesSizeMismatchError" });
        }
      };
      AbiEncodingLengthMismatchError = class extends BaseError {
        constructor({ expectedLength, givenLength }) {
          super([
            "ABI encoding params/values length mismatch.",
            `Expected length (params): ${expectedLength}`,
            `Given length (values): ${givenLength}`
          ].join("\n"), { name: "AbiEncodingLengthMismatchError" });
        }
      };
      AbiErrorSignatureNotFoundError = class extends BaseError {
        constructor(signature, { docsPath: docsPath6 }) {
          super([
            `Encoded error signature "${signature}" not found on ABI.`,
            "Make sure you are using the correct ABI and that the error exists on it.",
            `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${signature}.`
          ].join("\n"), {
            docsPath: docsPath6,
            name: "AbiErrorSignatureNotFoundError"
          });
          Object.defineProperty(this, "signature", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.signature = signature;
        }
      };
      AbiEventSignatureEmptyTopicsError = class extends BaseError {
        constructor({ docsPath: docsPath6 }) {
          super("Cannot extract event signature from empty topics.", {
            docsPath: docsPath6,
            name: "AbiEventSignatureEmptyTopicsError"
          });
        }
      };
      AbiEventSignatureNotFoundError = class extends BaseError {
        constructor(signature, { docsPath: docsPath6 }) {
          super([
            `Encoded event signature "${signature}" not found on ABI.`,
            "Make sure you are using the correct ABI and that the event exists on it.",
            `You can look up the signature here: https://openchain.xyz/signatures?query=${signature}.`
          ].join("\n"), {
            docsPath: docsPath6,
            name: "AbiEventSignatureNotFoundError"
          });
        }
      };
      AbiEventNotFoundError = class extends BaseError {
        constructor(eventName, { docsPath: docsPath6 } = {}) {
          super([
            `Event ${eventName ? `"${eventName}" ` : ""}not found on ABI.`,
            "Make sure you are using the correct ABI and that the event exists on it."
          ].join("\n"), {
            docsPath: docsPath6,
            name: "AbiEventNotFoundError"
          });
        }
      };
      AbiFunctionNotFoundError = class extends BaseError {
        constructor(functionName, { docsPath: docsPath6 } = {}) {
          super([
            `Function ${functionName ? `"${functionName}" ` : ""}not found on ABI.`,
            "Make sure you are using the correct ABI and that the function exists on it."
          ].join("\n"), {
            docsPath: docsPath6,
            name: "AbiFunctionNotFoundError"
          });
        }
      };
      AbiFunctionOutputsNotFoundError = class extends BaseError {
        constructor(functionName, { docsPath: docsPath6 }) {
          super([
            `Function "${functionName}" does not contain any \`outputs\` on ABI.`,
            "Cannot decode function result without knowing what the parameter types are.",
            "Make sure you are using the correct ABI and that the function exists on it."
          ].join("\n"), {
            docsPath: docsPath6,
            name: "AbiFunctionOutputsNotFoundError"
          });
        }
      };
      AbiItemAmbiguityError = class extends BaseError {
        constructor(x, y) {
          super("Found ambiguous types in overloaded ABI items.", {
            metaMessages: [
              `\`${x.type}\` in \`${formatAbiItem(x.abiItem)}\`, and`,
              `\`${y.type}\` in \`${formatAbiItem(y.abiItem)}\``,
              "",
              "These types encode differently and cannot be distinguished at runtime.",
              "Remove one of the ambiguous items in the ABI."
            ],
            name: "AbiItemAmbiguityError"
          });
        }
      };
      BytesSizeMismatchError = class extends BaseError {
        constructor({ expectedSize, givenSize }) {
          super(`Expected bytes${expectedSize}, got bytes${givenSize}.`, {
            name: "BytesSizeMismatchError"
          });
        }
      };
      DecodeLogDataMismatch = class extends BaseError {
        constructor({ abiItem, data, params, size: size3 }) {
          super([
            `Data size of ${size3} bytes is too small for non-indexed event parameters.`
          ].join("\n"), {
            metaMessages: [
              `Params: (${formatAbiParams(params, { includeName: true })})`,
              `Data:   ${data} (${size3} bytes)`
            ],
            name: "DecodeLogDataMismatch"
          });
          Object.defineProperty(this, "abiItem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "params", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "size", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.abiItem = abiItem;
          this.data = data;
          this.params = params;
          this.size = size3;
        }
      };
      DecodeLogTopicsMismatch = class extends BaseError {
        constructor({ abiItem, param }) {
          super([
            `Expected a topic for indexed event parameter${param.name ? ` "${param.name}"` : ""} on event "${formatAbiItem(abiItem, { includeName: true })}".`
          ].join("\n"), { name: "DecodeLogTopicsMismatch" });
          Object.defineProperty(this, "abiItem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.abiItem = abiItem;
        }
      };
      InvalidAbiEncodingTypeError = class extends BaseError {
        constructor(type, { docsPath: docsPath6 }) {
          super([
            `Type "${type}" is not a valid encoding type.`,
            "Please provide a valid ABI type."
          ].join("\n"), { docsPath: docsPath6, name: "InvalidAbiEncodingType" });
        }
      };
      InvalidAbiDecodingTypeError = class extends BaseError {
        constructor(type, { docsPath: docsPath6 }) {
          super([
            `Type "${type}" is not a valid decoding type.`,
            "Please provide a valid ABI type."
          ].join("\n"), { docsPath: docsPath6, name: "InvalidAbiDecodingType" });
        }
      };
      InvalidArrayError = class extends BaseError {
        constructor(value) {
          super([`Value "${value}" is not a valid array.`].join("\n"), {
            name: "InvalidArrayError"
          });
        }
      };
      InvalidDefinitionTypeError = class extends BaseError {
        constructor(type) {
          super([
            `"${type}" is not a valid definition type.`,
            'Valid types: "function", "event", "error"'
          ].join("\n"), { name: "InvalidDefinitionTypeError" });
        }
      };
    }
  });

  // node_modules/viem/_esm/utils/abi/encodeAbiParameters.js
  function encodeAbiParameters(params, values) {
    if (params.length !== values.length)
      throw new AbiEncodingLengthMismatchError({
        expectedLength: params.length,
        givenLength: values.length
      });
    const preparedParams = prepareParams({
      params,
      values
    });
    const data = encodeParams(preparedParams);
    if (data.length === 0)
      return "0x";
    return data;
  }
  function prepareParams({ params, values }) {
    const preparedParams = [];
    for (let i = 0; i < params.length; i++) {
      preparedParams.push(prepareParam({ param: params[i], value: values[i] }));
    }
    return preparedParams;
  }
  function prepareParam({ param, value }) {
    const arrayComponents = getArrayComponents(param.type);
    if (arrayComponents) {
      const [length, type] = arrayComponents;
      return encodeArray(value, { length, param: { ...param, type } });
    }
    if (param.type === "tuple") {
      return encodeTuple(value, {
        param
      });
    }
    if (param.type === "address") {
      return encodeAddress(value);
    }
    if (param.type === "bool") {
      return encodeBool(value);
    }
    if (param.type.startsWith("uint") || param.type.startsWith("int")) {
      const signed = param.type.startsWith("int");
      return encodeNumber(value, { signed });
    }
    if (param.type.startsWith("bytes")) {
      return encodeBytes(value, { param });
    }
    if (param.type === "string") {
      return encodeString(value);
    }
    throw new InvalidAbiEncodingTypeError(param.type, {
      docsPath: "/docs/contract/encodeAbiParameters"
    });
  }
  function encodeParams(preparedParams) {
    let staticSize = 0;
    for (let i = 0; i < preparedParams.length; i++) {
      const { dynamic, encoded } = preparedParams[i];
      if (dynamic)
        staticSize += 32;
      else
        staticSize += size(encoded);
    }
    const staticParams = [];
    const dynamicParams = [];
    let dynamicSize = 0;
    for (let i = 0; i < preparedParams.length; i++) {
      const { dynamic, encoded } = preparedParams[i];
      if (dynamic) {
        staticParams.push(numberToHex(staticSize + dynamicSize, { size: 32 }));
        dynamicParams.push(encoded);
        dynamicSize += size(encoded);
      } else {
        staticParams.push(encoded);
      }
    }
    return concat([...staticParams, ...dynamicParams]);
  }
  function encodeAddress(value) {
    if (!isAddress(value))
      throw new InvalidAddressError({ address: value });
    return { dynamic: false, encoded: padHex(value.toLowerCase()) };
  }
  function encodeArray(value, { length, param }) {
    const dynamic = length === null;
    if (!Array.isArray(value))
      throw new InvalidArrayError(value);
    if (!dynamic && value.length !== length)
      throw new AbiEncodingArrayLengthMismatchError({
        expectedLength: length,
        givenLength: value.length,
        type: `${param.type}[${length}]`
      });
    let dynamicChild = false;
    const preparedParams = [];
    for (let i = 0; i < value.length; i++) {
      const preparedParam = prepareParam({ param, value: value[i] });
      if (preparedParam.dynamic)
        dynamicChild = true;
      preparedParams.push(preparedParam);
    }
    if (dynamic || dynamicChild) {
      const data = encodeParams(preparedParams);
      if (dynamic) {
        const length2 = numberToHex(preparedParams.length, { size: 32 });
        return {
          dynamic: true,
          encoded: preparedParams.length > 0 ? concat([length2, data]) : length2
        };
      }
      if (dynamicChild)
        return { dynamic: true, encoded: data };
    }
    return {
      dynamic: false,
      encoded: concat(preparedParams.map(({ encoded }) => encoded))
    };
  }
  function encodeBytes(value, { param }) {
    const [, paramSize] = param.type.split("bytes");
    const bytesSize = size(value);
    if (!paramSize) {
      let value_ = value;
      if (bytesSize % 32 !== 0)
        value_ = padHex(value_, {
          dir: "right",
          size: Math.ceil((value.length - 2) / 2 / 32) * 32
        });
      return {
        dynamic: true,
        encoded: concat([padHex(numberToHex(bytesSize, { size: 32 })), value_])
      };
    }
    if (bytesSize !== Number.parseInt(paramSize))
      throw new AbiEncodingBytesSizeMismatchError({
        expectedSize: Number.parseInt(paramSize),
        value
      });
    return { dynamic: false, encoded: padHex(value, { dir: "right" }) };
  }
  function encodeBool(value) {
    if (typeof value !== "boolean")
      throw new BaseError(`Invalid boolean value: "${value}" (type: ${typeof value}). Expected: \`true\` or \`false\`.`);
    return { dynamic: false, encoded: padHex(boolToHex(value)) };
  }
  function encodeNumber(value, { signed }) {
    return {
      dynamic: false,
      encoded: numberToHex(value, {
        size: 32,
        signed
      })
    };
  }
  function encodeString(value) {
    const hexValue = stringToHex(value);
    const partsLength = Math.ceil(size(hexValue) / 32);
    const parts = [];
    for (let i = 0; i < partsLength; i++) {
      parts.push(padHex(slice(hexValue, i * 32, (i + 1) * 32), {
        dir: "right"
      }));
    }
    return {
      dynamic: true,
      encoded: concat([
        padHex(numberToHex(size(hexValue), { size: 32 })),
        ...parts
      ])
    };
  }
  function encodeTuple(value, { param }) {
    let dynamic = false;
    const preparedParams = [];
    for (let i = 0; i < param.components.length; i++) {
      const param_ = param.components[i];
      const index2 = Array.isArray(value) ? i : param_.name;
      const preparedParam = prepareParam({
        param: param_,
        value: value[index2]
      });
      preparedParams.push(preparedParam);
      if (preparedParam.dynamic)
        dynamic = true;
    }
    return {
      dynamic,
      encoded: dynamic ? encodeParams(preparedParams) : concat(preparedParams.map(({ encoded }) => encoded))
    };
  }
  function getArrayComponents(type) {
    const matches = type.match(/^(.*)\[(\d+)?\]$/);
    return matches ? (
      // Return `null` if the array is dynamic.
      [matches[2] ? Number(matches[2]) : null, matches[1]]
    ) : void 0;
  }
  var init_encodeAbiParameters = __esm({
    "node_modules/viem/_esm/utils/abi/encodeAbiParameters.js"() {
      "use strict";
      init_abi();
      init_address();
      init_base();
      init_isAddress();
      init_concat();
      init_pad();
      init_size();
      init_slice();
      init_toHex();
    }
  });

  // node_modules/viem/_esm/utils/stringify.js
  var stringify;
  var init_stringify = __esm({
    "node_modules/viem/_esm/utils/stringify.js"() {
      "use strict";
      stringify = (value, replacer, space) => JSON.stringify(value, (key, value_) => {
        const value2 = typeof value_ === "bigint" ? value_.toString() : value_;
        return typeof replacer === "function" ? replacer(key, value2) : value2;
      }, space);
    }
  });

  // node_modules/viem/_esm/accounts/utils/parseAccount.js
  function parseAccount(account) {
    if (typeof account === "string")
      return { address: account, type: "json-rpc" };
    return account;
  }
  var init_parseAccount = __esm({
    "node_modules/viem/_esm/accounts/utils/parseAccount.js"() {
      "use strict";
    }
  });

  // node_modules/abitype/dist/esm/version.js
  var version2;
  var init_version2 = __esm({
    "node_modules/abitype/dist/esm/version.js"() {
      "use strict";
      version2 = "1.0.6";
    }
  });

  // node_modules/abitype/dist/esm/errors.js
  var BaseError2;
  var init_errors = __esm({
    "node_modules/abitype/dist/esm/errors.js"() {
      "use strict";
      init_version2();
      BaseError2 = class _BaseError extends Error {
        constructor(shortMessage, args = {}) {
          const details = args.cause instanceof _BaseError ? args.cause.details : args.cause?.message ? args.cause.message : args.details;
          const docsPath6 = args.cause instanceof _BaseError ? args.cause.docsPath || args.docsPath : args.docsPath;
          const message = [
            shortMessage || "An error occurred.",
            "",
            ...args.metaMessages ? [...args.metaMessages, ""] : [],
            ...docsPath6 ? [`Docs: https://abitype.dev${docsPath6}`] : [],
            ...details ? [`Details: ${details}`] : [],
            `Version: abitype@${version2}`
          ].join("\n");
          super(message);
          Object.defineProperty(this, "details", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "docsPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "metaMessages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "shortMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "AbiTypeError"
          });
          if (args.cause)
            this.cause = args.cause;
          this.details = details;
          this.docsPath = docsPath6;
          this.metaMessages = args.metaMessages;
          this.shortMessage = shortMessage;
        }
      };
    }
  });

  // node_modules/abitype/dist/esm/regex.js
  function execTyped(regex, string) {
    const match = regex.exec(string);
    return match?.groups;
  }
  var bytesRegex2, integerRegex2, isTupleRegex;
  var init_regex = __esm({
    "node_modules/abitype/dist/esm/regex.js"() {
      "use strict";
      bytesRegex2 = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
      integerRegex2 = /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
      isTupleRegex = /^\(.+?\).*?$/;
    }
  });

  // node_modules/abitype/dist/esm/human-readable/formatAbiParameter.js
  function formatAbiParameter(abiParameter) {
    let type = abiParameter.type;
    if (tupleRegex.test(abiParameter.type) && "components" in abiParameter) {
      type = "(";
      const length = abiParameter.components.length;
      for (let i = 0; i < length; i++) {
        const component = abiParameter.components[i];
        type += formatAbiParameter(component);
        if (i < length - 1)
          type += ", ";
      }
      const result = execTyped(tupleRegex, abiParameter.type);
      type += `)${result?.array ?? ""}`;
      return formatAbiParameter({
        ...abiParameter,
        type
      });
    }
    if ("indexed" in abiParameter && abiParameter.indexed)
      type = `${type} indexed`;
    if (abiParameter.name)
      return `${type} ${abiParameter.name}`;
    return type;
  }
  var tupleRegex;
  var init_formatAbiParameter = __esm({
    "node_modules/abitype/dist/esm/human-readable/formatAbiParameter.js"() {
      "use strict";
      init_regex();
      tupleRegex = /^tuple(?<array>(\[(\d*)\])*)$/;
    }
  });

  // node_modules/abitype/dist/esm/human-readable/formatAbiParameters.js
  function formatAbiParameters(abiParameters) {
    let params = "";
    const length = abiParameters.length;
    for (let i = 0; i < length; i++) {
      const abiParameter = abiParameters[i];
      params += formatAbiParameter(abiParameter);
      if (i !== length - 1)
        params += ", ";
    }
    return params;
  }
  var init_formatAbiParameters = __esm({
    "node_modules/abitype/dist/esm/human-readable/formatAbiParameters.js"() {
      "use strict";
      init_formatAbiParameter();
    }
  });

  // node_modules/abitype/dist/esm/human-readable/formatAbiItem.js
  function formatAbiItem2(abiItem) {
    if (abiItem.type === "function")
      return `function ${abiItem.name}(${formatAbiParameters(abiItem.inputs)})${abiItem.stateMutability && abiItem.stateMutability !== "nonpayable" ? ` ${abiItem.stateMutability}` : ""}${abiItem.outputs.length ? ` returns (${formatAbiParameters(abiItem.outputs)})` : ""}`;
    if (abiItem.type === "event")
      return `event ${abiItem.name}(${formatAbiParameters(abiItem.inputs)})`;
    if (abiItem.type === "error")
      return `error ${abiItem.name}(${formatAbiParameters(abiItem.inputs)})`;
    if (abiItem.type === "constructor")
      return `constructor(${formatAbiParameters(abiItem.inputs)})${abiItem.stateMutability === "payable" ? " payable" : ""}`;
    if (abiItem.type === "fallback")
      return "fallback()";
    return "receive() external payable";
  }
  var init_formatAbiItem2 = __esm({
    "node_modules/abitype/dist/esm/human-readable/formatAbiItem.js"() {
      "use strict";
      init_formatAbiParameters();
    }
  });

  // node_modules/abitype/dist/esm/human-readable/runtime/signatures.js
  function isErrorSignature(signature) {
    return errorSignatureRegex.test(signature);
  }
  function execErrorSignature(signature) {
    return execTyped(errorSignatureRegex, signature);
  }
  function isEventSignature(signature) {
    return eventSignatureRegex.test(signature);
  }
  function execEventSignature(signature) {
    return execTyped(eventSignatureRegex, signature);
  }
  function isFunctionSignature(signature) {
    return functionSignatureRegex.test(signature);
  }
  function execFunctionSignature(signature) {
    return execTyped(functionSignatureRegex, signature);
  }
  function isStructSignature(signature) {
    return structSignatureRegex.test(signature);
  }
  function execStructSignature(signature) {
    return execTyped(structSignatureRegex, signature);
  }
  function isConstructorSignature(signature) {
    return constructorSignatureRegex.test(signature);
  }
  function execConstructorSignature(signature) {
    return execTyped(constructorSignatureRegex, signature);
  }
  function isFallbackSignature(signature) {
    return fallbackSignatureRegex.test(signature);
  }
  function isReceiveSignature(signature) {
    return receiveSignatureRegex.test(signature);
  }
  var errorSignatureRegex, eventSignatureRegex, functionSignatureRegex, structSignatureRegex, constructorSignatureRegex, fallbackSignatureRegex, receiveSignatureRegex, eventModifiers, functionModifiers;
  var init_signatures = __esm({
    "node_modules/abitype/dist/esm/human-readable/runtime/signatures.js"() {
      "use strict";
      init_regex();
      errorSignatureRegex = /^error (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
      eventSignatureRegex = /^event (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
      functionSignatureRegex = /^function (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)(?: (?<scope>external|public{1}))?(?: (?<stateMutability>pure|view|nonpayable|payable{1}))?(?: returns\s?\((?<returns>.*?)\))?$/;
      structSignatureRegex = /^struct (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*) \{(?<properties>.*?)\}$/;
      constructorSignatureRegex = /^constructor\((?<parameters>.*?)\)(?:\s(?<stateMutability>payable{1}))?$/;
      fallbackSignatureRegex = /^fallback\(\) external(?:\s(?<stateMutability>payable{1}))?$/;
      receiveSignatureRegex = /^receive\(\) external payable$/;
      eventModifiers = /* @__PURE__ */ new Set(["indexed"]);
      functionModifiers = /* @__PURE__ */ new Set([
        "calldata",
        "memory",
        "storage"
      ]);
    }
  });

  // node_modules/abitype/dist/esm/human-readable/errors/abiItem.js
  var UnknownTypeError, UnknownSolidityTypeError;
  var init_abiItem = __esm({
    "node_modules/abitype/dist/esm/human-readable/errors/abiItem.js"() {
      "use strict";
      init_errors();
      UnknownTypeError = class extends BaseError2 {
        constructor({ type }) {
          super("Unknown type.", {
            metaMessages: [
              `Type "${type}" is not a valid ABI type. Perhaps you forgot to include a struct signature?`
            ]
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "UnknownTypeError"
          });
        }
      };
      UnknownSolidityTypeError = class extends BaseError2 {
        constructor({ type }) {
          super("Unknown type.", {
            metaMessages: [`Type "${type}" is not a valid ABI type.`]
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "UnknownSolidityTypeError"
          });
        }
      };
    }
  });

  // node_modules/abitype/dist/esm/human-readable/errors/abiParameter.js
  var InvalidParameterError, SolidityProtectedKeywordError, InvalidModifierError, InvalidFunctionModifierError, InvalidAbiTypeParameterError;
  var init_abiParameter = __esm({
    "node_modules/abitype/dist/esm/human-readable/errors/abiParameter.js"() {
      "use strict";
      init_errors();
      InvalidParameterError = class extends BaseError2 {
        constructor({ param }) {
          super("Invalid ABI parameter.", {
            details: param
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "InvalidParameterError"
          });
        }
      };
      SolidityProtectedKeywordError = class extends BaseError2 {
        constructor({ param, name }) {
          super("Invalid ABI parameter.", {
            details: param,
            metaMessages: [
              `"${name}" is a protected Solidity keyword. More info: https://docs.soliditylang.org/en/latest/cheatsheet.html`
            ]
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "SolidityProtectedKeywordError"
          });
        }
      };
      InvalidModifierError = class extends BaseError2 {
        constructor({ param, type, modifier }) {
          super("Invalid ABI parameter.", {
            details: param,
            metaMessages: [
              `Modifier "${modifier}" not allowed${type ? ` in "${type}" type` : ""}.`
            ]
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "InvalidModifierError"
          });
        }
      };
      InvalidFunctionModifierError = class extends BaseError2 {
        constructor({ param, type, modifier }) {
          super("Invalid ABI parameter.", {
            details: param,
            metaMessages: [
              `Modifier "${modifier}" not allowed${type ? ` in "${type}" type` : ""}.`,
              `Data location can only be specified for array, struct, or mapping types, but "${modifier}" was given.`
            ]
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "InvalidFunctionModifierError"
          });
        }
      };
      InvalidAbiTypeParameterError = class extends BaseError2 {
        constructor({ abiParameter }) {
          super("Invalid ABI parameter.", {
            details: JSON.stringify(abiParameter, null, 2),
            metaMessages: ["ABI parameter type is invalid."]
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "InvalidAbiTypeParameterError"
          });
        }
      };
    }
  });

  // node_modules/abitype/dist/esm/human-readable/errors/signature.js
  var InvalidSignatureError, UnknownSignatureError, InvalidStructSignatureError;
  var init_signature = __esm({
    "node_modules/abitype/dist/esm/human-readable/errors/signature.js"() {
      "use strict";
      init_errors();
      InvalidSignatureError = class extends BaseError2 {
        constructor({ signature, type }) {
          super(`Invalid ${type} signature.`, {
            details: signature
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "InvalidSignatureError"
          });
        }
      };
      UnknownSignatureError = class extends BaseError2 {
        constructor({ signature }) {
          super("Unknown signature.", {
            details: signature
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "UnknownSignatureError"
          });
        }
      };
      InvalidStructSignatureError = class extends BaseError2 {
        constructor({ signature }) {
          super("Invalid struct signature.", {
            details: signature,
            metaMessages: ["No properties exist."]
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "InvalidStructSignatureError"
          });
        }
      };
    }
  });

  // node_modules/abitype/dist/esm/human-readable/errors/struct.js
  var CircularReferenceError;
  var init_struct = __esm({
    "node_modules/abitype/dist/esm/human-readable/errors/struct.js"() {
      "use strict";
      init_errors();
      CircularReferenceError = class extends BaseError2 {
        constructor({ type }) {
          super("Circular reference detected.", {
            metaMessages: [`Struct "${type}" is a circular reference.`]
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "CircularReferenceError"
          });
        }
      };
    }
  });

  // node_modules/abitype/dist/esm/human-readable/errors/splitParameters.js
  var InvalidParenthesisError;
  var init_splitParameters = __esm({
    "node_modules/abitype/dist/esm/human-readable/errors/splitParameters.js"() {
      "use strict";
      init_errors();
      InvalidParenthesisError = class extends BaseError2 {
        constructor({ current, depth }) {
          super("Unbalanced parentheses.", {
            metaMessages: [
              `"${current.trim()}" has too many ${depth > 0 ? "opening" : "closing"} parentheses.`
            ],
            details: `Depth "${depth}"`
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "InvalidParenthesisError"
          });
        }
      };
    }
  });

  // node_modules/abitype/dist/esm/human-readable/runtime/cache.js
  function getParameterCacheKey(param, type) {
    if (type)
      return `${type}:${param}`;
    return param;
  }
  var parameterCache;
  var init_cache = __esm({
    "node_modules/abitype/dist/esm/human-readable/runtime/cache.js"() {
      "use strict";
      parameterCache = /* @__PURE__ */ new Map([
        // Unnamed
        ["address", { type: "address" }],
        ["bool", { type: "bool" }],
        ["bytes", { type: "bytes" }],
        ["bytes32", { type: "bytes32" }],
        ["int", { type: "int256" }],
        ["int256", { type: "int256" }],
        ["string", { type: "string" }],
        ["uint", { type: "uint256" }],
        ["uint8", { type: "uint8" }],
        ["uint16", { type: "uint16" }],
        ["uint24", { type: "uint24" }],
        ["uint32", { type: "uint32" }],
        ["uint64", { type: "uint64" }],
        ["uint96", { type: "uint96" }],
        ["uint112", { type: "uint112" }],
        ["uint160", { type: "uint160" }],
        ["uint192", { type: "uint192" }],
        ["uint256", { type: "uint256" }],
        // Named
        ["address owner", { type: "address", name: "owner" }],
        ["address to", { type: "address", name: "to" }],
        ["bool approved", { type: "bool", name: "approved" }],
        ["bytes _data", { type: "bytes", name: "_data" }],
        ["bytes data", { type: "bytes", name: "data" }],
        ["bytes signature", { type: "bytes", name: "signature" }],
        ["bytes32 hash", { type: "bytes32", name: "hash" }],
        ["bytes32 r", { type: "bytes32", name: "r" }],
        ["bytes32 root", { type: "bytes32", name: "root" }],
        ["bytes32 s", { type: "bytes32", name: "s" }],
        ["string name", { type: "string", name: "name" }],
        ["string symbol", { type: "string", name: "symbol" }],
        ["string tokenURI", { type: "string", name: "tokenURI" }],
        ["uint tokenId", { type: "uint256", name: "tokenId" }],
        ["uint8 v", { type: "uint8", name: "v" }],
        ["uint256 balance", { type: "uint256", name: "balance" }],
        ["uint256 tokenId", { type: "uint256", name: "tokenId" }],
        ["uint256 value", { type: "uint256", name: "value" }],
        // Indexed
        [
          "event:address indexed from",
          { type: "address", name: "from", indexed: true }
        ],
        ["event:address indexed to", { type: "address", name: "to", indexed: true }],
        [
          "event:uint indexed tokenId",
          { type: "uint256", name: "tokenId", indexed: true }
        ],
        [
          "event:uint256 indexed tokenId",
          { type: "uint256", name: "tokenId", indexed: true }
        ]
      ]);
    }
  });

  // node_modules/abitype/dist/esm/human-readable/runtime/utils.js
  function parseSignature(signature, structs = {}) {
    if (isFunctionSignature(signature)) {
      const match = execFunctionSignature(signature);
      if (!match)
        throw new InvalidSignatureError({ signature, type: "function" });
      const inputParams = splitParameters(match.parameters);
      const inputs = [];
      const inputLength = inputParams.length;
      for (let i = 0; i < inputLength; i++) {
        inputs.push(parseAbiParameter(inputParams[i], {
          modifiers: functionModifiers,
          structs,
          type: "function"
        }));
      }
      const outputs = [];
      if (match.returns) {
        const outputParams = splitParameters(match.returns);
        const outputLength = outputParams.length;
        for (let i = 0; i < outputLength; i++) {
          outputs.push(parseAbiParameter(outputParams[i], {
            modifiers: functionModifiers,
            structs,
            type: "function"
          }));
        }
      }
      return {
        name: match.name,
        type: "function",
        stateMutability: match.stateMutability ?? "nonpayable",
        inputs,
        outputs
      };
    }
    if (isEventSignature(signature)) {
      const match = execEventSignature(signature);
      if (!match)
        throw new InvalidSignatureError({ signature, type: "event" });
      const params = splitParameters(match.parameters);
      const abiParameters = [];
      const length = params.length;
      for (let i = 0; i < length; i++) {
        abiParameters.push(parseAbiParameter(params[i], {
          modifiers: eventModifiers,
          structs,
          type: "event"
        }));
      }
      return { name: match.name, type: "event", inputs: abiParameters };
    }
    if (isErrorSignature(signature)) {
      const match = execErrorSignature(signature);
      if (!match)
        throw new InvalidSignatureError({ signature, type: "error" });
      const params = splitParameters(match.parameters);
      const abiParameters = [];
      const length = params.length;
      for (let i = 0; i < length; i++) {
        abiParameters.push(parseAbiParameter(params[i], { structs, type: "error" }));
      }
      return { name: match.name, type: "error", inputs: abiParameters };
    }
    if (isConstructorSignature(signature)) {
      const match = execConstructorSignature(signature);
      if (!match)
        throw new InvalidSignatureError({ signature, type: "constructor" });
      const params = splitParameters(match.parameters);
      const abiParameters = [];
      const length = params.length;
      for (let i = 0; i < length; i++) {
        abiParameters.push(parseAbiParameter(params[i], { structs, type: "constructor" }));
      }
      return {
        type: "constructor",
        stateMutability: match.stateMutability ?? "nonpayable",
        inputs: abiParameters
      };
    }
    if (isFallbackSignature(signature))
      return { type: "fallback" };
    if (isReceiveSignature(signature))
      return {
        type: "receive",
        stateMutability: "payable"
      };
    throw new UnknownSignatureError({ signature });
  }
  function parseAbiParameter(param, options) {
    const parameterCacheKey = getParameterCacheKey(param, options?.type);
    if (parameterCache.has(parameterCacheKey))
      return parameterCache.get(parameterCacheKey);
    const isTuple = isTupleRegex.test(param);
    const match = execTyped(isTuple ? abiParameterWithTupleRegex : abiParameterWithoutTupleRegex, param);
    if (!match)
      throw new InvalidParameterError({ param });
    if (match.name && isSolidityKeyword(match.name))
      throw new SolidityProtectedKeywordError({ param, name: match.name });
    const name = match.name ? { name: match.name } : {};
    const indexed = match.modifier === "indexed" ? { indexed: true } : {};
    const structs = options?.structs ?? {};
    let type;
    let components = {};
    if (isTuple) {
      type = "tuple";
      const params = splitParameters(match.type);
      const components_ = [];
      const length = params.length;
      for (let i = 0; i < length; i++) {
        components_.push(parseAbiParameter(params[i], { structs }));
      }
      components = { components: components_ };
    } else if (match.type in structs) {
      type = "tuple";
      components = { components: structs[match.type] };
    } else if (dynamicIntegerRegex.test(match.type)) {
      type = `${match.type}256`;
    } else {
      type = match.type;
      if (!(options?.type === "struct") && !isSolidityType(type))
        throw new UnknownSolidityTypeError({ type });
    }
    if (match.modifier) {
      if (!options?.modifiers?.has?.(match.modifier))
        throw new InvalidModifierError({
          param,
          type: options?.type,
          modifier: match.modifier
        });
      if (functionModifiers.has(match.modifier) && !isValidDataLocation(type, !!match.array))
        throw new InvalidFunctionModifierError({
          param,
          type: options?.type,
          modifier: match.modifier
        });
    }
    const abiParameter = {
      type: `${type}${match.array ?? ""}`,
      ...name,
      ...indexed,
      ...components
    };
    parameterCache.set(parameterCacheKey, abiParameter);
    return abiParameter;
  }
  function splitParameters(params, result = [], current = "", depth = 0) {
    const length = params.trim().length;
    for (let i = 0; i < length; i++) {
      const char = params[i];
      const tail = params.slice(i + 1);
      switch (char) {
        case ",":
          return depth === 0 ? splitParameters(tail, [...result, current.trim()]) : splitParameters(tail, result, `${current}${char}`, depth);
        case "(":
          return splitParameters(tail, result, `${current}${char}`, depth + 1);
        case ")":
          return splitParameters(tail, result, `${current}${char}`, depth - 1);
        default:
          return splitParameters(tail, result, `${current}${char}`, depth);
      }
    }
    if (current === "")
      return result;
    if (depth !== 0)
      throw new InvalidParenthesisError({ current, depth });
    result.push(current.trim());
    return result;
  }
  function isSolidityType(type) {
    return type === "address" || type === "bool" || type === "function" || type === "string" || bytesRegex2.test(type) || integerRegex2.test(type);
  }
  function isSolidityKeyword(name) {
    return name === "address" || name === "bool" || name === "function" || name === "string" || name === "tuple" || bytesRegex2.test(name) || integerRegex2.test(name) || protectedKeywordsRegex.test(name);
  }
  function isValidDataLocation(type, isArray3) {
    return isArray3 || type === "bytes" || type === "string" || type === "tuple";
  }
  var abiParameterWithoutTupleRegex, abiParameterWithTupleRegex, dynamicIntegerRegex, protectedKeywordsRegex;
  var init_utils3 = __esm({
    "node_modules/abitype/dist/esm/human-readable/runtime/utils.js"() {
      "use strict";
      init_regex();
      init_abiItem();
      init_abiParameter();
      init_signature();
      init_splitParameters();
      init_cache();
      init_signatures();
      abiParameterWithoutTupleRegex = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/;
      abiParameterWithTupleRegex = /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/;
      dynamicIntegerRegex = /^u?int$/;
      protectedKeywordsRegex = /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;
    }
  });

  // node_modules/abitype/dist/esm/human-readable/runtime/structs.js
  function parseStructs(signatures) {
    const shallowStructs = {};
    const signaturesLength = signatures.length;
    for (let i = 0; i < signaturesLength; i++) {
      const signature = signatures[i];
      if (!isStructSignature(signature))
        continue;
      const match = execStructSignature(signature);
      if (!match)
        throw new InvalidSignatureError({ signature, type: "struct" });
      const properties = match.properties.split(";");
      const components = [];
      const propertiesLength = properties.length;
      for (let k = 0; k < propertiesLength; k++) {
        const property = properties[k];
        const trimmed = property.trim();
        if (!trimmed)
          continue;
        const abiParameter = parseAbiParameter(trimmed, {
          type: "struct"
        });
        components.push(abiParameter);
      }
      if (!components.length)
        throw new InvalidStructSignatureError({ signature });
      shallowStructs[match.name] = components;
    }
    const resolvedStructs = {};
    const entries = Object.entries(shallowStructs);
    const entriesLength = entries.length;
    for (let i = 0; i < entriesLength; i++) {
      const [name, parameters] = entries[i];
      resolvedStructs[name] = resolveStructs(parameters, shallowStructs);
    }
    return resolvedStructs;
  }
  function resolveStructs(abiParameters, structs, ancestors = /* @__PURE__ */ new Set()) {
    const components = [];
    const length = abiParameters.length;
    for (let i = 0; i < length; i++) {
      const abiParameter = abiParameters[i];
      const isTuple = isTupleRegex.test(abiParameter.type);
      if (isTuple)
        components.push(abiParameter);
      else {
        const match = execTyped(typeWithoutTupleRegex, abiParameter.type);
        if (!match?.type)
          throw new InvalidAbiTypeParameterError({ abiParameter });
        const { array, type } = match;
        if (type in structs) {
          if (ancestors.has(type))
            throw new CircularReferenceError({ type });
          components.push({
            ...abiParameter,
            type: `tuple${array ?? ""}`,
            components: resolveStructs(structs[type] ?? [], structs, /* @__PURE__ */ new Set([...ancestors, type]))
          });
        } else {
          if (isSolidityType(type))
            components.push(abiParameter);
          else
            throw new UnknownTypeError({ type });
        }
      }
    }
    return components;
  }
  var typeWithoutTupleRegex;
  var init_structs = __esm({
    "node_modules/abitype/dist/esm/human-readable/runtime/structs.js"() {
      "use strict";
      init_regex();
      init_abiItem();
      init_abiParameter();
      init_signature();
      init_struct();
      init_signatures();
      init_utils3();
      typeWithoutTupleRegex = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?$/;
    }
  });

  // node_modules/abitype/dist/esm/human-readable/parseAbi.js
  function parseAbi(signatures) {
    const structs = parseStructs(signatures);
    const abi2 = [];
    const length = signatures.length;
    for (let i = 0; i < length; i++) {
      const signature = signatures[i];
      if (isStructSignature(signature))
        continue;
      abi2.push(parseSignature(signature, structs));
    }
    return abi2;
  }
  var init_parseAbi = __esm({
    "node_modules/abitype/dist/esm/human-readable/parseAbi.js"() {
      "use strict";
      init_signatures();
      init_structs();
      init_utils3();
    }
  });

  // node_modules/abitype/dist/esm/exports/index.js
  var init_exports = __esm({
    "node_modules/abitype/dist/esm/exports/index.js"() {
      "use strict";
      init_formatAbiItem2();
      init_parseAbi();
    }
  });

  // node_modules/viem/_esm/utils/hash/hashSignature.js
  function hashSignature(sig) {
    return hash2(sig);
  }
  var hash2;
  var init_hashSignature = __esm({
    "node_modules/viem/_esm/utils/hash/hashSignature.js"() {
      "use strict";
      init_toBytes();
      init_keccak256();
      hash2 = (value) => keccak256(toBytes2(value));
    }
  });

  // node_modules/viem/_esm/utils/hash/normalizeSignature.js
  function normalizeSignature(signature) {
    let active = true;
    let current = "";
    let level = 0;
    let result = "";
    let valid = false;
    for (let i = 0; i < signature.length; i++) {
      const char = signature[i];
      if (["(", ")", ","].includes(char))
        active = true;
      if (char === "(")
        level++;
      if (char === ")")
        level--;
      if (!active)
        continue;
      if (level === 0) {
        if (char === " " && ["event", "function", ""].includes(result))
          result = "";
        else {
          result += char;
          if (char === ")") {
            valid = true;
            break;
          }
        }
        continue;
      }
      if (char === " ") {
        if (signature[i - 1] !== "," && current !== "," && current !== ",(") {
          current = "";
          active = false;
        }
        continue;
      }
      result += char;
      current += char;
    }
    if (!valid)
      throw new BaseError("Unable to normalize signature.");
    return result;
  }
  var init_normalizeSignature = __esm({
    "node_modules/viem/_esm/utils/hash/normalizeSignature.js"() {
      "use strict";
      init_base();
    }
  });

  // node_modules/viem/_esm/utils/hash/toSignature.js
  var toSignature;
  var init_toSignature = __esm({
    "node_modules/viem/_esm/utils/hash/toSignature.js"() {
      "use strict";
      init_exports();
      init_normalizeSignature();
      toSignature = (def) => {
        const def_ = (() => {
          if (typeof def === "string")
            return def;
          return formatAbiItem2(def);
        })();
        return normalizeSignature(def_);
      };
    }
  });

  // node_modules/viem/_esm/utils/hash/toSignatureHash.js
  function toSignatureHash(fn) {
    return hashSignature(toSignature(fn));
  }
  var init_toSignatureHash = __esm({
    "node_modules/viem/_esm/utils/hash/toSignatureHash.js"() {
      "use strict";
      init_hashSignature();
      init_toSignature();
    }
  });

  // node_modules/viem/_esm/utils/hash/toEventSelector.js
  var toEventSelector;
  var init_toEventSelector = __esm({
    "node_modules/viem/_esm/utils/hash/toEventSelector.js"() {
      "use strict";
      init_toSignatureHash();
      toEventSelector = toSignatureHash;
    }
  });

  // node_modules/viem/_esm/utils/hash/toFunctionSelector.js
  var toFunctionSelector;
  var init_toFunctionSelector = __esm({
    "node_modules/viem/_esm/utils/hash/toFunctionSelector.js"() {
      "use strict";
      init_slice();
      init_toSignatureHash();
      toFunctionSelector = (fn) => slice(toSignatureHash(fn), 0, 4);
    }
  });

  // node_modules/viem/_esm/utils/abi/getAbiItem.js
  function getAbiItem(parameters) {
    const { abi: abi2, args = [], name } = parameters;
    const isSelector = isHex(name, { strict: false });
    const abiItems = abi2.filter((abiItem) => {
      if (isSelector) {
        if (abiItem.type === "function")
          return toFunctionSelector(abiItem) === name;
        if (abiItem.type === "event")
          return toEventSelector(abiItem) === name;
        return false;
      }
      return "name" in abiItem && abiItem.name === name;
    });
    if (abiItems.length === 0)
      return void 0;
    if (abiItems.length === 1)
      return abiItems[0];
    let matchedAbiItem = void 0;
    for (const abiItem of abiItems) {
      if (!("inputs" in abiItem))
        continue;
      if (!args || args.length === 0) {
        if (!abiItem.inputs || abiItem.inputs.length === 0)
          return abiItem;
        continue;
      }
      if (!abiItem.inputs)
        continue;
      if (abiItem.inputs.length === 0)
        continue;
      if (abiItem.inputs.length !== args.length)
        continue;
      const matched = args.every((arg, index2) => {
        const abiParameter = "inputs" in abiItem && abiItem.inputs[index2];
        if (!abiParameter)
          return false;
        return isArgOfType(arg, abiParameter);
      });
      if (matched) {
        if (matchedAbiItem && "inputs" in matchedAbiItem && matchedAbiItem.inputs) {
          const ambiguousTypes = getAmbiguousTypes(abiItem.inputs, matchedAbiItem.inputs, args);
          if (ambiguousTypes)
            throw new AbiItemAmbiguityError({
              abiItem,
              type: ambiguousTypes[0]
            }, {
              abiItem: matchedAbiItem,
              type: ambiguousTypes[1]
            });
        }
        matchedAbiItem = abiItem;
      }
    }
    if (matchedAbiItem)
      return matchedAbiItem;
    return abiItems[0];
  }
  function isArgOfType(arg, abiParameter) {
    const argType = typeof arg;
    const abiParameterType = abiParameter.type;
    switch (abiParameterType) {
      case "address":
        return isAddress(arg, { strict: false });
      case "bool":
        return argType === "boolean";
      case "function":
        return argType === "string";
      case "string":
        return argType === "string";
      default: {
        if (abiParameterType === "tuple" && "components" in abiParameter)
          return Object.values(abiParameter.components).every((component, index2) => {
            return isArgOfType(Object.values(arg)[index2], component);
          });
        if (/^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(abiParameterType))
          return argType === "number" || argType === "bigint";
        if (/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(abiParameterType))
          return argType === "string" || arg instanceof Uint8Array;
        if (/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(abiParameterType)) {
          return Array.isArray(arg) && arg.every((x) => isArgOfType(x, {
            ...abiParameter,
            // Pop off `[]` or `[M]` from end of type
            type: abiParameterType.replace(/(\[[0-9]{0,}\])$/, "")
          }));
        }
        return false;
      }
    }
  }
  function getAmbiguousTypes(sourceParameters, targetParameters, args) {
    for (const parameterIndex in sourceParameters) {
      const sourceParameter = sourceParameters[parameterIndex];
      const targetParameter = targetParameters[parameterIndex];
      if (sourceParameter.type === "tuple" && targetParameter.type === "tuple" && "components" in sourceParameter && "components" in targetParameter)
        return getAmbiguousTypes(sourceParameter.components, targetParameter.components, args[parameterIndex]);
      const types = [sourceParameter.type, targetParameter.type];
      const ambiguous = (() => {
        if (types.includes("address") && types.includes("bytes20"))
          return true;
        if (types.includes("address") && types.includes("string"))
          return isAddress(args[parameterIndex], { strict: false });
        if (types.includes("address") && types.includes("bytes"))
          return isAddress(args[parameterIndex], { strict: false });
        return false;
      })();
      if (ambiguous)
        return types;
    }
    return;
  }
  var init_getAbiItem = __esm({
    "node_modules/viem/_esm/utils/abi/getAbiItem.js"() {
      "use strict";
      init_abi();
      init_isHex();
      init_isAddress();
      init_toEventSelector();
      init_toFunctionSelector();
    }
  });

  // node_modules/viem/_esm/utils/abi/prepareEncodeFunctionData.js
  function prepareEncodeFunctionData(parameters) {
    const { abi: abi2, args, functionName } = parameters;
    let abiItem = abi2[0];
    if (functionName) {
      const item = getAbiItem({
        abi: abi2,
        args,
        name: functionName
      });
      if (!item)
        throw new AbiFunctionNotFoundError(functionName, { docsPath: docsPath2 });
      abiItem = item;
    }
    if (abiItem.type !== "function")
      throw new AbiFunctionNotFoundError(void 0, { docsPath: docsPath2 });
    return {
      abi: [abiItem],
      functionName: toFunctionSelector(formatAbiItem(abiItem))
    };
  }
  var docsPath2;
  var init_prepareEncodeFunctionData = __esm({
    "node_modules/viem/_esm/utils/abi/prepareEncodeFunctionData.js"() {
      "use strict";
      init_abi();
      init_toFunctionSelector();
      init_formatAbiItem();
      init_getAbiItem();
      docsPath2 = "/docs/contract/encodeFunctionData";
    }
  });

  // node_modules/viem/_esm/utils/abi/encodeFunctionData.js
  function encodeFunctionData(parameters) {
    const { args } = parameters;
    const { abi: abi2, functionName } = (() => {
      if (parameters.abi.length === 1 && parameters.functionName?.startsWith("0x"))
        return parameters;
      return prepareEncodeFunctionData(parameters);
    })();
    const abiItem = abi2[0];
    const signature = functionName;
    const data = "inputs" in abiItem && abiItem.inputs ? encodeAbiParameters(abiItem.inputs, args ?? []) : void 0;
    return concatHex([signature, data ?? "0x"]);
  }
  var init_encodeFunctionData = __esm({
    "node_modules/viem/_esm/utils/abi/encodeFunctionData.js"() {
      "use strict";
      init_concat();
      init_encodeAbiParameters();
      init_prepareEncodeFunctionData();
    }
  });

  // node_modules/viem/_esm/constants/solidity.js
  var panicReasons, solidityError, solidityPanic;
  var init_solidity = __esm({
    "node_modules/viem/_esm/constants/solidity.js"() {
      "use strict";
      panicReasons = {
        1: "An `assert` condition failed.",
        17: "Arithmetic operation resulted in underflow or overflow.",
        18: "Division or modulo by zero (e.g. `5 / 0` or `23 % 0`).",
        33: "Attempted to convert to an invalid type.",
        34: "Attempted to access a storage byte array that is incorrectly encoded.",
        49: "Performed `.pop()` on an empty array",
        50: "Array index is out of bounds.",
        65: "Allocated too much memory or created an array which is too large.",
        81: "Attempted to call a zero-initialized variable of internal function type."
      };
      solidityError = {
        inputs: [
          {
            name: "message",
            type: "string"
          }
        ],
        name: "Error",
        type: "error"
      };
      solidityPanic = {
        inputs: [
          {
            name: "reason",
            type: "uint256"
          }
        ],
        name: "Panic",
        type: "error"
      };
    }
  });

  // node_modules/viem/_esm/utils/encoding/fromBytes.js
  function bytesToBigInt(bytes2, opts = {}) {
    if (typeof opts.size !== "undefined")
      assertSize(bytes2, { size: opts.size });
    const hex = bytesToHex2(bytes2, opts);
    return hexToBigInt(hex, opts);
  }
  function bytesToBool(bytes_, opts = {}) {
    let bytes2 = bytes_;
    if (typeof opts.size !== "undefined") {
      assertSize(bytes2, { size: opts.size });
      bytes2 = trim(bytes2);
    }
    if (bytes2.length > 1 || bytes2[0] > 1)
      throw new InvalidBytesBooleanError(bytes2);
    return Boolean(bytes2[0]);
  }
  function bytesToNumber(bytes2, opts = {}) {
    if (typeof opts.size !== "undefined")
      assertSize(bytes2, { size: opts.size });
    const hex = bytesToHex2(bytes2, opts);
    return hexToNumber2(hex, opts);
  }
  function bytesToString(bytes_, opts = {}) {
    let bytes2 = bytes_;
    if (typeof opts.size !== "undefined") {
      assertSize(bytes2, { size: opts.size });
      bytes2 = trim(bytes2, { dir: "right" });
    }
    return new TextDecoder().decode(bytes2);
  }
  var init_fromBytes = __esm({
    "node_modules/viem/_esm/utils/encoding/fromBytes.js"() {
      "use strict";
      init_encoding();
      init_trim();
      init_fromHex();
      init_toHex();
    }
  });

  // node_modules/viem/_esm/utils/abi/decodeAbiParameters.js
  function decodeAbiParameters(params, data) {
    const bytes2 = typeof data === "string" ? hexToBytes2(data) : data;
    const cursor = createCursor(bytes2);
    if (size(bytes2) === 0 && params.length > 0)
      throw new AbiDecodingZeroDataError();
    if (size(data) && size(data) < 32)
      throw new AbiDecodingDataSizeTooSmallError({
        data: typeof data === "string" ? data : bytesToHex2(data),
        params,
        size: size(data)
      });
    let consumed = 0;
    const values = [];
    for (let i = 0; i < params.length; ++i) {
      const param = params[i];
      cursor.setPosition(consumed);
      const [data2, consumed_] = decodeParameter(cursor, param, {
        staticPosition: 0
      });
      consumed += consumed_;
      values.push(data2);
    }
    return values;
  }
  function decodeParameter(cursor, param, { staticPosition }) {
    const arrayComponents = getArrayComponents(param.type);
    if (arrayComponents) {
      const [length, type] = arrayComponents;
      return decodeArray(cursor, { ...param, type }, { length, staticPosition });
    }
    if (param.type === "tuple")
      return decodeTuple(cursor, param, { staticPosition });
    if (param.type === "address")
      return decodeAddress(cursor);
    if (param.type === "bool")
      return decodeBool(cursor);
    if (param.type.startsWith("bytes"))
      return decodeBytes(cursor, param, { staticPosition });
    if (param.type.startsWith("uint") || param.type.startsWith("int"))
      return decodeNumber(cursor, param);
    if (param.type === "string")
      return decodeString(cursor, { staticPosition });
    throw new InvalidAbiDecodingTypeError(param.type, {
      docsPath: "/docs/contract/decodeAbiParameters"
    });
  }
  function decodeAddress(cursor) {
    const value = cursor.readBytes(32);
    return [checksumAddress(bytesToHex2(sliceBytes(value, -20))), 32];
  }
  function decodeArray(cursor, param, { length, staticPosition }) {
    if (!length) {
      const offset = bytesToNumber(cursor.readBytes(sizeOfOffset));
      const start = staticPosition + offset;
      const startOfData = start + sizeOfLength;
      cursor.setPosition(start);
      const length2 = bytesToNumber(cursor.readBytes(sizeOfLength));
      const dynamicChild = hasDynamicChild(param);
      let consumed2 = 0;
      const value2 = [];
      for (let i = 0; i < length2; ++i) {
        cursor.setPosition(startOfData + (dynamicChild ? i * 32 : consumed2));
        const [data, consumed_] = decodeParameter(cursor, param, {
          staticPosition: startOfData
        });
        consumed2 += consumed_;
        value2.push(data);
      }
      cursor.setPosition(staticPosition + 32);
      return [value2, 32];
    }
    if (hasDynamicChild(param)) {
      const offset = bytesToNumber(cursor.readBytes(sizeOfOffset));
      const start = staticPosition + offset;
      const value2 = [];
      for (let i = 0; i < length; ++i) {
        cursor.setPosition(start + i * 32);
        const [data] = decodeParameter(cursor, param, {
          staticPosition: start
        });
        value2.push(data);
      }
      cursor.setPosition(staticPosition + 32);
      return [value2, 32];
    }
    let consumed = 0;
    const value = [];
    for (let i = 0; i < length; ++i) {
      const [data, consumed_] = decodeParameter(cursor, param, {
        staticPosition: staticPosition + consumed
      });
      consumed += consumed_;
      value.push(data);
    }
    return [value, consumed];
  }
  function decodeBool(cursor) {
    return [bytesToBool(cursor.readBytes(32), { size: 32 }), 32];
  }
  function decodeBytes(cursor, param, { staticPosition }) {
    const [_, size3] = param.type.split("bytes");
    if (!size3) {
      const offset = bytesToNumber(cursor.readBytes(32));
      cursor.setPosition(staticPosition + offset);
      const length = bytesToNumber(cursor.readBytes(32));
      if (length === 0) {
        cursor.setPosition(staticPosition + 32);
        return ["0x", 32];
      }
      const data = cursor.readBytes(length);
      cursor.setPosition(staticPosition + 32);
      return [bytesToHex2(data), 32];
    }
    const value = bytesToHex2(cursor.readBytes(Number.parseInt(size3), 32));
    return [value, 32];
  }
  function decodeNumber(cursor, param) {
    const signed = param.type.startsWith("int");
    const size3 = Number.parseInt(param.type.split("int")[1] || "256");
    const value = cursor.readBytes(32);
    return [
      size3 > 48 ? bytesToBigInt(value, { signed }) : bytesToNumber(value, { signed }),
      32
    ];
  }
  function decodeTuple(cursor, param, { staticPosition }) {
    const hasUnnamedChild = param.components.length === 0 || param.components.some(({ name }) => !name);
    const value = hasUnnamedChild ? [] : {};
    let consumed = 0;
    if (hasDynamicChild(param)) {
      const offset = bytesToNumber(cursor.readBytes(sizeOfOffset));
      const start = staticPosition + offset;
      for (let i = 0; i < param.components.length; ++i) {
        const component = param.components[i];
        cursor.setPosition(start + consumed);
        const [data, consumed_] = decodeParameter(cursor, component, {
          staticPosition: start
        });
        consumed += consumed_;
        value[hasUnnamedChild ? i : component?.name] = data;
      }
      cursor.setPosition(staticPosition + 32);
      return [value, 32];
    }
    for (let i = 0; i < param.components.length; ++i) {
      const component = param.components[i];
      const [data, consumed_] = decodeParameter(cursor, component, {
        staticPosition
      });
      value[hasUnnamedChild ? i : component?.name] = data;
      consumed += consumed_;
    }
    return [value, consumed];
  }
  function decodeString(cursor, { staticPosition }) {
    const offset = bytesToNumber(cursor.readBytes(32));
    const start = staticPosition + offset;
    cursor.setPosition(start);
    const length = bytesToNumber(cursor.readBytes(32));
    if (length === 0) {
      cursor.setPosition(staticPosition + 32);
      return ["", 32];
    }
    const data = cursor.readBytes(length, 32);
    const value = bytesToString(trim(data));
    cursor.setPosition(staticPosition + 32);
    return [value, 32];
  }
  function hasDynamicChild(param) {
    const { type } = param;
    if (type === "string")
      return true;
    if (type === "bytes")
      return true;
    if (type.endsWith("[]"))
      return true;
    if (type === "tuple")
      return param.components?.some(hasDynamicChild);
    const arrayComponents = getArrayComponents(param.type);
    if (arrayComponents && hasDynamicChild({ ...param, type: arrayComponents[1] }))
      return true;
    return false;
  }
  var sizeOfLength, sizeOfOffset;
  var init_decodeAbiParameters = __esm({
    "node_modules/viem/_esm/utils/abi/decodeAbiParameters.js"() {
      "use strict";
      init_abi();
      init_getAddress();
      init_cursor2();
      init_size();
      init_slice();
      init_trim();
      init_fromBytes();
      init_toBytes();
      init_toHex();
      init_encodeAbiParameters();
      sizeOfLength = 32;
      sizeOfOffset = 32;
    }
  });

  // node_modules/viem/_esm/utils/abi/decodeErrorResult.js
  function decodeErrorResult(parameters) {
    const { abi: abi2, data } = parameters;
    const signature = slice(data, 0, 4);
    if (signature === "0x")
      throw new AbiDecodingZeroDataError();
    const abi_ = [...abi2 || [], solidityError, solidityPanic];
    const abiItem = abi_.find((x) => x.type === "error" && signature === toFunctionSelector(formatAbiItem(x)));
    if (!abiItem)
      throw new AbiErrorSignatureNotFoundError(signature, {
        docsPath: "/docs/contract/decodeErrorResult"
      });
    return {
      abiItem,
      args: "inputs" in abiItem && abiItem.inputs && abiItem.inputs.length > 0 ? decodeAbiParameters(abiItem.inputs, slice(data, 4)) : void 0,
      errorName: abiItem.name
    };
  }
  var init_decodeErrorResult = __esm({
    "node_modules/viem/_esm/utils/abi/decodeErrorResult.js"() {
      "use strict";
      init_solidity();
      init_abi();
      init_slice();
      init_toFunctionSelector();
      init_decodeAbiParameters();
      init_formatAbiItem();
    }
  });

  // node_modules/viem/_esm/utils/abi/formatAbiItemWithArgs.js
  function formatAbiItemWithArgs({ abiItem, args, includeFunctionName = true, includeName = false }) {
    if (!("name" in abiItem))
      return;
    if (!("inputs" in abiItem))
      return;
    if (!abiItem.inputs)
      return;
    return `${includeFunctionName ? abiItem.name : ""}(${abiItem.inputs.map((input, i) => `${includeName && input.name ? `${input.name}: ` : ""}${typeof args[i] === "object" ? stringify(args[i]) : args[i]}`).join(", ")})`;
  }
  var init_formatAbiItemWithArgs = __esm({
    "node_modules/viem/_esm/utils/abi/formatAbiItemWithArgs.js"() {
      "use strict";
      init_stringify();
    }
  });

  // node_modules/viem/_esm/errors/stateOverride.js
  function prettyStateMapping(stateMapping) {
    return stateMapping.reduce((pretty, { slot, value }) => {
      return `${pretty}        ${slot}: ${value}
`;
    }, "");
  }
  function prettyStateOverride(stateOverride) {
    return stateOverride.reduce((pretty, { address, ...state }) => {
      let val = `${pretty}    ${address}:
`;
      if (state.nonce)
        val += `      nonce: ${state.nonce}
`;
      if (state.balance)
        val += `      balance: ${state.balance}
`;
      if (state.code)
        val += `      code: ${state.code}
`;
      if (state.state) {
        val += "      state:\n";
        val += prettyStateMapping(state.state);
      }
      if (state.stateDiff) {
        val += "      stateDiff:\n";
        val += prettyStateMapping(state.stateDiff);
      }
      return val;
    }, "  State Override:\n").slice(0, -1);
  }
  var AccountStateConflictError, StateAssignmentConflictError;
  var init_stateOverride = __esm({
    "node_modules/viem/_esm/errors/stateOverride.js"() {
      "use strict";
      init_base();
      AccountStateConflictError = class extends BaseError {
        constructor({ address }) {
          super(`State for account "${address}" is set multiple times.`, {
            name: "AccountStateConflictError"
          });
        }
      };
      StateAssignmentConflictError = class extends BaseError {
        constructor() {
          super("state and stateDiff are set on the same account.", {
            name: "StateAssignmentConflictError"
          });
        }
      };
    }
  });

  // node_modules/viem/_esm/errors/utils.js
  var getContractAddress, getUrl;
  var init_utils4 = __esm({
    "node_modules/viem/_esm/errors/utils.js"() {
      "use strict";
      getContractAddress = (address) => address;
      getUrl = (url) => url;
    }
  });

  // node_modules/viem/_esm/errors/contract.js
  var CallExecutionError, ContractFunctionExecutionError, ContractFunctionRevertedError, ContractFunctionZeroDataError, CounterfactualDeploymentFailedError, RawContractError;
  var init_contract = __esm({
    "node_modules/viem/_esm/errors/contract.js"() {
      "use strict";
      init_parseAccount();
      init_solidity();
      init_decodeErrorResult();
      init_formatAbiItem();
      init_formatAbiItemWithArgs();
      init_getAbiItem();
      init_formatEther();
      init_formatGwei();
      init_abi();
      init_base();
      init_stateOverride();
      init_transaction();
      init_utils4();
      CallExecutionError = class extends BaseError {
        constructor(cause, { account: account_, docsPath: docsPath6, chain, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, stateOverride }) {
          const account = account_ ? parseAccount(account_) : void 0;
          let prettyArgs = prettyPrint({
            from: account?.address,
            to,
            value: typeof value !== "undefined" && `${formatEther(value)} ${chain?.nativeCurrency?.symbol || "ETH"}`,
            data,
            gas,
            gasPrice: typeof gasPrice !== "undefined" && `${formatGwei(gasPrice)} gwei`,
            maxFeePerGas: typeof maxFeePerGas !== "undefined" && `${formatGwei(maxFeePerGas)} gwei`,
            maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== "undefined" && `${formatGwei(maxPriorityFeePerGas)} gwei`,
            nonce
          });
          if (stateOverride) {
            prettyArgs += `
${prettyStateOverride(stateOverride)}`;
          }
          super(cause.shortMessage, {
            cause,
            docsPath: docsPath6,
            metaMessages: [
              ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
              "Raw Call Arguments:",
              prettyArgs
            ].filter(Boolean),
            name: "CallExecutionError"
          });
          Object.defineProperty(this, "cause", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.cause = cause;
        }
      };
      ContractFunctionExecutionError = class extends BaseError {
        constructor(cause, { abi: abi2, args, contractAddress, docsPath: docsPath6, functionName, sender }) {
          const abiItem = getAbiItem({ abi: abi2, args, name: functionName });
          const formattedArgs = abiItem ? formatAbiItemWithArgs({
            abiItem,
            args,
            includeFunctionName: false,
            includeName: false
          }) : void 0;
          const functionWithParams = abiItem ? formatAbiItem(abiItem, { includeName: true }) : void 0;
          const prettyArgs = prettyPrint({
            address: contractAddress && getContractAddress(contractAddress),
            function: functionWithParams,
            args: formattedArgs && formattedArgs !== "()" && `${[...Array(functionName?.length ?? 0).keys()].map(() => " ").join("")}${formattedArgs}`,
            sender
          });
          super(cause.shortMessage || `An unknown error occurred while executing the contract function "${functionName}".`, {
            cause,
            docsPath: docsPath6,
            metaMessages: [
              ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
              prettyArgs && "Contract Call:",
              prettyArgs
            ].filter(Boolean),
            name: "ContractFunctionExecutionError"
          });
          Object.defineProperty(this, "abi", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "args", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "cause", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "contractAddress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "formattedArgs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "functionName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "sender", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.abi = abi2;
          this.args = args;
          this.cause = cause;
          this.contractAddress = contractAddress;
          this.functionName = functionName;
          this.sender = sender;
        }
      };
      ContractFunctionRevertedError = class extends BaseError {
        constructor({ abi: abi2, data, functionName, message }) {
          let cause;
          let decodedData = void 0;
          let metaMessages;
          let reason;
          if (data && data !== "0x") {
            try {
              decodedData = decodeErrorResult({ abi: abi2, data });
              const { abiItem, errorName, args: errorArgs } = decodedData;
              if (errorName === "Error") {
                reason = errorArgs[0];
              } else if (errorName === "Panic") {
                const [firstArg] = errorArgs;
                reason = panicReasons[firstArg];
              } else {
                const errorWithParams = abiItem ? formatAbiItem(abiItem, { includeName: true }) : void 0;
                const formattedArgs = abiItem && errorArgs ? formatAbiItemWithArgs({
                  abiItem,
                  args: errorArgs,
                  includeFunctionName: false,
                  includeName: false
                }) : void 0;
                metaMessages = [
                  errorWithParams ? `Error: ${errorWithParams}` : "",
                  formattedArgs && formattedArgs !== "()" ? `       ${[...Array(errorName?.length ?? 0).keys()].map(() => " ").join("")}${formattedArgs}` : ""
                ];
              }
            } catch (err) {
              cause = err;
            }
          } else if (message)
            reason = message;
          let signature;
          if (cause instanceof AbiErrorSignatureNotFoundError) {
            signature = cause.signature;
            metaMessages = [
              `Unable to decode signature "${signature}" as it was not found on the provided ABI.`,
              "Make sure you are using the correct ABI and that the error exists on it.",
              `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${signature}.`
            ];
          }
          super(reason && reason !== "execution reverted" || signature ? [
            `The contract function "${functionName}" reverted with the following ${signature ? "signature" : "reason"}:`,
            reason || signature
          ].join("\n") : `The contract function "${functionName}" reverted.`, {
            cause,
            metaMessages,
            name: "ContractFunctionRevertedError"
          });
          Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "reason", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "signature", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.data = decodedData;
          this.reason = reason;
          this.signature = signature;
        }
      };
      ContractFunctionZeroDataError = class extends BaseError {
        constructor({ functionName }) {
          super(`The contract function "${functionName}" returned no data ("0x").`, {
            metaMessages: [
              "This could be due to any of the following:",
              `  - The contract does not have the function "${functionName}",`,
              "  - The parameters passed to the contract function may be invalid, or",
              "  - The address is not a contract."
            ],
            name: "ContractFunctionZeroDataError"
          });
        }
      };
      CounterfactualDeploymentFailedError = class extends BaseError {
        constructor({ factory }) {
          super(`Deployment for counterfactual contract call failed${factory ? ` for factory "${factory}".` : ""}`, {
            metaMessages: [
              "Please ensure:",
              "- The `factory` is a valid contract deployment factory (ie. Create2 Factory, ERC-4337 Factory, etc).",
              "- The `factoryData` is a valid encoded function call for contract deployment function on the factory."
            ],
            name: "CounterfactualDeploymentFailedError"
          });
        }
      };
      RawContractError = class extends BaseError {
        constructor({ data, message }) {
          super(message || "", { name: "RawContractError" });
          Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 3
          });
          Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.data = data;
        }
      };
    }
  });

  // node_modules/viem/_esm/errors/request.js
  var HttpRequestError, RpcRequestError, TimeoutError;
  var init_request = __esm({
    "node_modules/viem/_esm/errors/request.js"() {
      "use strict";
      init_stringify();
      init_base();
      init_utils4();
      HttpRequestError = class extends BaseError {
        constructor({ body, cause, details, headers, status, url }) {
          super("HTTP request failed.", {
            cause,
            details,
            metaMessages: [
              status && `Status: ${status}`,
              `URL: ${getUrl(url)}`,
              body && `Request body: ${stringify(body)}`
            ].filter(Boolean),
            name: "HttpRequestError"
          });
          Object.defineProperty(this, "body", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.body = body;
          this.headers = headers;
          this.status = status;
          this.url = url;
        }
      };
      RpcRequestError = class extends BaseError {
        constructor({ body, error, url }) {
          super("RPC Request failed.", {
            cause: error,
            details: error.message,
            metaMessages: [`URL: ${getUrl(url)}`, `Request body: ${stringify(body)}`],
            name: "RpcRequestError"
          });
          Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.code = error.code;
        }
      };
      TimeoutError = class extends BaseError {
        constructor({ body, url }) {
          super("The request took too long to respond.", {
            details: "The request timed out.",
            metaMessages: [`URL: ${getUrl(url)}`, `Request body: ${stringify(body)}`],
            name: "TimeoutError"
          });
        }
      };
    }
  });

  // node_modules/viem/_esm/errors/rpc.js
  var unknownErrorCode, RpcError, ProviderRpcError, ParseRpcError, InvalidRequestRpcError, MethodNotFoundRpcError, InvalidParamsRpcError, InternalRpcError, InvalidInputRpcError, ResourceNotFoundRpcError, ResourceUnavailableRpcError, TransactionRejectedRpcError, MethodNotSupportedRpcError, LimitExceededRpcError, JsonRpcVersionUnsupportedError, UserRejectedRequestError, UnauthorizedProviderError, UnsupportedProviderMethodError, ProviderDisconnectedError, ChainDisconnectedError, SwitchChainError, UnknownRpcError;
  var init_rpc = __esm({
    "node_modules/viem/_esm/errors/rpc.js"() {
      "use strict";
      init_base();
      init_request();
      unknownErrorCode = -1;
      RpcError = class extends BaseError {
        constructor(cause, { code, docsPath: docsPath6, metaMessages, name, shortMessage }) {
          super(shortMessage, {
            cause,
            docsPath: docsPath6,
            metaMessages: metaMessages || cause?.metaMessages,
            name: name || "RpcError"
          });
          Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.name = name || cause.name;
          this.code = cause instanceof RpcRequestError ? cause.code : code ?? unknownErrorCode;
        }
      };
      ProviderRpcError = class extends RpcError {
        constructor(cause, options) {
          super(cause, options);
          Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.data = options.data;
        }
      };
      ParseRpcError = class _ParseRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _ParseRpcError.code,
            name: "ParseRpcError",
            shortMessage: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."
          });
        }
      };
      Object.defineProperty(ParseRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32700
      });
      InvalidRequestRpcError = class _InvalidRequestRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _InvalidRequestRpcError.code,
            name: "InvalidRequestRpcError",
            shortMessage: "JSON is not a valid request object."
          });
        }
      };
      Object.defineProperty(InvalidRequestRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32600
      });
      MethodNotFoundRpcError = class _MethodNotFoundRpcError extends RpcError {
        constructor(cause, { method } = {}) {
          super(cause, {
            code: _MethodNotFoundRpcError.code,
            name: "MethodNotFoundRpcError",
            shortMessage: `The method${method ? ` "${method}"` : ""} does not exist / is not available.`
          });
        }
      };
      Object.defineProperty(MethodNotFoundRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32601
      });
      InvalidParamsRpcError = class _InvalidParamsRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _InvalidParamsRpcError.code,
            name: "InvalidParamsRpcError",
            shortMessage: [
              "Invalid parameters were provided to the RPC method.",
              "Double check you have provided the correct parameters."
            ].join("\n")
          });
        }
      };
      Object.defineProperty(InvalidParamsRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32602
      });
      InternalRpcError = class _InternalRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _InternalRpcError.code,
            name: "InternalRpcError",
            shortMessage: "An internal error was received."
          });
        }
      };
      Object.defineProperty(InternalRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32603
      });
      InvalidInputRpcError = class _InvalidInputRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _InvalidInputRpcError.code,
            name: "InvalidInputRpcError",
            shortMessage: [
              "Missing or invalid parameters.",
              "Double check you have provided the correct parameters."
            ].join("\n")
          });
        }
      };
      Object.defineProperty(InvalidInputRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32e3
      });
      ResourceNotFoundRpcError = class _ResourceNotFoundRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _ResourceNotFoundRpcError.code,
            name: "ResourceNotFoundRpcError",
            shortMessage: "Requested resource not found."
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "ResourceNotFoundRpcError"
          });
        }
      };
      Object.defineProperty(ResourceNotFoundRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32001
      });
      ResourceUnavailableRpcError = class _ResourceUnavailableRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _ResourceUnavailableRpcError.code,
            name: "ResourceUnavailableRpcError",
            shortMessage: "Requested resource not available."
          });
        }
      };
      Object.defineProperty(ResourceUnavailableRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32002
      });
      TransactionRejectedRpcError = class _TransactionRejectedRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _TransactionRejectedRpcError.code,
            name: "TransactionRejectedRpcError",
            shortMessage: "Transaction creation failed."
          });
        }
      };
      Object.defineProperty(TransactionRejectedRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32003
      });
      MethodNotSupportedRpcError = class _MethodNotSupportedRpcError extends RpcError {
        constructor(cause, { method } = {}) {
          super(cause, {
            code: _MethodNotSupportedRpcError.code,
            name: "MethodNotSupportedRpcError",
            shortMessage: `Method${method ? ` "${method}"` : ""} is not implemented.`
          });
        }
      };
      Object.defineProperty(MethodNotSupportedRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32004
      });
      LimitExceededRpcError = class _LimitExceededRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _LimitExceededRpcError.code,
            name: "LimitExceededRpcError",
            shortMessage: "Request exceeds defined limit."
          });
        }
      };
      Object.defineProperty(LimitExceededRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32005
      });
      JsonRpcVersionUnsupportedError = class _JsonRpcVersionUnsupportedError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _JsonRpcVersionUnsupportedError.code,
            name: "JsonRpcVersionUnsupportedError",
            shortMessage: "Version of JSON-RPC protocol is not supported."
          });
        }
      };
      Object.defineProperty(JsonRpcVersionUnsupportedError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32006
      });
      UserRejectedRequestError = class _UserRejectedRequestError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _UserRejectedRequestError.code,
            name: "UserRejectedRequestError",
            shortMessage: "User rejected the request."
          });
        }
      };
      Object.defineProperty(UserRejectedRequestError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 4001
      });
      UnauthorizedProviderError = class _UnauthorizedProviderError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _UnauthorizedProviderError.code,
            name: "UnauthorizedProviderError",
            shortMessage: "The requested method and/or account has not been authorized by the user."
          });
        }
      };
      Object.defineProperty(UnauthorizedProviderError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 4100
      });
      UnsupportedProviderMethodError = class _UnsupportedProviderMethodError extends ProviderRpcError {
        constructor(cause, { method } = {}) {
          super(cause, {
            code: _UnsupportedProviderMethodError.code,
            name: "UnsupportedProviderMethodError",
            shortMessage: `The Provider does not support the requested method${method ? ` " ${method}"` : ""}.`
          });
        }
      };
      Object.defineProperty(UnsupportedProviderMethodError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 4200
      });
      ProviderDisconnectedError = class _ProviderDisconnectedError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _ProviderDisconnectedError.code,
            name: "ProviderDisconnectedError",
            shortMessage: "The Provider is disconnected from all chains."
          });
        }
      };
      Object.defineProperty(ProviderDisconnectedError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 4900
      });
      ChainDisconnectedError = class _ChainDisconnectedError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _ChainDisconnectedError.code,
            name: "ChainDisconnectedError",
            shortMessage: "The Provider is not connected to the requested chain."
          });
        }
      };
      Object.defineProperty(ChainDisconnectedError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 4901
      });
      SwitchChainError = class _SwitchChainError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _SwitchChainError.code,
            name: "SwitchChainError",
            shortMessage: "An error occurred when attempting to switch chain."
          });
        }
      };
      Object.defineProperty(SwitchChainError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 4902
      });
      UnknownRpcError = class extends RpcError {
        constructor(cause) {
          super(cause, {
            name: "UnknownRpcError",
            shortMessage: "An unknown RPC error occurred."
          });
        }
      };
    }
  });

  // node_modules/viem/_esm/utils/errors/getNodeError.js
  function getNodeError(err, args) {
    const message = (err.details || "").toLowerCase();
    const executionRevertedError = err instanceof BaseError ? err.walk((e) => e?.code === ExecutionRevertedError.code) : err;
    if (executionRevertedError instanceof BaseError)
      return new ExecutionRevertedError({
        cause: err,
        message: executionRevertedError.details
      });
    if (ExecutionRevertedError.nodeMessage.test(message))
      return new ExecutionRevertedError({
        cause: err,
        message: err.details
      });
    if (FeeCapTooHighError.nodeMessage.test(message))
      return new FeeCapTooHighError({
        cause: err,
        maxFeePerGas: args?.maxFeePerGas
      });
    if (FeeCapTooLowError.nodeMessage.test(message))
      return new FeeCapTooLowError({
        cause: err,
        maxFeePerGas: args?.maxFeePerGas
      });
    if (NonceTooHighError.nodeMessage.test(message))
      return new NonceTooHighError({ cause: err, nonce: args?.nonce });
    if (NonceTooLowError.nodeMessage.test(message))
      return new NonceTooLowError({ cause: err, nonce: args?.nonce });
    if (NonceMaxValueError.nodeMessage.test(message))
      return new NonceMaxValueError({ cause: err, nonce: args?.nonce });
    if (InsufficientFundsError.nodeMessage.test(message))
      return new InsufficientFundsError({ cause: err });
    if (IntrinsicGasTooHighError.nodeMessage.test(message))
      return new IntrinsicGasTooHighError({ cause: err, gas: args?.gas });
    if (IntrinsicGasTooLowError.nodeMessage.test(message))
      return new IntrinsicGasTooLowError({ cause: err, gas: args?.gas });
    if (TransactionTypeNotSupportedError.nodeMessage.test(message))
      return new TransactionTypeNotSupportedError({ cause: err });
    if (TipAboveFeeCapError.nodeMessage.test(message))
      return new TipAboveFeeCapError({
        cause: err,
        maxFeePerGas: args?.maxFeePerGas,
        maxPriorityFeePerGas: args?.maxPriorityFeePerGas
      });
    return new UnknownNodeError({
      cause: err
    });
  }
  var init_getNodeError = __esm({
    "node_modules/viem/_esm/utils/errors/getNodeError.js"() {
      "use strict";
      init_base();
      init_node();
    }
  });

  // node_modules/viem/_esm/utils/formatters/extract.js
  function extract(value_, { format }) {
    if (!format)
      return {};
    const value = {};
    function extract_(formatted2) {
      const keys = Object.keys(formatted2);
      for (const key of keys) {
        if (key in value_)
          value[key] = value_[key];
        if (formatted2[key] && typeof formatted2[key] === "object" && !Array.isArray(formatted2[key]))
          extract_(formatted2[key]);
      }
    }
    const formatted = format(value_ || {});
    extract_(formatted);
    return value;
  }
  var init_extract = __esm({
    "node_modules/viem/_esm/utils/formatters/extract.js"() {
      "use strict";
    }
  });

  // node_modules/viem/_esm/utils/formatters/formatter.js
  function defineFormatter(type, format) {
    return ({ exclude, format: overrides }) => {
      return {
        exclude,
        format: (args) => {
          const formatted = format(args);
          if (exclude) {
            for (const key of exclude) {
              delete formatted[key];
            }
          }
          return {
            ...formatted,
            ...overrides(args)
          };
        },
        type
      };
    };
  }
  var init_formatter = __esm({
    "node_modules/viem/_esm/utils/formatters/formatter.js"() {
      "use strict";
    }
  });

  // node_modules/viem/_esm/utils/formatters/transactionRequest.js
  function formatTransactionRequest(request) {
    const rpcRequest = {};
    if (typeof request.authorizationList !== "undefined")
      rpcRequest.authorizationList = formatAuthorizationList(request.authorizationList);
    if (typeof request.accessList !== "undefined")
      rpcRequest.accessList = request.accessList;
    if (typeof request.blobVersionedHashes !== "undefined")
      rpcRequest.blobVersionedHashes = request.blobVersionedHashes;
    if (typeof request.blobs !== "undefined") {
      if (typeof request.blobs[0] !== "string")
        rpcRequest.blobs = request.blobs.map((x) => bytesToHex2(x));
      else
        rpcRequest.blobs = request.blobs;
    }
    if (typeof request.data !== "undefined")
      rpcRequest.data = request.data;
    if (typeof request.from !== "undefined")
      rpcRequest.from = request.from;
    if (typeof request.gas !== "undefined")
      rpcRequest.gas = numberToHex(request.gas);
    if (typeof request.gasPrice !== "undefined")
      rpcRequest.gasPrice = numberToHex(request.gasPrice);
    if (typeof request.maxFeePerBlobGas !== "undefined")
      rpcRequest.maxFeePerBlobGas = numberToHex(request.maxFeePerBlobGas);
    if (typeof request.maxFeePerGas !== "undefined")
      rpcRequest.maxFeePerGas = numberToHex(request.maxFeePerGas);
    if (typeof request.maxPriorityFeePerGas !== "undefined")
      rpcRequest.maxPriorityFeePerGas = numberToHex(request.maxPriorityFeePerGas);
    if (typeof request.nonce !== "undefined")
      rpcRequest.nonce = numberToHex(request.nonce);
    if (typeof request.to !== "undefined")
      rpcRequest.to = request.to;
    if (typeof request.type !== "undefined")
      rpcRequest.type = rpcTransactionType[request.type];
    if (typeof request.value !== "undefined")
      rpcRequest.value = numberToHex(request.value);
    return rpcRequest;
  }
  function formatAuthorizationList(authorizationList) {
    return authorizationList.map((authorization) => ({
      address: authorization.contractAddress,
      r: authorization.r,
      s: authorization.s,
      chainId: numberToHex(authorization.chainId),
      nonce: numberToHex(authorization.nonce),
      ...typeof authorization.yParity !== "undefined" ? { yParity: numberToHex(authorization.yParity) } : {},
      ...typeof authorization.v !== "undefined" && typeof authorization.yParity === "undefined" ? { v: numberToHex(authorization.v) } : {}
    }));
  }
  var rpcTransactionType;
  var init_transactionRequest = __esm({
    "node_modules/viem/_esm/utils/formatters/transactionRequest.js"() {
      "use strict";
      init_toHex();
      rpcTransactionType = {
        legacy: "0x0",
        eip2930: "0x1",
        eip1559: "0x2",
        eip4844: "0x3",
        eip7702: "0x4"
      };
    }
  });

  // node_modules/viem/_esm/utils/stateOverride.js
  function serializeStateMapping(stateMapping) {
    if (!stateMapping || stateMapping.length === 0)
      return void 0;
    return stateMapping.reduce((acc, { slot, value }) => {
      if (slot.length !== 66)
        throw new InvalidBytesLengthError({
          size: slot.length,
          targetSize: 66,
          type: "hex"
        });
      if (value.length !== 66)
        throw new InvalidBytesLengthError({
          size: value.length,
          targetSize: 66,
          type: "hex"
        });
      acc[slot] = value;
      return acc;
    }, {});
  }
  function serializeAccountStateOverride(parameters) {
    const { balance, nonce, state, stateDiff, code } = parameters;
    const rpcAccountStateOverride = {};
    if (code !== void 0)
      rpcAccountStateOverride.code = code;
    if (balance !== void 0)
      rpcAccountStateOverride.balance = numberToHex(balance);
    if (nonce !== void 0)
      rpcAccountStateOverride.nonce = numberToHex(nonce);
    if (state !== void 0)
      rpcAccountStateOverride.state = serializeStateMapping(state);
    if (stateDiff !== void 0) {
      if (rpcAccountStateOverride.state)
        throw new StateAssignmentConflictError();
      rpcAccountStateOverride.stateDiff = serializeStateMapping(stateDiff);
    }
    return rpcAccountStateOverride;
  }
  function serializeStateOverride(parameters) {
    if (!parameters)
      return void 0;
    const rpcStateOverride = {};
    for (const { address, ...accountState } of parameters) {
      if (!isAddress(address, { strict: false }))
        throw new InvalidAddressError({ address });
      if (rpcStateOverride[address])
        throw new AccountStateConflictError({ address });
      rpcStateOverride[address] = serializeAccountStateOverride(accountState);
    }
    return rpcStateOverride;
  }
  var init_stateOverride2 = __esm({
    "node_modules/viem/_esm/utils/stateOverride.js"() {
      "use strict";
      init_address();
      init_data();
      init_stateOverride();
      init_isAddress();
      init_toHex();
    }
  });

  // node_modules/viem/_esm/utils/transaction/assertRequest.js
  function assertRequest(args) {
    const { account: account_, gasPrice, maxFeePerGas, maxPriorityFeePerGas, to } = args;
    const account = account_ ? parseAccount(account_) : void 0;
    if (account && !isAddress(account.address))
      throw new InvalidAddressError({ address: account.address });
    if (to && !isAddress(to))
      throw new InvalidAddressError({ address: to });
    if (typeof gasPrice !== "undefined" && (typeof maxFeePerGas !== "undefined" || typeof maxPriorityFeePerGas !== "undefined"))
      throw new FeeConflictError();
    if (maxFeePerGas && maxFeePerGas > maxUint256)
      throw new FeeCapTooHighError({ maxFeePerGas });
    if (maxPriorityFeePerGas && maxFeePerGas && maxPriorityFeePerGas > maxFeePerGas)
      throw new TipAboveFeeCapError({ maxFeePerGas, maxPriorityFeePerGas });
  }
  var init_assertRequest = __esm({
    "node_modules/viem/_esm/utils/transaction/assertRequest.js"() {
      "use strict";
      init_parseAccount();
      init_number();
      init_address();
      init_node();
      init_transaction();
      init_isAddress();
    }
  });

  // node_modules/viem/_esm/utils/address/isAddressEqual.js
  function isAddressEqual(a, b) {
    if (!isAddress(a, { strict: false }))
      throw new InvalidAddressError({ address: a });
    if (!isAddress(b, { strict: false }))
      throw new InvalidAddressError({ address: b });
    return a.toLowerCase() === b.toLowerCase();
  }
  var init_isAddressEqual = __esm({
    "node_modules/viem/_esm/utils/address/isAddressEqual.js"() {
      "use strict";
      init_address();
      init_isAddress();
    }
  });

  // node_modules/viem/_esm/utils/abi/decodeFunctionResult.js
  function decodeFunctionResult(parameters) {
    const { abi: abi2, args, functionName, data } = parameters;
    let abiItem = abi2[0];
    if (functionName) {
      const item = getAbiItem({ abi: abi2, args, name: functionName });
      if (!item)
        throw new AbiFunctionNotFoundError(functionName, { docsPath: docsPath4 });
      abiItem = item;
    }
    if (abiItem.type !== "function")
      throw new AbiFunctionNotFoundError(void 0, { docsPath: docsPath4 });
    if (!abiItem.outputs)
      throw new AbiFunctionOutputsNotFoundError(abiItem.name, { docsPath: docsPath4 });
    const values = decodeAbiParameters(abiItem.outputs, data);
    if (values && values.length > 1)
      return values;
    if (values && values.length === 1)
      return values[0];
    return void 0;
  }
  var docsPath4;
  var init_decodeFunctionResult = __esm({
    "node_modules/viem/_esm/utils/abi/decodeFunctionResult.js"() {
      "use strict";
      init_abi();
      init_decodeAbiParameters();
      init_getAbiItem();
      docsPath4 = "/docs/contract/decodeFunctionResult";
    }
  });

  // node_modules/viem/_esm/constants/abis.js
  var multicall3Abi, universalResolverErrors, universalResolverResolveAbi, universalResolverReverseAbi, textResolverAbi, addressResolverAbi, universalSignatureValidatorAbi;
  var init_abis = __esm({
    "node_modules/viem/_esm/constants/abis.js"() {
      "use strict";
      multicall3Abi = [
        {
          inputs: [
            {
              components: [
                {
                  name: "target",
                  type: "address"
                },
                {
                  name: "allowFailure",
                  type: "bool"
                },
                {
                  name: "callData",
                  type: "bytes"
                }
              ],
              name: "calls",
              type: "tuple[]"
            }
          ],
          name: "aggregate3",
          outputs: [
            {
              components: [
                {
                  name: "success",
                  type: "bool"
                },
                {
                  name: "returnData",
                  type: "bytes"
                }
              ],
              name: "returnData",
              type: "tuple[]"
            }
          ],
          stateMutability: "view",
          type: "function"
        }
      ];
      universalResolverErrors = [
        {
          inputs: [],
          name: "ResolverNotFound",
          type: "error"
        },
        {
          inputs: [],
          name: "ResolverWildcardNotSupported",
          type: "error"
        },
        {
          inputs: [],
          name: "ResolverNotContract",
          type: "error"
        },
        {
          inputs: [
            {
              name: "returnData",
              type: "bytes"
            }
          ],
          name: "ResolverError",
          type: "error"
        },
        {
          inputs: [
            {
              components: [
                {
                  name: "status",
                  type: "uint16"
                },
                {
                  name: "message",
                  type: "string"
                }
              ],
              name: "errors",
              type: "tuple[]"
            }
          ],
          name: "HttpError",
          type: "error"
        }
      ];
      universalResolverResolveAbi = [
        ...universalResolverErrors,
        {
          name: "resolve",
          type: "function",
          stateMutability: "view",
          inputs: [
            { name: "name", type: "bytes" },
            { name: "data", type: "bytes" }
          ],
          outputs: [
            { name: "", type: "bytes" },
            { name: "address", type: "address" }
          ]
        },
        {
          name: "resolve",
          type: "function",
          stateMutability: "view",
          inputs: [
            { name: "name", type: "bytes" },
            { name: "data", type: "bytes" },
            { name: "gateways", type: "string[]" }
          ],
          outputs: [
            { name: "", type: "bytes" },
            { name: "address", type: "address" }
          ]
        }
      ];
      universalResolverReverseAbi = [
        ...universalResolverErrors,
        {
          name: "reverse",
          type: "function",
          stateMutability: "view",
          inputs: [{ type: "bytes", name: "reverseName" }],
          outputs: [
            { type: "string", name: "resolvedName" },
            { type: "address", name: "resolvedAddress" },
            { type: "address", name: "reverseResolver" },
            { type: "address", name: "resolver" }
          ]
        },
        {
          name: "reverse",
          type: "function",
          stateMutability: "view",
          inputs: [
            { type: "bytes", name: "reverseName" },
            { type: "string[]", name: "gateways" }
          ],
          outputs: [
            { type: "string", name: "resolvedName" },
            { type: "address", name: "resolvedAddress" },
            { type: "address", name: "reverseResolver" },
            { type: "address", name: "resolver" }
          ]
        }
      ];
      textResolverAbi = [
        {
          name: "text",
          type: "function",
          stateMutability: "view",
          inputs: [
            { name: "name", type: "bytes32" },
            { name: "key", type: "string" }
          ],
          outputs: [{ name: "", type: "string" }]
        }
      ];
      addressResolverAbi = [
        {
          name: "addr",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "name", type: "bytes32" }],
          outputs: [{ name: "", type: "address" }]
        },
        {
          name: "addr",
          type: "function",
          stateMutability: "view",
          inputs: [
            { name: "name", type: "bytes32" },
            { name: "coinType", type: "uint256" }
          ],
          outputs: [{ name: "", type: "bytes" }]
        }
      ];
      universalSignatureValidatorAbi = [
        {
          inputs: [
            {
              name: "_signer",
              type: "address"
            },
            {
              name: "_hash",
              type: "bytes32"
            },
            {
              name: "_signature",
              type: "bytes"
            }
          ],
          stateMutability: "nonpayable",
          type: "constructor"
        },
        {
          inputs: [
            {
              name: "_signer",
              type: "address"
            },
            {
              name: "_hash",
              type: "bytes32"
            },
            {
              name: "_signature",
              type: "bytes"
            }
          ],
          outputs: [
            {
              type: "bool"
            }
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "isValidSig"
        }
      ];
    }
  });

  // node_modules/viem/_esm/constants/contract.js
  var aggregate3Signature;
  var init_contract2 = __esm({
    "node_modules/viem/_esm/constants/contract.js"() {
      "use strict";
      aggregate3Signature = "0x82ad56cb";
    }
  });

  // node_modules/viem/_esm/constants/contracts.js
  var deploylessCallViaBytecodeBytecode, deploylessCallViaFactoryBytecode, universalSignatureValidatorByteCode;
  var init_contracts = __esm({
    "node_modules/viem/_esm/constants/contracts.js"() {
      "use strict";
      deploylessCallViaBytecodeBytecode = "0x608060405234801561001057600080fd5b5060405161018e38038061018e83398101604081905261002f91610124565b6000808351602085016000f59050803b61004857600080fd5b6000808351602085016000855af16040513d6000823e81610067573d81fd5b3d81f35b634e487b7160e01b600052604160045260246000fd5b600082601f83011261009257600080fd5b81516001600160401b038111156100ab576100ab61006b565b604051601f8201601f19908116603f011681016001600160401b03811182821017156100d9576100d961006b565b6040528181528382016020018510156100f157600080fd5b60005b82811015610110576020818601810151838301820152016100f4565b506000918101602001919091529392505050565b6000806040838503121561013757600080fd5b82516001600160401b0381111561014d57600080fd5b61015985828601610081565b602085015190935090506001600160401b0381111561017757600080fd5b61018385828601610081565b915050925092905056fe";
      deploylessCallViaFactoryBytecode = "0x608060405234801561001057600080fd5b506040516102c03803806102c083398101604081905261002f916101e6565b836001600160a01b03163b6000036100e457600080836001600160a01b03168360405161005c9190610270565b6000604051808303816000865af19150503d8060008114610099576040519150601f19603f3d011682016040523d82523d6000602084013e61009e565b606091505b50915091508115806100b857506001600160a01b0386163b155b156100e1578060405163101bb98d60e01b81526004016100d8919061028c565b60405180910390fd5b50505b6000808451602086016000885af16040513d6000823e81610103573d81fd5b3d81f35b80516001600160a01b038116811461011e57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561015457818101518382015260200161013c565b50506000910152565b600082601f83011261016e57600080fd5b81516001600160401b0381111561018757610187610123565b604051601f8201601f19908116603f011681016001600160401b03811182821017156101b5576101b5610123565b6040528181528382016020018510156101cd57600080fd5b6101de826020830160208701610139565b949350505050565b600080600080608085870312156101fc57600080fd5b61020585610107565b60208601519094506001600160401b0381111561022157600080fd5b61022d8782880161015d565b93505061023c60408601610107565b60608601519092506001600160401b0381111561025857600080fd5b6102648782880161015d565b91505092959194509250565b60008251610282818460208701610139565b9190910192915050565b60208152600082518060208401526102ab816040850160208701610139565b601f01601f1916919091016040019291505056fe";
      universalSignatureValidatorByteCode = "0x608060405234801561001057600080fd5b5060405161069438038061069483398101604081905261002f9161051e565b600061003c848484610048565b9050806000526001601ff35b60007f64926492649264926492649264926492649264926492649264926492649264926100748361040c565b036101e7576000606080848060200190518101906100929190610577565b60405192955090935091506000906001600160a01b038516906100b69085906105dd565b6000604051808303816000865af19150503d80600081146100f3576040519150601f19603f3d011682016040523d82523d6000602084013e6100f8565b606091505b50509050876001600160a01b03163b60000361016057806101605760405162461bcd60e51b815260206004820152601e60248201527f5369676e617475726556616c696461746f723a206465706c6f796d656e74000060448201526064015b60405180910390fd5b604051630b135d3f60e11b808252906001600160a01b038a1690631626ba7e90610190908b9087906004016105f9565b602060405180830381865afa1580156101ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101d19190610633565b6001600160e01b03191614945050505050610405565b6001600160a01b0384163b1561027a57604051630b135d3f60e11b808252906001600160a01b03861690631626ba7e9061022790879087906004016105f9565b602060405180830381865afa158015610244573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102689190610633565b6001600160e01b031916149050610405565b81516041146102df5760405162461bcd60e51b815260206004820152603a602482015260008051602061067483398151915260448201527f3a20696e76616c6964207369676e6174757265206c656e6774680000000000006064820152608401610157565b6102e7610425565b5060208201516040808401518451859392600091859190811061030c5761030c61065d565b016020015160f81c9050601b811480159061032b57508060ff16601c14155b1561038c5760405162461bcd60e51b815260206004820152603b602482015260008051602061067483398151915260448201527f3a20696e76616c6964207369676e617475726520762076616c756500000000006064820152608401610157565b60408051600081526020810180835289905260ff83169181019190915260608101849052608081018390526001600160a01b0389169060019060a0016020604051602081039080840390855afa1580156103ea573d6000803e3d6000fd5b505050602060405103516001600160a01b0316149450505050505b9392505050565b600060208251101561041d57600080fd5b508051015190565b60405180606001604052806003906020820280368337509192915050565b6001600160a01b038116811461045857600080fd5b50565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561048c578181015183820152602001610474565b50506000910152565b600082601f8301126104a657600080fd5b81516001600160401b038111156104bf576104bf61045b565b604051601f8201601f19908116603f011681016001600160401b03811182821017156104ed576104ed61045b565b60405281815283820160200185101561050557600080fd5b610516826020830160208701610471565b949350505050565b60008060006060848603121561053357600080fd5b835161053e81610443565b6020850151604086015191945092506001600160401b0381111561056157600080fd5b61056d86828701610495565b9150509250925092565b60008060006060848603121561058c57600080fd5b835161059781610443565b60208501519093506001600160401b038111156105b357600080fd5b6105bf86828701610495565b604086015190935090506001600160401b0381111561056157600080fd5b600082516105ef818460208701610471565b9190910192915050565b828152604060208201526000825180604084015261061e816060850160208701610471565b601f01601f1916919091016060019392505050565b60006020828403121561064557600080fd5b81516001600160e01b03198116811461040557600080fd5b634e487b7160e01b600052603260045260246000fdfe5369676e617475726556616c696461746f72237265636f7665725369676e6572";
    }
  });

  // node_modules/viem/_esm/utils/abi/encodeDeployData.js
  function encodeDeployData(parameters) {
    const { abi: abi2, args, bytecode } = parameters;
    if (!args || args.length === 0)
      return bytecode;
    const description = abi2.find((x) => "type" in x && x.type === "constructor");
    if (!description)
      throw new AbiConstructorNotFoundError({ docsPath: docsPath5 });
    if (!("inputs" in description))
      throw new AbiConstructorParamsNotFoundError({ docsPath: docsPath5 });
    if (!description.inputs || description.inputs.length === 0)
      throw new AbiConstructorParamsNotFoundError({ docsPath: docsPath5 });
    const data = encodeAbiParameters(description.inputs, args);
    return concatHex([bytecode, data]);
  }
  var docsPath5;
  var init_encodeDeployData = __esm({
    "node_modules/viem/_esm/utils/abi/encodeDeployData.js"() {
      "use strict";
      init_abi();
      init_concat();
      init_encodeAbiParameters();
      docsPath5 = "/docs/contract/encodeDeployData";
    }
  });

  // node_modules/viem/_esm/utils/chain/getChainContractAddress.js
  function getChainContractAddress({ blockNumber, chain, contract: name }) {
    const contract = chain?.contracts?.[name];
    if (!contract)
      throw new ChainDoesNotSupportContract({
        chain,
        contract: { name }
      });
    if (blockNumber && contract.blockCreated && contract.blockCreated > blockNumber)
      throw new ChainDoesNotSupportContract({
        blockNumber,
        chain,
        contract: {
          name,
          blockCreated: contract.blockCreated
        }
      });
    return contract.address;
  }
  var init_getChainContractAddress = __esm({
    "node_modules/viem/_esm/utils/chain/getChainContractAddress.js"() {
      "use strict";
      init_chain();
    }
  });

  // node_modules/viem/_esm/utils/errors/getCallError.js
  function getCallError(err, { docsPath: docsPath6, ...args }) {
    const cause = (() => {
      const cause2 = getNodeError(err, args);
      if (cause2 instanceof UnknownNodeError)
        return err;
      return cause2;
    })();
    return new CallExecutionError(cause, {
      docsPath: docsPath6,
      ...args
    });
  }
  var init_getCallError = __esm({
    "node_modules/viem/_esm/utils/errors/getCallError.js"() {
      "use strict";
      init_contract();
      init_node();
      init_getNodeError();
    }
  });

  // node_modules/viem/_esm/utils/promise/createBatchScheduler.js
  function createBatchScheduler({ fn, id, shouldSplitBatch, wait: wait2 = 0, sort }) {
    const exec = async () => {
      const scheduler = getScheduler();
      flush();
      const args = scheduler.map(({ args: args2 }) => args2);
      if (args.length === 0)
        return;
      fn(args).then((data) => {
        if (sort && Array.isArray(data))
          data.sort(sort);
        for (let i = 0; i < scheduler.length; i++) {
          const { pendingPromise } = scheduler[i];
          pendingPromise.resolve?.([data[i], data]);
        }
      }).catch((err) => {
        for (let i = 0; i < scheduler.length; i++) {
          const { pendingPromise } = scheduler[i];
          pendingPromise.reject?.(err);
        }
      });
    };
    const flush = () => schedulerCache.delete(id);
    const getBatchedArgs = () => getScheduler().map(({ args }) => args);
    const getScheduler = () => schedulerCache.get(id) || [];
    const setScheduler = (item) => schedulerCache.set(id, [...getScheduler(), item]);
    return {
      flush,
      async schedule(args) {
        const pendingPromise = {};
        const promise = new Promise((resolve, reject) => {
          pendingPromise.resolve = resolve;
          pendingPromise.reject = reject;
        });
        const split2 = shouldSplitBatch?.([...getBatchedArgs(), args]);
        if (split2)
          exec();
        const hasActiveScheduler = getScheduler().length > 0;
        if (hasActiveScheduler) {
          setScheduler({ args, pendingPromise });
          return promise;
        }
        setScheduler({ args, pendingPromise });
        setTimeout(exec, wait2);
        return promise;
      }
    };
  }
  var schedulerCache;
  var init_createBatchScheduler = __esm({
    "node_modules/viem/_esm/utils/promise/createBatchScheduler.js"() {
      "use strict";
      schedulerCache = /* @__PURE__ */ new Map();
    }
  });

  // node_modules/viem/_esm/errors/ccip.js
  var OffchainLookupError, OffchainLookupResponseMalformedError, OffchainLookupSenderMismatchError;
  var init_ccip = __esm({
    "node_modules/viem/_esm/errors/ccip.js"() {
      "use strict";
      init_stringify();
      init_base();
      init_utils4();
      OffchainLookupError = class extends BaseError {
        constructor({ callbackSelector, cause, data, extraData, sender, urls }) {
          super(cause.shortMessage || "An error occurred while fetching for an offchain result.", {
            cause,
            metaMessages: [
              ...cause.metaMessages || [],
              cause.metaMessages?.length ? "" : [],
              "Offchain Gateway Call:",
              urls && [
                "  Gateway URL(s):",
                ...urls.map((url) => `    ${getUrl(url)}`)
              ],
              `  Sender: ${sender}`,
              `  Data: ${data}`,
              `  Callback selector: ${callbackSelector}`,
              `  Extra data: ${extraData}`
            ].flat(),
            name: "OffchainLookupError"
          });
        }
      };
      OffchainLookupResponseMalformedError = class extends BaseError {
        constructor({ result, url }) {
          super("Offchain gateway response is malformed. Response data must be a hex value.", {
            metaMessages: [
              `Gateway URL: ${getUrl(url)}`,
              `Response: ${stringify(result)}`
            ],
            name: "OffchainLookupResponseMalformedError"
          });
        }
      };
      OffchainLookupSenderMismatchError = class extends BaseError {
        constructor({ sender, to }) {
          super("Reverted sender address does not match target contract address (`to`).", {
            metaMessages: [
              `Contract address: ${to}`,
              `OffchainLookup sender address: ${sender}`
            ],
            name: "OffchainLookupSenderMismatchError"
          });
        }
      };
    }
  });

  // node_modules/viem/_esm/utils/ccip.js
  var ccip_exports = {};
  __export(ccip_exports, {
    ccipRequest: () => ccipRequest,
    offchainLookup: () => offchainLookup,
    offchainLookupAbiItem: () => offchainLookupAbiItem,
    offchainLookupSignature: () => offchainLookupSignature
  });
  async function offchainLookup(client, { blockNumber, blockTag, data, to }) {
    const { args } = decodeErrorResult({
      data,
      abi: [offchainLookupAbiItem]
    });
    const [sender, urls, callData, callbackSelector, extraData] = args;
    const { ccipRead } = client;
    const ccipRequest_ = ccipRead && typeof ccipRead?.request === "function" ? ccipRead.request : ccipRequest;
    try {
      if (!isAddressEqual(to, sender))
        throw new OffchainLookupSenderMismatchError({ sender, to });
      const result = await ccipRequest_({ data: callData, sender, urls });
      const { data: data_ } = await call(client, {
        blockNumber,
        blockTag,
        data: concat([
          callbackSelector,
          encodeAbiParameters([{ type: "bytes" }, { type: "bytes" }], [result, extraData])
        ]),
        to
      });
      return data_;
    } catch (err) {
      throw new OffchainLookupError({
        callbackSelector,
        cause: err,
        data,
        extraData,
        sender,
        urls
      });
    }
  }
  async function ccipRequest({ data, sender, urls }) {
    let error = new Error("An unknown error occurred.");
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const method = url.includes("{data}") ? "GET" : "POST";
      const body = method === "POST" ? { data, sender } : void 0;
      const headers = method === "POST" ? { "Content-Type": "application/json" } : {};
      try {
        const response = await fetch(url.replace("{sender}", sender).replace("{data}", data), {
          body: JSON.stringify(body),
          headers,
          method
        });
        let result;
        if (response.headers.get("Content-Type")?.startsWith("application/json")) {
          result = (await response.json()).data;
        } else {
          result = await response.text();
        }
        if (!response.ok) {
          error = new HttpRequestError({
            body,
            details: result?.error ? stringify(result.error) : response.statusText,
            headers: response.headers,
            status: response.status,
            url
          });
          continue;
        }
        if (!isHex(result)) {
          error = new OffchainLookupResponseMalformedError({
            result,
            url
          });
          continue;
        }
        return result;
      } catch (err) {
        error = new HttpRequestError({
          body,
          details: err.message,
          url
        });
      }
    }
    throw error;
  }
  var offchainLookupSignature, offchainLookupAbiItem;
  var init_ccip2 = __esm({
    "node_modules/viem/_esm/utils/ccip.js"() {
      "use strict";
      init_call();
      init_ccip();
      init_request();
      init_decodeErrorResult();
      init_encodeAbiParameters();
      init_isAddressEqual();
      init_concat();
      init_isHex();
      init_stringify();
      offchainLookupSignature = "0x556f1830";
      offchainLookupAbiItem = {
        name: "OffchainLookup",
        type: "error",
        inputs: [
          {
            name: "sender",
            type: "address"
          },
          {
            name: "urls",
            type: "string[]"
          },
          {
            name: "callData",
            type: "bytes"
          },
          {
            name: "callbackFunction",
            type: "bytes4"
          },
          {
            name: "extraData",
            type: "bytes"
          }
        ]
      };
    }
  });

  // node_modules/viem/_esm/actions/public/call.js
  async function call(client, args) {
    const { account: account_ = client.account, batch = Boolean(client.batch?.multicall), blockNumber, blockTag = "latest", accessList, blobs, code, data: data_, factory, factoryData, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, stateOverride, ...rest } = args;
    const account = account_ ? parseAccount(account_) : void 0;
    if (code && (factory || factoryData))
      throw new BaseError("Cannot provide both `code` & `factory`/`factoryData` as parameters.");
    if (code && to)
      throw new BaseError("Cannot provide both `code` & `to` as parameters.");
    const deploylessCallViaBytecode = code && data_;
    const deploylessCallViaFactory = factory && factoryData && to && data_;
    const deploylessCall = deploylessCallViaBytecode || deploylessCallViaFactory;
    const data = (() => {
      if (deploylessCallViaBytecode)
        return toDeploylessCallViaBytecodeData({
          code,
          data: data_
        });
      if (deploylessCallViaFactory)
        return toDeploylessCallViaFactoryData({
          data: data_,
          factory,
          factoryData,
          to
        });
      return data_;
    })();
    try {
      assertRequest(args);
      const blockNumberHex = blockNumber ? numberToHex(blockNumber) : void 0;
      const block = blockNumberHex || blockTag;
      const rpcStateOverride = serializeStateOverride(stateOverride);
      const chainFormat = client.chain?.formatters?.transactionRequest?.format;
      const format = chainFormat || formatTransactionRequest;
      const request = format({
        // Pick out extra data that might exist on the chain's transaction request type.
        ...extract(rest, { format: chainFormat }),
        from: account?.address,
        accessList,
        blobs,
        data,
        gas,
        gasPrice,
        maxFeePerBlobGas,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        to: deploylessCall ? void 0 : to,
        value
      });
      if (batch && shouldPerformMulticall({ request }) && !rpcStateOverride) {
        try {
          return await scheduleMulticall(client, {
            ...request,
            blockNumber,
            blockTag
          });
        } catch (err) {
          if (!(err instanceof ClientChainNotConfiguredError) && !(err instanceof ChainDoesNotSupportContract))
            throw err;
        }
      }
      const response = await client.request({
        method: "eth_call",
        params: rpcStateOverride ? [
          request,
          block,
          rpcStateOverride
        ] : [request, block]
      });
      if (response === "0x")
        return { data: void 0 };
      return { data: response };
    } catch (err) {
      const data2 = getRevertErrorData(err);
      const { offchainLookup: offchainLookup2, offchainLookupSignature: offchainLookupSignature2 } = await Promise.resolve().then(() => (init_ccip2(), ccip_exports));
      if (client.ccipRead !== false && data2?.slice(0, 10) === offchainLookupSignature2 && to)
        return { data: await offchainLookup2(client, { data: data2, to }) };
      if (deploylessCall && data2?.slice(0, 10) === "0x101bb98d")
        throw new CounterfactualDeploymentFailedError({ factory });
      throw getCallError(err, {
        ...args,
        account,
        chain: client.chain
      });
    }
  }
  function shouldPerformMulticall({ request }) {
    const { data, to, ...request_ } = request;
    if (!data)
      return false;
    if (data.startsWith(aggregate3Signature))
      return false;
    if (!to)
      return false;
    if (Object.values(request_).filter((x) => typeof x !== "undefined").length > 0)
      return false;
    return true;
  }
  async function scheduleMulticall(client, args) {
    const { batchSize = 1024, wait: wait2 = 0 } = typeof client.batch?.multicall === "object" ? client.batch.multicall : {};
    const { blockNumber, blockTag = "latest", data, multicallAddress: multicallAddress_, to } = args;
    let multicallAddress = multicallAddress_;
    if (!multicallAddress) {
      if (!client.chain)
        throw new ClientChainNotConfiguredError();
      multicallAddress = getChainContractAddress({
        blockNumber,
        chain: client.chain,
        contract: "multicall3"
      });
    }
    const blockNumberHex = blockNumber ? numberToHex(blockNumber) : void 0;
    const block = blockNumberHex || blockTag;
    const { schedule } = createBatchScheduler({
      id: `${client.uid}.${block}`,
      wait: wait2,
      shouldSplitBatch(args2) {
        const size3 = args2.reduce((size4, { data: data2 }) => size4 + (data2.length - 2), 0);
        return size3 > batchSize * 2;
      },
      fn: async (requests) => {
        const calls = requests.map((request) => ({
          allowFailure: true,
          callData: request.data,
          target: request.to
        }));
        const calldata = encodeFunctionData({
          abi: multicall3Abi,
          args: [calls],
          functionName: "aggregate3"
        });
        const data2 = await client.request({
          method: "eth_call",
          params: [
            {
              data: calldata,
              to: multicallAddress
            },
            block
          ]
        });
        return decodeFunctionResult({
          abi: multicall3Abi,
          args: [calls],
          functionName: "aggregate3",
          data: data2 || "0x"
        });
      }
    });
    const [{ returnData, success }] = await schedule({ data, to });
    if (!success)
      throw new RawContractError({ data: returnData });
    if (returnData === "0x")
      return { data: void 0 };
    return { data: returnData };
  }
  function toDeploylessCallViaBytecodeData(parameters) {
    const { code, data } = parameters;
    return encodeDeployData({
      abi: parseAbi(["constructor(bytes, bytes)"]),
      bytecode: deploylessCallViaBytecodeBytecode,
      args: [code, data]
    });
  }
  function toDeploylessCallViaFactoryData(parameters) {
    const { data, factory, factoryData, to } = parameters;
    return encodeDeployData({
      abi: parseAbi(["constructor(address, bytes, address, bytes)"]),
      bytecode: deploylessCallViaFactoryBytecode,
      args: [to, data, factory, factoryData]
    });
  }
  function getRevertErrorData(err) {
    if (!(err instanceof BaseError))
      return void 0;
    const error = err.walk();
    return typeof error?.data === "object" ? error.data?.data : error.data;
  }
  var init_call = __esm({
    "node_modules/viem/_esm/actions/public/call.js"() {
      "use strict";
      init_exports();
      init_parseAccount();
      init_abis();
      init_contract2();
      init_contracts();
      init_base();
      init_chain();
      init_contract();
      init_decodeFunctionResult();
      init_encodeDeployData();
      init_encodeFunctionData();
      init_getChainContractAddress();
      init_toHex();
      init_getCallError();
      init_extract();
      init_transactionRequest();
      init_createBatchScheduler();
      init_stateOverride2();
      init_assertRequest();
    }
  });

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    app: () => app,
    default: () => src_default
  });
  var import_wapo_env = __toESM(require_dist());

  // node_modules/hono/dist/utils/body.js
  var parseBody = async (request, options = /* @__PURE__ */ Object.create(null)) => {
    const { all = false, dot = false } = options;
    const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
    const contentType = headers.get("Content-Type");
    if (contentType !== null && contentType.startsWith("multipart/form-data") || contentType !== null && contentType.startsWith("application/x-www-form-urlencoded")) {
      return parseFormData(request, { all, dot });
    }
    return {};
  };
  async function parseFormData(request, options) {
    const formData = await request.formData();
    if (formData) {
      return convertFormDataToBodyData(formData, options);
    }
    return {};
  }
  function convertFormDataToBodyData(formData, options) {
    const form = /* @__PURE__ */ Object.create(null);
    formData.forEach((value, key) => {
      const shouldParseAllValues = options.all || key.endsWith("[]");
      if (!shouldParseAllValues) {
        form[key] = value;
      } else {
        handleParsingAllValues(form, key, value);
      }
    });
    if (options.dot) {
      Object.entries(form).forEach(([key, value]) => {
        const shouldParseDotValues = key.includes(".");
        if (shouldParseDotValues) {
          handleParsingNestedValues(form, key, value);
          delete form[key];
        }
      });
    }
    return form;
  }
  var handleParsingAllValues = (form, key, value) => {
    if (form[key] !== void 0) {
      if (Array.isArray(form[key])) {
        ;
        form[key].push(value);
      } else {
        form[key] = [form[key], value];
      }
    } else {
      form[key] = value;
    }
  };
  var handleParsingNestedValues = (form, key, value) => {
    let nestedForm = form;
    const keys = key.split(".");
    keys.forEach((key2, index2) => {
      if (index2 === keys.length - 1) {
        nestedForm[key2] = value;
      } else {
        if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
          nestedForm[key2] = /* @__PURE__ */ Object.create(null);
        }
        nestedForm = nestedForm[key2];
      }
    });
  };

  // node_modules/hono/dist/utils/url.js
  var tryDecodeURI = (str) => {
    try {
      return decodeURI(str);
    } catch {
      return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match) => {
        try {
          return decodeURI(match);
        } catch {
          return match;
        }
      });
    }
  };
  var getPath = (request) => {
    const url = request.url;
    const start = url.indexOf("/", 8);
    let i = start;
    for (; i < url.length; i++) {
      const charCode = url.charCodeAt(i);
      if (charCode === 37) {
        const queryIndex = url.indexOf("?", i);
        const path = url.slice(start, queryIndex === -1 ? void 0 : queryIndex);
        return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
      } else if (charCode === 63) {
        break;
      }
    }
    return url.slice(start, i);
  };
  var getPathNoStrict = (request) => {
    const result = getPath(request);
    return result.length > 1 && result[result.length - 1] === "/" ? result.slice(0, -1) : result;
  };
  var mergePath = (...paths) => {
    let p = "";
    let endsWithSlash = false;
    for (let path of paths) {
      if (p[p.length - 1] === "/") {
        p = p.slice(0, -1);
        endsWithSlash = true;
      }
      if (path[0] !== "/") {
        path = `/${path}`;
      }
      if (path === "/" && endsWithSlash) {
        p = `${p}/`;
      } else if (path !== "/") {
        p = `${p}${path}`;
      }
      if (path === "/" && p === "") {
        p = "/";
      }
    }
    return p;
  };
  var _decodeURI = (value) => {
    if (!/[%+]/.test(value)) {
      return value;
    }
    if (value.indexOf("+") !== -1) {
      value = value.replace(/\+/g, " ");
    }
    return /%/.test(value) ? decodeURIComponent_(value) : value;
  };
  var _getQueryParam = (url, key, multiple) => {
    let encoded;
    if (!multiple && key && !/[%+]/.test(key)) {
      let keyIndex2 = url.indexOf(`?${key}`, 8);
      if (keyIndex2 === -1) {
        keyIndex2 = url.indexOf(`&${key}`, 8);
      }
      while (keyIndex2 !== -1) {
        const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
        if (trailingKeyCode === 61) {
          const valueIndex = keyIndex2 + key.length + 2;
          const endIndex = url.indexOf("&", valueIndex);
          return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
        } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
          return "";
        }
        keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
      }
      encoded = /[%+]/.test(url);
      if (!encoded) {
        return void 0;
      }
    }
    const results = {};
    encoded ?? (encoded = /[%+]/.test(url));
    let keyIndex = url.indexOf("?", 8);
    while (keyIndex !== -1) {
      const nextKeyIndex = url.indexOf("&", keyIndex + 1);
      let valueIndex = url.indexOf("=", keyIndex);
      if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
        valueIndex = -1;
      }
      let name = url.slice(
        keyIndex + 1,
        valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
      );
      if (encoded) {
        name = _decodeURI(name);
      }
      keyIndex = nextKeyIndex;
      if (name === "") {
        continue;
      }
      let value;
      if (valueIndex === -1) {
        value = "";
      } else {
        value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
        if (encoded) {
          value = _decodeURI(value);
        }
      }
      if (multiple) {
        if (!(results[name] && Array.isArray(results[name]))) {
          results[name] = [];
        }
        ;
        results[name].push(value);
      } else {
        results[name] ?? (results[name] = value);
      }
    }
    return key ? results[key] : results;
  };
  var getQueryParam = _getQueryParam;
  var getQueryParams = (url, key) => {
    return _getQueryParam(url, key, true);
  };
  var decodeURIComponent_ = decodeURIComponent;

  // node_modules/hono/dist/request.js
  var _validatedData, _matchResult, _a;
  var HonoRequest = (_a = class {
    constructor(request, path = "/", matchResult = [[]]) {
      __publicField(this, "raw");
      __privateAdd(this, _validatedData);
      __privateAdd(this, _matchResult);
      __publicField(this, "routeIndex", 0);
      __publicField(this, "path");
      __publicField(this, "bodyCache", {});
      __publicField(this, "cachedBody", (key) => {
        const { bodyCache, raw: raw2 } = this;
        const cachedBody = bodyCache[key];
        if (cachedBody) {
          return cachedBody;
        }
        const anyCachedKey = Object.keys(bodyCache)[0];
        if (anyCachedKey) {
          return bodyCache[anyCachedKey].then((body) => {
            if (anyCachedKey === "json") {
              body = JSON.stringify(body);
            }
            return new Response(body)[key]();
          });
        }
        return bodyCache[key] = raw2[key]();
      });
      this.raw = request;
      this.path = path;
      __privateSet(this, _matchResult, matchResult);
      __privateSet(this, _validatedData, {});
    }
    param(key) {
      return key ? this.getDecodedParam(key) : this.getAllDecodedParams();
    }
    getDecodedParam(key) {
      const paramKey = __privateGet(this, _matchResult)[0][this.routeIndex][1][key];
      const param = this.getParamValue(paramKey);
      return param ? /\%/.test(param) ? decodeURIComponent_(param) : param : void 0;
    }
    getAllDecodedParams() {
      const decoded = {};
      const keys = Object.keys(__privateGet(this, _matchResult)[0][this.routeIndex][1]);
      for (const key of keys) {
        const value = this.getParamValue(__privateGet(this, _matchResult)[0][this.routeIndex][1][key]);
        if (value && typeof value === "string") {
          decoded[key] = /\%/.test(value) ? decodeURIComponent_(value) : value;
        }
      }
      return decoded;
    }
    getParamValue(paramKey) {
      return __privateGet(this, _matchResult)[1] ? __privateGet(this, _matchResult)[1][paramKey] : paramKey;
    }
    query(key) {
      return getQueryParam(this.url, key);
    }
    queries(key) {
      return getQueryParams(this.url, key);
    }
    header(name) {
      if (name) {
        return this.raw.headers.get(name.toLowerCase()) ?? void 0;
      }
      const headerData = {};
      this.raw.headers.forEach((value, key) => {
        headerData[key] = value;
      });
      return headerData;
    }
    async parseBody(options) {
      var _a4;
      return (_a4 = this.bodyCache).parsedBody ?? (_a4.parsedBody = await parseBody(this, options));
    }
    json() {
      return this.cachedBody("json");
    }
    text() {
      return this.cachedBody("text");
    }
    arrayBuffer() {
      return this.cachedBody("arrayBuffer");
    }
    blob() {
      return this.cachedBody("blob");
    }
    formData() {
      return this.cachedBody("formData");
    }
    addValidatedData(target, data) {
      __privateGet(this, _validatedData)[target] = data;
    }
    valid(target) {
      return __privateGet(this, _validatedData)[target];
    }
    get url() {
      return this.raw.url;
    }
    get method() {
      return this.raw.method;
    }
    get matchedRoutes() {
      return __privateGet(this, _matchResult)[0].map(([[, route]]) => route);
    }
    get routePath() {
      return __privateGet(this, _matchResult)[0].map(([[, route]]) => route)[this.routeIndex].path;
    }
  }, _validatedData = new WeakMap(), _matchResult = new WeakMap(), _a);

  // node_modules/hono/dist/utils/html.js
  var HtmlEscapedCallbackPhase = {
    Stringify: 1,
    BeforeStream: 2,
    Stream: 3
  };
  var raw = (value, callbacks) => {
    const escapedString = new String(value);
    escapedString.isEscaped = true;
    escapedString.callbacks = callbacks;
    return escapedString;
  };
  var resolveCallback = async (str, phase, preserveCallbacks, context, buffer2) => {
    const callbacks = str.callbacks;
    if (!callbacks?.length) {
      return Promise.resolve(str);
    }
    if (buffer2) {
      buffer2[0] += str;
    } else {
      buffer2 = [str];
    }
    const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer: buffer2, context }))).then(
      (res) => Promise.all(
        res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer2))
      ).then(() => buffer2[0])
    );
    if (preserveCallbacks) {
      return raw(await resStr, callbacks);
    } else {
      return resStr;
    }
  };

  // node_modules/hono/dist/context.js
  var TEXT_PLAIN = "text/plain; charset=UTF-8";
  var setHeaders = (headers, map = {}) => {
    Object.entries(map).forEach(([key, value]) => headers.set(key, value));
    return headers;
  };
  var _rawRequest, _req, _var, _status, _executionCtx, _headers, _preparedHeaders, _res, _isFresh, _layout, _renderer, _notFoundHandler, _matchResult2, _path, _a2;
  var Context = (_a2 = class {
    constructor(req, options) {
      __privateAdd(this, _rawRequest);
      __privateAdd(this, _req);
      __publicField(this, "env", {});
      __privateAdd(this, _var);
      __publicField(this, "finalized", false);
      __publicField(this, "error");
      __privateAdd(this, _status, 200);
      __privateAdd(this, _executionCtx);
      __privateAdd(this, _headers);
      __privateAdd(this, _preparedHeaders);
      __privateAdd(this, _res);
      __privateAdd(this, _isFresh, true);
      __privateAdd(this, _layout);
      __privateAdd(this, _renderer);
      __privateAdd(this, _notFoundHandler);
      __privateAdd(this, _matchResult2);
      __privateAdd(this, _path);
      __publicField(this, "render", (...args) => {
        __privateGet(this, _renderer) ?? __privateSet(this, _renderer, (content) => this.html(content));
        return __privateGet(this, _renderer).call(this, ...args);
      });
      __publicField(this, "setLayout", (layout) => __privateSet(this, _layout, layout));
      __publicField(this, "getLayout", () => __privateGet(this, _layout));
      __publicField(this, "setRenderer", (renderer) => {
        __privateSet(this, _renderer, renderer);
      });
      __publicField(this, "header", (name, value, options) => {
        if (value === void 0) {
          if (__privateGet(this, _headers)) {
            __privateGet(this, _headers).delete(name);
          } else if (__privateGet(this, _preparedHeaders)) {
            delete __privateGet(this, _preparedHeaders)[name.toLocaleLowerCase()];
          }
          if (this.finalized) {
            this.res.headers.delete(name);
          }
          return;
        }
        if (options?.append) {
          if (!__privateGet(this, _headers)) {
            __privateSet(this, _isFresh, false);
            __privateSet(this, _headers, new Headers(__privateGet(this, _preparedHeaders)));
            __privateSet(this, _preparedHeaders, {});
          }
          __privateGet(this, _headers).append(name, value);
        } else {
          if (__privateGet(this, _headers)) {
            __privateGet(this, _headers).set(name, value);
          } else {
            __privateGet(this, _preparedHeaders) ?? __privateSet(this, _preparedHeaders, {});
            __privateGet(this, _preparedHeaders)[name.toLowerCase()] = value;
          }
        }
        if (this.finalized) {
          if (options?.append) {
            this.res.headers.append(name, value);
          } else {
            this.res.headers.set(name, value);
          }
        }
      });
      __publicField(this, "status", (status) => {
        __privateSet(this, _isFresh, false);
        __privateSet(this, _status, status);
      });
      __publicField(this, "set", (key, value) => {
        __privateGet(this, _var) ?? __privateSet(this, _var, /* @__PURE__ */ new Map());
        __privateGet(this, _var).set(key, value);
      });
      __publicField(this, "get", (key) => {
        return __privateGet(this, _var) ? __privateGet(this, _var).get(key) : void 0;
      });
      __publicField(this, "newResponse", (data, arg, headers) => {
        if (__privateGet(this, _isFresh) && !headers && !arg && __privateGet(this, _status) === 200) {
          return new Response(data, {
            headers: __privateGet(this, _preparedHeaders)
          });
        }
        if (arg && typeof arg !== "number") {
          const header = new Headers(arg.headers);
          if (__privateGet(this, _headers)) {
            __privateGet(this, _headers).forEach((v, k) => {
              if (k === "set-cookie") {
                header.append(k, v);
              } else {
                header.set(k, v);
              }
            });
          }
          const headers2 = setHeaders(header, __privateGet(this, _preparedHeaders));
          return new Response(data, {
            headers: headers2,
            status: arg.status ?? __privateGet(this, _status)
          });
        }
        const status = typeof arg === "number" ? arg : __privateGet(this, _status);
        __privateGet(this, _preparedHeaders) ?? __privateSet(this, _preparedHeaders, {});
        __privateGet(this, _headers) ?? __privateSet(this, _headers, new Headers());
        setHeaders(__privateGet(this, _headers), __privateGet(this, _preparedHeaders));
        if (__privateGet(this, _res)) {
          __privateGet(this, _res).headers.forEach((v, k) => {
            if (k === "set-cookie") {
              __privateGet(this, _headers)?.append(k, v);
            } else {
              __privateGet(this, _headers)?.set(k, v);
            }
          });
          setHeaders(__privateGet(this, _headers), __privateGet(this, _preparedHeaders));
        }
        headers ?? (headers = {});
        for (const [k, v] of Object.entries(headers)) {
          if (typeof v === "string") {
            __privateGet(this, _headers).set(k, v);
          } else {
            __privateGet(this, _headers).delete(k);
            for (const v2 of v) {
              __privateGet(this, _headers).append(k, v2);
            }
          }
        }
        return new Response(data, {
          status,
          headers: __privateGet(this, _headers)
        });
      });
      __publicField(this, "body", (data, arg, headers) => {
        return typeof arg === "number" ? this.newResponse(data, arg, headers) : this.newResponse(data, arg);
      });
      __publicField(this, "text", (text, arg, headers) => {
        if (!__privateGet(this, _preparedHeaders)) {
          if (__privateGet(this, _isFresh) && !headers && !arg) {
            return new Response(text);
          }
          __privateSet(this, _preparedHeaders, {});
        }
        __privateGet(this, _preparedHeaders)["content-type"] = TEXT_PLAIN;
        return typeof arg === "number" ? this.newResponse(text, arg, headers) : this.newResponse(text, arg);
      });
      __publicField(this, "json", (object, arg, headers) => {
        const body = JSON.stringify(object);
        __privateGet(this, _preparedHeaders) ?? __privateSet(this, _preparedHeaders, {});
        __privateGet(this, _preparedHeaders)["content-type"] = "application/json; charset=UTF-8";
        return typeof arg === "number" ? this.newResponse(body, arg, headers) : this.newResponse(body, arg);
      });
      __publicField(this, "html", (html, arg, headers) => {
        __privateGet(this, _preparedHeaders) ?? __privateSet(this, _preparedHeaders, {});
        __privateGet(this, _preparedHeaders)["content-type"] = "text/html; charset=UTF-8";
        if (typeof html === "object") {
          if (!(html instanceof Promise)) {
            html = html.toString();
          }
          if (html instanceof Promise) {
            return html.then((html2) => resolveCallback(html2, HtmlEscapedCallbackPhase.Stringify, false, {})).then((html2) => {
              return typeof arg === "number" ? this.newResponse(html2, arg, headers) : this.newResponse(html2, arg);
            });
          }
        }
        return typeof arg === "number" ? this.newResponse(html, arg, headers) : this.newResponse(html, arg);
      });
      __publicField(this, "redirect", (location, status) => {
        __privateGet(this, _headers) ?? __privateSet(this, _headers, new Headers());
        __privateGet(this, _headers).set("Location", location);
        return this.newResponse(null, status ?? 302);
      });
      __publicField(this, "notFound", () => {
        __privateGet(this, _notFoundHandler) ?? __privateSet(this, _notFoundHandler, () => new Response());
        return __privateGet(this, _notFoundHandler).call(this, this);
      });
      __privateSet(this, _rawRequest, req);
      if (options) {
        __privateSet(this, _executionCtx, options.executionCtx);
        this.env = options.env;
        __privateSet(this, _notFoundHandler, options.notFoundHandler);
        __privateSet(this, _path, options.path);
        __privateSet(this, _matchResult2, options.matchResult);
      }
    }
    get req() {
      __privateGet(this, _req) ?? __privateSet(this, _req, new HonoRequest(__privateGet(this, _rawRequest), __privateGet(this, _path), __privateGet(this, _matchResult2)));
      return __privateGet(this, _req);
    }
    get event() {
      if (__privateGet(this, _executionCtx) && "respondWith" in __privateGet(this, _executionCtx)) {
        return __privateGet(this, _executionCtx);
      } else {
        throw Error("This context has no FetchEvent");
      }
    }
    get executionCtx() {
      if (__privateGet(this, _executionCtx)) {
        return __privateGet(this, _executionCtx);
      } else {
        throw Error("This context has no ExecutionContext");
      }
    }
    get res() {
      __privateSet(this, _isFresh, false);
      return __privateGet(this, _res) || __privateSet(this, _res, new Response("404 Not Found", { status: 404 }));
    }
    set res(_res2) {
      __privateSet(this, _isFresh, false);
      if (__privateGet(this, _res) && _res2) {
        __privateGet(this, _res).headers.delete("content-type");
        for (const [k, v] of __privateGet(this, _res).headers.entries()) {
          if (k === "set-cookie") {
            const cookies = __privateGet(this, _res).headers.getSetCookie();
            _res2.headers.delete("set-cookie");
            for (const cookie of cookies) {
              _res2.headers.append("set-cookie", cookie);
            }
          } else {
            _res2.headers.set(k, v);
          }
        }
      }
      __privateSet(this, _res, _res2);
      this.finalized = true;
    }
    get var() {
      if (!__privateGet(this, _var)) {
        return {};
      }
      return Object.fromEntries(__privateGet(this, _var));
    }
  }, _rawRequest = new WeakMap(), _req = new WeakMap(), _var = new WeakMap(), _status = new WeakMap(), _executionCtx = new WeakMap(), _headers = new WeakMap(), _preparedHeaders = new WeakMap(), _res = new WeakMap(), _isFresh = new WeakMap(), _layout = new WeakMap(), _renderer = new WeakMap(), _notFoundHandler = new WeakMap(), _matchResult2 = new WeakMap(), _path = new WeakMap(), _a2);

  // node_modules/hono/dist/compose.js
  var compose = (middleware, onError, onNotFound) => {
    return (context, next) => {
      let index2 = -1;
      return dispatch(0);
      async function dispatch(i) {
        if (i <= index2) {
          throw new Error("next() called multiple times");
        }
        index2 = i;
        let res;
        let isError2 = false;
        let handler;
        if (middleware[i]) {
          handler = middleware[i][0][0];
          if (context instanceof Context) {
            context.req.routeIndex = i;
          }
        } else {
          handler = i === middleware.length && next || void 0;
        }
        if (!handler) {
          if (context instanceof Context && context.finalized === false && onNotFound) {
            res = await onNotFound(context);
          }
        } else {
          try {
            res = await handler(context, () => {
              return dispatch(i + 1);
            });
          } catch (err) {
            if (err instanceof Error && context instanceof Context && onError) {
              context.error = err;
              res = await onError(err, context);
              isError2 = true;
            } else {
              throw err;
            }
          }
        }
        if (res && (context.finalized === false || isError2)) {
          context.res = res;
        }
        return context;
      }
    };
  };

  // node_modules/hono/dist/router.js
  var METHOD_NAME_ALL = "ALL";
  var METHOD_NAME_ALL_LOWERCASE = "all";
  var METHODS = ["get", "post", "put", "delete", "options", "patch"];
  var UnsupportedPathError = class extends Error {
  };

  // node_modules/hono/dist/hono-base.js
  var COMPOSED_HANDLER = Symbol("composedHandler");
  var notFoundHandler = (c) => {
    return c.text("404 Not Found", 404);
  };
  var errorHandler = (err, c) => {
    if ("getResponse" in err) {
      return err.getResponse();
    }
    console.error(err);
    return c.text("Internal Server Error", 500);
  };
  var _path2, _a3;
  var Hono = (_a3 = class {
    constructor(options = {}) {
      __publicField(this, "get");
      __publicField(this, "post");
      __publicField(this, "put");
      __publicField(this, "delete");
      __publicField(this, "options");
      __publicField(this, "patch");
      __publicField(this, "all");
      __publicField(this, "on");
      __publicField(this, "use");
      __publicField(this, "router");
      __publicField(this, "getPath");
      __publicField(this, "_basePath", "/");
      __privateAdd(this, _path2, "/");
      __publicField(this, "routes", []);
      __publicField(this, "notFoundHandler", notFoundHandler);
      __publicField(this, "errorHandler", errorHandler);
      __publicField(this, "onError", (handler) => {
        this.errorHandler = handler;
        return this;
      });
      __publicField(this, "notFound", (handler) => {
        this.notFoundHandler = handler;
        return this;
      });
      __publicField(this, "fetch", (request, ...rest) => {
        return this.dispatch(request, rest[1], rest[0], request.method);
      });
      __publicField(this, "request", (input, requestInit, Env, executionCtx) => {
        if (input instanceof Request) {
          if (requestInit !== void 0) {
            input = new Request(input, requestInit);
          }
          return this.fetch(input, Env, executionCtx);
        }
        input = input.toString();
        const path = /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`;
        const req = new Request(path, requestInit);
        return this.fetch(req, Env, executionCtx);
      });
      __publicField(this, "fire", () => {
        addEventListener("fetch", (event) => {
          event.respondWith(this.dispatch(event.request, event, void 0, event.request.method));
        });
      });
      const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
      allMethods.forEach((method) => {
        this[method] = (args1, ...args) => {
          if (typeof args1 === "string") {
            __privateSet(this, _path2, args1);
          } else {
            this.addRoute(method, __privateGet(this, _path2), args1);
          }
          args.forEach((handler) => {
            if (typeof handler !== "string") {
              this.addRoute(method, __privateGet(this, _path2), handler);
            }
          });
          return this;
        };
      });
      this.on = (method, path, ...handlers) => {
        for (const p of [path].flat()) {
          __privateSet(this, _path2, p);
          for (const m of [method].flat()) {
            handlers.map((handler) => {
              this.addRoute(m.toUpperCase(), __privateGet(this, _path2), handler);
            });
          }
        }
        return this;
      };
      this.use = (arg1, ...handlers) => {
        if (typeof arg1 === "string") {
          __privateSet(this, _path2, arg1);
        } else {
          __privateSet(this, _path2, "*");
          handlers.unshift(arg1);
        }
        handlers.forEach((handler) => {
          this.addRoute(METHOD_NAME_ALL, __privateGet(this, _path2), handler);
        });
        return this;
      };
      const strict = options.strict ?? true;
      delete options.strict;
      Object.assign(this, options);
      this.getPath = strict ? options.getPath ?? getPath : getPathNoStrict;
    }
    clone() {
      const clone = new Hono({
        router: this.router,
        getPath: this.getPath
      });
      clone.routes = this.routes;
      return clone;
    }
    route(path, app2) {
      const subApp = this.basePath(path);
      app2.routes.map((r) => {
        let handler;
        if (app2.errorHandler === errorHandler) {
          handler = r.handler;
        } else {
          handler = async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res;
          handler[COMPOSED_HANDLER] = r.handler;
        }
        subApp.addRoute(r.method, r.path, handler);
      });
      return this;
    }
    basePath(path) {
      const subApp = this.clone();
      subApp._basePath = mergePath(this._basePath, path);
      return subApp;
    }
    mount(path, applicationHandler, options) {
      let replaceRequest;
      let optionHandler;
      if (options) {
        if (typeof options === "function") {
          optionHandler = options;
        } else {
          optionHandler = options.optionHandler;
          replaceRequest = options.replaceRequest;
        }
      }
      const getOptions = optionHandler ? (c) => {
        const options2 = optionHandler(c);
        return Array.isArray(options2) ? options2 : [options2];
      } : (c) => {
        let executionContext = void 0;
        try {
          executionContext = c.executionCtx;
        } catch {
        }
        return [c.env, executionContext];
      };
      replaceRequest || (replaceRequest = (() => {
        const mergedPath = mergePath(this._basePath, path);
        const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
        return (request) => {
          const url = new URL(request.url);
          url.pathname = url.pathname.slice(pathPrefixLength) || "/";
          return new Request(url, request);
        };
      })());
      const handler = async (c, next) => {
        const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
        if (res) {
          return res;
        }
        await next();
      };
      this.addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
      return this;
    }
    addRoute(method, path, handler) {
      method = method.toUpperCase();
      path = mergePath(this._basePath, path);
      const r = { path, method, handler };
      this.router.add(method, path, [handler, r]);
      this.routes.push(r);
    }
    matchRoute(method, path) {
      return this.router.match(method, path);
    }
    handleError(err, c) {
      if (err instanceof Error) {
        return this.errorHandler(err, c);
      }
      throw err;
    }
    dispatch(request, executionCtx, env, method) {
      if (method === "HEAD") {
        return (async () => new Response(null, await this.dispatch(request, executionCtx, env, "GET")))();
      }
      const path = this.getPath(request, { env });
      const matchResult = this.matchRoute(method, path);
      const c = new Context(request, {
        path,
        matchResult,
        env,
        executionCtx,
        notFoundHandler: this.notFoundHandler
      });
      if (matchResult[0].length === 1) {
        let res;
        try {
          res = matchResult[0][0][0][0](c, async () => {
            c.res = await this.notFoundHandler(c);
          });
        } catch (err) {
          return this.handleError(err, c);
        }
        return res instanceof Promise ? res.then(
          (resolved) => resolved || (c.finalized ? c.res : this.notFoundHandler(c))
        ).catch((err) => this.handleError(err, c)) : res ?? this.notFoundHandler(c);
      }
      const composed = compose(matchResult[0], this.errorHandler, this.notFoundHandler);
      return (async () => {
        try {
          const context = await composed(c);
          if (!context.finalized) {
            throw new Error(
              "Context is not finalized. Did you forget to return a Response object or `await next()`?"
            );
          }
          return context.res;
        } catch (err) {
          return this.handleError(err, c);
        }
      })();
    }
  }, _path2 = new WeakMap(), _a3);

  // node_modules/hono/dist/router/pattern-router/router.js
  var PatternRouter = class {
    constructor() {
      __publicField(this, "name", "PatternRouter");
      __publicField(this, "routes", []);
    }
    add(method, path, handler) {
      const endsWithWildcard = path[path.length - 1] === "*";
      if (endsWithWildcard) {
        path = path.slice(0, -2);
      }
      if (path.at(-1) === "?") {
        path = path.slice(0, -1);
        this.add(method, path.replace(/\/[^/]+$/, ""), handler);
      }
      const parts = (path.match(/\/?(:\w+(?:{(?:(?:{[\d,]+})|[^}])+})?)|\/?[^\/\?]+/g) || []).map(
        (part) => {
          const match = part.match(/^\/:([^{]+)(?:{(.*)})?/);
          return match ? `/(?<${match[1]}>${match[2] || "[^/]+"})` : part === "/*" ? "/[^/]+" : part.replace(/[.\\+*[^\]$()]/g, "\\$&");
        }
      );
      let re;
      try {
        re = new RegExp(`^${parts.join("")}${endsWithWildcard ? "" : "/?$"}`);
      } catch (e) {
        throw new UnsupportedPathError();
      }
      this.routes.push([re, method, handler]);
    }
    match(method, path) {
      const handlers = [];
      for (const [pattern, routeMethod, handler] of this.routes) {
        if (routeMethod === METHOD_NAME_ALL || routeMethod === method) {
          const match = pattern.exec(path);
          if (match) {
            handlers.push([handler, match.groups || /* @__PURE__ */ Object.create(null)]);
          }
        }
      }
      return [handlers];
    }
  };

  // node_modules/hono/dist/preset/tiny.js
  var Hono2 = class extends Hono {
    constructor(options = {}) {
      super(options);
      this.router = new PatternRouter();
    }
  };

  // src/index.ts
  var import_guest = __toESM(require_guest());

  // node_modules/viem/_esm/accounts/privateKeyToAccount.js
  init_secp256k1();
  init_toHex();

  // node_modules/viem/_esm/accounts/toAccount.js
  init_address();
  init_isAddress();
  function toAccount(source) {
    if (typeof source === "string") {
      if (!isAddress(source, { strict: false }))
        throw new InvalidAddressError({ address: source });
      return {
        address: source,
        type: "json-rpc"
      };
    }
    if (!isAddress(source.address, { strict: false }))
      throw new InvalidAddressError({ address: source.address });
    return {
      address: source.address,
      nonceManager: source.nonceManager,
      sign: source.sign,
      experimental_signAuthorization: source.experimental_signAuthorization,
      signMessage: source.signMessage,
      signTransaction: source.signTransaction,
      signTypedData: source.signTypedData,
      source: "custom",
      type: "local"
    };
  }

  // node_modules/viem/_esm/accounts/utils/publicKeyToAddress.js
  init_getAddress();
  init_keccak256();
  function publicKeyToAddress(publicKey) {
    const address = keccak256(`0x${publicKey.substring(4)}`).substring(26);
    return checksumAddress(`0x${address}`);
  }

  // node_modules/viem/_esm/accounts/utils/sign.js
  init_secp256k1();
  init_toHex();

  // node_modules/viem/_esm/utils/signature/serializeSignature.js
  init_secp256k1();
  init_fromHex();
  init_toBytes();
  function serializeSignature({ r, s, to = "hex", v, yParity }) {
    const yParity_ = (() => {
      if (yParity === 0 || yParity === 1)
        return yParity;
      if (v && (v === 27n || v === 28n || v >= 35n))
        return v % 2n === 0n ? 1 : 0;
      throw new Error("Invalid `v` or `yParity` value");
    })();
    const signature = `0x${new secp256k1.Signature(hexToBigInt(r), hexToBigInt(s)).toCompactHex()}${yParity_ === 0 ? "1b" : "1c"}`;
    if (to === "hex")
      return signature;
    return hexToBytes2(signature);
  }

  // node_modules/viem/_esm/accounts/utils/sign.js
  async function sign({ hash: hash3, privateKey, to = "object" }) {
    const { r, s, recovery } = secp256k1.sign(hash3.slice(2), privateKey.slice(2));
    const signature = {
      r: numberToHex(r, { size: 32 }),
      s: numberToHex(s, { size: 32 }),
      v: recovery ? 28n : 27n,
      yParity: recovery
    };
    return (() => {
      if (to === "bytes" || to === "hex")
        return serializeSignature({ ...signature, to });
      return signature;
    })();
  }

  // node_modules/viem/_esm/experimental/eip7702/utils/hashAuthorization.js
  init_concat();
  init_toBytes();
  init_toHex();

  // node_modules/viem/_esm/utils/encoding/toRlp.js
  init_base();
  init_cursor2();
  init_toBytes();
  init_toHex();
  function toRlp(bytes2, to = "hex") {
    const encodable = getEncodable(bytes2);
    const cursor = createCursor(new Uint8Array(encodable.length));
    encodable.encode(cursor);
    if (to === "hex")
      return bytesToHex2(cursor.bytes);
    return cursor.bytes;
  }
  function getEncodable(bytes2) {
    if (Array.isArray(bytes2))
      return getEncodableList(bytes2.map((x) => getEncodable(x)));
    return getEncodableBytes(bytes2);
  }
  function getEncodableList(list) {
    const bodyLength = list.reduce((acc, x) => acc + x.length, 0);
    const sizeOfBodyLength = getSizeOfLength(bodyLength);
    const length = (() => {
      if (bodyLength <= 55)
        return 1 + bodyLength;
      return 1 + sizeOfBodyLength + bodyLength;
    })();
    return {
      length,
      encode(cursor) {
        if (bodyLength <= 55) {
          cursor.pushByte(192 + bodyLength);
        } else {
          cursor.pushByte(192 + 55 + sizeOfBodyLength);
          if (sizeOfBodyLength === 1)
            cursor.pushUint8(bodyLength);
          else if (sizeOfBodyLength === 2)
            cursor.pushUint16(bodyLength);
          else if (sizeOfBodyLength === 3)
            cursor.pushUint24(bodyLength);
          else
            cursor.pushUint32(bodyLength);
        }
        for (const { encode: encode2 } of list) {
          encode2(cursor);
        }
      }
    };
  }
  function getEncodableBytes(bytesOrHex) {
    const bytes2 = typeof bytesOrHex === "string" ? hexToBytes2(bytesOrHex) : bytesOrHex;
    const sizeOfBytesLength = getSizeOfLength(bytes2.length);
    const length = (() => {
      if (bytes2.length === 1 && bytes2[0] < 128)
        return 1;
      if (bytes2.length <= 55)
        return 1 + bytes2.length;
      return 1 + sizeOfBytesLength + bytes2.length;
    })();
    return {
      length,
      encode(cursor) {
        if (bytes2.length === 1 && bytes2[0] < 128) {
          cursor.pushBytes(bytes2);
        } else if (bytes2.length <= 55) {
          cursor.pushByte(128 + bytes2.length);
          cursor.pushBytes(bytes2);
        } else {
          cursor.pushByte(128 + 55 + sizeOfBytesLength);
          if (sizeOfBytesLength === 1)
            cursor.pushUint8(bytes2.length);
          else if (sizeOfBytesLength === 2)
            cursor.pushUint16(bytes2.length);
          else if (sizeOfBytesLength === 3)
            cursor.pushUint24(bytes2.length);
          else
            cursor.pushUint32(bytes2.length);
          cursor.pushBytes(bytes2);
        }
      }
    };
  }
  function getSizeOfLength(length) {
    if (length < 2 ** 8)
      return 1;
    if (length < 2 ** 16)
      return 2;
    if (length < 2 ** 24)
      return 3;
    if (length < 2 ** 32)
      return 4;
    throw new BaseError("Length is too large.");
  }

  // node_modules/viem/_esm/experimental/eip7702/utils/hashAuthorization.js
  init_keccak256();
  function hashAuthorization(parameters) {
    const { chainId, contractAddress, nonce, to } = parameters;
    const hash3 = keccak256(concatHex([
      "0x05",
      toRlp([
        numberToHex(chainId),
        contractAddress,
        nonce ? numberToHex(nonce) : "0x"
      ])
    ]));
    if (to === "bytes")
      return hexToBytes2(hash3);
    return hash3;
  }

  // node_modules/viem/_esm/accounts/utils/signAuthorization.js
  async function experimental_signAuthorization(parameters) {
    const { contractAddress, chainId, nonce, privateKey, to = "object" } = parameters;
    const signature = await sign({
      hash: hashAuthorization({ contractAddress, chainId, nonce }),
      privateKey,
      to
    });
    if (to === "object")
      return {
        contractAddress,
        chainId,
        nonce,
        ...signature
      };
    return signature;
  }

  // node_modules/viem/_esm/utils/signature/hashMessage.js
  init_keccak256();

  // node_modules/viem/_esm/constants/strings.js
  var presignMessagePrefix = "Ethereum Signed Message:\n";

  // node_modules/viem/_esm/utils/signature/toPrefixedMessage.js
  init_concat();
  init_size();
  init_toHex();
  function toPrefixedMessage(message_) {
    const message = (() => {
      if (typeof message_ === "string")
        return stringToHex(message_);
      if (typeof message_.raw === "string")
        return message_.raw;
      return bytesToHex2(message_.raw);
    })();
    const prefix = stringToHex(`${presignMessagePrefix}${size(message)}`);
    return concat([prefix, message]);
  }

  // node_modules/viem/_esm/utils/signature/hashMessage.js
  function hashMessage(message, to_) {
    return keccak256(toPrefixedMessage(message), to_);
  }

  // node_modules/viem/_esm/accounts/utils/signMessage.js
  async function signMessage({ message, privateKey }) {
    return await sign({ hash: hashMessage(message), privateKey, to: "hex" });
  }

  // node_modules/viem/_esm/accounts/utils/signTransaction.js
  init_keccak256();

  // node_modules/viem/_esm/utils/transaction/serializeTransaction.js
  init_transaction();

  // node_modules/viem/_esm/utils/blob/blobsToCommitments.js
  init_toBytes();
  init_toHex();
  function blobsToCommitments(parameters) {
    const { kzg } = parameters;
    const to = parameters.to ?? (typeof parameters.blobs[0] === "string" ? "hex" : "bytes");
    const blobs = typeof parameters.blobs[0] === "string" ? parameters.blobs.map((x) => hexToBytes2(x)) : parameters.blobs;
    const commitments = [];
    for (const blob of blobs)
      commitments.push(Uint8Array.from(kzg.blobToKzgCommitment(blob)));
    return to === "bytes" ? commitments : commitments.map((x) => bytesToHex2(x));
  }

  // node_modules/viem/_esm/utils/blob/blobsToProofs.js
  init_toBytes();
  init_toHex();
  function blobsToProofs(parameters) {
    const { kzg } = parameters;
    const to = parameters.to ?? (typeof parameters.blobs[0] === "string" ? "hex" : "bytes");
    const blobs = typeof parameters.blobs[0] === "string" ? parameters.blobs.map((x) => hexToBytes2(x)) : parameters.blobs;
    const commitments = typeof parameters.commitments[0] === "string" ? parameters.commitments.map((x) => hexToBytes2(x)) : parameters.commitments;
    const proofs = [];
    for (let i = 0; i < blobs.length; i++) {
      const blob = blobs[i];
      const commitment = commitments[i];
      proofs.push(Uint8Array.from(kzg.computeBlobKzgProof(blob, commitment)));
    }
    return to === "bytes" ? proofs : proofs.map((x) => bytesToHex2(x));
  }

  // node_modules/viem/_esm/utils/blob/commitmentToVersionedHash.js
  init_toHex();

  // node_modules/viem/_esm/utils/hash/sha256.js
  init_sha256();
  init_isHex();
  init_toBytes();
  init_toHex();
  function sha2562(value, to_) {
    const to = to_ || "hex";
    const bytes2 = sha256(isHex(value, { strict: false }) ? toBytes2(value) : value);
    if (to === "bytes")
      return bytes2;
    return toHex(bytes2);
  }

  // node_modules/viem/_esm/utils/blob/commitmentToVersionedHash.js
  function commitmentToVersionedHash(parameters) {
    const { commitment, version: version3 = 1 } = parameters;
    const to = parameters.to ?? (typeof commitment === "string" ? "hex" : "bytes");
    const versionedHash = sha2562(commitment, "bytes");
    versionedHash.set([version3], 0);
    return to === "bytes" ? versionedHash : bytesToHex2(versionedHash);
  }

  // node_modules/viem/_esm/utils/blob/commitmentsToVersionedHashes.js
  function commitmentsToVersionedHashes(parameters) {
    const { commitments, version: version3 } = parameters;
    const to = parameters.to ?? (typeof commitments[0] === "string" ? "hex" : "bytes");
    const hashes = [];
    for (const commitment of commitments) {
      hashes.push(commitmentToVersionedHash({
        commitment,
        to,
        version: version3
      }));
    }
    return hashes;
  }

  // node_modules/viem/_esm/constants/blob.js
  var blobsPerTransaction = 6;
  var bytesPerFieldElement = 32;
  var fieldElementsPerBlob = 4096;
  var bytesPerBlob = bytesPerFieldElement * fieldElementsPerBlob;
  var maxBytesPerTransaction = bytesPerBlob * blobsPerTransaction - // terminator byte (0x80).
  1 - // zero byte (0x00) appended to each field element.
  1 * fieldElementsPerBlob * blobsPerTransaction;

  // node_modules/viem/_esm/constants/kzg.js
  var versionedHashVersionKzg = 1;

  // node_modules/viem/_esm/errors/blob.js
  init_base();
  var BlobSizeTooLargeError = class extends BaseError {
    constructor({ maxSize, size: size3 }) {
      super("Blob size is too large.", {
        metaMessages: [`Max: ${maxSize} bytes`, `Given: ${size3} bytes`],
        name: "BlobSizeTooLargeError"
      });
    }
  };
  var EmptyBlobError = class extends BaseError {
    constructor() {
      super("Blob data must not be empty.", { name: "EmptyBlobError" });
    }
  };
  var InvalidVersionedHashSizeError = class extends BaseError {
    constructor({ hash: hash3, size: size3 }) {
      super(`Versioned hash "${hash3}" size is invalid.`, {
        metaMessages: ["Expected: 32", `Received: ${size3}`],
        name: "InvalidVersionedHashSizeError"
      });
    }
  };
  var InvalidVersionedHashVersionError = class extends BaseError {
    constructor({ hash: hash3, version: version3 }) {
      super(`Versioned hash "${hash3}" version is invalid.`, {
        metaMessages: [
          `Expected: ${versionedHashVersionKzg}`,
          `Received: ${version3}`
        ],
        name: "InvalidVersionedHashVersionError"
      });
    }
  };

  // node_modules/viem/_esm/utils/blob/toBlobs.js
  init_cursor2();
  init_size();
  init_toBytes();
  init_toHex();
  function toBlobs(parameters) {
    const to = parameters.to ?? (typeof parameters.data === "string" ? "hex" : "bytes");
    const data = typeof parameters.data === "string" ? hexToBytes2(parameters.data) : parameters.data;
    const size_ = size(data);
    if (!size_)
      throw new EmptyBlobError();
    if (size_ > maxBytesPerTransaction)
      throw new BlobSizeTooLargeError({
        maxSize: maxBytesPerTransaction,
        size: size_
      });
    const blobs = [];
    let active = true;
    let position = 0;
    while (active) {
      const blob = createCursor(new Uint8Array(bytesPerBlob));
      let size3 = 0;
      while (size3 < fieldElementsPerBlob) {
        const bytes2 = data.slice(position, position + (bytesPerFieldElement - 1));
        blob.pushByte(0);
        blob.pushBytes(bytes2);
        if (bytes2.length < 31) {
          blob.pushByte(128);
          active = false;
          break;
        }
        size3++;
        position += 31;
      }
      blobs.push(blob);
    }
    return to === "bytes" ? blobs.map((x) => x.bytes) : blobs.map((x) => bytesToHex2(x.bytes));
  }

  // node_modules/viem/_esm/utils/blob/toBlobSidecars.js
  function toBlobSidecars(parameters) {
    const { data, kzg, to } = parameters;
    const blobs = parameters.blobs ?? toBlobs({ data, to });
    const commitments = parameters.commitments ?? blobsToCommitments({ blobs, kzg, to });
    const proofs = parameters.proofs ?? blobsToProofs({ blobs, commitments, kzg, to });
    const sidecars = [];
    for (let i = 0; i < blobs.length; i++)
      sidecars.push({
        blob: blobs[i],
        commitment: commitments[i],
        proof: proofs[i]
      });
    return sidecars;
  }

  // node_modules/viem/_esm/utils/transaction/serializeTransaction.js
  init_concat();
  init_trim();
  init_toHex();

  // node_modules/viem/_esm/experimental/eip7702/utils/serializeAuthorizationList.js
  init_toHex();
  function serializeAuthorizationList(authorizationList) {
    if (!authorizationList || authorizationList.length === 0)
      return [];
    const serializedAuthorizationList = [];
    for (const authorization of authorizationList) {
      const { contractAddress, chainId, nonce, ...signature } = authorization;
      serializedAuthorizationList.push([
        toHex(chainId),
        contractAddress,
        nonce ? toHex(nonce) : "0x",
        ...toYParitySignatureArray({}, signature)
      ]);
    }
    return serializedAuthorizationList;
  }

  // node_modules/viem/_esm/utils/transaction/assertTransaction.js
  init_number();
  init_address();
  init_base();
  init_chain();
  init_node();
  init_isAddress();
  init_size();
  init_slice();
  init_fromHex();
  function assertTransactionEIP7702(transaction) {
    const { authorizationList } = transaction;
    if (authorizationList) {
      for (const authorization of authorizationList) {
        const { contractAddress, chainId } = authorization;
        if (!isAddress(contractAddress))
          throw new InvalidAddressError({ address: contractAddress });
        if (chainId <= 0)
          throw new InvalidChainIdError({ chainId });
      }
    }
    assertTransactionEIP1559(transaction);
  }
  function assertTransactionEIP4844(transaction) {
    const { blobVersionedHashes } = transaction;
    if (blobVersionedHashes) {
      if (blobVersionedHashes.length === 0)
        throw new EmptyBlobError();
      for (const hash3 of blobVersionedHashes) {
        const size_ = size(hash3);
        const version3 = hexToNumber2(slice(hash3, 0, 1));
        if (size_ !== 32)
          throw new InvalidVersionedHashSizeError({ hash: hash3, size: size_ });
        if (version3 !== versionedHashVersionKzg)
          throw new InvalidVersionedHashVersionError({
            hash: hash3,
            version: version3
          });
      }
    }
    assertTransactionEIP1559(transaction);
  }
  function assertTransactionEIP1559(transaction) {
    const { chainId, maxPriorityFeePerGas, maxFeePerGas, to } = transaction;
    if (chainId <= 0)
      throw new InvalidChainIdError({ chainId });
    if (to && !isAddress(to))
      throw new InvalidAddressError({ address: to });
    if (maxFeePerGas && maxFeePerGas > maxUint256)
      throw new FeeCapTooHighError({ maxFeePerGas });
    if (maxPriorityFeePerGas && maxFeePerGas && maxPriorityFeePerGas > maxFeePerGas)
      throw new TipAboveFeeCapError({ maxFeePerGas, maxPriorityFeePerGas });
  }
  function assertTransactionEIP2930(transaction) {
    const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to } = transaction;
    if (chainId <= 0)
      throw new InvalidChainIdError({ chainId });
    if (to && !isAddress(to))
      throw new InvalidAddressError({ address: to });
    if (maxPriorityFeePerGas || maxFeePerGas)
      throw new BaseError("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid EIP-2930 Transaction attribute.");
    if (gasPrice && gasPrice > maxUint256)
      throw new FeeCapTooHighError({ maxFeePerGas: gasPrice });
  }
  function assertTransactionLegacy(transaction) {
    const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to } = transaction;
    if (to && !isAddress(to))
      throw new InvalidAddressError({ address: to });
    if (typeof chainId !== "undefined" && chainId <= 0)
      throw new InvalidChainIdError({ chainId });
    if (maxPriorityFeePerGas || maxFeePerGas)
      throw new BaseError("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid Legacy Transaction attribute.");
    if (gasPrice && gasPrice > maxUint256)
      throw new FeeCapTooHighError({ maxFeePerGas: gasPrice });
  }

  // node_modules/viem/_esm/utils/transaction/getTransactionType.js
  init_transaction();
  function getTransactionType(transaction) {
    if (transaction.type)
      return transaction.type;
    if (typeof transaction.authorizationList !== "undefined")
      return "eip7702";
    if (typeof transaction.blobs !== "undefined" || typeof transaction.blobVersionedHashes !== "undefined" || typeof transaction.maxFeePerBlobGas !== "undefined" || typeof transaction.sidecars !== "undefined")
      return "eip4844";
    if (typeof transaction.maxFeePerGas !== "undefined" || typeof transaction.maxPriorityFeePerGas !== "undefined") {
      return "eip1559";
    }
    if (typeof transaction.gasPrice !== "undefined") {
      if (typeof transaction.accessList !== "undefined")
        return "eip2930";
      return "legacy";
    }
    throw new InvalidSerializableTransactionError({ transaction });
  }

  // node_modules/viem/_esm/utils/transaction/serializeAccessList.js
  init_address();
  init_transaction();
  init_isAddress();
  function serializeAccessList(accessList) {
    if (!accessList || accessList.length === 0)
      return [];
    const serializedAccessList = [];
    for (let i = 0; i < accessList.length; i++) {
      const { address, storageKeys } = accessList[i];
      for (let j = 0; j < storageKeys.length; j++) {
        if (storageKeys[j].length - 2 !== 64) {
          throw new InvalidStorageKeySizeError({ storageKey: storageKeys[j] });
        }
      }
      if (!isAddress(address, { strict: false })) {
        throw new InvalidAddressError({ address });
      }
      serializedAccessList.push([address, storageKeys]);
    }
    return serializedAccessList;
  }

  // node_modules/viem/_esm/utils/transaction/serializeTransaction.js
  function serializeTransaction(transaction, signature) {
    const type = getTransactionType(transaction);
    if (type === "eip1559")
      return serializeTransactionEIP1559(transaction, signature);
    if (type === "eip2930")
      return serializeTransactionEIP2930(transaction, signature);
    if (type === "eip4844")
      return serializeTransactionEIP4844(transaction, signature);
    if (type === "eip7702")
      return serializeTransactionEIP7702(transaction, signature);
    return serializeTransactionLegacy(transaction, signature);
  }
  function serializeTransactionEIP7702(transaction, signature) {
    const { authorizationList, chainId, gas, nonce, to, value, maxFeePerGas, maxPriorityFeePerGas, accessList, data } = transaction;
    assertTransactionEIP7702(transaction);
    const serializedAccessList = serializeAccessList(accessList);
    const serializedAuthorizationList = serializeAuthorizationList(authorizationList);
    return concatHex([
      "0x04",
      toRlp([
        toHex(chainId),
        nonce ? toHex(nonce) : "0x",
        maxPriorityFeePerGas ? toHex(maxPriorityFeePerGas) : "0x",
        maxFeePerGas ? toHex(maxFeePerGas) : "0x",
        gas ? toHex(gas) : "0x",
        to ?? "0x",
        value ? toHex(value) : "0x",
        data ?? "0x",
        serializedAccessList,
        serializedAuthorizationList,
        ...toYParitySignatureArray(transaction, signature)
      ])
    ]);
  }
  function serializeTransactionEIP4844(transaction, signature) {
    const { chainId, gas, nonce, to, value, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, accessList, data } = transaction;
    assertTransactionEIP4844(transaction);
    let blobVersionedHashes = transaction.blobVersionedHashes;
    let sidecars = transaction.sidecars;
    if (transaction.blobs && (typeof blobVersionedHashes === "undefined" || typeof sidecars === "undefined")) {
      const blobs2 = typeof transaction.blobs[0] === "string" ? transaction.blobs : transaction.blobs.map((x) => bytesToHex2(x));
      const kzg = transaction.kzg;
      const commitments2 = blobsToCommitments({
        blobs: blobs2,
        kzg
      });
      if (typeof blobVersionedHashes === "undefined")
        blobVersionedHashes = commitmentsToVersionedHashes({
          commitments: commitments2
        });
      if (typeof sidecars === "undefined") {
        const proofs2 = blobsToProofs({ blobs: blobs2, commitments: commitments2, kzg });
        sidecars = toBlobSidecars({ blobs: blobs2, commitments: commitments2, proofs: proofs2 });
      }
    }
    const serializedAccessList = serializeAccessList(accessList);
    const serializedTransaction = [
      toHex(chainId),
      nonce ? toHex(nonce) : "0x",
      maxPriorityFeePerGas ? toHex(maxPriorityFeePerGas) : "0x",
      maxFeePerGas ? toHex(maxFeePerGas) : "0x",
      gas ? toHex(gas) : "0x",
      to ?? "0x",
      value ? toHex(value) : "0x",
      data ?? "0x",
      serializedAccessList,
      maxFeePerBlobGas ? toHex(maxFeePerBlobGas) : "0x",
      blobVersionedHashes ?? [],
      ...toYParitySignatureArray(transaction, signature)
    ];
    const blobs = [];
    const commitments = [];
    const proofs = [];
    if (sidecars)
      for (let i = 0; i < sidecars.length; i++) {
        const { blob, commitment, proof } = sidecars[i];
        blobs.push(blob);
        commitments.push(commitment);
        proofs.push(proof);
      }
    return concatHex([
      "0x03",
      sidecars ? (
        // If sidecars are enabled, envelope turns into a "wrapper":
        toRlp([serializedTransaction, blobs, commitments, proofs])
      ) : (
        // If sidecars are disabled, standard envelope is used:
        toRlp(serializedTransaction)
      )
    ]);
  }
  function serializeTransactionEIP1559(transaction, signature) {
    const { chainId, gas, nonce, to, value, maxFeePerGas, maxPriorityFeePerGas, accessList, data } = transaction;
    assertTransactionEIP1559(transaction);
    const serializedAccessList = serializeAccessList(accessList);
    const serializedTransaction = [
      toHex(chainId),
      nonce ? toHex(nonce) : "0x",
      maxPriorityFeePerGas ? toHex(maxPriorityFeePerGas) : "0x",
      maxFeePerGas ? toHex(maxFeePerGas) : "0x",
      gas ? toHex(gas) : "0x",
      to ?? "0x",
      value ? toHex(value) : "0x",
      data ?? "0x",
      serializedAccessList,
      ...toYParitySignatureArray(transaction, signature)
    ];
    return concatHex([
      "0x02",
      toRlp(serializedTransaction)
    ]);
  }
  function serializeTransactionEIP2930(transaction, signature) {
    const { chainId, gas, data, nonce, to, value, accessList, gasPrice } = transaction;
    assertTransactionEIP2930(transaction);
    const serializedAccessList = serializeAccessList(accessList);
    const serializedTransaction = [
      toHex(chainId),
      nonce ? toHex(nonce) : "0x",
      gasPrice ? toHex(gasPrice) : "0x",
      gas ? toHex(gas) : "0x",
      to ?? "0x",
      value ? toHex(value) : "0x",
      data ?? "0x",
      serializedAccessList,
      ...toYParitySignatureArray(transaction, signature)
    ];
    return concatHex([
      "0x01",
      toRlp(serializedTransaction)
    ]);
  }
  function serializeTransactionLegacy(transaction, signature) {
    const { chainId = 0, gas, data, nonce, to, value, gasPrice } = transaction;
    assertTransactionLegacy(transaction);
    let serializedTransaction = [
      nonce ? toHex(nonce) : "0x",
      gasPrice ? toHex(gasPrice) : "0x",
      gas ? toHex(gas) : "0x",
      to ?? "0x",
      value ? toHex(value) : "0x",
      data ?? "0x"
    ];
    if (signature) {
      const v = (() => {
        if (signature.v >= 35n) {
          const inferredChainId = (signature.v - 35n) / 2n;
          if (inferredChainId > 0)
            return signature.v;
          return 27n + (signature.v === 35n ? 0n : 1n);
        }
        if (chainId > 0)
          return BigInt(chainId * 2) + BigInt(35n + signature.v - 27n);
        const v2 = 27n + (signature.v === 27n ? 0n : 1n);
        if (signature.v !== v2)
          throw new InvalidLegacyVError({ v: signature.v });
        return v2;
      })();
      const r = trim(signature.r);
      const s = trim(signature.s);
      serializedTransaction = [
        ...serializedTransaction,
        toHex(v),
        r === "0x00" ? "0x" : r,
        s === "0x00" ? "0x" : s
      ];
    } else if (chainId > 0) {
      serializedTransaction = [
        ...serializedTransaction,
        toHex(chainId),
        "0x",
        "0x"
      ];
    }
    return toRlp(serializedTransaction);
  }
  function toYParitySignatureArray(transaction, signature_) {
    const signature = signature_ ?? transaction;
    const { v, yParity } = signature;
    if (typeof signature.r === "undefined")
      return [];
    if (typeof signature.s === "undefined")
      return [];
    if (typeof v === "undefined" && typeof yParity === "undefined")
      return [];
    const r = trim(signature.r);
    const s = trim(signature.s);
    const yParity_ = (() => {
      if (typeof yParity === "number")
        return yParity ? toHex(1) : "0x";
      if (v === 0n)
        return "0x";
      if (v === 1n)
        return toHex(1);
      return v === 27n ? "0x" : toHex(1);
    })();
    return [yParity_, r === "0x00" ? "0x" : r, s === "0x00" ? "0x" : s];
  }

  // node_modules/viem/_esm/accounts/utils/signTransaction.js
  async function signTransaction(parameters) {
    const { privateKey, transaction, serializer = serializeTransaction } = parameters;
    const signableTransaction = (() => {
      if (transaction.type === "eip4844")
        return {
          ...transaction,
          sidecars: false
        };
      return transaction;
    })();
    const signature = await sign({
      hash: keccak256(serializer(signableTransaction)),
      privateKey
    });
    return serializer(transaction, signature);
  }

  // node_modules/viem/_esm/utils/signature/hashTypedData.js
  init_encodeAbiParameters();
  init_concat();
  init_toHex();
  init_keccak256();

  // node_modules/viem/_esm/utils/typedData.js
  init_abi();
  init_address();

  // node_modules/viem/_esm/errors/typedData.js
  init_base();
  var InvalidStructTypeError = class extends BaseError {
    constructor({ type }) {
      super(`Struct type "${type}" is invalid.`, {
        metaMessages: ["Struct type must not be a Solidity type."],
        name: "InvalidStructTypeError"
      });
    }
  };

  // node_modules/viem/_esm/utils/typedData.js
  init_isAddress();
  init_size();
  init_toHex();

  // node_modules/viem/_esm/utils/regex.js
  var bytesRegex = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
  var integerRegex = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;

  // node_modules/viem/_esm/utils/typedData.js
  init_stringify();
  function serializeTypedData(parameters) {
    const { domain: domain_, message: message_, primaryType, types } = parameters;
    const normalizeData = (struct, data_) => {
      const data = { ...data_ };
      for (const param of struct) {
        const { name, type } = param;
        if (type === "address")
          data[name] = data[name].toLowerCase();
      }
      return data;
    };
    const domain = (() => {
      if (!types.EIP712Domain)
        return {};
      if (!domain_)
        return {};
      return normalizeData(types.EIP712Domain, domain_);
    })();
    const message = (() => {
      if (primaryType === "EIP712Domain")
        return void 0;
      return normalizeData(types[primaryType], message_);
    })();
    return stringify({ domain, message, primaryType, types });
  }
  function validateTypedData(parameters) {
    const { domain, message, primaryType, types } = parameters;
    const validateData = (struct, data) => {
      for (const param of struct) {
        const { name, type } = param;
        const value = data[name];
        const integerMatch = type.match(integerRegex);
        if (integerMatch && (typeof value === "number" || typeof value === "bigint")) {
          const [_type, base, size_] = integerMatch;
          numberToHex(value, {
            signed: base === "int",
            size: Number.parseInt(size_) / 8
          });
        }
        if (type === "address" && typeof value === "string" && !isAddress(value))
          throw new InvalidAddressError({ address: value });
        const bytesMatch = type.match(bytesRegex);
        if (bytesMatch) {
          const [_type, size_] = bytesMatch;
          if (size_ && size(value) !== Number.parseInt(size_))
            throw new BytesSizeMismatchError({
              expectedSize: Number.parseInt(size_),
              givenSize: size(value)
            });
        }
        const struct2 = types[type];
        if (struct2) {
          validateReference(type);
          validateData(struct2, value);
        }
      }
    };
    if (types.EIP712Domain && domain)
      validateData(types.EIP712Domain, domain);
    if (primaryType !== "EIP712Domain")
      validateData(types[primaryType], message);
  }
  function getTypesForEIP712Domain({ domain }) {
    return [
      typeof domain?.name === "string" && { name: "name", type: "string" },
      domain?.version && { name: "version", type: "string" },
      typeof domain?.chainId === "number" && {
        name: "chainId",
        type: "uint256"
      },
      domain?.verifyingContract && {
        name: "verifyingContract",
        type: "address"
      },
      domain?.salt && { name: "salt", type: "bytes32" }
    ].filter(Boolean);
  }
  function validateReference(type) {
    if (type === "address" || type === "bool" || type === "string" || type.startsWith("bytes") || type.startsWith("uint") || type.startsWith("int"))
      throw new InvalidStructTypeError({ type });
  }

  // node_modules/viem/_esm/utils/signature/hashTypedData.js
  function hashTypedData(parameters) {
    const { domain = {}, message, primaryType } = parameters;
    const types = {
      EIP712Domain: getTypesForEIP712Domain({ domain }),
      ...parameters.types
    };
    validateTypedData({
      domain,
      message,
      primaryType,
      types
    });
    const parts = ["0x1901"];
    if (domain)
      parts.push(hashDomain({
        domain,
        types
      }));
    if (primaryType !== "EIP712Domain")
      parts.push(hashStruct({
        data: message,
        primaryType,
        types
      }));
    return keccak256(concat(parts));
  }
  function hashDomain({ domain, types }) {
    return hashStruct({
      data: domain,
      primaryType: "EIP712Domain",
      types
    });
  }
  function hashStruct({ data, primaryType, types }) {
    const encoded = encodeData({
      data,
      primaryType,
      types
    });
    return keccak256(encoded);
  }
  function encodeData({ data, primaryType, types }) {
    const encodedTypes = [{ type: "bytes32" }];
    const encodedValues = [hashType({ primaryType, types })];
    for (const field of types[primaryType]) {
      const [type, value] = encodeField({
        types,
        name: field.name,
        type: field.type,
        value: data[field.name]
      });
      encodedTypes.push(type);
      encodedValues.push(value);
    }
    return encodeAbiParameters(encodedTypes, encodedValues);
  }
  function hashType({ primaryType, types }) {
    const encodedHashType = toHex(encodeType({ primaryType, types }));
    return keccak256(encodedHashType);
  }
  function encodeType({ primaryType, types }) {
    let result = "";
    const unsortedDeps = findTypeDependencies({ primaryType, types });
    unsortedDeps.delete(primaryType);
    const deps = [primaryType, ...Array.from(unsortedDeps).sort()];
    for (const type of deps) {
      result += `${type}(${types[type].map(({ name, type: t }) => `${t} ${name}`).join(",")})`;
    }
    return result;
  }
  function findTypeDependencies({ primaryType: primaryType_, types }, results = /* @__PURE__ */ new Set()) {
    const match = primaryType_.match(/^\w*/u);
    const primaryType = match?.[0];
    if (results.has(primaryType) || types[primaryType] === void 0) {
      return results;
    }
    results.add(primaryType);
    for (const field of types[primaryType]) {
      findTypeDependencies({ primaryType: field.type, types }, results);
    }
    return results;
  }
  function encodeField({ types, name, type, value }) {
    if (types[type] !== void 0) {
      return [
        { type: "bytes32" },
        keccak256(encodeData({ data: value, primaryType: type, types }))
      ];
    }
    if (type === "bytes") {
      const prepend = value.length % 2 ? "0" : "";
      value = `0x${prepend + value.slice(2)}`;
      return [{ type: "bytes32" }, keccak256(value)];
    }
    if (type === "string")
      return [{ type: "bytes32" }, keccak256(toHex(value))];
    if (type.lastIndexOf("]") === type.length - 1) {
      const parsedType = type.slice(0, type.lastIndexOf("["));
      const typeValuePairs = value.map((item) => encodeField({
        name,
        type: parsedType,
        types,
        value: item
      }));
      return [
        { type: "bytes32" },
        keccak256(encodeAbiParameters(typeValuePairs.map(([t]) => t), typeValuePairs.map(([, v]) => v)))
      ];
    }
    return [{ type }, value];
  }

  // node_modules/viem/_esm/accounts/utils/signTypedData.js
  async function signTypedData(parameters) {
    const { privateKey, ...typedData } = parameters;
    return await sign({
      hash: hashTypedData(typedData),
      privateKey,
      to: "hex"
    });
  }

  // node_modules/viem/_esm/accounts/privateKeyToAccount.js
  function privateKeyToAccount(privateKey, options = {}) {
    const { nonceManager } = options;
    const publicKey = toHex(secp256k1.getPublicKey(privateKey.slice(2), false));
    const address = publicKeyToAddress(publicKey);
    const account = toAccount({
      address,
      nonceManager,
      async sign({ hash: hash3 }) {
        return sign({ hash: hash3, privateKey, to: "hex" });
      },
      async experimental_signAuthorization(authorization) {
        return experimental_signAuthorization({ ...authorization, privateKey });
      },
      async signMessage({ message }) {
        return signMessage({ message, privateKey });
      },
      async signTransaction(transaction, { serializer } = {}) {
        return signTransaction({ privateKey, transaction, serializer });
      },
      async signTypedData(typedData) {
        return signTypedData({ ...typedData, privateKey });
      }
    });
    return {
      ...account,
      publicKey,
      source: "privateKey"
    };
  }

  // node_modules/viem/_esm/actions/public/getTransactionCount.js
  init_fromHex();
  init_toHex();
  async function getTransactionCount(client, { address, blockTag = "latest", blockNumber }) {
    const count = await client.request({
      method: "eth_getTransactionCount",
      params: [address, blockNumber ? numberToHex(blockNumber) : blockTag]
    }, { dedupe: Boolean(blockNumber) });
    return hexToNumber2(count);
  }

  // node_modules/viem/_esm/utils/getAction.js
  function getAction(client, actionFn, name) {
    const action_implicit = client[actionFn.name];
    if (typeof action_implicit === "function")
      return action_implicit;
    const action_explicit = client[name];
    if (typeof action_explicit === "function")
      return action_explicit;
    return (params) => actionFn(client, params);
  }

  // node_modules/viem/_esm/utils/abi/encodeEventTopics.js
  init_abi();

  // node_modules/viem/_esm/errors/log.js
  init_base();
  var FilterTypeNotSupportedError = class extends BaseError {
    constructor(type) {
      super(`Filter type "${type}" is not supported.`, {
        name: "FilterTypeNotSupportedError"
      });
    }
  };

  // node_modules/viem/_esm/utils/abi/encodeEventTopics.js
  init_toBytes();
  init_keccak256();
  init_toEventSelector();
  init_encodeAbiParameters();
  init_formatAbiItem();
  init_getAbiItem();
  var docsPath = "/docs/contract/encodeEventTopics";
  function encodeEventTopics(parameters) {
    const { abi: abi2, eventName, args } = parameters;
    let abiItem = abi2[0];
    if (eventName) {
      const item = getAbiItem({ abi: abi2, name: eventName });
      if (!item)
        throw new AbiEventNotFoundError(eventName, { docsPath });
      abiItem = item;
    }
    if (abiItem.type !== "event")
      throw new AbiEventNotFoundError(void 0, { docsPath });
    const definition = formatAbiItem(abiItem);
    const signature = toEventSelector(definition);
    let topics = [];
    if (args && "inputs" in abiItem) {
      const indexedInputs = abiItem.inputs?.filter((param) => "indexed" in param && param.indexed);
      const args_ = Array.isArray(args) ? args : Object.values(args).length > 0 ? indexedInputs?.map((x) => args[x.name]) ?? [] : [];
      if (args_.length > 0) {
        topics = indexedInputs?.map((param, i) => {
          if (Array.isArray(args_[i]))
            return args_[i].map((_, j) => encodeArg({ param, value: args_[i][j] }));
          return args_[i] ? encodeArg({ param, value: args_[i] }) : null;
        }) ?? [];
      }
    }
    return [signature, ...topics];
  }
  function encodeArg({ param, value }) {
    if (param.type === "string" || param.type === "bytes")
      return keccak256(toBytes2(value));
    if (param.type === "tuple" || param.type.match(/^(.*)\[(\d+)?\]$/))
      throw new FilterTypeNotSupportedError(param.type);
    return encodeAbiParameters([param], [value]);
  }

  // node_modules/viem/_esm/actions/public/createContractEventFilter.js
  init_toHex();

  // node_modules/viem/_esm/utils/filters/createFilterRequestScope.js
  function createFilterRequestScope(client, { method }) {
    const requestMap = {};
    if (client.transport.type === "fallback")
      client.transport.onResponse?.(({ method: method_, response: id, status, transport }) => {
        if (status === "success" && method === method_)
          requestMap[id] = transport.request;
      });
    return (id) => requestMap[id] || client.request;
  }

  // node_modules/viem/_esm/actions/public/createContractEventFilter.js
  async function createContractEventFilter(client, parameters) {
    const { address, abi: abi2, args, eventName, fromBlock, strict, toBlock } = parameters;
    const getRequest = createFilterRequestScope(client, {
      method: "eth_newFilter"
    });
    const topics = eventName ? encodeEventTopics({
      abi: abi2,
      args,
      eventName
    }) : void 0;
    const id = await client.request({
      method: "eth_newFilter",
      params: [
        {
          address,
          fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
          toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock,
          topics
        }
      ]
    });
    return {
      abi: abi2,
      args,
      eventName,
      id,
      request: getRequest(id),
      strict: Boolean(strict),
      type: "event"
    };
  }

  // node_modules/viem/_esm/actions/public/estimateContractGas.js
  init_parseAccount();
  init_encodeFunctionData();

  // node_modules/viem/_esm/utils/errors/getContractError.js
  init_abi();
  init_base();
  init_contract();
  init_rpc();
  var EXECUTION_REVERTED_ERROR_CODE = 3;
  function getContractError(err, { abi: abi2, address, args, docsPath: docsPath6, functionName, sender }) {
    const { code, data, message, shortMessage } = err instanceof RawContractError ? err : err instanceof BaseError ? err.walk((err2) => "data" in err2) || err.walk() : {};
    const cause = (() => {
      if (err instanceof AbiDecodingZeroDataError)
        return new ContractFunctionZeroDataError({ functionName });
      if ([EXECUTION_REVERTED_ERROR_CODE, InternalRpcError.code].includes(code) && (data || message || shortMessage)) {
        return new ContractFunctionRevertedError({
          abi: abi2,
          data: typeof data === "object" ? data.data : data,
          functionName,
          message: shortMessage ?? message
        });
      }
      return err;
    })();
    return new ContractFunctionExecutionError(cause, {
      abi: abi2,
      args,
      contractAddress: address,
      docsPath: docsPath6,
      functionName,
      sender
    });
  }

  // node_modules/viem/_esm/actions/public/estimateGas.js
  init_parseAccount();
  init_base();

  // node_modules/viem/_esm/utils/signature/recoverPublicKey.js
  init_isHex();
  init_fromHex();
  init_toHex();
  async function recoverPublicKey({ hash: hash3, signature }) {
    const hashHex = isHex(hash3) ? hash3 : toHex(hash3);
    const { secp256k1: secp256k12 } = await Promise.resolve().then(() => (init_secp256k1(), secp256k1_exports));
    const signature_ = (() => {
      if (typeof signature === "object" && "r" in signature && "s" in signature) {
        const { r, s, v, yParity } = signature;
        const yParityOrV2 = Number(yParity ?? v);
        const recoveryBit2 = toRecoveryBit(yParityOrV2);
        return new secp256k12.Signature(hexToBigInt(r), hexToBigInt(s)).addRecoveryBit(recoveryBit2);
      }
      const signatureHex = isHex(signature) ? signature : toHex(signature);
      const yParityOrV = hexToNumber2(`0x${signatureHex.slice(130)}`);
      const recoveryBit = toRecoveryBit(yParityOrV);
      return secp256k12.Signature.fromCompact(signatureHex.substring(2, 130)).addRecoveryBit(recoveryBit);
    })();
    const publicKey = signature_.recoverPublicKey(hashHex.substring(2)).toHex(false);
    return `0x${publicKey}`;
  }
  function toRecoveryBit(yParityOrV) {
    if (yParityOrV === 0 || yParityOrV === 1)
      return yParityOrV;
    if (yParityOrV === 27)
      return 0;
    if (yParityOrV === 28)
      return 1;
    throw new Error("Invalid yParityOrV value");
  }

  // node_modules/viem/_esm/utils/signature/recoverAddress.js
  async function recoverAddress({ hash: hash3, signature }) {
    return publicKeyToAddress(await recoverPublicKey({ hash: hash3, signature }));
  }

  // node_modules/viem/_esm/experimental/eip7702/utils/recoverAuthorizationAddress.js
  async function recoverAuthorizationAddress(parameters) {
    const { authorization, signature } = parameters;
    return recoverAddress({
      hash: hashAuthorization(authorization),
      signature: signature ?? authorization
    });
  }

  // node_modules/viem/_esm/actions/public/estimateGas.js
  init_toHex();

  // node_modules/viem/_esm/errors/estimateGas.js
  init_formatEther();
  init_formatGwei();
  init_base();
  init_transaction();
  var EstimateGasExecutionError = class extends BaseError {
    constructor(cause, { account, docsPath: docsPath6, chain, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value }) {
      const prettyArgs = prettyPrint({
        from: account?.address,
        to,
        value: typeof value !== "undefined" && `${formatEther(value)} ${chain?.nativeCurrency?.symbol || "ETH"}`,
        data,
        gas,
        gasPrice: typeof gasPrice !== "undefined" && `${formatGwei(gasPrice)} gwei`,
        maxFeePerGas: typeof maxFeePerGas !== "undefined" && `${formatGwei(maxFeePerGas)} gwei`,
        maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== "undefined" && `${formatGwei(maxPriorityFeePerGas)} gwei`,
        nonce
      });
      super(cause.shortMessage, {
        cause,
        docsPath: docsPath6,
        metaMessages: [
          ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
          "Estimate Gas Arguments:",
          prettyArgs
        ].filter(Boolean),
        name: "EstimateGasExecutionError"
      });
      Object.defineProperty(this, "cause", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      this.cause = cause;
    }
  };

  // node_modules/viem/_esm/utils/errors/getEstimateGasError.js
  init_node();
  init_getNodeError();
  function getEstimateGasError(err, { docsPath: docsPath6, ...args }) {
    const cause = (() => {
      const cause2 = getNodeError(err, args);
      if (cause2 instanceof UnknownNodeError)
        return err;
      return cause2;
    })();
    return new EstimateGasExecutionError(cause, {
      docsPath: docsPath6,
      ...args
    });
  }

  // node_modules/viem/_esm/actions/public/estimateGas.js
  init_extract();
  init_transactionRequest();
  init_stateOverride2();
  init_assertRequest();

  // node_modules/viem/_esm/actions/wallet/prepareTransactionRequest.js
  init_parseAccount();

  // node_modules/viem/_esm/errors/fee.js
  init_formatGwei();
  init_base();
  var BaseFeeScalarError = class extends BaseError {
    constructor() {
      super("`baseFeeMultiplier` must be greater than 1.", {
        name: "BaseFeeScalarError"
      });
    }
  };
  var Eip1559FeesNotSupportedError = class extends BaseError {
    constructor() {
      super("Chain does not support EIP-1559 fees.", {
        name: "Eip1559FeesNotSupportedError"
      });
    }
  };
  var MaxFeePerGasTooLowError = class extends BaseError {
    constructor({ maxPriorityFeePerGas }) {
      super(`\`maxFeePerGas\` cannot be less than the \`maxPriorityFeePerGas\` (${formatGwei(maxPriorityFeePerGas)} gwei).`, { name: "MaxFeePerGasTooLowError" });
    }
  };

  // node_modules/viem/_esm/actions/public/estimateMaxPriorityFeePerGas.js
  init_fromHex();

  // node_modules/viem/_esm/errors/block.js
  init_base();
  var BlockNotFoundError = class extends BaseError {
    constructor({ blockHash, blockNumber }) {
      let identifier = "Block";
      if (blockHash)
        identifier = `Block at hash "${blockHash}"`;
      if (blockNumber)
        identifier = `Block at number "${blockNumber}"`;
      super(`${identifier} could not be found.`, { name: "BlockNotFoundError" });
    }
  };

  // node_modules/viem/_esm/actions/public/getBlock.js
  init_toHex();

  // node_modules/viem/_esm/utils/formatters/block.js
  init_formatter();

  // node_modules/viem/_esm/utils/formatters/transaction.js
  init_fromHex();
  init_formatter();
  var transactionType = {
    "0x0": "legacy",
    "0x1": "eip2930",
    "0x2": "eip1559",
    "0x3": "eip4844",
    "0x4": "eip7702"
  };
  function formatTransaction(transaction) {
    const transaction_ = {
      ...transaction,
      blockHash: transaction.blockHash ? transaction.blockHash : null,
      blockNumber: transaction.blockNumber ? BigInt(transaction.blockNumber) : null,
      chainId: transaction.chainId ? hexToNumber2(transaction.chainId) : void 0,
      gas: transaction.gas ? BigInt(transaction.gas) : void 0,
      gasPrice: transaction.gasPrice ? BigInt(transaction.gasPrice) : void 0,
      maxFeePerBlobGas: transaction.maxFeePerBlobGas ? BigInt(transaction.maxFeePerBlobGas) : void 0,
      maxFeePerGas: transaction.maxFeePerGas ? BigInt(transaction.maxFeePerGas) : void 0,
      maxPriorityFeePerGas: transaction.maxPriorityFeePerGas ? BigInt(transaction.maxPriorityFeePerGas) : void 0,
      nonce: transaction.nonce ? hexToNumber2(transaction.nonce) : void 0,
      to: transaction.to ? transaction.to : null,
      transactionIndex: transaction.transactionIndex ? Number(transaction.transactionIndex) : null,
      type: transaction.type ? transactionType[transaction.type] : void 0,
      typeHex: transaction.type ? transaction.type : void 0,
      value: transaction.value ? BigInt(transaction.value) : void 0,
      v: transaction.v ? BigInt(transaction.v) : void 0
    };
    if (transaction.authorizationList)
      transaction_.authorizationList = formatAuthorizationList2(transaction.authorizationList);
    transaction_.yParity = (() => {
      if (transaction.yParity)
        return Number(transaction.yParity);
      if (typeof transaction_.v === "bigint") {
        if (transaction_.v === 0n || transaction_.v === 27n)
          return 0;
        if (transaction_.v === 1n || transaction_.v === 28n)
          return 1;
        if (transaction_.v >= 35n)
          return transaction_.v % 2n === 0n ? 1 : 0;
      }
      return void 0;
    })();
    if (transaction_.type === "legacy") {
      delete transaction_.accessList;
      delete transaction_.maxFeePerBlobGas;
      delete transaction_.maxFeePerGas;
      delete transaction_.maxPriorityFeePerGas;
      delete transaction_.yParity;
    }
    if (transaction_.type === "eip2930") {
      delete transaction_.maxFeePerBlobGas;
      delete transaction_.maxFeePerGas;
      delete transaction_.maxPriorityFeePerGas;
    }
    if (transaction_.type === "eip1559") {
      delete transaction_.maxFeePerBlobGas;
    }
    return transaction_;
  }
  var defineTransaction = /* @__PURE__ */ defineFormatter("transaction", formatTransaction);
  function formatAuthorizationList2(authorizationList) {
    return authorizationList.map((authorization) => ({
      contractAddress: authorization.address,
      chainId: Number(authorization.chainId),
      nonce: Number(authorization.nonce),
      r: authorization.r,
      s: authorization.s,
      yParity: Number(authorization.yParity)
    }));
  }

  // node_modules/viem/_esm/utils/formatters/block.js
  function formatBlock(block) {
    const transactions = block.transactions?.map((transaction) => {
      if (typeof transaction === "string")
        return transaction;
      return formatTransaction(transaction);
    });
    return {
      ...block,
      baseFeePerGas: block.baseFeePerGas ? BigInt(block.baseFeePerGas) : null,
      blobGasUsed: block.blobGasUsed ? BigInt(block.blobGasUsed) : void 0,
      difficulty: block.difficulty ? BigInt(block.difficulty) : void 0,
      excessBlobGas: block.excessBlobGas ? BigInt(block.excessBlobGas) : void 0,
      gasLimit: block.gasLimit ? BigInt(block.gasLimit) : void 0,
      gasUsed: block.gasUsed ? BigInt(block.gasUsed) : void 0,
      hash: block.hash ? block.hash : null,
      logsBloom: block.logsBloom ? block.logsBloom : null,
      nonce: block.nonce ? block.nonce : null,
      number: block.number ? BigInt(block.number) : null,
      size: block.size ? BigInt(block.size) : void 0,
      timestamp: block.timestamp ? BigInt(block.timestamp) : void 0,
      transactions,
      totalDifficulty: block.totalDifficulty ? BigInt(block.totalDifficulty) : null
    };
  }
  var defineBlock = /* @__PURE__ */ defineFormatter("block", formatBlock);

  // node_modules/viem/_esm/actions/public/getBlock.js
  async function getBlock(client, { blockHash, blockNumber, blockTag: blockTag_, includeTransactions: includeTransactions_ } = {}) {
    const blockTag = blockTag_ ?? "latest";
    const includeTransactions = includeTransactions_ ?? false;
    const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
    let block = null;
    if (blockHash) {
      block = await client.request({
        method: "eth_getBlockByHash",
        params: [blockHash, includeTransactions]
      }, { dedupe: true });
    } else {
      block = await client.request({
        method: "eth_getBlockByNumber",
        params: [blockNumberHex || blockTag, includeTransactions]
      }, { dedupe: Boolean(blockNumberHex) });
    }
    if (!block)
      throw new BlockNotFoundError({ blockHash, blockNumber });
    const format = client.chain?.formatters?.block?.format || formatBlock;
    return format(block);
  }

  // node_modules/viem/_esm/actions/public/getGasPrice.js
  async function getGasPrice(client) {
    const gasPrice = await client.request({
      method: "eth_gasPrice"
    });
    return BigInt(gasPrice);
  }

  // node_modules/viem/_esm/actions/public/estimateMaxPriorityFeePerGas.js
  async function estimateMaxPriorityFeePerGas(client, args) {
    return internal_estimateMaxPriorityFeePerGas(client, args);
  }
  async function internal_estimateMaxPriorityFeePerGas(client, args) {
    const { block: block_, chain = client.chain, request } = args || {};
    try {
      const maxPriorityFeePerGas = chain?.fees?.maxPriorityFeePerGas ?? chain?.fees?.defaultPriorityFee;
      if (typeof maxPriorityFeePerGas === "function") {
        const block = block_ || await getAction(client, getBlock, "getBlock")({});
        const maxPriorityFeePerGas_ = await maxPriorityFeePerGas({
          block,
          client,
          request
        });
        if (maxPriorityFeePerGas_ === null)
          throw new Error();
        return maxPriorityFeePerGas_;
      }
      if (typeof maxPriorityFeePerGas !== "undefined")
        return maxPriorityFeePerGas;
      const maxPriorityFeePerGasHex = await client.request({
        method: "eth_maxPriorityFeePerGas"
      });
      return hexToBigInt(maxPriorityFeePerGasHex);
    } catch {
      const [block, gasPrice] = await Promise.all([
        block_ ? Promise.resolve(block_) : getAction(client, getBlock, "getBlock")({}),
        getAction(client, getGasPrice, "getGasPrice")({})
      ]);
      if (typeof block.baseFeePerGas !== "bigint")
        throw new Eip1559FeesNotSupportedError();
      const maxPriorityFeePerGas = gasPrice - block.baseFeePerGas;
      if (maxPriorityFeePerGas < 0n)
        return 0n;
      return maxPriorityFeePerGas;
    }
  }

  // node_modules/viem/_esm/actions/public/estimateFeesPerGas.js
  async function estimateFeesPerGas(client, args) {
    return internal_estimateFeesPerGas(client, args);
  }
  async function internal_estimateFeesPerGas(client, args) {
    const { block: block_, chain = client.chain, request, type = "eip1559" } = args || {};
    const baseFeeMultiplier = await (async () => {
      if (typeof chain?.fees?.baseFeeMultiplier === "function")
        return chain.fees.baseFeeMultiplier({
          block: block_,
          client,
          request
        });
      return chain?.fees?.baseFeeMultiplier ?? 1.2;
    })();
    if (baseFeeMultiplier < 1)
      throw new BaseFeeScalarError();
    const decimals = baseFeeMultiplier.toString().split(".")[1]?.length ?? 0;
    const denominator = 10 ** decimals;
    const multiply = (base) => base * BigInt(Math.ceil(baseFeeMultiplier * denominator)) / BigInt(denominator);
    const block = block_ ? block_ : await getAction(client, getBlock, "getBlock")({});
    if (typeof chain?.fees?.estimateFeesPerGas === "function") {
      const fees = await chain.fees.estimateFeesPerGas({
        block: block_,
        client,
        multiply,
        request,
        type
      });
      if (fees !== null)
        return fees;
    }
    if (type === "eip1559") {
      if (typeof block.baseFeePerGas !== "bigint")
        throw new Eip1559FeesNotSupportedError();
      const maxPriorityFeePerGas = typeof request?.maxPriorityFeePerGas === "bigint" ? request.maxPriorityFeePerGas : await internal_estimateMaxPriorityFeePerGas(client, {
        block,
        chain,
        request
      });
      const baseFeePerGas = multiply(block.baseFeePerGas);
      const maxFeePerGas = request?.maxFeePerGas ?? baseFeePerGas + maxPriorityFeePerGas;
      return {
        maxFeePerGas,
        maxPriorityFeePerGas
      };
    }
    const gasPrice = request?.gasPrice ?? multiply(await getAction(client, getGasPrice, "getGasPrice")({}));
    return {
      gasPrice
    };
  }

  // node_modules/viem/_esm/actions/wallet/prepareTransactionRequest.js
  init_assertRequest();

  // node_modules/viem/_esm/actions/public/getChainId.js
  init_fromHex();
  async function getChainId(client) {
    const chainIdHex = await client.request({
      method: "eth_chainId"
    }, { dedupe: true });
    return hexToNumber2(chainIdHex);
  }

  // node_modules/viem/_esm/actions/wallet/prepareTransactionRequest.js
  var defaultParameters = [
    "blobVersionedHashes",
    "chainId",
    "fees",
    "gas",
    "nonce",
    "type"
  ];
  async function prepareTransactionRequest(client, args) {
    const { account: account_ = client.account, blobs, chain, gas, kzg, nonce, nonceManager, parameters = defaultParameters, type } = args;
    const account = account_ ? parseAccount(account_) : void 0;
    const request = { ...args, ...account ? { from: account?.address } : {} };
    let block;
    async function getBlock2() {
      if (block)
        return block;
      block = await getAction(client, getBlock, "getBlock")({ blockTag: "latest" });
      return block;
    }
    let chainId;
    async function getChainId2() {
      if (chainId)
        return chainId;
      if (chain)
        return chain.id;
      if (typeof args.chainId !== "undefined")
        return args.chainId;
      const chainId_ = await getAction(client, getChainId, "getChainId")({});
      chainId = chainId_;
      return chainId;
    }
    if ((parameters.includes("blobVersionedHashes") || parameters.includes("sidecars")) && blobs && kzg) {
      const commitments = blobsToCommitments({ blobs, kzg });
      if (parameters.includes("blobVersionedHashes")) {
        const versionedHashes = commitmentsToVersionedHashes({
          commitments,
          to: "hex"
        });
        request.blobVersionedHashes = versionedHashes;
      }
      if (parameters.includes("sidecars")) {
        const proofs = blobsToProofs({ blobs, commitments, kzg });
        const sidecars = toBlobSidecars({
          blobs,
          commitments,
          proofs,
          to: "hex"
        });
        request.sidecars = sidecars;
      }
    }
    if (parameters.includes("chainId"))
      request.chainId = await getChainId2();
    if (parameters.includes("nonce") && typeof nonce === "undefined" && account) {
      if (nonceManager) {
        const chainId2 = await getChainId2();
        request.nonce = await nonceManager.consume({
          address: account.address,
          chainId: chainId2,
          client
        });
      } else {
        request.nonce = await getAction(client, getTransactionCount, "getTransactionCount")({
          address: account.address,
          blockTag: "pending"
        });
      }
    }
    if ((parameters.includes("fees") || parameters.includes("type")) && typeof type === "undefined") {
      try {
        request.type = getTransactionType(request);
      } catch {
        const block2 = await getBlock2();
        request.type = typeof block2?.baseFeePerGas === "bigint" ? "eip1559" : "legacy";
      }
    }
    if (parameters.includes("fees")) {
      if (request.type !== "legacy" && request.type !== "eip2930") {
        if (typeof request.maxFeePerGas === "undefined" || typeof request.maxPriorityFeePerGas === "undefined") {
          const block2 = await getBlock2();
          const { maxFeePerGas, maxPriorityFeePerGas } = await internal_estimateFeesPerGas(client, {
            block: block2,
            chain,
            request
          });
          if (typeof args.maxPriorityFeePerGas === "undefined" && args.maxFeePerGas && args.maxFeePerGas < maxPriorityFeePerGas)
            throw new MaxFeePerGasTooLowError({
              maxPriorityFeePerGas
            });
          request.maxPriorityFeePerGas = maxPriorityFeePerGas;
          request.maxFeePerGas = maxFeePerGas;
        }
      } else {
        if (typeof args.maxFeePerGas !== "undefined" || typeof args.maxPriorityFeePerGas !== "undefined")
          throw new Eip1559FeesNotSupportedError();
        const block2 = await getBlock2();
        const { gasPrice: gasPrice_ } = await internal_estimateFeesPerGas(client, {
          block: block2,
          chain,
          request,
          type: "legacy"
        });
        request.gasPrice = gasPrice_;
      }
    }
    if (parameters.includes("gas") && typeof gas === "undefined")
      request.gas = await getAction(client, estimateGas, "estimateGas")({
        ...request,
        account: account ? { address: account.address, type: "json-rpc" } : void 0
      });
    assertRequest(request);
    delete request.parameters;
    return request;
  }

  // node_modules/viem/_esm/actions/public/getBalance.js
  init_toHex();
  async function getBalance(client, { address, blockNumber, blockTag = "latest" }) {
    const blockNumberHex = blockNumber ? numberToHex(blockNumber) : void 0;
    const balance = await client.request({
      method: "eth_getBalance",
      params: [address, blockNumberHex || blockTag]
    });
    return BigInt(balance);
  }

  // node_modules/viem/_esm/actions/public/estimateGas.js
  async function estimateGas(client, args) {
    const account_ = args.account ?? client.account;
    const account = account_ ? parseAccount(account_) : void 0;
    try {
      let estimateGas_rpc2 = function(parameters) {
        const { block: block2, request: request2, rpcStateOverride: rpcStateOverride2 } = parameters;
        return client.request({
          method: "eth_estimateGas",
          params: rpcStateOverride2 ? [request2, block2 ?? "latest", rpcStateOverride2] : block2 ? [request2, block2] : [request2]
        });
      };
      var estimateGas_rpc = estimateGas_rpc2;
      const { accessList, authorizationList, blobs, blobVersionedHashes, blockNumber, blockTag, data, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce, value, stateOverride, ...rest } = await prepareTransactionRequest(client, {
        ...args,
        parameters: (
          // Some RPC Providers do not compute versioned hashes from blobs. We will need
          // to compute them.
          account?.type === "local" ? void 0 : ["blobVersionedHashes"]
        )
      });
      const blockNumberHex = blockNumber ? numberToHex(blockNumber) : void 0;
      const block = blockNumberHex || blockTag;
      const rpcStateOverride = serializeStateOverride(stateOverride);
      const to = await (async () => {
        if (rest.to)
          return rest.to;
        if (authorizationList && authorizationList.length > 0)
          return await recoverAuthorizationAddress({
            authorization: authorizationList[0]
          }).catch(() => {
            throw new BaseError("`to` is required. Could not infer from `authorizationList`");
          });
        return void 0;
      })();
      assertRequest(args);
      const chainFormat = client.chain?.formatters?.transactionRequest?.format;
      const format = chainFormat || formatTransactionRequest;
      const request = format({
        // Pick out extra data that might exist on the chain's transaction request type.
        ...extract(rest, { format: chainFormat }),
        from: account?.address,
        accessList,
        authorizationList,
        blobs,
        blobVersionedHashes,
        data,
        gas,
        gasPrice,
        maxFeePerBlobGas,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        to,
        value
      });
      let estimate = BigInt(await estimateGas_rpc2({ block, request, rpcStateOverride }));
      if (authorizationList) {
        const value2 = await getBalance(client, { address: request.from });
        const estimates = await Promise.all(authorizationList.map(async (authorization) => {
          const { contractAddress } = authorization;
          const estimate2 = await estimateGas_rpc2({
            block,
            request: {
              authorizationList: void 0,
              data,
              from: account?.address,
              to: contractAddress,
              value: numberToHex(value2)
            },
            rpcStateOverride
          }).catch(() => 100000n);
          return 2n * BigInt(estimate2);
        }));
        estimate += estimates.reduce((acc, curr) => acc + curr, 0n);
      }
      return estimate;
    } catch (err) {
      throw getEstimateGasError(err, {
        ...args,
        account,
        chain: client.chain
      });
    }
  }

  // node_modules/viem/_esm/actions/public/estimateContractGas.js
  async function estimateContractGas(client, parameters) {
    const { abi: abi2, address, args, functionName, ...request } = parameters;
    const data = encodeFunctionData({
      abi: abi2,
      args,
      functionName
    });
    try {
      const gas = await getAction(client, estimateGas, "estimateGas")({
        data,
        to: address,
        ...request
      });
      return gas;
    } catch (error) {
      const account = request.account ? parseAccount(request.account) : void 0;
      throw getContractError(error, {
        abi: abi2,
        address,
        args,
        docsPath: "/docs/contract/estimateContractGas",
        functionName,
        sender: account?.address
      });
    }
  }

  // node_modules/viem/_esm/actions/public/getContractEvents.js
  init_getAbiItem();

  // node_modules/viem/_esm/utils/abi/parseEventLogs.js
  init_abi();
  init_isAddressEqual();
  init_toBytes();
  init_keccak256();
  init_toEventSelector();

  // node_modules/viem/_esm/utils/abi/decodeEventLog.js
  init_abi();
  init_size();
  init_toEventSelector();
  init_cursor();
  init_decodeAbiParameters();
  init_formatAbiItem();
  var docsPath3 = "/docs/contract/decodeEventLog";
  function decodeEventLog(parameters) {
    const { abi: abi2, data, strict: strict_, topics } = parameters;
    const strict = strict_ ?? true;
    const [signature, ...argTopics] = topics;
    if (!signature)
      throw new AbiEventSignatureEmptyTopicsError({ docsPath: docsPath3 });
    const abiItem = (() => {
      if (abi2.length === 1)
        return abi2[0];
      return abi2.find((x) => x.type === "event" && signature === toEventSelector(formatAbiItem(x)));
    })();
    if (!(abiItem && "name" in abiItem) || abiItem.type !== "event")
      throw new AbiEventSignatureNotFoundError(signature, { docsPath: docsPath3 });
    const { name, inputs } = abiItem;
    const isUnnamed = inputs?.some((x) => !("name" in x && x.name));
    let args = isUnnamed ? [] : {};
    const indexedInputs = inputs.filter((x) => "indexed" in x && x.indexed);
    for (let i = 0; i < indexedInputs.length; i++) {
      const param = indexedInputs[i];
      const topic = argTopics[i];
      if (!topic)
        throw new DecodeLogTopicsMismatch({
          abiItem,
          param
        });
      args[isUnnamed ? i : param.name || i] = decodeTopic({ param, value: topic });
    }
    const nonIndexedInputs = inputs.filter((x) => !("indexed" in x && x.indexed));
    if (nonIndexedInputs.length > 0) {
      if (data && data !== "0x") {
        try {
          const decodedData = decodeAbiParameters(nonIndexedInputs, data);
          if (decodedData) {
            if (isUnnamed)
              args = [...args, ...decodedData];
            else {
              for (let i = 0; i < nonIndexedInputs.length; i++) {
                args[nonIndexedInputs[i].name] = decodedData[i];
              }
            }
          }
        } catch (err) {
          if (strict) {
            if (err instanceof AbiDecodingDataSizeTooSmallError || err instanceof PositionOutOfBoundsError)
              throw new DecodeLogDataMismatch({
                abiItem,
                data,
                params: nonIndexedInputs,
                size: size(data)
              });
            throw err;
          }
        }
      } else if (strict) {
        throw new DecodeLogDataMismatch({
          abiItem,
          data: "0x",
          params: nonIndexedInputs,
          size: 0
        });
      }
    }
    return {
      eventName: name,
      args: Object.values(args).length > 0 ? args : void 0
    };
  }
  function decodeTopic({ param, value }) {
    if (param.type === "string" || param.type === "bytes" || param.type === "tuple" || param.type.match(/^(.*)\[(\d+)?\]$/))
      return value;
    const decodedArg = decodeAbiParameters([param], value) || [];
    return decodedArg[0];
  }

  // node_modules/viem/_esm/utils/abi/parseEventLogs.js
  function parseEventLogs(parameters) {
    const { abi: abi2, args, logs, strict = true } = parameters;
    const eventName = (() => {
      if (!parameters.eventName)
        return void 0;
      if (Array.isArray(parameters.eventName))
        return parameters.eventName;
      return [parameters.eventName];
    })();
    return logs.map((log) => {
      try {
        const abiItem = abi2.find((abiItem2) => abiItem2.type === "event" && log.topics[0] === toEventSelector(abiItem2));
        if (!abiItem)
          return null;
        const event = decodeEventLog({
          ...log,
          abi: [abiItem],
          strict
        });
        if (eventName && !eventName.includes(event.eventName))
          return null;
        if (!includesArgs({
          args: event.args,
          inputs: abiItem.inputs,
          matchArgs: args
        }))
          return null;
        return { ...event, ...log };
      } catch (err) {
        let eventName2;
        let isUnnamed;
        if (err instanceof AbiEventSignatureNotFoundError)
          return null;
        if (err instanceof DecodeLogDataMismatch || err instanceof DecodeLogTopicsMismatch) {
          if (strict)
            return null;
          eventName2 = err.abiItem.name;
          isUnnamed = err.abiItem.inputs?.some((x) => !("name" in x && x.name));
        }
        return { ...log, args: isUnnamed ? [] : {}, eventName: eventName2 };
      }
    }).filter(Boolean);
  }
  function includesArgs(parameters) {
    const { args, inputs, matchArgs } = parameters;
    if (!matchArgs)
      return true;
    if (!args)
      return false;
    function isEqual(input, value, arg) {
      try {
        if (input.type === "address")
          return isAddressEqual(value, arg);
        if (input.type === "string" || input.type === "bytes")
          return keccak256(toBytes2(value)) === arg;
        return value === arg;
      } catch {
        return false;
      }
    }
    if (Array.isArray(args) && Array.isArray(matchArgs)) {
      return matchArgs.every((value, index2) => {
        if (value === null || value === void 0)
          return true;
        const input = inputs[index2];
        if (!input)
          return false;
        const value_ = Array.isArray(value) ? value : [value];
        return value_.some((value2) => isEqual(input, value2, args[index2]));
      });
    }
    if (typeof args === "object" && !Array.isArray(args) && typeof matchArgs === "object" && !Array.isArray(matchArgs))
      return Object.entries(matchArgs).every(([key, value]) => {
        if (value === null || value === void 0)
          return true;
        const input = inputs.find((input2) => input2.name === key);
        if (!input)
          return false;
        const value_ = Array.isArray(value) ? value : [value];
        return value_.some((value2) => isEqual(input, value2, args[key]));
      });
    return false;
  }

  // node_modules/viem/_esm/actions/public/getLogs.js
  init_toHex();

  // node_modules/viem/_esm/utils/formatters/log.js
  function formatLog(log, { args, eventName } = {}) {
    return {
      ...log,
      blockHash: log.blockHash ? log.blockHash : null,
      blockNumber: log.blockNumber ? BigInt(log.blockNumber) : null,
      logIndex: log.logIndex ? Number(log.logIndex) : null,
      transactionHash: log.transactionHash ? log.transactionHash : null,
      transactionIndex: log.transactionIndex ? Number(log.transactionIndex) : null,
      ...eventName ? { args, eventName } : {}
    };
  }

  // node_modules/viem/_esm/actions/public/getLogs.js
  async function getLogs(client, { address, blockHash, fromBlock, toBlock, event, events: events_, args, strict: strict_ } = {}) {
    const strict = strict_ ?? false;
    const events = events_ ?? (event ? [event] : void 0);
    let topics = [];
    if (events) {
      const encoded = events.flatMap((event2) => encodeEventTopics({
        abi: [event2],
        eventName: event2.name,
        args: events_ ? void 0 : args
      }));
      topics = [encoded];
      if (event)
        topics = topics[0];
    }
    let logs;
    if (blockHash) {
      logs = await client.request({
        method: "eth_getLogs",
        params: [{ address, topics, blockHash }]
      });
    } else {
      logs = await client.request({
        method: "eth_getLogs",
        params: [
          {
            address,
            topics,
            fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
            toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock
          }
        ]
      });
    }
    const formattedLogs = logs.map((log) => formatLog(log));
    if (!events)
      return formattedLogs;
    return parseEventLogs({
      abi: events,
      args,
      logs: formattedLogs,
      strict
    });
  }

  // node_modules/viem/_esm/actions/public/getContractEvents.js
  async function getContractEvents(client, parameters) {
    const { abi: abi2, address, args, blockHash, eventName, fromBlock, toBlock, strict } = parameters;
    const event = eventName ? getAbiItem({ abi: abi2, name: eventName }) : void 0;
    const events = !event ? abi2.filter((x) => x.type === "event") : void 0;
    return getAction(client, getLogs, "getLogs")({
      address,
      args,
      blockHash,
      event,
      events,
      fromBlock,
      toBlock,
      strict
    });
  }

  // node_modules/viem/_esm/actions/public/readContract.js
  init_decodeFunctionResult();
  init_encodeFunctionData();
  init_call();
  async function readContract(client, parameters) {
    const { abi: abi2, address, args, functionName, ...rest } = parameters;
    const calldata = encodeFunctionData({
      abi: abi2,
      args,
      functionName
    });
    try {
      const { data } = await getAction(client, call, "call")({
        ...rest,
        data: calldata,
        to: address
      });
      return decodeFunctionResult({
        abi: abi2,
        args,
        functionName,
        data: data || "0x"
      });
    } catch (error) {
      throw getContractError(error, {
        abi: abi2,
        address,
        args,
        docsPath: "/docs/contract/readContract",
        functionName
      });
    }
  }

  // node_modules/viem/_esm/actions/public/simulateContract.js
  init_parseAccount();
  init_decodeFunctionResult();
  init_encodeFunctionData();
  init_call();
  async function simulateContract(client, parameters) {
    const { abi: abi2, address, args, dataSuffix, functionName, ...callRequest } = parameters;
    const account = callRequest.account ? parseAccount(callRequest.account) : client.account;
    const calldata = encodeFunctionData({ abi: abi2, args, functionName });
    try {
      const { data } = await getAction(client, call, "call")({
        batch: false,
        data: `${calldata}${dataSuffix ? dataSuffix.replace("0x", "") : ""}`,
        to: address,
        ...callRequest,
        account
      });
      const result = decodeFunctionResult({
        abi: abi2,
        args,
        functionName,
        data: data || "0x"
      });
      const minimizedAbi = abi2.filter((abiItem) => "name" in abiItem && abiItem.name === parameters.functionName);
      return {
        result,
        request: {
          abi: minimizedAbi,
          address,
          args,
          dataSuffix,
          functionName,
          ...callRequest,
          account
        }
      };
    } catch (error) {
      throw getContractError(error, {
        abi: abi2,
        address,
        args,
        docsPath: "/docs/contract/simulateContract",
        functionName,
        sender: account?.address
      });
    }
  }

  // node_modules/viem/_esm/actions/public/watchContractEvent.js
  init_abi();
  init_rpc();

  // node_modules/viem/_esm/utils/observe.js
  var listenersCache = /* @__PURE__ */ new Map();
  var cleanupCache = /* @__PURE__ */ new Map();
  var callbackCount = 0;
  function observe(observerId, callbacks, fn) {
    const callbackId = ++callbackCount;
    const getListeners = () => listenersCache.get(observerId) || [];
    const unsubscribe = () => {
      const listeners2 = getListeners();
      listenersCache.set(observerId, listeners2.filter((cb) => cb.id !== callbackId));
    };
    const unwatch = () => {
      const cleanup2 = cleanupCache.get(observerId);
      if (getListeners().length === 1 && cleanup2)
        cleanup2();
      unsubscribe();
    };
    const listeners = getListeners();
    listenersCache.set(observerId, [
      ...listeners,
      { id: callbackId, fns: callbacks }
    ]);
    if (listeners && listeners.length > 0)
      return unwatch;
    const emit = {};
    for (const key in callbacks) {
      emit[key] = (...args) => {
        const listeners2 = getListeners();
        if (listeners2.length === 0)
          return;
        for (const listener of listeners2)
          listener.fns[key]?.(...args);
      };
    }
    const cleanup = fn(emit);
    if (typeof cleanup === "function")
      cleanupCache.set(observerId, cleanup);
    return unwatch;
  }

  // node_modules/viem/_esm/utils/wait.js
  async function wait(time) {
    return new Promise((res) => setTimeout(res, time));
  }

  // node_modules/viem/_esm/utils/poll.js
  function poll(fn, { emitOnBegin, initialWaitTime, interval }) {
    let active = true;
    const unwatch = () => active = false;
    const watch = async () => {
      let data = void 0;
      if (emitOnBegin)
        data = await fn({ unpoll: unwatch });
      const initialWait = await initialWaitTime?.(data) ?? interval;
      await wait(initialWait);
      const poll2 = async () => {
        if (!active)
          return;
        await fn({ unpoll: unwatch });
        await wait(interval);
        poll2();
      };
      poll2();
    };
    watch();
    return unwatch;
  }

  // node_modules/viem/_esm/actions/public/watchContractEvent.js
  init_stringify();

  // node_modules/viem/_esm/utils/promise/withCache.js
  var promiseCache = /* @__PURE__ */ new Map();
  var responseCache = /* @__PURE__ */ new Map();
  function getCache(cacheKey2) {
    const buildCache = (cacheKey3, cache) => ({
      clear: () => cache.delete(cacheKey3),
      get: () => cache.get(cacheKey3),
      set: (data) => cache.set(cacheKey3, data)
    });
    const promise = buildCache(cacheKey2, promiseCache);
    const response = buildCache(cacheKey2, responseCache);
    return {
      clear: () => {
        promise.clear();
        response.clear();
      },
      promise,
      response
    };
  }
  async function withCache(fn, { cacheKey: cacheKey2, cacheTime = Number.POSITIVE_INFINITY }) {
    const cache = getCache(cacheKey2);
    const response = cache.response.get();
    if (response && cacheTime > 0) {
      const age = (/* @__PURE__ */ new Date()).getTime() - response.created.getTime();
      if (age < cacheTime)
        return response.data;
    }
    let promise = cache.promise.get();
    if (!promise) {
      promise = fn();
      cache.promise.set(promise);
    }
    try {
      const data = await promise;
      cache.response.set({ created: /* @__PURE__ */ new Date(), data });
      return data;
    } finally {
      cache.promise.clear();
    }
  }

  // node_modules/viem/_esm/actions/public/getBlockNumber.js
  var cacheKey = (id) => `blockNumber.${id}`;
  async function getBlockNumber(client, { cacheTime = client.cacheTime } = {}) {
    const blockNumberHex = await withCache(() => client.request({
      method: "eth_blockNumber"
    }), { cacheKey: cacheKey(client.uid), cacheTime });
    return BigInt(blockNumberHex);
  }

  // node_modules/viem/_esm/actions/public/getFilterChanges.js
  async function getFilterChanges(_client, { filter }) {
    const strict = "strict" in filter && filter.strict;
    const logs = await filter.request({
      method: "eth_getFilterChanges",
      params: [filter.id]
    });
    if (typeof logs[0] === "string")
      return logs;
    const formattedLogs = logs.map((log) => formatLog(log));
    if (!("abi" in filter) || !filter.abi)
      return formattedLogs;
    return parseEventLogs({
      abi: filter.abi,
      logs: formattedLogs,
      strict
    });
  }

  // node_modules/viem/_esm/actions/public/uninstallFilter.js
  async function uninstallFilter(_client, { filter }) {
    return filter.request({
      method: "eth_uninstallFilter",
      params: [filter.id]
    });
  }

  // node_modules/viem/_esm/actions/public/watchContractEvent.js
  function watchContractEvent(client, parameters) {
    const { abi: abi2, address, args, batch = true, eventName, fromBlock, onError, onLogs, poll: poll_, pollingInterval = client.pollingInterval, strict: strict_ } = parameters;
    const enablePolling = (() => {
      if (typeof poll_ !== "undefined")
        return poll_;
      if (typeof fromBlock === "bigint")
        return true;
      if (client.transport.type === "webSocket")
        return false;
      if (client.transport.type === "fallback" && client.transport.transports[0].config.type === "webSocket")
        return false;
      return true;
    })();
    const pollContractEvent = () => {
      const strict = strict_ ?? false;
      const observerId = stringify([
        "watchContractEvent",
        address,
        args,
        batch,
        client.uid,
        eventName,
        pollingInterval,
        strict,
        fromBlock
      ]);
      return observe(observerId, { onLogs, onError }, (emit) => {
        let previousBlockNumber;
        if (fromBlock !== void 0)
          previousBlockNumber = fromBlock - 1n;
        let filter;
        let initialized = false;
        const unwatch = poll(async () => {
          if (!initialized) {
            try {
              filter = await getAction(client, createContractEventFilter, "createContractEventFilter")({
                abi: abi2,
                address,
                args,
                eventName,
                strict,
                fromBlock
              });
            } catch {
            }
            initialized = true;
            return;
          }
          try {
            let logs;
            if (filter) {
              logs = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
            } else {
              const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({});
              if (previousBlockNumber && previousBlockNumber < blockNumber) {
                logs = await getAction(client, getContractEvents, "getContractEvents")({
                  abi: abi2,
                  address,
                  args,
                  eventName,
                  fromBlock: previousBlockNumber + 1n,
                  toBlock: blockNumber,
                  strict
                });
              } else {
                logs = [];
              }
              previousBlockNumber = blockNumber;
            }
            if (logs.length === 0)
              return;
            if (batch)
              emit.onLogs(logs);
            else
              for (const log of logs)
                emit.onLogs([log]);
          } catch (err) {
            if (filter && err instanceof InvalidInputRpcError)
              initialized = false;
            emit.onError?.(err);
          }
        }, {
          emitOnBegin: true,
          interval: pollingInterval
        });
        return async () => {
          if (filter)
            await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
          unwatch();
        };
      });
    };
    const subscribeContractEvent = () => {
      const strict = strict_ ?? false;
      const observerId = stringify([
        "watchContractEvent",
        address,
        args,
        batch,
        client.uid,
        eventName,
        pollingInterval,
        strict
      ]);
      let active = true;
      let unsubscribe = () => active = false;
      return observe(observerId, { onLogs, onError }, (emit) => {
        ;
        (async () => {
          try {
            const transport = (() => {
              if (client.transport.type === "fallback") {
                const transport2 = client.transport.transports.find((transport3) => transport3.config.type === "webSocket");
                if (!transport2)
                  return client.transport;
                return transport2.value;
              }
              return client.transport;
            })();
            const topics = eventName ? encodeEventTopics({
              abi: abi2,
              eventName,
              args
            }) : [];
            const { unsubscribe: unsubscribe_ } = await transport.subscribe({
              params: ["logs", { address, topics }],
              onData(data) {
                if (!active)
                  return;
                const log = data.result;
                try {
                  const { eventName: eventName2, args: args2 } = decodeEventLog({
                    abi: abi2,
                    data: log.data,
                    topics: log.topics,
                    strict: strict_
                  });
                  const formatted = formatLog(log, {
                    args: args2,
                    eventName: eventName2
                  });
                  emit.onLogs([formatted]);
                } catch (err) {
                  let eventName2;
                  let isUnnamed;
                  if (err instanceof DecodeLogDataMismatch || err instanceof DecodeLogTopicsMismatch) {
                    if (strict_)
                      return;
                    eventName2 = err.abiItem.name;
                    isUnnamed = err.abiItem.inputs?.some((x) => !("name" in x && x.name));
                  }
                  const formatted = formatLog(log, {
                    args: isUnnamed ? [] : {},
                    eventName: eventName2
                  });
                  emit.onLogs([formatted]);
                }
              },
              onError(error) {
                emit.onError?.(error);
              }
            });
            unsubscribe = unsubscribe_;
            if (!active)
              unsubscribe();
          } catch (err) {
            onError?.(err);
          }
        })();
        return () => unsubscribe();
      });
    };
    return enablePolling ? pollContractEvent() : subscribeContractEvent();
  }

  // node_modules/viem/_esm/actions/wallet/writeContract.js
  init_parseAccount();

  // node_modules/viem/_esm/errors/account.js
  init_base();
  var AccountNotFoundError = class extends BaseError {
    constructor({ docsPath: docsPath6 } = {}) {
      super([
        "Could not find an Account to execute with this Action.",
        "Please provide an Account with the `account` argument on the Action, or by supplying an `account` to the Client."
      ].join("\n"), {
        docsPath: docsPath6,
        docsSlug: "account",
        name: "AccountNotFoundError"
      });
    }
  };
  var AccountTypeNotSupportedError = class extends BaseError {
    constructor({ docsPath: docsPath6, metaMessages, type }) {
      super(`Account type "${type}" is not supported.`, {
        docsPath: docsPath6,
        metaMessages,
        name: "AccountTypeNotSupportedError"
      });
    }
  };

  // node_modules/viem/_esm/actions/wallet/writeContract.js
  init_encodeFunctionData();

  // node_modules/viem/_esm/actions/wallet/sendTransaction.js
  init_parseAccount();
  init_base();

  // node_modules/viem/_esm/utils/chain/assertCurrentChain.js
  init_chain();
  function assertCurrentChain({ chain, currentChainId }) {
    if (!chain)
      throw new ChainNotFoundError();
    if (currentChainId !== chain.id)
      throw new ChainMismatchError({ chain, currentChainId });
  }

  // node_modules/viem/_esm/utils/errors/getTransactionError.js
  init_node();
  init_transaction();
  init_getNodeError();
  function getTransactionError(err, { docsPath: docsPath6, ...args }) {
    const cause = (() => {
      const cause2 = getNodeError(err, args);
      if (cause2 instanceof UnknownNodeError)
        return err;
      return cause2;
    })();
    return new TransactionExecutionError(cause, {
      docsPath: docsPath6,
      ...args
    });
  }

  // node_modules/viem/_esm/actions/wallet/sendTransaction.js
  init_extract();
  init_transactionRequest();
  init_lru();
  init_assertRequest();

  // node_modules/viem/_esm/actions/wallet/sendRawTransaction.js
  async function sendRawTransaction(client, { serializedTransaction }) {
    return client.request({
      method: "eth_sendRawTransaction",
      params: [serializedTransaction]
    }, { retryCount: 0 });
  }

  // node_modules/viem/_esm/actions/wallet/sendTransaction.js
  var supportsWalletNamespace = new LruMap(128);
  async function sendTransaction(client, parameters) {
    const { account: account_ = client.account, chain = client.chain, accessList, authorizationList, blobs, data, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce, value, ...rest } = parameters;
    if (typeof account_ === "undefined")
      throw new AccountNotFoundError({
        docsPath: "/docs/actions/wallet/sendTransaction"
      });
    const account = account_ ? parseAccount(account_) : null;
    try {
      assertRequest(parameters);
      const to = await (async () => {
        if (parameters.to)
          return parameters.to;
        if (authorizationList && authorizationList.length > 0)
          return await recoverAuthorizationAddress({
            authorization: authorizationList[0]
          }).catch(() => {
            throw new BaseError("`to` is required. Could not infer from `authorizationList`.");
          });
        return void 0;
      })();
      if (account?.type === "json-rpc" || account === null) {
        let chainId;
        if (chain !== null) {
          chainId = await getAction(client, getChainId, "getChainId")({});
          assertCurrentChain({
            currentChainId: chainId,
            chain
          });
        }
        const chainFormat = client.chain?.formatters?.transactionRequest?.format;
        const format = chainFormat || formatTransactionRequest;
        const request = format({
          // Pick out extra data that might exist on the chain's transaction request type.
          ...extract(rest, { format: chainFormat }),
          accessList,
          authorizationList,
          blobs,
          chainId,
          data,
          from: account?.address,
          gas,
          gasPrice,
          maxFeePerBlobGas,
          maxFeePerGas,
          maxPriorityFeePerGas,
          nonce,
          to,
          value
        });
        const method = supportsWalletNamespace.get(client.uid) ? "wallet_sendTransaction" : "eth_sendTransaction";
        try {
          return await client.request({
            method,
            params: [request]
          }, { retryCount: 0 });
        } catch (e) {
          const error = e;
          if (error.name === "InvalidInputRpcError" || error.name === "InvalidParamsRpcError" || error.name === "MethodNotFoundRpcError" || error.name === "MethodNotSupportedRpcError")
            return await client.request({
              method: "wallet_sendTransaction",
              params: [request]
            }, { retryCount: 0 }).then((hash3) => {
              supportsWalletNamespace.set(client.uid, true);
              return hash3;
            });
          throw error;
        }
      }
      if (account?.type === "local") {
        const request = await getAction(client, prepareTransactionRequest, "prepareTransactionRequest")({
          account,
          accessList,
          authorizationList,
          blobs,
          chain,
          data,
          gas,
          gasPrice,
          maxFeePerBlobGas,
          maxFeePerGas,
          maxPriorityFeePerGas,
          nonce,
          nonceManager: account.nonceManager,
          parameters: [...defaultParameters, "sidecars"],
          value,
          ...rest,
          to
        });
        const serializer = chain?.serializers?.transaction;
        const serializedTransaction = await account.signTransaction(request, {
          serializer
        });
        return await getAction(client, sendRawTransaction, "sendRawTransaction")({
          serializedTransaction
        });
      }
      if (account?.type === "smart")
        throw new AccountTypeNotSupportedError({
          metaMessages: [
            "Consider using the `sendUserOperation` Action instead."
          ],
          docsPath: "/docs/actions/bundler/sendUserOperation",
          type: "smart"
        });
      throw new AccountTypeNotSupportedError({
        docsPath: "/docs/actions/wallet/sendTransaction",
        type: account?.type
      });
    } catch (err) {
      if (err instanceof AccountTypeNotSupportedError)
        throw err;
      throw getTransactionError(err, {
        ...parameters,
        account,
        chain: parameters.chain || void 0
      });
    }
  }

  // node_modules/viem/_esm/actions/wallet/writeContract.js
  async function writeContract(client, parameters) {
    const { abi: abi2, account: account_ = client.account, address, args, dataSuffix, functionName, ...request } = parameters;
    if (typeof account_ === "undefined")
      throw new AccountNotFoundError({
        docsPath: "/docs/contract/writeContract"
      });
    const account = account_ ? parseAccount(account_) : null;
    const data = encodeFunctionData({
      abi: abi2,
      args,
      functionName
    });
    try {
      return await getAction(client, sendTransaction, "sendTransaction")({
        data: `${data}${dataSuffix ? dataSuffix.replace("0x", "") : ""}`,
        to: address,
        account,
        ...request
      });
    } catch (error) {
      throw getContractError(error, {
        abi: abi2,
        address,
        args,
        docsPath: "/docs/contract/writeContract",
        functionName,
        sender: account?.address
      });
    }
  }

  // node_modules/viem/_esm/errors/eip712.js
  init_base();
  var Eip712DomainNotFoundError = class extends BaseError {
    constructor({ address }) {
      super(`No EIP-712 domain found on contract "${address}".`, {
        metaMessages: [
          "Ensure that:",
          `- The contract is deployed at the address "${address}".`,
          "- `eip712Domain()` function exists on the contract.",
          "- `eip712Domain()` function matches signature to ERC-5267 specification."
        ],
        name: "Eip712DomainNotFoundError"
      });
    }
  };

  // node_modules/viem/_esm/actions/public/getEip712Domain.js
  async function getEip712Domain(client, parameters) {
    const { address, factory, factoryData } = parameters;
    try {
      const [fields, name, version3, chainId, verifyingContract, salt, extensions] = await getAction(client, readContract, "readContract")({
        abi,
        address,
        functionName: "eip712Domain",
        factory,
        factoryData
      });
      return {
        domain: {
          name,
          version: version3,
          chainId: Number(chainId),
          verifyingContract,
          salt
        },
        extensions,
        fields
      };
    } catch (e) {
      const error = e;
      if (error.name === "ContractFunctionExecutionError" && error.cause.name === "ContractFunctionZeroDataError") {
        throw new Eip712DomainNotFoundError({ address });
      }
      throw error;
    }
  }
  var abi = [
    {
      inputs: [],
      name: "eip712Domain",
      outputs: [
        { name: "fields", type: "bytes1" },
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
        { name: "salt", type: "bytes32" },
        { name: "extensions", type: "uint256[]" }
      ],
      stateMutability: "view",
      type: "function"
    }
  ];

  // node_modules/viem/_esm/actions/wallet/addChain.js
  init_toHex();
  async function addChain(client, { chain }) {
    const { id, name, nativeCurrency, rpcUrls, blockExplorers } = chain;
    await client.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: numberToHex(id),
          chainName: name,
          nativeCurrency,
          rpcUrls: rpcUrls.default.http,
          blockExplorerUrls: blockExplorers ? Object.values(blockExplorers).map(({ url }) => url) : void 0
        }
      ]
    }, { dedupe: true, retryCount: 0 });
  }

  // node_modules/viem/_esm/clients/createClient.js
  init_parseAccount();

  // node_modules/viem/_esm/utils/uid.js
  var size2 = 256;
  var index = size2;
  var buffer;
  function uid(length = 11) {
    if (!buffer || index + length > size2 * 2) {
      buffer = "";
      index = 0;
      for (let i = 0; i < size2; i++) {
        buffer += (256 + Math.random() * 256 | 0).toString(16).substring(1);
      }
    }
    return buffer.substring(index, index++ + length);
  }

  // node_modules/viem/_esm/clients/createClient.js
  function createClient(parameters) {
    const { batch, cacheTime = parameters.pollingInterval ?? 4e3, ccipRead, key = "base", name = "Base Client", pollingInterval = 4e3, type = "base" } = parameters;
    const chain = parameters.chain;
    const account = parameters.account ? parseAccount(parameters.account) : void 0;
    const { config, request, value } = parameters.transport({
      chain,
      pollingInterval
    });
    const transport = { ...config, ...value };
    const client = {
      account,
      batch,
      cacheTime,
      ccipRead,
      chain,
      key,
      name,
      pollingInterval,
      request,
      transport,
      type,
      uid: uid()
    };
    function extend(base) {
      return (extendFn) => {
        const extended = extendFn(base);
        for (const key2 in client)
          delete extended[key2];
        const combined = { ...base, ...extended };
        return Object.assign(combined, { extend: extend(combined) });
      };
    }
    return Object.assign(client, { extend: extend(client) });
  }

  // node_modules/viem/_esm/utils/buildRequest.js
  init_base();
  init_request();
  init_rpc();
  init_toHex();
  init_keccak256();

  // node_modules/viem/_esm/utils/promise/withDedupe.js
  init_lru();
  var promiseCache2 = /* @__PURE__ */ new LruMap(8192);
  function withDedupe(fn, { enabled = true, id }) {
    if (!enabled || !id)
      return fn();
    if (promiseCache2.get(id))
      return promiseCache2.get(id);
    const promise = fn().finally(() => promiseCache2.delete(id));
    promiseCache2.set(id, promise);
    return promise;
  }

  // node_modules/viem/_esm/utils/promise/withRetry.js
  function withRetry(fn, { delay: delay_ = 100, retryCount = 2, shouldRetry: shouldRetry2 = () => true } = {}) {
    return new Promise((resolve, reject) => {
      const attemptRetry = async ({ count = 0 } = {}) => {
        const retry = async ({ error }) => {
          const delay = typeof delay_ === "function" ? delay_({ count, error }) : delay_;
          if (delay)
            await wait(delay);
          attemptRetry({ count: count + 1 });
        };
        try {
          const data = await fn();
          resolve(data);
        } catch (err) {
          if (count < retryCount && await shouldRetry2({ count, error: err }))
            return retry({ error: err });
          reject(err);
        }
      };
      attemptRetry();
    });
  }

  // node_modules/viem/_esm/utils/buildRequest.js
  init_stringify();
  function buildRequest(request, options = {}) {
    return async (args, overrideOptions = {}) => {
      const { dedupe = false, retryDelay = 150, retryCount = 3, uid: uid2 } = {
        ...options,
        ...overrideOptions
      };
      const requestId = dedupe ? keccak256(stringToHex(`${uid2}.${stringify(args)}`)) : void 0;
      return withDedupe(() => withRetry(async () => {
        try {
          return await request(args);
        } catch (err_) {
          const err = err_;
          switch (err.code) {
            // -32700
            case ParseRpcError.code:
              throw new ParseRpcError(err);
            // -32600
            case InvalidRequestRpcError.code:
              throw new InvalidRequestRpcError(err);
            // -32601
            case MethodNotFoundRpcError.code:
              throw new MethodNotFoundRpcError(err, { method: args.method });
            // -32602
            case InvalidParamsRpcError.code:
              throw new InvalidParamsRpcError(err);
            // -32603
            case InternalRpcError.code:
              throw new InternalRpcError(err);
            // -32000
            case InvalidInputRpcError.code:
              throw new InvalidInputRpcError(err);
            // -32001
            case ResourceNotFoundRpcError.code:
              throw new ResourceNotFoundRpcError(err);
            // -32002
            case ResourceUnavailableRpcError.code:
              throw new ResourceUnavailableRpcError(err);
            // -32003
            case TransactionRejectedRpcError.code:
              throw new TransactionRejectedRpcError(err);
            // -32004
            case MethodNotSupportedRpcError.code:
              throw new MethodNotSupportedRpcError(err, {
                method: args.method
              });
            // -32005
            case LimitExceededRpcError.code:
              throw new LimitExceededRpcError(err);
            // -32006
            case JsonRpcVersionUnsupportedError.code:
              throw new JsonRpcVersionUnsupportedError(err);
            // 4001
            case UserRejectedRequestError.code:
              throw new UserRejectedRequestError(err);
            // 4100
            case UnauthorizedProviderError.code:
              throw new UnauthorizedProviderError(err);
            // 4200
            case UnsupportedProviderMethodError.code:
              throw new UnsupportedProviderMethodError(err);
            // 4900
            case ProviderDisconnectedError.code:
              throw new ProviderDisconnectedError(err);
            // 4901
            case ChainDisconnectedError.code:
              throw new ChainDisconnectedError(err);
            // 4902
            case SwitchChainError.code:
              throw new SwitchChainError(err);
            // CAIP-25: User Rejected Error
            // https://docs.walletconnect.com/2.0/specs/clients/sign/error-codes#rejected-caip-25
            case 5e3:
              throw new UserRejectedRequestError(err);
            default:
              if (err_ instanceof BaseError)
                throw err_;
              throw new UnknownRpcError(err);
          }
        }
      }, {
        delay: ({ count, error }) => {
          if (error && error instanceof HttpRequestError) {
            const retryAfter = error?.headers?.get("Retry-After");
            if (retryAfter?.match(/\d/))
              return Number.parseInt(retryAfter) * 1e3;
          }
          return ~~(1 << count) * retryDelay;
        },
        retryCount,
        shouldRetry: ({ error }) => shouldRetry(error)
      }), { enabled: dedupe, id: requestId });
    };
  }
  function shouldRetry(error) {
    if ("code" in error && typeof error.code === "number") {
      if (error.code === -1)
        return true;
      if (error.code === LimitExceededRpcError.code)
        return true;
      if (error.code === InternalRpcError.code)
        return true;
      return false;
    }
    if (error instanceof HttpRequestError && error.status) {
      if (error.status === 403)
        return true;
      if (error.status === 408)
        return true;
      if (error.status === 413)
        return true;
      if (error.status === 429)
        return true;
      if (error.status === 500)
        return true;
      if (error.status === 502)
        return true;
      if (error.status === 503)
        return true;
      if (error.status === 504)
        return true;
      return false;
    }
    return true;
  }

  // node_modules/viem/_esm/clients/transports/createTransport.js
  function createTransport({ key, name, request, retryCount = 3, retryDelay = 150, timeout, type }, value) {
    const uid2 = uid();
    return {
      config: {
        key,
        name,
        request,
        retryCount,
        retryDelay,
        timeout,
        type
      },
      request: buildRequest(request, { retryCount, retryDelay, uid: uid2 }),
      value
    };
  }

  // node_modules/viem/_esm/clients/transports/http.js
  init_request();

  // node_modules/viem/_esm/errors/transport.js
  init_base();
  var UrlRequiredError = class extends BaseError {
    constructor() {
      super("No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.", {
        docsPath: "/docs/clients/intro",
        name: "UrlRequiredError"
      });
    }
  };

  // node_modules/viem/_esm/clients/transports/http.js
  init_createBatchScheduler();

  // node_modules/viem/_esm/utils/rpc/http.js
  init_request();

  // node_modules/viem/_esm/utils/promise/withTimeout.js
  function withTimeout(fn, { errorInstance = new Error("timed out"), timeout, signal }) {
    return new Promise((resolve, reject) => {
      ;
      (async () => {
        let timeoutId;
        try {
          const controller = new AbortController();
          if (timeout > 0) {
            timeoutId = setTimeout(() => {
              if (signal) {
                controller.abort();
              } else {
                reject(errorInstance);
              }
            }, timeout);
          }
          resolve(await fn({ signal: controller?.signal || null }));
        } catch (err) {
          if (err?.name === "AbortError")
            reject(errorInstance);
          reject(err);
        } finally {
          clearTimeout(timeoutId);
        }
      })();
    });
  }

  // node_modules/viem/_esm/utils/rpc/http.js
  init_stringify();

  // node_modules/viem/_esm/utils/rpc/id.js
  function createIdStore() {
    return {
      current: 0,
      take() {
        return this.current++;
      },
      reset() {
        this.current = 0;
      }
    };
  }
  var idCache = /* @__PURE__ */ createIdStore();

  // node_modules/viem/_esm/utils/rpc/http.js
  function getHttpRpcClient(url, options = {}) {
    return {
      async request(params) {
        const { body, onRequest = options.onRequest, onResponse = options.onResponse, timeout = options.timeout ?? 1e4 } = params;
        const fetchOptions = {
          ...options.fetchOptions ?? {},
          ...params.fetchOptions ?? {}
        };
        const { headers, method, signal: signal_ } = fetchOptions;
        try {
          const response = await withTimeout(async ({ signal }) => {
            const init = {
              ...fetchOptions,
              body: Array.isArray(body) ? stringify(body.map((body2) => ({
                jsonrpc: "2.0",
                id: body2.id ?? idCache.take(),
                ...body2
              }))) : stringify({
                jsonrpc: "2.0",
                id: body.id ?? idCache.take(),
                ...body
              }),
              headers: {
                "Content-Type": "application/json",
                ...headers
              },
              method: method || "POST",
              signal: signal_ || (timeout > 0 ? signal : null)
            };
            const request = new Request(url, init);
            const args = await onRequest?.(request, init) ?? { ...init, url };
            const response2 = await fetch(args.url ?? url, args);
            return response2;
          }, {
            errorInstance: new TimeoutError({ body, url }),
            timeout,
            signal: true
          });
          if (onResponse)
            await onResponse(response);
          let data;
          if (response.headers.get("Content-Type")?.startsWith("application/json"))
            data = await response.json();
          else {
            data = await response.text();
            try {
              data = JSON.parse(data || "{}");
            } catch (err) {
              if (response.ok)
                throw err;
              data = { error: data };
            }
          }
          if (!response.ok) {
            throw new HttpRequestError({
              body,
              details: stringify(data.error) || response.statusText,
              headers: response.headers,
              status: response.status,
              url
            });
          }
          return data;
        } catch (err) {
          if (err instanceof HttpRequestError)
            throw err;
          if (err instanceof TimeoutError)
            throw err;
          throw new HttpRequestError({
            body,
            cause: err,
            url
          });
        }
      }
    };
  }

  // node_modules/viem/_esm/clients/transports/http.js
  function http(url, config = {}) {
    const { batch, fetchOptions, key = "http", name = "HTTP JSON-RPC", onFetchRequest, onFetchResponse, retryDelay } = config;
    return ({ chain, retryCount: retryCount_, timeout: timeout_ }) => {
      const { batchSize = 1e3, wait: wait2 = 0 } = typeof batch === "object" ? batch : {};
      const retryCount = config.retryCount ?? retryCount_;
      const timeout = timeout_ ?? config.timeout ?? 1e4;
      const url_ = url || chain?.rpcUrls.default.http[0];
      if (!url_)
        throw new UrlRequiredError();
      const rpcClient = getHttpRpcClient(url_, {
        fetchOptions,
        onRequest: onFetchRequest,
        onResponse: onFetchResponse,
        timeout
      });
      return createTransport({
        key,
        name,
        async request({ method, params }) {
          const body = { method, params };
          const { schedule } = createBatchScheduler({
            id: url_,
            wait: wait2,
            shouldSplitBatch(requests) {
              return requests.length > batchSize;
            },
            fn: (body2) => rpcClient.request({
              body: body2
            }),
            sort: (a, b) => a.id - b.id
          });
          const fn = async (body2) => batch ? schedule(body2) : [
            await rpcClient.request({
              body: body2
            })
          ];
          const [{ error, result }] = await fn(body);
          if (error)
            throw new RpcRequestError({
              body,
              error,
              url: url_
            });
          return result;
        },
        retryCount,
        retryDelay,
        timeout,
        type: "http"
      }, {
        fetchOptions,
        url: url_
      });
    };
  }

  // node_modules/viem/_esm/actions/ens/getEnsAddress.js
  init_abis();
  init_decodeFunctionResult();
  init_encodeFunctionData();
  init_getChainContractAddress();
  init_trim();
  init_toHex();

  // node_modules/viem/_esm/utils/ens/errors.js
  init_solidity();
  init_base();
  init_contract();
  function isNullUniversalResolverError(err, callType) {
    if (!(err instanceof BaseError))
      return false;
    const cause = err.walk((e) => e instanceof ContractFunctionRevertedError);
    if (!(cause instanceof ContractFunctionRevertedError))
      return false;
    if (cause.data?.errorName === "ResolverNotFound")
      return true;
    if (cause.data?.errorName === "ResolverWildcardNotSupported")
      return true;
    if (cause.data?.errorName === "ResolverNotContract")
      return true;
    if (cause.data?.errorName === "ResolverError")
      return true;
    if (cause.data?.errorName === "HttpError")
      return true;
    if (cause.reason?.includes("Wildcard on non-extended resolvers is not supported"))
      return true;
    if (callType === "reverse" && cause.reason === panicReasons[50])
      return true;
    return false;
  }

  // node_modules/viem/_esm/utils/ens/namehash.js
  init_concat();
  init_toBytes();
  init_toHex();
  init_keccak256();

  // node_modules/viem/_esm/utils/ens/encodedLabelToLabelhash.js
  init_isHex();
  function encodedLabelToLabelhash(label) {
    if (label.length !== 66)
      return null;
    if (label.indexOf("[") !== 0)
      return null;
    if (label.indexOf("]") !== 65)
      return null;
    const hash3 = `0x${label.slice(1, 65)}`;
    if (!isHex(hash3))
      return null;
    return hash3;
  }

  // node_modules/viem/_esm/utils/ens/namehash.js
  function namehash(name) {
    let result = new Uint8Array(32).fill(0);
    if (!name)
      return bytesToHex2(result);
    const labels = name.split(".");
    for (let i = labels.length - 1; i >= 0; i -= 1) {
      const hashFromEncodedLabel = encodedLabelToLabelhash(labels[i]);
      const hashed = hashFromEncodedLabel ? toBytes2(hashFromEncodedLabel) : keccak256(stringToBytes(labels[i]), "bytes");
      result = keccak256(concat([result, hashed]), "bytes");
    }
    return bytesToHex2(result);
  }

  // node_modules/viem/_esm/utils/ens/packetToBytes.js
  init_toBytes();

  // node_modules/viem/_esm/utils/ens/encodeLabelhash.js
  function encodeLabelhash(hash3) {
    return `[${hash3.slice(2)}]`;
  }

  // node_modules/viem/_esm/utils/ens/labelhash.js
  init_toBytes();
  init_toHex();
  init_keccak256();
  function labelhash(label) {
    const result = new Uint8Array(32).fill(0);
    if (!label)
      return bytesToHex2(result);
    return encodedLabelToLabelhash(label) || keccak256(stringToBytes(label));
  }

  // node_modules/viem/_esm/utils/ens/packetToBytes.js
  function packetToBytes(packet) {
    const value = packet.replace(/^\.|\.$/gm, "");
    if (value.length === 0)
      return new Uint8Array(1);
    const bytes2 = new Uint8Array(stringToBytes(value).byteLength + 2);
    let offset = 0;
    const list = value.split(".");
    for (let i = 0; i < list.length; i++) {
      let encoded = stringToBytes(list[i]);
      if (encoded.byteLength > 255)
        encoded = stringToBytes(encodeLabelhash(labelhash(list[i])));
      bytes2[offset] = encoded.length;
      bytes2.set(encoded, offset + 1);
      offset += encoded.length + 1;
    }
    if (bytes2.byteLength !== offset + 1)
      return bytes2.slice(0, offset + 1);
    return bytes2;
  }

  // node_modules/viem/_esm/actions/ens/getEnsAddress.js
  async function getEnsAddress(client, { blockNumber, blockTag, coinType, name, gatewayUrls, strict, universalResolverAddress: universalResolverAddress_ }) {
    let universalResolverAddress = universalResolverAddress_;
    if (!universalResolverAddress) {
      if (!client.chain)
        throw new Error("client chain not configured. universalResolverAddress is required.");
      universalResolverAddress = getChainContractAddress({
        blockNumber,
        chain: client.chain,
        contract: "ensUniversalResolver"
      });
    }
    try {
      const functionData = encodeFunctionData({
        abi: addressResolverAbi,
        functionName: "addr",
        ...coinType != null ? { args: [namehash(name), BigInt(coinType)] } : { args: [namehash(name)] }
      });
      const readContractParameters = {
        address: universalResolverAddress,
        abi: universalResolverResolveAbi,
        functionName: "resolve",
        args: [toHex(packetToBytes(name)), functionData],
        blockNumber,
        blockTag
      };
      const readContractAction = getAction(client, readContract, "readContract");
      const res = gatewayUrls ? await readContractAction({
        ...readContractParameters,
        args: [...readContractParameters.args, gatewayUrls]
      }) : await readContractAction(readContractParameters);
      if (res[0] === "0x")
        return null;
      const address = decodeFunctionResult({
        abi: addressResolverAbi,
        args: coinType != null ? [namehash(name), BigInt(coinType)] : void 0,
        functionName: "addr",
        data: res[0]
      });
      if (address === "0x")
        return null;
      if (trim(address) === "0x00")
        return null;
      return address;
    } catch (err) {
      if (strict)
        throw err;
      if (isNullUniversalResolverError(err, "resolve"))
        return null;
      throw err;
    }
  }

  // node_modules/viem/_esm/errors/ens.js
  init_base();
  var EnsAvatarInvalidMetadataError = class extends BaseError {
    constructor({ data }) {
      super("Unable to extract image from metadata. The metadata may be malformed or invalid.", {
        metaMessages: [
          "- Metadata must be a JSON object with at least an `image`, `image_url` or `image_data` property.",
          "",
          `Provided data: ${JSON.stringify(data)}`
        ],
        name: "EnsAvatarInvalidMetadataError"
      });
    }
  };
  var EnsAvatarInvalidNftUriError = class extends BaseError {
    constructor({ reason }) {
      super(`ENS NFT avatar URI is invalid. ${reason}`, {
        name: "EnsAvatarInvalidNftUriError"
      });
    }
  };
  var EnsAvatarUriResolutionError = class extends BaseError {
    constructor({ uri }) {
      super(`Unable to resolve ENS avatar URI "${uri}". The URI may be malformed, invalid, or does not respond with a valid image.`, { name: "EnsAvatarUriResolutionError" });
    }
  };
  var EnsAvatarUnsupportedNamespaceError = class extends BaseError {
    constructor({ namespace }) {
      super(`ENS NFT avatar namespace "${namespace}" is not supported. Must be "erc721" or "erc1155".`, { name: "EnsAvatarUnsupportedNamespaceError" });
    }
  };

  // node_modules/viem/_esm/utils/ens/avatar/utils.js
  var networkRegex = /(?<protocol>https?:\/\/[^\/]*|ipfs:\/|ipns:\/|ar:\/)?(?<root>\/)?(?<subpath>ipfs\/|ipns\/)?(?<target>[\w\-.]+)(?<subtarget>\/.*)?/;
  var ipfsHashRegex = /^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})(\/(?<target>[\w\-.]+))?(?<subtarget>\/.*)?$/;
  var base64Regex = /^data:([a-zA-Z\-/+]*);base64,([^"].*)/;
  var dataURIRegex = /^data:([a-zA-Z\-/+]*)?(;[a-zA-Z0-9].*?)?(,)/;
  async function isImageUri(uri) {
    try {
      const res = await fetch(uri, { method: "HEAD" });
      if (res.status === 200) {
        const contentType = res.headers.get("content-type");
        return contentType?.startsWith("image/");
      }
      return false;
    } catch (error) {
      if (typeof error === "object" && typeof error.response !== "undefined") {
        return false;
      }
      if (!globalThis.hasOwnProperty("Image"))
        return false;
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          resolve(true);
        };
        img.onerror = () => {
          resolve(false);
        };
        img.src = uri;
      });
    }
  }
  function getGateway(custom, defaultGateway) {
    if (!custom)
      return defaultGateway;
    if (custom.endsWith("/"))
      return custom.slice(0, -1);
    return custom;
  }
  function resolveAvatarUri({ uri, gatewayUrls }) {
    const isEncoded = base64Regex.test(uri);
    if (isEncoded)
      return { uri, isOnChain: true, isEncoded };
    const ipfsGateway = getGateway(gatewayUrls?.ipfs, "https://ipfs.io");
    const arweaveGateway = getGateway(gatewayUrls?.arweave, "https://arweave.net");
    const networkRegexMatch = uri.match(networkRegex);
    const { protocol, subpath, target, subtarget = "" } = networkRegexMatch?.groups || {};
    const isIPNS = protocol === "ipns:/" || subpath === "ipns/";
    const isIPFS = protocol === "ipfs:/" || subpath === "ipfs/" || ipfsHashRegex.test(uri);
    if (uri.startsWith("http") && !isIPNS && !isIPFS) {
      let replacedUri = uri;
      if (gatewayUrls?.arweave)
        replacedUri = uri.replace(/https:\/\/arweave.net/g, gatewayUrls?.arweave);
      return { uri: replacedUri, isOnChain: false, isEncoded: false };
    }
    if ((isIPNS || isIPFS) && target) {
      return {
        uri: `${ipfsGateway}/${isIPNS ? "ipns" : "ipfs"}/${target}${subtarget}`,
        isOnChain: false,
        isEncoded: false
      };
    }
    if (protocol === "ar:/" && target) {
      return {
        uri: `${arweaveGateway}/${target}${subtarget || ""}`,
        isOnChain: false,
        isEncoded: false
      };
    }
    let parsedUri = uri.replace(dataURIRegex, "");
    if (parsedUri.startsWith("<svg")) {
      parsedUri = `data:image/svg+xml;base64,${btoa(parsedUri)}`;
    }
    if (parsedUri.startsWith("data:") || parsedUri.startsWith("{")) {
      return {
        uri: parsedUri,
        isOnChain: true,
        isEncoded: false
      };
    }
    throw new EnsAvatarUriResolutionError({ uri });
  }
  function getJsonImage(data) {
    if (typeof data !== "object" || !("image" in data) && !("image_url" in data) && !("image_data" in data)) {
      throw new EnsAvatarInvalidMetadataError({ data });
    }
    return data.image || data.image_url || data.image_data;
  }
  async function getMetadataAvatarUri({ gatewayUrls, uri }) {
    try {
      const res = await fetch(uri).then((res2) => res2.json());
      const image = await parseAvatarUri({
        gatewayUrls,
        uri: getJsonImage(res)
      });
      return image;
    } catch {
      throw new EnsAvatarUriResolutionError({ uri });
    }
  }
  async function parseAvatarUri({ gatewayUrls, uri }) {
    const { uri: resolvedURI, isOnChain } = resolveAvatarUri({ uri, gatewayUrls });
    if (isOnChain)
      return resolvedURI;
    const isImage = await isImageUri(resolvedURI);
    if (isImage)
      return resolvedURI;
    throw new EnsAvatarUriResolutionError({ uri });
  }
  function parseNftUri(uri_) {
    let uri = uri_;
    if (uri.startsWith("did:nft:")) {
      uri = uri.replace("did:nft:", "").replace(/_/g, "/");
    }
    const [reference, asset_namespace, tokenID] = uri.split("/");
    const [eip_namespace, chainID] = reference.split(":");
    const [erc_namespace, contractAddress] = asset_namespace.split(":");
    if (!eip_namespace || eip_namespace.toLowerCase() !== "eip155")
      throw new EnsAvatarInvalidNftUriError({ reason: "Only EIP-155 supported" });
    if (!chainID)
      throw new EnsAvatarInvalidNftUriError({ reason: "Chain ID not found" });
    if (!contractAddress)
      throw new EnsAvatarInvalidNftUriError({
        reason: "Contract address not found"
      });
    if (!tokenID)
      throw new EnsAvatarInvalidNftUriError({ reason: "Token ID not found" });
    if (!erc_namespace)
      throw new EnsAvatarInvalidNftUriError({ reason: "ERC namespace not found" });
    return {
      chainID: Number.parseInt(chainID),
      namespace: erc_namespace.toLowerCase(),
      contractAddress,
      tokenID
    };
  }
  async function getNftTokenUri(client, { nft }) {
    if (nft.namespace === "erc721") {
      return readContract(client, {
        address: nft.contractAddress,
        abi: [
          {
            name: "tokenURI",
            type: "function",
            stateMutability: "view",
            inputs: [{ name: "tokenId", type: "uint256" }],
            outputs: [{ name: "", type: "string" }]
          }
        ],
        functionName: "tokenURI",
        args: [BigInt(nft.tokenID)]
      });
    }
    if (nft.namespace === "erc1155") {
      return readContract(client, {
        address: nft.contractAddress,
        abi: [
          {
            name: "uri",
            type: "function",
            stateMutability: "view",
            inputs: [{ name: "_id", type: "uint256" }],
            outputs: [{ name: "", type: "string" }]
          }
        ],
        functionName: "uri",
        args: [BigInt(nft.tokenID)]
      });
    }
    throw new EnsAvatarUnsupportedNamespaceError({ namespace: nft.namespace });
  }

  // node_modules/viem/_esm/utils/ens/avatar/parseAvatarRecord.js
  async function parseAvatarRecord(client, { gatewayUrls, record }) {
    if (/eip155:/i.test(record))
      return parseNftAvatarUri(client, { gatewayUrls, record });
    return parseAvatarUri({ uri: record, gatewayUrls });
  }
  async function parseNftAvatarUri(client, { gatewayUrls, record }) {
    const nft = parseNftUri(record);
    const nftUri = await getNftTokenUri(client, { nft });
    const { uri: resolvedNftUri, isOnChain, isEncoded } = resolveAvatarUri({ uri: nftUri, gatewayUrls });
    if (isOnChain && (resolvedNftUri.includes("data:application/json;base64,") || resolvedNftUri.startsWith("{"))) {
      const encodedJson = isEncoded ? (
        // if it is encoded, decode it
        atob(resolvedNftUri.replace("data:application/json;base64,", ""))
      ) : (
        // if it isn't encoded assume it is a JSON string, but it could be anything (it will error if it is)
        resolvedNftUri
      );
      const decoded = JSON.parse(encodedJson);
      return parseAvatarUri({ uri: getJsonImage(decoded), gatewayUrls });
    }
    let uriTokenId = nft.tokenID;
    if (nft.namespace === "erc1155")
      uriTokenId = uriTokenId.replace("0x", "").padStart(64, "0");
    return getMetadataAvatarUri({
      gatewayUrls,
      uri: resolvedNftUri.replace(/(?:0x)?{id}/, uriTokenId)
    });
  }

  // node_modules/viem/_esm/actions/ens/getEnsText.js
  init_abis();
  init_decodeFunctionResult();
  init_encodeFunctionData();
  init_getChainContractAddress();
  init_toHex();
  async function getEnsText(client, { blockNumber, blockTag, name, key, gatewayUrls, strict, universalResolverAddress: universalResolverAddress_ }) {
    let universalResolverAddress = universalResolverAddress_;
    if (!universalResolverAddress) {
      if (!client.chain)
        throw new Error("client chain not configured. universalResolverAddress is required.");
      universalResolverAddress = getChainContractAddress({
        blockNumber,
        chain: client.chain,
        contract: "ensUniversalResolver"
      });
    }
    try {
      const readContractParameters = {
        address: universalResolverAddress,
        abi: universalResolverResolveAbi,
        functionName: "resolve",
        args: [
          toHex(packetToBytes(name)),
          encodeFunctionData({
            abi: textResolverAbi,
            functionName: "text",
            args: [namehash(name), key]
          })
        ],
        blockNumber,
        blockTag
      };
      const readContractAction = getAction(client, readContract, "readContract");
      const res = gatewayUrls ? await readContractAction({
        ...readContractParameters,
        args: [...readContractParameters.args, gatewayUrls]
      }) : await readContractAction(readContractParameters);
      if (res[0] === "0x")
        return null;
      const record = decodeFunctionResult({
        abi: textResolverAbi,
        functionName: "text",
        data: res[0]
      });
      return record === "" ? null : record;
    } catch (err) {
      if (strict)
        throw err;
      if (isNullUniversalResolverError(err, "resolve"))
        return null;
      throw err;
    }
  }

  // node_modules/viem/_esm/actions/ens/getEnsAvatar.js
  async function getEnsAvatar(client, { blockNumber, blockTag, assetGatewayUrls, name, gatewayUrls, strict, universalResolverAddress }) {
    const record = await getAction(client, getEnsText, "getEnsText")({
      blockNumber,
      blockTag,
      key: "avatar",
      name,
      universalResolverAddress,
      gatewayUrls,
      strict
    });
    if (!record)
      return null;
    try {
      return await parseAvatarRecord(client, {
        record,
        gatewayUrls: assetGatewayUrls
      });
    } catch {
      return null;
    }
  }

  // node_modules/viem/_esm/actions/ens/getEnsName.js
  init_abis();
  init_getChainContractAddress();
  init_toHex();
  async function getEnsName(client, { address, blockNumber, blockTag, gatewayUrls, strict, universalResolverAddress: universalResolverAddress_ }) {
    let universalResolverAddress = universalResolverAddress_;
    if (!universalResolverAddress) {
      if (!client.chain)
        throw new Error("client chain not configured. universalResolverAddress is required.");
      universalResolverAddress = getChainContractAddress({
        blockNumber,
        chain: client.chain,
        contract: "ensUniversalResolver"
      });
    }
    const reverseNode = `${address.toLowerCase().substring(2)}.addr.reverse`;
    try {
      const readContractParameters = {
        address: universalResolverAddress,
        abi: universalResolverReverseAbi,
        functionName: "reverse",
        args: [toHex(packetToBytes(reverseNode))],
        blockNumber,
        blockTag
      };
      const readContractAction = getAction(client, readContract, "readContract");
      const [name, resolvedAddress] = gatewayUrls ? await readContractAction({
        ...readContractParameters,
        args: [...readContractParameters.args, gatewayUrls]
      }) : await readContractAction(readContractParameters);
      if (address.toLowerCase() !== resolvedAddress.toLowerCase())
        return null;
      return name;
    } catch (err) {
      if (strict)
        throw err;
      if (isNullUniversalResolverError(err, "reverse"))
        return null;
      throw err;
    }
  }

  // node_modules/viem/_esm/actions/ens/getEnsResolver.js
  init_getChainContractAddress();
  init_toHex();
  async function getEnsResolver(client, { blockNumber, blockTag, name, universalResolverAddress: universalResolverAddress_ }) {
    let universalResolverAddress = universalResolverAddress_;
    if (!universalResolverAddress) {
      if (!client.chain)
        throw new Error("client chain not configured. universalResolverAddress is required.");
      universalResolverAddress = getChainContractAddress({
        blockNumber,
        chain: client.chain,
        contract: "ensUniversalResolver"
      });
    }
    const [resolverAddress] = await getAction(client, readContract, "readContract")({
      address: universalResolverAddress,
      abi: [
        {
          inputs: [{ type: "bytes" }],
          name: "findResolver",
          outputs: [{ type: "address" }, { type: "bytes32" }],
          stateMutability: "view",
          type: "function"
        }
      ],
      functionName: "findResolver",
      args: [toHex(packetToBytes(name))],
      blockNumber,
      blockTag
    });
    return resolverAddress;
  }

  // node_modules/viem/_esm/clients/decorators/public.js
  init_call();

  // node_modules/viem/_esm/actions/public/createBlockFilter.js
  async function createBlockFilter(client) {
    const getRequest = createFilterRequestScope(client, {
      method: "eth_newBlockFilter"
    });
    const id = await client.request({
      method: "eth_newBlockFilter"
    });
    return { id, request: getRequest(id), type: "block" };
  }

  // node_modules/viem/_esm/actions/public/createEventFilter.js
  init_toHex();
  async function createEventFilter(client, { address, args, event, events: events_, fromBlock, strict, toBlock } = {}) {
    const events = events_ ?? (event ? [event] : void 0);
    const getRequest = createFilterRequestScope(client, {
      method: "eth_newFilter"
    });
    let topics = [];
    if (events) {
      const encoded = events.flatMap((event2) => encodeEventTopics({
        abi: [event2],
        eventName: event2.name,
        args
      }));
      topics = [encoded];
      if (event)
        topics = topics[0];
    }
    const id = await client.request({
      method: "eth_newFilter",
      params: [
        {
          address,
          fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
          toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock,
          ...topics.length ? { topics } : {}
        }
      ]
    });
    return {
      abi: events,
      args,
      eventName: event ? event.name : void 0,
      fromBlock,
      id,
      request: getRequest(id),
      strict: Boolean(strict),
      toBlock,
      type: "event"
    };
  }

  // node_modules/viem/_esm/actions/public/createPendingTransactionFilter.js
  async function createPendingTransactionFilter(client) {
    const getRequest = createFilterRequestScope(client, {
      method: "eth_newPendingTransactionFilter"
    });
    const id = await client.request({
      method: "eth_newPendingTransactionFilter"
    });
    return { id, request: getRequest(id), type: "transaction" };
  }

  // node_modules/viem/_esm/actions/public/getBlobBaseFee.js
  async function getBlobBaseFee(client) {
    const baseFee = await client.request({
      method: "eth_blobBaseFee"
    });
    return BigInt(baseFee);
  }

  // node_modules/viem/_esm/actions/public/getBlockTransactionCount.js
  init_fromHex();
  init_toHex();
  async function getBlockTransactionCount(client, { blockHash, blockNumber, blockTag = "latest" } = {}) {
    const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
    let count;
    if (blockHash) {
      count = await client.request({
        method: "eth_getBlockTransactionCountByHash",
        params: [blockHash]
      }, { dedupe: true });
    } else {
      count = await client.request({
        method: "eth_getBlockTransactionCountByNumber",
        params: [blockNumberHex || blockTag]
      }, { dedupe: Boolean(blockNumberHex) });
    }
    return hexToNumber2(count);
  }

  // node_modules/viem/_esm/actions/public/getCode.js
  init_toHex();
  async function getCode(client, { address, blockNumber, blockTag = "latest" }) {
    const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
    const hex = await client.request({
      method: "eth_getCode",
      params: [address, blockNumberHex || blockTag]
    }, { dedupe: Boolean(blockNumberHex) });
    if (hex === "0x")
      return void 0;
    return hex;
  }

  // node_modules/viem/_esm/actions/public/getFeeHistory.js
  init_toHex();

  // node_modules/viem/_esm/utils/formatters/feeHistory.js
  function formatFeeHistory(feeHistory) {
    return {
      baseFeePerGas: feeHistory.baseFeePerGas.map((value) => BigInt(value)),
      gasUsedRatio: feeHistory.gasUsedRatio,
      oldestBlock: BigInt(feeHistory.oldestBlock),
      reward: feeHistory.reward?.map((reward) => reward.map((value) => BigInt(value)))
    };
  }

  // node_modules/viem/_esm/actions/public/getFeeHistory.js
  async function getFeeHistory(client, { blockCount, blockNumber, blockTag = "latest", rewardPercentiles }) {
    const blockNumberHex = blockNumber ? numberToHex(blockNumber) : void 0;
    const feeHistory = await client.request({
      method: "eth_feeHistory",
      params: [
        numberToHex(blockCount),
        blockNumberHex || blockTag,
        rewardPercentiles
      ]
    }, { dedupe: Boolean(blockNumberHex) });
    return formatFeeHistory(feeHistory);
  }

  // node_modules/viem/_esm/actions/public/getFilterLogs.js
  async function getFilterLogs(_client, { filter }) {
    const strict = filter.strict ?? false;
    const logs = await filter.request({
      method: "eth_getFilterLogs",
      params: [filter.id]
    });
    const formattedLogs = logs.map((log) => formatLog(log));
    if (!filter.abi)
      return formattedLogs;
    return parseEventLogs({
      abi: filter.abi,
      logs: formattedLogs,
      strict
    });
  }

  // node_modules/viem/_esm/actions/public/getProof.js
  init_toHex();

  // node_modules/viem/_esm/utils/chain/defineChain.js
  function defineChain(chain) {
    return {
      formatters: void 0,
      fees: void 0,
      serializers: void 0,
      ...chain
    };
  }

  // node_modules/viem/_esm/utils/index.js
  init_encodeFunctionData();

  // node_modules/viem/_esm/utils/formatters/transactionReceipt.js
  init_fromHex();
  init_formatter();
  var receiptStatuses = {
    "0x0": "reverted",
    "0x1": "success"
  };
  function formatTransactionReceipt(transactionReceipt) {
    const receipt = {
      ...transactionReceipt,
      blockNumber: transactionReceipt.blockNumber ? BigInt(transactionReceipt.blockNumber) : null,
      contractAddress: transactionReceipt.contractAddress ? transactionReceipt.contractAddress : null,
      cumulativeGasUsed: transactionReceipt.cumulativeGasUsed ? BigInt(transactionReceipt.cumulativeGasUsed) : null,
      effectiveGasPrice: transactionReceipt.effectiveGasPrice ? BigInt(transactionReceipt.effectiveGasPrice) : null,
      gasUsed: transactionReceipt.gasUsed ? BigInt(transactionReceipt.gasUsed) : null,
      logs: transactionReceipt.logs ? transactionReceipt.logs.map((log) => formatLog(log)) : null,
      to: transactionReceipt.to ? transactionReceipt.to : null,
      transactionIndex: transactionReceipt.transactionIndex ? hexToNumber2(transactionReceipt.transactionIndex) : null,
      status: transactionReceipt.status ? receiptStatuses[transactionReceipt.status] : null,
      type: transactionReceipt.type ? transactionType[transactionReceipt.type] || transactionReceipt.type : null
    };
    if (transactionReceipt.blobGasPrice)
      receipt.blobGasPrice = BigInt(transactionReceipt.blobGasPrice);
    if (transactionReceipt.blobGasUsed)
      receipt.blobGasUsed = BigInt(transactionReceipt.blobGasUsed);
    return receipt;
  }
  var defineTransactionReceipt = /* @__PURE__ */ defineFormatter("transactionReceipt", formatTransactionReceipt);

  // node_modules/viem/_esm/utils/index.js
  init_fromHex();

  // node_modules/viem/_esm/utils/signature/recoverMessageAddress.js
  async function recoverMessageAddress({ message, signature }) {
    return recoverAddress({ hash: hashMessage(message), signature });
  }

  // node_modules/viem/_esm/utils/signature/verifyMessage.js
  init_getAddress();
  init_isAddressEqual();
  async function verifyMessage({ address, message, signature }) {
    return isAddressEqual(getAddress(address), await recoverMessageAddress({ message, signature }));
  }

  // node_modules/viem/_esm/constants/bytes.js
  var erc6492MagicBytes = "0x6492649264926492649264926492649264926492649264926492649264926492";

  // node_modules/viem/_esm/utils/signature/isErc6492Signature.js
  init_slice();
  function isErc6492Signature(signature) {
    return sliceHex(signature, -32) === erc6492MagicBytes;
  }

  // node_modules/viem/_esm/utils/signature/serializeErc6492Signature.js
  init_encodeAbiParameters();
  init_concat();
  init_toBytes();
  function serializeErc6492Signature(parameters) {
    const { address, data, signature, to = "hex" } = parameters;
    const signature_ = concatHex([
      encodeAbiParameters([{ type: "address" }, { type: "bytes" }, { type: "bytes" }], [address, data, signature]),
      erc6492MagicBytes
    ]);
    if (to === "hex")
      return signature_;
    return hexToBytes2(signature_);
  }

  // node_modules/viem/_esm/errors/unit.js
  init_base();
  var InvalidDecimalNumberError = class extends BaseError {
    constructor({ value }) {
      super(`Number \`${value}\` is not a valid decimal number.`, {
        name: "InvalidDecimalNumberError"
      });
    }
  };

  // node_modules/viem/_esm/utils/unit/parseUnits.js
  function parseUnits(value, decimals) {
    if (!/^(-?)([0-9]*)\.?([0-9]*)$/.test(value))
      throw new InvalidDecimalNumberError({ value });
    let [integer, fraction = "0"] = value.split(".");
    const negative = integer.startsWith("-");
    if (negative)
      integer = integer.slice(1);
    fraction = fraction.replace(/(0+)$/, "");
    if (decimals === 0) {
      if (Math.round(Number(`.${fraction}`)) === 1)
        integer = `${BigInt(integer) + 1n}`;
      fraction = "";
    } else if (fraction.length > decimals) {
      const [left, unit, right] = [
        fraction.slice(0, decimals - 1),
        fraction.slice(decimals - 1, decimals),
        fraction.slice(decimals)
      ];
      const rounded = Math.round(Number(`${unit}.${right}`));
      if (rounded > 9)
        fraction = `${BigInt(left) + BigInt(1)}0`.padStart(left.length + 1, "0");
      else
        fraction = `${left}${rounded}`;
      if (fraction.length > decimals) {
        fraction = fraction.slice(1);
        integer = `${BigInt(integer) + 1n}`;
      }
      fraction = fraction.slice(0, decimals);
    } else {
      fraction = fraction.padEnd(decimals, "0");
    }
    return BigInt(`${negative ? "-" : ""}${integer}${fraction}`);
  }

  // node_modules/viem/_esm/utils/unit/parseGwei.js
  init_unit();
  function parseGwei(ether, unit = "wei") {
    return parseUnits(ether, gweiUnits[unit]);
  }

  // node_modules/viem/_esm/utils/formatters/proof.js
  function formatStorageProof(storageProof) {
    return storageProof.map((proof) => ({
      ...proof,
      value: BigInt(proof.value)
    }));
  }
  function formatProof(proof) {
    return {
      ...proof,
      balance: proof.balance ? BigInt(proof.balance) : void 0,
      nonce: proof.nonce ? hexToNumber2(proof.nonce) : void 0,
      storageProof: proof.storageProof ? formatStorageProof(proof.storageProof) : void 0
    };
  }

  // node_modules/viem/_esm/actions/public/getProof.js
  async function getProof(client, { address, blockNumber, blockTag: blockTag_, storageKeys }) {
    const blockTag = blockTag_ ?? "latest";
    const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
    const proof = await client.request({
      method: "eth_getProof",
      params: [address, storageKeys, blockNumberHex || blockTag]
    });
    return formatProof(proof);
  }

  // node_modules/viem/_esm/actions/public/getStorageAt.js
  init_toHex();
  async function getStorageAt(client, { address, blockNumber, blockTag = "latest", slot }) {
    const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
    const data = await client.request({
      method: "eth_getStorageAt",
      params: [address, slot, blockNumberHex || blockTag]
    });
    return data;
  }

  // node_modules/viem/_esm/actions/public/getTransaction.js
  init_transaction();
  init_toHex();
  async function getTransaction(client, { blockHash, blockNumber, blockTag: blockTag_, hash: hash3, index: index2 }) {
    const blockTag = blockTag_ || "latest";
    const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
    let transaction = null;
    if (hash3) {
      transaction = await client.request({
        method: "eth_getTransactionByHash",
        params: [hash3]
      }, { dedupe: true });
    } else if (blockHash) {
      transaction = await client.request({
        method: "eth_getTransactionByBlockHashAndIndex",
        params: [blockHash, numberToHex(index2)]
      }, { dedupe: true });
    } else if (blockNumberHex || blockTag) {
      transaction = await client.request({
        method: "eth_getTransactionByBlockNumberAndIndex",
        params: [blockNumberHex || blockTag, numberToHex(index2)]
      }, { dedupe: Boolean(blockNumberHex) });
    }
    if (!transaction)
      throw new TransactionNotFoundError({
        blockHash,
        blockNumber,
        blockTag,
        hash: hash3,
        index: index2
      });
    const format = client.chain?.formatters?.transaction?.format || formatTransaction;
    return format(transaction);
  }

  // node_modules/viem/_esm/actions/public/getTransactionConfirmations.js
  async function getTransactionConfirmations(client, { hash: hash3, transactionReceipt }) {
    const [blockNumber, transaction] = await Promise.all([
      getAction(client, getBlockNumber, "getBlockNumber")({}),
      hash3 ? getAction(client, getTransaction, "getTransaction")({ hash: hash3 }) : void 0
    ]);
    const transactionBlockNumber = transactionReceipt?.blockNumber || transaction?.blockNumber;
    if (!transactionBlockNumber)
      return 0n;
    return blockNumber - transactionBlockNumber + 1n;
  }

  // node_modules/viem/_esm/actions/public/getTransactionReceipt.js
  init_transaction();
  async function getTransactionReceipt(client, { hash: hash3 }) {
    const receipt = await client.request({
      method: "eth_getTransactionReceipt",
      params: [hash3]
    }, { dedupe: true });
    if (!receipt)
      throw new TransactionReceiptNotFoundError({ hash: hash3 });
    const format = client.chain?.formatters?.transactionReceipt?.format || formatTransactionReceipt;
    return format(receipt);
  }

  // node_modules/viem/_esm/actions/public/multicall.js
  init_abis();
  init_abi();
  init_base();
  init_contract();
  init_decodeFunctionResult();
  init_encodeFunctionData();
  init_getChainContractAddress();
  async function multicall(client, parameters) {
    const { allowFailure = true, batchSize: batchSize_, blockNumber, blockTag, multicallAddress: multicallAddress_, stateOverride } = parameters;
    const contracts2 = parameters.contracts;
    const batchSize = batchSize_ ?? (typeof client.batch?.multicall === "object" && client.batch.multicall.batchSize || 1024);
    let multicallAddress = multicallAddress_;
    if (!multicallAddress) {
      if (!client.chain)
        throw new Error("client chain not configured. multicallAddress is required.");
      multicallAddress = getChainContractAddress({
        blockNumber,
        chain: client.chain,
        contract: "multicall3"
      });
    }
    const chunkedCalls = [[]];
    let currentChunk = 0;
    let currentChunkSize = 0;
    for (let i = 0; i < contracts2.length; i++) {
      const { abi: abi2, address, args, functionName } = contracts2[i];
      try {
        const callData = encodeFunctionData({ abi: abi2, args, functionName });
        currentChunkSize += (callData.length - 2) / 2;
        if (
          // Check if batching is enabled.
          batchSize > 0 && // Check if the current size of the batch exceeds the size limit.
          currentChunkSize > batchSize && // Check if the current chunk is not already empty.
          chunkedCalls[currentChunk].length > 0
        ) {
          currentChunk++;
          currentChunkSize = (callData.length - 2) / 2;
          chunkedCalls[currentChunk] = [];
        }
        chunkedCalls[currentChunk] = [
          ...chunkedCalls[currentChunk],
          {
            allowFailure: true,
            callData,
            target: address
          }
        ];
      } catch (err) {
        const error = getContractError(err, {
          abi: abi2,
          address,
          args,
          docsPath: "/docs/contract/multicall",
          functionName
        });
        if (!allowFailure)
          throw error;
        chunkedCalls[currentChunk] = [
          ...chunkedCalls[currentChunk],
          {
            allowFailure: true,
            callData: "0x",
            target: address
          }
        ];
      }
    }
    const aggregate3Results = await Promise.allSettled(chunkedCalls.map((calls) => getAction(client, readContract, "readContract")({
      abi: multicall3Abi,
      address: multicallAddress,
      args: [calls],
      blockNumber,
      blockTag,
      functionName: "aggregate3",
      stateOverride
    })));
    const results = [];
    for (let i = 0; i < aggregate3Results.length; i++) {
      const result = aggregate3Results[i];
      if (result.status === "rejected") {
        if (!allowFailure)
          throw result.reason;
        for (let j = 0; j < chunkedCalls[i].length; j++) {
          results.push({
            status: "failure",
            error: result.reason,
            result: void 0
          });
        }
        continue;
      }
      const aggregate3Result = result.value;
      for (let j = 0; j < aggregate3Result.length; j++) {
        const { returnData, success } = aggregate3Result[j];
        const { callData } = chunkedCalls[i][j];
        const { abi: abi2, address, functionName, args } = contracts2[results.length];
        try {
          if (callData === "0x")
            throw new AbiDecodingZeroDataError();
          if (!success)
            throw new RawContractError({ data: returnData });
          const result2 = decodeFunctionResult({
            abi: abi2,
            args,
            data: returnData,
            functionName
          });
          results.push(allowFailure ? { result: result2, status: "success" } : result2);
        } catch (err) {
          const error = getContractError(err, {
            abi: abi2,
            address,
            args,
            docsPath: "/docs/contract/multicall",
            functionName
          });
          if (!allowFailure)
            throw error;
          results.push({ error, result: void 0, status: "failure" });
        }
      }
    }
    if (results.length !== contracts2.length)
      throw new BaseError("multicall results mismatch");
    return results;
  }

  // node_modules/viem/_esm/actions/public/verifyHash.js
  init_abis();
  init_contracts();
  init_contract();
  init_encodeDeployData();
  init_getAddress();
  init_isAddressEqual();
  init_isHex();
  init_toHex();
  init_call();
  async function verifyHash(client, parameters) {
    const { address, factory, factoryData, hash: hash3, signature, universalSignatureVerifierAddress = client.chain?.contracts?.universalSignatureVerifier?.address, ...rest } = parameters;
    const signatureHex = (() => {
      if (isHex(signature))
        return signature;
      if (typeof signature === "object" && "r" in signature && "s" in signature)
        return serializeSignature(signature);
      return bytesToHex2(signature);
    })();
    const wrappedSignature = await (async () => {
      if (!factory && !factoryData)
        return signatureHex;
      if (isErc6492Signature(signatureHex))
        return signatureHex;
      return serializeErc6492Signature({
        address: factory,
        data: factoryData,
        signature: signatureHex
      });
    })();
    try {
      const args = universalSignatureVerifierAddress ? {
        to: universalSignatureVerifierAddress,
        data: encodeFunctionData({
          abi: universalSignatureValidatorAbi,
          functionName: "isValidSig",
          args: [address, hash3, wrappedSignature]
        }),
        ...rest
      } : {
        data: encodeDeployData({
          abi: universalSignatureValidatorAbi,
          args: [address, hash3, wrappedSignature],
          bytecode: universalSignatureValidatorByteCode
        }),
        ...rest
      };
      const { data } = await getAction(client, call, "call")(args);
      return hexToBool(data ?? "0x0");
    } catch (error) {
      try {
        const verified = isAddressEqual(getAddress(address), await recoverAddress({ hash: hash3, signature }));
        if (verified)
          return true;
      } catch {
      }
      if (error instanceof CallExecutionError) {
        return false;
      }
      throw error;
    }
  }

  // node_modules/viem/_esm/actions/public/verifyMessage.js
  async function verifyMessage2(client, { address, message, factory, factoryData, signature, ...callRequest }) {
    const hash3 = hashMessage(message);
    return verifyHash(client, {
      address,
      factory,
      factoryData,
      hash: hash3,
      signature,
      ...callRequest
    });
  }

  // node_modules/viem/_esm/actions/public/verifyTypedData.js
  async function verifyTypedData(client, parameters) {
    const { address, factory, factoryData, signature, message, primaryType, types, domain, ...callRequest } = parameters;
    const hash3 = hashTypedData({ message, primaryType, types, domain });
    return verifyHash(client, {
      address,
      factory,
      factoryData,
      hash: hash3,
      signature,
      ...callRequest
    });
  }

  // node_modules/viem/_esm/actions/public/waitForTransactionReceipt.js
  init_transaction();
  init_stringify();

  // node_modules/viem/_esm/actions/public/watchBlockNumber.js
  init_fromHex();
  init_stringify();
  function watchBlockNumber(client, { emitOnBegin = false, emitMissed = false, onBlockNumber, onError, poll: poll_, pollingInterval = client.pollingInterval }) {
    const enablePolling = (() => {
      if (typeof poll_ !== "undefined")
        return poll_;
      if (client.transport.type === "webSocket")
        return false;
      if (client.transport.type === "fallback" && client.transport.transports[0].config.type === "webSocket")
        return false;
      return true;
    })();
    let prevBlockNumber;
    const pollBlockNumber = () => {
      const observerId = stringify([
        "watchBlockNumber",
        client.uid,
        emitOnBegin,
        emitMissed,
        pollingInterval
      ]);
      return observe(observerId, { onBlockNumber, onError }, (emit) => poll(async () => {
        try {
          const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({ cacheTime: 0 });
          if (prevBlockNumber) {
            if (blockNumber === prevBlockNumber)
              return;
            if (blockNumber - prevBlockNumber > 1 && emitMissed) {
              for (let i = prevBlockNumber + 1n; i < blockNumber; i++) {
                emit.onBlockNumber(i, prevBlockNumber);
                prevBlockNumber = i;
              }
            }
          }
          if (!prevBlockNumber || blockNumber > prevBlockNumber) {
            emit.onBlockNumber(blockNumber, prevBlockNumber);
            prevBlockNumber = blockNumber;
          }
        } catch (err) {
          emit.onError?.(err);
        }
      }, {
        emitOnBegin,
        interval: pollingInterval
      }));
    };
    const subscribeBlockNumber = () => {
      const observerId = stringify([
        "watchBlockNumber",
        client.uid,
        emitOnBegin,
        emitMissed
      ]);
      return observe(observerId, { onBlockNumber, onError }, (emit) => {
        let active = true;
        let unsubscribe = () => active = false;
        (async () => {
          try {
            const transport = (() => {
              if (client.transport.type === "fallback") {
                const transport2 = client.transport.transports.find((transport3) => transport3.config.type === "webSocket");
                if (!transport2)
                  return client.transport;
                return transport2.value;
              }
              return client.transport;
            })();
            const { unsubscribe: unsubscribe_ } = await transport.subscribe({
              params: ["newHeads"],
              onData(data) {
                if (!active)
                  return;
                const blockNumber = hexToBigInt(data.result?.number);
                emit.onBlockNumber(blockNumber, prevBlockNumber);
                prevBlockNumber = blockNumber;
              },
              onError(error) {
                emit.onError?.(error);
              }
            });
            unsubscribe = unsubscribe_;
            if (!active)
              unsubscribe();
          } catch (err) {
            onError?.(err);
          }
        })();
        return () => unsubscribe();
      });
    };
    return enablePolling ? pollBlockNumber() : subscribeBlockNumber();
  }

  // node_modules/viem/_esm/actions/public/waitForTransactionReceipt.js
  async function waitForTransactionReceipt(client, {
    confirmations = 1,
    hash: hash3,
    onReplaced,
    pollingInterval = client.pollingInterval,
    retryCount = 6,
    retryDelay = ({ count }) => ~~(1 << count) * 200,
    // exponential backoff
    timeout = 18e4
  }) {
    const observerId = stringify(["waitForTransactionReceipt", client.uid, hash3]);
    let transaction;
    let replacedTransaction;
    let receipt;
    let retrying = false;
    return new Promise((resolve, reject) => {
      if (timeout)
        setTimeout(() => reject(new WaitForTransactionReceiptTimeoutError({ hash: hash3 })), timeout);
      const _unobserve = observe(observerId, { onReplaced, resolve, reject }, (emit) => {
        const _unwatch = getAction(client, watchBlockNumber, "watchBlockNumber")({
          emitMissed: true,
          emitOnBegin: true,
          poll: true,
          pollingInterval,
          async onBlockNumber(blockNumber_) {
            const done = (fn) => {
              _unwatch();
              fn();
              _unobserve();
            };
            let blockNumber = blockNumber_;
            if (retrying)
              return;
            try {
              if (receipt) {
                if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations))
                  return;
                done(() => emit.resolve(receipt));
                return;
              }
              if (!transaction) {
                retrying = true;
                await withRetry(async () => {
                  transaction = await getAction(client, getTransaction, "getTransaction")({ hash: hash3 });
                  if (transaction.blockNumber)
                    blockNumber = transaction.blockNumber;
                }, {
                  delay: retryDelay,
                  retryCount
                });
                retrying = false;
              }
              receipt = await getAction(client, getTransactionReceipt, "getTransactionReceipt")({ hash: hash3 });
              if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations))
                return;
              done(() => emit.resolve(receipt));
            } catch (err) {
              if (err instanceof TransactionNotFoundError || err instanceof TransactionReceiptNotFoundError) {
                if (!transaction) {
                  retrying = false;
                  return;
                }
                try {
                  replacedTransaction = transaction;
                  retrying = true;
                  const block = await withRetry(() => getAction(client, getBlock, "getBlock")({
                    blockNumber,
                    includeTransactions: true
                  }), {
                    delay: retryDelay,
                    retryCount,
                    shouldRetry: ({ error }) => error instanceof BlockNotFoundError
                  });
                  retrying = false;
                  const replacementTransaction = block.transactions.find(({ from, nonce }) => from === replacedTransaction.from && nonce === replacedTransaction.nonce);
                  if (!replacementTransaction)
                    return;
                  receipt = await getAction(client, getTransactionReceipt, "getTransactionReceipt")({
                    hash: replacementTransaction.hash
                  });
                  if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations))
                    return;
                  let reason = "replaced";
                  if (replacementTransaction.to === replacedTransaction.to && replacementTransaction.value === replacedTransaction.value) {
                    reason = "repriced";
                  } else if (replacementTransaction.from === replacementTransaction.to && replacementTransaction.value === 0n) {
                    reason = "cancelled";
                  }
                  done(() => {
                    emit.onReplaced?.({
                      reason,
                      replacedTransaction,
                      transaction: replacementTransaction,
                      transactionReceipt: receipt
                    });
                    emit.resolve(receipt);
                  });
                } catch (err_) {
                  done(() => emit.reject(err_));
                }
              } else {
                done(() => emit.reject(err));
              }
            }
          }
        });
      });
    });
  }

  // node_modules/viem/_esm/actions/public/watchBlocks.js
  init_stringify();
  function watchBlocks(client, { blockTag = "latest", emitMissed = false, emitOnBegin = false, onBlock, onError, includeTransactions: includeTransactions_, poll: poll_, pollingInterval = client.pollingInterval }) {
    const enablePolling = (() => {
      if (typeof poll_ !== "undefined")
        return poll_;
      if (client.transport.type === "webSocket")
        return false;
      if (client.transport.type === "fallback" && client.transport.transports[0].config.type === "webSocket")
        return false;
      return true;
    })();
    const includeTransactions = includeTransactions_ ?? false;
    let prevBlock;
    const pollBlocks = () => {
      const observerId = stringify([
        "watchBlocks",
        client.uid,
        blockTag,
        emitMissed,
        emitOnBegin,
        includeTransactions,
        pollingInterval
      ]);
      return observe(observerId, { onBlock, onError }, (emit) => poll(async () => {
        try {
          const block = await getAction(client, getBlock, "getBlock")({
            blockTag,
            includeTransactions
          });
          if (block.number && prevBlock?.number) {
            if (block.number === prevBlock.number)
              return;
            if (block.number - prevBlock.number > 1 && emitMissed) {
              for (let i = prevBlock?.number + 1n; i < block.number; i++) {
                const block2 = await getAction(client, getBlock, "getBlock")({
                  blockNumber: i,
                  includeTransactions
                });
                emit.onBlock(block2, prevBlock);
                prevBlock = block2;
              }
            }
          }
          if (
            // If no previous block exists, emit.
            !prevBlock?.number || // If the block tag is "pending" with no block number, emit.
            blockTag === "pending" && !block?.number || // If the next block number is greater than the previous block number, emit.
            // We don't want to emit blocks in the past.
            block.number && block.number > prevBlock.number
          ) {
            emit.onBlock(block, prevBlock);
            prevBlock = block;
          }
        } catch (err) {
          emit.onError?.(err);
        }
      }, {
        emitOnBegin,
        interval: pollingInterval
      }));
    };
    const subscribeBlocks = () => {
      let active = true;
      let emitFetched = true;
      let unsubscribe = () => active = false;
      (async () => {
        try {
          if (emitOnBegin) {
            getAction(client, getBlock, "getBlock")({
              blockTag,
              includeTransactions
            }).then((block) => {
              if (!active)
                return;
              if (!emitFetched)
                return;
              onBlock(block, void 0);
              emitFetched = false;
            });
          }
          const transport = (() => {
            if (client.transport.type === "fallback") {
              const transport2 = client.transport.transports.find((transport3) => transport3.config.type === "webSocket");
              if (!transport2)
                return client.transport;
              return transport2.value;
            }
            return client.transport;
          })();
          const { unsubscribe: unsubscribe_ } = await transport.subscribe({
            params: ["newHeads"],
            onData(data) {
              if (!active)
                return;
              const format = client.chain?.formatters?.block?.format || formatBlock;
              const block = format(data.result);
              onBlock(block, prevBlock);
              emitFetched = false;
              prevBlock = block;
            },
            onError(error) {
              onError?.(error);
            }
          });
          unsubscribe = unsubscribe_;
          if (!active)
            unsubscribe();
        } catch (err) {
          onError?.(err);
        }
      })();
      return () => unsubscribe();
    };
    return enablePolling ? pollBlocks() : subscribeBlocks();
  }

  // node_modules/viem/_esm/actions/public/watchEvent.js
  init_stringify();
  init_abi();
  init_rpc();
  function watchEvent(client, { address, args, batch = true, event, events, fromBlock, onError, onLogs, poll: poll_, pollingInterval = client.pollingInterval, strict: strict_ }) {
    const enablePolling = (() => {
      if (typeof poll_ !== "undefined")
        return poll_;
      if (typeof fromBlock === "bigint")
        return true;
      if (client.transport.type === "webSocket")
        return false;
      if (client.transport.type === "fallback" && client.transport.transports[0].config.type === "webSocket")
        return false;
      return true;
    })();
    const strict = strict_ ?? false;
    const pollEvent = () => {
      const observerId = stringify([
        "watchEvent",
        address,
        args,
        batch,
        client.uid,
        event,
        pollingInterval,
        fromBlock
      ]);
      return observe(observerId, { onLogs, onError }, (emit) => {
        let previousBlockNumber;
        if (fromBlock !== void 0)
          previousBlockNumber = fromBlock - 1n;
        let filter;
        let initialized = false;
        const unwatch = poll(async () => {
          if (!initialized) {
            try {
              filter = await getAction(client, createEventFilter, "createEventFilter")({
                address,
                args,
                event,
                events,
                strict,
                fromBlock
              });
            } catch {
            }
            initialized = true;
            return;
          }
          try {
            let logs;
            if (filter) {
              logs = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
            } else {
              const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({});
              if (previousBlockNumber && previousBlockNumber !== blockNumber) {
                logs = await getAction(client, getLogs, "getLogs")({
                  address,
                  args,
                  event,
                  events,
                  fromBlock: previousBlockNumber + 1n,
                  toBlock: blockNumber
                });
              } else {
                logs = [];
              }
              previousBlockNumber = blockNumber;
            }
            if (logs.length === 0)
              return;
            if (batch)
              emit.onLogs(logs);
            else
              for (const log of logs)
                emit.onLogs([log]);
          } catch (err) {
            if (filter && err instanceof InvalidInputRpcError)
              initialized = false;
            emit.onError?.(err);
          }
        }, {
          emitOnBegin: true,
          interval: pollingInterval
        });
        return async () => {
          if (filter)
            await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
          unwatch();
        };
      });
    };
    const subscribeEvent = () => {
      let active = true;
      let unsubscribe = () => active = false;
      (async () => {
        try {
          const transport = (() => {
            if (client.transport.type === "fallback") {
              const transport2 = client.transport.transports.find((transport3) => transport3.config.type === "webSocket");
              if (!transport2)
                return client.transport;
              return transport2.value;
            }
            return client.transport;
          })();
          const events_ = events ?? (event ? [event] : void 0);
          let topics = [];
          if (events_) {
            const encoded = events_.flatMap((event2) => encodeEventTopics({
              abi: [event2],
              eventName: event2.name,
              args
            }));
            topics = [encoded];
            if (event)
              topics = topics[0];
          }
          const { unsubscribe: unsubscribe_ } = await transport.subscribe({
            params: ["logs", { address, topics }],
            onData(data) {
              if (!active)
                return;
              const log = data.result;
              try {
                const { eventName, args: args2 } = decodeEventLog({
                  abi: events_ ?? [],
                  data: log.data,
                  topics: log.topics,
                  strict
                });
                const formatted = formatLog(log, { args: args2, eventName });
                onLogs([formatted]);
              } catch (err) {
                let eventName;
                let isUnnamed;
                if (err instanceof DecodeLogDataMismatch || err instanceof DecodeLogTopicsMismatch) {
                  if (strict_)
                    return;
                  eventName = err.abiItem.name;
                  isUnnamed = err.abiItem.inputs?.some((x) => !("name" in x && x.name));
                }
                const formatted = formatLog(log, {
                  args: isUnnamed ? [] : {},
                  eventName
                });
                onLogs([formatted]);
              }
            },
            onError(error) {
              onError?.(error);
            }
          });
          unsubscribe = unsubscribe_;
          if (!active)
            unsubscribe();
        } catch (err) {
          onError?.(err);
        }
      })();
      return () => unsubscribe();
    };
    return enablePolling ? pollEvent() : subscribeEvent();
  }

  // node_modules/viem/_esm/actions/public/watchPendingTransactions.js
  init_stringify();
  function watchPendingTransactions(client, { batch = true, onError, onTransactions, poll: poll_, pollingInterval = client.pollingInterval }) {
    const enablePolling = typeof poll_ !== "undefined" ? poll_ : client.transport.type !== "webSocket";
    const pollPendingTransactions = () => {
      const observerId = stringify([
        "watchPendingTransactions",
        client.uid,
        batch,
        pollingInterval
      ]);
      return observe(observerId, { onTransactions, onError }, (emit) => {
        let filter;
        const unwatch = poll(async () => {
          try {
            if (!filter) {
              try {
                filter = await getAction(client, createPendingTransactionFilter, "createPendingTransactionFilter")({});
                return;
              } catch (err) {
                unwatch();
                throw err;
              }
            }
            const hashes = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
            if (hashes.length === 0)
              return;
            if (batch)
              emit.onTransactions(hashes);
            else
              for (const hash3 of hashes)
                emit.onTransactions([hash3]);
          } catch (err) {
            emit.onError?.(err);
          }
        }, {
          emitOnBegin: true,
          interval: pollingInterval
        });
        return async () => {
          if (filter)
            await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
          unwatch();
        };
      });
    };
    const subscribePendingTransactions = () => {
      let active = true;
      let unsubscribe = () => active = false;
      (async () => {
        try {
          const { unsubscribe: unsubscribe_ } = await client.transport.subscribe({
            params: ["newPendingTransactions"],
            onData(data) {
              if (!active)
                return;
              const transaction = data.result;
              onTransactions([transaction]);
            },
            onError(error) {
              onError?.(error);
            }
          });
          unsubscribe = unsubscribe_;
          if (!active)
            unsubscribe();
        } catch (err) {
          onError?.(err);
        }
      })();
      return () => unsubscribe();
    };
    return enablePolling ? pollPendingTransactions() : subscribePendingTransactions();
  }

  // node_modules/viem/_esm/utils/siwe/parseSiweMessage.js
  function parseSiweMessage(message) {
    const { scheme, statement, ...prefix } = message.match(prefixRegex)?.groups ?? {};
    const { chainId, expirationTime, issuedAt, notBefore, requestId, ...suffix } = message.match(suffixRegex)?.groups ?? {};
    const resources = message.split("Resources:")[1]?.split("\n- ").slice(1);
    return {
      ...prefix,
      ...suffix,
      ...chainId ? { chainId: Number(chainId) } : {},
      ...expirationTime ? { expirationTime: new Date(expirationTime) } : {},
      ...issuedAt ? { issuedAt: new Date(issuedAt) } : {},
      ...notBefore ? { notBefore: new Date(notBefore) } : {},
      ...requestId ? { requestId } : {},
      ...resources ? { resources } : {},
      ...scheme ? { scheme } : {},
      ...statement ? { statement } : {}
    };
  }
  var prefixRegex = /^(?:(?<scheme>[a-zA-Z][a-zA-Z0-9+-.]*):\/\/)?(?<domain>[a-zA-Z0-9+-.]*(?::[0-9]{1,5})?) (?:wants you to sign in with your Ethereum account:\n)(?<address>0x[a-fA-F0-9]{40})\n\n(?:(?<statement>.*)\n\n)?/;
  var suffixRegex = /(?:URI: (?<uri>.+))\n(?:Version: (?<version>.+))\n(?:Chain ID: (?<chainId>\d+))\n(?:Nonce: (?<nonce>[a-zA-Z0-9]+))\n(?:Issued At: (?<issuedAt>.+))(?:\nExpiration Time: (?<expirationTime>.+))?(?:\nNot Before: (?<notBefore>.+))?(?:\nRequest ID: (?<requestId>.+))?/;

  // node_modules/viem/_esm/utils/siwe/validateSiweMessage.js
  init_isAddressEqual();
  function validateSiweMessage(parameters) {
    const { address, domain, message, nonce, scheme, time = /* @__PURE__ */ new Date() } = parameters;
    if (domain && message.domain !== domain)
      return false;
    if (nonce && message.nonce !== nonce)
      return false;
    if (scheme && message.scheme !== scheme)
      return false;
    if (message.expirationTime && time >= message.expirationTime)
      return false;
    if (message.notBefore && time < message.notBefore)
      return false;
    try {
      if (!message.address)
        return false;
      if (address && !isAddressEqual(message.address, address))
        return false;
    } catch {
      return false;
    }
    return true;
  }

  // node_modules/viem/_esm/actions/siwe/verifySiweMessage.js
  async function verifySiweMessage(client, parameters) {
    const { address, domain, message, nonce, scheme, signature, time = /* @__PURE__ */ new Date(), ...callRequest } = parameters;
    const parsed = parseSiweMessage(message);
    if (!parsed.address)
      return false;
    const isValid = validateSiweMessage({
      address,
      domain,
      message: parsed,
      nonce,
      scheme,
      time
    });
    if (!isValid)
      return false;
    const hash3 = hashMessage(message);
    return verifyHash(client, {
      address: parsed.address,
      hash: hash3,
      signature,
      ...callRequest
    });
  }

  // node_modules/viem/_esm/clients/decorators/public.js
  function publicActions(client) {
    return {
      call: (args) => call(client, args),
      createBlockFilter: () => createBlockFilter(client),
      createContractEventFilter: (args) => createContractEventFilter(client, args),
      createEventFilter: (args) => createEventFilter(client, args),
      createPendingTransactionFilter: () => createPendingTransactionFilter(client),
      estimateContractGas: (args) => estimateContractGas(client, args),
      estimateGas: (args) => estimateGas(client, args),
      getBalance: (args) => getBalance(client, args),
      getBlobBaseFee: () => getBlobBaseFee(client),
      getBlock: (args) => getBlock(client, args),
      getBlockNumber: (args) => getBlockNumber(client, args),
      getBlockTransactionCount: (args) => getBlockTransactionCount(client, args),
      getBytecode: (args) => getCode(client, args),
      getChainId: () => getChainId(client),
      getCode: (args) => getCode(client, args),
      getContractEvents: (args) => getContractEvents(client, args),
      getEip712Domain: (args) => getEip712Domain(client, args),
      getEnsAddress: (args) => getEnsAddress(client, args),
      getEnsAvatar: (args) => getEnsAvatar(client, args),
      getEnsName: (args) => getEnsName(client, args),
      getEnsResolver: (args) => getEnsResolver(client, args),
      getEnsText: (args) => getEnsText(client, args),
      getFeeHistory: (args) => getFeeHistory(client, args),
      estimateFeesPerGas: (args) => estimateFeesPerGas(client, args),
      getFilterChanges: (args) => getFilterChanges(client, args),
      getFilterLogs: (args) => getFilterLogs(client, args),
      getGasPrice: () => getGasPrice(client),
      getLogs: (args) => getLogs(client, args),
      getProof: (args) => getProof(client, args),
      estimateMaxPriorityFeePerGas: (args) => estimateMaxPriorityFeePerGas(client, args),
      getStorageAt: (args) => getStorageAt(client, args),
      getTransaction: (args) => getTransaction(client, args),
      getTransactionConfirmations: (args) => getTransactionConfirmations(client, args),
      getTransactionCount: (args) => getTransactionCount(client, args),
      getTransactionReceipt: (args) => getTransactionReceipt(client, args),
      multicall: (args) => multicall(client, args),
      prepareTransactionRequest: (args) => prepareTransactionRequest(client, args),
      readContract: (args) => readContract(client, args),
      sendRawTransaction: (args) => sendRawTransaction(client, args),
      simulateContract: (args) => simulateContract(client, args),
      verifyMessage: (args) => verifyMessage2(client, args),
      verifySiweMessage: (args) => verifySiweMessage(client, args),
      verifyTypedData: (args) => verifyTypedData(client, args),
      uninstallFilter: (args) => uninstallFilter(client, args),
      waitForTransactionReceipt: (args) => waitForTransactionReceipt(client, args),
      watchBlocks: (args) => watchBlocks(client, args),
      watchBlockNumber: (args) => watchBlockNumber(client, args),
      watchContractEvent: (args) => watchContractEvent(client, args),
      watchEvent: (args) => watchEvent(client, args),
      watchPendingTransactions: (args) => watchPendingTransactions(client, args)
    };
  }

  // node_modules/viem/_esm/clients/createPublicClient.js
  function createPublicClient(parameters) {
    const { key = "public", name = "Public Client" } = parameters;
    const client = createClient({
      ...parameters,
      key,
      name,
      type: "publicClient"
    });
    return client.extend(publicActions);
  }

  // node_modules/viem/_esm/actions/wallet/deployContract.js
  init_encodeDeployData();
  function deployContract(walletClient2, parameters) {
    const { abi: abi2, args, bytecode, ...request } = parameters;
    const calldata = encodeDeployData({ abi: abi2, args, bytecode });
    return sendTransaction(walletClient2, {
      ...request,
      data: calldata
    });
  }

  // node_modules/viem/_esm/actions/wallet/getAddresses.js
  init_getAddress();
  async function getAddresses(client) {
    if (client.account?.type === "local")
      return [client.account.address];
    const addresses = await client.request({ method: "eth_accounts" }, { dedupe: true });
    return addresses.map((address) => checksumAddress(address));
  }

  // node_modules/viem/_esm/actions/wallet/getPermissions.js
  async function getPermissions(client) {
    const permissions = await client.request({ method: "wallet_getPermissions" }, { dedupe: true });
    return permissions;
  }

  // node_modules/viem/_esm/actions/wallet/requestAddresses.js
  init_getAddress();
  async function requestAddresses(client) {
    const addresses = await client.request({ method: "eth_requestAccounts" }, { dedupe: true, retryCount: 0 });
    return addresses.map((address) => getAddress(address));
  }

  // node_modules/viem/_esm/actions/wallet/requestPermissions.js
  async function requestPermissions(client, permissions) {
    return client.request({
      method: "wallet_requestPermissions",
      params: [permissions]
    }, { retryCount: 0 });
  }

  // node_modules/viem/_esm/actions/wallet/signMessage.js
  init_parseAccount();
  init_toHex();
  async function signMessage2(client, { account: account_ = client.account, message }) {
    if (!account_)
      throw new AccountNotFoundError({
        docsPath: "/docs/actions/wallet/signMessage"
      });
    const account = parseAccount(account_);
    if (account.signMessage)
      return account.signMessage({ message });
    const message_ = (() => {
      if (typeof message === "string")
        return stringToHex(message);
      if (message.raw instanceof Uint8Array)
        return toHex(message.raw);
      return message.raw;
    })();
    return client.request({
      method: "personal_sign",
      params: [message_, account.address]
    }, { retryCount: 0 });
  }

  // node_modules/viem/_esm/actions/wallet/signTransaction.js
  init_parseAccount();
  init_toHex();
  init_transactionRequest();
  init_assertRequest();
  async function signTransaction2(client, parameters) {
    const { account: account_ = client.account, chain = client.chain, ...transaction } = parameters;
    if (!account_)
      throw new AccountNotFoundError({
        docsPath: "/docs/actions/wallet/signTransaction"
      });
    const account = parseAccount(account_);
    assertRequest({
      account,
      ...parameters
    });
    const chainId = await getAction(client, getChainId, "getChainId")({});
    if (chain !== null)
      assertCurrentChain({
        currentChainId: chainId,
        chain
      });
    const formatters2 = chain?.formatters || client.chain?.formatters;
    const format = formatters2?.transactionRequest?.format || formatTransactionRequest;
    if (account.signTransaction)
      return account.signTransaction({
        ...transaction,
        chainId
      }, { serializer: client.chain?.serializers?.transaction });
    return await client.request({
      method: "eth_signTransaction",
      params: [
        {
          ...format(transaction),
          chainId: numberToHex(chainId),
          from: account.address
        }
      ]
    }, { retryCount: 0 });
  }

  // node_modules/viem/_esm/actions/wallet/signTypedData.js
  init_parseAccount();
  async function signTypedData2(client, parameters) {
    const { account: account_ = client.account, domain, message, primaryType } = parameters;
    if (!account_)
      throw new AccountNotFoundError({
        docsPath: "/docs/actions/wallet/signTypedData"
      });
    const account = parseAccount(account_);
    const types = {
      EIP712Domain: getTypesForEIP712Domain({ domain }),
      ...parameters.types
    };
    validateTypedData({ domain, message, primaryType, types });
    if (account.signTypedData)
      return account.signTypedData({ domain, message, primaryType, types });
    const typedData = serializeTypedData({ domain, message, primaryType, types });
    return client.request({
      method: "eth_signTypedData_v4",
      params: [account.address, typedData]
    }, { retryCount: 0 });
  }

  // node_modules/viem/_esm/actions/wallet/switchChain.js
  init_toHex();
  async function switchChain(client, { id }) {
    await client.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: numberToHex(id)
        }
      ]
    }, { retryCount: 0 });
  }

  // node_modules/viem/_esm/actions/wallet/watchAsset.js
  async function watchAsset(client, params) {
    const added = await client.request({
      method: "wallet_watchAsset",
      params
    }, { retryCount: 0 });
    return added;
  }

  // node_modules/viem/_esm/clients/decorators/wallet.js
  function walletActions(client) {
    return {
      addChain: (args) => addChain(client, args),
      deployContract: (args) => deployContract(client, args),
      getAddresses: () => getAddresses(client),
      getChainId: () => getChainId(client),
      getPermissions: () => getPermissions(client),
      prepareTransactionRequest: (args) => prepareTransactionRequest(client, args),
      requestAddresses: () => requestAddresses(client),
      requestPermissions: (args) => requestPermissions(client, args),
      sendRawTransaction: (args) => sendRawTransaction(client, args),
      sendTransaction: (args) => sendTransaction(client, args),
      signMessage: (args) => signMessage2(client, args),
      signTransaction: (args) => signTransaction2(client, args),
      signTypedData: (args) => signTypedData2(client, args),
      switchChain: (args) => switchChain(client, args),
      watchAsset: (args) => watchAsset(client, args),
      writeContract: (args) => writeContract(client, args)
    };
  }

  // node_modules/viem/_esm/clients/createWalletClient.js
  function createWalletClient(parameters) {
    const { key = "wallet", name = "Wallet Client", transport } = parameters;
    const client = createClient({
      ...parameters,
      key,
      name,
      transport,
      type: "walletClient"
    });
    return client.extend(walletActions);
  }

  // node_modules/viem/_esm/index.js
  init_keccak256();

  // node_modules/viem/_esm/op-stack/contracts.js
  var contracts = {
    gasPriceOracle: { address: "0x420000000000000000000000000000000000000F" },
    l1Block: { address: "0x4200000000000000000000000000000000000015" },
    l2CrossDomainMessenger: {
      address: "0x4200000000000000000000000000000000000007"
    },
    l2Erc721Bridge: { address: "0x4200000000000000000000000000000000000014" },
    l2StandardBridge: { address: "0x4200000000000000000000000000000000000010" },
    l2ToL1MessagePasser: {
      address: "0x4200000000000000000000000000000000000016"
    }
  };

  // node_modules/viem/_esm/op-stack/formatters.js
  init_fromHex();
  var formatters = {
    block: /* @__PURE__ */ defineBlock({
      format(args) {
        const transactions = args.transactions?.map((transaction) => {
          if (typeof transaction === "string")
            return transaction;
          const formatted = formatTransaction(transaction);
          if (formatted.typeHex === "0x7e") {
            formatted.isSystemTx = transaction.isSystemTx;
            formatted.mint = transaction.mint ? hexToBigInt(transaction.mint) : void 0;
            formatted.sourceHash = transaction.sourceHash;
            formatted.type = "deposit";
          }
          return formatted;
        });
        return {
          transactions,
          stateRoot: args.stateRoot
        };
      }
    }),
    transaction: /* @__PURE__ */ defineTransaction({
      format(args) {
        const transaction = {};
        if (args.type === "0x7e") {
          transaction.isSystemTx = args.isSystemTx;
          transaction.mint = args.mint ? hexToBigInt(args.mint) : void 0;
          transaction.sourceHash = args.sourceHash;
          transaction.type = "deposit";
        }
        return transaction;
      }
    }),
    transactionReceipt: /* @__PURE__ */ defineTransactionReceipt({
      format(args) {
        return {
          l1GasPrice: args.l1GasPrice ? hexToBigInt(args.l1GasPrice) : null,
          l1GasUsed: args.l1GasUsed ? hexToBigInt(args.l1GasUsed) : null,
          l1Fee: args.l1Fee ? hexToBigInt(args.l1Fee) : null,
          l1FeeScalar: args.l1FeeScalar ? Number(args.l1FeeScalar) : null
        };
      }
    })
  };

  // node_modules/viem/_esm/op-stack/serializers.js
  init_address();
  init_isAddress();
  init_concat();
  init_toHex();
  function serializeTransaction2(transaction, signature) {
    if (isDeposit(transaction))
      return serializeTransactionDeposit(transaction);
    return serializeTransaction(transaction, signature);
  }
  var serializers = {
    transaction: serializeTransaction2
  };
  function serializeTransactionDeposit(transaction) {
    assertTransactionDeposit(transaction);
    const { sourceHash, data, from, gas, isSystemTx, mint, to, value } = transaction;
    const serializedTransaction = [
      sourceHash,
      from,
      to ?? "0x",
      mint ? toHex(mint) : "0x",
      value ? toHex(value) : "0x",
      gas ? toHex(gas) : "0x",
      isSystemTx ? "0x1" : "0x",
      data ?? "0x"
    ];
    return concatHex([
      "0x7e",
      toRlp(serializedTransaction)
    ]);
  }
  function isDeposit(transaction) {
    if (transaction.type === "deposit")
      return true;
    if (typeof transaction.sourceHash !== "undefined")
      return true;
    return false;
  }
  function assertTransactionDeposit(transaction) {
    const { from, to } = transaction;
    if (from && !isAddress(from))
      throw new InvalidAddressError({ address: from });
    if (to && !isAddress(to))
      throw new InvalidAddressError({ address: to });
  }

  // node_modules/viem/_esm/op-stack/chainConfig.js
  var chainConfig = {
    contracts,
    formatters,
    serializers
  };

  // node_modules/viem/_esm/chains/definitions/baseSepolia.js
  var sourceId = 11155111;
  var baseSepolia = /* @__PURE__ */ defineChain({
    ...chainConfig,
    id: 84532,
    network: "base-sepolia",
    name: "Base Sepolia",
    nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: {
      default: {
        http: ["https://sepolia.base.org"]
      }
    },
    blockExplorers: {
      default: {
        name: "Basescan",
        url: "https://sepolia.basescan.org",
        apiUrl: "https://api-sepolia.basescan.org/api"
      }
    },
    contracts: {
      ...chainConfig.contracts,
      disputeGameFactory: {
        [sourceId]: {
          address: "0xd6E6dBf4F7EA0ac412fD8b65ED297e64BB7a06E1"
        }
      },
      l2OutputOracle: {
        [sourceId]: {
          address: "0x84457ca9D0163FbC4bbfe4Dfbb20ba46e48DF254"
        }
      },
      portal: {
        [sourceId]: {
          address: "0x49f53e41452c74589e85ca1677426ba426459e85",
          blockCreated: 4446677
        }
      },
      l1StandardBridge: {
        [sourceId]: {
          address: "0xfd0Bf71F60660E2f608ed56e1659C450eB113120",
          blockCreated: 4446677
        }
      },
      multicall3: {
        address: "0xca11bde05977b3631167028862be2a173976ca11",
        blockCreated: 1059647
      }
    },
    testnet: true,
    sourceId
  });

  // node_modules/superjson/dist/double-indexed-kv.js
  var DoubleIndexedKV = class {
    constructor() {
      this.keyToValue = /* @__PURE__ */ new Map();
      this.valueToKey = /* @__PURE__ */ new Map();
    }
    set(key, value) {
      this.keyToValue.set(key, value);
      this.valueToKey.set(value, key);
    }
    getByKey(key) {
      return this.keyToValue.get(key);
    }
    getByValue(value) {
      return this.valueToKey.get(value);
    }
    clear() {
      this.keyToValue.clear();
      this.valueToKey.clear();
    }
  };

  // node_modules/superjson/dist/registry.js
  var Registry = class {
    constructor(generateIdentifier) {
      this.generateIdentifier = generateIdentifier;
      this.kv = new DoubleIndexedKV();
    }
    register(value, identifier) {
      if (this.kv.getByValue(value)) {
        return;
      }
      if (!identifier) {
        identifier = this.generateIdentifier(value);
      }
      this.kv.set(identifier, value);
    }
    clear() {
      this.kv.clear();
    }
    getIdentifier(value) {
      return this.kv.getByValue(value);
    }
    getValue(identifier) {
      return this.kv.getByKey(identifier);
    }
  };

  // node_modules/superjson/dist/class-registry.js
  var ClassRegistry = class extends Registry {
    constructor() {
      super((c) => c.name);
      this.classToAllowedProps = /* @__PURE__ */ new Map();
    }
    register(value, options) {
      if (typeof options === "object") {
        if (options.allowProps) {
          this.classToAllowedProps.set(value, options.allowProps);
        }
        super.register(value, options.identifier);
      } else {
        super.register(value, options);
      }
    }
    getAllowedProps(value) {
      return this.classToAllowedProps.get(value);
    }
  };

  // node_modules/superjson/dist/util.js
  function valuesOfObj(record) {
    if ("values" in Object) {
      return Object.values(record);
    }
    const values = [];
    for (const key in record) {
      if (record.hasOwnProperty(key)) {
        values.push(record[key]);
      }
    }
    return values;
  }
  function find(record, predicate) {
    const values = valuesOfObj(record);
    if ("find" in values) {
      return values.find(predicate);
    }
    const valuesNotNever = values;
    for (let i = 0; i < valuesNotNever.length; i++) {
      const value = valuesNotNever[i];
      if (predicate(value)) {
        return value;
      }
    }
    return void 0;
  }
  function forEach(record, run) {
    Object.entries(record).forEach(([key, value]) => run(value, key));
  }
  function includes(arr, value) {
    return arr.indexOf(value) !== -1;
  }
  function findArr(record, predicate) {
    for (let i = 0; i < record.length; i++) {
      const value = record[i];
      if (predicate(value)) {
        return value;
      }
    }
    return void 0;
  }

  // node_modules/superjson/dist/custom-transformer-registry.js
  var CustomTransformerRegistry = class {
    constructor() {
      this.transfomers = {};
    }
    register(transformer) {
      this.transfomers[transformer.name] = transformer;
    }
    findApplicable(v) {
      return find(this.transfomers, (transformer) => transformer.isApplicable(v));
    }
    findByName(name) {
      return this.transfomers[name];
    }
  };

  // node_modules/superjson/dist/is.js
  var getType = (payload) => Object.prototype.toString.call(payload).slice(8, -1);
  var isUndefined = (payload) => typeof payload === "undefined";
  var isNull = (payload) => payload === null;
  var isPlainObject = (payload) => {
    if (typeof payload !== "object" || payload === null)
      return false;
    if (payload === Object.prototype)
      return false;
    if (Object.getPrototypeOf(payload) === null)
      return true;
    return Object.getPrototypeOf(payload) === Object.prototype;
  };
  var isEmptyObject = (payload) => isPlainObject(payload) && Object.keys(payload).length === 0;
  var isArray = (payload) => Array.isArray(payload);
  var isString = (payload) => typeof payload === "string";
  var isNumber = (payload) => typeof payload === "number" && !isNaN(payload);
  var isBoolean = (payload) => typeof payload === "boolean";
  var isRegExp = (payload) => payload instanceof RegExp;
  var isMap = (payload) => payload instanceof Map;
  var isSet = (payload) => payload instanceof Set;
  var isSymbol = (payload) => getType(payload) === "Symbol";
  var isDate = (payload) => payload instanceof Date && !isNaN(payload.valueOf());
  var isError = (payload) => payload instanceof Error;
  var isNaNValue = (payload) => typeof payload === "number" && isNaN(payload);
  var isPrimitive = (payload) => isBoolean(payload) || isNull(payload) || isUndefined(payload) || isNumber(payload) || isString(payload) || isSymbol(payload);
  var isBigint = (payload) => typeof payload === "bigint";
  var isInfinite = (payload) => payload === Infinity || payload === -Infinity;
  var isTypedArray = (payload) => ArrayBuffer.isView(payload) && !(payload instanceof DataView);
  var isURL = (payload) => payload instanceof URL;

  // node_modules/superjson/dist/pathstringifier.js
  var escapeKey = (key) => key.replace(/\./g, "\\.");
  var stringifyPath = (path) => path.map(String).map(escapeKey).join(".");
  var parsePath = (string) => {
    const result = [];
    let segment = "";
    for (let i = 0; i < string.length; i++) {
      let char = string.charAt(i);
      const isEscapedDot = char === "\\" && string.charAt(i + 1) === ".";
      if (isEscapedDot) {
        segment += ".";
        i++;
        continue;
      }
      const isEndOfSegment = char === ".";
      if (isEndOfSegment) {
        result.push(segment);
        segment = "";
        continue;
      }
      segment += char;
    }
    const lastSegment = segment;
    result.push(lastSegment);
    return result;
  };

  // node_modules/superjson/dist/transformer.js
  function simpleTransformation(isApplicable, annotation, transform, untransform) {
    return {
      isApplicable,
      annotation,
      transform,
      untransform
    };
  }
  var simpleRules = [
    simpleTransformation(isUndefined, "undefined", () => null, () => void 0),
    simpleTransformation(isBigint, "bigint", (v) => v.toString(), (v) => {
      if (typeof BigInt !== "undefined") {
        return BigInt(v);
      }
      console.error("Please add a BigInt polyfill.");
      return v;
    }),
    simpleTransformation(isDate, "Date", (v) => v.toISOString(), (v) => new Date(v)),
    simpleTransformation(isError, "Error", (v, superJson) => {
      const baseError = {
        name: v.name,
        message: v.message
      };
      superJson.allowedErrorProps.forEach((prop) => {
        baseError[prop] = v[prop];
      });
      return baseError;
    }, (v, superJson) => {
      const e = new Error(v.message);
      e.name = v.name;
      e.stack = v.stack;
      superJson.allowedErrorProps.forEach((prop) => {
        e[prop] = v[prop];
      });
      return e;
    }),
    simpleTransformation(isRegExp, "regexp", (v) => "" + v, (regex) => {
      const body = regex.slice(1, regex.lastIndexOf("/"));
      const flags = regex.slice(regex.lastIndexOf("/") + 1);
      return new RegExp(body, flags);
    }),
    simpleTransformation(
      isSet,
      "set",
      // (sets only exist in es6+)
      // eslint-disable-next-line es5/no-es6-methods
      (v) => [...v.values()],
      (v) => new Set(v)
    ),
    simpleTransformation(isMap, "map", (v) => [...v.entries()], (v) => new Map(v)),
    simpleTransformation((v) => isNaNValue(v) || isInfinite(v), "number", (v) => {
      if (isNaNValue(v)) {
        return "NaN";
      }
      if (v > 0) {
        return "Infinity";
      } else {
        return "-Infinity";
      }
    }, Number),
    simpleTransformation((v) => v === 0 && 1 / v === -Infinity, "number", () => {
      return "-0";
    }, Number),
    simpleTransformation(isURL, "URL", (v) => v.toString(), (v) => new URL(v))
  ];
  function compositeTransformation(isApplicable, annotation, transform, untransform) {
    return {
      isApplicable,
      annotation,
      transform,
      untransform
    };
  }
  var symbolRule = compositeTransformation((s, superJson) => {
    if (isSymbol(s)) {
      const isRegistered = !!superJson.symbolRegistry.getIdentifier(s);
      return isRegistered;
    }
    return false;
  }, (s, superJson) => {
    const identifier = superJson.symbolRegistry.getIdentifier(s);
    return ["symbol", identifier];
  }, (v) => v.description, (_, a, superJson) => {
    const value = superJson.symbolRegistry.getValue(a[1]);
    if (!value) {
      throw new Error("Trying to deserialize unknown symbol");
    }
    return value;
  });
  var constructorToName = [
    Int8Array,
    Uint8Array,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
    Uint8ClampedArray
  ].reduce((obj, ctor) => {
    obj[ctor.name] = ctor;
    return obj;
  }, {});
  var typedArrayRule = compositeTransformation(isTypedArray, (v) => ["typed-array", v.constructor.name], (v) => [...v], (v, a) => {
    const ctor = constructorToName[a[1]];
    if (!ctor) {
      throw new Error("Trying to deserialize unknown typed array");
    }
    return new ctor(v);
  });
  function isInstanceOfRegisteredClass(potentialClass, superJson) {
    if (potentialClass?.constructor) {
      const isRegistered = !!superJson.classRegistry.getIdentifier(potentialClass.constructor);
      return isRegistered;
    }
    return false;
  }
  var classRule = compositeTransformation(isInstanceOfRegisteredClass, (clazz, superJson) => {
    const identifier = superJson.classRegistry.getIdentifier(clazz.constructor);
    return ["class", identifier];
  }, (clazz, superJson) => {
    const allowedProps = superJson.classRegistry.getAllowedProps(clazz.constructor);
    if (!allowedProps) {
      return { ...clazz };
    }
    const result = {};
    allowedProps.forEach((prop) => {
      result[prop] = clazz[prop];
    });
    return result;
  }, (v, a, superJson) => {
    const clazz = superJson.classRegistry.getValue(a[1]);
    if (!clazz) {
      throw new Error("Trying to deserialize unknown class - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564");
    }
    return Object.assign(Object.create(clazz.prototype), v);
  });
  var customRule = compositeTransformation((value, superJson) => {
    return !!superJson.customTransformerRegistry.findApplicable(value);
  }, (value, superJson) => {
    const transformer = superJson.customTransformerRegistry.findApplicable(value);
    return ["custom", transformer.name];
  }, (value, superJson) => {
    const transformer = superJson.customTransformerRegistry.findApplicable(value);
    return transformer.serialize(value);
  }, (v, a, superJson) => {
    const transformer = superJson.customTransformerRegistry.findByName(a[1]);
    if (!transformer) {
      throw new Error("Trying to deserialize unknown custom value");
    }
    return transformer.deserialize(v);
  });
  var compositeRules = [classRule, symbolRule, customRule, typedArrayRule];
  var transformValue = (value, superJson) => {
    const applicableCompositeRule = findArr(compositeRules, (rule) => rule.isApplicable(value, superJson));
    if (applicableCompositeRule) {
      return {
        value: applicableCompositeRule.transform(value, superJson),
        type: applicableCompositeRule.annotation(value, superJson)
      };
    }
    const applicableSimpleRule = findArr(simpleRules, (rule) => rule.isApplicable(value, superJson));
    if (applicableSimpleRule) {
      return {
        value: applicableSimpleRule.transform(value, superJson),
        type: applicableSimpleRule.annotation
      };
    }
    return void 0;
  };
  var simpleRulesByAnnotation = {};
  simpleRules.forEach((rule) => {
    simpleRulesByAnnotation[rule.annotation] = rule;
  });
  var untransformValue = (json, type, superJson) => {
    if (isArray(type)) {
      switch (type[0]) {
        case "symbol":
          return symbolRule.untransform(json, type, superJson);
        case "class":
          return classRule.untransform(json, type, superJson);
        case "custom":
          return customRule.untransform(json, type, superJson);
        case "typed-array":
          return typedArrayRule.untransform(json, type, superJson);
        default:
          throw new Error("Unknown transformation: " + type);
      }
    } else {
      const transformation = simpleRulesByAnnotation[type];
      if (!transformation) {
        throw new Error("Unknown transformation: " + type);
      }
      return transformation.untransform(json, superJson);
    }
  };

  // node_modules/superjson/dist/accessDeep.js
  var getNthKey = (value, n) => {
    const keys = value.keys();
    while (n > 0) {
      keys.next();
      n--;
    }
    return keys.next().value;
  };
  function validatePath(path) {
    if (includes(path, "__proto__")) {
      throw new Error("__proto__ is not allowed as a property");
    }
    if (includes(path, "prototype")) {
      throw new Error("prototype is not allowed as a property");
    }
    if (includes(path, "constructor")) {
      throw new Error("constructor is not allowed as a property");
    }
  }
  var getDeep = (object, path) => {
    validatePath(path);
    for (let i = 0; i < path.length; i++) {
      const key = path[i];
      if (isSet(object)) {
        object = getNthKey(object, +key);
      } else if (isMap(object)) {
        const row = +key;
        const type = +path[++i] === 0 ? "key" : "value";
        const keyOfRow = getNthKey(object, row);
        switch (type) {
          case "key":
            object = keyOfRow;
            break;
          case "value":
            object = object.get(keyOfRow);
            break;
        }
      } else {
        object = object[key];
      }
    }
    return object;
  };
  var setDeep = (object, path, mapper) => {
    validatePath(path);
    if (path.length === 0) {
      return mapper(object);
    }
    let parent = object;
    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i];
      if (isArray(parent)) {
        const index2 = +key;
        parent = parent[index2];
      } else if (isPlainObject(parent)) {
        parent = parent[key];
      } else if (isSet(parent)) {
        const row = +key;
        parent = getNthKey(parent, row);
      } else if (isMap(parent)) {
        const isEnd = i === path.length - 2;
        if (isEnd) {
          break;
        }
        const row = +key;
        const type = +path[++i] === 0 ? "key" : "value";
        const keyOfRow = getNthKey(parent, row);
        switch (type) {
          case "key":
            parent = keyOfRow;
            break;
          case "value":
            parent = parent.get(keyOfRow);
            break;
        }
      }
    }
    const lastKey = path[path.length - 1];
    if (isArray(parent)) {
      parent[+lastKey] = mapper(parent[+lastKey]);
    } else if (isPlainObject(parent)) {
      parent[lastKey] = mapper(parent[lastKey]);
    }
    if (isSet(parent)) {
      const oldValue = getNthKey(parent, +lastKey);
      const newValue = mapper(oldValue);
      if (oldValue !== newValue) {
        parent.delete(oldValue);
        parent.add(newValue);
      }
    }
    if (isMap(parent)) {
      const row = +path[path.length - 2];
      const keyToRow = getNthKey(parent, row);
      const type = +lastKey === 0 ? "key" : "value";
      switch (type) {
        case "key": {
          const newKey = mapper(keyToRow);
          parent.set(newKey, parent.get(keyToRow));
          if (newKey !== keyToRow) {
            parent.delete(keyToRow);
          }
          break;
        }
        case "value": {
          parent.set(keyToRow, mapper(parent.get(keyToRow)));
          break;
        }
      }
    }
    return object;
  };

  // node_modules/superjson/dist/plainer.js
  function traverse(tree, walker2, origin = []) {
    if (!tree) {
      return;
    }
    if (!isArray(tree)) {
      forEach(tree, (subtree, key) => traverse(subtree, walker2, [...origin, ...parsePath(key)]));
      return;
    }
    const [nodeValue, children] = tree;
    if (children) {
      forEach(children, (child, key) => {
        traverse(child, walker2, [...origin, ...parsePath(key)]);
      });
    }
    walker2(nodeValue, origin);
  }
  function applyValueAnnotations(plain, annotations, superJson) {
    traverse(annotations, (type, path) => {
      plain = setDeep(plain, path, (v) => untransformValue(v, type, superJson));
    });
    return plain;
  }
  function applyReferentialEqualityAnnotations(plain, annotations) {
    function apply(identicalPaths, path) {
      const object = getDeep(plain, parsePath(path));
      identicalPaths.map(parsePath).forEach((identicalObjectPath) => {
        plain = setDeep(plain, identicalObjectPath, () => object);
      });
    }
    if (isArray(annotations)) {
      const [root, other] = annotations;
      root.forEach((identicalPath) => {
        plain = setDeep(plain, parsePath(identicalPath), () => plain);
      });
      if (other) {
        forEach(other, apply);
      }
    } else {
      forEach(annotations, apply);
    }
    return plain;
  }
  var isDeep = (object, superJson) => isPlainObject(object) || isArray(object) || isMap(object) || isSet(object) || isInstanceOfRegisteredClass(object, superJson);
  function addIdentity(object, path, identities) {
    const existingSet = identities.get(object);
    if (existingSet) {
      existingSet.push(path);
    } else {
      identities.set(object, [path]);
    }
  }
  function generateReferentialEqualityAnnotations(identitites, dedupe) {
    const result = {};
    let rootEqualityPaths = void 0;
    identitites.forEach((paths) => {
      if (paths.length <= 1) {
        return;
      }
      if (!dedupe) {
        paths = paths.map((path) => path.map(String)).sort((a, b) => a.length - b.length);
      }
      const [representativePath, ...identicalPaths] = paths;
      if (representativePath.length === 0) {
        rootEqualityPaths = identicalPaths.map(stringifyPath);
      } else {
        result[stringifyPath(representativePath)] = identicalPaths.map(stringifyPath);
      }
    });
    if (rootEqualityPaths) {
      if (isEmptyObject(result)) {
        return [rootEqualityPaths];
      } else {
        return [rootEqualityPaths, result];
      }
    } else {
      return isEmptyObject(result) ? void 0 : result;
    }
  }
  var walker = (object, identities, superJson, dedupe, path = [], objectsInThisPath = [], seenObjects = /* @__PURE__ */ new Map()) => {
    const primitive = isPrimitive(object);
    if (!primitive) {
      addIdentity(object, path, identities);
      const seen = seenObjects.get(object);
      if (seen) {
        return dedupe ? {
          transformedValue: null
        } : seen;
      }
    }
    if (!isDeep(object, superJson)) {
      const transformed2 = transformValue(object, superJson);
      const result2 = transformed2 ? {
        transformedValue: transformed2.value,
        annotations: [transformed2.type]
      } : {
        transformedValue: object
      };
      if (!primitive) {
        seenObjects.set(object, result2);
      }
      return result2;
    }
    if (includes(objectsInThisPath, object)) {
      return {
        transformedValue: null
      };
    }
    const transformationResult = transformValue(object, superJson);
    const transformed = transformationResult?.value ?? object;
    const transformedValue = isArray(transformed) ? [] : {};
    const innerAnnotations = {};
    forEach(transformed, (value, index2) => {
      if (index2 === "__proto__" || index2 === "constructor" || index2 === "prototype") {
        throw new Error(`Detected property ${index2}. This is a prototype pollution risk, please remove it from your object.`);
      }
      const recursiveResult = walker(value, identities, superJson, dedupe, [...path, index2], [...objectsInThisPath, object], seenObjects);
      transformedValue[index2] = recursiveResult.transformedValue;
      if (isArray(recursiveResult.annotations)) {
        innerAnnotations[index2] = recursiveResult.annotations;
      } else if (isPlainObject(recursiveResult.annotations)) {
        forEach(recursiveResult.annotations, (tree, key) => {
          innerAnnotations[escapeKey(index2) + "." + key] = tree;
        });
      }
    });
    const result = isEmptyObject(innerAnnotations) ? {
      transformedValue,
      annotations: !!transformationResult ? [transformationResult.type] : void 0
    } : {
      transformedValue,
      annotations: !!transformationResult ? [transformationResult.type, innerAnnotations] : innerAnnotations
    };
    if (!primitive) {
      seenObjects.set(object, result);
    }
    return result;
  };

  // node_modules/is-what/dist/index.js
  function getType2(payload) {
    return Object.prototype.toString.call(payload).slice(8, -1);
  }
  function isArray2(payload) {
    return getType2(payload) === "Array";
  }
  function isPlainObject2(payload) {
    if (getType2(payload) !== "Object")
      return false;
    const prototype = Object.getPrototypeOf(payload);
    return !!prototype && prototype.constructor === Object && prototype === Object.prototype;
  }
  function isNull2(payload) {
    return getType2(payload) === "Null";
  }
  function isOneOf(a, b, c, d, e) {
    return (value) => a(value) || b(value) || !!c && c(value) || !!d && d(value) || !!e && e(value);
  }
  function isUndefined2(payload) {
    return getType2(payload) === "Undefined";
  }
  var isNullOrUndefined = isOneOf(isNull2, isUndefined2);

  // node_modules/copy-anything/dist/index.js
  function assignProp(carry, key, newVal, originalObject, includeNonenumerable) {
    const propType = {}.propertyIsEnumerable.call(originalObject, key) ? "enumerable" : "nonenumerable";
    if (propType === "enumerable")
      carry[key] = newVal;
    if (includeNonenumerable && propType === "nonenumerable") {
      Object.defineProperty(carry, key, {
        value: newVal,
        enumerable: false,
        writable: true,
        configurable: true
      });
    }
  }
  function copy(target, options = {}) {
    if (isArray2(target)) {
      return target.map((item) => copy(item, options));
    }
    if (!isPlainObject2(target)) {
      return target;
    }
    const props = Object.getOwnPropertyNames(target);
    const symbols = Object.getOwnPropertySymbols(target);
    return [...props, ...symbols].reduce((carry, key) => {
      if (isArray2(options.props) && !options.props.includes(key)) {
        return carry;
      }
      const val = target[key];
      const newVal = copy(val, options);
      assignProp(carry, key, newVal, target, options.nonenumerable);
      return carry;
    }, {});
  }

  // node_modules/superjson/dist/index.js
  var SuperJSON = class {
    /**
     * @param dedupeReferentialEqualities  If true, SuperJSON will make sure only one instance of referentially equal objects are serialized and the rest are replaced with `null`.
     */
    constructor({ dedupe = false } = {}) {
      this.classRegistry = new ClassRegistry();
      this.symbolRegistry = new Registry((s) => s.description ?? "");
      this.customTransformerRegistry = new CustomTransformerRegistry();
      this.allowedErrorProps = [];
      this.dedupe = dedupe;
    }
    serialize(object) {
      const identities = /* @__PURE__ */ new Map();
      const output2 = walker(object, identities, this, this.dedupe);
      const res = {
        json: output2.transformedValue
      };
      if (output2.annotations) {
        res.meta = {
          ...res.meta,
          values: output2.annotations
        };
      }
      const equalityAnnotations = generateReferentialEqualityAnnotations(identities, this.dedupe);
      if (equalityAnnotations) {
        res.meta = {
          ...res.meta,
          referentialEqualities: equalityAnnotations
        };
      }
      return res;
    }
    deserialize(payload) {
      const { json, meta } = payload;
      let result = copy(json);
      if (meta?.values) {
        result = applyValueAnnotations(result, meta.values, this);
      }
      if (meta?.referentialEqualities) {
        result = applyReferentialEqualityAnnotations(result, meta.referentialEqualities);
      }
      return result;
    }
    stringify(object) {
      return JSON.stringify(this.serialize(object));
    }
    parse(string) {
      return this.deserialize(JSON.parse(string));
    }
    registerClass(v, options) {
      this.classRegistry.register(v, options);
    }
    registerSymbol(v, identifier) {
      this.symbolRegistry.register(v, identifier);
    }
    registerCustom(transformer, name) {
      this.customTransformerRegistry.register({
        name,
        ...transformer
      });
    }
    allowErrorProps(...props) {
      this.allowedErrorProps.push(...props);
    }
  };
  SuperJSON.defaultInstance = new SuperJSON();
  SuperJSON.serialize = SuperJSON.defaultInstance.serialize.bind(SuperJSON.defaultInstance);
  SuperJSON.deserialize = SuperJSON.defaultInstance.deserialize.bind(SuperJSON.defaultInstance);
  SuperJSON.stringify = SuperJSON.defaultInstance.stringify.bind(SuperJSON.defaultInstance);
  SuperJSON.parse = SuperJSON.defaultInstance.parse.bind(SuperJSON.defaultInstance);
  SuperJSON.registerClass = SuperJSON.defaultInstance.registerClass.bind(SuperJSON.defaultInstance);
  SuperJSON.registerSymbol = SuperJSON.defaultInstance.registerSymbol.bind(SuperJSON.defaultInstance);
  SuperJSON.registerCustom = SuperJSON.defaultInstance.registerCustom.bind(SuperJSON.defaultInstance);
  SuperJSON.allowErrorProps = SuperJSON.defaultInstance.allowErrorProps.bind(SuperJSON.defaultInstance);
  var serialize = SuperJSON.serialize;
  var deserialize = SuperJSON.deserialize;
  var stringify2 = SuperJSON.stringify;
  var parse = SuperJSON.parse;
  var registerClass = SuperJSON.registerClass;
  var registerCustom = SuperJSON.registerCustom;
  var registerSymbol = SuperJSON.registerSymbol;
  var allowErrorProps = SuperJSON.allowErrorProps;

  // src/index.ts
  var app = new Hono2();
  var publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http()
  });
  var walletClient = createWalletClient({
    chain: baseSepolia,
    transport: http()
  });
  function getECDSAAccount(salt) {
    const derivedKey = Wapo.deriveSecret(salt);
    const keccakPrivateKey = keccak256(derivedKey);
    return privateKeyToAccount(keccakPrivateKey);
  }
  async function signData(account, data) {
    let result = {
      derivedPublicKey: account.address,
      data,
      signature: ""
    };
    const publicKey = account.address;
    console.log(`Signing data [${data}] with Account [${publicKey}]`);
    const signature = await account.signMessage({
      message: data
    });
    console.log(`Signature: ${signature}`);
    result.signature = signature;
    return result;
  }
  async function verifyData(account, data, signature) {
    let result = {
      derivedPublicKey: account.address,
      data,
      signature,
      valid: false
    };
    const publicKey = account.address;
    console.log("Verifying Signature with PublicKey ", publicKey);
    const valid = await verifyMessage({
      address: publicKey,
      message: data,
      signature
    });
    console.log("Is signature valid? ", valid);
    result.valid = valid;
    return result;
  }
  async function sendTransaction2(account, to, gweiAmount) {
    let result = {
      derivedPublicKey: account.address,
      to,
      gweiAmount,
      hash: "",
      receipt: {}
    };
    console.log(`Sending Transaction with Account ${account.address} to ${to} for ${gweiAmount} gwei`);
    const hash3 = await walletClient.sendTransaction({
      account,
      to,
      value: parseGwei(`${gweiAmount}`)
    });
    console.log(`Transaction Hash: ${hash3}`);
    const receipt = await publicClient.waitForTransactionReceipt({ hash: hash3 });
    console.log(`Transaction Status: ${receipt.status}`);
    result.hash = hash3;
    result.receipt = receipt;
    return result;
  }
  app.get("/", async (c) => {
    let vault = {};
    let queries = c.req.queries() || {};
    let result = {};
    try {
      vault = JSON.parse(process.env.secret || "");
    } catch (e) {
      console.error(e);
      return c.json({ error: "Failed to parse secrets" });
    }
    const secretSalt = vault.secretSalt ? vault.secretSalt : "SALTY_BAE";
    const getType3 = queries.type ? queries.type[0] : "";
    const account = getECDSAAccount(secretSalt);
    const data = queries.data ? queries.data[0] : "";
    console.log(`Type: ${getType3}, Data: ${data}`);
    try {
      if (getType3 == "sendTx") {
        result = queries.to && queries.gweiAmount ? await sendTransaction2(account, queries.to[0], queries.gweiAmount[0]) : { message: "Missing query [to] or [gweiAmount] in URL" };
      } else if (getType3 == "sign") {
        result = data ? await signData(account, data) : { message: "Missing query [data] in URL" };
      } else if (getType3 == "verify") {
        if (data && queries.signature) {
          result = await verifyData(account, data, queries.signature[0]);
        } else {
          result = { message: "Missing query [data] or [signature] in URL" };
        }
      } else {
        result = { derivedPublicKey: account.address };
      }
    } catch (error) {
      console.error("Error:", error);
      result = { message: error };
    }
    const { json, meta } = SuperJSON.serialize(result);
    return c.json(json);
  });
  app.post("/", async (c) => {
    const data = await c.req.json();
    console.log("user payload in JSON:", data);
    return c.json(data);
  });
  var src_default = (0, import_guest.handle)(app);
  return __toCommonJS(src_exports);
})();
/*! Bundled license information:

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/modular.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/curve.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/weierstrass.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/_shortw_utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/secp256k1.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
module.exports = module.exports?.default;
//# sourceMappingURL=index.js.map