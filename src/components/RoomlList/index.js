import React, { Fragment, useState, useEffect } from 'react';
import history from 'historyConfig';
import { useGetApi } from 'utils/fetchHooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faMapMarkerAlt, faBus } from '@fortawesome/free-solid-svg-icons';

const RoomlList = () => {
  const [{ data, isLoading, isError }, setFetchUrl] = useGetApi(
    'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms',
    { items: [] },
  );
  const images = data.items.map((item) => item.imageUrl);
  return (
    <>
      <div className="carousel">
        {
          images.length > 0 && (
            images.map((img, index) => (
              <Fragment key={`carousel-${index}`}>
                <input type="checkbox" className="faux-ui-facia" />
                <div className="slide" slide={index} annot="">
                  <img src={img} alt={`Slide ${index}`} />
                </div>
              </Fragment>
            ))
          )
        }
        <div className="counter" count={images.length}>
          {` / ${images.length}`}
        </div>
      </div>
      <div className="social-media">
        <ul>
          <li />
          <li>
            <a href="/#">Facebook</a>
          </li>
          <li>
            <a href="/#">Instagram</a>
          </li>
          <li>
            <a href="/#">Twitter</a>
          </li>
          <li />
        </ul>
      </div>
      <div className="placement">
        <div>
          <div>
            <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" />
          </div>
          <h3>UPCOMING NEIGHBORHOODS</h3>
          <p>tourist attractions, industrial park, college, hospital, airport, major cross road for through traffic, etc</p>
        </div>
        <div>
          <div>
            <FontAwesomeIcon icon={faBus} size="2x" />
          </div>
          <h3>Transportation connectivity</h3>
          <p>roads, taxi, metro, subway, buses, trains, walking, bicycle paths, etc</p>
        </div>
      </div>
      <div className="hotels-info">
        <div className="text">
          <h2>Enjoy Your Stay</h2>
          <p>PERFECT PLACE FOR HOLIDAY</p>
        </div>
        {isError && <div>Something went wrong ...</div>}
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <div className="roomlist">
            {
                data.items.map((hotel) => (
                  <div
                    role="presentation"
                    key={hotel.id}
                    className="hotel"
                    onClick={() => {
                      history.push(
                        `/room/${hotel.id}`,
                      );
                    }}
                  >
                    <div className="bg" style={{ backgroundImage: `url(${hotel.imageUrl})` }} />
                    <div className="info">
                      <h3>{hotel.name}</h3>
                      <span className="more">
                        more
                        <FontAwesomeIcon icon={faChevronRight} />
                      </span>
                      <p>
                        <span>平日 $</span>
                        <span className="price">{hotel.normalDayPrice}</span>
                        {' / '}
                        <span>假日 $</span>
                        <span className="price">{hotel.holidayPrice}</span>
                      </p>
                    </div>
                  </div>
                ))
              }
          </div>

        )}
      </div>
    </>
  );
};

export default RoomlList;
