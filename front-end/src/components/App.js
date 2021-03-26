import { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import debounce from "debounce";
import { Bar } from "react-chartjs-2";

import "react-bootstrap-typeahead/css/Typeahead.css";
import "./App.css";

import {
  searchTracks,
  getTrackStyles,
  suggestTrackStyles,
} from "../services/api";

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

  const suggestedStyleButtonOnClick = (suggestedStyles) => {
    suggestTrackStyles(tracks[0].id, suggestedStyles).catch(console.error);
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
      <Row style={{ paddingTop: 20 }}>
        <Col style={{ textAlign: "center" }}>
          <Button
            variant="primary"
            disabled={!styles.rock}
            onClick={() =>
              suggestedStyleButtonOnClick({
                rock: 1,
                rnb: 0,
                pop: 0,
                rap: 0,
                electro: 0,
                classical: 0,
              })
            }
          >
            Rock
          </Button>
        </Col>
        <Col style={{ textAlign: "center" }}>
          <Button
            variant="primary"
            disabled={!styles.rock}
            onClick={() =>
              suggestedStyleButtonOnClick({
                rock: 0,
                rnb: 1,
                pop: 0,
                rap: 0,
                electro: 0,
                classical: 0,
              })
            }
          >
            RnB
          </Button>
        </Col>
        <Col style={{ textAlign: "center" }}>
          <Button
            variant="primary"
            disabled={!styles.rock}
            onClick={() =>
              suggestedStyleButtonOnClick({
                rock: 0,
                rnb: 0,
                pop: 1,
                rap: 0,
                electro: 0,
                classical: 0,
              })
            }
          >
            Pop
          </Button>
        </Col>
        <Col style={{ textAlign: "center" }}>
          <Button
            variant="primary"
            disabled={!styles.rock}
            onClick={() =>
              suggestedStyleButtonOnClick({
                rock: 0,
                rnb: 0,
                pop: 0,
                rap: 1,
                electro: 0,
                classical: 0,
              })
            }
          >
            Rap
          </Button>
        </Col>
        <Col style={{ textAlign: "center" }}>
          <Button
            variant="primary"
            disabled={!styles.rock}
            onClick={() =>
              suggestedStyleButtonOnClick({
                rock: 0,
                rnb: 0,
                pop: 0,
                rap: 0,
                electro: 1,
                classical: 0,
              })
            }
          >
            Electro
          </Button>
        </Col>
        <Col style={{ textAlign: "center" }}>
          <Button
            variant="primary"
            disabled={!styles.rock}
            onClick={() =>
              suggestedStyleButtonOnClick({
                rock: 0,
                rnb: 0,
                pop: 0,
                rap: 0,
                electro: 0,
                classical: 1,
              })
            }
          >
            Classical
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
