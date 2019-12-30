import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import Me from "./components/me";
import RegisterForm from "./components/registerForm";
import ProtectedRoute from "./components/common/protectedRoute";
import  auth  from "./services/authService";
import    rent from "./services/rentalService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};
  componentDidMount() {
   const user = auth.getCurrentUser();
   const rental =rent.getRentals();
   this.setState({ user, rental });
  }
  render() {
  

    toast.info("API mounted successfully");
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component = {MovieForm} />
            <Route path="/movies" render={props => <Movies {...props} user={this.state.user} />}  />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" render={props => <Rentals getrent={this.state.rental}/>} />
            <Route path="/me" render={props => <Me {...props} user={this.state.user} />} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      
      </React.Fragment>
    );
  }
}

export default App;
