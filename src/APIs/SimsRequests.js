import axiosInstance from "./axiosConfig";


export const listSims = async (page=1,perPage,search='',$type='') => {
    let url = '/sim?page='+page+'&per_page='+perPage;
    if(search !== ''){
        url = url+'&search='+search;
    }
    if($type !== '' && $type !== 'all'){
        url = url+'&type='+$type;
    }
    return axiosInstance.get(url);
};

export const createSim = async ({name,email,password,type}) => {
    return axiosInstance.post('/sim', {name,email,password,type});
};

export const deleteSim = async (id) => {
    return axiosInstance.delete('/sim/'+id);
};

export const updateSim = async (id,name,email,password,type) => {
    return axiosInstance.put('/sim/'+id, {name,email,password,type});
};