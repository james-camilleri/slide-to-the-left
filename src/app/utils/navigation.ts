export function getNextSlide(e: KeyboardEvent, currentSlide: number, numberOfSlides: number) {
  switch (e.key) {
    // Next slide.
    case 'ArrowRight':
      return currentSlide + 1

    // Previous slide.
    case 'ArrowLeft':
      return currentSlide - 1

    // First slide.
    case 'Home':
      return 0

    // Last slide.
    case 'End':
      return numberOfSlides - 1

    // Jump backward.
    case 'PageUp':
      return currentSlide - 10

    // Jump forward.
    case 'PageDown':
      return currentSlide + 10
  }
}
