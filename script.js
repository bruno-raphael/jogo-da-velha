const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const xWinsElem = document.getElementById('xWins');
const oWinsElem = document.getElementById('oWins');
const drawsElem = document.getElementById('draws');
const resetButton = document.getElementById('resetButton');
const changeNamesButton = document.getElementById('changeNamesButton');
const playerXInput = document.getElementById('playerX');
const playerOInput = document.getElementById('playerO');
const startButton = document.getElementById('startButton');
const nameEntry = document.getElementById('nameEntry');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = false;
let xWins = 0;
let oWins = 0;
let draws = 0;
let playerXName = 'Jogador X';
let playerOName = 'Jogador O';

// Função para atualizar o status do jogo
function updateStatus() {
    if (checkWin()) {
        status.textContent = `${currentPlayer === 'X' ? playerXName : playerOName} venceu!`;
        if (currentPlayer === 'X') xWins++;
        else oWins++;
        updateScoreboard();
        isGameActive = false;
        return;
    }
    if (board.every(cell => cell !== '')) {
        status.textContent = 'Empate!';
        draws++;
        updateScoreboard();
        isGameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `${currentPlayer === 'X' ? playerXName : playerOName}, é sua vez!`;
}

// Função para verificar se há um vencedor
function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Função para atualizar o placar
function updateScoreboard() {
    xWinsElem.textContent = xWins;
    oWinsElem.textContent = oWins;
    drawsElem.textContent = draws;
}

// Função para lidar com o clique em uma célula
function handleClick(event) {
    const index = Array.from(cells).indexOf(event.target);

    if (board[index] || !isGameActive) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    updateStatus();
}

// Função para reiniciar o jogo
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    status.textContent = `${playerXName}, é sua vez!`;
    isGameActive = true;
}

// Função para alterar os nomes dos jogadores
function changeNames() {
    playerXName = playerXInput.value.trim() || 'Jogador X';
    playerOName = playerOInput.value.trim() || 'Jogador O';
    status.textContent = `${currentPlayer === 'X' ? playerXName : playerOName}, é sua vez!`;
}

// Função para iniciar o jogo
function startGame() {
    playerXName = playerXInput.value.trim() || 'Jogador X';
    playerOName = playerOInput.value.trim() || 'Jogador O';
    status.textContent = `${currentPlayer === 'X' ? playerXName : playerOName}, é sua vez!`;
    nameEntry.classList.add('hidden'); // Esconde a seção de nomes
    isGameActive = true;
}

// Adiciona os ouvintes de evento para as células
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
changeNamesButton.addEventListener('click', () => {
    nameEntry.classList.remove('hidden'); // Mostra a seção de nomes
    playerXInput.value = playerXName;
    playerOInput.value = playerOName;
});
startButton.addEventListener('click', startGame);
