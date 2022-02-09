export class Trade {

    id: number;

    authorId: number;

    dateCreated: Date;

    dateModified: Date;

    offerTokenType: string;

    returnTokenType: string;

    offerTokenQuantity: number;

    returnTokenQuantity: number;

    message: string;
}

/**
 * An archive of a trade transaction made.
 */
export class OldTrade {
    tradeAuthorId: number;
    tradeFulfilId: number;

    tradeAuthor: Trade
    tradeFulfil: Trade

    dateFulfilled: Date;

    authorOfferQuantity: number;
    fufilOfferQuantity: number;
}

type PartialTradeToken = { tokenType: string, quantity: number }
export interface PartialTradeParam {
    offerToken: PartialTradeToken;
    returnToken: PartialTradeToken;
}
