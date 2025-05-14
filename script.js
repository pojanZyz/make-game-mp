    document.addEventListener('DOMContentLoaded', () => {
      const board = document.getElementById('board');
      const currentPlayerDisplay = document.getElementById('currentPlayer');
      const resetButton = document.getElementById('resetButton');
      
      let currentPlayer = 'X';
      let gameState = ['', '', '', '', '', '', '', '', ''];
      let gameActive = true;
      
      // Membuat papan permainan
      function initializeBoard() {
        board.innerHTML = '';
        for (let i = 0; i < 9; i++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.setAttribute('data-index', i);
          cell.addEventListener('click', handleCellClick);
          board.appendChild(cell);
        }
      }
      
      // Menangani klik sel
      function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
        
        // Jika sel sudah terisi atau game tidak aktif, abaikan
        if (gameState[clickedCellIndex] !== '' || !gameActive) return;
        
        // Update game state dan tampilan
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
        
        // Periksa apakah ada pemenang
        checkResult();
      }
      
      // Fungsi untuk memeriksa hasil permainan
      function checkResult() {
        const winningConditions = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8], // baris
          [0, 3, 6], [1, 4, 7], [2, 5, 8], // kolom
          [0, 4, 8], [2, 4, 6]             // diagonal
        ];
        
        let roundWon = false;
        
        // Periksa semua kondisi menang
        for (let i = 0; i < winningConditions.length; i++) {
          const [a, b, c] = winningConditions[i];
          if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') continue;
          
          if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            break;
          }
        }
        
        // Jika ada pemenang
        if (roundWon) {
          gameActive = false;
          Swal.fire({
            title: 'Selamat!',
            text: `Pemain ${currentPlayer} menang!`,
            icon: 'success',
            confirmButtonText: 'Main Lagi'
          }).then((result) => {
            if (result.isConfirmed) {
              resetGame();
            }
          });
          return;
        }
        
        // Jika seri
        if (!gameState.includes('')) {
          gameActive = false;
          Swal.fire({
            title: 'Permainan Seri!',
            text: 'Tidak ada pemenang dalam permainan ini.',
            icon: 'info',
            confirmButtonText: 'Main Lagi'
          }).then((result) => {
            if (result.isConfirmed) {
              resetGame();
            }
          });
          return;
        }
        
        // Ganti pemain
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerDisplay.textContent = currentPlayer;
      }
      
      // Fungsi untuk mereset permainan
      function resetGame() {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayerDisplay.textContent = currentPlayer;
        document.getElementById('gameInfo').innerHTML = 'Giliran pemain: <span id="currentPlayer">X</span>';
        initializeBoard();
      }
      
      // Event listener untuk tombol reset
      resetButton.addEventListener('click', resetGame);
      
      // Inisialisasi papan saat pertama kali dimuat
      initializeBoard();
    });