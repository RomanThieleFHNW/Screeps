const _ = require('lodash');

module.exports = {

	/**
	* harvest nearest source
	* @param {Creep} creep
	* @returns {bool}
	*/
	harvestClosestSource(creep) {
		var source = creep.pos.findClosestByPath(FIND_SOURCES);
		if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
			creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
		} else {creep.say('🗲🔋')}
		return source;
	},
	
	/**
	* transfer energy to the nearest building
	* @param {Creep} creep
	* @returns {bool}
	*/
	transfereEnergyToClosestBuilding(creep) {
		var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			filter: (structure) => {
				return (structure.structureType == STRUCTURE_EXTENSION ||
				structure.structureType == STRUCTURE_ROAD ||
					structure.structureType == STRUCTURE_SPAWN ||
					structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
			}
		});
		if (target) {
			if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
			} else { creep.say('🗲🏠')}
		}
		return target;
	},
	
	/**
	* build nearest construction site
	* @param {Creep} creep
	* @returns {bool}
	*/
	buildClosestConstruction(creep) {
		var target = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
		if (target) {
			if (creep.build(target) == ERR_NOT_IN_RANGE) {
				creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
			} else { creep.say('🔨🏠')}
		}
		return target;
	}
};