import React from 'react';
import firebase from "./firestore";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import { S3UploadService } from './s3upload';
import Snackbar from '@material-ui/core/Snackbar';

export class Signup extends React.Component {

  constructor() {
    super();

    this.state = {
      submitAttempted: false,
      firstName: "",
      lastName: "",
      cv: null,
      errors: {},
      snackOpen: false
    };
  }

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => this.formValid());
  }

  handleSubmit = async () => {
    if (this.formValid()) {

      const db = firebase.firestore();
      db.settings({ timestampsInSnapshots: true });

      const docUrl = await S3UploadService.uploadDocument(this.state.cv);
      console.log(docUrl);

      await db.collection("candidates-react").add({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        cvUrl: docUrl
      });

      this.setState({
        submitAttempted: false,
        firstName: "",
        lastName: "",
        cv: null,
        snackOpen: true
      });


    }
  }

  onSubmit = async e => {
    e.preventDefault();

    this.setState({ submitAttempted: true }, this.handleSubmit);
  };

  formValid = () => {
    if (this.state.submitAttempted) {
      const errors = {};
      if (!this.state.firstName) {
        errors['firstName'] = "Please enter your first name";
      }
      if (!this.state.lastName) {
        errors['lastName'] = "Please enter your last name";
      }
      if (!this.state.cv) {
        errors['cv'] = "Please attach your CV";
      }

      this.setState({ errors: errors });
      return Object.keys(errors).length === 0;
    } else {
      return true;
    }
  }

  getFile = event => {
    console.log(event.target.files);
    if (event.target.files && event.target.files.length === 1) {
      this.setState({ cv: event.target.files[0] }, () => this.formValid());
    }
  }

  handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snackOpen: false });
  };

  render() {
    return (
      <div>
        <p>To sign up as a candidate, please enter your name and upload your CV:</p>
        <form onSubmit={this.onSubmit}>
          <div className="field">
            <TextField
              type="text"
              name="firstName"
              label="First Name"
              onChange={this.updateInput}
              value={this.state.firstName}
              error={!!this.state.errors["firstName"]}
              helperText={this.state.errors["firstName"]}
            />
          </div>

          <div className="field">
            <TextField
              type="text"
              name="lastName"
              label="Last Name"
              onChange={this.updateInput}
              value={this.state.lastName}
              error={!!this.state.errors["lastName"]}
              helperText={this.state.errors["lastName"]}
            />
          </div>

          <input
            id="contained-button-file"
            type="file"
            hidden
            onChange={this.getFile}
          />
          <div className="field">
            <label htmlFor="contained-button-file">
              <Button type="button" variant="outlined" component="span">Upload CV <Icon>attach_file</Icon></Button>
            </label>
            <div style={{ color: "red" }}>{this.state.errors["cv"]}</div>
          </div>
          <div className="field">
            <Button type="submit" variant="contained" color="primary">Sign Up</Button>
          </div>
        </form>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snackOpen}
          autoHideDuration={5000}
          onClose={this.handleCloseSnack}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Thanks, your details have been submitted</span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={this.handleCloseSnack}>
              OK
            </Button>,
          ]}
        />

      </div >
    );
  }
}