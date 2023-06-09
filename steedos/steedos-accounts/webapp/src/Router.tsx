import React from 'react';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import { CssBaseline, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ThemeProvider } from '@material-ui/styles';
import { connect } from 'react-redux';
import { getTenant } from './selectors';

import Logo from './components/Logo';
import SignupCode from './components/SignupCode';
import Home from './components/Home';
import ResetPassword from './components/ResetPassword';
import VerifyEmail from './components/VerifyEmail';
import VerifyMobile from './components/VerifyMobile';
import TwoFactor from './components/TwoFactor';
import UpdatePassword from './components/updatePassword';
import CreateTenant from './components/CreateTenant';
import ChooseTenant from './components/ChooseTenant';
import Verify from './components/Verify';
import LoginCode from './components/LoginCode';
import LoginMethod from './components/LoginMethod'
import LoginPassword from './components/LoginPassword';
import Title from './components/Title';
import GoBack from './components/GoBack';
import SetName from './components/SetName';
import GlobalMessage from './components/GlobalMessage';
import Loading from './components/Loading';
import theme from './theme';
import Signup from './components/Signup';
import GenerateLicense from './components/GenerateLicense';
import LicenseResult from './components/LicenseResult';





const Router = ({tenant}:any) => {
  let backgroundUrl = require("./assets/background.svg");
  if (tenant.background_url) {
    backgroundUrl = tenant.background_url 
  }

  const useStyles = makeStyles({
    root: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: "flex",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      backgroundImage: "url(" + backgroundUrl + ")",
      backgroundSize: "cover",
      height: "100%",
    },
    rootBackgroundFade: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    rootGrid: {
    },
    container: {
      alignItems: 'center'
    },
    paper: {
      padding: 28,
      margin: '0px auto',
      maxWidth: 380,
      minWidth: 320,
      '@media only screen and (max-width: 480px)': {
        borderRadius: 0
      },
      "& [type='submit']": {
        marginTop: 20
      }
    },
  });

  const classes = useStyles();

  let loginComponent = LoginPassword;
  let resetPasswordComponent = LoginCode || ResetPassword;
  if(tenant && tenant.enable_password_login === false){
    loginComponent = LoginCode;
  }

  let signupComponent = Signup;
  // FIXME: 注释SignupCode
  // console.log("tenant", tenant);
  // if(tenant.enable_bind_mobile || tenant.enable_bind_email){
  //   signupComponent = SignupCode;
  // }

  return (
    <HashRouter basename="">
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Loading></Loading>
          <GlobalMessage></GlobalMessage>
          <Grid className={classes.container} container id="container">
            123
            <Grid item xs={12}>
              <Paper className={classes.paper} id="paper">
                <CssBaseline />
                555555555555555 
                <Route path="/" component={GoBack}/>
                <Route path="/" component={Logo}/>
                <Route path="/" component={Title}/>
                <Route exact path="/" component={Home}/>

                <Route path="/signup" component={signupComponent} />
                <Route path="/signup-password" component={Signup} />

                <Route path="/login" component={loginComponent} />
                <Route path="/login-password" component={LoginPassword} />
                {/* http://127.0.0.1:3000/#/create-tenant */}
                <Route path="/create-tenant" component={CreateTenant} />
                <Route path="/choose-tenant" component={ChooseTenant} />
                <Route exact path="/reset-password" component={resetPasswordComponent} />
                <Route exact path="/update-password" component={UpdatePassword} />
                <Route path="/reset-password/:token" component={resetPasswordComponent} />
                <Route path="/verify-email/:token" component={VerifyEmail} />
                <Route path="/verify/:token" component={Verify} />
                <Route path="/login-code" component={LoginCode} />
                <Route path="/set-name" component={SetName} />
                <Route path="/verify-mobile/:token" component={VerifyMobile} /> 
                {/* 两步验证 */}
                <Route path="/two-factor" component={TwoFactor} />
                <Route path="/generate-license" component={GenerateLicense} />
                <Route path="/result-license" component={LicenseResult} />
              </Paper>
            </Grid>
          </Grid>
          <div className={classes.rootBackgroundFade}></div>
        </div>
      </ThemeProvider>
    </HashRouter>
  );
};

function mapStateToProps(state: any) {
  return {
    tenant: getTenant(state),
  };
}

export default connect(mapStateToProps)(Router);