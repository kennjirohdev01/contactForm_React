import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Admin = () => {
    const [contacts, setContacts] = useState([]);
    const [newAdminEmail, setNewAdminEmail] = useState('');
    const [newAdminPassword, setNewAdminPassword] = useState(''); // ここはPassword

    const navigate = useNavigate();

    // 日付をYYYY/MM/DD HH:MM:SS に整形する関数
    // 引数名を includeTime (大文字のT) に修正
    const formatDate = (dateString, includeTime = false) => {
        if (!dateString) {
            return '';
        }
        const d = new Date(dateString);
        if (isNaN(d.getTime())) {
            return '';
        }

        const yyyy = d.getFullYear();
        // getMonth() に修正
        const mm = ('00' + (d.getMonth() + 1)).slice(-2);
        const dd = ('00' + d.getDate()).slice(-2);
        let str = `${yyyy}/${mm}/${dd}`;

        if (includeTime) {
            const hh = ('00' + d.getHours()).slice(-2);
            const mi = ('00' + d.getMinutes()).slice(-2);
            const ss = ('00' + d.getSeconds()).slice(-2);
            str += ` ${hh}:${mi}:${ss}`;
        }
        return str;
    };

    // 画面が開かれた瞬間に1度だけ実行される処理(データの取得)
    useEffect(() => {
        // 関数全体を try...catch で囲む形に修正
        const fetchContacts = async () => {
            try {
                const response = await fetch('/api/contacts');

                if (response.status === 401) { // === を推奨
                    navigate('/login');
                    return;
                }

                // 成功したら、JSONを受け取ってStateにセット
                const data = await response.json();
                setContacts(data);
            } catch (error) {
                console.error("通信エラー", error);
                alert("データの読み込みに失敗しました。");
            }
        };

        // 関数の呼び出し
        fetchContacts();
    }, [navigate]);

    // 管理者追加ボタンが押された時の処理
    // 関数名を handleAddAdmin に修正
    const handleAddAdmin = async (e) => {
        e.preventDefault(); // preventDefault に修正
        try {
            const response = await fetch('/api/admin/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: newAdminEmail,
                    password: newAdminPassword,
                }),
            });
            const result = await response.json();

            if (result.success) {
                alert('管理者を追加しました。');
                setNewAdminEmail('');
                setNewAdminPassword('');
            } else {
                alert("エラー：" + result.message);
            }
        } catch (error) {
            console.error("通信エラー", error);
            alert("通信エラーが発生しました。");
        }
    };

    // ログアウト処理
    const handleLogout = async () => {
        try {
            await fetch('/logout');
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="admin-page-wrapper">
            <h1>管理者画面 問い合わせ内容一覧</h1>

            <div className="admin-header-links">
                <Link to="/">フォームへ戻る</Link>
                <span>|</span>
                <button onClick={handleLogout} className="logout-btn">ログアウト</button>
            </div>

            <div className="admin-add-section">
                <h3>管理者ユーザー追加</h3>
                <form onSubmit={handleAddAdmin} className="admin-add-form">
                    <input
                        type="email"
                        placeholder="メールアドレス"
                        value={newAdminEmail}
                        onChange={(e) => setNewAdminEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="パスワード"
                        value={newAdminPassword} /* newAdminPass から修正 */
                        onChange={(e) => setNewAdminPassword(e.target.value)} /* setNewAdminPass から修正 */
                        required
                    />
                    <button type="submit">追加</button>
                </form>
            </div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>番号</th>
                        <th>都道府県</th>
                        <th>市区町村</th>
                        <th>番地など</th>
                        <th>生年月日</th>
                        <th>お名前</th>
                        <th>メールアドレス</th>
                        <th>送信時刻</th>
                        <th>お問い合わせ内容</th>
                    </tr>
                </thead>
                <tbody>
                    {/* contacts配列の中身をループして、<tr>タグを量産する */}
                    {contacts.map(contact => (
                        <tr key={contact.id}>
                            <td>{contact.id}</td>
                            <td>{contact.prefecture}</td>
                            <td>{contact.city}</td>
                            <td>{contact.address_line1}</td>
                            <td>{formatDate(contact.birthday)}</td>
                            <td>{contact.name}</td>
                            <td>{contact.email_address}</td>
                            <td>{formatDate(contact.created_at, true)}</td>
                            <td>{contact.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;