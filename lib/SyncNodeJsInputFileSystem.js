/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var fs = require("graceful-fs");

function SyncNodeJsInputFileSystem() {}
module.exports = SyncNodeJsInputFileSystem;

SyncNodeJsInputFileSystem.prototype.isSync = function() {
	return true;
};

function asAsync(fn, context) {
	return function() {
		var args = Array.prototype.slice.call(arguments);
		var callback = args.pop();
		try {
			callback(null, fn.apply(context, args));
		} catch(e) {
			callback(e);
		}
	};
}

SyncNodeJsInputFileSystem.prototype.stat = asAsync(fs.statSync, fs);
SyncNodeJsInputFileSystem.prototype.readdir = asAsync(fs.readdirSync, fs);
SyncNodeJsInputFileSystem.prototype.readFile = asAsync(fs.readFileSync, fs);