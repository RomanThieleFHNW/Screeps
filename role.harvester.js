const _ = require('lodash');
var base = require('base.creep');

var roleHarvester = {

	/** @param {Creep} creep **/
    run: function (creep) {
		
		
        if (creep.carry.energy < creep.carryCapacity && !creep.memory.building) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
			
			if (creep.memory.building && creep.carry.energy == 0) {
				creep.memory.building = false;
				creep.say('harvest');
			}
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
						structure.structureType == STRUCTURE_SPAWN ||
						structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
			else {
				if (creep.memory.building) {
					var targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
					if (targets.length > 0) {
						if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
							creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
						}
					} 
					else{
						creep.memory.building = true;
						var targets = creep.room.find(FIND_STRUCTURES, {
							filter: (structure) => {
								return (structure.structureType == STRUCTURE_EXTENSION ||
								structure.structureType == STRUCTURE_ROAD ||
									structure.structureType == STRUCTURE_SPAWN ||
									structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
							}
						});
						if (targets.length > 0) {
							if (creep.transfer(targets[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
								creep.moveTo(targets[1], { visualizePathStyle: { stroke: '#ffffff' } });
							}
						}
					}
				} 
			}
        }
    }
};

module.exports = roleHarvester;
