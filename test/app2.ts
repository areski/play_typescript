
class User {

    constructor  (public name : string, public age : number) {

    }

    play(song: string) {
        console.log('User =' + this.name + ' listen to ' + song)
    }
}

window.onload = () => {
    var pablo = new User('Pablo', 42);
    pablo.play ('Ace of Spades');
}