import React, { Component } from 'react'
import Table from './Table'
import Form from './Form'

class App extends Component {
  
  //State is local and publicly accessible for every component
  state = {
    characters: [],
  }

  //Still not super sure about this function declaration syntax, try with traditional parentheses
  removeCharacter = index => {
    const { characters } = this.state

    //Create a new array, but if the index matches the index passed in, don't include it
    this.setState({
      characters: characters.filter((character, i) => {
        return i !== index
      }),
    })
  }

  handleSubmit = character => {
    this.setState({ characters: [...this.state.characters, character] })
  }


  render() {
    const { characters } = this.state

    return (
        <div className="container">
          <Table characterData={characters} removeCharacter={this.removeCharacter} />
          <Form handleSubmit={this.handleSubmit} />
        </div>
    )
  }
}

export default App