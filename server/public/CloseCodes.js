"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseCodes = void 0;
/**
 * @file ZilaWS
 * @module ZilaWs
 * @license
 * MIT License
 * Copyright (c) 2023 ZilaWS
 */
var CloseCodes;
(function (CloseCodes) {
    CloseCodes[CloseCodes["NORMAL"] = 1000] = "NORMAL";
    CloseCodes[CloseCodes["INTERNAL_SERVER_ERROR"] = 1011] = "INTERNAL_SERVER_ERROR";
    CloseCodes[CloseCodes["SERVER_RESTART"] = 1012] = "SERVER_RESTART";
    CloseCodes[CloseCodes["TRY_AGAIN_LATER"] = 1013] = "TRY_AGAIN_LATER";
    CloseCodes[CloseCodes["TLS_FAIL"] = 1015] = "TLS_FAIL";
    CloseCodes[CloseCodes["KICKED"] = 4001] = "KICKED";
    CloseCodes[CloseCodes["BANNED"] = 4002] = "BANNED";
    CloseCodes[CloseCodes["BAD_MESSAGE"] = 4003] = "BAD_MESSAGE";
})(CloseCodes || (exports.CloseCodes = CloseCodes = {}));
