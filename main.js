var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
const _ = require('lodash');

module.exports.loop = function () {

    // Game.spawns["bob"].createCreep([MOVE,MOVE,MOVE,WORK,CARRY],"u1",{role: "upgrader"})
    // Game.spawns['bob'].createCreep([MOVE,WORK,CARRY],"h1",{role: "harvester"})
    // Game.spawns['bob'].createCreep([MOVE,WORK,CARRY],"b1",{role: "builder"})
    
    _.isUndefined(Game.spawns["bob"])


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
