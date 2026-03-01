import {Link} from 'react-router-dom';

const Admin = () => {

    return (
        <div className='containter'>
            <h1>管理者画面</h1>
            <p>ここは管理者専用ページです</p>
            <div className='admin-link'>
                <Link to="/">TOPに戻る</Link>
            </div>
        </div>
    );
};

export default Admin;