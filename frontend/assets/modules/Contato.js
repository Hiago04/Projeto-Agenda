import validator from "validator";

export default class Contato {
    constructor(form) {
        this.form = document.querySelector(form)
    }

    init() {
        this.events()
    }

    events() {
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e)
        })
    }

    handleSubmit(e) {

        if (!this.validate(e)) e.preventDefault()

    }

    validate(e) {
        if (!this.form) return

        const el = e.target
        let valid = true

        const nome = el.querySelector('input[name="nome"]')
        const sobrenome = el.querySelector('input[name="sobrenome"]')
        const email = el.querySelector('input[name="email"]')
        const telefone = el.querySelector('input[name="telefone"]')

        if (!this.verificaNome(nome)) {
            valid = false;
        }

        if (!this.verificaSobrenome(sobrenome)) {
            valid = false;
        }

        if (!this.verificaRedes(email, telefone)) {
            valid = false
        }

        return valid

    }

    verificaNome(nome) {

        if (nome.value.length < 3 || nome.value.length > 20) {
            alert('Nome precisa conter de 3 a 20 letras')
            return false;
        }

        if (!nome.value.match(/[a-zA-Z]+/g)) {
            alert('Nome precisa conter somente letras')
            return false;
        }


        return true
    }

    verificaSobrenome(sobrenome) {

        if (sobrenome.value) {
            if (sobrenome.value.length < 3 || sobrenome.value.length > 20) {
                alert('Sobrenome precisa conter de 3 a 20 letras')
                return false;
            }

            if (!sobrenome.value.match(/[a-zA-Z]+/g)) {
                alert('Sobrenome precisa conter somente letras')
                return false;
            }


        }


        return true

    }

    verificaRedes(email, tel) {

        if (!email.value && !tel.value) {
            alert('email ou telefone precisa ser adicionado');
            return false
        }

        if (email.value && !validator.isEmail(email.value)) {
            alert('Email inválido')
            return false
        }

        if (tel.value.match(/[a-zA-Z]+/g)) {
            alert('Telefone só pode conter números e símbolos')
            return false;
        }

        return true;
    }

}