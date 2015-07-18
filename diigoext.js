var diigoExtContainerArray = [
  'div', {'class': 'toolSection diigoext'},
    ['h2', 'Diigo Ext'],
    ['div',
      ['ul',
        [ 'li',
          ['span', {'class': 'toolName'},
            ['a', {}, 'Remove/Merge Duplicate Links']
          ], ' Remove duplicate links and merge tags'
        ]
      ]
    ]
  ];

var main = document.getElementById('mainInner');
var diigoExtContainer = DOMBuilder.build(diigoExtContainerArray, 'dom');
main.insertBefore(diigoExtContainer, main.firstChild);
