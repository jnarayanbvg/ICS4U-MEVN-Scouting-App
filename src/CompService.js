/* eslint-disable */ 
import axios from 'axios';
import mongoose from 'mongoose';

const url = 'api/comps/';

class CompService {
    //Get Comps
    static getComps() {
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

    //Get One Comp
    static getOneComp(id) {
        return new Promise ((resolve,reject) => {
            if(!mongoose.Types.ObjectId.isValid(id)) reject(); //Make sure the string is a possible id before checking if it exists

            axios.get(url+id).then((res) => {
                const data = res.data;
                resolve(data);
            })
            .catch((err)=> {
                reject(err);
            })
        });
    }

    //Create Comp
    static createComp(name) {
        return axios.post(url, {
            name
        });
    }

    //Update Comp
    static updateComp(id, name) {
        if(!mongoose.Types.ObjectId.isValid(id)) reject(); //Make sure the string is a possible id before checking if it exists

        return axios.post(url+id, {
            name
        });
    }

    //Delete Comp
    static deleteComp(id) {
        if(!mongoose.Types.ObjectId.isValid(id)) reject(); //Make sure the string is a possible id before checking if it exists

        return axios.delete(`${url}${id}`);
    }
}

export default CompService;