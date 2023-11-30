const Pet = (props) => {
  return React.createElement('div', {}, [
    React.createElement('h1', {}, props.name),
    React.createElement('h2', {}, props.animal),
    React.createElement('h2', {}, props.breed),
  ])
}

const App = () => {
  return React.createElement('div', {},
    React.createElement('h1', {}, 'Adopt Me!'),
    React.createElement(Pet, {name: 'Daisy', animal: 'Dog', breed: 'Cockapoo'}),
    React.createElement(Pet, {name: 'Blue', animal: 'Dog', breed: 'Whippet'}),
    React.createElement(Pet, {name: 'Willow', animal: 'Cat', breed: 'Grumpy'}),
    );
};

ReactDOM.render(React.createElement(App), document.getElementById('root'));
