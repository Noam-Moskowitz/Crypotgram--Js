const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const answer = '';
let selectedHistory = [];
const screen = document.getElementById('screen');
let selected = screen;
let errors = 0;
let restartBtn = document.createElement('button');
const hiddenInput = document.getElementById(`focused-element`);

//envokes keyboard on mobile

const getRandomQuote = () => {
    const randomNum = Math.floor(Math.random() * quoteBank.length + 1)
    return quoteBank[randomNum]
}

const resortArray = () => {
    abc.sort(() => { return 0.5 - Math.random() });
    return abc
}

const createBoard = (quote, resortedArr) => {
    let words = quote.split(' ');

    for (word of words) {
        let parentDiv = document.createElement('div');
        parentDiv.classList.add('word-container')
        screen.appendChild(parentDiv);
        for (letters of word.toLowerCase()) {
            let div = document.createElement('div');
            div.classList.add('letter-container')
            let h6 = document.createElement('h6')
            h6.textContent = letters
            h6.classList.add('hide')
            div.appendChild(h6)
            parentDiv.appendChild(div)
            let letterIndex = resortedArr.indexOf(letters)
            let p = document.createElement('p');
            p.textContent = letterIndex;
            div.appendChild(p);
        }
        let space = document.createElement('div');
        space.classList.add('space');
        space.textContent = `space`;
        screen.appendChild(space);
    }
    letterContainers = document.querySelectorAll(`.letter-container`);
    //Reveal random letters on board
    for (let i = 0; i <= (letterContainers.length / 2) + 2; i++) {
        randomContainer = Math.floor(Math.random() * letterContainers.length);
        letterContainers[randomContainer].firstChild.classList.remove('hide');
        letterContainers[randomContainer].firstChild.classList.add('show');
    }
}



const controller = () => {
    let answer = getRandomQuote();
    let sortedArray = resortArray()
    createBoard(answer, sortedArray)
}
controller();

//Select where to type
screen.addEventListener('click', (event) => {
    if (event.target.className == 'letter-container') {
        selected.classList.remove('selected')
        selected = event.target
        selected.classList.add('selected')
        hiddenInput.style.visibility = 'visible';
        hiddenInput.focus({ preventScroll: true });
    }
});


document.addEventListener('keyup', (event) => {
    if (abc.indexOf(event.key) !== -1) {
        if (event.key === selected.firstChild.textContent) {
            selected.firstChild.classList.remove('hide');
            selected.firstChild.classList.add('show');
            selected.classList.remove('selected');
            selectedHistory.push(selected);
            selected = selected.nextSibling;
        } else {
            errors++
            document.getElementById(`error${errors}`).style.backgroundColor = `red`;
        }
        checkWinOrLose();

    }
    if (event.key == 'ArrowRight') {
        selected.classList.remove('selected');
        selectedHistory.push(selected);
        selected = selected.nextSibling;
    } else if (event.key == 'ArrowLeft') {
        selected.classList.remove('selected')
        selectedHistory.push(selected);
        selected = selected.previousSibling;
    }
    if (selected === null) {
        let lastElementInArray = selectedHistory[selectedHistory.length - 1];
        selected = lastElementInArray.parentElement.nextSibling.firstChild;
        if (selected.textContent == "space") {
            if (selected === screen.lastChild.firstChild) {
                selected = screen.firstElementChild.firstElementChild;
            } else {
                selected = selected.parentElement.nextSibling.firstChild;
            }
        }
    }
    selected.classList.add('selected');
});

restartBtn.addEventListener('click', () => {
    window.location.reload()
})

// Win--Lose arguments
const checkWinOrLose = () => {
    if (errors >= 5) {
        displayWinOrLose(`Defeat`)
    }
    const hideClass = document.querySelectorAll('.hide')
    if (hideClass.length === 0) {
        displayWinOrLose(`Victory`)
    }
}

const displayWinOrLose = (status) => {
    const banner = document.querySelector(`.win-loss-banner`);
    let h1 = document.createElement('h1');
    h1.textContent = status
    let p = document.createElement('p');
    if (status == 'Victory') {
        p.textContent = `You solved the Cryptogram`
    } else {
        p.textContent = `You ran out of guesses`
    }
    banner.appendChild(h1);
    banner.appendChild(p);
    restartBtn.textContent = `Restart`
    banner.appendChild(restartBtn);
    banner.style.display = `flex`;
};
