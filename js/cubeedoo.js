/*
 * This is the JavaScript for the interaction and front-end
 * Original author: Justin Lowery
 */

(function ($) {

	var slideContainer = document.getElementById('slide-container'), // the game's screens container
		cardList = document.getElementById('card-list'), // The card container
		buttons = $('.btn'), // grab all buttons
		gameClock = document.getElementById('game-clock'),
		currentScreen,
		timeSetting = 120, // default timer setting
		seconds = timeSetting, // assign to a mutable var
		sec, // used in countDown function for setInterval
		flips = 0, // keeps track of flip count
		score = 0, // keeps track of matched pairs
		numberOfCards = 16,
		shapeTypes = ['heart', 'clubs', 'spades', 'diamonds'];

	// This creates the card containers and fronts
	// The rest of the card backs are created by randomizeCards()
	function makeCards(num) {

		var card = '<li class="card-container unmatched" data-value="">' +
						'<ul class="card">' +
							'<li class="face front">' +
								'<a class="front-style icon-cube"></a>' +
							'</li>' +
							'<li class="face back">' +
								'<a class="back-style"></a>' +
							'</li>' +
						'</ul>' +
					'</li>';

		// TODO: We should probably create the node first,
		// build it, then prepend it to the DOM
		for (var i = 0; i < num; i++) {

			$(cardList).prepend(card);
		}
	}

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// This randomizes the card backs
	function randomizeCards() {

		var cardBacks = $(cardList).find('.back-style'),
			cardNumbers = [],
			card,
			arrayOfTypes = shapeTypes,
			type,
			randNum,
			className,
			x,
			y,
			z;

		// Build the array of types, should be four of each type
		for (x = 0; x < 3; x++) {

			arrayOfTypes = arrayOfTypes.concat(shapeTypes);
		}

		// Create an array of numbers to represent DOM element position
		for (y = 0; y <= (numberOfCards - 1); y++) {

			cardNumbers.push(y);
		}

		// Now we start assigning a card type to a random DOM node that
		// represents a card for however many cards were needed
		for (z = 0; z < numberOfCards; z++) {

			// Grab a random digit between 0 and the number of
			// remaining positions
			randNum = getRandomInt(0, (cardNumbers.length -1));

			// Remove the random number from the array, so it can't
			// be used again and store it
			card = cardNumbers.splice(randNum, 1);

			// Grab a type from the shape type array
			type = arrayOfTypes[z];

			// Create the class for the card's style
			className = 'icon-' + type;

			// Assign the class and the data attr to the DOM element
			$(cardBacks[card]).addClass(className).attr('data-card-type', type);
		}
	}

	// This is the timer function
	function countDown() {

		// This removes each second from the timer
		function oneDown () {

			if (seconds > 0) {

				seconds--;

				gameClock.innerText = seconds;

			} else {

				clearInterval(sec);

				// Once it gets to zero, stop clock and change
				// state.
				$(gameClock).attr('data-state', 'stop').
					removeClass('icon-pause').
					addClass('icon-stop');

				// Return timer back to original seconds
				seconds = timeSetting;
			}
		};

		// Run the oneDown function initially
		oneDown();

		// Run the oneDown function every second
		sec = setInterval(oneDown, 1000);
	}

	// This function tests the two cards to see if they are
	// a match
	function testMatch(card) {

		var flippedCards = $('.flip'),
			card1 = $(flippedCards[0]).find('.back-style').attr('data-card-type'),
			card2 = $(flippedCards[1]).find('.back-style').attr('data-card-type');

		// If they match
		if (card1 === card2) {

			// Adding the class clear turns the invisible
			flippedCards.addClass('clear').removeClass('unmatched');

			// Flip them back over
			$('.card-container').removeClass('flip');

			// Add one to the match score; 8 = win
			score++;

			console.log(score);

		} else {

			// Flip them over to be reused
			$('.card-container').removeClass('flip');
		}

		// Test to see if this is the last match
		if (score === 8) {

			cardList.innerHTML = "<h2>Congratulations: You've won!</h2>";
			clearInterval(sec);
		}
	}

	// Flip card function
	function flipCard(card) {

		var $card = $(card); // Store as jQuery object

		// Test to how many cards are flipped and the state
		// of the card clicked
		if ($card.hasClass('flip') && flips < 2) {

			// If a flipped card is clicked and it's there is
			// only one card flipped, do nothing

		} else if (flips < 2) {

			// If a non-flipped card is clicked and there is
			// only one card flipped, then flip clicked card
			flips++;
			$card.toggleClass('flip');

		} else {

			// If there is 2 cards flipped, test to see if
			// they match
			testMatch($card);

			// return flips to zero to start over
			flips = 0;
		}
	}

	// This just flashes a UI element for attention
	function flashElement(that) {

		// Make element's background white
		$(that).addClass('flash');

		// function to remove added class
		function now() {

			$(that).removeClass('flash');
		}

		// Wait 250 seconds and then run the function
		// to remove the added class
		window.setTimeout(now, 250);
	}

	// This is a function that adds all the click functionality
	// to all the buttons with event delegation
	$(slideContainer).on('click', buttons, function (e) {

		// Grab the assigned action and/or state of the button
		// This is assigned in the HTML
		var action = $(e.target).attr('data-action'),
			state = $(e.target).attr('data-state');

		// Test to see if there was a data-action
		if (action != null) {

			// If there was, then that means move to the
			// assigned screen
			$(slideContainer).removeClass(currentScreen).
				addClass(action);

			// Assign current screen to var
			currentScreen = action;

		} else if (e.target.id === 'game-clock') {

			// If button doesn't have data-action, then it
			// test to see if it is the game clock

			// If it is, change the back button to Restart to
			// communicate action if button is clicked
			$('#game-options').text('Restart');

			// Test to see if the state of the game
			if (state === 'start') {

				// If not started, start the timer
				countDown(seconds);

				// Change the buttons data and class
				$(e.target).attr('data-state', 'pause').
					removeClass('icon-play').
					addClass('icon-pause');

			} else if (state === 'pause') {

				// If it's started, pause it
				clearInterval(sec);

				// Change button accordingly
				$(e.target).attr('data-state', 'start').
					removeClass('icon-pause').
					addClass('icon-play');

			} else {

				// If the timer has run out, and the user
				// clicks the button, do nothing
			}
		}

		// Test to see if user clicked the play button
		if (action === 'play-screen') {

			// If so, clear the "card table"
			cardList.innerHTML = '';

			// Make the cards
			makeCards(numberOfCards);

			// Now randomize the faces of the cards
			randomizeCards();

			// Clear any running timers
			clearInterval(sec);

			// Ensure timer button is set to start
			$(gameClock).text('Start').
				attr('data-state', 'start').
				removeClass('icon-pause').
				addClass('icon-play');

			// Set back button to back
			$('#game-options').text('Back');

			// Reset seconds to original setting
			seconds = timeSetting;
		}
	});

	// Click event for flipping a card
	$(cardList).on('click', '.card-container', function () {

		// Test to see if the timer is started
		if ($(gameClock).attr('data-state') === 'pause') {

			// If it is, then flip card
			flipCard(this);

		} else {

			// If it isn't, flash timer button
			flashElement(gameClock);
		}
	});

}(jQuery));
