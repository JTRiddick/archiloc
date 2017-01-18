
var mountNode = document.querySelector('#react-root');

class HelloMessage extends React.Component {
  render() {
    return <div>Hello Bob!</div>;
  }
}

ReactDOM.render(<HelloMessage />, mountNode);
