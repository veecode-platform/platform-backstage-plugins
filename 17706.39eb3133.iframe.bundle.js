"use strict";(self.webpackChunk_veecode_platform_veecode_core_components=self.webpackChunk_veecode_platform_veecode_core_components||[]).push([[17706],{"../../node_modules/@shikijs/langs/dist/splunk.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=[Object.freeze(JSON.parse('{"displayName":"Splunk Query Language","fileTypes":["splunk","spl"],"name":"splunk","patterns":[{"match":"(?<=([|\\\\[]))(\\\\s*)\\\\b(abstract|accum|addcoltotals|addinfo|addtotals|analyzefields|anomalies|anomalousvalue|append|appendcols|appendpipe|arules|associate|audit|autoregress|bucket|bucketdir|chart|cluster|collect|concurrency|contingency|convert|correlate|crawl|datamodel|dbinspect|dbxquery|dbxlookup|dedup|delete|delta|diff|dispatch|erex|eval|eventcount|eventstats|extract|fieldformat|fields|fieldsummary|file|filldown|fillnull|findtypes|folderize|foreach|format|from|gauge|gentimes|geostats|head|highlight|history|input|inputcsv|inputlookup|iplocation|join|kmeans|kvform|loadjob|localize|localop|lookup|makecontinuous|makemv|makeresults|map|metadata|metasearch|multikv|multisearch|mvcombine|mvexpand|nomv|outlier|outputcsv|outputlookup|outputtext|overlap|pivot|predict|rangemap|rare|regex|relevancy|reltime|rename|replace|rest|return|reverse|rex|rtorder|run|savedsearch|script|scrub|search|searchtxn|selfjoin|sendemail|set|setfields|sichart|sirare|sistats|sitimechart|sitop|sort|spath|stats|strcat|streamstats|table|tags|tail|timechart|top|transaction|transpose|trendline|tscollect|tstats|typeahead|typelearner|typer|uniq|untable|where|x11|xmlkv|xmlunescape|xpath|xyseries)\\\\b(?=\\\\s)","name":"support.class.splunk_search"},{"match":"\\\\b(abs|acos|acosh|asin|asinh|atan|atan2|atanh|case|cidrmatch|ceiling|coalesce|commands|cos|cosh|exact|exp|floor|hypot|if|in|isbool|isint|isnotnull|isnull|isnum|isstr|len|like|ln|log|lower|ltrim|match|max|md5|min|mvappend|mvcount|mvdedup|mvfilter|mvfind|mvindex|mvjoin|mvrange|mvsort|mvzip|now|null|nullif|pi|pow|printf|random|relative_time|replace|round|rtrim|searchmatch|sha1|sha256|sha512|sigfig|sin|sinh|spath|split|sqrt|strftime|strptime|substr|tan|tanh|time|tonumber|tostring|trim|typeof|upper|urldecode|validate)(?=\\\\()\\\\b","name":"support.function.splunk_search"},{"match":"\\\\b(avg|count|distinct_count|estdc|estdc_error|eval|max|mean|median|min|mode|percentile|range|stdev|stdevp|sum|sumsq|var|varp|first|last|list|values|earliest|earliest_time|latest|latest_time|per_day|per_hour|per_minute|per_second|rate)\\\\b","name":"support.function.splunk_search"},{"match":"(?<=`)\\\\w+(?=[(`])","name":"entity.name.function.splunk_search"},{"match":"\\\\b(\\\\d+)\\\\b","name":"constant.numeric.splunk_search"},{"match":"(\\\\\\\\[\\\\\\\\|*=])","name":"contant.character.escape.splunk_search"},{"match":"(\\\\|,)","name":"keyword.operator.splunk_search"},{"match":"(?i)\\\\b(as|by|or|and|over|where|output|outputnew)\\\\b|(?-i)\\\\b(NOT|true|false)\\\\b","name":"constant.language.splunk_search"},{"match":"(?<=[(,]|[^=]\\\\s{300})([^()\\",=]+)(?=[),])","name":"variable.parameter.splunk_search"},{"match":"([\\\\w.]+)(\\\\[]|\\\\{})?(\\\\s*)(?==)","name":"variable.splunk_search"},{"match":"=","name":"keyword.operator.splunk_search"},{"begin":"(?<!\\\\\\\\)\\"","end":"(?<!\\\\\\\\)\\"","name":"string.quoted.double.splunk_search"},{"begin":"(?<!\\\\\\\\)\'","end":"(?<!\\\\\\\\)\'","name":"string.quoted.single.splunk_search"},{"begin":"query=\\"","end":"(?<!\\\\\\\\)\\"","name":"meta.embedded.block.sql"},{"begin":"(?<!\\\\\\\\)```","end":"(?<!\\\\\\\\)```","name":"comment.block.splunk_search"},{"begin":"`comment\\\\(","end":"\\\\)`","name":"comment.block.splunk_search"}],"scopeName":"source.splunk_search","aliases":["spl"]}'))]}}]);