function load() {
    document.querySelector('.loader').style.display = "flex"
}

function unload() {
    document.querySelector('.loader').style.display = "none"
}

function reset() {
    document.getElementById('name').value = ""
    document.getElementById('text').value = ""
    document.getElementById('mail').value = ""
}

function erase() {
    document.querySelector('.result').innerHTML = ""
}


function sendMail(params) {

    load()
    let tempsParams = {
        from_name: document.getElementById('name').value,
        message: document.getElementById('text').value,
        reply_to: document.getElementById('mail').value
    }
    emailjs.send("service_oit7ngi", "template_brld9db", tempsParams, 'VuS2U-jyV4FhtnHsB')
        .then(() => {
            unload()
            reset()
            document.querySelector('.result').innerHTML = "messsage envoyé"
            setTimeout(erase, 2000)
        })
        .catch(() => {
            unload()
            document.querySelector('.result').innerHTML = "Echec de l'envoi"
            setTimeout(erase, 2000)
        })
}

