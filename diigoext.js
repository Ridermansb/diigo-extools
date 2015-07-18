var diigoApiUri = "https://secure.diigo.com/api/v2";
var key = "cabf58a5f4eaf351";
var userData = {};

var getBookmarks = function(filter, callbackSuccess, callbackError){
  var xhr = new XMLHttpRequest();
  if (filter) {
    filter = '&' + filter;
  }
  xhr.open("GET", diigoApiUri + "/bookmarks?key=" + key + "&user=" + userData.username + filter, true);
  xhr.setRequestHeader('Authorization', "Basic " + btoa(userData.username + ':' + userData.password));
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var resp = JSON.parse(xhr.responseText);
      callbackSuccess(resp);
    } else {
      callbackError(xhr.status);
    }
  };
  xhr.send();
};

var startMergeLinks = function() {

  chrome.storage.local.get({
    username: '',
    password: ''
  }, function(items) {
    userData = items;

    // Access api
    getBookmarks('count=10&filter=all', function(response) {
      console.log(response);
    }, function(errStatus) {
      console.log(errStatus);
    });

    // merge links
    // Givin same feedback


  });
};



var el = DOMBuilder.elements;
var diigoExtElements = el.DIV({'class': 'toolSection diigoext'}, [
  el.H2('Diigo Ext'),
  el.DIV([
    el.UL([
      el.LI([
        el.SPAN({'class': 'toolName'}, [
          el.A({ click: startMergeLinks }, 'Remove/Merge Duplicate Links')
        ]),
        ' Remove duplicate links and merge tags'
      ])
    ])
  ])
]);

var main = document.getElementById('mainInner');
main.insertBefore(diigoExtElements, main.firstChild);
