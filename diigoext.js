var diigoApiUri = "https://secure.diigo.com/api/v2";
var key = "cabf58a5f4eaf351";
var userData = {};

var merge_links, merge_link_msg;
    //document.getElementById('diigoExt_merge_links');

chrome.storage.local.get({
    username: '',
    password: ''
}, function(items) { // After loading settings
    userData = items;

    var el = DOMBuilder.elements;

    // Store default elements
    merge_links = el.A({'id': 'diigoExt_merge_links', click: startMergeLinks}, 'Remove/Merge Duplicate Links');
    merge_link_msg = el.SPAN({'id': 'diigoExt_merge_link_msg', 'class': 'toolRecommonded hidden'}, 'message');

    // Add UI
    var diigoExtElements = el.DIV({'class': 'toolSection diigoext'}, [
        el.H2('Diigo Ext'),
        el.DIV([
            el.UL([
                el.LI([
                    el.SPAN({'class': 'toolName'}, [ merge_links ]),
                    ' Remove duplicate links and merge tags.',
                    merge_link_msg
                ])
            ])
        ])
    ]);

    var main = document.getElementById('mainInner');
    main.insertBefore(diigoExtElements, main.firstChild);
});

function getAllBookmarks(startArray, startLink, callbackSuccess, callbackError) {
    getBookmarks('count=100&filter=all&sort=0&start=' + startLink, function (bookmarks) {
        if (bookmarks.length > 0) {
            startLink += 100;
            startArray = startArray.concat(bookmarks);
            merge_link_msg.innerText = startArray.length + " bookmarks loaded ..."
            getAllBookmarks(startArray, startLink, callbackSuccess, callbackError);
        } else {
            callbackSuccess(startArray);
        }
    }, function (err) {
        callbackError(err);
    });
}
var startMergeLinks = function() {
    // Update same feedback
    merge_links.classList.add('disabled');
    merge_link_msg.classList.remove('hidden');
    merge_link_msg.innerText = "Get links ..."

    getAllBookmarks([], 0, mergeLinks, function(err) {
        merge_links.classList.remove('disabled');
        merge_link_msg.innerText = "Erro ocorred!";
    });
};

var mergeLinks = function(bookmarks) {
    merge_link_msg.innerText = "Merge links..."


    console.log(bookmarks.length);
    //merge_links.classList.remove('disabled');
    //merge_link_msg.classList.add('hidden');
};

var getBookmarks = function (filter, callbackSuccess, callbackError) {
    var xhr = new XMLHttpRequest();
    if (filter) {
        filter = '&' + filter;
    }

    xhr.open("GET", diigoApiUri + "/bookmarks?key=" + key + "&user=" + userData.username + filter, true);
    xhr.setRequestHeader('Authorization', "Basic " + btoa(userData.username + ':' + userData.password));
    xhr.onreadystatechange = function () {
        if (xhr.readyState != this.DONE) {
            return;
        }

        if (xhr.status == 200) {
            callbackSuccess(JSON.parse(xhr.responseText));
        } else {
            callbackError(xhr.readyState);
        }
    };
    xhr.send();
};