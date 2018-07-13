class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {form: 0, input: [], info: []};
    this.handleClick = this.handleClick.bind(this);
    this.handleFirst = this.handleFirst.bind(this);
    this.handleSecond = this.handleSecond.bind(this);
    this.handleThird = this.handleThird.bind(this);
  }
  handleClick() {
    this.setState((prevState) => {
      return {form: prevState.form + 1};
    });
  }
  handleFirst() {
    var names = ['firstName', 'lastName', 'email', 'password'];
    var localStorage = [];
    names.forEach(function(name) {
      var value = document.getElementsByName(name)[0].value;
      localStorage.push(value);
    })
    this.state.input = this.state.input.concat(localStorage);
    console.log(this.state.input);
    this.handleClick();
  }
  handleSecond() {
    var names = ['line1', 'city', 'state', 'zip', 'phone'];
    var localStorage = [];
    names.forEach(function(name) {
      var value = document.getElementsByName(name)[0].value;
      localStorage.push(value);
    })
    this.state.input = this.state.input.concat(localStorage);
    console.log(this.state.input);
    this.handleClick();
  }
  handleThird() {
    var names = ['card', 'month', 'year', 'cvv', 'billing'];
    var localStorage = [];
    names.forEach(function(name) {
      var value = document.getElementsByName(name)[0].value;
      localStorage.push(value);
    })
    this.state.input = this.state.input.concat(localStorage);
    console.log(this.state.input);

    $.ajax({
      method: "POST",
      url: "http://localhost:3000/",
      data: {result: this.state.input},
      dataType: 'json',
      success: function(data) {
        console.log(data);
      }
    })
    this.handleClick();
  }

  render() {
    if (this.state.form === 0 || this.state.form > 4) {
      return (
        <div>
          <h1>Are you ready to check out?</h1>
            <button onClick={this.handleClick}>
                Proceed
            </button>
        </div>
      )
    } else if (this.state.form === 1) {
      return (
        <div>
          <h1>Account info: </h1>
            <FirstForm  />
            <button onClick={this.handleFirst}>
                Next
            </button>
        </div>
      )
    } else if (this.state.form === 2) {
      return (
        <div>
          <h1>Where should we ship it?</h1>
            <SecondForm  />
            <button onClick={this.handleSecond}>
                Next
            </button>
        </div>
      )
    } else if (this.state.form === 3) {
      return (
        <div>
          <h1>Card information: </h1>
            <ThirdForm />
            <button onClick={this.handleThird}>
                Finish
            </button>
        </div>
      )
    } else if (this.state.form === 4) {
      return (
        <div>
          <h1>Verify information: </h1>
          <Verification inputs={this.state.input}/>
            <button onClick={this.handleClick}>
                Looks good!
            </button>
        </div>
      )
  }
}
}

function FirstForm(props){
  return(
    <form>
      first name: <input type="text" name="firstName"/><br />
      last name: <input type="text" name="lastName"/><br />
      email: <input type="text" name="email"/><br />
      password: <input type="text" name="password"/><br />
    </form>
 )
}

function SecondForm(props) {
  return(
    <form>
      street address: <input type="text" name="line1"/><br />
      city: <input type="text" name="city"/><br />
      state: <input type="text" name="state"/><br />
      zip: <input type="text" name="zip"/><br />
      phone: <input type="text" name="phone"/><br />
    </form>
 )
}

function ThirdForm(props) {
  return(
    <form>
      card number: <input type="text" name="card"/><br />
      expiry month: <input type="text" name="month"/><br />
      expiry year: <input type="text" name="year"/><br />
      cvv: <input type="text" name="cvv"/><br />
      billingZip: <input type="text" name="billing"/><br />
    </form>
 )
}

var fields = ['First name', 'Last name', 'Email', 'Password', 'Street address', 'City', 'State', 'Zip', 'Phone', 'Card number', 'Expiration Month', 'Expiration Year', 'CVV', 'Billing zip'];

function Verification(props) {
  return(
    <div>
      {props.inputs.map((elem, i) => (
        <div>{fields[i]}: {elem}</div>
      )
    )}
    </div>
  )
}
//getElementsByName()

ReactDOM.render(<App />, document.getElementById('app'));
