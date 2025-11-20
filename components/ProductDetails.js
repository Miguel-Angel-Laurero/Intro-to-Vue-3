app.component('product-details',{
     props:{
        details:{
            type: Array,
            required: true
        }
    },
    template:
    /*html */
    `
    <h2>Details</h2>
            <ul>
              <li v-for="detail in details">{{detail}}</li>
            </ul>
    `
})