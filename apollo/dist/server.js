(function(a){var m={};function i(n){if(m[n])return m[n].exports;var t=m[n]={i:n,l:!1,exports:{}};return a[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}return i.m=a,i.c=m,i.d=function(n,t,u){i.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:u})},i.r=function(n){typeof Symbol!="undefined"&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},i.t=function(n,t){if(t&1&&(n=i(n)),t&8||t&4&&typeof n=="object"&&n&&n.__esModule)return n;var u=Object.create(null);if(i.r(u),Object.defineProperty(u,"default",{enumerable:!0,value:n}),t&2&&typeof n!="string")for(var k in n)i.d(u,k,function(v){return n[v]}.bind(null,k));return u},i.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return i.d(t,"a",t),t},i.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},i.p="",i(i.s=11)})([function(a,m){a.exports=require("graphql-modules")},function(a,m){a.exports=require("apollo-datasource")},function(a,m){a.exports=require("apollo-server")},function(a,m){a.exports=require("apollo-server-core")},function(a,m){a.exports=require("@notionhq/client")},function(a,m){a.exports=require("asyncairtable")},function(a,m){a.exports=require("dotenv")},function(a,m){var i={kind:"Document",definitions:[{kind:"ObjectTypeDefinition",name:{kind:"Name",value:"Book"},interfaces:[{kind:"NamedType",name:{kind:"Name",value:"Node"}}],directives:[],fields:[{kind:"FieldDefinition",name:{kind:"Name",value:"id"},arguments:[],type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"name"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"synopsis"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"rating"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"Int"}},directives:[]}]},{kind:"ObjectTypeDefinition",name:{kind:"Name",value:"Query"},interfaces:[],directives:[],fields:[{kind:"FieldDefinition",name:{kind:"Name",value:"books"},arguments:[{kind:"InputValueDefinition",name:{kind:"Name",value:"limit"},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]},{kind:"InputValueDefinition",name:{kind:"Name",value:"page"},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]}],type:{kind:"ListType",type:{kind:"NamedType",name:{kind:"Name",value:"Book"}}},directives:[]}]}],loc:{start:0,end:145}};i.loc.source={body:`type Book implements Node {
  id: ID!
  name: String
  synopsis: String
  rating: Int
}

type Query {
  books(limit: Int!, page: Int!): [Book]
}
`,name:"GraphQL request",locationOffset:{line:1,column:1}};var n={};function t(u){return u.filter(function(k){if(k.kind!=="FragmentDefinition")return!0;var v=k.name.value;return n[v]?!1:(n[v]=!0,!0)})}a.exports=i},function(a,m,i){var n={kind:"Document",definitions:[{kind:"ObjectTypeDefinition",name:{kind:"Name",value:"ProjectItem"},interfaces:[{kind:"NamedType",name:{kind:"Name",value:"Node"}}],directives:[],fields:[{kind:"FieldDefinition",name:{kind:"Name",value:"id"},arguments:[],type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"object"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"properties"},arguments:[],type:{kind:"ListType",type:{kind:"NamedType",name:{kind:"Name",value:"Property"}}},directives:[]}]},{kind:"ObjectTypeDefinition",name:{kind:"Name",value:"ProjectItemsEdge"},interfaces:[{kind:"NamedType",name:{kind:"Name",value:"Edge"}}],directives:[],fields:[{kind:"FieldDefinition",name:{kind:"Name",value:"node"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"ProjectItem"}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"cursor"},arguments:[],type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]}]},{kind:"ObjectTypeDefinition",name:{kind:"Name",value:"ProjectItemsConnection"},interfaces:[{kind:"NamedType",name:{kind:"Name",value:"Page"}}],directives:[],fields:[{kind:"FieldDefinition",name:{kind:"Name",value:"totalCount"},arguments:[],type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"edges"},arguments:[],type:{kind:"ListType",type:{kind:"NamedType",name:{kind:"Name",value:"ProjectItemsEdge"}}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"pageInfo"},arguments:[],type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"PageInfo"}}},directives:[]}]},{kind:"ObjectTypeExtension",name:{kind:"Name",value:"Query"},interfaces:[],directives:[],fields:[{kind:"FieldDefinition",name:{kind:"Name",value:"projectsDatabase"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"Database"}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"projects"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"ProjectItemsConnection"}},directives:[]}]}],loc:{start:0,end:399}};n.loc.source={body:`#import "./Notion.graphql"

type ProjectItem implements Node {
  id: ID!
  object: String
  properties: [Property]
}

type ProjectItemsEdge implements Edge {
  node: ProjectItem
  cursor: ID!
}

type ProjectItemsConnection implements Page {
  totalCount: Int!
  edges: [ProjectItemsEdge]
  pageInfo: PageInfo!
}

extend type Query {
  projectsDatabase: Database
  projects: ProjectItemsConnection
}
`,name:"GraphQL request",locationOffset:{line:1,column:1}};var t={};function u(k){return k.filter(function(v){if(v.kind!=="FragmentDefinition")return!0;var I=v.name.value;return t[I]?!1:(t[I]=!0,!0)})}n.definitions=n.definitions.concat(u(i(12).definitions)),a.exports=n},function(a,m){a.exports=require("graphql-type-json")},function(a,m){a.exports=require("change-case")},function(a,m,i){a.exports=i(14)},function(a,m,i){var n={kind:"Document",definitions:[{kind:"EnumTypeDefinition",name:{kind:"Name",value:"RichTextTypeEnum"},directives:[],values:[{kind:"EnumValueDefinition",name:{kind:"Name",value:"TEXT"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"MENTION"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"EQUATION"},directives:[]}]},{kind:"EnumTypeDefinition",name:{kind:"Name",value:"PropertyTypeEnum"},directives:[],values:[{kind:"EnumValueDefinition",name:{kind:"Name",value:"TITLE"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"RICH_TEXT"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"NUMBER"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"SELECT"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"MULTI_SELECT"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"DATE"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"PEOPLE"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"FILE"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"CHECKBOX"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"URL"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"EMAIL"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"PHONE_NUMBER"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"FORMULA"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"RELATION"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"ROLLUP"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"CREATED_TIME"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"CREATED_BY"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"LAST_EDITED_TIME"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"LAST_EDITED_BY"},directives:[]}]},{kind:"EnumTypeDefinition",name:{kind:"Name",value:"NumberFormatEnum"},directives:[],values:[{kind:"EnumValueDefinition",name:{kind:"Name",value:"NUMBER"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"NUMBER_WITH_COMMAS"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"PERCENT"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"DOLLAR"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"EURO"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"POUND"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"YEN"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"RUBBLE"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"RUPEE"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"WON"},directives:[]},{kind:"EnumValueDefinition",name:{kind:"Name",value:"YUAN"},directives:[]}]},{kind:"InterfaceTypeDefinition",name:{kind:"Name",value:"Property"},interfaces:[{kind:"NamedType",name:{kind:"Name",value:"Node"}}],directives:[],fields:[{kind:"FieldDefinition",name:{kind:"Name",value:"id"},arguments:[],type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"type"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"PropertyTypeEnum"}},directives:[]}]},{kind:"ObjectTypeDefinition",name:{kind:"Name",value:"PropertyTitle"},interfaces:[{kind:"NamedType",name:{kind:"Name",value:"Property"}},{kind:"NamedType",name:{kind:"Name",value:"Node"}}],directives:[],fields:[{kind:"FieldDefinition",name:{kind:"Name",value:"id"},arguments:[],type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"type"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"PropertyTypeEnum"}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"name"},arguments:[],type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"title"},arguments:[],type:{kind:"ListType",type:{kind:"NamedType",name:{kind:"Name",value:"RichText"}}},directives:[]}]},{kind:"ObjectTypeDefinition",name:{kind:"Name",value:"Database"},interfaces:[{kind:"NamedType",name:{kind:"Name",value:"Node"}}],directives:[],fields:[{kind:"FieldDefinition",name:{kind:"Name",value:"id"},arguments:[],type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"object"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"created_time"},arguments:[],type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"last_edited_time"},arguments:[],type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"title"},arguments:[],type:{kind:"ListType",type:{kind:"NamedType",name:{kind:"Name",value:"RichText"}}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"properties"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"JSONObject"}},directives:[]}]},{kind:"ObjectTypeDefinition",name:{kind:"Name",value:"TextAnnotations"},interfaces:[],directives:[],fields:[{kind:"FieldDefinition",name:{kind:"Name",value:"bold"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"italic"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"strikethrough"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"underline"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"code"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"color"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]}]},{kind:"FragmentDefinition",name:{kind:"Name",value:"TextAnnotationsFragment"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"TextAnnotations"}},directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"bold"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"italic"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"strikethrough"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"underline"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"code"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"color"},arguments:[],directives:[]}]}},{kind:"ObjectTypeDefinition",name:{kind:"Name",value:"Text"},interfaces:[],directives:[],fields:[{kind:"FieldDefinition",name:{kind:"Name",value:"type"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"RichTextTypeEnum"}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"content"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"link"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]}]},{kind:"ObjectTypeDefinition",name:{kind:"Name",value:"RichText"},interfaces:[],directives:[],fields:[{kind:"FieldDefinition",name:{kind:"Name",value:"type"},arguments:[],type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"RichTextTypeEnum"}}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"plain_text"},arguments:[],type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"href"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"annotations"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"TextAnnotations"}},directives:[]}]},{kind:"UnionTypeDefinition",name:{kind:"Name",value:"AnyText"},directives:[],types:[{kind:"NamedType",name:{kind:"Name",value:"Text"}},{kind:"NamedType",name:{kind:"Name",value:"RichText"}}]},{kind:"ObjectTypeDefinition",name:{kind:"Name",value:"Number"},interfaces:[],directives:[],fields:[{kind:"FieldDefinition",name:{kind:"Name",value:"format"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]}]}],loc:{start:0,end:1349}};n.loc.source={body:`#import "../types.graphql"

enum RichTextTypeEnum {
  TEXT
  MENTION
  EQUATION
}

enum PropertyTypeEnum {
  TITLE
  RICH_TEXT
  NUMBER
  SELECT
  MULTI_SELECT
  DATE
  PEOPLE
  FILE
  CHECKBOX
  URL
  EMAIL
  PHONE_NUMBER
  FORMULA
  RELATION
  ROLLUP
  CREATED_TIME
  CREATED_BY
  LAST_EDITED_TIME
  LAST_EDITED_BY
}

enum NumberFormatEnum {
  NUMBER
  NUMBER_WITH_COMMAS
  PERCENT
  DOLLAR
  EURO
  POUND
  YEN
  RUBBLE
  RUPEE
  WON
  YUAN
}

###############

interface Property implements Node {
  id: ID!
  type: PropertyTypeEnum
}

type PropertyTitle implements Property & Node {
  id: ID!
  type: PropertyTypeEnum
  name: String!
  title: [RichText]
}

type Database implements Node {
  id: ID!
  object: String
  created_time: String!
  last_edited_time: String!
  title: [RichText]
  properties: JSONObject
}

#############

type TextAnnotations {
  bold: Boolean
  italic: Boolean
  strikethrough: Boolean
  underline: Boolean
  code: Boolean
  color: String
}
fragment TextAnnotationsFragment on TextAnnotations {
  bold
  italic
  strikethrough
  underline
  code
  color
}

type Text {
  type: RichTextTypeEnum
  content: String
  link: String
}

type RichText {
  type: RichTextTypeEnum!
  plain_text: String!
  href: String
  annotations: TextAnnotations
}
union AnyText = Text | RichText

########

type Number {
  format: String
}
`,name:"GraphQL request",locationOffset:{line:1,column:1}};var t={};function u(o){return o.filter(function(s){if(s.kind!=="FragmentDefinition")return!0;var c=s.name.value;return t[c]?!1:(t[c]=!0,!0)})}n.definitions=n.definitions.concat(u(i(13).definitions));function k(o,s){if(o.kind==="FragmentSpread")s.add(o.name.value);else if(o.kind==="VariableDefinition"){var c=o.type;c.kind==="NamedType"&&s.add(c.name.value)}o.selectionSet&&o.selectionSet.selections.forEach(function(f){k(f,s)}),o.variableDefinitions&&o.variableDefinitions.forEach(function(f){k(f,s)}),o.definitions&&o.definitions.forEach(function(f){k(f,s)})}var v={};(function(){n.definitions.forEach(function(s){if(s.name){var c=new Set;k(s,c),v[s.name.value]=c}})})();function I(o,s){for(var c=0;c<o.definitions.length;c++){var f=o.definitions[c];if(f.name&&f.name.value==s)return f}}function F(o,s){var c={kind:o.kind,definitions:[I(o,s)]};o.hasOwnProperty("loc")&&(c.loc=o.loc);var f=v[s]||new Set,O=new Set,b=new Set;for(f.forEach(function(T){b.add(T)});b.size>0;){var S=b;b=new Set,S.forEach(function(T){if(!O.has(T)){O.add(T);var x=v[T]||new Set;x.forEach(function(A){b.add(A)})}})}return O.forEach(function(T){var x=I(o,T);x&&c.definitions.push(x)}),c}a.exports=n,a.exports.TextAnnotationsFragment=F(n,"TextAnnotationsFragment")},function(a,m){var i={kind:"Document",definitions:[{kind:"ScalarTypeDefinition",name:{kind:"Name",value:"JSONObject"},directives:[]},{kind:"ObjectTypeDefinition",name:{kind:"Name",value:"PageInfo"},interfaces:[],directives:[],fields:[{kind:"FieldDefinition",name:{kind:"Name",value:"startCursor"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"ID"}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"endCursor"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"ID"}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"hasNextPage"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}},directives:[]}]},{kind:"InterfaceTypeDefinition",name:{kind:"Name",value:"Edge"},interfaces:[],directives:[],fields:[{kind:"FieldDefinition",name:{kind:"Name",value:"node"},arguments:[],type:{kind:"NamedType",name:{kind:"Name",value:"Node"}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"cursor"},arguments:[],type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]}]},{kind:"InterfaceTypeDefinition",name:{kind:"Name",value:"Node"},interfaces:[],directives:[],fields:[{kind:"FieldDefinition",name:{kind:"Name",value:"id"},arguments:[],type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ID"}}},directives:[]}]},{kind:"InterfaceTypeDefinition",name:{kind:"Name",value:"Page"},interfaces:[],directives:[],fields:[{kind:"FieldDefinition",name:{kind:"Name",value:"totalCount"},arguments:[],type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"edges"},arguments:[],type:{kind:"ListType",type:{kind:"NamedType",name:{kind:"Name",value:"Edge"}}},directives:[]},{kind:"FieldDefinition",name:{kind:"Name",value:"pageInfo"},arguments:[],type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"PageInfo"}}},directives:[]}]}],loc:{start:0,end:247}};i.loc.source={body:`scalar JSONObject

type PageInfo {
  startCursor: ID
  endCursor: ID
  hasNextPage: Boolean
}
interface Edge {
  node: Node
  cursor: ID!
}

interface Node {
  id: ID!
}

interface Page {
  totalCount: Int!
  edges: [Edge]
  pageInfo: PageInfo!
}
`,name:"GraphQL request",locationOffset:{line:1,column:1}};var n={};function t(u){return u.filter(function(k){if(k.kind!=="FragmentDefinition")return!0;var v=k.name.value;return n[v]?!1:(n[v]=!0,!0)})}a.exports=i},function(a,m,i){"use strict";i.r(m);var n=i(2),t=i(0),u=i(3),k=i(4),v=i(1);class I extends v.DataSource{constructor(r){super();this.api=new k.Client(r)}}var F=i(5),o=i.n(F);class s extends v.DataSource{constructor(r){super();this.api=new o.a(r.apiKey,r.base)}}var c=i(6),f=i.n(c);f.a.config();var O={AIRTABLE:{apiKey:process.env.AIRTABLE_APIKEY||"<API_KEY_HERE>",booksBaseId:"appOqm0oQNWYyP5Kd"},NOTION:{apiKey:process.env.NOTION_API_KEY||"<API_KEY_HERE>"}};function b(){return{books:new s({apiKey:O.AIRTABLE.apiKey,base:O.AIRTABLE.booksBaseId}),notion:new I({auth:O.NOTION.apiKey})}}var S=i(7),T=i.n(S),x=(e,r,d)=>new Promise((p,D)=>{var E=l=>{try{N(d.next(l))}catch(y){D(y)}},g=l=>{try{N(d.throw(l))}catch(y){D(y)}},N=l=>l.done?p(l.value):Promise.resolve(l.value).then(E,g);N((d=d.apply(e,r)).next())});const A="appOqm0oQNWYyP5Kd";function q(e,r,d){return x(this,arguments,function*(p,{limit:D=10,page:E=0},{dataSources:g}){return(yield g.books.api.select("Books",{pageSize:D,view:"Main View"},E)).map(({id:R,fields:_})=>({id:R,name:_.Name,synopsis:_.Synopsis}))})}const Q={Query:{books:q}};var K=Object(t.createModule)({id:"books",typeDefs:[T.a],resolvers:Q}),Y=i(8),w=i.n(Y),H=i(9),X=i(10),j;(function(e){e.TEXT="text",e.MENTION="mention",e.EQUATION="equation"})(j||(j={}));var P;(function(e){e.TITLE="title",e.RICH_TEXT="rich_text",e.NUMBER="number",e.SELECT="select",e.MULTI_SELECT="multi_select",e.DATE="date",e.PEOPLE="people",e.FILE="file",e.CHECKBOX="checkbox",e.URL="url",e.EMAIL="email",e.PHONE_NUMBER="phone_number",e.FORMULA="formula",e.RELATION="relation",e.ROLLUP="rollup",e.CREATED_TIME="created_time",e.CREATED_BY="created_by",e.LAST_EDITED_TIME="last_edited_time",e.LAST_EDITED_BY="last_edited_by"})(P||(P={}));var J=Object.defineProperty,h=Object.getOwnPropertySymbols,L=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable,C=(e,r,d)=>r in e?J(e,r,{enumerable:!0,configurable:!0,writable:!0,value:d}):e[r]=d,W=(e,r)=>{for(var d in r||(r={}))L.call(r,d)&&C(e,d,r[d]);if(h)for(var d of h(r))B.call(r,d)&&C(e,d,r[d]);return e},G=(e,r)=>{var d={};for(var p in e)L.call(e,p)&&r.indexOf(p)<0&&(d[p]=e[p]);if(e!=null&&h)for(var p of h(e))r.indexOf(p)<0&&B.call(e,p)&&(d[p]=e[p]);return d},M=(e,r,d)=>new Promise((p,D)=>{var E=l=>{try{N(d.next(l))}catch(y){D(y)}},g=l=>{try{N(d.throw(l))}catch(y){D(y)}},N=l=>l.done?p(l.value):Promise.resolve(l.value).then(E,g);N((d=d.apply(e,r)).next())});const V="9e64c3a89a9f4f858d5ab1674109cf7d",z={__resolveType:e=>Object(X.pascalCase)(e.type)};function $(e,r,d){return M(this,arguments,function*(p,D,{dataSources:E}){const N=yield E.notion.api.databases.retrieve({database_id:V});return{id:N.id,object:N.object,created_time:N.created_time,last_edited_time:N.last_edited_time,title:N.title,properties:N.properties}})}function Z(e,r,d){return M(this,arguments,function*(p,{start_cursor:D,page_size:E=100},{dataSources:g}){const l=yield g.notion.api.databases.query({database_id:V});return{totalCount:0,edges:l.results.map(y=>({node:{id:y.id,object:y.object,properties:Object.entries(y.properties).map(R=>{var[_,ae]=R,U=ae,{id:te,type:de}=U,re=G(U,["id","type"]);return W({id:te,name:_,type:de},re)})},cursor:y.id})),pageInfo:{endCursor:l.next_cursor,hasNextPage:l.has_more}}})}var ee={JSONObject:H.GraphQLJSONObject,RichTextTypeEnum:j,PropertyTypeEnum:P,AnyText:z,Query:{projectsDatabase:$,projects:Z}},ne=Object(t.createModule)({id:"projects",dirname:__dirname,typeDefs:[w.a],resolvers:ee});const ie=Object(t.createApplication)({modules:[K,ne]}).createSchemaForApollo();new n.ApolloServer({schema:ie,dataSources:b,tracing:!0,plugins:[Object(u.ApolloServerPluginUsageReportingDisabled)()]}).listen().then(({url:e})=>{console.log(`\u{1F680}  Server ready at ${e}`)})}]);

//# sourceMappingURL=server.js.map