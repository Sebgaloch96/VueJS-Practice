Vue.component('product', {
props: {
  premium: {
    type: Boolean,
    required: true
  }
},
template: `    
<div class="product">

  <div class="product-image">
    <img v-bind:src="image">
  </div>

  <div class="product-info">

    <h1>{{ title }}</h1>
    <p v-if="inStock">In Stock</p>
    <p v-else>Out of Stock</p>
    <p>Shipping: {{ shipping }}</p>

    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>

    <div v-for="(variant, index) in variants" 
        :key="variant.id" 
        class="color-box"
        :style="{ backgroundColor: variant.color }"
        @mouseover="updateProduct(index)">
    </div>

    <button v-on:click="addToCart" 
        :disabled="!inStock" 
        :class="{ disabledButton: !inStock }">
      Add to Cart
    </button>

  </div>
  
</div>`,

  data() {
    return {
      brand: 'Gucci',
      product: 'Socks',
      selectedVariant: 0,
      details: [
        '80% Cotton',
        '20% Polyester',
        'Gender-neutral'
      ],
      variants: [
        {
          id: 101,
          color: 'green',
          image: 'greensocks.jpg',
          quantity: 5
        },
        {
          id: 102,
          color: 'blue',
          image: 'bluesocks.jpg',
          quantity: 10
        }
      ]
    }
  },
  methods: {
    addToCart: function () {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
      this.variants[this.selectedVariant].quantity -= 1;
    },
    updateProduct: function (index) {
      this.selectedVariant = index;
      console.log(index);
    }
  },
  computed: {
    title: function () {
      return this.brand + ' ' + this.product;
    },
    image: function () {
      return this.variants[this.selectedVariant].image;
    },
    inStock: function () {
      return this.variants[this.selectedVariant].quantity;
    },
    shipping: function () {
      if(this.premium)
        return "Free";
      else
        return "2.99";
    }
  }
});

var app = new Vue({
  el: '#app',
  data: {
    premium: false,
    cart: []
  },
  methods: {
    updateCart: function(id) {
      this.cart.push(id)
    }
  }
});