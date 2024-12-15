
const cs = `{
    "caput_mortuum":{
       "DEFAULT":"#562c2c",
       "100":"#110909",
       "200":"#221111",
       "300":"#321a1a",
       "400":"#432323",
       "500":"#562c2c",
       "600":"#874545",
       "700":"#b16868",
       "800":"#cb9a9a",
       "900":"#e5cdcd"
    },
    "cinnabar":{
       "DEFAULT":"#f2542d",
       "100":"#360d03",
       "200":"#6b1b07",
       "300":"#a1280a",
       "400":"#d7360e",
       "500":"#f2542d",
       "600":"#f47656",
       "700":"#f79880",
       "800":"#fabaab",
       "900":"#fcddd5"
    },
    "wheat":{
       "DEFAULT":"#f5dfbb",
       "100":"#4b330b",
       "200":"#976617",
       "300":"#df9826",
       "400":"#eabb71",
       "500":"#f5dfbb",
       "600":"#f7e6ca",
       "700":"#f9ecd7",
       "800":"#fbf2e4",
       "900":"#fdf9f2"
    },
    "dark_cyan":{
       "DEFAULT":"#0e9594",
       "100":"#031e1e",
       "200":"#063c3c",
       "300":"#085a5a",
       "400":"#0b7777",
       "500":"#0e9594",
       "600":"#14d5d5",
       "700":"#41eded",
       "800":"#80f3f3",
       "900":"#c0f9f9"
    },
    "caribbean_current":{
       "DEFAULT":"#127475",
       "100":"#041717",
       "200":"#072d2e",
       "300":"#0b4445",
       "400":"#0e5a5c",
       "500":"#127475",
       "600":"#1cb1b4",
       "700":"#3bdee0",
       "800":"#7ce9eb",
       "900":"#bef4f5"
    }
 }`
 const rangePallete = ["DEFAULT", "100", "200", "300", "400", "500", "600", "700", "800", "900"] as const;
 const arrType= ["caput_mortuum", "cinnabar", "wheat", "dark_cyan", "caribbean_current"] as const
 const colorPallete: Record<typeof arrType[number], {[key in typeof rangePallete[number]]: string}> = JSON.parse(cs);

 export default colorPallete;