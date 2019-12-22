const inject = window => {
  function insertCSS(text) {
    var rule = text
    var css = document.createElement('style')
    css.type = 'text/css'
    if (css.styleSheet) css.styleSheet.cssText = rule
    else css.appendChild(document.createTextNode(rule))
    document.getElementsByTagName('head')[0].appendChild(css)
  }
  // 监听Native层事件
  document.addEventListener(
    'message',
    function(event) {
      let result = JSON.parse(event.data)
      switch (result.code) {
        case 'NW001':
              init();
          break
        default:
          break
      }
    },
    false
  )
  function init() {
    insertCSS(`html{}.wrap{margin-top:0 !important;}.share_pop{display:none !important;}`)
  }
}

export default `(${inject.toString()})(window);`
