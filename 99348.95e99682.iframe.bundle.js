"use strict";(self.webpackChunk_veecode_platform_veecode_core_components=self.webpackChunk_veecode_platform_veecode_core_components||[]).push([[91994,99348],{"../../node_modules/@shikijs/langs/dist/edge.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var _typescript_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@shikijs/langs/dist/typescript.mjs"),_html_mjs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@shikijs/langs/dist/html.mjs"),_html_derivative_mjs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@shikijs/langs/dist/html-derivative.mjs");const lang=Object.freeze(JSON.parse('{"displayName":"Edge","injections":{"text.html.edge - (meta.embedded | meta.tag | comment.block.edge), L:(text.html.edge meta.tag - (comment.block.edge | meta.embedded.block.edge)), L:(source.ts.embedded.html - (comment.block.edge | meta.embedded.block.edge))":{"patterns":[{"include":"#comment"},{"include":"#escapedMustache"},{"include":"#safeMustache"},{"include":"#mustache"},{"include":"#nonSeekableTag"},{"include":"#tag"}]}},"name":"edge","patterns":[{"include":"text.html.basic"},{"include":"text.html.derivative"}],"repository":{"comment":{"begin":"\\\\{\\\\{--","beginCaptures":{"0":{"name":"punctuation.definition.comment.begin.edge"}},"end":"--}}","endCaptures":{"0":{"name":"punctuation.definition.comment.end.edge"}},"name":"comment.block"},"escapedMustache":{"begin":"@\\\\{\\\\{","beginCaptures":{"0":{"name":"punctuation.definition.comment.begin.edge"}},"end":"}}","endCaptures":{"0":{"name":"punctuation.definition.comment.end.edge"}},"name":"comment.block"},"mustache":{"begin":"\\\\{\\\\{","beginCaptures":{"0":{"name":"punctuation.mustache.begin"}},"end":"}}","endCaptures":{"0":{"name":"punctuation.mustache.end"}},"name":"meta.embedded.block.javascript","patterns":[{"include":"source.ts#expression"}]},"nonSeekableTag":{"captures":{"2":{"name":"support.function.edge"}},"match":"^(\\\\s*)((@{1,2})(!)?([a-zA-Z._]+))(~)?$","name":"meta.embedded.block.javascript","patterns":[{"include":"source.ts#expression"}]},"safeMustache":{"begin":"\\\\{\\\\{\\\\{","beginCaptures":{"0":{"name":"punctuation.mustache.begin"}},"end":"}}}","endCaptures":{"0":{"name":"punctuation.mustache.end"}},"name":"meta.embedded.block.javascript","patterns":[{"include":"source.ts#expression"}]},"tag":{"begin":"^(\\\\s*)((@{1,2})(!)?([a-zA-Z._]+)(\\\\s{0,2}))(\\\\()","beginCaptures":{"2":{"name":"support.function.edge"},"7":{"name":"punctuation.paren.open"}},"end":"\\\\)","endCaptures":{"0":{"name":"punctuation.paren.close"}},"name":"meta.embedded.block.javascript","patterns":[{"include":"source.ts#expression"}]}},"scopeName":"text.html.edge","embeddedLangs":["typescript","html","html-derivative"]}')),__WEBPACK_DEFAULT_EXPORT__=[..._typescript_mjs__WEBPACK_IMPORTED_MODULE_0__.default,..._html_mjs__WEBPACK_IMPORTED_MODULE_1__.default,..._html_derivative_mjs__WEBPACK_IMPORTED_MODULE_2__.default,lang]},"../../node_modules/@shikijs/langs/dist/html-derivative.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var _html_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@shikijs/langs/dist/html.mjs");const lang=Object.freeze(JSON.parse('{"displayName":"HTML (Derivative)","injections":{"R:text.html - (comment.block, text.html meta.embedded, meta.tag.*.*.html, meta.tag.*.*.*.html, meta.tag.*.*.*.*.html)":{"patterns":[{"match":"<","name":"invalid.illegal.bad-angle-bracket.html"}]}},"name":"html-derivative","patterns":[{"include":"text.html.basic#core-minus-invalid"},{"begin":"(</?)(\\\\w[^\\\\s>]*)(?<!/)","beginCaptures":{"1":{"name":"punctuation.definition.tag.begin.html"},"2":{"name":"entity.name.tag.html"}},"end":"((?: ?/)?>)","endCaptures":{"1":{"name":"punctuation.definition.tag.end.html"}},"name":"meta.tag.other.unrecognized.html.derivative","patterns":[{"include":"text.html.basic#attribute"}]}],"scopeName":"text.html.derivative","embeddedLangs":["html"]}')),__WEBPACK_DEFAULT_EXPORT__=[..._html_mjs__WEBPACK_IMPORTED_MODULE_0__.default,lang]}}]);