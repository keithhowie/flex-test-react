import React from 'react';
import firebase from "./firestore";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

export class Candidates extends React.Component {

  constructor() {
    super();
    const db = firebase.firestore();
    this.col = db.collection('candidates');
    this.state = {
      candidates: []
    }
  }

  componentDidMount() {
    this.unsubscribe = this.col.onSnapshot(next => {
      this.setState({ candidates: next.docs.map(doc => ({ id: doc.id, ...doc.data() })) });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  approve = async c => {
    await this.col.doc(c.id).update({ status: 'Approved' });
  };

  decline = async c => {
    await this.col.doc(c.id).update({ status: 'Declined' });
  };

  render() {
    return (
      <Paper className="candidate-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>CV</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.candidates.map(c => {
              return (
                <TableRow key={c.id}>
                  <TableCell component="th" scope="row">{c.firstName} {c.lastName}</TableCell>
                  <TableCell><a href={c.cvUrl} target="_blank" rel="noopener noreferrer">Download</a></TableCell>
                  <TableCell>{c.status || 'New'}</TableCell>
                  <TableCell>
                    <Button onClick={() => this.approve(c)} color="primary">Approve</Button>
                    <Button onClick={() => this.decline(c)}color="secondary">Decline</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}