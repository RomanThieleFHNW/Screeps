var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var strucTower = require('structure.tower');
const C = require('constants');
const _ = require('lodash');

module.exports.loop = function () {

    // Game.spawns["bob"].createCreep([MOVE,MOVE,MOVE,WORK,CARRY],"u1",{role: "upgrader"})
    // Game.spawns['bob'].createCreep([MOVE,WORK,CARRY],"h1",{role: "harvester"})
    // Game.spawns['bob'].createCreep([MOVE,WORK,CARRY],"b1",{role: "builder"})

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('R.I.P.', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == C.ROLES.HARVESTER);
    if (harvesters.length < 3) {
        var newName = Game.spawns['bob'].createCreep([WORK, WORK, WORK, CARRY, MOVE, MOVE], undefined, { role: 'harvester' });
        console.log('Spawning new harvester: ' + newName);
    } else {

        var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        if (builder.length < 2) {
            var newName2 = Game.spawns['bob'].createCreep([WORK, CARRY, CARRY, MOVE, MOVE, WORK], undefined, { role: 'builder' });
            console.log('Spawning new builder: ' + newName2);
        }

        var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        if (upgrader.length < 3) {
            var newName3 = Game.spawns['bob'].createCreep([MOVE, MOVE, CARRY, WORK, WORK, CARRY, MOVE, MOVE], undefined, { role: 'upgrader' });
            console.log('Spawning new upgrader: ' + newName3);
        }
    }

    // var towers = _.filter(Game.structures, (struc) => struc.structureType == STRUCTURE_TOWER);
    // for (var tower in towers) {
    //     console.log(tower);
    //     strucTower.run(tower);
    // }

    strucTower.run(Game.structures['58af6b6a5995c72858ee1ecb']);

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
