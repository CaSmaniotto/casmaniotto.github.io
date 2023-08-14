const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
const alertas = document.querySelectorAll('#alerta');
const email = document.getElementById('email');
const numero = document.getElementById('numero');
const checkbox = document.getElementById('checkbox');
const enviar = document.getElementsByClassName('enviar');
const checkmarks = document.querySelectorAll('.checkmark');
const targetDivs = document.querySelectorAll('.complementos');
const valoresSelecionados = [];

// Valida os inputs
const validateInputs = (input, index) => {
    if (input.value.trim() === '') {
        alertas[index].style.display = 'inline'; // Mostra o span de aviso correspondente
        alertas[index].innerHTML = 'This field is required';
        input.style.borderColor = 'hsl(354, 84%, 57%)';
        return false;
    } else {
        alertas[index].style.display = 'none';   // Esconde o span de aviso
        input.style.borderColor = 'hsl(243, 100%, 62%)';
        return true;
    }
}
inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        validateInputs(input, index);
    });
});


// Verifica se o email é valido
const checkEmail = () => {
    var validRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.value.match(validRegex)) {
        alertas[1].style.display = 'inline';
        alertas[1].innerHTML = 'Invalid email address';
        return false
    } else {
        alertas[1].style.display = 'none';
        return true;
    }
}
email.addEventListener('input', checkEmail);

// Verifica se o número de telefone é valido
const checkTelefone = () => {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if ((!numero.value.match(re)) || numero.value.length != 10) {
        alertas[2].style.display = 'inline';
        alertas[2].innerHTML = 'Invalid telephone number';
        return false
    } else {
        alertas[2].style.display = 'none';
        return true
    }
}
numero.addEventListener('input', checkTelefone);

// Valida o formulário
enviar[0].addEventListener('click', () => {

    // Verifica seus os inputs estão preenchidos
    for (let index = 0; index < inputs.length; index++) {
        const input = inputs[index];
        if (!validateInputs(input, index)) {
            return false;
        }
    }

    // Verifica se o email e o telefone são validos
    if (!checkEmail() || !checkTelefone()) {
        return false
    }
    return nextPrev(1);

})

// Navega para a próxima tab ou para a anterior
var current = 0;

const nextPrev = (n) => {
    var indices = document.querySelectorAll('.indice');
    var tabs = document.querySelectorAll('.main');

    // Verifique se o valor de 'current + n' está dentro dos limites das guias.
    if (current + n < 0 || current + n >= tabs.length) {
        return;
    }
    tabs[current].style.display = 'none';
    indices[current].classList.remove('focused');
    current += n;

    tabs[current].style.display = 'flex';
    indices[current].classList.add('focused');

    document.getElementById('btn-back').style.display = current === 0 ? 'none' : 'block';
}

// Exibe o texto ao clicar no checkbox e vice-versa
checkbox.addEventListener('change', () => {
    const yearlyElements = document.querySelectorAll('#yearly');
    var mSpam = document.getElementsByClassName('monthly');
    var ySpam = document.getElementsByClassName('year');
    var total = document.getElementById('total');
    var tipo = document.getElementById('toggle');

    total.innerHTML = checkbox.checked ? "Total (per year)" : "Total (per month)";
    tipo.innerHTML = checkbox.checked ? " (Yearly)" : " (Monthly)";

    const elementsToUpdate = document.querySelectorAll("#valor, #price, #preco-plano");

    elementsToUpdate.forEach((element) => {
        const originalValue = element.textContent;
        const convertedValue = convertCurrency(originalValue);
        element.textContent = convertedValue;
    });

    atualizarValor()

    // Muda a cor da div fora da checkbox
    yearlyElements.forEach(index => {
        if (checkbox.checked) {
            ySpam[0].style.color = "hsl(213, 96%, 18%)"; //azul
            mSpam[0].style.color = "hsl(231, 11%, 63%)"; //cinza
            index.style.display = 'block';
        } else {
            ySpam[0].style.color = "hsl(231, 11%, 63%)";
            mSpam[0].style.color = "hsl(213, 96%, 18%)";
            index.style.display = 'none';
        }
    });
});

// Oculta o botão de voltar
document.addEventListener('DOMContentLoaded', () => {
    if (current == 0) {
        document.getElementById('btn-back').style.display = 'none'
    }
});

// Seleciona uma opção e desseleciona as outras -- step2 --
let selectedButton = null;

const selectButton = (buttonIndex) => {
    const buttons = document.querySelectorAll('.plano');
    const id_plano = document.getElementById('plano')
    const preco_plano = document.getElementById('preco-plano')

    buttons.forEach((button, index) => {
        if (index + 1 === buttonIndex) {
            id_plano.innerHTML = buttons[buttonIndex - 1].querySelector('div span#sub').getAttribute('value')
            preco_plano.textContent = buttons[buttonIndex - 1].querySelector('div span#valor').textContent
            button.classList.add('selected');
            selectedButton = button;
        } else {
            button.classList.remove('selected');
        }
    });
}

// Atualiza os valores da step 4 caso o checkbox seja ticado, vice-versa
const atualizarValor = () => {
    const spans = document.querySelectorAll('#valoresContainer span');

    spans.forEach(span => {
        const valorPadrao = span.textContent;
        const numericValue = parseFloat(valorPadrao.replace(/[^\d.]/g, ""));
        const valorConvertido = checkbox.checked ? numericValue * 10 : numericValue / 10; // Use 'numericValue' em vez de 'valorConvertido'
        const currencySymbol = checkbox.checked ? "/yr" : "/mo";

        const valorFinal = valorPadrao
            .replace(/[0-9.]+/g, valorConvertido)
            .replace(/\/.*/, currencySymbol);

        span.textContent = valorFinal; // Atualizar o texto do span com o valor final
    });
}

// Exibe a informação quando marcada
const criarSpan = (valor) => {
    const spansContainer = document.getElementById('spansContainer');
    const span = document.createElement('span');
    span.textContent = valor;
    spansContainer.appendChild(span);
}

// Exclue a informação quando desmarcada
const removerSpan = (valor) => {
    const spans = document.querySelectorAll('#spansContainer span');
    spans.forEach(span => {
        if (span.textContent === valor) {
            span.remove();
        }
    });
}

// Exibe o valor quando marcado
const criarValor = (valor) => {
    const valoresContainer = document.getElementById('valoresContainer');
    const span = document.createElement('span');
    if (checkbox.checked) {
        span.textContent = "+$" + valor * 10 + "/yr";
    } else {
        span.textContent = "+$" + valor + "/mo";
    }
    span.setAttribute('id', 'spanValor');
    valoresContainer.appendChild(span);
}

// Exclue o valor quando desmarcada
const removerValor = (valor) => {
    const spans = document.querySelectorAll('#valoresContainer span');
    if (valor >= 0 && valor < spans.length) {
        spans[valor].remove();
    } else {
        console.log("Índice fora dos limites.");
    }
}

// Step 3 - Quando selecionado, muda a cor da div externa
targetDivs.forEach((targetDiv, index) => {
    const elementos = document.querySelectorAll('#price');
    const x = elementos[index].textContent.match(/\d+/);
    const y = targetDiv.getAttribute('value');
    const par = { nome: y, valor: x[0] };

    targetDiv.addEventListener('click', () => {
        const checkmark = checkmarks[index];

        if (!checkmark.checked) {
            checkmark.checked = true;
            targetDiv.classList.add('ticado');
            valoresSelecionados.push(par);
            criarSpan(par.nome);
            criarValor(par.valor);
        } else {
            checkmark.checked = false;
            targetDiv.classList.remove('ticado');
            const indexToRemove = valoresSelecionados.findIndex(item => item.nome === par.nome);

            if (indexToRemove !== -1) {
                valoresSelecionados.splice(indexToRemove, 1);
                removerSpan(par.nome);
                removerValor(indexToRemove);
            }
        }
    });
});


// Ao clicar na div o checkmark é ticado e vice-versa
checkmarks.forEach((checkmark, index) => {
    checkmark.addEventListener('change', () => {
        const targetDiv = targetDivs[index];
        if ((!checkmark.checked) || (!targetDiv.classList.contains('ticado'))) {
            checkmark.checked = !checkmark.checked;
            targetDiv.classList.add('ticado');
        } else {
            checkmark.checked = !checkmark.checked;
            targetDiv.classList.remove('ticado');
        }
    });
});

// Converte os valores de monthly para yearly
const convertCurrency = (valueText) => {
    const numericValue = parseFloat(valueText.replace(/[^\d.]/g, ""));
    const convertedValue = checkbox.checked ? numericValue * 10 : numericValue / 10;
    const currencySymbol = checkbox.checked ? "/yr" : "/mo";
    return valueText.replace(/[0-9.]+/g, convertedValue).replace(/\/.*/, currencySymbol);
}

// Step 4 - Cal
const calcularTotal = () => {
    const valores = document.querySelectorAll("#preco-plano, #spanValor");
    const total = document.getElementById('span-total');

    let soma = 0;

    valores.forEach((valor) => {
        const originalValue = valor.textContent;
        const numericValue = parseFloat(originalValue.replace(/[^\d.]/g, ""));
        soma += numericValue;
    });
    const currencySymbol = checkbox.checked ? "/yr" : "/mo";
    total.textContent = '$' + soma + currencySymbol; // Atualize o texto do total com o valor final
}