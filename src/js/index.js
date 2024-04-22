// Бегущая строка
document.addEventListener("DOMContentLoaded", function () {
	const runningLines = document.querySelectorAll('.running-line__text');

	function moveLine(runningLine) {
		const containerWidth = runningLine.parentElement.offsetWidth;
		let position = containerWidth;

		function frame() {
			if (position === -runningLine.offsetWidth) {
				position = containerWidth;
			} else {
				position--;
				runningLine.style.left = position + 'px';
			}
			requestAnimationFrame(frame);
		}

		frame();
	}

	runningLines.forEach(function(runningLine) {
		moveLine(runningLine);
	});
});

// Карусель "Этапы"
document.addEventListener("DOMContentLoaded", function() {
  const prevButton = document.querySelector(".carousel__prev");
  const nextButton = document.querySelector(".carousel__next");
  const slides = document.querySelector(".steps__list");
  const dotsContainer = document.querySelector(".carousel__dots");
  const slidesArray = Array.from(document.querySelectorAll(".steps__list-item"));
  let slideIndex = 0;

  slidesArray.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("carousel__dot");
    if (index === 0) dot.classList.add("carousel__dot--active");
    dotsContainer.appendChild(dot);
    dot.addEventListener("click", () => {
      showSlide(index);
    });
  });

  function showSlide(index) {
    slideIndex = index;
    const slideWidth = slidesArray[0].offsetWidth + 20;
    slides.style.transform = `translateX(calc(-${slideWidth * index}px))`;
    updateDots();
    updateArrows();
  }

  function updateDots() {
    const dots = document.querySelectorAll(".carousel__dot");
    dots.forEach((dot, index) => {
      if (index === slideIndex) {
        dot.classList.add("carousel__dot--active");
      } else {
        dot.classList.remove("carousel__dot--active");
      }
    });
  }

  function updateArrows() {
    if (slideIndex === 0) {
      prevButton.classList.add("carousel__arrow--disabled");
      nextButton.classList.remove("carousel__arrow--disabled");
    } else if (slideIndex === slidesArray.length - 1) {
      nextButton.classList.add("carousel__arrow--disabled");
      prevButton.classList.remove("carousel__arrow--disabled");
    } else {
      prevButton.classList.remove("carousel__arrow--disabled");
      nextButton.classList.remove("carousel__arrow--disabled");
    }
  }

  nextButton.addEventListener("click", () => {
    if (slideIndex < slidesArray.length - 1) {
      slideIndex++;
      showSlide(slideIndex);
    }
  });

  prevButton.addEventListener("click", () => {
    if (slideIndex > 0) {
      slideIndex--;
      showSlide(slideIndex);
    }
  });

  let touchStartX = 0;
  let touchEndX = 0;

  slidesArray.forEach(slide => {
    slide.addEventListener("touchstart", (event) => {
        touchStartX = event.touches[0].clientX;
    });

    slide.addEventListener("touchmove", (event) => {
        touchEndX = event.touches[0].clientX;
    });

    slide.addEventListener("touchend", () => {
        let diffX = touchStartX - touchEndX;

        if (diffX > 0) {
            showNextSlide();
        } else {
            showPrevSlide();
        }

        touchStartX = null;
        touchEndX = null;
    });
});

  function showPrevSlide() {
    if (slideIndex > 0) {
      slideIndex--;
      showSlide(slideIndex);
    }
  }

  function showNextSlide() {
    if (slideIndex < slidesArray.length - 1) {
      slideIndex++;
      showSlide(slideIndex);
    }
  }

  updateArrows();
});

// Карусель "Участники"
document.addEventListener("DOMContentLoaded", function() {
	const carousel = document.querySelector(".carousel-repeat");
	const prevButton = carousel.querySelector(".carousel-repeat__prev");
	const nextButton = carousel.querySelector(".carousel-repeat__next");
	const slides = carousel.querySelector(".players__list");
	const numbers = carousel.querySelector(".carousel-repeat__numbers");
	const slidesArray = Array.from(carousel.querySelectorAll(".players__list-item"));
	const slideWidthMob = slidesArray[0].offsetWidth + 32; 
	const slideWidthPc = slidesArray[0].offsetWidth + 20;

	let slideIndex = 0;
	let timerId;

	function updateCarousel() {
		const slideWidth = window.innerWidth >= 1200 ? slideWidthPc : slideWidthMob;
		slides.style.transform = `translateX(-${slideWidth * slideIndex}px)`;
		updateNumbers();
	}

	function showNextSlide(direction) {
		if (direction === 'next') {
			slideIndex = (slideIndex + (window.innerWidth >= 1200 ? 3 : window.innerWidth >= 768 ? 2 : 1)) % slidesArray.length;
	} else if (direction === 'prev') {
			slideIndex = (slideIndex - (window.innerWidth >= 1200 ? 3 : window.innerWidth >= 768 ? 2 : 1) + slidesArray.length) % slidesArray.length;
	}
		updateCarousel();
	}

	function updateNumbers() {
		const totalSlides = slidesArray.length;
		let currentSlide;

		if (window.innerWidth >= 1200) {
			currentSlide = (slideIndex + 3) % totalSlides || totalSlides;
		} else if (window.innerWidth >= 768) {
			currentSlide = (slideIndex + 2) % totalSlides || totalSlides;
		} else {
			currentSlide = slideIndex + 1;
		}

		const numbersHalf = document.createElement("span");
		numbersHalf.classList.add("carousel-repeat__numbers--half");
		numbersHalf.textContent = `/${totalSlides}`;

		numbers.innerHTML = "";
		numbers.textContent = `${currentSlide}`;
		numbers.appendChild(numbersHalf);
	}

	function startAutoScroll() {
		timerId = setInterval(showNextSlide, 4000);
	}

	function stopAutoScroll() {
		clearInterval(timerId);
	}

	startAutoScroll();

	carousel.addEventListener("mouseenter", stopAutoScroll);
	carousel.addEventListener("mouseleave", startAutoScroll);

	updateNumbers();

	let touchStartX;
	let touchEndX;

	slidesArray.forEach(slide => {
    slide.addEventListener("touchstart", (event) => {
        touchStartX = event.touches[0].clientX;
    });

    slide.addEventListener("touchmove", (event) => {
        touchEndX = event.touches[0].clientX;
    });

    slide.addEventListener("touchend", () => {
        let diffX = touchStartX - touchEndX;

        if (diffX > 0) {
            showNextSlide('next');
        } else {
            showNextSlide('prev');
        }

        touchStartX = null;
        touchEndX = null;
    });
});

	nextButton.onclick = function () {
		showNextSlide('next');
	};

	prevButton.onclick = function () {
		showNextSlide('prev');
	}
});