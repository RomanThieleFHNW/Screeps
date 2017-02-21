const _ = require('lodash');
var base = require('base.creep');

var roleHarvester = {
	/** @param {Creep} creep **/
    run: function (creep) {
        if (creep.carry.energy < creep.carryCapacity/2 && !creep.memory.building) {
            base.harvestClosestSource(creep);
        } else {
			if(!base.transfereEnergyToClosestBuilding(creep)) {
				if(creep.carry.energy){
					creep.memory.building = true;
					if(!base.buildClosestConstruction(creep)) {
						creep.memory.building = false;
					}
				}
			} else {
				creep.memory.building = false;
			}
        }
    }
};
module.exports = roleHarvester;
