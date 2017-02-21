const _ = require('lodash');
var base = require('base.creep');

var roleHarvester = {

	/** @param {Creep} creep **/
    run: function (creep) {
		
		
        if (creep.carry.energy < creep.carryCapacity && !creep.memory.building) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
			
			if (creep.memory.building && creep.carry.energy == 0) {
				creep.memory.building = false;
				creep.say('harvest');
			}
			var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
						structure.structureType == STRUCTURE_SPAWN ||
						structure.structureType == STRUCTURE_TOWER) 
						&& structure.energy < structure.energyCapacity;
                }
            });
            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
			else {
				if(creep.carry.energy > 0){
					creep.memory.building = true;
					var target = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
					if (target) {
						if (creep.build(target) == ERR_NOT_IN_RANGE) {
							creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
						}
					} 
				}
			}
        }
    }
};

module.exports = roleHarvester;
