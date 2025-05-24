  const videoIcon = document.querySelector('.fa-file-video');
    const modal = document.querySelector('.modal');
    const video = document.querySelector('.tutorial-video');
    const closeBtn = document.querySelector('.close-btn');
 
 videoIcon.addEventListener('click', () => {
      modal.style.display= 'flex'
      video.play()
    })

    closeBtn.addEventListener('click', () => {
      modal.style.display='none'
      video.pause()
      video.currentTime= 0
    })

    window.addEventListener('click', (e) => {
      if(e.target === modal) {
        modal.style.display = 'none'
        video.pause()
        video.currentTime= 0
      }
    })

   
