import React from "react";
import ReactDOM from "react-dom";

class RegTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { regData: [] };
    this.enrollData = this.enrollData.bind(this);
  }

  enrollData(data) {
    var regData = this.state.regData;
    regData.push(data);
    this.setState({ regData: regData });
  }

  render() {
    const styles = {
      fontFamily: "Roboto"
    };

    return (
      <div style={styles}>
        <RegisterForm enrollData={this.enrollData} />
        <RegisterTable regList={this.state.regData} />
      </div>
    );
  }
}

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 1,
      firstName: "",
      lastName: "",
      faculty: "",
      study: ""
    };
    this.updateState = this.updateState.bind(this);
    this.enrollData = this.enrollData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeRadio = this.handleChangeRadio.bind(this);
  }

  updateState(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  enrollData(data) {
    this.props.enrollData(data);
    this.setState({
      count: this.state.count + 1,
      firstName: "",
      lastName: "",
      faculty: "",
      study: ""
    });
  }

  handleChangeRadio(event) {
    this.setState({
      study: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <div className="inputs">
            <input
              type="text"
              value={this.state.firstName}
              name="firstName"
              placeholder="First Name"
              onChange={this.updateState}
            />
          </div>

          <div className="inputs">
            <input
              type="text"
              value={this.state.lastName}
              name="lastName"
              placeholder="Last Name"
              onChange={this.updateState}
            />
          </div>
          <div className="inputs">
            <select
              value={this.state.faculty}
              onChange={this.updateState}
              name="faculty"
            >
              <option value="">-Select faculty-</option>
              <option value="Business">Business</option>
              <option value="Education">Education</option>
              <option value="Medicine">Medicine</option>
              <option value="Science">Science</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>
          <div className="inputs">
            <label>
              Select type of study: <br />
            </label>
            <label>
              <input
                type="radio"
                value="Full"
                checked={this.state.study === "Full"}
                onChange={this.handleChangeRadio}
              />
              Full Time <br />
            </label>
            <label>
              <input
                type="radio"
                value="Part"
                checked={this.state.study === "Part"}
                onChange={this.handleChangeRadio}
              />
              Part Time
            </label>
          </div>
          <div className="inputs">
            <SubmitButton enrollData={this.enrollData} data={this.state} />
          </div>
        </div>
      </form>
    );
  }
}

function SubmitButton(props) {
  return (
    <button
      onClick={() => {
        props.enrollData(props.data);
      }}
    >
      Submit
    </button>
  );
}

function RegisterTable(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Faculty</th>
          <th>Study</th>
        </tr>
      </thead>
      <tbody>
        {props.regList.map((item, i) => (
          <tr key={i}>
            <td>{item.count}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.faculty}</td>
            <td>{item.study}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RegTable;
