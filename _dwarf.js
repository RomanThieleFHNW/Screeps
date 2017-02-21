const _ = require('lodash');

const song = ["♪I am a♪", "♪dwarf♪", "♪and I'm♪", "♪digging♪", "♪a hole♪",
        "♪Diggy♪", "♪diggy♪", "♪hole,♪", "♪diggy♪", "♪diggy♪", "♪hole♪", "♪ ♪ ♪ ♪"];

module.exports = {

    /**
	* sings the digger song
	* @param {Creep} creep
	* @returns {int}
	*/
	sing(creep) {
        if(_.isUndefined(creep.memory.verse)) {
            creep.memory.verse = 0;
        } else {
            creep.memory.verse++;
            if(++creep.memory.verse >= song.length){
                creep.memory.verse = 0;
            }
        }
        
		creep.say(song[creep.memory.verse], true)
		return creep.memory.verse;
	}
}

