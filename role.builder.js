const _ = require('lodash');
var base = require('role.base');

module.exports = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvest');
        }
        else if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('build');
        }

        if (creep.memory.building) {
            if (!base.buildClosestConstruction(creep)) {
                base.transfereEnergyToClosestBuilding(creep);
            }
        } else {
            base.harvestClosestSource(creep);
        }
    }
};
