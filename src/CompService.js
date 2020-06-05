/* eslint-disable */ 

import axios from 'axios';

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

    //Delete Comp
    static deleteComp(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default CompService;