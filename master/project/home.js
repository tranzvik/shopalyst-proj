import { MDCList } from '@material/list';
import { ShopalystServices } from "./service/shopalyst-service";
import { ProductDetails } from "./models/product-details";
import ko from "knockout";
import $ from "jquery";

new MDCList(document.querySelector('.mdc-list'));

function customerViewModel() {
    var self = this;
    this.itemToSearch = ko.observable("");
    this.fullProductList = ko.observableArray([]);
    this.previewImageLink = ko.observable("");
    this.previewImageTitle = ko.observable("");
    this.sortOptions = ko.observableArray(['Low-High-OfferPrice', 'High-Low-OfferPrice', 'High-Low-Discount']);
    this.selectedSortOption = ko.observable('Choose one...');


    this.searchProduct = function () {
        $('.s131').hide();
        (document.getElementById('search-bar')).style.display = "block";
        self.fullProductList.removeAll();
        let shopalystService = new ShopalystServices();
        let ProprodListPromise = shopalystService.fetchProductList(self.itemToSearch());
        let productList = [];
        ProprodListPromise.done((response) => {
            response.productList.forEach(element => {
                let product = new ProductDetails(element)
                productList.push(product);
            });
            ko.utils.arrayPushAll(self.fullProductList, productList);
            self.fullProductList.notifySubscribers();
            $('.product-list-content').show();
            $('.pagination-footer').show();
        }).fail(() => {
            console.error("API FAILED");
        });

    }.bind(this);

    this.sortProduct = ko.computed(function () {

        switch (self.selectedSortOption()) {
            case 'High-Low-OfferPrice': self.fullProductList().sort((product1, product2) => product2.offerPrice - product1.offerPrice);
                break;
            case 'Low-High-OfferPrice': self.fullProductList().sort((product1, product2) => product1.offerPrice - product2.offerPrice);
                break;
            case 'High-Low-Discount': self.fullProductList().sort((product1, product2) => product2.discount - product1.discount);
                break;
        }
        self.fullProductList.notifySubscribers();
    });

    this.previewProduct = function (data) {
        self.previewImageLink(data.imageUrl);
        self.previewImageTitle(data.title);
        let modal = document.getElementById("myModal");
        modal.style.display = "block";
    }

    this.closePreview = function () {
        let modal = document.getElementById("myModal");
        modal.style.display = "none";
    }

    this.switchProductView = function (ui, event) {
        if (event.currentTarget.id == 'listview') {
            $('#listview').children("img").attr("src", "./assets/list-view-active.png");
            $('#gridview').children("img").attr("src", "./assets/grid-view.png");
            $('.product-content-container').addClass('product-content-container__list-mode');
            $('.product-card').addClass('product-card__list-mode');
            $('.product-card__list-mode').removeClass('product-card');
           
        }
        else {
            $('#gridview').children("img").attr("src", "./assets/grid-view-active.png");
            $('#listview').children("img").attr("src", "./assets/list-view.png");
            $('.product-content-container').removeClass('product-content-container__list-mode');
            $('.product-card__list-mode').addClass('product-card');
            $('.product-card').removeClass('product-card__list-mode');
            
        }
    }

    //Pagination Code
    this.pageNumber = ko.observable(0);
    this.nbPerPage = 16;

    this.totalPages = ko.computed(function () {
        var div = Math.floor(self.fullProductList().length / self.nbPerPage);
        div += self.fullProductList().length % self.nbPerPage > 0 ? 1 : 0;
        return div - 1;
    });

    this.paginatedProductList = ko.computed(function () {
        var first = self.pageNumber() * self.nbPerPage;
        return self.fullProductList.slice(first, first + self.nbPerPage);
    });

    this.hasPrevious = ko.computed(function () {
        return self.pageNumber() !== 0;
    });

    this.hasNext = ko.computed(function () {
        return self.pageNumber() !== self.totalPages();
    });

    this.next = function () {
        if (self.pageNumber() < self.totalPages()) {
            self.pageNumber(self.pageNumber() + 1);
        }
    }

    this.previous = function () {
        if (self.pageNumber() != 0) {
            self.pageNumber(self.pageNumber() - 1);
        }
    }

    this.goToFirst = function () {
        if (self.pageNumber() != 0) {
            self.pageNumber(0);
        }
    }

    this.goToLast = function () {
        if (self.pageNumber() != self.totalPages()) {
            self.pageNumber(self.totalPages());
        }
    }

    this.getCurrentPageNo = function (ui) {
        return "Current Page:" + Number(ui + 1);
    };

}


$(document).ready(function () {
    ko.applyBindings(new customerViewModel());
});