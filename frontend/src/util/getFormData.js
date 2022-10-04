export default function (target) {
  const formData = new FormData(target)
  const newCard = {}
  for (let pair of formData.entries()) {
    newCard[pair[0]] = pair[1]
  }
  return newCard
}
