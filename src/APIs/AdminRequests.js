import axiosInstance from "./axiosConfig";

export const login = async (email,password) => {
    return axiosInstance.post('/admin/login', { email, password });
};

export const logout = async (email,password) => {
    return axiosInstance.post('/admin/logout');
};
export const listAdmins = async (page=1,perPage=10,searchFilter='') => {
    let url = '/admin?page='+page+'&per_page='+perPage;
    if(searchFilter !== ''){
        url = '/admin?page='+page+'&per_page='+perPage+'&search='+searchFilter;
    }
    return axiosInstance.get(url);
};

export const createAdmin = async ({name,email,password,role}) => {
    return axiosInstance.post('/admin', {name,email,password,role});
};

export const deleteAdmin = async (id) => {
    return axiosInstance.delete('/admin/'+id);
};

export const updateAdmin = async (id,name,email,password,bio,status,phone,address) => {
    console.log(id,name,email,password,bio,status,phone,address)
    return axiosInstance.put('/admin/'+id, {name,email,password,bio,status,phone,address});
};
