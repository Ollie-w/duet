//Do it as an Ajax post (not get).  If you just post back to the order confirmation page with inputs:
//a) action=feedback
//b) o=123456 [the order number]
//c) f=urlencode(the content of the feedback)

//Then I can make the page send the email when it’s called in that action=feedback mode

const myForm = document.getElementById('feedback-form')

myForm.addEventListener('submit', evt => {
  const data = new FormData(myForm)

  evt.preventDefault()

  fetch('confirmation.asp', {
    method: 'POST',
    body: data
  })
})