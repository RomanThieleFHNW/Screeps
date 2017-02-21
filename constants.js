const _ = require('lodash');

module.exports = {

    ROLES: {
        HARVESTER: 'harvester',
        DIGGER: 'digger',
        CARRIER: 'carrier',
        UPGRADER: 'upgrader',
        BUILDER: 'builder',
        GUARD: 'guard'
    },

    CREEPS: {
        HARVESTER_MK1: {
            ROLE: ROLES.HARVESTER,
            BLUEPRINT: [WORK, CARRY, MOVE]
        },
        HARVESTER_MK2: {
            ROLE: ROLES.HARVESTER,
            BLUEPRINT: [WORK, WORK, CARRY, MOVE, MOVE]
        },
        DIGGER_MK1: {
            ROLE: ROLES.DIGGER,
            BLUEPRINT: [WORK, WORK, WORK, MOVE]
        },
        DIGGER_MK2: {
            ROLE: ROLES.DIGGER,
            BLUEPRINT: [WORK, WORK, WORK, WORK, WORK, MOVE]
        },
        CARRIER_MK1: {
            ROLE: ROLES.CARRIER,
            BLUEPRINT: [CARRY, MOVE, MOVE]
        },
        CARRIER_MK2: {
            ROLE: ROLES.CARRIER,
            BLUEPRINT: [CARRY, CARRY, MOVE, MOVE, MOVE]
        },
        UPGRADER_MK1: {
            ROLE: ROLES.UPGRADER,
            BLUEPRINT: [WORK, CARRY, MOVE, MOVE]
        },
        UPGRADER_MK2: {
            ROLE: ROLES.UPGRADER,
            BLUEPRINT: [WORK, WORK, WORK, CARRY, MOVE]
        },
        BUILDER_MK1: {
            ROLE: ROLES.BUILDER,
            BLUEPRINT: [WORK, CARRY, MOVE, MOVE]
        },
        BUILDER_MK2: {
            ROLE: ROLES.BUILDER,
            BLUEPRINT: [WORK, WORK, CARRY, CARRY, MOVE, MOVE]
        },
        GUARD: {
            ROLE: ROLES.GUARD,
            BLUEPRINT: [ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE]
        }
    },


}