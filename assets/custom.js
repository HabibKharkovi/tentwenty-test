const getCurrentVariant = (currentProduct) => {
  const result = [];
  let currentVariant;

  const product_json = JSON.parse(currentProduct.querySelector('[js-product-json]').innerHTML);
  const options = currentProduct.querySelectorAll('[js-swatch-input]:checked');

  options.forEach(e => {
    result.push({
      value: e.value,
      index: e.dataset.optionIndex
    })
  })

  product_json.variants.forEach(variant => {
    const isMatch = result.every(({value, index}) => {
      return variant[index] === value;
    });
    if(isMatch){
      currentVariant = variant
    }
  })
    
  return currentVariant;
}

const updateAddToCartButtonText = (variant, productWrapper) => {
  const addToCartTextTag = productWrapper.querySelector('[js-add-to-cart-text]');
  if(variant.available){
    addToCartTextTag.innerHTML = "Add To Cart";
    addToCartTextTag.parentElement.removeAttribute('disabled')
  } else {
    addToCartTextTag.innerHTML = "Sold Out";
    addToCartTextTag.parentElement.setAttribute('disabled', 'disabled')
  }
}

const updateItemCountTag = () => {
  fetch('/cart.js', { 
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
  .then(response => response.json())
  .then(function(data) { 
    document.querySelector('[js-item-count]').innerHTML = data.item_count;
  })
}

updateItemCountTag();


const switchInput = document.querySelectorAll('[js-swatch-input]');

switchInput.forEach(function(input){
  input.addEventListener('change', function(e){
    e.target.closest('[js-selector-wrapper]').querySelectorAll('[js-swatch-btn]').forEach(btn => {
      btn.classList.remove('selected');
    })
    e.target.nextElementSibling.classList.add('selected');

    const currentProductWrapper = e.target.closest('[js-product]');
    const currentVariant = getCurrentVariant(currentProductWrapper);
    const selectTag = currentProductWrapper.querySelector('select');
    selectTag.value = currentVariant.id

    updateAddToCartButtonText(currentVariant, currentProductWrapper);

  }) 

})


const addToCartBtns = document.querySelectorAll('[js-add-to-cart]');

addToCartBtns.forEach(ctaBtn => {
  ctaBtn.addEventListener('click', function(e){
    e.preventDefault();
  
    const selectField = e.target.closest('[js-product]').querySelector('select');  
    const selectedVariantId = selectField.value;

    const data = {
      "id": parseInt(selectedVariantId),
      "quantity": 1
    }

    fetch('cart/add.js', {  
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    .then(response => response.json())
    .then(function(data) { 
      document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="success-add-to-cart">Product Added Successfuly</div>')
      updateItemCountTag();
      setTimeout(() => {
        document.querySelector('.success-add-to-cart').remove()
      }, 4000)
    })
    .catch(err => {
      document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="fail-add-to-cart">Something going wrong</div>')
      setTimeout(() => {
        document.querySelector('.fail-add-to-cart').remove()
      }, 4000)
    })
  
  })
})




new Swiper('[js-marquee]', {
  spaceBetween: 40,
  speed: 6000,
  autoplay: {
    delay: 1,
  },
  loop: true,
  slidesPerView:'auto',
  allowTouchMove: false,
  disableOnInteraction: true
});

const blogSwiper = new Swiper ('[js-blog-sliding-banner]', {
    slidesPerView: 3.2,
    spaceBetween: 20,
    navigation: {
      nextEl: ".arrow-left",
      prevEl: ".arrow-right"
    },
    breakpoints: {
        320: {
            slidesPerView: 1.2
        },
        990: {
            slidesPerView: 2.2,
        },
      },
});

const sliderFeaturedCollection = new Swiper("[js-featured-collection-slider]", {
  spaceBetween: 30,
  loop: false,
  slidesPerView: 4.2,
  breakpoints: {
    320: {
      spaceBetween: 10,
      slidesPerView: 1.2
    },
    480: {
        spaceBetween: 15,
        slidesPerView: 2.3
    },
    768: {
        slidesPerView: 3.3,
        spaceBetween: 15,
    },
    990: {
        spaceBetween: 20,
        slidesPerView: 3.3,
    },
    1200: {
        spaceBetween: 20,
        slidesPerView: 4.3,
    },
    1281:{
        spaceBetween: 30,
    }
    },
  navigation: {
      nextEl: "#arrowNext",
      prevEl: "#arrowPrev",
    }
});

var categorySlider = new Swiper("[js-catagory-slider]", {
  slidesPerView: 5.2,
  loop: false,
  breakpoints: {
      320: {
        slidesPerView: 1.17,
        spaceBetween: 10,
      },
      480: {
          spaceBetween: 15,
          slidesPerView: 2.18
      },
      768: {
          slidesPerView: 3.3,
          spaceBetween: 15,
      },
      990: {
          slidesPerView: 4.4,
          spaceBetween: 20,
      },
      1200: {
        spaceBetween: 20,
      },
      1280: {
          spaceBetween: 30,
      },
    },
  navigation: {
      nextEl: "#nextArrow",
      prevEl: "#prevArrow",
    }
})