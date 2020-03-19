// var nodobjc = require("nodobjc");
// nodobjc.framework("AppKit");
// var pool = nodobjc.NSAutoreleasePool("alloc")("init");

const objc = require('objc');
objc.import('AppKit');

const {NSPasteboard} = objc;

const pasteboard = NSPasteboard.generalPasteboard();

// pasteboard.declareTypes_owner_([NSPasteboardTypeString], null);

// pasteboard.setString_forType_("44 > 45", NSPasteboardTypeString);

////

function getClipboardCount() {
	return pasteboard.changeCount();
}
var intervalTime = 0;
module.exports = {
	watcher: function(callback) {
		var count;
		intervalTime = setInterval(function() {
			var curCount = getClipboardCount();
			count || (count = curCount), count !== curCount && (count = curCount, callback())
		}, 250)
	},
	unwatcher: function() {
		clearInterval(intervalTime);
	}
}
