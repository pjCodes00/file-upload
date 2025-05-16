const successMsg= document.querySelector('.success-msg') 

      async function renderProducts() {
        const response= await fetch('/api/v1/products')
        const data= await response.json()
        console.log(data)

        const products= data.products

        let html= ''
        products.forEach((product) => {
          html += `
          <div class="grid-box">
            <div class="image-cont">
              <img src="${product.image}">
            </div>
            <div class="details-cont">
              <p>${product.name}</p>
              <p>$${product.price}</p>
               <div class="trash-cont"><i class="fa-solid fa-trash" data-product-id="${product._id}"></i></div>
            </div>   
          </div>`
        })

        document.querySelector('.grid-cont').innerHTML= html

        const deleteBtns= document.querySelectorAll('.fa-trash')

        deleteBtns.forEach((deleteBtn) => {
          deleteBtn.addEventListener('click', () => {
            const productId= deleteBtn.dataset.productId

            deleteProduct(productId)
          })
        })

      } 

      renderProducts()

      let timeoutId;
      async function deleteProduct(productId) {
        try{
         const response= await fetch(`/api/v1/products/${productId}`, {
          method: 'DELETE'
        })

        const data= await response.json()
        console.log(data)
        await renderProducts()  

        clearTimeout(timeoutId)
        
         successMsg.style.display= 'flex'

       timeoutId= setTimeout(() => {
           successMsg.style.display= 'none'
        }, 2000)

        } catch(error) {
         console.log(error)
        }
       
      } 
    