const readline = require('readline');

const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Type "go" for play a game \n "read" for reading file \n "save" for saving results');

function go() {
    rl.on('line', (line) => {
        switch (line) {
            case 'go':
                goGame();
                break;
            case 'read':
                read();
                break;
            case 'save':
                save();
        }
    });
}

var i = 0;
var arr = [];

function goGame() {
    rl.question('1 or 2?', (answer) => {
            var coin = Math.round(Math.random()) + 1;
            var bool;
            bool = answer == coin;
            // str = 'coin = ' + coin + ', answer = ' + answer + ', won? ' + bool;
      //  str = '{"coin": ' + coin + ', "answer":' + answer + ', "won": ' + bool + '}';
        arr[i] = {
            coin: coin,
            answer: answer,
            won: bool
        };
        console.log(bool);
        i++;
        }
    );
}

function save() {
    rl.question('Filename (nothing = logfile)', (answer) => {
        if (answer == '') {
            answer = 'logfile';
        }
        var str = JSON.stringify(arr);
        fs.writeFile(answer, str, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    });
}

function read() {
    rl.question('Filename (nothing = logfile)', (ans) => {
        if (ans == '')
            ans = 'logfile';
        fs.readFile(ans, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            var str = JSON.parse(data.toString());
            console.log('games: ' + str.length);
            var winstreak = 0, loosestreak = 0, wins = 0, looses = 0;
            for (var i =0; i < str.length; i++){
                if (str[i].won){
                    winstreak++;
                    loosestreak = 0;
                    wins++;
                } else {
                    winstreak = 0;
                    loosestreak++;
                    looses++;
                }
            }
            console.log('max winstreak: ' + winstreak);
            console.log('max loosestreak: ' + loosestreak);
            console.log('wins: ' + wins);
            console.log('looses: ' + looses);
            var winrate = wins / (wins + looses) * 100;
            console.log('winrate: ' + winrate + '%');
        });
    });
}
go();