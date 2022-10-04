export default function getDeleteAnimations(index, deleteIndex, transition, cardHeights) {
  let animation
  if (index === deleteIndex && transition) {
    animation = {
      transform: 'translateX(-100vw)',
      transition: 'transform 1s'
    }
  }
  if (index > deleteIndex && transition && deleteIndex !== null) {
    animation = { transform: `translateY(${-1 * cardHeights[deleteIndex] - 18}px)`,
      transition: 'transform 1s'
    }
  }
  return animation
}