"use strict";(self.webpackChunk_veecode_platform_veecode_core_components=self.webpackChunk_veecode_platform_veecode_core_components||[]).push([[68908],{"../../node_modules/@shikijs/langs/dist/llvm.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=[Object.freeze(JSON.parse('{"displayName":"LLVM IR","name":"llvm","patterns":[{"match":"\\\\b(?:void\\\\b|half\\\\b|bfloat\\\\b|float\\\\b|double\\\\b|x86_fp80\\\\b|fp128\\\\b|ppc_fp128\\\\b|label\\\\b|metadata\\\\b|x86_mmx\\\\b|x86_amx\\\\b|type\\\\b|label\\\\b|opaque\\\\b|token\\\\b|i\\\\d+\\\\**)","name":"storage.type.llvm"},{"captures":{"1":{"name":"storage.type.llvm"}},"match":"!([a-zA-Z]+)\\\\s*\\\\("},{"match":"(?<=\\\\s|^)#dbg_(assign|declare|label|value)\\\\b|\\\\badd\\\\b|\\\\baddrspacecast\\\\b|\\\\balloca\\\\b|\\\\band\\\\b|\\\\barcp\\\\b|\\\\bashr\\\\b|\\\\batomicrmw\\\\b|\\\\bbitcast\\\\b|\\\\bbr\\\\b|\\\\bcatchpad\\\\b|\\\\bcatchswitch\\\\b|\\\\bcatchret\\\\b|\\\\bcall\\\\b|\\\\bcallbr\\\\b|\\\\bcleanuppad\\\\b|\\\\bcleanupret\\\\b|\\\\bcmpxchg\\\\b|\\\\beq\\\\b|\\\\bexact\\\\b|\\\\bextractelement\\\\b|\\\\bextractvalue\\\\b|\\\\bfadd\\\\b|\\\\bfast\\\\b|\\\\bfcmp\\\\b|\\\\bfdiv\\\\b|\\\\bfence\\\\b|\\\\bfmul\\\\b|\\\\bfpext\\\\b|\\\\bfptosi\\\\b|\\\\bfptoui\\\\b|\\\\bfptrunc\\\\b|\\\\bfree\\\\b|\\\\bfrem\\\\b|\\\\bfreeze\\\\b|\\\\bfsub\\\\b|\\\\bfneg\\\\b|\\\\bgetelementptr\\\\b|\\\\bicmp\\\\b|\\\\binbounds\\\\b|\\\\bindirectbr\\\\b|\\\\binsertelement\\\\b|\\\\binsertvalue\\\\b|\\\\binttoptr\\\\b|\\\\binvoke\\\\b|\\\\blandingpad\\\\b|\\\\bload\\\\b|\\\\blshr\\\\b|\\\\bmalloc\\\\b|\\\\bmax\\\\b|\\\\bmin\\\\b|\\\\bmul\\\\b|\\\\bnand\\\\b|\\\\bne\\\\b|\\\\bninf\\\\b|\\\\bnnan\\\\b|\\\\bnsw\\\\b|\\\\bnsz\\\\b|\\\\bnuw\\\\b|\\\\boeq\\\\b|\\\\boge\\\\b|\\\\bogt\\\\b|\\\\bole\\\\b|\\\\bolt\\\\b|\\\\bone\\\\b|\\\\bor\\\\b|\\\\bord\\\\b|\\\\bphi\\\\b|\\\\bptrtoint\\\\b|\\\\bresume\\\\b|\\\\bret\\\\b|\\\\bsdiv\\\\b|\\\\bselect\\\\b|\\\\bsext\\\\b|\\\\bsge\\\\b|\\\\bsgt\\\\b|\\\\bshl\\\\b|\\\\bshufflevector\\\\b|\\\\bsitofp\\\\b|\\\\bsle\\\\b|\\\\bslt\\\\b|\\\\bsrem\\\\b|\\\\bstore\\\\b|\\\\bsub\\\\b|\\\\bswitch\\\\b|\\\\btrunc\\\\b|\\\\budiv\\\\b|\\\\bueq\\\\b|\\\\buge\\\\b|\\\\bugt\\\\b|\\\\buitofp\\\\b|\\\\bule\\\\b|\\\\bult\\\\b|\\\\bumax\\\\b|\\\\bumin\\\\b|\\\\bune\\\\b|\\\\buno\\\\b|\\\\bunreachable\\\\b|\\\\bunwind\\\\b|\\\\burem\\\\b|\\\\bva_arg\\\\b|\\\\bxchg\\\\b|\\\\bxor\\\\b|\\\\bzext\\\\b","name":"keyword.instruction.llvm"},{"match":"\\\\b(?:acq_rel\\\\b|acquire\\\\b|addrspace\\\\b|alias\\\\b|align\\\\b|alignstack\\\\b|allocsize\\\\b|alwaysinline\\\\b|appending\\\\b|argmemonly\\\\b|arm_aapcs_vfpcc\\\\b|arm_aapcscc\\\\b|arm_apcscc\\\\b|asm\\\\b|atomic\\\\b|available_externally\\\\b|blockaddress\\\\b|builtin\\\\b|byref\\\\b|byval\\\\b|c\\\\b|caller\\\\b|catch\\\\b|cc\\\\b|ccc\\\\b|cleanup\\\\b|cold\\\\b|coldcc\\\\b|comdat\\\\b|common\\\\b|constant\\\\b|convergent\\\\b|datalayout\\\\b|declare\\\\b|default\\\\b|define\\\\b|deplibs\\\\b|dereferenceable\\\\b|dereferenceable_or_null\\\\b|distinct\\\\b|dllexport\\\\b|dllimport\\\\b|dso_local\\\\b|dso_preemptable\\\\b|except\\\\b|extern_weak\\\\b|external\\\\b|externally_initialized\\\\b|fastcc\\\\b|filter\\\\b|from\\\\b|gc\\\\b|global\\\\b|hhvm_ccc\\\\b|hhvmcc\\\\b|hidden\\\\b|hot\\\\b|immarg\\\\b|inaccessiblemem_or_argmemonly\\\\b|inaccessiblememonly\\\\b|inalloc\\\\b|initialexec\\\\b|inlinehint\\\\b|inreg\\\\b|intel_ocl_bicc\\\\b|inteldialect\\\\b|internal\\\\b|jumptable\\\\b|linkonce\\\\b|linkonce_odr\\\\b|local_unnamed_addr\\\\b|localdynamic\\\\b|localexec\\\\b|minsize\\\\b|module\\\\b|monotonic\\\\b|msp430_intrcc\\\\b|mustprogress\\\\b|musttail\\\\b|naked\\\\b|nest\\\\b|noalias\\\\b|nobuiltin\\\\b|nocallback\\\\b|nocapture\\\\b|nocf_check\\\\b|noduplicate\\\\b|nofree\\\\b|noimplicitfloat\\\\b|noinline\\\\b|nomerge\\\\b|nonlazybind\\\\b|nonnull\\\\b|noprofile\\\\b|norecurse\\\\b|noredzone\\\\b|noreturn\\\\b|nosync\\\\b|noundef\\\\b|nounwind\\\\b|nosanitize_bounds\\\\b|nosanitize_coverage\\\\b|null_pointer_is_valid\\\\b|optforfuzzing\\\\b|optnone\\\\b|optsize\\\\b|personality\\\\b|preallocated\\\\b|private\\\\b|protected\\\\b|ptx_device\\\\b|ptx_kernel\\\\b|readnone\\\\b|readonly\\\\b|release\\\\b|returned\\\\b|returns_twice\\\\b|safestack\\\\b|sanitize_address\\\\b|sanitize_hwaddress\\\\b|sanitize_memory\\\\b|sanitize_memtag\\\\b|sanitize_thread\\\\b|section\\\\b|seq_cst\\\\b|shadowcallstack\\\\b|sideeffect\\\\b|signext\\\\b|source_filename\\\\b|speculatable\\\\b|speculative_load_hardening\\\\b|spir_func\\\\b|spir_kernel\\\\b|sret\\\\b|ssp\\\\b|sspreq\\\\b|sspstrong\\\\b|strictfp\\\\b|swiftcc\\\\b|swifterror\\\\b|swiftself\\\\b|syncscope\\\\b|tail\\\\b|tailcc\\\\b|target\\\\b|thread_local\\\\b|to\\\\b|triple\\\\b|unnamed_addr\\\\b|unordered\\\\b|uselistorder\\\\b|uselistorder_bb\\\\b|uwtable\\\\b|volatile\\\\b|weak\\\\b|weak_odr\\\\b|willreturn\\\\b|win64cc\\\\b|within\\\\b|writeonly\\\\b|x86_64_sysvcc\\\\b|x86_fastcallcc\\\\b|x86_stdcallcc\\\\b|x86_thiscallcc\\\\b|zeroext\\\\b)","name":"storage.modifier.llvm"},{"match":"@[\\\\-a-zA-Z$._][\\\\-a-zA-Z$._0-9]*","name":"entity.name.function.llvm"},{"match":"[%@!]\\\\d+\\\\b","name":"variable.llvm"},{"match":"%[\\\\-a-zA-Z$._][\\\\-a-zA-Z$._0-9]*","name":"variable.llvm"},{"captures":{"1":{"name":"variable.llvm"}},"match":"(![\\\\-a-zA-Z$._][\\\\-a-zA-Z$._0-9]*)\\\\s*$"},{"captures":{"1":{"name":"variable.llvm"}},"match":"(![\\\\-a-zA-Z$._][\\\\-a-zA-Z$._0-9]*)\\\\s*[=!]"},{"begin":"\\"","end":"\\"","name":"string.quoted.double.llvm","patterns":[{"match":"\\\\.","name":"constant.character.escape.untitled"}]},{"match":"[\\\\-a-zA-Z$._][\\\\-a-zA-Z$._0-9]*:","name":"entity.name.label.llvm"},{"match":"-?\\\\b\\\\d+\\\\.\\\\d*(e[+\\\\-]\\\\d+)?\\\\b","name":"constant.numeric.float"},{"match":"\\\\b0x\\\\h+\\\\b","name":"constant.numeric.float"},{"match":"-?\\\\b\\\\d+\\\\b","name":"constant.numeric.integer"},{"match":"\\\\b(?:true\\\\b|false\\\\b|null\\\\b|zeroinitializer\\\\b|undef\\\\b|poison\\\\b|null\\\\b|none\\\\b)","name":"constant.language"},{"match":"\\\\bD(?:W_TAG_[a-z_]+\\\\b|W_ATE_[a-zA-Z_]+\\\\b|W_OP_[a-zA-Z0-9_]+\\\\b|W_LANG_[a-zA-Z0-9_]+\\\\b|W_VIRTUALITY_[a-z_]+\\\\b|IFlag[A-Za-z]+\\\\b)","name":"constant.other"},{"match":";\\\\s*PR\\\\d*\\\\s*$","name":"string.regexp"},{"match":";\\\\s*REQUIRES:.*$","name":"string.regexp"},{"match":";\\\\s*RUN:.*$","name":"string.regexp"},{"match":";\\\\s*ALLOW_RETRIES:.*$","name":"string.regexp"},{"match":";\\\\s*CHECK:.*$","name":"string.regexp"},{"match":";\\\\s*CHECK-(NEXT|NOT|DAG|SAME|LABEL):.*$","name":"string.regexp"},{"match":";\\\\s*XFAIL:.*$","name":"string.regexp"},{"match":";.*$","name":"comment.line.llvm"}],"scopeName":"source.llvm"}'))]}}]);