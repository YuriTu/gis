import React, {Component} from 'react';
import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
import DeckGL, {LineLayer, ScatterplotLayer, PolygonLayer} from 'deck.gl';
import {TripsLayer} from "@deck.gl/experimental-layers"

// Set your mapbox token here
const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

// Source data CSV
const DATA_URL = {
    BUILDINGS:
        'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/trips/buildings.json', // eslint-disable-line
    TRIPS:
        'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/trips/trips.json' // eslint-disable-line
};

const INITIAL_VIEW_STATE = {
    longitude: -74,
    latitude: 40.72,
    zoom: 13,
    maxZoom: 16,
    pitch: 45,
    bearing: 0
};
const LIGHT_SETTINGS = {
    lightsPosition: [-74.05, 40.7, 8000, -73.5, 41, 5000],
    ambientRatio: 0.05,
    diffuseRatio: 0.6,
    specularRatio: 0.8,
    lightsStrength: [2.0, 0.0, 0.0, 0.0],
    numberOfLights: 2
};

class Root extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0
        };
    }

    componentDidMount() {
        this._animate();
    }
    componentWillUnmount() {
        if (this._animationFrame) {
            window.cancelAnimationFrame(this._animationFrame);
        }
    }
    _animate() {
        const {
            loopLength = 1800, // unit corresponds to the timestamp in source data
            animationSpeed = 30 // unit time per second
        } = this.props;
        const timestamp = Date.now() / 1000;
        const loopTime = loopLength / animationSpeed;

        this.setState({
            time: ((timestamp % loopTime) / loopTime) * loopLength
        });
        this._animationFrame = window.requestAnimationFrame(this._animate.bind(this));
    }
  render() {
    return (
      <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          width="100%"
          height="100%">
          <PolygonLayer
              id = "buildings"
              data = {DATA_URL.BUILDINGS}
              extruded = {true}
              wireframe = {false}
              fp64 = {true}
              getFillColor ={[74,80,87]}
              lightSettings = {LIGHT_SETTINGS}
              opacity = {0.5}
              getPolygon = {f => f.polygon}
              getElevation = { f => f.height}
          />
          <TripsLayer
              id = {'id'}
              data = {DATA_URL.TRIPS}
          />
        <StaticMap
            reuseMaps
            mapStyle="mapbox://styles/mapbox/dark-v9"
            mapboxApiAccessToken={MAPBOX_TOKEN}
        />
      </DeckGL>
    );
  }
}

/* global document */
render(<Root />, document.body.appendChild(document.createElement('div')));
