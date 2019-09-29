import React from 'react';
import PropTypes from 'prop-types';

import './style.css';
import Button from '../Button';
import Star from '../Star';

const HandymanCard = ({
  imageSrc,
  imageAlt,
  HandymanName,
  handymanService,
  handymanBio,
  messageHandler,
  hireHandler,
  rate,
}) => {
  const starsNo = Array(rate).fill();
  return (
    <div className="card">
      <div className="card__image-container">
        <img
          className="card_image"
          src={
            'https://image.flaticon.com/icons/svg/307/307892.svg' || imageSrc
          }
          alt={imageAlt || 'handyman'}
        />
      </div>
      <div className="card__content">
        <div className="card__header">
          <div>
            <h2 className="card--name">{HandymanName}</h2>
            <span className="card--service">{handymanService}</span>
          </div>
          <div className="card--stars">
            {starsNo.map(number => (
              <Star key={number} />
            ))}
          </div>
        </div>
        <p className="card--bio">{handymanBio}</p>
        <div className="card__button-container">
          <Button className="hire--btn" butttonFunction={hireHandler}>
            Hire
          </Button>
          <Button className="message--btn" butttonFunction={messageHandler}>
            Message
          </Button>
        </div>
      </div>
    </div>
  );
};
HandymanCard.propTypes = {
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  HandymanName: PropTypes.string.isRequired,
  handymanService: PropTypes.string.isRequired,
  handymanBio: PropTypes.string.isRequired,
  hireHandler: PropTypes.func.isRequired,
  messageHandler: PropTypes.func.isRequired,
  rate: PropTypes.number.isRequired,
};

HandymanCard.defaultProps = {
  imageAlt: null,
  imageSrc: null,
};

export default HandymanCard;
