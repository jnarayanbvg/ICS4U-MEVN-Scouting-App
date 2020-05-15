/* eslint-disable */ 

import axios from 'axios';

const url = 'api/comps/';

class CompService {
    //Get Comps
    static getComps() {
        return new Promise ((resolve,reject) => {
            axios.get(url).then((res) => {
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        createdAt: new Date(post.createdAt)
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
        });
    }

    //Create Comp
    static createComp(name, start, end) {
        return axios.post(url, {
            name,
            start,
            end
        });
    }

    //Delete Comp
    static deleteComp(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default CompService;