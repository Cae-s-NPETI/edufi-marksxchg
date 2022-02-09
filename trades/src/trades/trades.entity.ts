import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToOne, JoinColumn, BaseEntity, PrimaryColumn } from "typeorm";

@Entity({ name: "trades" })
export class Trade extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    authorId: number;

    @CreateDateColumn({ type: "timestamp" })
    dateCreated: Date;

    @UpdateDateColumn({ type: "timestamp" })
    dateModified: Date;

    @Column()
    offerTokenType: string;

    @Column()
    returnTokenType: string;

    @Column()
    offerTokenQuantity: number;

    @Column()
    returnTokenQuantity: number;

    @Column()
    message: string;

    /**
     * Update both trade quantities due to fufilment
     */
    applyFufil(trade: Trade) {
        let leftoverOffer = 0;
        let leftoverReturn = 0;

        this.offerTokenQuantity -= trade.returnTokenQuantity;
        trade.returnTokenQuantity = 0;
        if (this.offerTokenQuantity < 0) {
            // refund the difference
            trade.returnTokenQuantity = -this.offerTokenQuantity;
            this.offerTokenQuantity = 0;
        }

        this.returnTokenQuantity -= trade.offerTokenQuantity;
        trade.offerTokenQuantity = 0;
        if (this.returnTokenQuantity < 0) {
            // refund the difference
            trade.offerTokenQuantity = -this.returnTokenQuantity;
            this.returnTokenQuantity = 0;
        }
    }
}

@Entity({ name: "trades_ongoing" })
export class OngoingTrade extends BaseEntity {
    @PrimaryColumn()
    tradeId: number;

    @OneToOne(type => Trade)
    @JoinColumn({ name: 'trade_id' })
    trade: Trade
}

/**
 * An archive of a trade transaction made.
 */
@Entity({ name: "trades_old" })
export class OldTrade extends BaseEntity {
    @PrimaryColumn()
    tradeAuthorId: number;
    @PrimaryColumn()
    tradeFulfilId: number;

    @OneToOne(type => Trade)
    @JoinColumn({ name: 'trade_author_id' })
    tradeAuthor: Trade

    @OneToOne(type => Trade)
    @JoinColumn({ name: 'trade_fulfil_id' })
    tradeFulfil: Trade

    @CreateDateColumn({ type: "timestamp" })
    dateFulfilled: Date;
}
