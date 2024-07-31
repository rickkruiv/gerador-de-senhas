// Seleção
const openGeneratePassButton = document.querySelector('#generate-password');
const generatedPassElement = document.querySelector('#generated-password');

// seleção novas funções
const generatOptions = document.querySelector('#generate-options');
const createPass = document.querySelector('#create-password');
const passwordLength = document.querySelector('#lenght');
const lettersInput = document.querySelector('#letters');
const numbersInput = document.querySelector('#numbers');
const symbolsInput = document.querySelector('#symbols');

// Gerar numeros, simbolos e letras
const getLetterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}; // Minuscula

const getLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}; // Maiuscula

const getNumbers = () => {
    return Math.floor(Math.random() * 10);
}; // Números

const getSymbols = () => {
    const symbols = "()&*%$#@!^;:{}[]_+=-^~.<>/?°";
    return symbols[Math.floor(Math.random() * symbols.length)];
}; // Simbolos

// Funções

const generatePassword = (length) => {
    const generators = [];

    if (lettersInput.checked) {
        generators.push(getLetterLowerCase, getLetterUpperCase);
    }
    
    if (numbersInput.checked) {
        generators.push(getNumbers)
    }
    
    if (symbolsInput.checked) {
        generators.push(getSymbols)
    }

    if (generators.length === 0) {
        return '';
    }

    let password = '';

    for (i = 0; i < length; i++) {
        const randomGenerators = generators[Math.floor(Math.random() * generators.length)];
        password += randomGenerators();
    };

    return password;
};

// click to copy func
const copyGeneratedPassword = async (textCopied) => {
    const textCopiedValue = textCopied;
    generatedPassElement.classList.add('copied');

    setTimeout(() => {
        generatedPassElement.classList.remove('copied');
    }, 1000);


    try {
        await navigator.clipboard.writeText(textCopiedValue);
    } catch (err) {
        console.error("Failed to copy:", err);
    };

};

// Eventos
openGeneratePassButton.addEventListener('click', () => {
    generatOptions.classList.toggle('hide')
});

createPass.addEventListener('click', (e) => {
    const securePass = generatedPassElement.querySelector('h4');
    generatedPassElement.style.display = 'block';
    securePass.innerText = generatePassword(passwordLength.value)
})

generatedPassElement.addEventListener('click', () => {
    const textCopied = generatedPassElement.querySelector('h4')
    copyGeneratedPassword(textCopied.innerText)
})

