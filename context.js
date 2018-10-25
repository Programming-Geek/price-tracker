//Storage debugger
//TODO: Remove this
chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (key in changes) {
        var storageChange = changes[key];
        console.log('Storage key "%s" in namespace "%s" changed. ' +
            'Old value was "%s", new value is "%s".',
            key,
            namespace,
            storageChange.oldValue,
            storageChange.newValue);
    }
});

function fillTimeSheet(info, tab) {
    chrome.tabs.query({active: true}, function (tabs) {
        var tab = tabs[0];
        if (!isTimeSheetUrl(tab.url)) {
            chrome.tabs.create({
                url: "https://pse.na32.visual.force.com/apex/PSATimecardEntry",
            });
            return;
        }
    });
}
function isTimeSheetUrl(url) {
    return url.indexOf("https://pse.na32.visual.force.com/apex/PSATimecardEntry") >= 0
}
chrome.contextMenus.create({
    title: "Fill Time Sheet!",
    contexts: ["page"],
    onclick: fillTimeSheet,
});

chrome.notifications.onButtonClicked.addListener(function () {
    //alert(JSON.stringify(arguments));
    if (arguments[0] == "missing") {
        chrome.tabs.create({
            url: "https://pse.na32.visual.force.com/apex/PSATimecardEntry",
        });
    } else {
        chrome.tabs.create({'url': 'chrome-extension://' + chrome.runtime.id + '/app/index.html#/today'});
    }
});

// Check installation
chrome.runtime.onInstalled.addListener(function (details) {
    chrome.tabs.create({'url': 'chrome-extension://' + chrome.runtime.id + '/app/index.html'});
});
