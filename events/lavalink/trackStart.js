import pannel from '../../functions/pannel.js';

export default {
    run: async (client, player, track, payload) => {
        pannel(client, null, player);
    }
};