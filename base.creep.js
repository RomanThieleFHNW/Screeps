const _ = require('lodash');

module.exports = {

	/**
	* Finds defined structure, which is closest to the given position.
	* @param {RoomPosition} pos
	* @param {string} structureType
	* @param {number} find
	* @returns {Structure}
	*/
	findClosestStructureByRange(pos, structureType, find = FIND_STRUCTURES) {
		return pos.findClosestByRange(find, {
			/** @param {Structure} structure */
			filter(structure) { return structure.structureType == structureType; }
		});
	},
};