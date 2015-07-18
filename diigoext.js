var startMergeLinks = function() {
  
  // Check auth
  
  console.log(this);
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
