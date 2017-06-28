// Code begins at line 146, data temporarily stored inline.

var data = {
  "metadata": {
    "tier IDs": {
      "T1": "A'ingae",
      "T2": "A'ingae Words",
      "T3": "A'ingae Morphemes",
      "T4": "English Translation",
      "T5": "Spoken English"
    },
    "speaker IDs": {
      "S1": {
        "name": "Hugo Lucitante",
        "language": "A'ingae",
        "tier": "T1"
      },
      "S2": {
        "name": "Scott AnderBois",
        "language": "English",
        "tier": "T5"
      }
    }
  },
  "sentences": [
    {
      "speaker": "S1",
      "start_time": 0,
      "end_time": 3005,
      "num_slots": 12,
      "text": "Ecuadorningi canse'fa mil a'indeccu",
      "dependents": [
        {
          "tier": "T2",
          "values": [
            {
              "start_slot": 0,
              "end_slot": 3,
              "value": "Ecuadorningi"
            },
            {
              "start_slot": 3,
              "end_slot": 6,
              "value": "canse'fa"
            },
            {
              "start_slot": 6,
              "end_slot": 8,
              "value": "mil"
            },
            {
              "start_slot": 8,
              "end_slot": 12,
              "value": "a'indeccu"
            }
          ]
        },
        {
          "tier": "T3",
          "values": [
            {
              "start_slot": 0,
              "end_slot": 3,
              "value": "Ecuador=ni=ngi"
            },
            {
              "start_slot": 3,
              "end_slot": 6,
              "value": "canse='fa"
            },
            {
              "start_slot": 6,
              "end_slot": 8,
              "value": "mil"
            },
            {
              "start_slot": 8,
              "end_slot": 12,
              "value": "a'i=ndeccu"
            }
          ]
        },
        {
          "tier": "T4",
          "values": [
            {
              "start_slot": 0,
              "end_slot": 12,
              "value": "1000 of us live in Ecuador."
            }
          ]
        }
      ]
    },
    {
      "speaker": "S1",
      "start_time": 3005,
      "end_time": 7211,
      "num_slots": 12,
      "text": "Toya'caen Colombiani quentsu canse'fa ba've mil",
      "dependents": [
        {
          "tier": "T2",
          "values": [
            {
              "start_slot": 2,
              "end_slot": 4,
              "value": "Toya'caen"
            },
            {
              "start_slot": 4,
              "end_slot": 5,
              "value": "Colombiani"
            },
            {
              "start_slot": 6,
              "end_slot": 8,
              "value": "quentsu canse'fa ba've"
            },
            {
              "start_slot": 8,
              "end_slot": 9,
              "value": "mil"
            }
          ]
        },
        {
          "tier": "T4",
          "value": "1000 of us live in Ecuador."
        }
      ]
    },
    {
      "speaker": "S2",
      "start_time": 6099,
      "end_time": 8814,
      "num_slots": 1,
      "text": "Hmm yes that's quite interesting.",
      "dependents": [
        
      ]
    }
  ]
};

var sentence_list = data["sentences"];
var num_sentences = sentence_list.length;
console.log("Number of sentences: " + num_sentences);

var output = [];

var test_value_list = sentence_list[0]["dependents"][0]["values"];
var test_value_list2 = sentence_list[0]["dependents"][1]["values"];
var test_value_list3 = sentence_list[0]["dependents"][2]["values"];
var test_sentence = sentence_list[0];
// var num = test_value_list.length;
// for (var i=0; i<num; i++) {
//   console.log(test_value_list[i]["start_slot"]);
// }
// console.log(test_value_list);

for (var i = 0; i<num_sentences; i++) {
  var sentence = sentence_list[i];
  var speaker = sentence["speaker"];
  output.push(<tr>{speaker}</tr>);
}

class Row extends React.Component {
  // I/P: num_slots, taken from parent sentence
  //      values, list of sentences with start/end times
  // O/P: single row of glossed sentence, with colspan spacing
  // Status: tested, working
  render() {
    var row = [];
    var current_slot = 0; // increments as slots are filled
    var final_slot = this.props.num_slots;
    var values = this.props.values;
    var num_values = values.length;

    for (var i=0; i<num_values; i++) {
      var v = values[i];
      var start_slot = v["start_slot"];
      var end_slot = v["end_slot"];
      var text = v["value"];

      if (start_slot > current_slot) {
        var diff = String(start_slot - current_slot);
        row.push(<td colSpan={diff}></td>);
      }
      var size = String(end_slot - start_slot);
      row.push(<td colSpan={size}>{text}</td>);
      current_slot = end_slot;
    }
    if (current_slot < final_slot) {
      var diff = String(final_slot - current_slot);
      row.push(<td colSpan={diff}></td>);
    }
    return <tr>{row}</tr>;
  }
}

class Sentence extends React.Component {
  // I/P: value, a sentence
  // O/P: table of glossed Row components
  // Status: tested, working
  render() {
    var sentence = this.props.value;
    var rows = [];
    var num_slots = sentence["num_slots"];
    rows.push(<tr><td colSpan={num_slots} className="topRow">{sentence["text"]}</td></tr>);
    var dependents = sentence["dependents"];
    var num_dependents = dependents.length;
    for (var i=0; i<num_dependents; i++) {
      var dependent = dependents[i];
      rows.push(<Row num_slots={num_slots} values={dependent["values"]} />);
    }
    return <table className="gloss"><tbody>{rows}</tbody></table>;
  }
}

class LabeledSentence extends React.Component {
  // I/P: value, a sentence
  // O/P: table of glossed Row components
  // Status: tested, working
  render() {
    var sentence = this.props.value;
    var label = sentence["speaker"];
    return <div className="labeledSentence"><span className="speakerLabel">{label}: </span><Sentence value={sentence} /></div>;
  }
}

class TimeBlock extends React.Component {
  // I/P: sentences, a list of sentences with the same start time
  // O/P: div containing multiple LabeledSentences
  // Status: untested
  render() {
    var sentences = this.props.sentences;
    var num_sentences = sentences.length;
    var output = [];
    for (var i=0; i<num_sentences; i++) {
      var sentence = sentences[i];
      output.push(<LabeledSentence value={sentence}/>)
    }
    return <div className="timeBlock">{output}</div>;
  }
}

// class Speaker extends React.Component {
//   render() {
//     return <h1>Speaker: {this.props.name}</h1>;
//   }
// }

// function App() {
//   var speakerList = [];
//   for (var i=0; i<num_sentences; i++) {
//     var speaker = sentence_list[i]["speaker"];
//     speakerList.push(speaker);
//   }
//   var speakerListJSX = speakerList.map(function(name) {
//     return <Speaker name={name}/>;
//   })
//   console.log(speakerListJSX);
//   return <div>{speakerListJSX}</div>;
// }

// function App() {
//   var rows = [];
//   rows.push(<Row values={test_value_list} num_slots={12}/>);
//   rows.push(<Row values={test_value_list2} num_slots={12}/>);
//   rows.push(<Row values={test_value_list3} num_slots={12}/>);
//   return <table>{rows}</table>;
// }

ReactDOM.render(
  <TimeBlock sentences={[test_sentence, test_sentence]}/>,
  document.getElementById('example')
);