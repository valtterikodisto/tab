import React from 'react'
import Autosuggest from 'react-autosuggest'
import '../styles/Autosuggest.scss'

class Autocomplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      suggestions: []
    }
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0
      ? []
      : this.props.options.filter(
          lang =>
            this.props
              .mapOptionToValue(lang)
              .toLowerCase()
              .slice(0, inputLength) === inputValue
        )
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  onSuggestionSelected = (e, { suggestion }) => {
    this.props.setValue(suggestion)
  }

  onBlur = (event, { highlightedSuggestion }) => {
    if (highlightedSuggestion) {
      this.props.setValue(highlightedSuggestion)
    } else {
      for (const option of this.props.options) {
        const optionValue = this.props.mapOptionToValue(option).toLowerCase()
        if (optionValue === this.state.value.trim().toLowerCase()) {
          this.props.setValue(option)
          this.setState({ value: this.props.mapOptionToValue(option) })
          break
        }
        this.props.setValue(null)
      }
    }
  }

  renderSuggestion = suggestion => <div>{this.props.mapOptionToValue(suggestion)}</div>

  render() {
    const { value, suggestions } = this.state
    const inputProps = {
      placeholder: this.props.placeholder,
      value,
      onChange: this.onChange,
      onBlur: this.onBlur
    }

    return (
      <div className="autosuggest">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.props.mapOptionToValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={this.onSuggestionSelected}
        />
      </div>
    )
  }
}

export default Autocomplete
