(self.webpackChunk_veecode_platform_veecode_core_components=self.webpackChunk_veecode_platform_veecode_core_components||[]).push([[3607],{"../../node_modules/highlight.js/lib/languages/abnf.js":module=>{function concat(...args){return args.map((x=>function source(re){return re?"string"==typeof re?re:re.source:null}(x))).join("")}module.exports=function abnf(hljs){const regexes={ruleDeclaration:/^[a-zA-Z][a-zA-Z0-9-]*/,unexpectedChars:/[!@#$^&',?+~`|:]/},commentMode=hljs.COMMENT(/;/,/$/),ruleDeclarationMode={className:"attribute",begin:concat(regexes.ruleDeclaration,/(?=\s*=)/)};return{name:"Augmented Backus-Naur Form",illegal:regexes.unexpectedChars,keywords:["ALPHA","BIT","CHAR","CR","CRLF","CTL","DIGIT","DQUOTE","HEXDIG","HTAB","LF","LWSP","OCTET","SP","VCHAR","WSP"],contains:[ruleDeclarationMode,commentMode,{className:"symbol",begin:/%b[0-1]+(-[0-1]+|(\.[0-1]+)+){0,1}/},{className:"symbol",begin:/%d[0-9]+(-[0-9]+|(\.[0-9]+)+){0,1}/},{className:"symbol",begin:/%x[0-9A-F]+(-[0-9A-F]+|(\.[0-9A-F]+)+){0,1}/},{className:"symbol",begin:/%[si]/},hljs.QUOTE_STRING_MODE,hljs.NUMBER_MODE]}}}}]);