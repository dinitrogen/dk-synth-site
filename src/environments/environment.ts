import { config } from "../../clientConfig";

export const environment = {
    stripeKey: config.production.stripeKey,
    baseHref: config.production.baseHref
};
