import { Component } from "react";

class Carousel extends Component {
  static defaultProps = {
    images: ["http://pets-v2.dev-apis.com/pets/none.jpg"]
  };
  state = {
    active: 0
  };

  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index
    });
  }

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (<div className="carousel">
      <img src={images[active]} alt="animal" />
      <div className="carousel-smaller">
        {images.map((photo, index) => {
          /*
           * Adding a click event to an image is indeed bad a11y.  We should wrap it in a natively clickable element like a `<button>`.
           */

          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
          return (<img className={index === active ? "active" : ""}
                       key={photo}
                       src={photo}
                       alt="Animal thumbnail"
                       data-index={index}
                       onClick={this.handleIndexClick} />);
        })}
      </div>
    </div>);
  }
}

export default Carousel;
