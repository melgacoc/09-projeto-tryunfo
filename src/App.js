import React from 'react';
import Form from './components/Form';
import './components/Form.css';
import Card from './components/Card';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '0',
    cardAttr2: '0',
    cardAttr3: '0',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    isSaveButtonDisabled: true,
    hasTrunfo: false,
    newCard: [],
  }

  isSaveButtonDisabled = () => {
    const {
      cardName,
      cardImage,
      cardDescription,
      cardAttr1,
      cardAttr3,
      cardAttr2 } = this.state;
    const verifyStrings = cardName.length === 0
    || cardImage.length === 0
    || cardDescription.length === 0;
    const maxAttr = 90;
    const maxTotalAttr = 210;
    const verifyAttr1 = Number(cardAttr1) < 0 || Number(cardAttr1) > maxAttr;
    const verifyAttr2 = Number(cardAttr2) < 0 || Number(cardAttr2) > maxAttr;
    const verifyAttr3 = Number(cardAttr3) < 0 || Number(cardAttr3) > maxAttr;
    const verifyAttrs = verifyAttr1 || verifyAttr2 || verifyAttr3;
    const maxCardValues = Number(cardAttr1) + Number(cardAttr2)
    + Number(cardAttr3);
    const verifyTotalAttr = maxCardValues > maxTotalAttr;
    const buttonIsDisable = verifyStrings || verifyAttrs || verifyTotalAttr;

    this.setState({
      isSaveButtonDisabled: buttonIsDisable,
    });
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => {
      this.isSaveButtonDisabled();
    });
  }

  onSaveButtonClick = (event) => {
    event.preventDefault();
    const {
      cardName,
      cardImage,
      cardDescription,
      cardAttr1,
      cardAttr3,
      cardAttr2,
      cardRare,
      cardTrunfo } = this.state;

    const cards = {
      cardName,
      cardImage,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      cardTrunfo,
    };

    if (cards.cardTrunfo) {
      this.setState({
        hasTrunfo: true,
      });
    }

    this.setState((prevState) => ({
      newCard: [...prevState.newCard, cards],
    }));

    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    });
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      newCard } = this.state;

    return (
      <div className="render-box">
        <h1>Tryunfo</h1>
        <Form
          classname="form-box"
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardImage={ cardImage }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          onInputChange={ this.onInputChange }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardImage={ cardImage }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
        />
        {newCard.map((element) => (
          <Card
            key={ element.cardName }
            cardName={ element.cardName }
            cardDescription={ element.cardDescription }
            cardAttr1={ element.cardAttr1 }
            cardAttr2={ element.cardAttr2 }
            cardAttr3={ element.cardAttr3 }
            cardImage={ element.cardImage }
            cardRare={ element.cardRare }
            cardTrunfo={ element.cardTrunfo }
          />
        ))}
      </div>
    );
  }
}

export default App;
