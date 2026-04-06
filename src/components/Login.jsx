import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
    return (
       <Form >
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
         
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          
        />
      </FormGroup>

      <FormGroup check>
        <Input
          type="checkbox"
          name="terms"
          id="terms"
          
        />{' '}
        <Label check htmlFor="terms">
          I agree to terms of service and privacy policy
        </Label>
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button color="primary" >
          Sign In
        </Button>
      </FormGroup>
    </Form>
    )
}