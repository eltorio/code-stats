# Simple tool for counting lines of code in project
This utility is developped for internal use.  
Feel free to use it but there is strictly no support.  

## basic Promise usage
```ts
import { LineCount,GlobalResults } from "@sctg/code-stats";
LineCount.countLines("src").then((results: GlobalResults) => {
  console.log(results);
});
```
multiple directories
```ts
import { LineCount,GlobalResults } from "@sctg/code-stats";
LineCount.countLines(["dirA","dirB"]).then((results: GlobalResults) => {
  console.log(results);
});
## basic Callback usage
```ts
    const onComplete = (count:GlobalResults)=>{
        console.log(count)
    }
    LineCount.countLinesCb("src",onComplete);
```
multiple directories
```ts
    const onComplete = (count:GlobalResults)=>{
        console.log(count)
    }
    LineCount.countLinesCb(["dirA","dirB"],onComplete);
```

## static stats usage
```ts
import {LineCount} from "@sctg/code-stats"

const results = await LineCount.countLines(['src','functions'])
fs.writeFile(
  "./src/config/codeStats.json",
  JSON.stringify(results),
  "utf8",
  function (err) {
    if (err) return console.log(err);
  }
);
```
sample output
```json
{
    "undefined": {
        "files": 53,
        "lines": null,
        "codeLines": null
    },
    "Vue": {
        "files": 61,
        "lines": 6839,
        "codeLines": 6532
    },
    "Stylesheets": {
        "files": 14,
        "lines": 189,
        "codeLines": 155
    },
    "Typescript": {
        "files": 34,
        "lines": 3369,
        "codeLines": 2957
    },
    "Json": {
        "files": 26,
        "lines": 1532,
        "codeLines": 1531
    }
}
```
## license
Without any form of… Provide as-is… 
Under MIT License.  