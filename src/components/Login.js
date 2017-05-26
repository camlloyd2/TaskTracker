import React from 'react';
import { Form, Text } from 'react-form';
require('../styles/Createaccount.css');

export default class Login extends React.Component {
    constructor(){
    super();
    this.state = {
      name: '',
      password:''
    }
  }
  render() {
      return(
        <div className="CreateaccountForm">{myForm}</div>
      );
  }
}

const myForm = (
  <Form
    onSubmit={(values) => {
      console.log('Success!', values)
    }}
    validate={({ name }) => {
      return {
        name: !name ? 'A name is required' : undefined
      }
    }}
  >
    {({submitForm}) => {
      return (
        <form onSubmit={submitForm}>
            <h1> Welcome to Task Tracker </h1>
            <p>Name</p>
            <Text field='name' />
            <p>Password</p>
            <Text type="password"field='password'/>
            <button type='submit'>Submit</button>
            <p> Don't have an account? Create one</p> 
            <button type = 'submit'> here </button>
        </form>
      )
    }}
  </Form>
)
