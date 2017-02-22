const _ = require('lodash');
var base = require('role.base');

module.exports = {
	/** @param {Creep} creep **/
	run: function (creep) {
		if (!(creep.carry.energy) || (creep.carry.energy < creep.carryCapacity && !creep.memory.building)) {
			base.harvestClosestSource(creep);
			creep.memory.building = false;
		} else {
			if (!base.transfereEnergyToClosestBuilding(creep)) {
				if (creep.carry.energy) {
					creep.memory.building = true;
					if (!base.buildClosestConstruction(creep)) {
						creep.memory.building = false;
					}
				}
			} else {
				creep.memory.building = false;
			}
		}
	}
};
