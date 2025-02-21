import React, { useContext, useEffect, useState } from "react";
import { TranslatorContext } from "../../context/Translator";
import { Row, Col, Tab, Tabs } from "react-bootstrap";
import { LegendFieldComponent, LegendTextareaComponent, IconFieldComponent, LabelFieldComponent, LabelTextareaComponent } from "../../components/fields";
import { ButtonComponent } from "../../components/elements";
import { FileUploadComponent } from "../../components"; 
import PageLayout from "../../layouts/PageLayout";
import { toast } from 'react-toastify';
import { updateAdmin } from "../../APIs/AdminRequests";
import { useParams } from "react-router-dom";
import { createUser, showUser, updateUser } from "../../APIs/UserRequests";
export default function MyAccountPage() {
    const {id} = useParams();

    const { t } = useContext(TranslatorContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [status, setStatus] = useState('active');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [created_at, setCreated_at] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('company');
    useEffect(()=> {
        if(id){
            showUserFunction();
        }
    },[]);
    const showUserFunction = () => {
        showUser(id).then((res)=> {
            setName(res.data.data.name);
            setEmail(res.data.data.email);
            setBio(res.data.data.bio);
            setStatus(res.data.data.status);
            setPhone(res.data.data.phone);
            setAddress(res.data.data.address);
            setCreated_at(res.data.data.created_at);
            setRole(res.data.data.role);
            setType(res.data.data.type);
        });
    }
    const updateUserFunction = () => {
        let statusOption = status === 'active' ? true : false;
        let bioOption= bio == '' ? null: bio;
        let phoneOption =  phone ==''? null:bio;
        let setAddressOption = address ==''? null:address;
        let passwordOption = password ==''? null:password;
        updateUser(id,name,email,passwordOption,bioOption,statusOption,phoneOption,setAddressOption,role).then((res)=> {
            const notify = () => toast.success(res.data.message);
            notify();
           
        });
    }

    const createUserFunction = () => {
        let statusOption = status === 'active' ? true : false;
        let bioOption= bio == '' ? null: bio;
        let phoneOption =  phone ==''? null:bio;
        let setAddressOption = address ==''? null:address;
        let passwordOption = password ==''? null:password;
        createUser(name,email,passwordOption,bioOption,statusOption,phoneOption,setAddressOption,role,type).then((res)=> {
            const notify = () => toast.success(res.data.message);
            notify();
            setTimeout(() => {
                window.history.back();
            }, 2000);
           
        });
    }

    const handleClickAction = () => {
        if(id){
            updateUserFunction();
        }else{
            createUserFunction();

        }
    }
    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <div className="mc-card">
                        <div className='mc-breadcrumb'>
                            <h3 className="mc-breadcrumb-title">{t('my_account')}</h3>
                        </div>
                    </div>
                </Col>
                <Col xl={12}>
                    <div className="mc-card">
                        <Tabs defaultActiveKey="profile" id="mc" className="mc-tabs">
                            <Tab eventKey="profile" title={t('edit_profile')} className="mc-tabpane profile">
                                <div className="mc-tab-card">
                                    <h6 className="mc-tab-card-title">{t('public_inFormation')}</h6>
                                    <Row>
                                        <Col xl={4}>
                                            <div className="mc-user-avatar-upload">
                                                <div className="mc-user-avatar">
                                                    <img src="/images/avatar/01.webp" alt="avatar" />
                                                </div>
                                                <FileUploadComponent icon="cloud_upload" text={t('upload')} />
                                            </div>
                                        </Col>
                                        <Col xl={8}>
                                            <Row>
                                                <Col xl={12}><LabelFieldComponent type="text" label={t('fullname')} fieldSize="mb-4 w-100 h-md" onChange={(e)=>setName(e.target.value)} value={name}/></Col>
                                                
                                                <Col xl={12}><LabelTextareaComponent label={t('biography')} fieldSize="mb-4 w-100 h-3xl" value={bio} onChange={(e)=> setBio(e.target.value)}/></Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="mc-tab-card">
                                    <h6 className="mc-tab-card-title">{t('private_inFormation')}</h6>
                                    <Row>
                                        <Col xl={6}><LabelFieldComponent label={t('role')}  fieldSize="mb-4 w-100 h-md" option={["super admin", "admin", "agent"]} value={role} onChange={(e)=> setRole(e.target.value)}/></Col>
                                        <Col xl={6}><LabelFieldComponent label={t('status')}  fieldSize="mb-4 w-100 h-md" option={["active", "inactive"]} value={status} onChange={(e)=> setStatus(e.target.value)}/></Col>
                                        {
                                            role=='agent'&&
                                            <Col xl={6}><LabelFieldComponent label={t('permission to add contract')}  fieldSize="mb-4 w-100 h-md" option={["company", "individual","all"]} value={type} onChange={(e)=> setStatus(e.target.value)}/></Col>

                                        }
                                        <Col xl={6}><LabelFieldComponent type="email" label={t('email')}  fieldSize="mb-4 w-100 h-md" value={email} onChange={(e)=> setEmail(e.target.value)}/></Col>
                                        <Col xl={6}><LabelFieldComponent type="password" label={t('password')}  fieldSize="mb-4 w-100 h-md" onChange={(e)=> setPassword(e.target.value)}/></Col>

                                        <Col xl={6}><LabelFieldComponent type="tel" label={t('phone')}  fieldSize="mb-4 w-100 h-md" value={phone} onChange={(e)=> setPhone(e.target.value)}/></Col>
                                        {
                                            id && 
                                            <Col xl={6}><LabelFieldComponent type="disabled" label={t('creation date')}  fieldSize="mb-4 w-100 h-md" value={created_at} disabled/></Col>

                                        }

                                        <Col xl={12}><LabelTextareaComponent label={t('address')} fieldSize="mb-4 w-100 h-5xl" value={address} onChange={(e)=> setAddress(e.target.value)}/></Col>
                                    </Row>
                                </div>
                                
                                <ButtonComponent className="mc-btn primary" icon="verified" text={id?t('save_changes'):t('create_new')} onClick={()=>handleClickAction()}/>
                            </Tab>
                           
                            
                        </Tabs>
                    </div>
                </Col>
            </Row>
        </PageLayout>
    )
}