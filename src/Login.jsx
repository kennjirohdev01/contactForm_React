import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                navigate('/admin');
            } else {
                setErrorMsg(data.message);
            }

        } catch (err) {
            console.error("通信エラー", err);
            setErrorMsg("通信エラーが発生しました。");
        }
    };

    return (
        <div className="login-page-wrapper">
            <div className="login-container">
                <h2>管理者ログイン</h2>

                {errorMsg && <div className="error-text">{errorMsg}</div>}

                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <label htmlFor='email'>メールアドレス:</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">パスワード:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="submit-group">
                        <button type="submit" className="login-btn">ログイン</button>
                    </div>
                </form>
                <div className="back-link">
                    <Link to="/">お問い合わせフォームへ戻る</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;