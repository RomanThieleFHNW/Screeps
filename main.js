var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

    //var tower = Game.getObjectById('57d8e7ee41ed4c9bf1ef1378');
    //if (tower) {
    //    var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    //        filter: (structure) => structure.hits < structure.hitsMax
    //    });
    //    if (closestDamagedStructure) {
    //        tower.repair(closestDamagedStructure);
    //    }

    //    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    //    if (closestHostile) {
    //        tower.attack(closestHostile);
    //    }
    //}

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
