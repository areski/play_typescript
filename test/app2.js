var User = (function () {
    function User(name, age) {
        this.name = name;
        this.age = age;
    }
    User.prototype.play = function (song) {
        console.log('User :' + this.name + ' listen to ' + song);
    };
    return User;
})();
window.onload = function () {
    var pablo = new User('Pablo', 42);
    pablo.play('Ace of Spades');
};
