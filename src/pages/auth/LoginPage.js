import React, { useContext } from "react";
import { TranslatorContext } from "../../context/Translator";
import { ButtonComponent, AnchorComponent } from "../../components/elements";
import IconFieldComponent from "../../components/fields/IconFieldComponent";
import LogoComponent from "../../components/LogoComponent";
import { login } from "../../APIs/AdminRequests";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
export default function LoginPage() {

    const { t } = useContext(TranslatorContext);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const loginFunction = () => {
        login(email, password)
        .then((res) => {
            //route to dashboard page
            localStorage.setItem('authToken',res.data.data.token);
            localStorage.setItem('id',res.data.data.id);
            localStorage.setItem('name',res.data.data.name);
            localStorage.setItem('email',res.data.data.email);
            localStorage.setItem('bio',res.data.data.bio);
            localStorage.setItem('status',res.data.data.status);
            localStorage.setItem('phone',res.data.data.phone);
            localStorage.setItem('address',res.data.data.address);
            localStorage.setItem('created_at',res.data.data.created_at);
            localStorage.setItem('permissions',res.data.data.permissions);
            localStorage.setItem('role',res.data.data.role);
            
            res.data.data.permissions.includes('list admin') ? window.location.href = '/admin-list' : window.location.href = '/agent-list';
        })
        .catch((error) => {
        });
    }
    return (
        <div className="mc-auth">
            <img src="images/pattern.webp" alt="pattern" className="mc-auth-pattern" />
            <div className="mc-auth-group">
                <LogoComponent 
                    src="images/logo.webp"
                    alt="logo"
                    href="/ecommerce"
                    className="mc-auth-logo"
                />
                <h4 className="mc-auth-title">Login</h4>
                <form className="mc-auth-form">
                    <IconFieldComponent 
                        icon="email"
                        type="email"
                        classes="w-100 h-sm"
                        placeholder={t('enter_your_email')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <IconFieldComponent 
                        icon="lock"
                        type="password"
                        classes="w-100 h-sm"
                        placeholder={t('enter_your_password')}
                        passwordVisible={true}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* <IconFieldComponent 
                        icon="verified_user"
                        classes="w-100 h-sm"
                        option={["select user role", "admin", "member", "client", "manager", "vendor"]}
                    /> */}
                    <ButtonComponent className='mc-auth-btn h-sm' type='button'
                        onClick={loginFunction} 
                    >
                        {t('sign_in')}
                    </ButtonComponent>
                    <AnchorComponent className="mc-auth-forgot" to="/forgot-password">{t('forgot_password')}</AnchorComponent>
                    {/* <div className="mc-auth-divide"><span>{t('or')}</span></div>
                    <div className="mc-auth-connect">
                        <AnchorComponent to="#" className="twitter h-sm">
                            <i className="icofont-twitter"></i>
                            <span>Continue with Twitter</span>
                        </AnchorComponent>
                        <AnchorComponent to="#" className="facebook h-sm">
                            <i className="icofont-facebook"></i>
                            <span>Continue with Facebook</span>
                        </AnchorComponent>
                    </div> */}
                </form>
                {/* <div className="mc-auth-navigate">
                    <span>Don't have an account?</span>
                    <AnchorComponent to="/register">{t('register')}</AnchorComponent>
                </div> */}
            </div>
        </div>
    );
}