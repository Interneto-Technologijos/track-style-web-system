import { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import debounce from "debounce";
import { Bar } from "react-chartjs-2";

import "react-bootstrap-typeahead/css/Typeahead.css";
import "./App.css";

import { searchTracks, getTrackStyles } from "./api";

function App() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [options, setOptions] = useState([]);
  const [styles, setStyles] = useState({});

  useEffect(() => {
    setQuery(tracks.length && tracks[0].name);
    if (!tracks.length) setStyles({});
  }, [tracks]);

  useEffect(() => {
    if (!query || query.length < 3) {
      return;
    }
    searchTracks(query).then(setOptions);
  }, [query]);

  const styleButtonOnClick = () => {
    getTrackStyles(tracks[0].id).then(setStyles);
  };

  return (
    <Container>
      <Row style={{ paddingTop: 100 }}>
        <Col style={{ textAlign: "center" }}>
          <p>Search for music track</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Typeahead
            id="track-search-typeahead"
            labelKey="name"
            onChange={setTracks}
            options={options}
            onInputChange={debounce(setQuery, 500)}
            placeholder="Choose a track..."
            selected={tracks}
            clearButton
          />
        </Col>
      </Row>
      <Row style={{ paddingTop: 20 }}>
        <Col style={{ textAlign: "center" }}>
          <Button
            variant="primary"
            disabled={!tracks.length || !query}
            onClick={styleButtonOnClick}
          >
            What is the style?
          </Button>
        </Col>
      </Row>
      <Row style={{ paddingTop: 20 }}>
        <Col style={{ textAlign: "center" }}>
          {styles.rock && (
            <Bar
              data={{
                labels: ["Rock", "RnB", "Pop", "Rap", "Electro", "Classical"],
                datasets: [
                  {
                    label: "Styles",
                    data: [
                      styles.rock,
                      styles.rnb,
                      styles.pop,
                      styles.rap,
                      styles.electro,
                      styles.classical,
                    ],
                  },
                ],
              }}
              width={100}
              height={300}
              options={{ maintainAspectRatio: false }}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
