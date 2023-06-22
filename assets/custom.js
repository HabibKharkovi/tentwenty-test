const mySwiper = new Swiper ('[js-sliding-banner]', {
    loop: true, 
    slidesPerView: 'auto',
    spaceBetween: 40,
    autoplay: {
        delay: 3000,
      },
});

//blog slider

const blogSwiper = new Swiper ('[js-blog-sliding-banner]', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    // navigation arrows
   
    navigation: {
          nextEl: ".arrow-left",
          prevEl: ".arrow-right"
        }
});