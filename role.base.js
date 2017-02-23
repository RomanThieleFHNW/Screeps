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
	* harvest nearest container or source
	* @param {Creep} creep
	* @returns {bool}
	*/
	getClosestEnergy(creep) {
		var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
				i.store[RESOURCE_ENERGY] > 0 &&
				_.sum(i.store) >= creep.carryCapacity
		});

		if (container) {
			if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(container, { visualizePathStyle: { stroke: '#ffaa00' } });
			} else { creep.say('💰') }
		} else {
			container = this.harvestClosestSource(creep);
		}
		return container;
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
	harvestLeastPopulatetSource(creep) {
		var sources = creep.room.find(FIND_SOURCES);

		if (_.isUndefined(creep.memory.source) || _.isNull(creep.memory.source)) {
			if (_.isUndefined(creep.room.memory.nextHarvestSource) || _.isNull(creep.room.memory.nextHarvestSource)) {
				creep.room.memory.nextHarvestSource = 0;
			}

			console.log('Go harvest source ' + creep.room.memory.nextHarvestSource);
			creep.memory.source = creep.room.memory.nextHarvestSource;
			creep.room.memory.nextHarvestSource = ++creep.room.memory.nextHarvestSource % sources.length;
		}

		var source = sources[creep.memory.source];
		if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
			creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
		} else { creep.say('🗲🔋') }

		// console.log(creep.name + ' mines ' + creep.memory.source);
		return source;
	}
};