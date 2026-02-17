import { use, useState } from 'react'

function App() {
  //--- useStateの定義 --------
  // --- State(状態)の定義 ---
  const [birthYear,setBirthYear] = useState('');
  const [birthMonth,setBirthMonth] = useState('');

  const[zipcode ,setZipcode] = useState('');
  const[prefecture ,setPrefecture] = useState('');
  const[city ,setCity] = useState('');
  const[street ,setStreet] = useState('');
  const[addressError,setAddressError] = useState('');

  // 現在の年を取得
  const currentYear = new Date().getFullYear();

  const years = Array.from({length:currentYear - 1900 + 1},(_,i)=>currentYear - i);
  const months = Array.from({length:12},(_,i)=> i + 1);

  const getDaysInMonth = (year,month)=>{
    if(!year||!month) return 31; // 年と月が入力されていなければ31日
    
    // 【MEMO】
    // new Date(年,月,0)は、その月の最終日が取れる
    // ※javaScriptの月は0オリジン
    // 計算したい月の翌月の0日目は、計算したい月の最終日なので、この書き方で良い
    return new Date(year,month,0).getDate();
  }

  // 計算結果をもとに、日の配列を動的に生成
  const daysCount = getDaysInMonth(birthYear,birthMonth);
  const days = Array.from({length:daysCount},(_,i)=>i+1);

  // --- 住所検索ボタンが押されたときの関数 ---
  const handleSearchAddress = async () =>{
    // バリデーションチェック
    if(!zipcode || zipcode.length !== 7 ){
      setAddressError('郵便番号は7桁で入力してください。(ハイフンなし)');
      return;
    }
    setAddressError(''); // クリア

    try{
      // API呼び出し
      const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`);

      // json変換
      const data = await response.json();

      if(data.results === null){
        setAddressError('住所が見つかりませんでした');
        return;
      }
      
      // 住所の取得に成功したのでStageを更新して画面に反映
      const result = data.results[0];
      setPrefecture(result.address1);
      setCity(result.address2);
      setStreet(result.address3);
    }catch(error){
      console.error('通信エラー:',error);
      setAddressError('通信エラーが発生しました。');
    }
  };

  return (
    <div className="container"> 

      <h1>お問い合わせ</h1>

      <form id="contactForm">
        <div>
          <label htmlFor="name">お名前:</label>
          <input type="text" id="name" name="user_name" />
        </div>

        <div>
          <label htmlFor="Birthday">生年月日:</label>
          <div className="date-select-wrapper">
            
            <select 
              id="selectYear"
              name="user_birth_year"
              value={birthYear}
              onChange={(e)=>setBirthYear(e.target.value)}
            >
              <option value="">--</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>年

            <select 
              id="selectMonth"
              name="user_birth_month"
              value={birthMonth}
              onChange={(e)=> setBirthMonth(e.target.value)}
            >
              <option value="">--</option>
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>月

            <select 
              id="selectDay"
              name="user_birth_day"
            >
              <option value="">--</option>
              {days.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>日

          </div>
          {/* 隠しフィールド */}
          <input type="hidden" id="hiddenBirthday" name="user_birthday" value="" />
        </div>

        {/* 住所エリア */}
        <div>
          <label htmlFor="title-address">住所</label>
          <div className="address-form-container">
            <div className="form-group">
              <label htmlFor="zipcode">郵便番号(7桁)</label>
              <div className="zipcode-wrapper">
                <input  type="text"
                        id="zipcode"
                        name="user_zipcode"
                        maxLength="7"
                        placeholder="1000001"
                        value={zipcode}
                        onChange={(e)=>setZipcode(e.target.value)}
                />
                <button 
                  id="searchBtn"
                  type="button"
                  onClick={handleSearchAddress}
                  >
                    住所検索
                  </button>
              </div>
              <span id="errorMsg" className="error-text">{addressError}</span>
            </div>

            <div className="form-group">
              <label htmlFor="prefecture">都道府県</label>
              <input 
                type="text"
                id="prefecture"
                name="user_prefecture"
                placeholder="東京都"
                readOnly 
                value={prefecture}/>
            </div>

            <div className="form-group">
              <label htmlFor="city">市区町村</label>
              <input
                type="text"
                id="city"
                name="user_city"
                placeholder="千代田区"
                readOnly 
                value={city}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">番地・建物名</label>
              <input 
                type="text"
                id="address"
                name="user_street"
                placeholder="千代田1-1" 
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* メールアドレス */}
        <div>
          <label htmlFor="email">メールアドレス:</label>
          <input type="email" id="email" name="user_email" />
        </div>

        {/* お問い合わせ内容 */}
        <div>
          <label htmlFor="message">お問い合わせ内容:</label>
          <div className="input-group-vertical">
            <textarea id="message" name="user_message"></textarea>
            <span id="messageError" className="error-text"></span>
          </div>
        </div>

        <div>
          <button type="submit">送信</button>
        </div>
      </form>

      {/* 管理者画面リンク */}
      <div className="admin-link">
        <button onClick={() => window.location.href='/admin'}>管理者画面</button>
      </div>
    </div>
  )
}

export default App