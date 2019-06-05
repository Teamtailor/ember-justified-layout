# Usage

lorem ipsum…

{{#docs-demo as |demo|}}
  {{log "hejhej" images}}
  {{#demo.example name='justified-layout-usage.hbs'}}
    {{#justified-layout
      images=images
      targetRowHeight=200
      as |image dimensions|}}
      <img
        src={{image.url}}
        style={{concat "width:" dimensions.width "px;height:" dimensions.height "px;top:" dimensions.top "px;left:" dimensions.left "px;position:absolute;"}}>
    {{/justified-layout}}
  {{/demo.example}}

  {{demo.snippet 'justified-layout-usage.hbs'}}
{{/docs-demo}}
