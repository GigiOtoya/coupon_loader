import shoprite from "./shoprite";
import stopandshop from "./stopandshop";

const storeMethods: { [k: string]: () => Promise<void> } = {
  shoprite: shoprite,
  stopandshop: stopandshop,
};

export default storeMethods;
