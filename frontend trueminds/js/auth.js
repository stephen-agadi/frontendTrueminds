let logInLink = document.querySelector('.logInLink')
let signUpLink = document.querySelector('.signUpLink')

let logIn = document.querySelectorAll('.logIn')
let signUp = document.querySelectorAll('.signUp')


logInLink.addEventListener('click', () => {
    logIn.forEach(el => {
        el.style.display = 'block'
    })

    signUp.forEach(el => {
        el.style.display = 'none'
    })
})

signUpLink.addEventListener('click', () => {
    signUp.forEach(el => {
        el.style.display = 'block'
    })

    logIn.forEach(el => {
        el.style.display = 'none'
    })
})