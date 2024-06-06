import { ServerRespond } from './DataStreamer';

//Properties to be captured by the Grapgh
export interface Row {
  timestamp: Date,
  ratio: number,
  price_abc: number,
  price_def: number,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined
}

//Get price of stock by computing average of top ask and top bid
function computeAverage(datapoint: ServerRespond) {
  const average = (datapoint.top_ask.price + datapoint.top_bid.price) / 2
  return average;
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    const price_abc = computeAverage(serverResponds[0]);
    const price_def = computeAverage(serverResponds[1]);
    const ratio = price_abc / price_def
    const upper_bound = 1 + 0.05
    const lower_bound = 1 - 0.05

    return {
      timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp, 
      //set timestamp if timestamp of stock abc is greater than def or vice versa
      trigger_alert: (ratio < lower_bound || ratio > upper_bound) ?  ratio : undefined, 
      //Trigger alert is ratio is greater than upper bound or less than lower bound
      upper_bound, 
      lower_bound,
      price_abc,
      price_def,
      ratio
    };
  }
}
