export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    let productItem = {
      product,
      count: 1
    };

    let findResult = this.cartItems.find((item) =>
      (item.product.id == product.id)
    );

    if (findResult) {
      findResult.count += 1;
    } else {
      this.cartItems.push(productItem);
    }

    if (!this.cartItems.length) {
      this.cartItems.push(productItem);
    }

    this.onProductUpdate(this.cartItem);
  }

  updateProductCount(productId, amount) {
    let selectedProduct = this.cartItems.find((item) =>
      (item.product.id == productId)
    );

    if (amount > 0) {
      selectedProduct.count += 1;
    }
    if (amount < 0) {
      selectedProduct.count -= 1;
    }
    this.cartItems = this.cartItems.filter(item => (item.count >= 1));

    this.onProductUpdate(this.cartItem);
  }

  isEmpty() {
    if (!this.cartItems.length) {
      return true;
    } else {
      return false;
    }
  }

  getTotalCount() {
    let totalCount = this.cartItems.reduce((value, item) => {
      return item.count + value;
    }, 0);
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = this.cartItems.reduce((value, item) => {
      return (item.count * item.product.price) + value;
    }, 0);
    return totalPrice;
  }

  onProductUpdate() {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
