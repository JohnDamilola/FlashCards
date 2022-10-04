export default function getSlideAnimation(transition) {
  if (transition === 'transition-next') {
    return ' slide slideOutLeft'
  }
  if (transition === 'next') {
    return ' slide slideInLeft'
  }
  if (transition === 'transition-prev') {
    return ' slide slideOutRight'
  }
  if (transition === 'prev') {
    return ' slide slideInRight'
  }
  return ''
}
