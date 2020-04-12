import React, { Component } from 'react'
import Table from './Table'

class App extends Component {
  
  //State is local and publicly accessible for every component
  state = {
    characters: [
      {
        name: 'Charlie',
        job: 'Janitor'
      },
      {
        name: 'Mac',
        job: 'Bouncer'
      },
      {
        name: 'Dee',
        job: 'Aspiring actress'
      },
      {
        name: 'Dennis',
        job: 'Bartender'
      }
    ]
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


  render() {
    const { characters } = this.state

    return (
      <div className="container">
        <Table characterData={characters} removeCharacter={this.removeCharacter} />
      </div>
    )
  }
}

export default App