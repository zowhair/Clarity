if (!customElements.get("parallax-section")) {
    customElements.define(
        "parallax-section",
        class Parallax extends HTMLElement {
            constructor() {
                super();
                this.images = this.querySelectorAll(".parallax__img");
            }

            connectedCallback() {
                this.init();
            }

            decorateImages() {
                const listItems = this.querySelectorAll(".parallax__gallery__item");
                listItems.forEach((item, index) => {
                    const image = item.querySelector(".parallax__img");
                    const isOdd = index % 2 === 0;

                    image.classList.add(`parallax__img--${isOdd ? "odd" : "even"}`);
                    item.classList.add(isOdd ? "odd" : "even"); // <-- This line adds layout class
                });
            }


            rotateOnScroll() {
                const { images } = this;
                const maxRotation = parseInt(this.dataset.rotation, 10) || 5;

                let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

                document.addEventListener("scroll", function () {
                    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const scrollingDown = currentScrollTop > lastScrollTop;
                    lastScrollTop = currentScrollTop;

                    images.forEach((image) => {
                        const imageRect = image.getBoundingClientRect();
                        const windowHeight = window.innerHeight;

                        if (imageRect.top < windowHeight && imageRect.bottom > 0) {
                            let visiblePart = windowHeight - imageRect.top;
                            let visiblePercent = (visiblePart / windowHeight) * 100;
                            let rotationDegree = Math.min((visiblePercent / 100) * maxRotation, maxRotation);

                            // Reverse for odd images
                            if (image.classList.contains("parallax__img--odd")) {
                                rotationDegree *= -1;
                            }

                            // Change direction based on scroll
                            if (!scrollingDown) {
                                rotationDegree *= -1; // Invert rotation when scrolling up
                            }

                            window.requestAnimationFrame(() => {
                                image.style.transform = `translate3d(0, 0, 0) rotate(${rotationDegree}deg)`;
                            });
                        }
                    });
                });
            }


            init() {
                this.decorateImages();
                this.rotateOnScroll();
            }
        }
    );
}