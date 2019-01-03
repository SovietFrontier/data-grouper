# data-grouper

This class allows you to group data sets together for ease of use, functionality and data manipulation.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have `core-js/es6/map` at the very least, preferably the entire package. This is because we had issues with backwards compatability when running on older browsers, JFX and the like. The following import is the only dependency in the class.

```typescript
import * as Map from 'core-js/es6/map';
```

### Installing

```
npm i data-grouper
```

## How to Use

Begin with `json` data.
```typescript
let dataIn = 
[{  
    "revenue":75.00,
    "cost":50.00,
    "grossProfit":25.00,
    "staticVariable":"hello"
},
{  
    "revenue":100.50,
    "cost":50.50,
    "grossProfit":50.00,
    "staticVariable":"hello"
}]
```
Make sure you are importing the class within your `.ts` file.
```typescript
import { Grouper } from '../grouper';
```
Set a data set variable of some sort.
```typescript
let dataOut: any;
```
Then call the `grouper` builder class methods.
```typescript
dataOut = new Grouper(dataIn)
  .include('staticVariable')
  .aggSum('revenue', 'cost', 'grossProfit')
  .aggAvg('revenue', 'cost', 'grossProfit')
  .custom('doubleCost', row => ( (row.cost * 2).toFixed(1) )
  .group();
```
Your `dataOut` should now look like this:
```json
[{  
    "revenueSum":175.50,
    "costSum":100.50,
    "grossProfitSum":75.00,
    "revenueAvg":87.75,
    "costAvg":50.25,
    "grossProfitAvg":37.50,
    "staticVariable":"hello",
    "doubleCost":201
}]
```

## Built With

* [Core-Js ES6 Map Polyfill](https://github.com/zloirock/core-js/blob/v2.6.1/modules/es6.map.js) - the only dependency

## Authors

**[SovietFrontier](https://github.com/SovietFrontier)**

**[GregKosmo](https://github.com/GregKosmo)**

See also the list of [contributors](https://github.com/SovietFrontier/grouper/graphs/contributors) who participated in this project.

## License

None

## Acknowledgments

* Thank you to all participating coders.
