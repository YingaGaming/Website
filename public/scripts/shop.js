let explains = {
    0: 'Leider kannst du nicht weniger als 5€ spenden',
    6: (val) => {
        return `Das sind ${val/0.05} Center Shocks!`
    },
    45: 'Ein Monat Serverkosten!',
    46: (val) => {
        return `Davon werden ${(val - 45) / 2}€ - ${val/2}€ reinvestiert`
    },
    69: 'Nice.',
    70: (val) => {
        return `Davon werden ${(val - 45) / 2}€ - ${val/2}€ reinvestiert`
    },
    100: 'Ernsthaft? Wow!',
    101: 'Du kannst höchstens 100€ auf einmal spenden',
    420: 'Blaze it!',
    421: 'Du kannst höchstens 100€ auf einmal spenden'
}

function updateExplain(value) {

    value = parseInt(value)

    if (value < 5 || value > 100) {
        document.getElementById('donateSubmit').setAttribute('class', 'btn btn-danger')
    } else {
        document.getElementById('donateSubmit').setAttribute('class', 'btn btn-warning')
    }

    let out = ""

    let parseOut = (ex, val) => {
        if (typeof ex === 'string') {
            return ex
        } else if (typeof ex === 'function') {
            return ex(val)
        }
    }

    if (explains[value]) {
        out = parseOut(explains[value], value)
    } else {
        for (i in explains) {
            i = parseInt(i)
            if (i < value) {
                out = parseOut(explains[i], value)
            }
        }
    }

    document.getElementById('donateExplain').innerHTML = out

}

updateExplain(5)

document.getElementById('donateRange').addEventListener('input', e => {
    let rangeValue = e.target.value

    document.getElementById('donateInput').value = rangeValue
    updateExplain(rangeValue)

})

document.getElementById('donateInput').addEventListener('input', e => {
    let inputValue = e.target.value || 0

    document.getElementById('donateRange').value = inputValue
    updateExplain(inputValue)

})

function showError(message) {
    document.getElementById('errorModalBody').innerHTML = message

    $('#errorModal').modal('show')
}

function order(product, price) {
    let agbButton = document.getElementById('agb-checkbox')
    let usernameField = document.getElementById('username')

    if (!agbButton.checked) {
        showError('Bitte akzeptiere die AGB')
        return
    }

    if (!usernameField.value) {
        showError('Bitte gib deinen Benutzernamen ein')
        return
    }

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.yinga.games/order");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {

        let response = JSON.parse(xhr.responseText)

        switch (xhr.status) {
            case 200:
                window.location.href = response.url
                break;

            default:
                showError(response.error)
                break;
        }
    };

    xhr.send(JSON.stringify({
        product: product,
        price: price,
        username: usernameField.value
    }));

}