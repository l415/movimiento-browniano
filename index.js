window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const squareSize = 10;
    const numSquares = 20;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const squares = [];

    // Atractor de Cantor
    const cantorAttractor = {
        x: centerX,
        y: centerY,
        strength: 0.01, // Intensidad del atractor
        attract: function (square) {
            const dx = this.x - square.x;
            const dy = this.y - square.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const forceX = dx / distance * this.strength;
            const forceY = dy / distance * this.strength;
            square.x += forceX;
            square.y += forceY;
        }
    };

    // Función para encontrar el cuadro más cercano
    function findNearestSquare(currentSquare, squares) {
        let nearestSquare = null;
        let minDistance = Infinity;

        squares.forEach(square => {
            if (square !== currentSquare) {
                const dx = currentSquare.x - square.x;
                const dy = currentSquare.y - square.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < minDistance) {
                    minDistance = distance;
                    nearestSquare = square;
                }
            }
        });

        return nearestSquare;
    }

    // Función para seguir el camino de otros cuadros
    function followSquarePath(currentSquare, nearestSquare) {
        if (nearestSquare) {
            const dx = nearestSquare.x - currentSquare.x;
            const dy = nearestSquare.y - currentSquare.y;
            const angle = Math.atan2(dy, dx);
            const stepSize = Math.random() * 3;

            const newX = currentSquare.x + Math.cos(angle) * stepSize;
            const newY = currentSquare.y + Math.sin(angle) * stepSize;

            currentSquare.x = newX;
            currentSquare.y = newY;
        }
    }

    function drawSquare(square) {
        context.fillRect(square.x, square.y, squareSize, squareSize);
    }

    function moveSquares() {
        squares.forEach(square => {
            const angle = Math.random() * 2 * Math.PI;
            const stepSize = Math.random() * 5;

            const newX = square.x + Math.cos(angle) * stepSize;
            const newY = square.y + Math.sin(angle) * stepSize;

            square.x = newX;
            square.y = newY;

            // Aplicar el atractor de Cantor
            cantorAttractor.attract(square);

            // Encontrar el cuadro más cercano y seguir su camino
            const nearestSquare = findNearestSquare(square, squares);
            followSquarePath(square, nearestSquare);
        });
    }

    function drawSquares() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        squares.forEach(square => {
            drawSquare(square);
        });
    }

    function initializeSquares() {
        const startX = (canvas.width - squareSize * numSquares) / 2;
        const startY = (canvas.height - squareSize * numSquares) / 2;

        for (let i = 0; i < numSquares; i++) {
            for (let j = 0; j < numSquares; j++) {
                const x = startX + i * squareSize;
                const y = startY + j * squareSize;

                squares.push({ x, y });
            }
        }
    }

    initializeSquares();

    function animate() {
        moveSquares();
        drawSquares();
        requestAnimationFrame(animate);
    }

    animate();
});
