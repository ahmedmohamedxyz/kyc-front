import axiosInstance from "./axiosConfig";


export const listAgents = async (page=1,perPage,search='',$type='') => {
    let url = '/agent?page='+page+'&per_page='+perPage;
    if(search !== ''){
        url = url+'&search='+search;
    }
    if($type !== '' && $type !== 'all'){
        url = url+'&type='+$type;
    }
    return axiosInstance.get(url);
};

export const createAgent = async ({name,email,password,type}) => {
    return axiosInstance.post('/agent', {name,email,password,type});
};

export const deleteAgent = async (id) => {
    return axiosInstance.delete('/agent/'+id);
};

export const updateAgent = async (id,name,email,password,type) => {
    return axiosInstance.put('/agent/'+id, {name,email,password,type});
};