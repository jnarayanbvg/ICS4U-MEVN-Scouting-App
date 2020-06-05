/* eslint-disable */ 

import axios from 'axios';

const url = 'api/matches/';

class MatchService {
    //Get Matches
    static getMatches() {
        return new Promise ((resolve,reject) => {
            axios.get(url).then((res) => {
                const data = res.data;
                resolve(
                    data.map(match => ({
                        match
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
        });
    }

    //Get Matches By Comp
    static getMatchesByComp(comp) {
        return new Promise ((resolve,reject) => {
            axios.get(url+comp).then((res) => {
                const data = res.data;
                resolve(
                    data.map(match => ({
                        match
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
        });
    }

    //Create Match
    static createMatch(competition,
        matchNumber,
        teamNumber,
        allianceColor,
        habStart,
        habLeave,
        habClimb,
        sandstormCargo,
        sandstormPanel,
        shipCargo,
        shipPanel,
        lowCargo,
        lowPanel,
        midCargo,
        midPanel,
        highCargo,
        highPanel,
        cargoFloor,
        cargoHuman,
        panelFloor,
        panelHuman,
        timeDefending,
        defenseStrength,
        comments,
        scoutName) {
        return axios.post(url, {
            competition,
            matchNumber,
            teamNumber,
            allianceColor,
            habStart,
            habLeave,
            habClimb,
            sandstormCargo,
            sandstormPanel,
            shipCargo,
            shipPanel,
            lowCargo,
            lowPanel,
            midCargo,
            midPanel,
            highCargo,
            highPanel,
            cargoFloor,
            cargoHuman,
            panelFloor,
            panelHuman,
            timeDefending,
            defenseStrength,
            comments,
            scoutName
        });
    }

    //Delete Match
    static deleteMatch(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default MatchService;