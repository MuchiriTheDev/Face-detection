import React, { useEffect, useCallback, useState } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import Navbar from "./Components/Navbar/Navbar";
import Logo from "./Components/Logo/Logo";
import Link from "./Components/Link/Link";
import Rank from "./Components/Rank/Rank";
import "./App.css";
import Faces from "./Components/Faces/Faces";
import "tachyons";
import Signing from "./Components/Signin/Signing";
import Register from "./Components/Register/Register";

const particleOptions = {
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      push: {
        quantity: 5,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: { value: "#ffffff" },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: { default: "bounce" },
      speed: 5,
    },
    number: {
      density: { enable: true, area: 900 },
      value: 125,
    },
    opacity: { value: 0.5 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 5 } },
  },
  detectRetina: true,
};

const App = () => {
  const [isSignedIn, setSignedIn] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState([]);
  const [route, setRoute] = useState("register");
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  });
  const [clicked, setClicked] = useState(false);

  const onLoadUser = (info) => {
    setUser(info);
  };

  const PAT = 'f6323bb144bf4318aa81773382463ed1'; // Replace with your actual key
  const USER_ID = 'clarifai';
  const APP_ID = 'main';
  const MODEL_ID = 'face-detection';
  const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

  const calculateFaceLocation = (data) => {
    const regions = data.outputs[0].data.regions;
    const inputImg = document.getElementById("input-image");
    const width = Number(inputImg.width);
    const height = Number(inputImg.height);

    return regions.map(region => ({
      leftCol: region.region_info.bounding_box.left_col * width,
      topRow: region.region_info.bounding_box.top_row * height,
      rightCol: width - region.region_info.bounding_box.right_col * width,
      bottomRow: height - region.region_info.bounding_box.bottom_row * height,
    }));
  };

  const onSearchInput = (evt) => {
    setImageUrl(evt.target.value);
    setClicked(evt.target.value !== "");
  };

  useEffect(() => {
    fetch("http://localhost:3000")
      .then(resp => resp.json())
      .then(console.log)
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  const onButtonClick = () => {
    setClicked(true);
    fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Key ${PAT}`,
      },
      body: JSON.stringify({
        "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID,
        },
        "inputs": [{ "data": { "image": { "url": imageUrl } } }],
      }),
    })
    .then(response => response.json())
    .then(result => {
      if (result.outputs) {
        const boxes = calculateFaceLocation(result);
        setBox(boxes);
        updateEntries();
      }
    })
    .catch(error => console.error('Error:', error));
  };

  const updateEntries = () => {
    fetch('http://localhost:3000/image', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: user.id }),
    })
    .then(resp => resp.json())
    .then(count => setUser(prevUser => ({ ...prevUser, entries: count })))
    .catch(err => console.error("Error updating entries:", err));
  };

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const onRouteChange = (route) => {
    setRoute(route);
    setSignedIn(route === "home");
    if (route === "home") setImageUrl('');
    if (route === "signing") setSignedIn(false);
  };

  return (
    <div className="app">
      <Particles className="particles" options={particleOptions} init={particlesInit} />
      <Navbar isSigned={isSignedIn} check={onRouteChange} />
      {route === "home" ? (
        <>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <Link onsearch={onSearchInput} clicked={onButtonClick} />
          <Faces clicked={clicked} image={imageUrl} size={box} />
        </>
      ) : route === "register" ? (
        <Register checkUser={setUser} loadUser={onLoadUser} check={onRouteChange} />
      ) : (
        <Signing checkUser={setUser} check={onRouteChange} />
      )}
    </div>
  );
};

export default App;