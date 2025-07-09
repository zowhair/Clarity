// moving svg into separated target text
const allTextSVGs = document.querySelectorAll('[js-text-aim-svg]');

allTextSVGs.length && allTextSVGs.forEach((item, index) => {
    const heading = item.closest('.image-with-text__heading');
    const targetText = heading.querySelector('.clarity-anim__text1');
    console.log({ heading });
    targetText.appendChild(item);
})
document.addEventListener('DOMContentLoaded', function () {
    gsap.registerPlugin(ScrollTrigger);

    // Loop through all svg containers
    document.querySelectorAll("[js-text-aim-svg]").forEach((svgWrapper) => {
        const path = svgWrapper.querySelector("path");
        const length = path.getTotalLength();

        // Set initial state
        gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
        });

        // Animate when in view
        gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: svgWrapper,
                start: "top 80%",   // adjust for when to start (e.g. 80% down the viewport)
                toggleActions: "play none none none",
                once: true          // animation happens only once
            }
        });
    });
})