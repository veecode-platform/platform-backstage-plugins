"use strict";(self.webpackChunk_veecode_platform_veecode_core_components=self.webpackChunk_veecode_platform_veecode_core_components||[]).push([[33635],{"../../node_modules/@shikijs/langs/dist/verilog.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=[Object.freeze(JSON.parse('{"displayName":"Verilog","fileTypes":["v","vh"],"name":"verilog","patterns":[{"include":"#comments"},{"include":"#module_pattern"},{"include":"#keywords"},{"include":"#constants"},{"include":"#strings"},{"include":"#operators"}],"repository":{"comments":{"patterns":[{"begin":"(^[ \\\\t]+)?(?=//)","beginCaptures":{"1":{"name":"punctuation.whitespace.comment.leading.verilog"}},"end":"(?!\\\\G)","patterns":[{"begin":"//","beginCaptures":{"0":{"name":"punctuation.definition.comment.verilog"}},"end":"\\\\n","name":"comment.line.double-slash.verilog"}]},{"begin":"/\\\\*","end":"\\\\*/","name":"comment.block.c-style.verilog"}]},"constants":{"patterns":[{"match":"`(?!(celldefine|endcelldefine|default_nettype|define|undef|ifdef|ifndef|else|endif|include|resetall|timescale|unconnected_drive|nounconnected_drive))[a-z_A-Z][a-zA-Z0-9_$]*","name":"variable.other.constant.verilog"},{"match":"[0-9]*\'[bBoOdDhH][_xXzZ\\\\h]+\\\\b","name":"constant.numeric.sized_integer.verilog"},{"captures":{"1":{"name":"constant.numeric.integer.verilog"},"2":{"name":"punctuation.separator.range.verilog"},"3":{"name":"constant.numeric.integer.verilog"}},"match":"\\\\b(\\\\d+)(:)(\\\\d+)\\\\b","name":"meta.block.numeric.range.verilog"},{"match":"\\\\b\\\\d[\\\\d_]*(?i:e\\\\d+)?\\\\b","name":"constant.numeric.integer.verilog"},{"match":"\\\\b\\\\d+\\\\.\\\\d+(?i:e\\\\d+)?\\\\b","name":"constant.numeric.real.verilog"},{"match":"#\\\\d+","name":"constant.numeric.delay.verilog"},{"match":"\\\\b[01xXzZ]+\\\\b","name":"constant.numeric.logic.verilog"}]},"instantiation_patterns":{"patterns":[{"include":"#keywords"},{"begin":"^\\\\s*(?!always|and|assign|output|input|inout|wire|module)([a-zA-Z][a-zA-Z0-9_]*)\\\\s+([a-zA-Z][a-zA-Z0-9_]*)(?<!begin|if)\\\\s*(?=\\\\(|$)","beginCaptures":{"1":{"name":"entity.name.tag.module.reference.verilog"},"2":{"name":"entity.name.tag.module.identifier.verilog"}},"end":";","endCaptures":{"0":{"name":"punctuation.terminator.expression.verilog"}},"name":"meta.block.instantiation.parameterless.verilog","patterns":[{"include":"#comments"},{"include":"#constants"},{"include":"#strings"}]},{"begin":"^\\\\s*([a-zA-Z][a-zA-Z0-9_]*)\\\\s*(#)(?=\\\\s*\\\\()","beginCaptures":{"1":{"name":"entity.name.tag.module.reference.verilog"}},"end":";","endCaptures":{"0":{"name":"punctuation.terminator.expression.verilog"}},"name":"meta.block.instantiation.with.parameters.verilog","patterns":[{"include":"#parenthetical_list"},{"match":"[a-zA-Z][a-zA-Z0-9_]*","name":"entity.name.tag.module.identifier.verilog"}]}]},"keywords":{"patterns":[{"match":"\\\\b(always|and|assign|attribute|begin|buf|bufif0|bufif1|case[xz]?|cmos|deassign|default|defparam|disable|edge|else|end(attribute|case|function|generate|module|primitive|specify|table|task)?|event|for|force|forever|fork|function|generate|genvar|highz(01)|if(none)?|initial|inout|input|integer|join|localparam|medium|module|large|macromodule|nand|negedge|nmos|nor|not|notif(01)|or|output|parameter|pmos|posedge|primitive|pull0|pull1|pulldown|pullup|rcmos|real|realtime|reg|release|repeat|rnmos|rpmos|rtran|rtranif(01)|scalared|signed|small|specify|specparam|strength|strong0|strong1|supply0|supply1|table|task|time|tran|tranif(01)|tri(01)?|tri(and|or|reg)|unsigned|vectored|wait|wand|weak(01)|while|wire|wor|xnor|xor)\\\\b","name":"keyword.other.verilog"},{"match":"^\\\\s*`((cell)?define|default_(decay_time|nettype|trireg_strength)|delay_mode_(path|unit|zero)|ifdef|ifndef|include|end(if|celldefine)|else|(no)?unconnected_drive|resetall|timescale|undef)\\\\b","name":"keyword.other.compiler.directive.verilog"},{"match":"\\\\$(f(open|close)|readmem([bh])|timeformat|printtimescale|stop|finish|(s|real)?time|realtobits|bitstoreal|rtoi|itor|(f)?(display|write([hb])))\\\\b","name":"support.function.system.console.tasks.verilog"},{"match":"\\\\$(random|dist_(chi_square|erlang|exponential|normal|poisson|t|uniform))\\\\b","name":"support.function.system.random_number.tasks.verilog"},{"match":"\\\\$((a)?sync\\\\$((n)?and|(n)or)\\\\$(array|plane))\\\\b","name":"support.function.system.pld_modeling.tasks.verilog"},{"match":"\\\\$(q_(initialize|add|remove|full|exam))\\\\b","name":"support.function.system.stochastic.tasks.verilog"},{"match":"\\\\$(hold|nochange|period|recovery|setup(hold)?|skew|width)\\\\b","name":"support.function.system.timing.tasks.verilog"},{"match":"\\\\$(dump(file|vars|off|on|all|limit|flush))\\\\b","name":"support.function.system.vcd.tasks.verilog"},{"match":"\\\\$(countdrivers|list|input|scope|showscopes|(no)?(key|log)|reset(_(?:count|value))?|(inc)?save|restart|showvars|getpattern|sreadmem([bh])|scale)","name":"support.function.non-standard.tasks.verilog"}]},"module_pattern":{"patterns":[{"begin":"\\\\b(module)\\\\s+([a-zA-Z][a-zA-Z0-9_]*)","beginCaptures":{"1":{"name":"storage.type.module.verilog"},"2":{"name":"entity.name.type.module.verilog"}},"end":"\\\\bendmodule\\\\b","endCaptures":{"0":{"name":"storage.type.module.verilog"}},"name":"meta.block.module.verilog","patterns":[{"include":"#comments"},{"include":"#keywords"},{"include":"#constants"},{"include":"#strings"},{"include":"#instantiation_patterns"},{"include":"#operators"}]}]},"operators":{"patterns":[{"match":"[+\\\\-*/%]|([<>])=?|([!=])?==?|!|&&?|\\\\|\\\\|?|\\\\^?~|~\\\\^?","name":"keyword.operator.verilog"}]},"parenthetical_list":{"patterns":[{"begin":"\\\\(","beginCaptures":{"0":{"name":"punctuation.section.list.verilog"}},"end":"\\\\)","endCaptures":{"0":{"name":"punctuation.section.list.verilog"}},"name":"meta.block.parenthetical_list.verilog","patterns":[{"include":"#parenthetical_list"},{"include":"#comments"},{"include":"#keywords"},{"include":"#constants"},{"include":"#strings"}]}]},"strings":{"patterns":[{"begin":"\\"","end":"\\"","name":"string.quoted.double.verilog","patterns":[{"match":"\\\\\\\\.","name":"constant.character.escape.verilog"}]}]}},"scopeName":"source.verilog"}'))]}}]);