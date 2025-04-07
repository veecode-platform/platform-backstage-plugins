"use strict";(self.webpackChunk_veecode_platform_veecode_core_components=self.webpackChunk_veecode_platform_veecode_core_components||[]).push([[67227],{"./src/components/optionCard/OptionCard.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>OptionCard_stories});var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js"),Box=(__webpack_require__("../../node_modules/react/index.js"),__webpack_require__("./node_modules/@mui/material/esm/Box/Box.js")),CardContent=__webpack_require__("./node_modules/@mui/material/esm/CardContent/CardContent.js"),makeStyles=__webpack_require__("../../node_modules/@mui/styles/makeStyles/makeStyles.js");const useOptionCardContentStyles=(0,makeStyles.A)({content:{display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"flex-start",padding:".8rem auto"}}),OptionCardContent=({children})=>{const{content}=useOptionCardContentStyles();return(0,jsx_runtime.jsx)(CardContent.A,{className:content,children})};OptionCardContent.__docgenInfo={description:"",methods:[],displayName:"OptionCardContent",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};var themeVariables=__webpack_require__("./src/utils/constants/themeVariables.ts"),Typography=__webpack_require__("./node_modules/@mui/material/esm/Typography/Typography.js");const useOptionCardDescriptionStyles=(0,makeStyles.A)({descriptionStyle:{color:themeVariables.v.colors.white}}),OptionCardDescription=({description})=>{const{descriptionStyle}=useOptionCardDescriptionStyles();return(0,jsx_runtime.jsx)(Typography.A,{variant:"body2",component:"div",className:descriptionStyle,children:description})};OptionCardDescription.__docgenInfo={description:"",methods:[],displayName:"OptionCardDescription",props:{description:{required:!0,tsType:{name:"string"},description:""}}};var CardMedia=__webpack_require__("./node_modules/@mui/material/esm/CardMedia/CardMedia.js"),Avatar=__webpack_require__("./node_modules/@mui/material/esm/Avatar/Avatar.js");const useOptionCardIconStyles=(0,makeStyles.A)({iconStyle:{display:"flex",alignItems:"flex-start",justifyContent:"center",height:"100%"},iconImg:{width:"60px",height:"60px",backgroundColor:"transparent"}}),OptionCardIcon=({icon:Icon})=>{const{iconStyle,iconImg}=useOptionCardIconStyles();return(0,jsx_runtime.jsx)(CardMedia.A,{className:iconStyle,children:(0,jsx_runtime.jsx)(Avatar.A,{className:iconImg,children:(0,jsx_runtime.jsx)(Icon,{width:40,height:40})})})};OptionCardIcon.__docgenInfo={description:"",methods:[],displayName:"OptionCardIcon",props:{icon:{required:!0,tsType:{name:"ReactElementType",raw:"React.ElementType"},description:""}}};var Card=__webpack_require__("./node_modules/@mui/material/esm/Card/Card.js"),Grid=__webpack_require__("./node_modules/@mui/material/esm/Grid/Grid.js");const useOptionCardRootStyles=(0,makeStyles.A)({root:{width:"500px",height:"100%",padding:"1rem",borderRadius:"5px",backgroundColor:`${themeVariables.v.background.main}`,border:`1px solid ${themeVariables.v.border.main}`,cursor:"pointer",transition:"all 0.5s ease-in-out","&:hover":{border:`1px solid ${themeVariables.v.colors.main}`,backgroundColor:themeVariables.v.background.secondary,transition:"all 0.5s ease-in"}},card:{width:"100%",height:"100%",padding:".5rem 0"}}),OptionCardRoot=({children})=>{const{root,card}=useOptionCardRootStyles();return(0,jsx_runtime.jsx)(Card.A,{className:root,children:(0,jsx_runtime.jsx)(Grid.A,{container:!0,className:card,children})})};OptionCardRoot.__docgenInfo={description:"",methods:[],displayName:"OptionCardRoot",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};var Tooltip=__webpack_require__("./node_modules/@mui/material/esm/Tooltip/Tooltip.js");const useOptionCardSubtitleStyles=(0,makeStyles.A)({subtitleStyle:{color:themeVariables.v.colors.main,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",width:"300px"}}),OptionCardSubtitle=({subtitle})=>{const{subtitleStyle}=useOptionCardSubtitleStyles();return(0,jsx_runtime.jsx)(Tooltip.A,{title:subtitle,placement:"right-start",arrow:!0,children:(0,jsx_runtime.jsx)(Typography.A,{variant:"subtitle1",component:"div",className:subtitleStyle,children:subtitle})})};OptionCardSubtitle.__docgenInfo={description:"",methods:[],displayName:"OptionCardSubtitle",props:{subtitle:{required:!0,tsType:{name:"string"},description:""}}};var Chip=__webpack_require__("./node_modules/@mui/material/esm/Chip/Chip.js");const useOptionCardTagsStyles=(0,makeStyles.A)({chips:{width:"100%",display:"flex",alignSelf:"center",justifyContent:"flex-end",paddingTop:".5rem"},chipStyle:{backgroundColor:themeVariables.v.colors.darkGrey,color:themeVariables.v.colors.white},tooltipStyle:{backgroundColor:themeVariables.v.colors.darkGrey,color:themeVariables.v.colors.white,padding:"0.5rem"}}),OptionCardTags=({tags})=>{const{chips,chipStyle,tooltipStyle}=useOptionCardTagsStyles();return(0,jsx_runtime.jsx)(Box.A,{className:chips,children:(0,jsx_runtime.jsx)(Tooltip.A,{placement:"right-start",arrow:!0,className:tooltipStyle,title:(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:tags.map((tag=>(0,jsx_runtime.jsx)(Chip.A,{label:tag,size:"small",className:chipStyle},tag)))}),children:(0,jsx_runtime.jsx)(Chip.A,{label:"tags",size:"medium",className:chipStyle})})})};OptionCardTags.__docgenInfo={description:"",methods:[],displayName:"OptionCardTags",props:{tags:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""}}};const useOptionCardTitleStyles=(0,makeStyles.A)({titleStyle:{color:themeVariables.v.colors.white}}),OptionCardTitle=({title})=>{const{titleStyle}=useOptionCardTitleStyles();return(0,jsx_runtime.jsx)(Typography.A,{component:"div",variant:"h5",className:titleStyle,children:title})};OptionCardTitle.__docgenInfo={description:"",methods:[],displayName:"OptionCardTitle",props:{title:{required:!0,tsType:{name:"string"},description:""}}};const OptionCard={Root:OptionCardRoot,Content:OptionCardContent,Icon:OptionCardIcon,title:OptionCardTitle,subtitle:OptionCardSubtitle,description:OptionCardDescription,tags:OptionCardTags};var stack_icon=__webpack_require__("./src/icons/stack-icon.tsx");const OptionCard_stories={title:"Components/OptionCard",component:OptionCard.Root,args:{icon:stack_icon.m,title:"Title",subtitle:"Subtitle example",description:"Description example",tags:["Item 1","Item 2","Item 3"]},argTypes:{icon:{control:{}},title:{control:"text"},subtitle:{control:"text"},description:{control:"text"}},decorators:[Story=>(0,jsx_runtime.jsx)(Box.A,{sx:{maxWidth:"80vw"},children:Story()})]},Default=({icon,title,subtitle,description,tags})=>(0,jsx_runtime.jsxs)(OptionCard.Root,{children:[(0,jsx_runtime.jsx)(OptionCard.Icon,{icon}),(0,jsx_runtime.jsxs)(OptionCard.Content,{children:[(0,jsx_runtime.jsx)(OptionCard.title,{title}),(0,jsx_runtime.jsx)(OptionCard.subtitle,{subtitle}),(0,jsx_runtime.jsx)(OptionCard.description,{description})]}),(0,jsx_runtime.jsx)(OptionCard.tags,{tags})]}),__namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"({\n  icon,\n  title,\n  subtitle,\n  description,\n  tags\n}: OptionCardProps) => <OptionCard.Root>\n        <OptionCard.Icon icon={icon} />\n        <OptionCard.Content>\n            <OptionCard.title title={title} />\n            <OptionCard.subtitle subtitle={subtitle!} />\n            <OptionCard.description description={description!} />\n        </OptionCard.Content>\n        <OptionCard.tags tags={tags!} />\n    </OptionCard.Root>",...Default.parameters?.docs?.source}}},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"({\n  icon,\n  title,\n  subtitle,\n  description,\n  tags\n}: OptionCardProps) => <OptionCard.Root>\n        <OptionCard.Icon icon={icon} />\n        <OptionCard.Content>\n            <OptionCard.title title={title} />\n            <OptionCard.subtitle subtitle={subtitle!} />\n            <OptionCard.description description={description!} />\n        </OptionCard.Content>\n        <OptionCard.tags tags={tags!} />\n    </OptionCard.Root>",...Default.parameters?.docs?.source}}}},"./src/icons/stack-icon.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{m:()=>StackIcon});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/jsx-runtime.js");__webpack_require__("../../node_modules/react/index.js");const StackIcon=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg",{version:"1.1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",viewBox:"0 12.875 50 41.635",enableBackground:"new 0 12.875 50 41.635",xmlSpace:"preserve",fill:"#00F6BD",width:40,height:40,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("g",{id:"SVGRepo_bgCarrier",strokeWidth:"0",children:" "}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("g",{id:"SVGRepo_tracerCarrier",strokeLinecap:"round",strokeLinejoin:"round",children:" "}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g",{id:"SVGRepo_iconCarrier",children:[" ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("g",{id:"Layer_3",children:" "})," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g",{id:"Layer_2",children:[" ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g",{children:[" ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("polygon",{fill:"none",stroke:"#00F6BD",strokeLinecap:"round",strokeLinejoin:"round",points:"25.331,36.012 2.571,25.035 25.209,14.178 47.97,25.156 ",children:" "})," "]})," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g",{children:[" ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path",{fill:"none",stroke:"#00F6BD",strokeLinecap:"round",strokeLinejoin:"round",d:"M40.883,30.362l7.087,3.419L25.331,44.637 L2.571,33.66c0,0,3.909-1.873,7.012-3.361",children:" "})," "]})," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g",{children:[" ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("polyline",{fill:"none",stroke:"#00F6BD",strokeLinecap:"round",strokeLinejoin:"round",points:"41.229,39.155 47.97,42.406 25.331,53.262 2.571,42.285 9.081,39.164 ",children:" "})," "]})," "]})," "]})]});StackIcon.__docgenInfo={description:"",methods:[],displayName:"StackIcon"}},"./src/utils/constants/themeVariables.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{v:()=>themeVariables});const themeVariables={layout:{maxWidth:"1200px"},colors:{main:"#00F6BD",grey:"#B6B6B6",black:"#151515",dark:"#00000067",white:"#FAFAFA",red:"#D50000",darkGrey:"#202020",success:"#4CAF50",warning:"#f5dd05",info:"#3467eb",danger:"#FF0000"},blur:{dark:"#00000070"},background:{main:"#151515",secondary:"#424242",dark:"#0F0F0F",danger:"#ff000010",warning:"#f5dd0510",success:"#04b92510",info:"#3467eb10"},codeBlock:{dark:"#0D1117"},border:{main:"#B5B5B530"},list:{background:"#0F0F0F",hover:"#00000087"}}}}]);