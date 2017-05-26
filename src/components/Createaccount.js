import React from 'react';
import { Form, Text } from 'react-form';
require('../styles/Createaccount.css');

export default class Createaccount extends React.Component {
  constructor(){
    super();
    this.state = {
      name: '',
      email: '',
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
            <p>Email</p>
            <Text field='email'/>
            <button type='submit'>Submit</button>
        </form>
        
      )
    }}
  </Form>
)