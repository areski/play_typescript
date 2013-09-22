var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var Utilities = (function () {
    function Utilities() { }
    Utilities.collisionDetection = function collisionDetection(a, b) {
        return a.position.x <= (b.position.x + b.position.width);
    }
    return Utilities;
})();
var Point = (function () {
    function Point(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    return Point;
})();
var Size = (function () {
    function Size(width, height) {
        this.width = width;
        this.height = height;
    }
    return Size;
})();
var Thing = (function () {
    function Thing(id, position, size) {
        this.position = position || new Point(0, 0);
        this.size = size || new Size(0, 0);
    }
    Thing.prototype.draw = function (graphics) {
    };
    return Thing;
})();
var SolidThing = (function () {
    function SolidThing() { }
    SolidThing.prototype.collision = function (obj) {
        return Utilities.collisionDetection(this, obj);
    };
    return SolidThing;
})();
var AnimatedThing = (function (_super) {
    __extends(AnimatedThing, _super);
    function AnimatedThing() {
        _super.apply(this, arguments);

    }
    AnimatedThing.prototype.move = function (position) {
        this.targetPosition = position;
    };
    AnimatedThing.prototype.scale = function (size) {
        this.targetSize = size;
    };
    AnimatedThing.prototype.update = function (ticks) {
        var delta = this.speed / ticks;
        if(this.targetPosition) {
            this.position.x = this.calculateStep(this.position.x, this.targetPosition.x, delta);
            this.position.y = this.calculateStep(this.position.y, this.targetPosition.y, delta);
        }
        if(this.targetSize) {
            this.size.width = this.calculateStep(this.size.width, this.targetSize.width, delta);
            this.size.height = this.calculateStep(this.size.height, this.targetSize.height, delta);
        }
    };
    AnimatedThing.prototype.calculateStep = function (from, to, delta) {
        if(from == to) {
            return from;
        } else {
            if(from < to) {
                return Math.min(from + delta, to);
            } else {
                return Math.max(from - delta, to);
            }
        }
    };
    return AnimatedThing;
})(Thing);
var SolidAnumatedThing = (function () {
    function SolidAnumatedThing() { }
    SolidAnumatedThing.prototype.collision = function (obj) {
        return Utilities.collisionDetection(this, obj);
    };
    return SolidAnumatedThing;
})();
var Scenario = (function () {
    function Scenario(canvas) {
        this.graphics = canvas.getContext('2d');
        this.things = new Array();
    }
    Scenario.prototype.start = function (framesPerSecond) {
        var _this = this;
        if(this.interval) {
            this.stop();
        }
        this.lastTime = Date.now();
        this.interval = setInterval(function () {
            return _this.update();
        }, 1000 / framesPerSecond);
    };
    Scenario.prototype.stop = function () {
        if(this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    };
    Scenario.prototype.update = function (ticks) {
        var _this = this;
        if(!ticks) {
            var now = Date.now();
            var m = now - this.lastTime;
            m = m <= 0 ? 1 : m;
            this.lastTime = now;
            this.update(m);
        } else {
            this.things.forEach(function (thing) {
                thing.update(ticks);
                thing.draw(_this.graphics);
            });
        }
    };
    return Scenario;
})();
