import React, { useContext } from "react";
import { TranslatorContext } from "../../context/Translator";
import { Row, Col } from "react-bootstrap";
import { AnchorComponent } from "../../components/elements"; 
import { LabelFieldComponent } from "../../components/fields";
import PageLayout from "../../layouts/PageLayout";
import { createAdmin } from "../../APIs/AdminRequests";
import { toast } from 'react-toastify';

export default function AdminCreatePage() {

    const { t } = useContext(TranslatorContext);


    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [role, setRole] = React.useState('');

    const createAdminFunction = () => {
        createAdmin({name,email,password,role}).then((res) => {
            const notify = () => toast.success(res.data.message);
            notify();
            setTimeout(() => {
                window.location.href = '/admin-list';
            },3000);

        });
        
    }
    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <div className="mc-card mb-4">
                        <div className='mc-breadcrumb'>
                            <h3 className="mc-breadcrumb-title">{t('admin_create')}</h3>
                            
                        </div>
                    </div>
                </Col>
                <Col xl={12}>
                    <div className="mc-card">
                        <div className="mc-card-header">
                            <h4 className="mc-card-title">{t('basic_information')}</h4>
                            
                        </div>
                        <Row>
                            <Col xl={12}><LabelFieldComponent type="text" label={t('name')} fieldSize="mb-4 w-100 h-md" onChange={(e)=>setName(e.target.value)} value={name}/></Col>
                            <Col xl={12}><LabelFieldComponent type="email" label={t('email')} fieldSize="mb-4 w-100 h-md" onChange={(e)=>setEmail(e.target.value)} value={email}/></Col>
                            <Col xl={12}><LabelFieldComponent type="password" label={t('password')} fieldSize="mb-4 w-100 h-md" onChange={(e)=>setPassword(e.target.value)} value={password}/></Col>
                            <Col xl={12}><LabelFieldComponent label={t('role')} option={['','mans', 'womans', 'accessory']} fieldSize="mb-4 w-100 h-md" onChange={(e)=>setRole(e.target.value)}/></Col>
                            
                        </Row>
                    </div>
                </Col>
                
                <Col xl={12}>
                       
                        <AnchorComponent 
                            className="mc-btn w-100 primary mt-5" 
                            text={t('create')} 
                            icon="cloud_upload" 
                            onClick={createAdminFunction}
                        />
                </Col>
            </Row>
        </PageLayout>
    )
}