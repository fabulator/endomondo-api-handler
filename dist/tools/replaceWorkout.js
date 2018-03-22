'use strict';

class EndomondoException extends Error {
    constructor(message) {
        super(`Endomondo Error: ${message}`);
    }
}

module.exports = replaceWorkout;
