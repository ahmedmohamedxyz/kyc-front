import axiosInstance from "./axiosConfig";


export const showUser = async (id) => {
    return axiosInstance.get('/user/'+id);
};

export const updateUser = async (id,name,email,password,bio,status,phone,address,role) => {
    return axiosInstance.put('/user/'+id, {name,email,password,bio,status,phone,address,role});
}

export const createUser = async (name,email,password,bio,status,phone,address,role,type=null) => {
    return axiosInstance.post('/user/', {name,email,password,bio,status,phone,address,role,type});
}