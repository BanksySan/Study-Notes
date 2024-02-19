import { Component } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {

  state = { loading: true, showModal: false };

  async componentDidMount() {
    console.dir(this.props);
    console.log("this.props.params.id", this.props.params.id);
    const apiUrl = `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`;
    console.log("apiUrl", apiUrl);
    const response = await fetch(apiUrl);
    const json = await response.json();
    this.setState({ loading: false, ...json.pets[0] });
  }

  toggleModal = () => this.setState({ loading: false, showModal: !this.state.showModal });

  render() {
    if (this.state.loading) return <h2>Loading... </h2>;
    console.log("state", this.state);
    const { animal, breed, city, state, description, name, images, showModal } = this.state;
    return (<div className="details">
      <Carousel images={images} />
      <div>
        <h1>{name}</h1>
        <h2>{animal} - {breed}, {city}, {state}</h2>
        <ThemeContext.Consumer>
          {([theme]) => <button style={{ backgroundColor: theme }} onClick={this.toggleModal}>Adopt {name}</button>

          }
        </ThemeContext.Consumer>
        <p>{description}</p>
        {showModal ? <Modal>
          <div>
            <h1>Would you like to adopt {name}?</h1>
            <div className="buttons">
              <a href="https://bit.ly/pet-adopt">Yes</a>
              <button onClick={this.toggleModal}>No</button>
            </div>
          </div>
        </Modal> : null}
        <img src={images[0]} alt="The pet." />
      </div>
    </div>);
  }
}


const WrappedDetails = () => {
  const params = useParams();
  return <Details params={params} />;
};

export default WrappedDetails;
