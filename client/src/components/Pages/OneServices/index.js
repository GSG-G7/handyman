import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import SearchInput from '../../common/SearchInput';
import HandymanCard from '../../common/HandymanCard';
import SliderCard from '../../common/sliderCard';
import Loader from '../../common/Loader';
import './style.css';

class Services extends Component {
  state = {
    oneServicesData: [],
    isExist: true,
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history,
    } = this.props;
    try {
      const services = await axios.get(`/api/v1/service/${id}`);
      this.setState({ oneServicesData: services.data.data });
      if (!services.data.data[0]) {
        this.setState({ isExist: false });
      }
    } catch (err) {
      history.push('/500');
    }
  }

  handleClick = id => {
    const { history } = this.props;
    history.push(`/profile/${id}`);
  };

  handleHireClick = handymanId => {
    const { history } = this.props;
    history.push(`/hire`, { handymanId });
  };

  render() {
    const { oneServicesData, isExist } = this.state;
    return (
      <section className="layout">
        {!oneServicesData[0] && isExist && <Loader />}
        {!isExist && <h1>No handymans for this services at yet </h1>}
        {oneServicesData[0] && (
          <span>
            <SearchInput name="search" placeholder="Search" />
            <div className="top-rated-cards">
              {oneServicesData.map(element => (
                <SliderCard
                  key={element}
                  handymanId={element.handyman_id}
                  handymanName={element.username}
                  handymanBio={element.description}
                  handymanService={element.name}
                  onSliderCardClick={this.handleClick}
                  onHireClick={this.handleHireClick}
                />
              ))}
            </div>
            <div className="handyman-cards">
              {oneServicesData.map(element => (
                <HandymanCard
                  key={element}
                  handymanId={element.handyman_id}
                  HandymanName={element.username}
                  handymanBio={element.description}
                  handymanService={element.name}
                  onCardClick={this.handleClick}
                  onHireClick={this.handleHireClick}
                />
              ))}
            </div>
          </span>
        )}
      </section>
    );
  }
}
Services.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Services;
