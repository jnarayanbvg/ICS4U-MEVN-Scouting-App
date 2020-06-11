// Simple Web Service Call Handler for Averages

/* eslint-disable */ 
import axios from 'axios';

const url = 'api/averages/';

class AverageService {

    //Get Averages
    static getAverages() {
        return new Promise ((resolve,reject) => {
            axios.get(url).then((res) => {
                const data = res.data;
                resolve(data);
            })
            .catch((err)=> {
                reject(err);
            })
        });
    }

    //Get Averages By Comp
    static getAveragesByComp(comp) {
        return new Promise ((resolve,reject) => {
            axios.get(`${url}${comp}`).then((res) => {
                const data = res.data;
                resolve(data);
            })
            .catch((err)=> {
                reject(err);
            })
        });
    }

    //Get Averages By Comp and Team
    static getAveragesByTeam(comp, team) {
        return new Promise ((resolve, reject) => {
            axios.get(`${url}${comp}/team/${team}`).then((res) => {
                const data = res.data;
                resolve(data);
            })
            .catch((err)=> {
                reject(err);
            })
        });
    }

    //Upsert Average
    static upsertAverage(competition,
        teamNumber,
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
        matchCount,
        defenseCount
        ) {
        return axios.post(url, {
            competition,
            teamNumber,
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
            matchCount,
            defenseCount
        });
    }

    //Delete Match
    static deleteAveragesByComp(comp) {
        return axios.delete(`${url}${comp}`);
    }

}

export default AverageService;