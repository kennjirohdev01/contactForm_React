import { Link } from "react-router-dom";

const Complete = () =>{
    return (
        <div className="container">
            <h1>送信完了</h1>
            <p>お問い合わせありがとうございました。</p>
            <div className="admin-link">
                <Link to="/">TOPに戻る</Link>
            </div>
        </div>
    );
};

export default Complete;