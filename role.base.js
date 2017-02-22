const _ = require('lodash');
const C = require('constants');

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
		} else { creep.say('🗲🔋') }
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
			} else { creep.say('🗲🏠') }
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
			} else { creep.say('🔨🏠') }
		}
		return target;
	},

	/**
	* harvest nearest source
	* @param {Creep} creep
	* @returns {bool}
	*/
	harvestLeastPopulatetSource: function(creep) {
		var sources = creep.room.find(FIND_SOURCES);

		if (_.isUndefined(creep.memory.source)) {
			var hs = _.filter(Game.creeps, (cr) => cr.memory.role == 'harvester' && !_.isUndefined(cr.memory.source));

			if (!hs.length) {
				creep.memory.source = 0;
			} else {
				var ss = _.groupBy(hs, memory.source);
				creep.memory.source = ss.length % sources.length;
			}
		}

		var source = sources[creep.memory.source];
		if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
			creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
		} else { creep.say('🗲🔋') }

		return source;
	}
};