


document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.displayscreen img');
    let index = 0;
  
    // Initially show the first image
    images[index].classList.add('active');
  
    setInterval(() => {
      images[index].classList.remove('active');
      index = (index + 1) % images.length;
      images[index].classList.add('active');
    }, 5000); // Change image every 5 seconds
  });