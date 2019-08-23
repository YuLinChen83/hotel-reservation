import React, { Fragment, useState, useEffect } from 'react';
import moment from 'moment';
import { useGetApi, usePostApi } from 'utils/fetchHooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWifi, faConciergeBell, faTemperatureLow, faWind, faUtensils, faBaby, faMountain, faCocktail, faSmoking, faPhone, faCouch, faDog, faTv,
} from '@fortawesome/free-solid-svg-icons';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const mapAmenities = {
  'Wi-Fi': { icon: faWifi, text: 'Wifi' },
  'Room-Service': { icon: faConciergeBell, text: 'Room Service' },
  Refrigerator: { icon: faTemperatureLow, text: '冰箱' },
  Television: { icon: faTv, text: '電視' },
  'Smoke-Free': { icon: faSmoking, text: '可吸煙' },
  'Mini-Bar': { icon: faCocktail, text: 'Mini Bar' },
  Sofa: { icon: faCouch, text: '沙發' },
  'Child-Friendly': { icon: faBaby, text: '適合兒童' },
  Breakfast: { icon: faUtensils, text: '早餐' },
  'Air-Conditioner': { icon: faWind, text: '空調' },
  'Great-View': { icon: faMountain, text: '景觀' },
  'Pet-Friendly': { icon: faDog, text: '寵物攜帶' },
};

const mapText = {
  name: '預約者姓名', tel: '聯絡電話', from: '入住日期', to: '退房日期',
};

const RoomlInfo = ({ match }) => {
  const [{ data, isLoading, isError }, setFetchUrl] = useGetApi(
    `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${match.params.id}`,
    {
      room: [{
        amenities: {}, descriptionShort: { Bed: [] }, checkInAndOut: {}, imageUrl: [],
      }],
      booking: [],
    },
  );
  const [{
    data: postResult, isLoading: isPostLoading, isError: isPostError, errMsg,
  }, postReserveRoom] = usePostApi(
    `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${match.params.id}`,
    {},
    {},
  );
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [bookForm, setBookForm] = useState({
    name: '',
    tel: '',
    rooms: 1,
    from: undefined,
    to: undefined,
  });
  const [validator, setValidator] = useState({
    name: '',
    tel: '',
    from: '',
    to: '',
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleDayClick = (day) => {
    const { from, to } = DateUtils.addDayToRange(day, { from: bookForm.from, to: bookForm.to });
    setBookForm({ ...bookForm, from, to });
    setValidator({ ...validator, from: '', to: '' });
    console.log(from, to);
  };

  const handleBlur = (inputName) => {
    if (!bookForm[inputName]) {
      setValidator({ ...validator, [inputName]: `請輸入${mapText[inputName]}` });
    } else setValidator({ ...validator, [inputName]: '' });
  };

  const checkInput = (inputNames, validator) => {
    let result = true;
    inputNames.forEach((name) => {
      if (!bookForm[name]) {
        if (result) result = false;
        validator[name] = `請輸入${mapText[name]}`;
      }
    });
    return [result, validator];
  };

  return (
    <div>
      <div className="room-photos">
        {
          data.room[0].imageUrl.map((img, index) => (
            <div key={`room-photo-${index}`} className={`photo${index === activePhotoIdx ? ' active' : ''}`} style={{ backgroundImage: `url(${img})` }} />
          ))
      }
      </div>
      <div className="room-main">
        <div className="room-info">
          <h1>{data.room[0].name}</h1>
          <p>{data.room[0].description}</p>
          <div className="price">
            <span>{`平日每晚 $ ${data.room[0].normalDayPrice}`}</span>
            <span>{`假日每晚 $ ${data.room[0].holidayPrice}`}</span>
          </div>
          <div className="hr" />
          <div className="short-description">
            <div>{`房客人數限制： ${data.room[0].descriptionShort.GuestMin}-${data.room[0].descriptionShort.GuestMax} 人`}</div>
            <div>{`房間大小： ${data.room[0].descriptionShort.Footage} 平方公尺`}</div>
            <div>{`床型：${data.room[0].descriptionShort.Bed.join(', ')}`}</div>
            <div>{`衛浴數量： ${data.room[0].descriptionShort['Private-Bath']} 間`}</div>
            <div>{`checkIn 時間：${data.room[0].checkInAndOut.checkInEarly}-${data.room[0].checkInAndOut.checkInLate}`}</div>
            <div>{`checkOut 時間：${data.room[0].checkInAndOut.checkOut}`}</div>
          </div>
          <div className="hr" />
          <div className="amenities">
            <ul>
              {
              Object.keys(mapAmenities).map((key) => (
                <li key={key} style={data.room[0].amenities[key] ? { opacity: 0.3 } : {}}>
                  <FontAwesomeIcon icon={mapAmenities[key].icon} size="2x" />
                  {mapAmenities[key].text}
                </li>
              ))
            }
            </ul>
          </div>
        </div>
        {/* <div className="booknow">
          <h3>{postResult.success ? '預定成功' : '預定失敗'}</h3>
          <div>
            {
              postResult.success ? (
                <>
                  <p>您已預定完成，詳細內容將傳送簡訊至您的手機。</p>
                  <span>Name</span>
                  {postResult.booking[0].name}
                  <br />
                  <span>Tel.</span>
                  {postResult.booking[0].tel}
                  <br />
                  <span>Rooms</span>
                  {bookForm.rooms}
                  <br />
                  <span>Date</span>
                  {postResult.booking.map((item) => item.date).join(',')}
                  <br />
                </>
              ) : errMsg
            }
          </div>
        </div> */}
        <div className="booknow">
          <h2>BOOK NOW</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const validateFields = { ...validator };
            const [result, checkedValidator] = checkInput(['name', 'tel', 'from', 'to'], validateFields);
            if (!result) {
              console.log(checkedValidator);
              setValidator(checkedValidator);
              return;
            }
            postReserveRoom({
              name: bookForm.name, tel: bookForm.tel, date: [moment(bookForm.from).format('YYYY-MM-DD'), moment(bookForm.to).format('YYYY-MM-DD')],
            });
          }}
          >
            <div>
              <label htmlFor="name">
              name
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={bookForm.name}
                  placeholder="請輸入預約者姓名"
                  onChange={(e) => setBookForm({ ...bookForm, name: e.target.value })}
                  onBlur={() => handleBlur('name')}
                />
              </label>
              {validator.name && (
              <div className="warning">
                <span>
                  {`* ${validator.name}`}
                </span>
              </div>
              )}
            </div>
            <div>
              <label htmlFor="tel">
              tel.
                <input
                  type="text"
                  name="tel"
                  value={bookForm.tel}
                  placeholder="請輸入聯絡電話"
                  onChange={(e) => setBookForm({ ...bookForm, tel: e.target.value })}
                  onBlur={() => handleBlur('tel')}
                />
              </label>
              {validator.tel && (
                <div className="warning">
                  <span>
                    {`* ${validator.tel}`}
                  </span>
                </div>
              )}
            </div>
            <div>
              <label htmlFor="rooms">
              rooms
                <input type="number" name="rooms" min="0" step="1" value={bookForm.rooms} placeholder="請輸入預定房間數量" onChange={(e) => setBookForm({ ...bookForm, rooms: e.target.value })} />
              </label>
            </div>
            <div className="checkinout">
              <div>
                <label htmlFor="checkin">
                  check in
                  <input
                    disabled
                    type="text"
                    name="checkin"
                    value={bookForm.from ? bookForm.from.toLocaleDateString() : ''}
                  />
                </label>
                {validator.from && (
                  <div className="warning">
                    <span>
                      {`* ${validator.from}`}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="checkout">
                  check out
                  <input
                    disabled
                    type="text"
                    name="checkout"
                    value={bookForm.to ? bookForm.to.toLocaleDateString() : ''}
                  />
                </label>
                {validator.to && (
                  <div className="warning">
                    <span>
                      {`* ${validator.to}`}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="datepicker">
              <DayPicker
                className="Selectable"
                numberOfMonths={1}
                selectedDays={[bookForm.from, { from: bookForm.from, to: bookForm.to }]}
                modifiers={{ start: bookForm.from, end: bookForm.to }}
                onDayClick={handleDayClick}
              />
            </div>
            <div>
              <input type="submit" value="立即預訂" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoomlInfo;
