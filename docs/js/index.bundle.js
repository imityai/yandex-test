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

  slides.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
  });

  slides.addEventListener("touchmove", (event) => {
    touchEndX = event.touches[0].clientX;
  });

  slides.addEventListener("touchend", () => {
    if (touchEndX - touchStartX > 50) {
      showPrevSlide();
    } else if (touchStartX - touchEndX > 50) {
      showNextSlide();
    }
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

	function showNextSlide() {
    if (window.innerWidth >= 1200) {
        slideIndex = (slideIndex + 3) % slidesArray.length;
		} else if (window.innerWidth >= 768) {
				slideIndex = (slideIndex + 2) % slidesArray.length;
		}	else {
        slideIndex = (slideIndex + 1) % slidesArray.length;
    }
    updateCarousel();
	}

	function updateCarousel() {
		if (window.innerWidth >= 1200) {
				slides.style.transform = `translateX(-${slideWidthPc * slideIndex}px)`;
		} else {
				slides.style.transform = `translateX(-${slideWidthMob * slideIndex}px)`;
		}
		updateNumbers();
	}

	function updateNumbers() {
    const totalSlides = slidesArray.length;

    if (window.innerWidth >= 1200) {
        const currentSlide = (slideIndex + 3) % totalSlides || totalSlides;
				const numbersHalf = document.createElement("span");
			
        numbersHalf.classList.add("carousel-repeat__numbers--half");
        numbersHalf.textContent = `/${totalSlides}`;

        numbers.innerHTML = "";

        numbers.textContent = `${currentSlide}`;
        numbers.appendChild(numbersHalf);
		} else if (window.innerWidth >= 768) {
				const currentSlide = (slideIndex + 2) % totalSlides || totalSlides;
				const numbersHalf = document.createElement("span");

				numbersHalf.classList.add("carousel-repeat__numbers--half");
				numbersHalf.textContent = `/${totalSlides}`;

				numbers.innerHTML = "";

				numbers.textContent = `${currentSlide}`;
				numbers.appendChild(numbersHalf);
		} else {
				const currentSlide = slideIndex + 1;
				
				numbers.textContent = `${currentSlide}/${totalSlides}`;
    }
	}

	nextButton.addEventListener("click", () => {
			showNextSlide();
	});

	prevButton.addEventListener("click", () => {
    if (window.innerWidth >= 1200) {
        slideIndex = Math.max(0, slideIndex - 3);
		} else if (window.innerWidth >= 768) {
				slideIndex = Math.max(0, slideIndex - 2);
		}	else {
        slideIndex = slideIndex > 0 ? slideIndex - 1 : slidesArray.length - 1;
    }
    updateCarousel();
	});

	function startAutoScroll() {
			timerId = setInterval(() => {
					showNextSlide();
			}, 4000);
	}

	function stopAutoScroll() {
			clearInterval(timerId);
	}

	startAutoScroll();

	carousel.addEventListener("mouseenter", stopAutoScroll);

	carousel.addEventListener("mouseleave", startAutoScroll);

	updateNumbers();

	let touchStartX = 0;
	let touchEndX = 0;

	carousel.addEventListener("touchstart", (event) => {
			touchStartX = event.touches[0].clientX;
	});

	carousel.addEventListener("touchmove", (event) => {
			touchEndX = event.touches[0].clientX;
	});

	carousel.addEventListener("touchend", () => {
			const diffX = touchStartX - touchEndX;
			const threshold = Math.abs(diffX);

			if (threshold > 50) {
					if (diffX > 0) {
							showNextSlide();
					} else {
							slideIndex = slideIndex > 0 ? slideIndex - 1 : slidesArray.length - 1;
							updateCarousel();
					}
			}
	});
});