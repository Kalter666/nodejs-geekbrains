/**
 * Created by kalte on 8/6/2016.
 */


function createDeck() {
    var deck = {
        suit: ["spades","hearts","diamonds","clubs"],
        face: ["two","three","four","five","six","seven","eight","nine","ten","jack","queen","king","ace"]
    };
    var arr = [];
    for (var i = 0; i < 13; i++){
        for (var j = 0; j < 4; j++){
            arr.push({
                face: deck.face[i],
                suit: deck.suit[j]
            });
        }
    }
    return arr;
}

var deck = createDeck();

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}

function drawACard(deck) {
    return randomInteger(0, deck.length);
}


var createAHand = function (deck) {
    var arr = [];
    for (var i = 0; i < 2; i++){
        var j = drawACard(deck);
        arr.push(deck[j]);
        deck.splice(deck[j], 1);
    }
    return arr;
};

const readline = require('readline');

const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function countPoints(hand) {
    var points = 0;
    for (var i = 0; i < hand.length; i++)
    switch (hand[i].face){
        case "two":
            points += 2;
            break;
        case "three":
            points += 3;
            break;
        case "four":
            points += 4;
            break;
        case "five":
            points += 5;
            break;
        case "six":
            points += 6;
            break;
        case "seven":
            points += 7;
            break;
        case "eight":
            points += 8;
            break;
        case "nine":
            points += 9;
            break;
        case "ace":
            if (points < 21) {
                points += 11;
            } else {
                points += 1;
            }
            break;
        default: points += 10;
    }
    return points;
}

function showHand(hand) {
    var str = [];
    for (var i = 0; i < hand.length; i++){
        str.push(hand[i].face + ' ' + hand[i].suit);
    }
    return str.join(', ');
}

function howMany() {
    rl.question('How many packs in deck? (default: 1)', (answer) => {
        var rolf = createDeck();
        deck = [];
        if (answer ==''){
            deck.push(createDeck());
        } else {
            for (; answer > 0; answer--){
                for (var i = 0; i < rolf.length; i++){
                    deck.push(rolf[i]);
                }
            }
        }
    });
}

function checkWin(playershand, opphand) {
    if (countPoints(playershand) > 21){
        console.log('lost');
    } else if(countPoints(opphand) > 21){
        console.log('win');
    } else if (countPoints(opphand) == 21){
        console.log('lost');
    } else if (countPoints(playershand) == 21){
        console.log('win');
    }
}

function hitMe(hand) {
    var j = drawACard(deck);
    hand.push(deck[j]);
    deck.splice(deck[j], 1);
    return hand;
}

function isWin(playershand, opphand) {
    if (countPoints(playershand) > 21){
        return false;
    } else if(countPoints(opphand) > 21){
        return true;
    } else if (countPoints(opphand) == 21){
        return false;
    } else if (countPoints(playershand) == 21){
        return true;
    } else if (countPoints(playershand) > countPoints(opphand)){
        return true;
    } else if (checkWin(playershand, opphand)){
        return true;
    } else {
        return false;
    }
}

function showRes(playershand, opphand) {
    console.log('your hand: ' + showHand(playershand) + '\r\n score: ' + countPoints(playershand));
    console.log('opp hand: ' + showHand(opphand) + '\r\n score: ' + countPoints(opphand));
}

function startAGame() {
    var playershand = createAHand(deck);
    var opphand = createAHand(deck);
    showRes(playershand, opphand);
    console.log('Type "hit" to draw a card \n "stop" if it`s ok');
    checkWin(playershand, opphand);
    rl.on('line', (ans) =>{
        switch (ans){
            case 'hit':
                playershand = hitMe(playershand);
                console.log('your hand: ' + showHand(playershand) + '\r\n score: ' + countPoints(playershand));
                checkWin(playershand, opphand);
                break;
            case 'stop':
                if (countPoints(opphand) < 17){
                    opphand = hitMe(opphand);
                    console.log('your opp draw');
                    console.log('opp hand: ' + showHand(opphand) + '\r\n score: ' + countPoints(opphand));
                }
                console.log('\n');
                showRes(playershand, opphand);
                if(isWin(playershand,opphand)){
                    console.log('win!');
                } else {
                    console.log('lost!');
                }
        }
    });
}

rl.on('line', (ans) => {
    switch (ans){
        case 'go':
            startAGame();
            break;
        case 'packs':
            howMany();
            break;
    }
});

console.log('Type "go" for a game \n"packs" for changing number of packs in the deck');