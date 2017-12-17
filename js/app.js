/*
 * Create a list that holds all of your cards
 */
var symbols = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'];
var deck = $('.deck');
let opened = [];
let cheked = 0;
let resetart = $('.restart');
let numberMatched = $('body .match');
let moves = 0;
let move_element = $('.moves');
let starsNumber = 3;
let staNumber_element = $('.stars-number');
let flag = false;
let timeCounter = 0;
let timeOfFinish = 0;
let endOfGame = false;
let movesCounter = 1;
let first_card = false;


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
shuffle(symbols);
$('.play-again').click(function () {
        reset();
        $('#new-game-modal').modal('hide');
        $('.score-panel').removeClass('remove-panel');

    })
    /*Function For Drwaing Cards with the shuffled icons*/
function DrawCards() {
    shuffle(symbols)
    for (var i = 0; i < symbols.length; i++) {
        deck.append($('<li class="card"><i class="fa fa-' + symbols[i] + '"></i></li>'))
    }

}
/*Calling Function thar reset the game*/
resetart.click(function () {
        reset();
    })
    /*Function Handling Card clicking*/
function displaCards() {
    var is_matched = $(this).hasClass('match');
 
    $('.card').click(function () {
        if (!first_card) {
            first_card = true;
            TimeCounter();
        }
        if (!flag) {
            moves++;
            if ( (moves % 2 == 0 || moves == 2) && !$(this).hasClass('show') ) {

                $('.moves').text(movesCounter++);
            }
        
            if (is_matched) {
                return;
            }
            $('.card.show').css("background-color", "#0faee6;");
            if (opened.length == 2) {
                opened = [];
            }
            stars(moves);
            checkCards($(this));
            gameEnd();
        }
    });


}
/*Function Handling Card checking if matched the cretieria or not*/
function checkCards(card) {
    var card_children;
    var check_has_class;
    opened.push(card.children().context.innerHTML);

    if (cheked >= 0) {

        card.toggleClass("show");
        cheked++
        if (opened[0] == opened[1]) {
            check_has_class = card.hasClass("show");


            if (!check_has_class) {

                open = [];
            } else {
                card_children = $(card).children().attr('class').split(' ')[1];

                $('.' + card_children).parent().addClass('match');
                opened = [];
            }

        } else if (opened[0] != opened[1] && opened.length > 1) {
            $('.card.show').addClass("card-wrong");
            flag = true;
            setTimeout(function () {
                $('.card').removeClass("card-wrong");
                $('.card').removeClass("show");
                flag = false;
            }, 1000);
        }
    } else {
        card.addClass("show");
        $('.card.show').removeClass("show");
        cheked = 0;
        opened = [];
    }

}
/*Function For reset The Game*/
function reset() {
    $('.deck').empty();

    moves = 0;
    timeCounter = 0;
    first_card = false;
    $('.moves').text(0);
    movesCounter = 1;
    $('body .one-star').show();
    $('body .two-star').show();
    $('#timer').text("");
    DrawCards();
    displaCards();


}
/*Function Calculating the stars based on moves*/
function stars(move) {

    if (move >= 17 && move <= 32) {
        $('.stars-number').text(2);
        $('.one-star').hide()
    }
    if (move >= 32 && move < 40) {
        $('.stars-number').text(1);
        $('.two-star').hide()
    }
}
/*Function for detection if game end or not */
function gameEnd() {

    if ($('body .match').length == symbols.length) {
        timeOfFinish = timeCounter;
        $('.score-panel').addClass('remove-panel');
        $('#new-game-modal').modal('show');
        $('.time-finish').text(timeOfFinish);
        $('#timer').text(timeOfFinish);
        first_card=false
        
    }
}

function TimeCounter() {
    if (first_card) {
        $('#timer').text(timeCounter + ":" + "Second");
        timeCounter++;
        setTimeout(function () {
            TimeCounter();
        }, 1000);
    }
    else{return;}

}

$(document).ready(function () {
    DrawCards();
    displaCards();


});



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */