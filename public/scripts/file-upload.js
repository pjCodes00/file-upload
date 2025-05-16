
      const chooseFileInput= document.querySelector('.image') 
      const nameInput=  document.querySelector('.name')
      const priceInput=  document.querySelector('.price')  
      const addProductBtn= document.querySelector('.add-btn') 
      const msgCont= document.querySelector('.msg-container')
      const imageBtn= document.querySelector('.image-btn')
      const fileName= document.querySelector('.file-name')

      let image= ''

      async function sendImage(e) {
       addProductBtn.disabled=true
       addProductBtn.innerHTML= 'Please wait for a few minutes...'
       addProductBtn.style.cursor= 'default'
       addProductBtn.style.border= '4px solid red'
        try{
        const imageFile= e.target.files[0]
        const formData= new FormData()
        formData.append('image', imageFile)

        const response= await fetch('/api/v1/products/uploads', {
          method: 'POST',
          body: formData
        })

        if(!response.ok){
          const errData= await response.json()
          throw new Error(errData.msg || 'error occured!')
        }

        const data= await response.json()
        console.log(data)
         image= data.image.src
       
         msgCont.innerHTML= ''
         msgCont.classList.remove('msg-cont')
         addProductBtn.disabled=false
         addProductBtn.innerHTML= 'Add Product'
          addProductBtn.style.cursor= 'pointer'
            addProductBtn.style.border= '4px solid rgb(1, 185, 1)'
        } catch(error) {
          console.log(error)
          msgCont.innerHTML= error.message
          msgCont.classList.add('msg-cont')
        }
      }

      imageBtn.addEventListener('click', () => {
        chooseFileInput.click()
      })


      chooseFileInput.addEventListener('change', (e) => {
        if(chooseFileInput.files.length > 0) {
          fileName.textContent= chooseFileInput.files[0].name
        } else {
          fileName.textContent= 'No file chosen'
        }
        sendImage(e)
      })

      async function addProduct() {
        try{
        const name= nameInput.value 
        const price= Number(priceInput.value) 

        const response= await fetch('/api/v1/products', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({name, price, image})
        })

        if(!response.ok){
         const errData= await response.json()
         throw new Error(errData.msg || 'error occured!')
        } 

        const data= await response.json()
        console.log(data)

       
          msgCont.innerHTML= ''
          msgCont.classList.remove('msg-cont')
        
          window.location.href= 'images-page.html'
        

        } catch(error) {
          console.log(error)

            msgCont.innerHTML= error.message
            msgCont.classList.add('msg-cont')

        setTimeout(() => {
          msgCont.innerHTML= ''
          msgCont.classList.remove('msg-cont')
        }, 2000)
        
        }
       
      }

      addProductBtn.addEventListener('click', () => {
       
        addProduct()
      })

     
    