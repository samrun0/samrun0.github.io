import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ION from 'ion-3d-engine';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


window.addEventListener('load', () => {

  let degree = 10; 
  setInterval(() => {
    degree = degree + 1;
    // logoELm.style.transform = `rotate(${degree}deg)`;
    const logoELm = document.getElementById('logo');
    logoELm.style.setProperty('transform', `rotate(${degree}deg)`);
  }, 40);

  runIONEngine();
  
});


function runIONEngine() {
  /* Engine: */
  const canvas = document.getElementById('viewport');
  const engine = new ION.Engine({
      canvas: canvas,
      fullScreen: true,
      control: ION.SpaceControl,
      stats: true,
      vrEnabled: true,
  });


  /* React Component */
  const reactRootElement = document.getElementById('root');
  reactRootElement.style.width = `720px`;
  reactRootElement.style.height = `720px`;
  
  const reactGuiComponent = new ION.GUIComponent({
    rootElement: reactRootElement,
    ratio: 0.5,
  });
  reactGuiComponent.position.set(0, 3.5, -1);


  /* Entity */
  let reactGuiEntity = new ION.Entity();
  reactGuiEntity.addComponent(reactGuiComponent);
  engine.addEntity(reactGuiEntity);

  /* System */
  const guiSystem = new ION.GUISystem();
  engine.addSystem(guiSystem);

  /* Engine Start */
  engine.start();
}
