document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('cardContainer');
    const flipCountElement = document.getElementById('flipCount');
    const tickCountElement = document.getElementById('tickCount');
    const crossCountElement = document.getElementById('crossCount');
    const resetBtn = document.getElementById('resetBtn');
    //const flipAllBtn = document.getElementById('flipAllBtn');
    //const closeInfoBtn = document.getElementById('closeInfoBtn');
    //const infoPanel = document.getElementById('infoPanel');
    //const infoSymbol = document.getElementById('infoSymbol');
    //const infoTitle = document.getElementById('infoTitle');
    //const infoImage = document.getElementById('infoImage');
    //const infoText = document.getElementById('infoText');
    //const symbolInfo = document.getElementById('symbolInfo');
    
    let flipCount = 0;
    let tickCount = 0;
    let crossCount = 0;
    let currentCardIndex = -1;
    
    // Animal images with descriptions
    const imageData = [
        {
            url: 'images/big5/lion.jpg',
            title: 'Lion',
            description: 'The majestic king of the jungle, known for its powerful roar and golden mane.'
        },
        {
            url: 'images/big5/buffalo.jpg',
            title: 'Buffalo',
            description: 'A strong and formidable African bovine with impressive curved horns.'
        },
        {
            url: 'images/big5/leopard.jpg',
            title: 'Leopard',
            description: 'A stealthy big cat with beautiful spotted coat, excellent climber and hunter.'
        },
        {
            url: 'images/big5/crocodile.jpg',
            title: 'Crocodile',
            description: 'An ancient reptile with powerful jaws, perfectly adapted for aquatic hunting.'
        },
        {
            url: 'images/big5/eagle.jpg',
            title: 'Eagle',
            description: 'A majestic bird of prey with incredible eyesight and powerful talons.'
        },
        {
            url: 'images/big5/elephant.jpg',
            title: 'Elephant',
            description: 'The largest land animal, known for its intelligence, memory, and social bonds.'
        },
        {
            url: 'images/big5/giraffe.jpg',
            title: 'Giraffe',
            description: 'The tallest land animal with a long neck and distinctive spotted pattern.'
        },
        {
            url: 'images/big5/hippo.jpg',
            title: 'Hippopotamus',
            description: 'A massive semi-aquatic mammal with large tusks and territorial behavior.'
        },
        {
            url: 'images/big5/hyena.jpg',
            title: 'Hyena',
            description: 'A social carnivore known for its distinctive laugh-like vocalizations.'
        },
        {
            url: 'images/big5/impala.jpg',
            title: 'Impala',
            description: 'A graceful antelope known for its incredible leaping ability and speed.'
        },
        {
            url: 'images/big5/jackal.jpg',
            title: 'Jackal',
            description: 'A clever and adaptable canine that often scavenges and hunts in pairs.'
        },
        {
            url: 'images/big5/ostrich.jpg',
            title: 'Ostrich',
            description: 'The world\'s largest bird that cannot fly but runs at incredible speeds.'
        },
        {
            url: 'images/big5/zebra.jpg',
            title: 'Zebra',
            description: 'A striped equine with unique black and white patterns for camouflage.'
        },
        {
            url: 'images/big5/panda.jpg',
            title: 'Panda',
            description: 'A beloved bear with distinctive black and white markings, primarily eats bamboo.'
        },
        {
            url: 'images/big5/rhinoceros.jpg',
            title: 'Rhinoceros',
            description: 'A massive herbivore with thick skin and one or two horns on its snout.'
        },
        {
            url: 'images/big5/tiger.jpg',
            title: 'Tiger',
            title: 'Tiger',
            description: 'The largest cat species with striking orange coat and black stripes.'
        }
    ];
    
    // Animals that get green ticks: lion, buffalo, leopard, elephant, rhino
    const tickAnimals = ['lion', 'buffalo', 'leopard', 'elephant', 'rhinoceros'];
    
    // Create symbols array based on which animals get ticks
    const symbols = imageData.map(animal => 
        tickAnimals.includes(animal.title.toLowerCase()) ? 'tick' : 'cross'
    );
    
    // Shuffle the arrays while keeping symbols and images synchronized
    shuffleArrays(symbols, imageData);
    
    // Create 16 cards
    function createCards() {
        container.innerHTML = '';
        
        for (let i = 0; i < 16; i++) {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.index = i;
            
            const symbol = symbols[i];
            const animal = imageData[i];
            
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        <img src="${animal.url}" alt="${animal.title}">
                    </div>
                    <div class="card-back">
                        <img src="${animal.url}" alt="${animal.title}">
                        <div class="${symbol}">${symbol === 'tick' ? '✓' : '✗'}</div>
                    </div>
                </div>
            `;
            
            card.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                
                if (!this.classList.contains('flipped')) {
                    this.classList.add('flipped');
                    flipCount++;
                    flipCountElement.textContent = flipCount;
                    
                    if (symbol === 'tick') {
                        tickCount++;
                        tickCountElement.textContent = tickCount;
                    } else {
                        crossCount++;
                        crossCountElement.textContent = crossCount;
                    }
                    
                    // Show information panel
                    showCardInfo(index, symbol);
                } else {
                    // If already flipped, just show the info
                    showCardInfo(index, symbol);
                }
            });
            
            container.appendChild(card);
        }
    }
    
    // Show card information in the panel
    function showCardInfo(index, symbol) {
        currentCardIndex = index;
        const animal = imageData[index];
        
        infoSymbol.textContent = symbol === 'tick' ? '✓' : '✗';
        infoSymbol.className = `info-symbol ${symbol}`;
        infoTitle.textContent = animal.title;
        infoImage.src = animal.url;
        infoImage.alt = animal.title;
        infoText.textContent = animal.description;
        
        // Special message for tick cards
        if (symbol === 'tick') {
            symbolInfo.textContent = 'Symbol: Green Tick (Big Five Animal!)';
            symbolInfo.style.background = 'rgba(46, 204, 113, 0.3)';
        } else {
            symbolInfo.textContent = 'Symbol: Red Cross (Not a Big Five animal)';
            symbolInfo.style.background = 'rgba(231, 76, 60, 0.3)';
        }
        
        infoPanel.classList.add('active');
    }
    
    // Close information panel
    function closeInfoPanel() {
        infoPanel.classList.remove('active');
        currentCardIndex = -1;
    }
    
    // Initialize the game
    createCards();
    
    // Reset button functionality
    resetBtn.addEventListener('click', function() {
        flipCount = 0;
        tickCount = 0;
        crossCount = 0;
        flipCountElement.textContent = flipCount;
        tickCountElement.textContent = tickCount;
        crossCountElement.textContent = crossCount;
        
        // Reshuffle the cards
        shuffleArrays(symbols, imageData);
        createCards();
        //closeInfoPanel();
    });
    
    // Flip all cards button functionality
    flipAllBtn.addEventListener('click', function() {
        const cards = document.querySelectorAll('.card');
        let allFlipped = true;
        
        // Check if all cards are already flipped
        cards.forEach(card => {
            if (!card.classList.contains('flipped')) {
                allFlipped = false;
            }
        });
        
        // Flip all cards to the opposite state
        cards.forEach(card => {
            if (allFlipped) {
                card.classList.remove('flipped');
            } else {
                card.classList.add('flipped');
            }
        });
        
        // Update counts
        if (allFlipped) {
            flipCount = 0;
            tickCount = 0;
            crossCount = 0;
        } else {
            flipCount = 16;
            tickCount = 5; // 5 ticks (Big Five animals)
            crossCount = 11; // 11 crosses
        }
        
        flipCountElement.textContent = flipCount;
        tickCountElement.textContent = tickCount;
        crossCountElement.textContent = crossCount;
        
        // Show info for the first card if flipping all
        if (!allFlipped && cards.length > 0) {
            const firstCard = cards[0];
            const index = parseInt(firstCard.dataset.index);
            const symbol = symbols[index];
            showCardInfo(index, symbol);
        } else {
            closeInfoPanel();
        }
    });
    
    // Close info panel button
    closeInfoBtn.addEventListener('click', closeInfoPanel);
    
    // Helper function to shuffle arrays while keeping them synchronized
    function shuffleArrays(symbolsArray, imageDataArray) {
        // Create an array of indices
        const indices = Array.from({length: symbolsArray.length}, (_, i) => i);
        
        // Shuffle the indices
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        
        // Create temporary arrays
        const tempSymbols = [...symbolsArray];
        const tempImages = [...imageDataArray];
        
        // Reassign based on shuffled indices
        for (let i = 0; i < indices.length; i++) {
            symbolsArray[i] = tempSymbols[indices[i]];
            imageDataArray[i] = tempImages[indices[i]];
        }
    }
});