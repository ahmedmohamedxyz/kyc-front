import axiosInstance from "./axiosConfig";


export const listCustomers = async (page=1,perPage,search='',$type='') => {
    let url = '/customer?page='+page+'&per_page='+perPage;
    if(search !== ''){
        url = url+'&search='+search;
    }
    if($type !== '' && $type !== 'all'){
        url = url+'&type='+$type;
    }
    return axiosInstance.get(url);
};

export const createCustomer = async ({name,email,password,type}) => {
    return axiosInstance.post('/customer', {name,email,password,type});
};

export const showCustomer = async (id) => {
    return axiosInstance.get('/customer/'+id);
};

export const deleteCustomer = async (id) => {
    return axiosInstance.delete('/customer/'+id);
};

export const updateCustomer = async (id,name,email,password,type) => {
    return axiosInstance.put('/customer/'+id, {name,email,password,type});
};