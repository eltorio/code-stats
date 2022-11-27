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

## basic Callback usage
```ts
    const onComplete = (count:GlobalResults)=>{
        console.log(count)
    }
    LineCount.countLinesCb("src",onComplete);
```

## license
Without any form of… Provide as-is… 
Under MIT License.  