export class ProductDetails {
    
    constructor(prodDetails) {
        this.active = prodDetails.active;
        this.category = prodDetails.category;
        this.categoryRank = prodDetails.categoryRank;
        this.changed = prodDetails.changed;
        this.discount = prodDetails.discount;
        this.division = prodDetails.division;
        this.extAttributes = prodDetails.extAttributes ? prodDetails.extAttributes : {};
        this.imageUrl = prodDetails.imageUrl;
        this.lastChangedTime = prodDetails.lastChangedTime;
        this.merchant = prodDetails.merchant;
        this.newArrival = prodDetails.newArrival;
        this.offerPrice = prodDetails.offerPrice;
        this.productId = prodDetails.productId;
        this.productUrl = prodDetails.productUrl;
        this.salePrice = prodDetails.salePrice;
        this.seoTitle = prodDetails.seoTitle;
        this.title = prodDetails.title;
        this.trendingRank = prodDetails.trendingRank;
        this.trueDiscount = prodDetails.trueDiscount;
    }


}