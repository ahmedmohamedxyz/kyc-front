import React, { useContext, useState } from "react";
import { TranslatorContext } from "../../context/Translator";
import { Row, Col, Tab, Tabs } from "react-bootstrap";
import { LegendFieldComponent, LegendTextareaComponent, IconFieldComponent, LabelFieldComponent, LabelTextareaComponent } from "../../components/fields";
import { ButtonComponent } from "../../components/elements";
import { FileUploadComponent } from "../../components"; 
import PageLayout from "../../layouts/PageLayout";
import { toast } from 'react-toastify';
import { updateAdmin } from "../../APIs/AdminRequests";
export default function MyAccountPage() {

    const { t } = useContext(TranslatorContext);
    const [name, setName] = useState(localStorage.getItem('name'));
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [bio, setBio] = useState(localStorage.getItem('bio')==='null'?'' : localStorage.getItem('bio'));
    const [status, setStatus] = useState(localStorage.getItem('status')==1?'active':'inactive');
    const [phone, setPhone] = useState(localStorage.getItem('phone')==='null'?'':localStorage.getItem('phone'));
    const [address, setAddress] = useState(localStorage.getItem('address')==='null'?'':localStorage.getItem('address'));
    const [created_at, setCreated_at] = useState(localStorage.getItem('created_at'));
    const [role, setRole] = useState(localStorage.getItem('role'));

    const updateAdminFunction = () => {
        console.log(status)
        let statusOption = status === 'active' ? true : false;
        let bioOption= bio == '' ? null: bio;
        let phoneOption =  phone ==''? null:bio;
        let setAddressOption = address ==''? null:address;
        updateAdmin(localStorage.getItem('id'),name,email,null,bioOption,statusOption,phoneOption,setAddressOption).then((res)=> {
            const notify = () => toast.success(res.data.message);
            notify();
            localStorage.setItem('name',name);
            localStorage.setItem('email',email);
            localStorage.setItem('bio',bio);
            localStorage.setItem('status',statusOption);
            localStorage.setItem('phone',phone);
            localStorage.setItem('address',address);
            // localStorage.setItem('role',role);
        });
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
                                        <Col xl={6}><LabelFieldComponent label={t('role')}  fieldSize="mb-4 w-100 h-md" option={["super admin", "admin", "agent"]} onChange={(e)=> setRole(e.target.value)}/></Col>
                                        <Col xl={6}><LabelFieldComponent label={t('status')}  fieldSize="mb-4 w-100 h-md" option={["active", "inactive"]} onChange={(e)=> setStatus(e.target.value)}/></Col>
                                        <Col xl={6}><LabelFieldComponent type="email" label={t('email')}  fieldSize="mb-4 w-100 h-md" value={email} onChange={(e)=> setEmail(e.target.value)}/></Col>
                                        
                                        <Col xl={6}><LabelFieldComponent type="tel" label={t('phone')}  fieldSize="mb-4 w-100 h-md" value={phone} onChange={(e)=> setPhone(e.target.value)}/></Col>
                                        <Col xl={6}><LabelFieldComponent type="disabled" label={t('creation date')}  fieldSize="mb-4 w-100 h-md" value={created_at} disabled/></Col>

                                        <Col xl={12}><LabelTextareaComponent label={t('address')} fieldSize="mb-4 w-100 h-5xl" value={address} onChange={(e)=> setAddress(e.target.value)}/></Col>
                                    </Row>
                                </div>
                                
                                <ButtonComponent className="mc-btn primary" icon="verified" text={t('save_changes')} onClick={()=>updateAdminFunction()}/>
                            </Tab>
                            <Tab eventKey="password" title={t('change_password')} className="mc-tabpane password">
                                <div className="mc-tab-card">
                                    <h6 className="mc-tab-card-title">{t('generate_password')}</h6>
                                    <Row>
                                        <Col xs={12} md={12}><IconFieldComponent icon="lock" type="password" placeholder={t('current_password')} classes="w-100 h-lg mb-4" passwordVisible /></Col>
                                        <Col xs={12} md={6}><IconFieldComponent icon="add_moderator" type="password" placeholder={t('new_password')} classes="w-100 h-lg mb-4" passwordVisible /></Col>
                                        <Col xs={12} md={6}><IconFieldComponent icon="verified_user" type="password" placeholder={t('confirm_password')} classes="w-100 h-lg mb-4" passwordVisible /></Col>
                                    </Row>
                                </div>
                                <ButtonComponent className="mc-btn primary" icon="verified" text={t('save_changes')} onClick={()=>console.log('press')} />
                            </Tab>
                            
                        </Tabs>
                    </div>
                </Col>
            </Row>
        </PageLayout>
    )
}