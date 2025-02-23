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
import { showCustomer } from "../../APIs/CustomersRequests";
export default function CustomerAccountPage() {
    const {id} = useParams();

    const { t } = useContext(TranslatorContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [nationality, setNationality] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [documentExpiryDate, setDocumentExpiryDate] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState('');
    const [address, setAddress] = useState('');
    const [occupation, setOccupation] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [image, setImage] = useState('');
    const [signatureImage, setSignatureImage] = useState('');
    const [documentImage, setDocumentImage] = useState('');
    const [permissionLitterImage, setPermissionLitterImage] = useState('');
    const [created_at, setCreatedAt] = useState('');


    useEffect(()=> {
        if(id){
            showCustomerFunction();
        }
    },[]);
    const showCustomerFunction = () => {
        showCustomer(id).then((res)=> {
            setName(res.data.data.name);
            setEmail(res.data.data.email);
            setPhoneNumber(res.data.data.phone_number);
            setNationality(res.data.data.nationality);
            setBirthDate(res.data.data.birth_date);
            setDocumentExpiryDate(res.data.data.document_expiry_date);
            setSubmissionStatus(res.data.data.submission_status);
            setAddress(res.data.data.address);
            setOccupation(res.data.data.occupation);
            setDocumentType(res.data.data.document_type);
            setImage(res.data.data.image);
            setSignatureImage(res.data.data.signature_image);
            setDocumentImage(res.data.data.document_image);
            setPermissionLitterImage(res.data.data.permission_litter_image);
            setCreatedAt(res.data.data.created_at);


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
                                                <Col xl={12}><LabelFieldComponent type="text" label={t('email')} fieldSize="mb-4 w-100 h-md" onChange={(e)=>setName(e.target.value)} value={email}/></Col>

                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="mc-tab-card">
                                    <h6 className="mc-tab-card-title">{t('private_inFormation')}</h6>
                                    <Row>
                                        
                                        <Col xl={6}><LabelFieldComponent type="text" label={t('phone_number')}  fieldSize="mb-4 w-100 h-md" value={phoneNumber} onChange={(e)=> setEmail(e.target.value)}/></Col>
                                        <Col xl={6}><LabelFieldComponent type="text" label={t('nationality')}  fieldSize="mb-4 w-100 h-md" value={nationality} onChange={(e)=> setEmail(e.target.value)}/></Col>
                                        <Col xl={6}><LabelFieldComponent type="text" label={t('birth_date')}  fieldSize="mb-4 w-100 h-md" value={birthDate} onChange={(e)=> setEmail(e.target.value)}/></Col>

                                        <Col xl={6}><LabelFieldComponent type="text" label={t('document_expiry_date')}  fieldSize="mb-4 w-100 h-md" value={documentExpiryDate} onChange={(e)=> setEmail(e.target.value)}/></Col>
                                        <Col xl={6}><LabelFieldComponent type="text" label={t('submission_status')}  fieldSize="mb-4 w-100 h-md" value={submissionStatus} onChange={(e)=> setEmail(e.target.value)}/></Col>
                                        <Col xl={6}><LabelFieldComponent type="text" label={t('address')}  fieldSize="mb-4 w-100 h-md" value={address} onChange={(e)=> setEmail(e.target.value)}/></Col>
                                        <Col xl={6}><LabelFieldComponent type="text" label={t('occupation')}  fieldSize="mb-4 w-100 h-md" value={occupation} onChange={(e)=> setEmail(e.target.value)}/></Col>
                                        <Col xl={6}><LabelFieldComponent type="text" label={t('document_type')}  fieldSize="mb-4 w-100 h-md" value={documentType} onChange={(e)=> setEmail(e.target.value)}/></Col>
                                        <Col xl={6}><LabelFieldComponent type="disabled" label={t('creation date')}  fieldSize="mb-4 w-100 h-md" value={created_at} disabled/></Col>


                                        <Col xl={6}>
                                            <h6 className="mc-divide-title mb-4">{t('image')}</h6>
                                            <div className="mc-product-view-gallery">
                                                <img src={image} alt="product"/>
                                                
                                            </div>
                                        </Col>

                                        <Col xl={6}>
                                            <h6 className="mc-divide-title mb-4">{t('signature_image')}</h6>
                                            <div className="mc-product-view-gallery">
                                                <img src={signatureImage} alt="product"/>
                                                
                                            </div>
                                        </Col>

                                        <Col xl={6}>
                                            <h6 className="mc-divide-title mb-4">{t('document_image')}</h6>
                                            <div className="mc-product-view-gallery">
                                                <img src={documentImage} alt="product"/>
                                                
                                            </div>
                                        </Col>

                                        {
                                            permissionLitterImage &&
                                            <Col xl={6}>
                                            <h6 className="mc-divide-title mb-4">{t('permission_litter_image')}</h6>
                                            <div className="mc-product-view-gallery">
                                                <img src={permissionLitterImage} alt="product"/>
                                                
                                            </div>
                                        </Col>
                                        }
                                        

                                        {/* <Col xl={4}>
                                            <div className="mc-user-avatar-upload">
                                                <div className="mc-user-avatar">
                                                    <img src={image} alt="avatar" />
                                                </div>
                                            </div>
                                        </Col> */}

                                    </Row>
                                </div>
                                
                                {/* <ButtonComponent className="mc-btn primary" icon="verified" text={id?t('save_changes'):t('create_new')} onClick={()=>handleClickAction()}/> */}
                            </Tab>
                           
                            
                        </Tabs>
                    </div>
                </Col>
            </Row>
        </PageLayout>
    )
}