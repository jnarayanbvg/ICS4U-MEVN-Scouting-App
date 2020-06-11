// Simple Web Service Call Handler for Comps

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
                    data.map(obj => ({
                        ...obj,
                        match: obj.match //Without this, it returns an array of objects, each with a match property which contains all data --> this returns the match property
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
                    data.map(obj => ({
                        ...obj,
                        match: obj.match //Without this, it returns an array of objects, each with a match property which contains all data --> this returns the match property
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
        });
    }

    //Get Matches By Comp and Team
    static getMatchesByTeam(comp, team) {
        return new Promise ((resolve, reject) => {
            axios.get(url+comp+"/team/"+team).then((res) => {
                const data = res.data;
                resolve(
                    data.map(obj => ({
                        ...obj,
                        match: obj.match //Without this, it returns an array of objects, each with a match property which contains all data --> this returns the match property
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
        });
    }

    //Get Matches By Comp and Match
    static getMatchesByMatch(comp, match) {
        return new Promise ((resolve, reject) => {
            axios.get(`${url}${comp}/match/${match}`).then((res) => {
                const data = res.data;
                resolve(
                    data.map(obj => ({
                        ...obj,
                        match: obj.match //Without this, it returns an array of objects, each with a match property which contains all data --> this returns the match property
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

    //Delete Matches By Comp
    static deleteMatchesByComp(comp) {
        return axios.delete(`${url}${comp}`);
    }

}

export default MatchService;