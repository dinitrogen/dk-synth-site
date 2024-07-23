import { config } from "../../clientConfig";

export const environment = {
    stripeKey: config.development.stripeKey,
    baseHref: config.development.baseHref,
    clientBaseHref: config.development.clientBaseHref
};
