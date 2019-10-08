import $ from "jquery";
import { ProductDetails } from "../models/product-details";

export class ShopalystServices {

    constructor() {

    }

    fetchProductList(queryParam) {
        let productList = [];

        let initialUrl = "https://api.shortlyst.com/v1/products?index=0&limit=50&q=";
        let otherParams = "&merchantFilter=flipkart&trueDealFilter=false&mode=lite&apikey=";
        let apiKey = "2aac3b7ba599424cad9620fa6449d482"

        let productUrl = initialUrl + queryParam + otherParams + apiKey;
        
        return $.ajax({
            type: "GET",
            url: productUrl,
            dataType: "json"
        });
    }


}