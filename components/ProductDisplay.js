app.component('product-display',{
    props:{
        premium:{
            type: Boolean,
            required: true
        }
    },
    template:
     /*html */
    `      <div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <!-- image goes here -->
             <img 
              v-bind:src="image"
              :class = "[inStock ? ''  : 'out-of-stock-img' ]"
              >
             <a v-bind:href="url">Google</a>
          </div>
          <div class="product-info">
            <h1>{{brand + ' '+ product }}</h1>
            <p>{{ description }}</p>
            <!-- <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out</p>
            <p v-else>Out of Stock</p> -->
            <!-- <p v-show="inStock">In Stock</p> -->

            <!-- <p v-if="onSale">On Sale</p>
            <p v-else>NoStock</p> -->
            <p>{{ saleMsg }}</p>

            <p>Shipping: {{ shipping }}</p>

            <product-details :details="details"></product-details>

            <h2>Colors</h2>
            <div 
              v-for="(variant, index) in variants" 
              :key="variant.id" 
              @mouseover="updateVariant(index)"
              class = "color-circle"
              :class = "[isActive ? activeClass : '']"
              :style="{background:variant.color}">

            </div>
            <h2>Sizes</h2>
            <div v-for="size in sizes">{{size}}</div>
            <!--v-on:click -> evento que escuchamos , cart += 1 -> expression que activa el evento -->
            <button 
            class="button" 
            :class="{disabledButton: !inStock}"
            v-on:click="addToCart" 
            :disabled="!inStock" 
            >Add to Cart</button>
            <button class="button" v-on:click="deleteFromCart">Delete from Cart</button>
          </div>
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
      </div>`,
          data(){
        return{
            product: 'socks',
            brand: 'Vue mastery',
            description: 'This is a pair of blue socks',
            selectedVariant: 0,
            url: 'https://www.google.com',
            inventory: 0,
            onSale:true,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                {id:2234,color:'green', image: './assets/images/socks_green.jpg',quantity: 50},
                {id:2235,color:'blue', image: './assets/images/socks_blue.jpg', quantity: 0},
            ],
            sizes:['small','medium','large'],
            isActive: true,
            reviews: []
        }
    },
    methods: {
        addToCart(){
            this.$emit('add-to-cart',this.variants[this.selectedVariant].id)
        },
        deleteFromCart(){
            this.$emit('remove-from-cart',this.variants[this.selectedVariant].id)
        },
        updateVariant(index){
            this.selectedVariant = index
        },
        addReview(review){
            this.reviews.push(review)
        }
    },
    computed: {
        title(){
            return this.brand + ' ' + this.product
        },
        image(){
            return this.variants[this.selectedVariant].image
        },
        inStock(){
            return this.variants[this.selectedVariant].quantity
        },
        saleMsg(){
            return this.onSale ? `${this.brand} ${this.product} is on sale` : ''
        },
        shipping(){
            if(this.premium){
                return 'Free'
            }
            return 2.99
        }
    }
})