function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
  /***/
  "./$$_lazy_route_resource lazy recursive":
  /*!******************************************************!*\
    !*** ./$$_lazy_route_resource lazy namespace object ***!
    \******************************************************/

  /*! no static exports found */

  /***/
  function $$_lazy_route_resourceLazyRecursive(module, exports) {
    function webpackEmptyAsyncContext(req) {
      // Here Promise.resolve().then() is used instead of new Promise() to prevent
      // uncaught exception popping up in devtools
      return Promise.resolve().then(function () {
        var e = new Error("Cannot find module '" + req + "'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
      });
    }

    webpackEmptyAsyncContext.keys = function () {
      return [];
    };

    webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
    module.exports = webpackEmptyAsyncContext;
    webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
  /*!**************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
    \**************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppAppComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-welcome *ngIf=\"authService.user==null || authService.user.token==null\"></app-welcome>\n<app-main *ngIf=\"authService.user!=null && authService.user.token!=null \"></app-main>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/auth/forgot-pwd/forgot-pwd.component.html":
  /*!*************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/auth/forgot-pwd/forgot-pwd.component.html ***!
    \*************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppAuthForgotPwdForgotPwdComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"text-center\">\n\t<h1 class=\"h4 text-gray-900 mb-4\">Renew my password!</h1>\n</div>\n<form class=\"user\" #forgotPwdForm=\"ngForm\" (ngSubmit)=\"onForgot()\">\n    <div class=\"form-group\">\n\t\t<input type=\"email\" [(ngModel)]=\"login.email\" \n\t\t\tclass=\"form-control\"\n\t\t\tid=\"inputEmail\"\n\t\t\taria-describedby=\"your login is your email\"\n\t\t\tname=\"inputEmail\"\n\t\t\tplaceholder=\"Enter Email Address...\"\n\t\t\trequired emailValidator #email=\"ngModel\">\n\t\t<div *ngIf=\"email.dirty && email.invalid\" class=\"alert alert-danger\">Email is required</div>\n    </div>\n    <div class=\"form-group\"  *ngIf=\"state=='code'\">\n\t\t<input type=\"text\" [(ngModel)]=\"login.code\" \n\t\t\tclass=\"form-control\"\n\t\t\tid=\"inputCode\"\n\t\t\taria-describedby=\"your code received by mail\"\n\t\t\tname=\"inputCode\"\n\t\t\tplaceholder=\"Enter your code...\"\n\t\t\trequired minlength=\"6\" #code=\"ngModel\">\n\t\t<div *ngIf=\"code.dirty && code.invalid\" class=\"alert alert-danger\">Code is required</div>\n    </div>\n\t<div class=\"form-group\" *ngIf=\"state=='code'\">\n\t\t<input type=\"password\" [(ngModel)]=\"login.password\" \n\t\t\tclass=\"form-control\"\n\t\t\tid=\"inputPwd\"\n\t\t\tname=\"inputPwd\"\n\t\t\tplaceholder=\"Password\"\n\t\t\trequired minlength=\"4\" #pwd=\"ngModel\">\n\t\t<div *ngIf=\"pwd.dirty && pwd.invalid\" class=\"alert alert-danger\">Password is required</div>\n    </div>\n    <div class=\"form-group\" *ngIf=\"state=='code'\">\n\t\t<input type=\"password\" [(ngModel)]=\"login.passwordConf\" \n\t\t\tclass=\"form-control\"\n\t\t\tid=\"inputPwdConf\"\n\t\t\tname=\"inputPwdConf\"\n\t\t\tplaceholder=\"Password confirmation\"\n\t\t\trequired minlength=\"4\" #pwdConf=\"ngModel\">\n\t\t<div *ngIf=\"pwdConf.dirty && (pwdConf.invalid || login.password!=login.password)\" class=\"alert alert-danger\">Password is not the same</div>\n    </div>\n    \n\t<button type=\"submit\" [disabled]=\"!forgotPwdForm.form.valid\" *ngIf=\"state!='code'\"\n\t\tclass=\"btn btn-primary btn-user btn-block\" (click)=\"sendMeCode()\">Change my password</button>\n\t\t\n\t\t\n\t<button type=\"submit\" [disabled]=\"!forgotPwdForm.form.valid\" *ngIf=\"state=='code'\"\n\t\tclass=\"btn btn-primary btn-user btn-block\" (click)=\"changePwd()\">Change my password</button>\n</form>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/auth/login/login.component.html":
  /*!***************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/auth/login/login.component.html ***!
    \***************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppAuthLoginLoginComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"text-center\">\n\t<h1 class=\"h4 text-gray-900 mb-4\">Fabulexie</h1>\n</div>\n<form class=\"user\" #loginForm=\"ngForm\" (ngSubmit)=\"onLogin()\">\n    <div class=\"form-group\">\n\t\t<input type=\"email\" [(ngModel)]=\"login.email\" \n\t\t\tclass=\"form-control\"\n\t\t\tid=\"inputEmail\"\n\t\t\taria-describedby=\"your login is your email\"\n\t\t\tname=\"inputEmail\"\n\t\t\tplaceholder=\"Enter Email Address...\"\n\t\t\trequired emailValidator #email=\"ngModel\">\n\t\t<div *ngIf=\"email.dirty && email.invalid\" class=\"alert alert-danger\">Email is required</div>\n    </div>\n    <div class=\"form-group\">\n\t\t<input type=\"password\" [(ngModel)]=\"login.password\" \n\t\t\tclass=\"form-control\"\n\t\t\tid=\"inputPwd\"\n\t\t\tname=\"inputPwd\"\n\t\t\tplaceholder=\"Password\"\n\t\t\trequired minlength=\"4\" #pwd=\"ngModel\">\n\t\t<div *ngIf=\"pwd.dirty && pwd.invalid\" class=\"alert alert-danger\">Password is required</div>\n    </div>\n    <div class=\"form-group\">\n      <div class=\"custom-control custom-checkbox small\">\n        <input type=\"checkbox\" name=\"remember\" class=\"custom-control-input\" id=\"customCheck\" [(ngModel)]=\"login.remember\" >\n        <label class=\"custom-control-label\" for=\"customCheck\">Remember Me</label>\n      </div>\n    </div>\n\t<button type=\"submit\" [disabled]=\"!loginForm.form.valid\" \n\t\tclass=\"btn btn-primary btn-user btn-block\">Login</button>\n   \n    <hr>\n\t<div class=\"row\">\n\t\t<div class=\"col\">\n    <a class=\"btn btn-google btn-user btn-block\" (click)=\"signInWithGoogle()\">\n      <i class=\"fab fa-google fa-fw\"></i> Google login  \n    </a>\n\t</div><div class=\"col\">\n    <a class=\"btn btn-facebook btn-user btn-block\" (click)=\"signInWithFB()\">\n      <i class=\"fab fa-facebook fa-fw\"></i> Facebook login\n    </a></div></div>\n\t\n</form>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/auth/register/register.component.html":
  /*!*********************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/auth/register/register.component.html ***!
    \*********************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppAuthRegisterRegisterComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"text-center\">\n\t<h1 class=\"h4 text-gray-900 mb-4\" *ngIf=\"!authService.isInitialised()\">Create first admin!</h1>\n\t<h1 class=\"h4 text-gray-900 mb-4\" *ngIf=\"authService.isInitialised()\">Register to Fabulexie!</h1>\n</div>\n<form class=\"user\" #registerForm=\"ngForm\" (ngSubmit)=\"onRegister()\">\n    <div class=\"form-group\">\n\t\t<input type=\"email\" [(ngModel)]=\"login.email\" \n\t\t\tclass=\"form-control\"\n\t\t\tid=\"inputEmail\"\n\t\t\taria-describedby=\"your login is your email\"\n\t\t\tname=\"inputEmail\"\n\t\t\tplaceholder=\"Enter Email Address...\"\n\t\t\trequired emailValidator #email=\"ngModel\">\n\t\t<div *ngIf=\"email.dirty && email.invalid\" class=\"alert alert-danger\">Email is required</div>\n    </div>\n    <div class=\"form-group\">\n\t\t<input type=\"password\" [(ngModel)]=\"login.password\" \n\t\t\tclass=\"form-control\"\n\t\t\tid=\"inputPwd\"\n\t\t\tname=\"inputPwd\"\n\t\t\tplaceholder=\"Password\"\n\t\t\trequired minlength=\"4\" #pwd=\"ngModel\">\n\t\t<div *ngIf=\"pwd.dirty && pwd.invalid\" class=\"alert alert-danger\">Password is required</div>\n    </div>\n    <div class=\"form-group\">\n\t\t<input type=\"password\" [(ngModel)]=\"login.passwordConf\" \n\t\t\tclass=\"form-control\"\n\t\t\tid=\"inputPwdConf\"\n\t\t\tname=\"inputPwdConf\"\n\t\t\tplaceholder=\"Password confirmation\"\n\t\t\trequired minlength=\"4\" #pwdConf=\"ngModel\">\n\t\t<div *ngIf=\"pwdConf.dirty && (pwdConf.invalid || login.password!=login.passwordConf)\" class=\"alert alert-danger\">Password is not the same</div>\n    </div>\n    <div class=\"form-group\">\n\t\t<input type=\"text\" [(ngModel)]=\"login.firstname\" \n\t\t\tclass=\"form-control\"\n\t\t\tid=\"inputFirstname\"\n\t\t\taria-describedby=\"your firstname\"\n\t\t\tname=\"inputFirstname\"\n\t\t\tplaceholder=\"Enter your firstname...\"\n\t\t\trequired minlength=\"2\" #firstname=\"ngModel\">\n\t\t<div *ngIf=\"firstname.dirty && firstname.invalid\" class=\"alert alert-danger\">Firstname is required</div>\n    </div>\n\t<div class=\"form-group\">\n\t\t<input type=\"text\" [(ngModel)]=\"login.lastname\" \n\t\t\tclass=\"form-control\"\n\t\t\tid=\"inputLastname\"\n\t\t\taria-describedby=\"your lastname\"\n\t\t\tname=\"inputLastname\"\n\t\t\tplaceholder=\"Enter your lastname...\"\n\t\t\trequired minlength=\"2\" #lastname=\"ngModel\">\n\t\t<div *ngIf=\"lastname.dirty && lastname.invalid\" class=\"alert alert-danger\">Lastname is required</div>\n    </div>\n\t<button type=\"submit\" [disabled]=\"!registerForm.form.valid\" *ngIf=\"authService.user == null\"\n\t\tclass=\"btn btn-primary btn-user btn-block\">Register</button>\n</form>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/auth/welcome/welcome.component.html":
  /*!*******************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/auth/welcome/welcome.component.html ***!
    \*******************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppAuthWelcomeWelcomeComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "  <div class=\"container bg-gradient-primary\">\n\n    <!-- Outer Row -->\n    <div class=\"row justify-content-center\">\n\n      <div class=\"col-xl-10 col-lg-12 col-md-9\">\n\n        <div class=\"card o-hidden border-0 shadow-lg my-5\">\n          <div class=\"card-body p-0\">\n            <!-- Nested Row within Card Body -->\n            <div class=\"row\">\n              <div class=\"col-lg-6 d-none d-lg-block bg-login-image\"></div>\n              <div class=\"col-lg-6\">\n                <div class=\"p-5\">\n                  <app-login *ngIf=\"authService.state=='login' && authService.isInitialised()\"></app-login>\n                  <app-register *ngIf=\"authService.state=='register' || !authService.isInitialised()\"></app-register>\n\t\t\t\t  <app-forgot-pwd *ngIf=\"authService.state=='forgotPwd' && authService.isInitialised()\"></app-forgot-pwd>\n                  <hr>\n\t\t\t\t  <div *ngIf=\"authService.error\" class=\"alert alert-danger\">{{authService.error}}</div>\n\t\t\t\t  <div *ngIf=\"authService.info\" class=\"alert alert-info\">{{authService.info}}</div>\n                  <div class=\"text-center\">\n                    <a *ngIf=\"authService.state!='login' && authService.isInitialised()\" class=\"small\" (click)=\"changeState('login')\" >Login</a>\n                  </div>\n                  <div class=\"text-center\">\n                    <a *ngIf=\"authService.state!='forgotPwd' && authService.isInitialised()\" class=\"small\" (click)=\"changeState('forgotPwd')\" >Forgot Password?</a>\n                  </div>\n                  <div class=\"text-center\">\n                    <a *ngIf=\"authService.state!='register' && authService.isInitialised()\" class=\"small\" (click)=\"changeState('register')\" >Create an Account!</a>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n      </div>\n\n    </div>\n\n  </div>\n\n<div *ngIf=\"!authService.isCookiesAccepted()\" class=\"cookie_banner-container\" data-allow=\"Accept Cookies\" data-cookie-policy-type=\"gdpr\" data-message=\"By clicking Accept Cookies, you agree to our use of cookies and other tracking technologies in accordance with our <a rel='nofollow' href='https://www..com/cookie-policy'>Cookie Policy</a>.\" data-reload=\"true\"><div class=\"cookie_banner is-gdpr\">\n  <div class=\"cookie_banner-message\" data-role=\"message\"><p>By clicking Accept Cookies, you agree to our use of cookies and other tracking technologies in accordance with our <a rel=\"nofollow\" href=\"https://www..com/cookie-policy\" >Cookie Policy</a>.</p><a class=\"btn btn-primary\" (click)=\"authService.acceptCookies()\">Accept Cookies</a></div>\n</div>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/config/config.component.html":
  /*!************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/config/config.component.html ***!
    \************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppConfigConfigComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"d-sm-flex align-items-center justify-content-between mb-4\">\n\t<h1 class=\"h3 mb-0 text-gray-800\">Update configurations</h1>\n</div>\n<div class=\"row justify-content-center\">\n\t<div class=\"col-xl-10 col-lg-10 col-md-10 col-sm-12\">\n\t\t<div *ngIf=\"globalError\" class=\"alert alert-danger\">{{globalError}}</div>\n\t\t<div *ngIf=\"globalInfo\" class=\"alert alert-success\">{{globalInfo}}</div>\t\n\t\t<div class=\"card shadow mb-4\">\n\t\t\t<div class=\"card-header py-3\">\n\t\t\t\t<h6 class=\"m-0 font-weight-bold text-primary\">API keys</h6>\n             </div>\n        <div class=\"card-body\">\n\t\t\t<form class=\"user col-xl-8 col-lg-6 col-md-8 col-sm-12\" #updateConfigForm=\"ngForm\" *ngIf=\"config\">\n\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<input type=\"text\" [(ngModel)]=\"config.googleClientId\" \n\t\t\t\t\t\tclass=\"form-control\"\n\t\t\t\t\t\tid=\"inputGGCId\"\n\t\t\t\t\t\taria-describedby=\"Google Client Id\"\n\t\t\t\t\t\tname=\"inputGGCId\"\n\t\t\t\t\t\tplaceholder=\"Google Client Id (login)\"\n\t\t\t\t\t\trequired minlength=\"60\" #ggclientid=\"ngModel\">\n\t\t\t\t\t\t<span class=\"floating-label\">Google Client Id (login)</span>\n\t\t\t\t\t<div *ngIf=\"ggclientid.dirty && ggclientid.invalid\" class=\"alert alert-danger\">Google Client Id is required</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<input type=\"text\" [(ngModel)]=\"config.faceBookAppId\" \n\t\t\t\t\t\tclass=\"form-control\"\n\t\t\t\t\t\tid=\"inputFbAppId\"\n\t\t\t\t\t\taria-describedby=\"Facebook App Id\"\n\t\t\t\t\t\tname=\"inputFbAppId\"\n\t\t\t\t\t\tplaceholder=\"Facebook App Id\"\n\t\t\t\t\t\trequired minlength=\"15\" #faceBookAppId=\"ngModel\">\n\t\t\t\t\t\t<span class=\"floating-label\">Facebokk App Id</span>\n\t\t\t\t\t<div *ngIf=\"faceBookAppId.dirty && faceBookAppId.invalid\" class=\"alert alert-danger\">Facebook App Id is required</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<input type=\"text\" [(ngModel)]=\"config.faceBookAppSecret\" \n\t\t\t\t\t\tclass=\"form-control\"\n\t\t\t\t\t\tid=\"inputFbSecret\"\n\t\t\t\t\t\tname=\"inputFbSecret\"\n\t\t\t\t\t\tplaceholder=\"Facebook App Secret\"\n\t\t\t\t\t\t#faceBookAppSecret=\"ngModel\">\n\t\t\t\t\t\t<span class=\"floating-label\">Facebook App Secret</span>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<input type=\"text\" [(ngModel)]=\"config.googleMapApiKey\" \n\t\t\t\t\t\tclass=\"form-control\"\n\t\t\t\t\t\tid=\"inputGgMap\"\n\t\t\t\t\t\tname=\"inputGgMap\"\n\t\t\t\t\t\tplaceholder=\"Google Map API Key\"\n\t\t\t\t\t\trequired minlength=\"30\" #ggMapKey=\"ngModel\">\n\t\t\t\t\t<span class=\"floating-label\">Google Map API Key</span>\n\t\t\t\t\t<div *ngIf=\"ggMapKey.dirty && ggMapKey.invalid\" class=\"alert alert-danger\">Google Map API key is required</div>\n\t\t\t\t</div>\n\t\t\t\t<button class=\"btn btn-primary btn-block btn-icon-split\" [disabled]=\"!updateConfigForm.form.valid || password!=passwordConf\" (click)=\"updateConfig()\">\n\t\t\t\t\t<span class=\"icon text-white-50\">\n\t\t\t\t\t\t<i class=\"fas fa-pen\"></i>\n\t\t\t\t\t</span>\n\t\t\t\t\t<span class=\"text\"> Update Config</span>\n\t\t\t\t</button>\n\t\t\t\t<div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\n\t\t\t\t<div *ngIf=\"info\" class=\"alert alert-info\">{{info}}</div>\n\t\t\t</form>\n\t\t</div>\n\t</div>\n</div>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/layout/footer/footer.component.html":
  /*!*******************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/layout/footer/footer.component.html ***!
    \*******************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppLayoutFooterFooterComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n <!-- Footer -->\n      <footer class=\"sticky-footer bg-white\">\n        <div class=\"container my-auto\">\n          <div class=\"copyright text-center my-auto\">\n            <span>Copyright © Fabulexie Dame Christophe Application</span>\n          </div>\n        </div>\n      </footer>\n      <!-- End of Footer -->\n\t  \n<a class=\"scroll-to-top rounded\" *ngIf=\"isShow\" style=\"display: inline;\" (click)=\"scrollTop()\">\n    <i class=\"fas fa-angle-up\"></i>\n</a>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/layout/main/main.component.html":
  /*!***************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/layout/main/main.component.html ***!
    \***************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppLayoutMainMainComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div id=\"wrapper\">\n      <!-- Sidebar -->\n    <ul class=\"navbar-nav bg-gradient-primary sidebar sidebar-dark accordion {{sideBarClass}}\" id=\"accordionSidebar\">\n\n      <!-- Sidebar - Brand -->\n      <div class=\"sidebar-brand d-flex align-items-center justify-content-center\">\n\t\t\t<div class=\"sidebar-brand-icon rotate-n-15\"><i class=\"fa fa-home\"></i></div>\n\t\t\t<div class=\"sidebar-brand-text mx-3\">{{title}}</div>\n      </div>\n\n      <hr class=\"sidebar-divider\">\n\n      <!-- Divider -->\n      <div class=\"sidebar-heading\" *ngIf=\"authService.user.admin\">\n        Admin\n      </div>\n\n      <!-- Nav Item - Dashboard -->\n      <li [ngClass]=\"this.router.url === '/users'?'nav-item active':'nav-item'\" *ngIf=\"authService.user.admin\">\n\t\t\t<a class=\"nav-link\" routerLink=\"/users\" id=\"navLinkUserList\">\n\t\t\t\t<i class=\"fas fa-users\"></i>\n\t\t\t\t<span>List Users</span>\n\t\t\t</a>\n      </li>\n\n      <li [ngClass]=\"this.router.url === '/adduser'?'nav-item active':'nav-item'\" *ngIf=\"authService.user.admin\">\n\t\t\t<a class=\"nav-link\" routerLink=\"/adduser\" >\n\t\t\t\t<i class=\"fas fa-user-plus\"></i>\n\t\t\t\t<span>Add User</span>\n\t\t\t</a>\n      </li>\n\t  \n\t        <!-- Nav Item - Dashboard -->\n      <li [ngClass]=\"this.router.url === '/invitations'?'nav-item active':'nav-item'\" *ngIf=\"authService.user.admin\">\n\t\t\t<a class=\"nav-link\" routerLink=\"/invitations\" >\n\t\t\t\t<i class=\"fas fa-mail-bulk\"></i>\n\t\t\t\t<span>List Invitations</span>\n\t\t\t</a>\n      </li>\n\n      <li [ngClass]=\"this.router.url === '/inviteUser'?'nav-item active':'nav-item'\" *ngIf=\"authService.user.admin\">\n\t\t\t<a class=\"nav-link\" routerLink=\"/inviteUser\" >\n\t\t\t\t<i class=\"fas fa-envelope-open-text\"></i>\n\t\t\t\t<span>Send invitation</span>\n\t\t\t</a>\n      </li>\n\t\t\n      <!-- Divider -->\n      <hr class=\"sidebar-divider\" *ngIf=\"authService.user.admin\">\n\n      <!-- Heading -->\n      <div class=\"sidebar-heading\"*ngIf=\"authService.user.admin\">\n        Config\n      </div>\n\n      <li [ngClass]=\"this.router.url === '/config'?'nav-item active':'nav-item'\"*ngIf=\"authService.user.admin\">\n\t\t\t<a class=\"nav-link\" routerLink=\"/config\" >\n\t\t\t\t<i class=\"fas fa-cogs\"></i>\n\t\t\t\t<span>Configurations</span>\n\t\t\t</a>\n      </li>\n\t  \n      <!-- Divider -->\n      <hr class=\"sidebar-divider\" *ngIf=\"authService.user.admin\">\n\n      <!-- Heading -->\n      <div class=\"sidebar-heading\">\n\t\t\tProperties\n      </div>\n\n\t\t\n      <li [ngClass]=\"this.router.url === '/property/create'?'nav-item active':'nav-item'\" *ngIf=\"authService.user.admin || authService.user.tutor\">\n\t\t\t<a class=\"nav-link\" routerLink=\"/property/create\" >\n\t\t\t\t<i class=\"fas fa-map-marker-alt\"></i>\n\t\t\t\t<span>Add property</span>\n\t\t\t</a>\n      </li>\n\n\t  <li [ngClass]=\"this.router.url === '/webproxy'?'nav-item active':'nav-item'\">\n\t\t\t<a class=\"nav-link\" routerLink=\"/webproxy\" >\n\t\t\t\t<i class=\"fas fa-map-marked-alt\"></i>\n\t\t\t\t<span>Web proxy</span>\n\t\t\t</a>\n      </li>\n\n\n\n\n      <!-- Divider -->\n      <hr class=\"sidebar-divider d-none d-md-block\">\n\n      <!-- Sidebar Toggler (Sidebar) -->\n      <div class=\"text-center d-none d-md-inline\">\n        <button class=\"rounded-circle border-0\" id=\"sidebarToggle\" (click)=\"toggle()\"></button>\n      </div>\n\n    </ul>\n    <!-- End of Sidebar -->\n\t\n\t<div id=\"content-wrapper\" class=\"d-flex flex-column\">\n\n      <!-- Main Content -->\n      <div id=\"content\">\n\n        <!-- Topbar -->\n        <nav class=\"navbar navbar-expand navbar-light bg-white topbar mb-2 static-top shadow\">\n\n\n          <!-- Sidebar Toggle (Topbar) -->\n          <button id=\"sidebarToggleTop\" class=\"btn btn-link d-md-none rounded-circle mr-3\" (click)=\"toggle()\">\n            <i class=\"fa fa-bars\"></i>\n          </button>\n          <!-- Topbar Search \n          <form class=\"d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search\">\n            <div class=\"input-group\">\n              <input type=\"text\" class=\"form-control bg-light border-0 small\" placeholder=\"Search for...\" aria-label=\"Search\" aria-describedby=\"basic-addon2\">\n              <div class=\"input-group-append\">\n                <button class=\"btn btn-primary\" type=\"button\">\n                  <i class=\"fas fa-search fa-sm\"></i>\n                </button>\n              </div>\n            </div>\n          </form>-->\n\n          <!-- Topbar Navbar -->\n          <ul class=\"navbar-nav ml-auto\">\n\n\n\n            <!-- Nav Item - User Information -->\n            <li class=\"nav-item dropdown no-arrow\">\n              <a class=\"nav-link dropdown-toggle\" id=\"userDropdown\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                <span class=\"mr-2 d-none d-inline text-gray-600 small\">{{authService.user.firstname}} {{authService.user.lastname}}</span>\n               \n\t\t\t\t<i class=\"far fa-user-circle icon-profile\" *ngIf=\"!authService.user.safePhoto\"></i>\n\t\t\t\t<img class=\"icon-profile\" *ngIf=\"authService.user.safePhoto\" [src]=\"authService.user.safePhoto\"/>\n              </a>\n              <!-- Dropdown - User Information -->\n              <div class=\"dropdown-menu dropdown-menu-right shadow animated--grow-in\" aria-labelledby=\"userDropdown\">\n                <a class=\"dropdown-item\" routerLink=\"/profile\">\n                  <i class=\"fas fa-user fa-sm fa-fw mr-2 text-gray-400\"></i>\n                  Profile\n                </a>\n                <div class=\"dropdown-divider\"></div>\n                <a id=\"logoutBtn\" class=\"dropdown-item\" (click)=\"logout()\">\n                  <i class=\"fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400\"></i>\n                  Logout\n                </a>\n              </div>\n            </li>\n\n          </ul>\n\n        </nav>\n        <!-- End of Topbar -->\n\n        <!-- Begin Page Content -->\n        <div class=\"container-fluid\">\n\t\t\t<router-outlet></router-outlet>\n        </div>\n        <!-- /.container-fluid -->\n\n      </div>\n      <!-- End of Main Content -->\n\n\t  <app-footer></app-footer>\n\n    </div>\n </div> \n  <!-- Navigation \n  <nav class=\"navbar navbar-expand-lg bg-secondary text-uppercase fixed-top\" id=\"mainNav\">\n    <div class=\"container\">\n      <a class=\"navbar-brand js-scroll-trigger\" href=\"#page-top\">Fabulexie Time Management</a>\n      <button class=\"navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary text-white rounded\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarResponsive\" aria-controls=\"navbarResponsive\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n        Menu\n        <i class=\"fas fa-bars\"></i>\n      </button>\n      <div class=\"collapse navbar-collapse\" id=\"navbarResponsive\">\n        <ul class=\"navbar-nav ml-auto\">\n          <li class=\"nav-item mx-0 mx-lg-1\">\n            <a class=\"nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger\" href=\"#portfolio\">Portfolio</a>\n          </li>\n          <li class=\"nav-item mx-0 mx-lg-1\">\n            <a class=\"nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger\" href=\"#about\">About</a>\n          </li>\n          <li class=\"nav-item mx-0 mx-lg-1\">\n            <a class=\"nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger\" href=\"#contact\">Contact</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </nav>\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <div class=\"card bg-dark my-5\">\n        <div class=\"card-body\">\n          <h2 class=\"card-title text-center text-white py-3\">{{ title }}</h2>\n          <ul class=\"text-center list-inline py-3\">\n            <li class=\"list-inline-item\">\n              <a routerLink=\"/users\" class=\"btn btn-info\">List Users</a>\n                </li>\n            <li class=\"list-inline-item\">\n              <a routerLink=\"/adduser\" class=\"btn btn-info\">Add User</a>\n                </li>\n          </ul>\n        </div>\n      </div>\n      <router-outlet></router-outlet>\n    </div>\n  </div>\n</div>\n\n-->";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/me/my-profile/my-profile.component.html":
  /*!***********************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/me/my-profile/my-profile.component.html ***!
    \***********************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppMeMyProfileMyProfileComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"d-sm-flex align-items-center justify-content-between mb-4\">\n\t<h1 class=\"h3 mb-0 text-gray-800\">Update my profile</h1>\n</div>\n<div class=\"row justify-content-center\">\n\t<div class=\"col-xl-10 col-lg-10 col-md-10 col-sm-12\">\n\t\t<div *ngIf=\"globalError\" class=\"alert alert-danger\">{{globalError}}</div>\n\t\t<div *ngIf=\"globalInfo\" class=\"alert alert-success\">{{globalInfo}}</div>\t\n\t\t<div class=\"card shadow mb-4\">\n\t\t\t<div class=\"card-header py-3\">\n\t\t\t\t<h6 class=\"m-0 font-weight-bold text-primary\">My informations</h6>\n             </div>\n        <div class=\"card-body row\">\n\t\t\t<div class=\"col-xl-4 col-lg-6 col-md-4 col-sm-12\">\n\t\t\t\t<div class=\"preview\" *ngIf=\"authService.user.safePhoto\">\n\t\t\t\t\t<img [src]=\"authService.user.safePhoto\" class=\"photo\"/>\n\t\t\t\t\t<a class=\"btn btn-warning btn-circle btn-sm\" (click)=\"deleteImg()\" *ngIf=\"authService.user.loginSource=='standard'\">\n\t\t\t\t\t   <i class=\"fas fa-trash\"></i>\n\t\t\t\t\t</a>\n\t\t\t\t</div>\n\t\t\t\t<br/>\n\t\t\t\t<button type=\"button\" class=\"btn btn-primary btn-icon-split\" (click)=\"fileInput.click()\" *ngIf=\"authService.user.loginSource=='standard'\">\n\t\t\t\t\t\t<span class=\"icon text-white-50\">\n\t\t\t\t\t\t\t<i class=\"far fa-images\"></i>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<span class=\"text\"> Select photo</span>\n\t\t\t\t</button>\n\t\t\t\t\n\t\t\t\t<br/>\n\n\t\t\t\t<span style=\"visibility: hidden; position: absolute; overflow: hidden; width: 0px; height:0px;border:none;margin:0; padding:0\">\n\t\t\t\t\t<input type=\"file\" ng2FileSelect [uploader]=\"uploader\" #fileInput/>\n\t\t\t\t</span>\n\t\t\t\t<div *ngIf=\"fileItem!=null\" class=\"detailUpload\">\n\t\t\t\t\t<span><strong>{{ fileItem.file.name }}</strong></span>\n\t\t\t\t\t<span *ngIf=\"uploader.options.isHTML5\" nowrap class=\"size\">{{ fileItem.file.size | shortnumber}}b</span>\n\t\t\t\t\t<div class=\"progress\" style=\"margin-bottom: 0;\" *ngIf=\"uploader.options.isHTML5\" >\n\t\t\t\t\t\t<div class=\"progress-bar\" role=\"progressbar\" [ngStyle]=\"{ 'width': fileItem.progress + '%' }\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<br/>\n\t\t\t\t<button type=\"button\" class=\"btn btn-primary btn-icon-split\" (click)=\"upload()\" *ngIf=\"fileItem!=null && fileItem.progress==0\" [disabled]=\"loading\">\n\t\t\t\t\t\t<span class=\"icon text-white-50\">\n\t\t\t\t\t\t\t<i class=\"fas fa-upload\"></i>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<span class=\"text\"> Upload</span>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t\t<form class=\"user col-xl-8 col-lg-6 col-md-8 col-sm-12\" #updateUserForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<input type=\"email\" value=\"{{authService.user.email}}\" \n\t\t\t\t\t\tclass=\"form-control\"\n\t\t\t\t\t\tdisabled >\n\t\t\t\t\t\t<span class=\"floating-label\">Email address</span>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<input type=\"text\" [(ngModel)]=\"authService.user.firstname\" \n\t\t\t\t\t\tclass=\"form-control\"\n\t\t\t\t\t\tid=\"inputFirstname\"\n\t\t\t\t\t\taria-describedby=\"His firstname\"\n\t\t\t\t\t\tname=\"inputFirstname\"\n\t\t\t\t\t\tplaceholder=\"Enter his firstname...\"\n\t\t\t\t\t\trequired minlength=\"2\" #firstname=\"ngModel\">\n\t\t\t\t\t\t<span class=\"floating-label\">Firstname</span>\n\t\t\t\t\t<div *ngIf=\"firstname.dirty && firstname.invalid\" class=\"alert alert-danger\">Firstname is required</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<input type=\"text\" [(ngModel)]=\"authService.user.lastname\" \n\t\t\t\t\t\tclass=\"form-control\"\n\t\t\t\t\t\tid=\"inputLastname\"\n\t\t\t\t\t\taria-describedby=\"His lastname\"\n\t\t\t\t\t\tname=\"inputLastname\"\n\t\t\t\t\t\tplaceholder=\"Enter his lastname...\"\n\t\t\t\t\t\trequired minlength=\"2\" #lastname=\"ngModel\">\n\t\t\t\t\t\t<span class=\"floating-label\">Lastname</span>\n\t\t\t\t\t<div *ngIf=\"lastname.dirty && lastname.invalid\" class=\"alert alert-danger\">Lastname is required</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t  <div class=\"custom-control custom-checkbox small\">\n\t\t\t\t\t<input type=\"checkbox\" name=\"changePwd\" class=\"custom-control-input\" id=\"changePwd\" [(ngModel)]=\"changePwd\" >\n\t\t\t\t\t<label class=\"custom-control-label\" for=\"changePwd\">Change my password</label>\n\t\t\t\t  </div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\" *ngIf=\"changePwd\">\n\t\t\t\t\t<input type=\"password\" [(ngModel)]=\"password\" \n\t\t\t\t\t\tclass=\"form-control\"\n\t\t\t\t\t\tid=\"inputPwd\"\n\t\t\t\t\t\tname=\"inputPwd\"\n\t\t\t\t\t\tplaceholder=\"Password\"\n\t\t\t\t\t\trequired minlength=\"4\" #pwd=\"ngModel\">\n\t\t\t\t\t\t<span class=\"floating-label\">Password</span>\n\t\t\t\t\t<div *ngIf=\"pwd.dirty && pwd.invalid\" class=\"alert alert-danger\">Password is required</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\" *ngIf=\"changePwd\">\n\t\t\t\t\t<input type=\"password\" [(ngModel)]=\"passwordConf\" \n\t\t\t\t\t\tclass=\"form-control\"\n\t\t\t\t\t\tid=\"inputPwdConf\"\n\t\t\t\t\t\tname=\"inputPwdConf\"\n\t\t\t\t\t\tplaceholder=\"Password confirmation\"\n\t\t\t\t\t\trequired minlength=\"4\" #pwdConf=\"ngModel\">\n\t\t\t\t\t<span class=\"floating-label\">Password confirmation</span>\n\t\t\t\t\t<div *ngIf=\"pwdConf.dirty && (pwdConf.invalid || password!=passwordConf)\" class=\"alert alert-danger\">Password is not the same</div>\n\t\t\t\t</div>\n\t\t\t\t<button type=\"submit\" class=\"btn btn-primary btn-block btn-icon-split\" [disabled]=\"!updateUserForm.form.valid || password!=passwordConf\">\n\t\t\t\t\t<span class=\"icon text-white-50\">\n\t\t\t\t\t\t<i class=\"fas fa-pen\"></i>\n\t\t\t\t\t</span>\n\t\t\t\t\t<span class=\"text\"> Update</span>\n\t\t\t\t</button>\n\t\t\t\t<div *ngIf=\"authService.error\" class=\"alert alert-danger\">{{authService.error}}</div>\n\t\t\t\t  <div *ngIf=\"authService.info\" class=\"alert alert-info\">{{authService.info}}</div>\n\t\t\t</form>\n\t\t</div>\n\t</div>\n</div>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/user-admin/create-user/create-user.component.html":
  /*!*********************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/user-admin/create-user/create-user.component.html ***!
    \*********************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppUserAdminCreateUserCreateUserComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"d-sm-flex align-items-center justify-content-between mb-4\">\n\t<h1 class=\"h3 mb-0 text-gray-800\">Create a user</h1>\n</div>\n<div class=\"row justify-content-center\">\n\t<div class=\"col-lg-6 col-md-10 col-sm-12\">\n\t\t<div class=\"card shadow mb-4\">\n\t\t\t<div class=\"card-header py-3\">\n\t\t\t\t<h6 class=\"m-0 font-weight-bold text-primary\">User informations</h6>\n             </div>\n        <div class=\"card-body\">\n\t\t\t<form class=\"user\" #createUserForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<input type=\"email\" [(ngModel)]=\"user.email\" \n\t\t\t\t\t\tclass=\"form-control\"\n\t\t\t\t\t\tid=\"inputEmail\"\n\t\t\t\t\t\taria-describedby=\"Login is the email\"\n\t\t\t\t\t\tname=\"inputEmail\"\n\t\t\t\t\t\tplaceholder=\"Enter Email Address...\"\n\t\t\t\t\t\trequired emailValidator #email=\"ngModel\">\n\t\t\t\t\t\t<span class=\"floating-label\">Email address</span>\n\t\t\t\t\t<div *ngIf=\"email.dirty && email.invalid\" class=\"alert alert-danger\">Email is required</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<input type=\"email\" [(ngModel)]=\"user.firstname\" \n\t\t\t\t\t\tclass=\"form-control\"\n\t\t\t\t\t\tid=\"inputFirstname\"\n\t\t\t\t\t\taria-describedby=\"User firstname\"\n\t\t\t\t\t\tname=\"inputFirstname\"\n\t\t\t\t\t\tplaceholder=\"Enter user firstname...\"\n\t\t\t\t\t\trequired minlength=\"2\" #firstname=\"ngModel\">\n\t\t\t\t\t\t<span class=\"floating-label\">Firstname</span>\n\t\t\t\t\t<div *ngIf=\"firstname.dirty && firstname.invalid\" class=\"alert alert-danger\">Firstname is required</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<input type=\"email\" [(ngModel)]=\"user.lastname\" \n\t\t\t\t\t\tclass=\"form-control\"\n\t\t\t\t\t\tid=\"inputLastname\"\n\t\t\t\t\t\taria-describedby=\"User lastname\"\n\t\t\t\t\t\tname=\"inputLastname\"\n\t\t\t\t\t\tplaceholder=\"Enter user lastname...\"\n\t\t\t\t\t\trequired minlength=\"2\" #lastname=\"ngModel\">\n\t\t\t\t\t\t<span class=\"floating-label\">Lastname</span>\n\t\t\t\t\t<div *ngIf=\"lastname.dirty && lastname.invalid\" class=\"alert alert-danger\">Lastname is required</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"alert alert-info\">A password will be generated and sent to the user by email.</div>\n\t\t\t\t<button type=\"submit\" class=\"btn btn-primary btn-block btn-icon-split\" [disabled]=\"!createUserForm.form.valid\">\n\t\t\t\t\t<span class=\"icon text-white-50\">\n\t\t\t\t\t\t<i class=\"fas fa-user-plus\"></i>\n\t\t\t\t\t</span>\n\t\t\t\t\t<span class=\"text\"> Create</span>\n\t\t\t\t</button>\n\t\t\t\t<div class=\"alert alert-danger\" *ngIf=\"error!=null\">{{error}}</div>\n\t\t\t</form>\n\t\t</div>\n\t</div>\n</div>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/user-admin/invitations-list/invitations-list.component.html":
  /*!*******************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/user-admin/invitations-list/invitations-list.component.html ***!
    \*******************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppUserAdminInvitationsListInvitationsListComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"d-sm-flex align-items-center justify-content-between mb-1\">\n\t<h1 class=\"h3 mb-0 text-gray-800\">Invitations list</h1>\n</div>\n<div class=\"row\" >\n\t<div class=\"col-sm-12 col-md-6\"></div>\n\t<div class=\"col-sm-12 col-md-6\" *ngIf=\"pages>1\">\n\t\t<nav aria-label=\"Table navigation\">\n\t\t\t<ul class=\"pagination justify-content-end\">\n\t\t\t\t<li class=\"page-item\" *ngIf=\"currPage>1\">\n\t\t\t\t  <a class=\"page-link\" tabindex=\"-1\" (click)=\"setPage(1)\"><<</a>\n\t\t\t\t</li>\n\t\t\t\t<li class=\"page-item\" *ngIf=\"currPage>2\"><a class=\"page-link\" (click)=\"setPage(currPage-2)\">{{currPage-2}}</a></li>\n\t\t\t\t<li class=\"page-item\" *ngIf=\"currPage>1\"><a class=\"page-link\" (click)=\"setPage(currPage-1)\">{{currPage-1}}</a></li>\n\t\t\t\t<li class=\"page-item disabled\"><a class=\"page-link\" >{{currPage}}</a></li>\n\t\t\t\t<li class=\"page-item\" *ngIf=\"currPage<pages\"><a class=\"page-link\" (click)=\"setPage(currPage+1)\">{{currPage+1}}</a></li>\n\t\t\t\t<li class=\"page-item\" *ngIf=\"currPage<(pages-1)\"><a class=\"page-link\" (click)=\"setPage(currPage+2)\">{{currPage+2}}</a></li>\n\t\t\t\t<li class=\"page-item\" *ngIf=\"currPage<pages\">\n\t\t\t\t  <a class=\"page-link\" (click)=\"setPage(pages)\">>></a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</nav>\n\t</div>\n</div>\n<div class=\"table-responsive\">\n    <table class=\"table table-bordered table-striped\">\n      <thead class=\"thead-dark\">\n        <tr>\n          <th scope=\"col\" (click)=\"sort('id')\" [ngClass]=\"(invitationService.sortColumn=='id')?'sorting_'+invitationService.sortOrder:''\">#</th>\n          <th scope=\"col\" (click)=\"sort('email')\" [ngClass]=\"(invitationService.sortColumn=='email')?'sorting_'+invitationService.sortOrder:''\">Email</th>\n          <th scope=\"col\" (click)=\"sort('admin')\" [ngClass]=\"(invitationService.sortColumn=='admin')?'sorting_'+invitationService.sortOrder:''\">Admin</th>\n          <th scope=\"col\" (click)=\"sort('tutor')\" [ngClass]=\"(invitationService.sortColumn=='tutor')?'sorting_'+invitationService.sortOrder:''\">Tutor</th>\n          <th scope=\"col\" (click)=\"sort('confirmed')\" [ngClass]=\"(invitationService.sortColumn=='confirmed')?'sorting_'+invitationService.sortOrder:''\">Confirmed</th>\n\t\t  <th></th>\n        </tr>\n      </thead>\n      <thead class=\"thead-grey\">\n        <tr>\n          <th scope=\"col\" class=\"filterTable\"><input type=\"number\" [(ngModel)]=\"invitationService.filter.id\" (keyup.enter)=\"reload()\"/><a class=\"btn btn-primary\" (click)=\"reload()\"><i class=\"fas fa-filter\"></i></a></th>\n\t\t  <th scope=\"col\" class=\"filterTable\"><input type=\"text\" [(ngModel)]=\"invitationService.filter.email\" (keyup.enter)=\"reload()\"/><a class=\"btn btn-primary\" (click)=\"reload()\"><i class=\"fas fa-filter\"></i></a></th>\n\n\t\t  <th scope=\"col\" class=\"filterTable\"><button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"adminFilterButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n\t\t\t{{invitationService.filter.admin}}\n\t\t  </button>\n\t\t  <div class=\"dropdown-menu\" aria-labelledby=\"adminFilterButton\">\n\t\t\t<a class=\"dropdown-item\" (click)=\"filterAdmin('')\">Both</a>\n\t\t\t<a class=\"dropdown-item\" (click)=\"filterAdmin('true')\">true</a>\n\t\t\t<a class=\"dropdown-item\" (click)=\"filterAdmin('false')\">false</a>\n\t\t  </div></th>\n\t\t  <th scope=\"col\" class=\"filterTable\"><button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"tutorFilterButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n\t\t\t{{invitationService.filter.tutor}}\n\t\t  </button>\n\t\t  <div class=\"dropdown-menu\" aria-labelledby=\"tutorFilterButton\">\n\t\t\t<a class=\"dropdown-item\" (click)=\"filterTutor('')\">Both</a>\n\t\t\t<a class=\"dropdown-item\" (click)=\"filterTutor('true')\">true</a>\n\t\t\t<a class=\"dropdown-item\" (click)=\"filterTutor('false')\">false</a>\n\t\t  </div></th>\n\t\t  \t\t  <th scope=\"col\" class=\"filterTable\"><button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"confirmedFilterButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n\t\t\t{{invitationService.filter.confirmed}}\n\t\t  </button>\n\t\t  <div class=\"dropdown-menu\" aria-labelledby=\"validFilterButton\">\n\t\t\t<a class=\"dropdown-item\" (click)=\"filterValid('')\">Both</a>\n\t\t\t<a class=\"dropdown-item\" (click)=\"filterValid('true')\">true</a>\n\t\t\t<a class=\"dropdown-item\" (click)=\"filterValid('false')\">false</a>\n\t\t  </div></th>\n\t\t  <th></th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let invitation of invitations; let i = index\">\n          <td>{{ invitation.id }}</td>\n          <td>{{ invitation.email }}</td>\n          <td>\n\t\t\t\t<a class=\"btn btn-success btn-circle btn-sm\" *ngIf=\"invitation.admin\" (click)=\"admin(i)\">\n                    <i class=\"fas fa-check\"></i>\n\t\t\t\t</a>\n\t\t\t\t<a class=\"btn btn-warning btn-circle btn-sm\" *ngIf=\"!invitation.admin\" (click)=\"admin(i)\">\n\t\t\t\t\t<i class=\"fas fa-times\"></i>\n\t\t\t\t</a>\n\t\t  </td>\n          <td><a class=\"btn btn-success btn-circle btn-sm\" *ngIf=\"invitation.tutor\" (click)=\"tutor(i)\">\n                    <i class=\"fas fa-check\"></i>\n\t\t\t\t</a>\n\t\t\t\t<a class=\"btn btn-warning btn-circle btn-sm\" *ngIf=\"!invitation.tutor\" (click)=\"tutor(i)\">\n                    <i class=\"fas fa-times\"></i>\n\t\t\t\t</a>\n\t\t  </td>\n          <td>\n\t\t\t<a class=\"btn btn-success btn-circle btn-sm\" *ngIf=\"invitation.valid\">\n               <i class=\"fas fa-check\"></i>\n\t\t\t</a>\n\t\t\t<a class=\"btn btn-warning btn-circle btn-sm\" *ngIf=\"!invitation.valid\">\n                <i class=\"fas fa-times\"></i>\n\t\t\t</a>\n\t\t  </td>\n\t\t  <td>\n\t\t\t<a class=\"btn btn-danger btn-circle btn-sm\" (click)=\"deletePopup(i)\" data-toggle=\"modal\" data-target=\"#deleteConfModal\">\n               <i class=\"fas fa-trash\"></i>\n            </a>\n\t\t  </td>\n        </tr>\n      </tbody>\n    </table>\n</div>\n<div class=\"row\">\n\t<div class=\"col-sm-12 col-md-6\">\n\t\t<div class=\"form-group row\">\n\t\t\t<label class=\"col-sm-3 col-form-label\">Show</label>\n\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t<select class=\"form-control\" [(ngModel)]=\"perPage\" (ngModelChange)=\"changePerPage()\">\n\t\t\t\t  <option value=\"10\">10</option>\n\t\t\t\t  <option value=\"25\">25</option>\n\t\t\t\t  <option value=\"50\">50</option>\n\t\t\t\t</select> \n\t\t\t</div>\n\t\t\t<label class=\"col-sm-5 col-form-label\">per page</label>\n\t\t</div>\t\n\t</div>\n\t<div class=\"col-sm-12 col-md-6\" *ngIf=\"pages>1\">\n\t\t<nav aria-label=\"Table navigation\">\n\t\t\t<ul class=\"pagination justify-content-end\">\n\t\t\t\t<li class=\"page-item\" *ngIf=\"currPage>1\">\n\t\t\t\t  <a class=\"page-link\" tabindex=\"-1\" (click)=\"setPage(1)\"><<</a>\n\t\t\t\t</li>\n\t\t\t\t<li class=\"page-item\" *ngIf=\"currPage>2\"><a class=\"page-link\" (click)=\"setPage(currPage-2)\">{{currPage-2}}</a></li>\n\t\t\t\t<li class=\"page-item\" *ngIf=\"currPage>1\"><a class=\"page-link\" (click)=\"setPage(currPage-1)\">{{currPage-1}}</a></li>\n\t\t\t\t<li class=\"page-item disabled\"><a class=\"page-link\" >{{currPage}}</a></li>\n\t\t\t\t<li class=\"page-item\" *ngIf=\"currPage<pages\"><a class=\"page-link\" (click)=\"setPage(currPage+1)\">{{currPage+1}}</a></li>\n\t\t\t\t<li class=\"page-item\" *ngIf=\"currPage<(pages-1)\"><a class=\"page-link\" (click)=\"setPage(currPage+2)\">{{currPage+2}}</a></li>\n\t\t\t\t<li class=\"page-item\" *ngIf=\"currPage<pages\">\n\t\t\t\t  <a class=\"page-link\" (click)=\"setPage(pages)\">>></a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</nav>\n\t</div>\n</div>\n\n\t<div class=\"modal fade\" id=\"deleteConfModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"Delete confirmation\" aria-hidden=\"true\">\n\t\t<div class=\"modal-dialog\">\n\t\t\t<div class=\"modal-content\">\n\t\t\t\t<div class=\"modal-header\">\n\t\t\t\t\t <h5 class=\"modal-title\">Delete invitation</h5>\n\t\t\t\t\t<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n\t\t\t\t\t  <span aria-hidden=\"true\">&times;</span>\n\t\t\t\t\t</button>\n            </div>\n            <div class=\"modal-body\" *ngIf=\"invitation!=null\">\n                Are you sure you want to delete invitation for :<br>\n\t\t\t\t<b>{{invitation.email}}</b>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\n                <button type=\"button\" class=\"btn btn-danger\" (click)=\"delete()\" data-dismiss=\"modal\">\n\t\t\t\t\t<span class=\"icon text-white-50\">\n\t\t\t\t\t\t <i class=\"fas fa-trash\"></i>\n\t\t\t\t\t</span>\n\t\t\t\t\t<span class=\"text\"> Delete</span>\n\t\t\t\t</button>\n            </div>\n        </div>\n    </div>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/user-admin/invite-user/invite-user.component.html":
  /*!*********************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/user-admin/invite-user/invite-user.component.html ***!
    \*********************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppUserAdminInviteUserInviteUserComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"d-sm-flex align-items-center justify-content-between mb-4\">\n\t<h1 class=\"h3 mb-0 text-gray-800\">Invite a user</h1>\n</div>\n<div class=\"row justify-content-center\">\n\t<div class=\"col-lg-6 col-md-10 col-sm-12\">\n\t\t<div class=\"card shadow mb-4\">\n\t\t\t<div class=\"card-header py-3\">\n\t\t\t\t<h6 class=\"m-0 font-weight-bold text-primary\">User informations</h6>\n             </div>\n        <div class=\"card-body\">\n\t\t\t<form class=\"user\" #inviteUserForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<input type=\"email\" [(ngModel)]=\"invitation.email\" \n\t\t\t\t\t\tclass=\"form-control\"\n\t\t\t\t\t\tid=\"inputEmail\"\n\t\t\t\t\t\taria-describedby=\"Login is the email\"\n\t\t\t\t\t\tname=\"inputEmail\"\n\t\t\t\t\t\tplaceholder=\"Enter Email Address...\"\n\t\t\t\t\t\trequired emailValidator #email=\"ngModel\">\n\t\t\t\t\t\t<span class=\"floating-label\">Email address</span>\n\t\t\t\t\t<div *ngIf=\"email.dirty && email.invalid\" class=\"alert alert-danger\">Email is required</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t  <div class=\"custom-control custom-checkbox small\">\n\t\t\t\t\t<input type=\"checkbox\" name=\"tutor\" class=\"custom-control-input\" id=\"tutorCheck\" [(ngModel)]=\"invitation.tutor\" >\n\t\t\t\t\t<label class=\"custom-control-label\" for=\"tutorCheck\">Tutor</label>\n\t\t\t\t  </div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t  <div class=\"custom-control custom-checkbox small\">\n\t\t\t\t\t<input type=\"checkbox\" name=\"admin\" class=\"custom-control-input\" id=\"adminCheck\" [(ngModel)]=\"invitation.admin\" >\n\t\t\t\t\t<label class=\"custom-control-label\" for=\"adminCheck\">Admin</label>\n\t\t\t\t  </div>\n\t\t\t\t</div>\n\t\t\t\t<button type=\"submit\" class=\"btn btn-primary btn-block btn-icon-split\" [disabled]=\"!inviteUserForm.form.valid\">\n\t\t\t\t\t<span class=\"icon text-white-50\">\n\t\t\t\t\t\t<i class=\"fas fa-envelope-open-text\"></i>\n\t\t\t\t\t</span>\n\t\t\t\t\t<span class=\"text\"> Invite</span>\n\t\t\t\t</button>\n\t\t\t\t<div class=\"alert alert-danger\" *ngIf=\"error!=null\">{{error}}</div>\n\t\t\t</form>\n\t\t</div>\n\t</div>\n</div>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/user-admin/update-user/update-user.component.html":
  /*!*********************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/user-admin/update-user/update-user.component.html ***!
    \*********************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppUserAdminUpdateUserUpdateUserComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"d-sm-flex align-items-center justify-content-between mb-4\" *ngIf=\"userService.userToUpdate\">\n\t<h1 class=\"h3 mb-0 text-gray-800\">Update user {{userService.userToUpdate.email}}</h1>\n</div>\n<div class=\"row justify-content-center\" *ngIf=\"userService.userToUpdate\">\n\t<div class=\"col-lg-6 col-md-10 col-sm-12\">\n\t\t<div class=\"card shadow mb-4\">\n\t\t\t<div class=\"card-header py-3\">\n\t\t\t\t<h6 class=\"m-0 font-weight-bold text-primary\">User informations</h6>\n             </div>\n        <div class=\"card-body\">\n\t\t\t<form class=\"user\" #updateUserForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<input type=\"email\" [(ngModel)]=\"userService.userToUpdate.email\" \n\t\t\t\t\t\tclass=\"form-control\"\n\t\t\t\t\t\tid=\"inputEmail\"\n\t\t\t\t\t\taria-describedby=\"Login is the email\"\n\t\t\t\t\t\tname=\"inputEmail\"\n\t\t\t\t\t\tplaceholder=\"Enter Email Address...\"\n\t\t\t\t\t\trequired emailValidator #email=\"ngModel\">\n\t\t\t\t\t\t<span class=\"floating-label\">Email address</span>\n\t\t\t\t\t<div *ngIf=\"email.dirty && email.invalid\" class=\"alert alert-danger\">Email is required</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<input type=\"text\" [(ngModel)]=\"userService.userToUpdate.firstname\" \n\t\t\t\t\t\tclass=\"form-control\"\n\t\t\t\t\t\tid=\"inputFirstname\"\n\t\t\t\t\t\taria-describedby=\"His firstname\"\n\t\t\t\t\t\tname=\"inputFirstname\"\n\t\t\t\t\t\tplaceholder=\"Enter his firstname...\"\n\t\t\t\t\t\trequired minlength=\"2\" #firstname=\"ngModel\">\n\t\t\t\t\t\t<span class=\"floating-label\">Firstname</span>\n\t\t\t\t\t<div *ngIf=\"firstname.dirty && firstname.invalid\" class=\"alert alert-danger\">Firstname is required</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<input type=\"text\" [(ngModel)]=\"userService.userToUpdate.lastname\" \n\t\t\t\t\t\tclass=\"form-control\"\n\t\t\t\t\t\tid=\"inputLastname\"\n\t\t\t\t\t\taria-describedby=\"His lastname\"\n\t\t\t\t\t\tname=\"inputLastname\"\n\t\t\t\t\t\tplaceholder=\"Enter his lastname...\"\n\t\t\t\t\t\trequired minlength=\"2\" #lastname=\"ngModel\">\n\t\t\t\t\t\t<span class=\"floating-label\">Lastname</span>\n\t\t\t\t\t<div *ngIf=\"lastname.dirty && lastname.invalid\" class=\"alert alert-danger\">Lastname is required</div>\n\t\t\t\t</div>\n\t\t\t\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t  <div class=\"custom-control custom-checkbox small\">\n\t\t\t\t\t<input type=\"checkbox\" name=\"valid\" class=\"custom-control-input\" id=\"validCheck\" [(ngModel)]=\"userService.userToUpdate.valid\" >\n\t\t\t\t\t<label class=\"custom-control-label\" for=\"validCheck\">Valid</label>\n\t\t\t\t  </div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t  <div class=\"custom-control custom-checkbox small\">\n\t\t\t\t\t<input type=\"checkbox\" name=\"tutor\" class=\"custom-control-input\" id=\"tutorCheck\" [(ngModel)]=\"userService.userToUpdate.tutor\" >\n\t\t\t\t\t<label class=\"custom-control-label\" for=\"tutorCheck\">Tutor</label>\n\t\t\t\t  </div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t  <div class=\"custom-control custom-checkbox small\">\n\t\t\t\t\t<input type=\"checkbox\" name=\"admin\" class=\"custom-control-input\" id=\"adminCheck\" [(ngModel)]=\"userService.userToUpdate.admin\" >\n\t\t\t\t\t<label class=\"custom-control-label\" for=\"adminCheck\">Admin</label>\n\t\t\t\t  </div>\n\t\t\t\t</div>\n\t\t\t\t<button type=\"submit\" class=\"btn btn-primary btn-block btn-icon-split\" [disabled]=\"!updateUserForm.form.valid\">\n\t\t\t\t\t<span class=\"icon text-white-50\">\n\t\t\t\t\t\t<i class=\"fas fa-pen\"></i>\n\t\t\t\t\t</span>\n\t\t\t\t\t<span class=\"text\"> Update</span>\n\t\t\t\t</button>\n\t\t\t\t<div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\n\t\t\t</form>\n\t\t</div>\n\t</div>\n</div>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/user-admin/user-list/user-list.component.html":
  /*!*****************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/user-admin/user-list/user-list.component.html ***!
    \*****************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppUserAdminUserListUserListComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"d-sm-flex align-items-center justify-content-between mb-1\">\n\t<h1 class=\"h3 mb-0 text-gray-800\">Users list</h1>\n</div>\n<div class=\"row\" >\n\t<div class=\"col-sm-12 col-md-6\"></div>\n\t<div class=\"col-sm-12 col-md-6\" *ngIf=\"pages>1\">\n\t\t<nav aria-label=\"Table navigation\">\n\t\t\t<ul class=\"pagination justify-content-end\">\n\t\t\t\t<li class=\"page-item\" *ngIf=\"currPage>1\">\n\t\t\t\t  <a class=\"page-link\" tabindex=\"-1\" (click)=\"setPage(1)\"><<</a>\n\t\t\t\t</li>\n\t\t\t\t<li class=\"page-item\" *ngIf=\"currPage>2\"><a class=\"page-link\" (click)=\"setPage(currPage-2)\">{{currPage-2}}</a></li>\n\t\t\t\t<li class=\"page-item\" *ngIf=\"currPage>1\"><a class=\"page-link\" (click)=\"setPage(currPage-1)\">{{currPage-1}}</a></li>\n\t\t\t\t<li class=\"page-item disabled\"><a class=\"page-link\" >{{currPage}}</a></li>\n\t\t\t\t<li class=\"page-item\" *ngIf=\"currPage<pages\"><a class=\"page-link\" (click)=\"setPage(currPage+1)\">{{currPage+1}}</a></li>\n\t\t\t\t<li class=\"page-item\" *ngIf=\"currPage<(pages-1)\"><a class=\"page-link\" (click)=\"setPage(currPage+2)\">{{currPage+2}}</a></li>\n\t\t\t\t<li class=\"page-item\" *ngIf=\"currPage<pages\">\n\t\t\t\t  <a class=\"page-link\" (click)=\"setPage(pages)\">>></a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</nav>\n\t</div>\n</div>\n<div class=\"table-responsive\">\n    <table class=\"table table-bordered table-striped\">\n      <thead class=\"thead-dark\">\n        <tr>\n          <th scope=\"col\" (click)=\"sort('id')\" [ngClass]=\"(userService.sortColumn=='id')?'sorting_'+userService.sortOrder:''\">#</th>\n          <th scope=\"col\" (click)=\"sort('email')\" [ngClass]=\"(userService.sortColumn=='email')?'sorting_'+userService.sortOrder:''\">Email</th>\n          <th scope=\"col\" (click)=\"sort('firstname')\" [ngClass]=\"(userService.sortColumn=='firstname')?'sorting_'+userService.sortOrder:''\">Firstname</th>\n          <th scope=\"col\" (click)=\"sort('lastname')\" [ngClass]=\"(userService.sortColumn=='lastname')?'sorting_'+userService.sortOrder:''\">Lastname</th>\n          <th scope=\"col\" (click)=\"sort('valid')\" [ngClass]=\"(userService.sortColumn=='valid')?'sorting_'+userService.sortOrder:''\">Valid</th>\n          <th scope=\"col\" (click)=\"sort('admin')\" [ngClass]=\"(userService.sortColumn=='admin')?'sorting_'+userService.sortOrder:''\">Admin</th>\n          <th scope=\"col\" (click)=\"sort('tutor')\" [ngClass]=\"(userService.sortColumn=='tutor')?'sorting_'+userService.sortOrder:''\">Tutor</th>\n          <th scope=\"col\" (click)=\"sort('locked')\" [ngClass]=\"(userService.sortColumn=='locked')?'sorting_'+userService.sortOrder:''\">Locked</th>\n\t\t  <th></th>\n        </tr>\n      </thead>\n      <thead class=\"thead-grey\">\n        <tr>\n          <th scope=\"col\" class=\"filterTable\"><input type=\"number\" [(ngModel)]=\"userService.filter.id\" (keyup.enter)=\"reload()\"/><a class=\"btn btn-primary\" (click)=\"reload()\"><i class=\"fas fa-filter\"></i></a></th>\n\t\t  <th scope=\"col\" class=\"filterTable\"><input type=\"text\" id=\"filterUserPerMail\" [(ngModel)]=\"userService.filter.email\" (keyup.enter)=\"reload()\"/><a class=\"btn btn-primary\" (click)=\"reload()\"><i class=\"fas fa-filter\"></i></a></th>\n\t\t  <th scope=\"col\" class=\"filterTable\"><input type=\"text\" [(ngModel)]=\"userService.filter.firstname\" (keyup.enter)=\"reload()\"/><a class=\"btn btn-primary\" (click)=\"reload()\"><i class=\"fas fa-filter\"></i></a></th>\n\t\t  <th scope=\"col\" class=\"filterTable\"><input type=\"text\" [(ngModel)]=\"userService.filter.lastname\" (keyup.enter)=\"reload()\"/><a class=\"btn btn-primary\" (click)=\"reload()\"><i class=\"fas fa-filter\"></i></a></th>\n\t\t  <th scope=\"col\" class=\"filterTable\"><button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"validFilterButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n\t\t\t{{userService.filter.valid}}\n\t\t  </button>\n\t\t  <div class=\"dropdown-menu\" aria-labelledby=\"validFilterButton\">\n\t\t\t<a class=\"dropdown-item\" (click)=\"filterValid('')\">Both</a>\n\t\t\t<a class=\"dropdown-item\" (click)=\"filterValid('true')\">true</a>\n\t\t\t<a class=\"dropdown-item\" (click)=\"filterValid('false')\">false</a>\n\t\t  </div></th>\n\t\t  <th scope=\"col\" class=\"filterTable\"><button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"adminFilterButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n\t\t\t{{userService.filter.admin}}\n\t\t  </button>\n\t\t  <div class=\"dropdown-menu\" aria-labelledby=\"adminFilterButton\">\n\t\t\t<a class=\"dropdown-item\" (click)=\"filterAdmin('')\">Both</a>\n\t\t\t<a class=\"dropdown-item\" (click)=\"filterAdmin('true')\">true</a>\n\t\t\t<a class=\"dropdown-item\" (click)=\"filterAdmin('false')\">false</a>\n\t\t  </div></th>\n\t\t  <th scope=\"col\" class=\"filterTable\"><button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"tutorFilterButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n\t\t\t{{userService.filter.tutor}}\n\t\t  </button>\n\t\t  <div class=\"dropdown-menu\" aria-labelledby=\"tutorFilterButton\">\n\t\t\t<a class=\"dropdown-item\" (click)=\"filterTutor('')\">Both</a>\n\t\t\t<a class=\"dropdown-item\" (click)=\"filterTutor('true')\">true</a>\n\t\t\t<a class=\"dropdown-item\" (click)=\"filterTutor('false')\">false</a>\n\t\t  </div></th>\n\t\t  <th scope=\"col\" class=\"filterTable\"><button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"lockedFilterButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n\t\t\t{{userService.filter.locked}}\n\t\t  </button>\n\t\t  <div class=\"dropdown-menu\" aria-labelledby=\"lockedFilterButton\">\n\t\t\t<a class=\"dropdown-item\" (click)=\"filterLocked('')\">Both</a>\n\t\t\t<a class=\"dropdown-item\" (click)=\"filterLocked('true')\">true</a>\n\t\t\t<a class=\"dropdown-item\" (click)=\"filterLocked('false')\">false</a>\n\t\t  </div></th>\n\t\t  <th></th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let user of users; let i = index\">\n          <td>{{ user.id }}</td>\n          <td>{{ user.email }}</td>\n          <td>{{ user.firstname }}</td>\n          <td>{{ user.lastname }}</td>\n          <td><a class=\"btn btn-success btn-circle btn-sm\" *ngIf=\"user.valid\" (click)=\"valid(i)\">\n\t\t\t\t<i class=\"fas fa-check\"></i>\n\t\t\t</a>\n\t\t\t<a class=\"btn btn-warning btn-circle btn-sm\" *ngIf=\"!user.valid\" (click)=\"valid(i)\">\n                <i class=\"fas fa-times\"></i>\n\t\t\t</a>\n\t\t  </td>\n          <td>\n\t\t\t<a class=\"btn btn-success btn-circle btn-sm\" *ngIf=\"user.admin\" (click)=\"admin(i)\">\n                <i class=\"fas fa-check\"></i>\n\t\t\t</a>\n\t\t\t<a class=\"btn btn-warning btn-circle btn-sm\" *ngIf=\"!user.admin\" (click)=\"admin(i)\">\n\t\t\t\t<i class=\"fas fa-times\"></i>\n\t\t\t</a>\n\t\t  </td>\n          <td><a class=\"btn btn-success btn-circle btn-sm\" *ngIf=\"user.tutor\" (click)=\"tutor(i)\">\n\t\t\t\t<i class=\"fas fa-check\"></i>\n\t\t\t</a>\n\t\t\t<a class=\"btn btn-warning btn-circle btn-sm\" *ngIf=\"!user.tutor\" (click)=\"tutor(i)\">\n\t\t\t\t<i class=\"fas fa-times\"></i>\n\t\t\t</a>\n\t\t  </td>\n          <td><a class=\"btn btn-danger btn-circle btn-sm\" *ngIf=\"user.locked\" (click)=\"unlock(i)\">\n                <i class=\"fas fa-user-lock\"></i>\n\t\t\t</a>\n\t\t\t<a class=\"btn btn-success btn-circle btn-sm\" *ngIf=\"!user.locked\">\n\t\t\t\t<i class=\"fas fa-lock-open\"></i>\n\t\t\t</a>\n\t\t  </td>\n\t\t  <td>\n\t\t\t<a class=\"btn btn-info btn-circle btn-sm\" (click)=\"update(i)\">\n               <i class=\"fas fa-pen\"></i>\n            </a>&nbsp;\n\t\t\t<a class=\"btn btn-danger btn-circle btn-sm\" *ngIf=\"user.id!=authService.user.id\" (click)=\"deletePopup(i)\" data-toggle=\"modal\" data-target=\"#deleteConfModal\">\n               <i class=\"fas fa-trash\"></i>\n            </a>\n\t\t  </td>\n        </tr>\n      </tbody>\n    </table>\n</div>\n<div class=\"row\">\n\t<div class=\"col-sm-12 col-md-6\">\n\t\t<div class=\"form-group row\">\n\t\t\t<label class=\"col-sm-3 col-form-label\">Show</label>\n\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t<select class=\"form-control\" [(ngModel)]=\"perPage\" (ngModelChange)=\"changePerPage()\">\n\t\t\t\t  <option value=\"10\">10</option>\n\t\t\t\t  <option value=\"25\">25</option>\n\t\t\t\t  <option value=\"50\">50</option>\n\t\t\t\t</select> \n\t\t\t</div>\n\t\t\t<label class=\"col-sm-5 col-form-label\">per page</label>\n\t\t</div>\t\n\t</div>\n\t<div class=\"col-sm-12 col-md-6\" *ngIf=\"pages>1\">\n\t\t<nav aria-label=\"Table navigation\">\n\t\t\t<ul class=\"pagination justify-content-end\">\n\t\t\t\t<li class=\"page-item\" *ngIf=\"currPage>1\">\n\t\t\t\t  <a class=\"page-link\" tabindex=\"-1\" (click)=\"setPage(1)\"><<</a>\n\t\t\t\t</li>\n\t\t\t\t<li class=\"page-item\" *ngIf=\"currPage>2\"><a class=\"page-link\" (click)=\"setPage(currPage-2)\">{{currPage-2}}</a></li>\n\t\t\t\t<li class=\"page-item\" *ngIf=\"currPage>1\"><a class=\"page-link\" (click)=\"setPage(currPage-1)\">{{currPage-1}}</a></li>\n\t\t\t\t<li class=\"page-item disabled\"><a class=\"page-link\" >{{currPage}}</a></li>\n\t\t\t\t<li class=\"page-item\" *ngIf=\"currPage<pages\"><a class=\"page-link\" (click)=\"setPage(currPage+1)\">{{currPage+1}}</a></li>\n\t\t\t\t<li class=\"page-item\" *ngIf=\"currPage<(pages-1)\"><a class=\"page-link\" (click)=\"setPage(currPage+2)\">{{currPage+2}}</a></li>\n\t\t\t\t<li class=\"page-item\" *ngIf=\"currPage<pages\">\n\t\t\t\t  <a class=\"page-link\" (click)=\"setPage(pages)\">>></a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</nav>\n\t</div>\n</div>\n\n<div class=\"modal fade\" id=\"deleteConfModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"Delete confirmation\" aria-hidden=\"true\">\n\t<div class=\"modal-dialog\">\n\t\t<div class=\"modal-content\">\n\t\t\t<div class=\"modal-header\">\n\t\t\t\t<h5 class=\"modal-title\">Delete user</h5>\n\t\t\t\t<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n\t\t\t\t\t<span aria-hidden=\"true\">&times;</span>\n\t\t\t\t</button>\n            </div>\n            <div class=\"modal-body\" *ngIf=\"user!=null\">\n                Are you sure you want to delete user :<br>\n\t\t\t\t<b>{{user.firstname}} {{user.lastname}}</b> (<b>{{user.email}}</b>)\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\n                <button type=\"button\" class=\"btn btn-danger\" (click)=\"delete()\" data-dismiss=\"modal\">\n\t\t\t\t\t<span class=\"icon text-white-50\">\n\t\t\t\t\t\t <i class=\"fas fa-trash\"></i>\n\t\t\t\t\t</span>\n\t\t\t\t\t<span class=\"text\"> Delete</span>\n\t\t\t\t</button>\n            </div>\n        </div>\n    </div>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/web-proxy/web-proxy.component.html":
  /*!******************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/web-proxy/web-proxy.component.html ***!
    \******************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppWebProxyWebProxyComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"form-group\">\n\t\t<input type=\"text\" [(ngModel)]=\"url\" \n\t\t\tclass=\"form-control\"\n\t\t\tid=\"inputUrl\"\n\t\t\tname=\"inputUrl\"\n\t\t\tplaceholder=\"URL\"\n\t\t\trequired minlength=\"6\" #myUrl=\"ngModel\" (ngModelChange)=\"onUrlChange()\" >\n\t\t<div *ngIf=\"myUrl.dirty && myUrl.invalid\" class=\"alert alert-danger\">myUrl</div>\n    </div>\n\t\n\t<iframe #frameBrowser id=\"frameBrowser\" src=\"\"></iframe>";
    /***/
  },

  /***/
  "./node_modules/tslib/tslib.es6.js":
  /*!*****************************************!*\
    !*** ./node_modules/tslib/tslib.es6.js ***!
    \*****************************************/

  /*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */

  /***/
  function node_modulesTslibTslibEs6Js(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__extends", function () {
      return __extends;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__assign", function () {
      return _assign;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__rest", function () {
      return __rest;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__decorate", function () {
      return __decorate;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__param", function () {
      return __param;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__metadata", function () {
      return __metadata;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__awaiter", function () {
      return __awaiter;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__generator", function () {
      return __generator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__exportStar", function () {
      return __exportStar;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__values", function () {
      return __values;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__read", function () {
      return __read;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__spread", function () {
      return __spread;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__spreadArrays", function () {
      return __spreadArrays;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__await", function () {
      return __await;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function () {
      return __asyncGenerator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function () {
      return __asyncDelegator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__asyncValues", function () {
      return __asyncValues;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function () {
      return __makeTemplateObject;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__importStar", function () {
      return __importStar;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__importDefault", function () {
      return __importDefault;
    });
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0
    
    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.
    
    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    /* global Reflect, Promise */


    var _extendStatics = function extendStatics(d, b) {
      _extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return _extendStatics(d, b);
    };

    function __extends(d, b) {
      _extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var _assign = function __assign() {
      _assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
        }

        return t;
      };

      return _assign.apply(this, arguments);
    };

    function __rest(s, e) {
      var t = {};

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
      }

      if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
      }
      return t;
    }

    function __decorate(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
      return function (target, key) {
        decorator(target, key, paramIndex);
      };
    }

    function __metadata(metadataKey, metadataValue) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }

        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }

        function step(result) {
          result.done ? resolve(result.value) : new P(function (resolve) {
            resolve(result.value);
          }).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    }

    function __generator(thisArg, body) {
      var _ = {
        label: 0,
        sent: function sent() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
          f,
          y,
          t,
          g;
      return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
      }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;

      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }

      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");

        while (_) {
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];

            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;

              case 4:
                _.label++;
                return {
                  value: op[1],
                  done: false
                };

              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;

              case 7:
                op = _.ops.pop();

                _.trys.pop();

                continue;

              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }

                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }

                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }

                if (t && _.label < t[2]) {
                  _.label = t[2];

                  _.ops.push(op);

                  break;
                }

                if (t[2]) _.ops.pop();

                _.trys.pop();

                continue;
            }

            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        }

        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    }

    function __exportStar(m, exports) {
      for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
      }
    }

    function __values(o) {
      var m = typeof Symbol === "function" && o[Symbol.iterator],
          i = 0;
      if (m) return m.call(o);
      return {
        next: function next() {
          if (o && i >= o.length) o = void 0;
          return {
            value: o && o[i++],
            done: !o
          };
        }
      };
    }

    function __read(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o),
          r,
          ar = [],
          e;

      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
          ar.push(r.value);
        }
      } catch (error) {
        e = {
          error: error
        };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }

      return ar;
    }

    function __spread() {
      for (var ar = [], i = 0; i < arguments.length; i++) {
        ar = ar.concat(__read(arguments[i]));
      }

      return ar;
    }

    function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
        s += arguments[i].length;
      }

      for (var r = Array(s), k = 0, i = 0; i < il; i++) {
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
          r[k] = a[j];
        }
      }

      return r;
    }

    ;

    function __await(v) {
      return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var g = generator.apply(thisArg, _arguments || []),
          i,
          q = [];
      return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
        return this;
      }, i;

      function verb(n) {
        if (g[n]) i[n] = function (v) {
          return new Promise(function (a, b) {
            q.push([n, v, a, b]) > 1 || resume(n, v);
          });
        };
      }

      function resume(n, v) {
        try {
          step(g[n](v));
        } catch (e) {
          settle(q[0][3], e);
        }
      }

      function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
      }

      function fulfill(value) {
        resume("next", value);
      }

      function reject(value) {
        resume("throw", value);
      }

      function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
      }
    }

    function __asyncDelegator(o) {
      var i, p;
      return i = {}, verb("next"), verb("throw", function (e) {
        throw e;
      }), verb("return"), i[Symbol.iterator] = function () {
        return this;
      }, i;

      function verb(n, f) {
        i[n] = o[n] ? function (v) {
          return (p = !p) ? {
            value: __await(o[n](v)),
            done: n === "return"
          } : f ? f(v) : v;
        } : f;
      }
    }

    function __asyncValues(o) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var m = o[Symbol.asyncIterator],
          i;
      return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
        return this;
      }, i);

      function verb(n) {
        i[n] = o[n] && function (v) {
          return new Promise(function (resolve, reject) {
            v = o[n](v), settle(resolve, reject, v.done, v.value);
          });
        };
      }

      function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function (v) {
          resolve({
            value: v,
            done: d
          });
        }, reject);
      }
    }

    function __makeTemplateObject(cooked, raw) {
      if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", {
          value: raw
        });
      } else {
        cooked.raw = raw;
      }

      return cooked;
    }

    ;

    function __importStar(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) {
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
      }
      result.default = mod;
      return result;
    }

    function __importDefault(mod) {
      return mod && mod.__esModule ? mod : {
        default: mod
      };
    }
    /***/

  },

  /***/
  "./src/app/app-routing.module.ts":
  /*!***************************************!*\
    !*** ./src/app/app-routing.module.ts ***!
    \***************************************/

  /*! exports provided: AppRoutingModule */

  /***/
  function srcAppAppRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () {
      return AppRoutingModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _user_admin_user_list_user_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./user-admin/user-list/user-list.component */
    "./src/app/user-admin/user-list/user-list.component.ts");
    /* harmony import */


    var _user_admin_create_user_create_user_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./user-admin/create-user/create-user.component */
    "./src/app/user-admin/create-user/create-user.component.ts");
    /* harmony import */


    var _user_admin_update_user_update_user_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./user-admin/update-user/update-user.component */
    "./src/app/user-admin/update-user/update-user.component.ts");
    /* harmony import */


    var _user_admin_invite_user_invite_user_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./user-admin/invite-user/invite-user.component */
    "./src/app/user-admin/invite-user/invite-user.component.ts");
    /* harmony import */


    var _user_admin_invitations_list_invitations_list_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./user-admin/invitations-list/invitations-list.component */
    "./src/app/user-admin/invitations-list/invitations-list.component.ts");
    /* harmony import */


    var _me_my_profile_my_profile_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ./me/my-profile/my-profile.component */
    "./src/app/me/my-profile/my-profile.component.ts");
    /* harmony import */


    var _config_config_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ./config/config.component */
    "./src/app/config/config.component.ts");
    /* harmony import */


    var _web_proxy_web_proxy_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! ./web-proxy/web-proxy.component */
    "./src/app/web-proxy/web-proxy.component.ts");

    var routes = [{
      path: 'users',
      component: _user_admin_user_list_user_list_component__WEBPACK_IMPORTED_MODULE_3__["UserListComponent"]
    }, {
      path: 'adduser',
      component: _user_admin_create_user_create_user_component__WEBPACK_IMPORTED_MODULE_4__["CreateUserComponent"]
    }, {
      path: 'updateUser',
      component: _user_admin_update_user_update_user_component__WEBPACK_IMPORTED_MODULE_5__["UpdateUserComponent"]
    }, {
      path: 'inviteUser',
      component: _user_admin_invite_user_invite_user_component__WEBPACK_IMPORTED_MODULE_6__["InviteUserComponent"]
    }, {
      path: 'invitations',
      component: _user_admin_invitations_list_invitations_list_component__WEBPACK_IMPORTED_MODULE_7__["InvitationsListComponent"]
    }, {
      path: 'profile',
      component: _me_my_profile_my_profile_component__WEBPACK_IMPORTED_MODULE_8__["MyProfileComponent"]
    }, {
      path: 'config',
      component: _config_config_component__WEBPACK_IMPORTED_MODULE_9__["ConfigComponent"]
    }, {
      path: 'webproxy',
      component: _web_proxy_web_proxy_component__WEBPACK_IMPORTED_MODULE_10__["WebProxyComponent"]
    }];

    var AppRoutingModule = function AppRoutingModule() {
      _classCallCheck(this, AppRoutingModule);
    };

    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], AppRoutingModule);
    /***/
  },

  /***/
  "./src/app/app.component.scss":
  /*!************************************!*\
    !*** ./src/app/app.component.scss ***!
    \************************************/

  /*! exports provided: default */

  /***/
  function srcAppAppComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "#wrapper {\n  display: -webkit-box;\n  display: flex;\n}\n\nul.sidebar {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvQzpcXFVzZXJzXFxjaHJpc3RvcGhlLmRhbWVcXHdvcmtzcGFjZS10b3B0YWxcXGZhYnVsZXhpZVxcZmFidWxleGllLXdlYlxcc3JjXFxtYWluXFxmcm9udGVuZC9zcmNcXGFwcFxcYXBwLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDQyxvQkFBQTtFQUFBLGFBQUE7QUNDRDs7QURFQTtFQUNDLG9CQUFBO0VBQUEsYUFBQTtFQUNHLDRCQUFBO0VBQUEsNkJBQUE7VUFBQSxzQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjd3JhcHBlciB7XHJcblx0ZGlzcGxheTogZmxleDtcclxufVxyXG5cclxudWwuc2lkZWJhciB7XHJcblx0ZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xyXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcclxufSIsIiN3cmFwcGVyIHtcbiAgZGlzcGxheTogZmxleDtcbn1cblxudWwuc2lkZWJhciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHBhZGRpbmctbGVmdDogMDtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/app.component.ts":
  /*!**********************************!*\
    !*** ./src/app/app.component.ts ***!
    \**********************************/

  /*! exports provided: AppComponent */

  /***/
  function srcAppAppComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
      return AppComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _service_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./service/auth.service */
    "./src/app/service/auth.service.ts");
    /* harmony import */


    var _service_social_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./service/social.service */
    "./src/app/service/social.service.ts");
    /* harmony import */


    var angularx_social_login__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! angularx-social-login */
    "./node_modules/angularx-social-login/angularx-social-login.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");

    var AppComponent =
    /*#__PURE__*/
    function () {
      function AppComponent(authService, socialAuthService, socialService, route) {
        var _this = this;

        _classCallCheck(this, AppComponent);

        this.authService = authService;
        this.socialAuthService = socialAuthService;
        this.socialService = socialService;
        this.route = route;
        this.googleMapApiKey = localStorage.getItem("googleMapApiKey");
        this.route.queryParams.subscribe(function (params) {
          var code = params['code'];
          var email = params['valid'];

          if (email && code) {
            _this.authService.valid(email, code);
          }
        });
      }

      _createClass(AppComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this2 = this;

          this.socialAuthService.authState.subscribe(function (user) {
            if (user != null && (_this2.authService.user === null || user.email !== _this2.authService.user.email)) {
              if (user != null && user.provider == 'GOOGLE') {
                _this2.socialService.socialAuth(user.idToken, user.provider);
              } else if (user != null && user.provider == 'FACEBOOK') {
                _this2.socialService.socialAuth(user.authToken, user.provider);
              }
            }

            if (user == null && _this2.authService.user != null && _this2.authService.user.loginSource != 'standard') {
              _this2.authService.logout();
            }
          });
        }
      }]);

      return AppComponent;
    }();

    AppComponent.ctorParameters = function () {
      return [{
        type: _service_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]
      }, {
        type: angularx_social_login__WEBPACK_IMPORTED_MODULE_4__["AuthService"]
      }, {
        type: _service_social_service__WEBPACK_IMPORTED_MODULE_3__["SocialService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]
      }];
    };

    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-root',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./app.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./app.component.scss */
      "./src/app/app.component.scss")).default]
    })], AppComponent);
    /***/
  },

  /***/
  "./src/app/app.module.ts":
  /*!*******************************!*\
    !*** ./src/app/app.module.ts ***!
    \*******************************/

  /*! exports provided: AppModule, provideSocialConfig, initApp, injectDOMElement */

  /***/
  function srcAppAppModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppModule", function () {
      return AppModule;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "provideSocialConfig", function () {
      return provideSocialConfig;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "initApp", function () {
      return initApp;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "injectDOMElement", function () {
      return injectDOMElement;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */


    var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./app-routing.module */
    "./src/app/app-routing.module.ts");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../environments/environment */
    "./src/environments/environment.ts");
    /* harmony import */


    var _interceptors_httpDateInterceptor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./interceptors/httpDateInterceptor */
    "./src/app/interceptors/httpDateInterceptor.ts");
    /* harmony import */


    var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! @ng-bootstrap/ng-bootstrap */
    "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
    /* harmony import */


    var ng2_file_upload__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ng2-file-upload */
    "./node_modules/ng2-file-upload/fesm2015/ng2-file-upload.js");
    /* harmony import */


    var ng5_slider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! ng5-slider */
    "./node_modules/ng5-slider/esm2015/ng5-slider.js");
    /* harmony import */


    var angularx_social_login__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! angularx-social-login */
    "./node_modules/angularx-social-login/angularx-social-login.js");
    /* harmony import */


    var _app_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! ./app.component */
    "./src/app/app.component.ts");
    /* harmony import */


    var _user_admin_user_list_user_list_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! ./user-admin/user-list/user-list.component */
    "./src/app/user-admin/user-list/user-list.component.ts");
    /* harmony import */


    var _user_admin_create_user_create_user_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
    /*! ./user-admin/create-user/create-user.component */
    "./src/app/user-admin/create-user/create-user.component.ts");
    /* harmony import */


    var _user_admin_update_user_update_user_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
    /*! ./user-admin/update-user/update-user.component */
    "./src/app/user-admin/update-user/update-user.component.ts");
    /* harmony import */


    var _user_admin_invite_user_invite_user_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
    /*! ./user-admin/invite-user/invite-user.component */
    "./src/app/user-admin/invite-user/invite-user.component.ts");
    /* harmony import */


    var _user_admin_invitations_list_invitations_list_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
    /*! ./user-admin/invitations-list/invitations-list.component */
    "./src/app/user-admin/invitations-list/invitations-list.component.ts");
    /* harmony import */


    var _config_config_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
    /*! ./config/config.component */
    "./src/app/config/config.component.ts");
    /* harmony import */


    var _layout_footer_footer_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
    /*! ./layout/footer/footer.component */
    "./src/app/layout/footer/footer.component.ts");
    /* harmony import */


    var _layout_main_main_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
    /*! ./layout/main/main.component */
    "./src/app/layout/main/main.component.ts");
    /* harmony import */


    var _auth_login_login_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
    /*! ./auth/login/login.component */
    "./src/app/auth/login/login.component.ts");
    /* harmony import */


    var _auth_welcome_welcome_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
    /*! ./auth/welcome/welcome.component */
    "./src/app/auth/welcome/welcome.component.ts");
    /* harmony import */


    var _auth_register_register_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(
    /*! ./auth/register/register.component */
    "./src/app/auth/register/register.component.ts");
    /* harmony import */


    var _auth_forgot_pwd_forgot_pwd_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(
    /*! ./auth/forgot-pwd/forgot-pwd.component */
    "./src/app/auth/forgot-pwd/forgot-pwd.component.ts");
    /* harmony import */


    var _me_my_profile_my_profile_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(
    /*! ./me/my-profile/my-profile.component */
    "./src/app/me/my-profile/my-profile.component.ts");
    /* harmony import */


    var _web_proxy_web_proxy_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(
    /*! ./web-proxy/web-proxy.component */
    "./src/app/web-proxy/web-proxy.component.ts");
    /* harmony import */


    var _service_user_service__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(
    /*! ./service/user.service */
    "./src/app/service/user.service.ts");
    /* harmony import */


    var _service_auth_service__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(
    /*! ./service/auth.service */
    "./src/app/service/auth.service.ts");
    /* harmony import */


    var _service_webproxy_service__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(
    /*! ./service/webproxy.service */
    "./src/app/service/webproxy.service.ts");
    /* harmony import */


    var _email_validator_directive__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(
    /*! ./email-validator.directive */
    "./src/app/email-validator.directive.ts");
    /* harmony import */


    var _positive_validator_directive__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(
    /*! ./positive-validator.directive */
    "./src/app/positive-validator.directive.ts");
    /* harmony import */


    var _shortnumber_pipe__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(
    /*! ./shortnumber.pipe */
    "./src/app/shortnumber.pipe.ts");

    var AppModule = function AppModule() {
      _classCallCheck(this, AppModule);
    };

    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
      declarations: [_email_validator_directive__WEBPACK_IMPORTED_MODULE_30__["EmailValidator"], _positive_validator_directive__WEBPACK_IMPORTED_MODULE_31__["PositiveValidator"], _shortnumber_pipe__WEBPACK_IMPORTED_MODULE_32__["ShortnumberPipe"], _app_component__WEBPACK_IMPORTED_MODULE_12__["AppComponent"], _user_admin_user_list_user_list_component__WEBPACK_IMPORTED_MODULE_13__["UserListComponent"], _user_admin_create_user_create_user_component__WEBPACK_IMPORTED_MODULE_14__["CreateUserComponent"], _layout_footer_footer_component__WEBPACK_IMPORTED_MODULE_19__["FooterComponent"], _auth_login_login_component__WEBPACK_IMPORTED_MODULE_21__["LoginComponent"], _layout_main_main_component__WEBPACK_IMPORTED_MODULE_20__["MainComponent"], _auth_welcome_welcome_component__WEBPACK_IMPORTED_MODULE_22__["WelcomeComponent"], _auth_register_register_component__WEBPACK_IMPORTED_MODULE_23__["RegisterComponent"], _auth_forgot_pwd_forgot_pwd_component__WEBPACK_IMPORTED_MODULE_24__["ForgotPwdComponent"], _user_admin_update_user_update_user_component__WEBPACK_IMPORTED_MODULE_15__["UpdateUserComponent"], _me_my_profile_my_profile_component__WEBPACK_IMPORTED_MODULE_25__["MyProfileComponent"], _user_admin_invite_user_invite_user_component__WEBPACK_IMPORTED_MODULE_16__["InviteUserComponent"], _user_admin_invitations_list_invitations_list_component__WEBPACK_IMPORTED_MODULE_17__["InvitationsListComponent"], _config_config_component__WEBPACK_IMPORTED_MODULE_18__["ConfigComponent"], _web_proxy_web_proxy_component__WEBPACK_IMPORTED_MODULE_26__["WebProxyComponent"]],
      imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__["NgbModule"], ng2_file_upload__WEBPACK_IMPORTED_MODULE_9__["FileUploadModule"], ng5_slider__WEBPACK_IMPORTED_MODULE_10__["Ng5SliderModule"], angularx_social_login__WEBPACK_IMPORTED_MODULE_11__["SocialLoginModule"]],
      providers: [_service_user_service__WEBPACK_IMPORTED_MODULE_27__["UserService"], _service_auth_service__WEBPACK_IMPORTED_MODULE_28__["AuthService"], _service_webproxy_service__WEBPACK_IMPORTED_MODULE_29__["WebproxyService"], {
        provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HTTP_INTERCEPTORS"],
        useClass: _interceptors_httpDateInterceptor__WEBPACK_IMPORTED_MODULE_7__["HttpDateInterceptor"],
        multi: true
      }, {
        provide: angularx_social_login__WEBPACK_IMPORTED_MODULE_11__["AuthServiceConfig"],
        useFactory: provideSocialConfig
      }, {
        provide: _angular_core__WEBPACK_IMPORTED_MODULE_2__["APP_INITIALIZER"],
        useFactory: initApp,
        multi: true,
        deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]]
      }],
      bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_12__["AppComponent"]]
    })], AppModule); // Your configuration provider.

    function provideSocialConfig() {
      // Get the auth provider configuration from localStorage.
      var googleCLientId = localStorage.getItem("googleClientId");
      var faceBookAppId = localStorage.getItem("faceBookAppId");
      return new angularx_social_login__WEBPACK_IMPORTED_MODULE_11__["AuthServiceConfig"]([{
        id: angularx_social_login__WEBPACK_IMPORTED_MODULE_11__["GoogleLoginProvider"].PROVIDER_ID,
        provider: new angularx_social_login__WEBPACK_IMPORTED_MODULE_11__["GoogleLoginProvider"](googleCLientId)
      }, {
        id: angularx_social_login__WEBPACK_IMPORTED_MODULE_11__["FacebookLoginProvider"].PROVIDER_ID,
        provider: new angularx_social_login__WEBPACK_IMPORTED_MODULE_11__["FacebookLoginProvider"](faceBookAppId)
      }]);
    } // App initializer. This is called whenever the app is initialized, and that's when we need to get the configurations from the server.


    function initApp(http) {
      var _this3 = this;

      return function () {
        return new Promise(function (resolve, reject) {
          return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this3, void 0, void 0,
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            var result;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].settings.backend + '/admin/config').toPromise();

                  case 2:
                    result = _context.sent;

                    if (result) {
                      localStorage.setItem("googleClientId", result.googleClientId);
                      localStorage.setItem("faceBookAppId", result.faceBookAppId);
                      injectDOMElement('script', 'head', {
                        src: "https://maps.googleapis.com/maps/api/js?key=" + result.googleMapApiKey,
                        type: "text/javascript"
                      });
                    }

                    resolve(true);

                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));
        });
      };
    }

    function injectDOMElement(tagName, targetSelector, options) {
      var element = document.createElement(tagName);

      if (options) {
        Object.keys(options).forEach(function (key) {
          element[key] = options[key];
        });
      }

      document.querySelector(targetSelector).appendChild(element);
      return element;
    }
    /***/

  },

  /***/
  "./src/app/auth/forgot-pwd/forgot-pwd.component.scss":
  /*!***********************************************************!*\
    !*** ./src/app/auth/forgot-pwd/forgot-pwd.component.scss ***!
    \***********************************************************/

  /*! exports provided: default */

  /***/
  function srcAppAuthForgotPwdForgotPwdComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1dGgvZm9yZ290LXB3ZC9mb3Jnb3QtcHdkLmNvbXBvbmVudC5zY3NzIn0= */";
    /***/
  },

  /***/
  "./src/app/auth/forgot-pwd/forgot-pwd.component.ts":
  /*!*********************************************************!*\
    !*** ./src/app/auth/forgot-pwd/forgot-pwd.component.ts ***!
    \*********************************************************/

  /*! exports provided: ForgotPwdComponent */

  /***/
  function srcAppAuthForgotPwdForgotPwdComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ForgotPwdComponent", function () {
      return ForgotPwdComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _service_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../service/auth.service */
    "./src/app/service/auth.service.ts");

    var ForgotPwdComponent =
    /*#__PURE__*/
    function () {
      function ForgotPwdComponent(authService, route) {
        var _this4 = this;

        _classCallCheck(this, ForgotPwdComponent);

        this.authService = authService;
        this.route = route;
        this.state = '';
        this.login = {};
        this.route.queryParams.subscribe(function (params) {
          var code = params['code'];
          var email = params['pwdchange'];

          if (email && code) {
            _this4.state = 'code';
            _this4.login.email = email;
            _this4.login.code = code;
          }
        });
      }

      _createClass(ForgotPwdComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }, {
        key: "sendMeCode",
        value: function sendMeCode() {
          this.authService.newPassword(this.login.email);
          this.state = 'code';
        }
      }, {
        key: "changePwd",
        value: function changePwd() {
          this.authService.registerNewPwd(this.login.email, this.login.code, this.login.password);
          this.state = '';
        }
      }]);

      return ForgotPwdComponent;
    }();

    ForgotPwdComponent.ctorParameters = function () {
      return [{
        type: _service_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]
      }];
    };

    ForgotPwdComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-forgot-pwd',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./forgot-pwd.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/auth/forgot-pwd/forgot-pwd.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./forgot-pwd.component.scss */
      "./src/app/auth/forgot-pwd/forgot-pwd.component.scss")).default]
    })], ForgotPwdComponent);
    /***/
  },

  /***/
  "./src/app/auth/login/login.component.scss":
  /*!*************************************************!*\
    !*** ./src/app/auth/login/login.component.scss ***!
    \*************************************************/

  /*! exports provided: default */

  /***/
  function srcAppAuthLoginLoginComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1dGgvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MifQ== */";
    /***/
  },

  /***/
  "./src/app/auth/login/login.component.ts":
  /*!***********************************************!*\
    !*** ./src/app/auth/login/login.component.ts ***!
    \***********************************************/

  /*! exports provided: LoginComponent */

  /***/
  function srcAppAuthLoginLoginComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoginComponent", function () {
      return LoginComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var angularx_social_login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! angularx-social-login */
    "./node_modules/angularx-social-login/angularx-social-login.js");
    /* harmony import */


    var _service_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../service/auth.service */
    "./src/app/service/auth.service.ts");
    /* harmony import */


    var _service_social_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../service/social.service */
    "./src/app/service/social.service.ts");
    /* harmony import */


    var _model_user__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../../model/user */
    "./src/app/model/user.ts");

    var LoginComponent =
    /*#__PURE__*/
    function () {
      function LoginComponent(socialAuthService, authService, socialService) {
        _classCallCheck(this, LoginComponent);

        this.socialAuthService = socialAuthService;
        this.authService = authService;
        this.socialService = socialService;
        this.login = new _model_user__WEBPACK_IMPORTED_MODULE_5__["User"]();
        this.login.remember = true;
      }

      _createClass(LoginComponent, [{
        key: "onLogin",
        value: function onLogin() {
          this.authService.login(this.login);
        }
      }, {
        key: "signInWithGoogle",
        value: function signInWithGoogle() {
          this.socialAuthService.signIn(angularx_social_login__WEBPACK_IMPORTED_MODULE_2__["GoogleLoginProvider"].PROVIDER_ID);
        }
      }, {
        key: "signInWithFB",
        value: function signInWithFB() {
          this.socialAuthService.signIn(angularx_social_login__WEBPACK_IMPORTED_MODULE_2__["FacebookLoginProvider"].PROVIDER_ID);
        }
      }, {
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);

      return LoginComponent;
    }();

    LoginComponent.ctorParameters = function () {
      return [{
        type: angularx_social_login__WEBPACK_IMPORTED_MODULE_2__["AuthService"]
      }, {
        type: _service_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]
      }, {
        type: _service_social_service__WEBPACK_IMPORTED_MODULE_4__["SocialService"]
      }];
    };

    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-login',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./login.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/auth/login/login.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./login.component.scss */
      "./src/app/auth/login/login.component.scss")).default]
    })], LoginComponent);
    /***/
  },

  /***/
  "./src/app/auth/register/register.component.scss":
  /*!*******************************************************!*\
    !*** ./src/app/auth/register/register.component.scss ***!
    \*******************************************************/

  /*! exports provided: default */

  /***/
  function srcAppAuthRegisterRegisterComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1dGgvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50LnNjc3MifQ== */";
    /***/
  },

  /***/
  "./src/app/auth/register/register.component.ts":
  /*!*****************************************************!*\
    !*** ./src/app/auth/register/register.component.ts ***!
    \*****************************************************/

  /*! exports provided: RegisterComponent */

  /***/
  function srcAppAuthRegisterRegisterComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RegisterComponent", function () {
      return RegisterComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _service_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../service/auth.service */
    "./src/app/service/auth.service.ts");
    /* harmony import */


    var _model_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../model/user */
    "./src/app/model/user.ts");

    var RegisterComponent =
    /*#__PURE__*/
    function () {
      function RegisterComponent(authService, route) {
        var _this5 = this;

        _classCallCheck(this, RegisterComponent);

        this.authService = authService;
        this.route = route;
        this.code = null;
        this.login = new _model_user__WEBPACK_IMPORTED_MODULE_4__["User"]();
        this.route.queryParams.subscribe(function (params) {
          var email = params['invitation'];
          var code = params['code'];

          if (email && code) {
            _this5.login.email = email;
            _this5.code = code;
          }
        });
      }

      _createClass(RegisterComponent, [{
        key: "onRegister",
        value: function onRegister() {
          this.authService.register(this.login, this.code);
        }
      }]);

      return RegisterComponent;
    }();

    RegisterComponent.ctorParameters = function () {
      return [{
        type: _service_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]
      }];
    };

    RegisterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-register',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./register.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/auth/register/register.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./register.component.scss */
      "./src/app/auth/register/register.component.scss")).default]
    })], RegisterComponent);
    /***/
  },

  /***/
  "./src/app/auth/welcome/welcome.component.scss":
  /*!*****************************************************!*\
    !*** ./src/app/auth/welcome/welcome.component.scss ***!
    \*****************************************************/

  /*! exports provided: default */

  /***/
  function srcAppAuthWelcomeWelcomeComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "a.btn.btn-primary:not([href]) {\n  color: #fff;\n  background-color: #007bff;\n  border-color: #007bff;\n}\n\n.bg-login-image {\n  background-image: url('fabulexie.png');\n  background-size: 50%;\n  background-repeat: no-repeat;\n  background-position-x: 50%;\n  background-position-y: 50%;\n}\n\n.cookie_banner-message {\n  color: white;\n  font-size: 16px;\n  line-height: 20px;\n  -webkit-box-align: center;\n          align-items: center;\n  background: #3a3b45;\n  bottom: 0;\n  display: -webkit-box;\n  display: flex;\n  font-family: Proxima Nova, Arial, \"sans-serif\";\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  left: 0;\n  padding: 35px 50px;\n  position: fixed;\n  right: 0;\n  z-index: 10;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aC93ZWxjb21lL0M6XFxVc2Vyc1xcY2hyaXN0b3BoZS5kYW1lXFx3b3Jrc3BhY2UtdG9wdGFsXFxmYWJ1bGV4aWVcXGZhYnVsZXhpZS13ZWJcXHNyY1xcbWFpblxcZnJvbnRlbmQvc3JjXFxhc3NldHNcXGNzc1xcX3ZhcnMuc2NzcyIsInNyYy9hcHAvYXV0aC93ZWxjb21lL3dlbGNvbWUuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2F1dGgvd2VsY29tZS9DOlxcVXNlcnNcXGNocmlzdG9waGUuZGFtZVxcd29ya3NwYWNlLXRvcHRhbFxcZmFidWxleGllXFxmYWJ1bGV4aWUtd2ViXFxzcmNcXG1haW5cXGZyb250ZW5kL3NyY1xcYXBwXFxhdXRoXFx3ZWxjb21lXFx3ZWxjb21lLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWlGQTtFQUNFLFdBQUE7RUFDQSx5QkFBQTtFQUNBLHFCQUFBO0FDaEZGOztBQ0ZBO0VBQ0Msc0NBQUE7RUFDQSxvQkFBQTtFQUNBLDRCQUFBO0VBQ0EsMEJBQUE7RUFDRywwQkFBQTtBREtKOztBQ0ZBO0VBQ0ksWUFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSxtQkZHTztFRUZQLFNBQUE7RUFFQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw4Q0FBQTtFQUVBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSxPQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsUUFBQTtFQUNBLFdBQUE7QURLSiIsImZpbGUiOiJzcmMvYXBwL2F1dGgvd2VsY29tZS93ZWxjb21lLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiRwcmltYXJ5OiAgICAgICAjNGU3M2RmICFkZWZhdWx0O1xyXG4kc2Vjb25kYXJ5OiAgICAgIzJjM2U1MCAhZGVmYXVsdDtcclxuLy8gT3ZlcnJpZGUgQm9vdHN0cmFwIGRlZmF1bHQgdmFyaWFibGVzIGhlcmVcclxuLy8gRG8gbm90IGVkaXQgYW55IG9mIHRoZSBmaWxlcyBpbiAvdmVuZG9yL2Jvb3RzdHJhcC9zY3NzLyFcclxuXHJcbi8vIENvbG9yIFZhcmlhYmxlc1xyXG4vLyBCb290c3RyYXAgQ29sb3IgT3ZlcnJpZGVzXHJcblxyXG4kd2hpdGU6ICNmZmYgIWRlZmF1bHQ7XHJcbiRncmF5LTEwMDogI2Y4ZjlmYyAhZGVmYXVsdDtcclxuJGdyYXktMjAwOiAjZWFlY2Y0ICFkZWZhdWx0O1xyXG4kZ3JheS0zMDA6ICNkZGRmZWIgIWRlZmF1bHQ7XHJcbiRncmF5LTQwMDogI2QxZDNlMiAhZGVmYXVsdDtcclxuJGdyYXktNTAwOiAjYjdiOWNjICFkZWZhdWx0O1xyXG4kZ3JheS02MDA6ICM4NTg3OTYgIWRlZmF1bHQ7XHJcbiRncmF5LTcwMDogIzZlNzA3ZSAhZGVmYXVsdDtcclxuJGdyYXktODAwOiAjNWE1YzY5ICFkZWZhdWx0O1xyXG4kZ3JheS05MDA6ICMzYTNiNDUgIWRlZmF1bHQ7XHJcbiRibGFjazogIzAwMCAhZGVmYXVsdDtcclxuXHJcbiRibHVlOiAjNGU3M2RmICFkZWZhdWx0O1xyXG4kaW5kaWdvOiAjNjYxMGYyICFkZWZhdWx0O1xyXG4kcHVycGxlOiAjNmY0MmMxICFkZWZhdWx0O1xyXG4kcGluazogI2U4M2U4YyAhZGVmYXVsdDtcclxuJHJlZDogI2U3NGEzYiAhZGVmYXVsdDtcclxuJG9yYW5nZTogI2ZkN2UxNCAhZGVmYXVsdDtcclxuJHllbGxvdzogI2Y2YzIzZSAhZGVmYXVsdDtcclxuJGdyZWVuOiAjMWNjODhhICFkZWZhdWx0O1xyXG4kdGVhbDogIzIwYzlhNiAhZGVmYXVsdDtcclxuJGN5YW46ICMzNmI5Y2MgIWRlZmF1bHQ7XHJcblxyXG4vLyBDdXN0b20gQ29sb3JzXHJcbiRicmFuZC1nb29nbGU6ICNlYTQzMzU7XHJcbiRicmFuZC1mYWNlYm9vazogIzNiNTk5ODtcclxuXHJcbi8vIFNldCBDb250cmFzdCBUaHJlc2hvbGRcclxuJHlpcS1jb250cmFzdGVkLXRocmVzaG9sZDogMTk1ICFkZWZhdWx0O1xyXG5cclxuLy8gVHlwb2dyYXBoeVxyXG4kYm9keS1jb2xvcjogJGdyYXktNjAwICFkZWZhdWx0O1xyXG5cclxuJGZvbnQtZmFtaWx5LXNhbnMtc2VyaWY6IFwiTnVuaXRvXCIsIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgXCJTZWdvZSBVSVwiLCBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgQXJpYWwsIHNhbnMtc2VyaWYsIFwiQXBwbGUgQ29sb3IgRW1vamlcIiwgXCJTZWdvZSBVSSBFbW9qaVwiLCBcIlNlZ29lIFVJIFN5bWJvbFwiLCAnTm90byBDb2xvciBFbW9qaScgIWRlZmF1bHQ7XHJcblxyXG4kZm9udC13ZWlnaHQtbGlnaHQ6IDMwMCAhZGVmYXVsdDtcclxuLy8gJGZvbnQtd2VpZ2h0LWJhc2U6IDQwMDtcclxuJGhlYWRpbmdzLWZvbnQtd2VpZ2h0OiA0MDAgIWRlZmF1bHQ7XHJcblxyXG4vLyBTaGFkb3dzXHJcbiRib3gtc2hhZG93LXNtOiAwIDAuMTI1cmVtIDAuMjVyZW0gMCByZ2JhKCRncmF5LTkwMCwgLjIpICFkZWZhdWx0O1xyXG4kYm94LXNoYWRvdzogMCAwLjE1cmVtIDEuNzVyZW0gMCByZ2JhKCRncmF5LTkwMCwgLjE1KSAhZGVmYXVsdDtcclxuLy8gJGJveC1zaGFkb3ctbGc6IDAgMXJlbSAzcmVtIHJnYmEoJGJsYWNrLCAuMTc1KSAhZGVmYXVsdDtcclxuXHJcbi8vIEJvcmRlcnMgUmFkaXVzXHJcbiRib3JkZXItcmFkaXVzOiAwLjM1cmVtICFkZWZhdWx0O1xyXG4kYm9yZGVyLWNvbG9yOiBkYXJrZW4oJGdyYXktMjAwLCAyJSk7XHJcblxyXG4vLyBTcGFjaW5nIFZhcmlhYmxlc1xyXG4vLyBDaGFuZ2UgYmVsb3cgdmFyaWFibGUgaWYgdGhlIGhlaWdodCBvZiB0aGUgbmF2YmFyIGNoYW5nZXNcclxuJHRvcGJhci1iYXNlLWhlaWdodDogNC4zNzVyZW07XHJcbi8vIENoYW5nZSBiZWxvdyB2YXJpYWJsZSB0byBjaGFuZ2UgdGhlIHdpZHRoIG9mIHRoZSBzaWRlbmF2XHJcbiRzaWRlYmFyLWJhc2Utd2lkdGg6IDE0cmVtO1xyXG4vLyBDaGFuZ2UgYmVsb3cgdmFyaWFibGUgdG8gY2hhbmdlIHRoZSB3aWR0aCBvZiB0aGUgc2lkZW5hdiB3aGVuIGNvbGxhcHNlZFxyXG4kc2lkZWJhci1jb2xsYXBzZWQtd2lkdGg6IDYuNXJlbTtcclxuXHJcbi8vIENhcmRcclxuJGNhcmQtY2FwLWJnOiAkZ3JheS0xMDA7XHJcbiRjYXJkLWJvcmRlci1jb2xvcjogJGJvcmRlci1jb2xvcjtcclxuXHJcbi8vIEFkanVzdCBjb2x1bW4gc3BhY2luZyBmb3Igc3ltbWV0cnlcclxuJHNwYWNlcjogMXJlbTtcclxuJGdyaWQtZ3V0dGVyLXdpZHRoOiAkc3BhY2VyICogMS41O1xyXG5cclxuLy8gVHJhbnNpdGlvbnNcclxuJHRyYW5zaXRpb24tY29sbGFwc2U6IGhlaWdodCAuMTVzIGVhc2UgIWRlZmF1bHQ7XHJcblxyXG4vLyBEcm9wZG93bnNcclxuJGRyb3Bkb3duLWZvbnQtc2l6ZTogMC44NXJlbTtcclxuJGRyb3Bkb3duLWJvcmRlci1jb2xvcjogJGJvcmRlci1jb2xvcjtcclxuXHJcbi8vYnRuXHJcbmEuYnRuLmJ0bi1wcmltYXJ5Om5vdChbaHJlZl0pIHtcclxuICBjb2xvcjogI2ZmZjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA3YmZmO1xyXG4gIGJvcmRlci1jb2xvcjogIzAwN2JmZjtcclxufVxyXG4iLCJhLmJ0bi5idG4tcHJpbWFyeTpub3QoW2hyZWZdKSB7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA3YmZmO1xuICBib3JkZXItY29sb3I6ICMwMDdiZmY7XG59XG5cbi5iZy1sb2dpbi1pbWFnZSB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCguLi8uLi8uLi9hc3NldHMvaW1nL2ZhYnVsZXhpZS5wbmcpO1xuICBiYWNrZ3JvdW5kLXNpemU6IDUwJTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbi14OiA1MCU7XG4gIGJhY2tncm91bmQtcG9zaXRpb24teTogNTAlO1xufVxuXG4uY29va2llX2Jhbm5lci1tZXNzYWdlIHtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXNpemU6IDE2cHg7XG4gIGxpbmUtaGVpZ2h0OiAyMHB4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBiYWNrZ3JvdW5kOiAjM2EzYjQ1O1xuICBib3R0b206IDA7XG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmb250LWZhbWlseTogUHJveGltYSBOb3ZhLCBBcmlhbCwgXCJzYW5zLXNlcmlmXCI7XG4gIC1tcy1mbGV4LXBhY2s6IGp1c3RpZnk7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgbGVmdDogMDtcbiAgcGFkZGluZzogMzVweCA1MHB4O1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHJpZ2h0OiAwO1xuICB6LWluZGV4OiAxMDtcbn0iLCJAaW1wb3J0ICd2YXJzJztcclxuXHJcbi5iZy1sb2dpbi1pbWFnZSB7XHJcblx0YmFja2dyb3VuZC1pbWFnZTogdXJsKC4uLy4uLy4uL2Fzc2V0cy9pbWcvZmFidWxleGllLnBuZyk7XHJcblx0YmFja2dyb3VuZC1zaXplOiA1MCU7XHJcblx0YmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuXHRiYWNrZ3JvdW5kLXBvc2l0aW9uLXg6IDUwJTtcclxuICAgIGJhY2tncm91bmQtcG9zaXRpb24teTogNTAlO1xyXG59XHJcblxyXG4uY29va2llX2Jhbm5lci1tZXNzYWdlIHtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGJhY2tncm91bmQ6ICRncmF5LTkwMDtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZvbnQtZmFtaWx5OiBQcm94aW1hIE5vdmEsQXJpYWwsXCJzYW5zLXNlcmlmXCI7XHJcbiAgICAtbXMtZmxleC1wYWNrOiBqdXN0aWZ5O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgbGVmdDogMDtcclxuICAgIHBhZGRpbmc6IDM1cHggNTBweDtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIHJpZ2h0OiAwO1xyXG4gICAgei1pbmRleDogMTA7XHJcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/auth/welcome/welcome.component.ts":
  /*!***************************************************!*\
    !*** ./src/app/auth/welcome/welcome.component.ts ***!
    \***************************************************/

  /*! exports provided: WelcomeComponent */

  /***/
  function srcAppAuthWelcomeWelcomeComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "WelcomeComponent", function () {
      return WelcomeComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _service_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../service/auth.service */
    "./src/app/service/auth.service.ts");

    var WelcomeComponent =
    /*#__PURE__*/
    function () {
      function WelcomeComponent(authService, route) {
        var _this6 = this;

        _classCallCheck(this, WelcomeComponent);

        this.authService = authService;
        this.route = route;
        this.route.queryParams.subscribe(function (params) {
          var email = params['pwdchange'];

          if (email) {
            _this6.authService.state = 'forgotPwd';
          }

          email = params['invitation'];

          if (email) {
            _this6.authService.state = 'register';
          }
        });
        this.login = {};
      }

      _createClass(WelcomeComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }, {
        key: "changeState",
        value: function changeState(state) {
          this.authService.state = state;
        }
      }]);

      return WelcomeComponent;
    }();

    WelcomeComponent.ctorParameters = function () {
      return [{
        type: _service_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]
      }];
    };

    WelcomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-welcome',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./welcome.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/auth/welcome/welcome.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./welcome.component.scss */
      "./src/app/auth/welcome/welcome.component.scss")).default]
    })], WelcomeComponent);
    /***/
  },

  /***/
  "./src/app/config/config.component.scss":
  /*!**********************************************!*\
    !*** ./src/app/config/config.component.scss ***!
    \**********************************************/

  /*! exports provided: default */

  /***/
  function srcAppConfigConfigComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbmZpZy9jb25maWcuY29tcG9uZW50LnNjc3MifQ== */";
    /***/
  },

  /***/
  "./src/app/config/config.component.ts":
  /*!********************************************!*\
    !*** ./src/app/config/config.component.ts ***!
    \********************************************/

  /*! exports provided: ConfigComponent */

  /***/
  function srcAppConfigConfigComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ConfigComponent", function () {
      return ConfigComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _service_social_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../service/social.service */
    "./src/app/service/social.service.ts");

    var ConfigComponent =
    /*#__PURE__*/
    function () {
      function ConfigComponent(socialService) {
        _classCallCheck(this, ConfigComponent);

        this.socialService = socialService;
      }

      _createClass(ConfigComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this7 = this;

          this.socialService.getConfig().subscribe(function (data) {
            _this7.config = data;
          });
        }
      }, {
        key: "updateConfig",
        value: function updateConfig() {
          var _this8 = this;

          this.socialService.patchConfig(this.config).subscribe(function (data) {
            _this8.config = data;
            _this8.info = 'Configuration updated. You have to refresh your browser to take it into account.';
          });
        }
      }]);

      return ConfigComponent;
    }();

    ConfigComponent.ctorParameters = function () {
      return [{
        type: _service_social_service__WEBPACK_IMPORTED_MODULE_2__["SocialService"]
      }];
    };

    ConfigComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-config',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./config.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/config/config.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./config.component.scss */
      "./src/app/config/config.component.scss")).default]
    })], ConfigComponent);
    /***/
  },

  /***/
  "./src/app/email-validator.directive.ts":
  /*!**********************************************!*\
    !*** ./src/app/email-validator.directive.ts ***!
    \**********************************************/

  /*! exports provided: EmailValidator */

  /***/
  function srcAppEmailValidatorDirectiveTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "EmailValidator", function () {
      return EmailValidator;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");

    var EmailValidator_1;

    var EmailValidator = EmailValidator_1 =
    /*#__PURE__*/
    function () {
      function EmailValidator() {
        _classCallCheck(this, EmailValidator);
      }

      _createClass(EmailValidator, [{
        key: "validate",
        value: function validate(control) {
          var email = control.value;

          if (email) {
            if (email.indexOf("@") < 0) {
              return {
                mauvaisFormat: true
              };
            }

            var _email$split = email.split("@"),
                _email$split2 = _slicedToArray(_email$split, 2),
                user = _email$split2[0],
                domain = _email$split2[1];

            if (user.length < 2 || domain.length < 4 || domain.indexOf(".") < 0) {
              return {
                mauvaisFormat: true
              };
            }

            var _domain$split = domain.split("."),
                _domain$split2 = _slicedToArray(_domain$split, 2),
                nom = _domain$split2[0],
                ext = _domain$split2[1];

            if (nom.length < 2 || ext.length < 2) {
              return {
                mauvaisFormat: true
              };
            }
          }

          return null;
        }
      }]);

      return EmailValidator;
    }();

    EmailValidator = EmailValidator_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
      selector: '[emailValidator][ngModel]',
      providers: [{
        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
        useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
          return EmailValidator_1;
        }),
        multi: true
      }]
    })], EmailValidator);
    /***/
  },

  /***/
  "./src/app/interceptors/httpDateInterceptor.ts":
  /*!*****************************************************!*\
    !*** ./src/app/interceptors/httpDateInterceptor.ts ***!
    \*****************************************************/

  /*! exports provided: HttpDateInterceptor */

  /***/
  function srcAppInterceptorsHttpDateInterceptorTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "HttpDateInterceptor", function () {
      return HttpDateInterceptor;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");

    var HttpDateInterceptor =
    /*#__PURE__*/
    function () {
      function HttpDateInterceptor() {
        _classCallCheck(this, HttpDateInterceptor);

        this._isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?Z$/;
      }

      _createClass(HttpDateInterceptor, [{
        key: "intercept",
        value: function intercept(req, next) {
          var _this9 = this;

          return next.handle(req).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (val) {
            if (val instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpResponse"]) {
              var body = val.body;

              _this9.convert(body);
            }

            return val;
          }));
        }
      }, {
        key: "isIsoDateString",
        value: function isIsoDateString(value) {
          if (value === null || value === undefined) {
            return false;
          }

          if (typeof value === 'string') {
            return this._isoDateFormat.test(value);
          }

          return false;
        }
      }, {
        key: "convert",
        value: function convert(body) {
          if (body === null || body === undefined) {
            return body;
          }

          if (typeof body !== 'object') {
            return body;
          }

          for (var _i2 = 0, _Object$keys = Object.keys(body); _i2 < _Object$keys.length; _i2++) {
            var key = _Object$keys[_i2];
            var value = body[key];

            if (this.isIsoDateString(value)) {
              body[key] = new Date(value);
            } else if (typeof value === 'object') {
              this.convert(value);
            }
          }
        }
      }]);

      return HttpDateInterceptor;
    }();
    /***/

  },

  /***/
  "./src/app/layout/footer/footer.component.scss":
  /*!*****************************************************!*\
    !*** ./src/app/layout/footer/footer.component.scss ***!
    \*****************************************************/

  /*! exports provided: default */

  /***/
  function srcAppLayoutFooterFooterComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".scroll-to-top {\n  position: fixed;\n  right: 1rem;\n  bottom: 1rem;\n  display: none;\n  width: 2.75rem;\n  height: 2.75rem;\n  text-align: center;\n  color: #fff;\n  background: rgba(90, 92, 105, 0.5);\n  line-height: 46px;\n}\n\nfooter.sticky-footer {\n  padding: 2rem 0;\n  flex-shrink: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2Zvb3Rlci9DOlxcVXNlcnNcXGNocmlzdG9waGUuZGFtZVxcd29ya3NwYWNlLXRvcHRhbFxcZmFidWxleGllXFxmYWJ1bGV4aWUtd2ViXFxzcmNcXG1haW5cXGZyb250ZW5kL3NyY1xcYXBwXFxsYXlvdXRcXGZvb3RlclxcZm9vdGVyLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9sYXlvdXQvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGtDQUFBO0VBQ0EsaUJBQUE7QUNDSjs7QURHQTtFQUNDLGVBQUE7RUFDQSxjQUFBO0FDQUQiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zY3JvbGwtdG8tdG9wIHtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIHJpZ2h0OiAxcmVtO1xyXG4gICAgYm90dG9tOiAxcmVtO1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICAgIHdpZHRoOiAyLjc1cmVtO1xyXG4gICAgaGVpZ2h0OiAyLjc1cmVtO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDkwLDkyLDEwNSwuNSk7XHJcbiAgICBsaW5lLWhlaWdodDogNDZweDtcclxufVxyXG5cclxuXHRcclxuZm9vdGVyLnN0aWNreS1mb290ZXIge1xyXG5cdHBhZGRpbmc6IDJyZW0gMDtcclxuXHRmbGV4LXNocmluazogMDtcclxufSIsIi5zY3JvbGwtdG8tdG9wIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICByaWdodDogMXJlbTtcbiAgYm90dG9tOiAxcmVtO1xuICBkaXNwbGF5OiBub25lO1xuICB3aWR0aDogMi43NXJlbTtcbiAgaGVpZ2h0OiAyLjc1cmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kOiByZ2JhKDkwLCA5MiwgMTA1LCAwLjUpO1xuICBsaW5lLWhlaWdodDogNDZweDtcbn1cblxuZm9vdGVyLnN0aWNreS1mb290ZXIge1xuICBwYWRkaW5nOiAycmVtIDA7XG4gIGZsZXgtc2hyaW5rOiAwO1xufSJdfQ== */";
    /***/
  },

  /***/
  "./src/app/layout/footer/footer.component.ts":
  /*!***************************************************!*\
    !*** ./src/app/layout/footer/footer.component.ts ***!
    \***************************************************/

  /*! exports provided: FooterComponent */

  /***/
  function srcAppLayoutFooterFooterComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "FooterComponent", function () {
      return FooterComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var FooterComponent =
    /*#__PURE__*/
    function () {
      function FooterComponent() {
        _classCallCheck(this, FooterComponent);

        this.topPosToStartShowing = 100;
      }

      _createClass(FooterComponent, [{
        key: "checkScroll",
        value: function checkScroll() {
          // window의 scroll top
          // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.
          var scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

          if (scrollPosition >= this.topPosToStartShowing) {
            this.isShow = true;
          } else {
            this.isShow = false;
          }
        }
      }, {
        key: "scrollTop",
        value: function scrollTop() {
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }
      }, {
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);

      return FooterComponent;
    }();

    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('window:scroll')], FooterComponent.prototype, "checkScroll", null);
    FooterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-footer',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./footer.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/layout/footer/footer.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./footer.component.scss */
      "./src/app/layout/footer/footer.component.scss")).default]
    })], FooterComponent);
    /***/
  },

  /***/
  "./src/app/layout/main/main.component.scss":
  /*!*************************************************!*\
    !*** ./src/app/layout/main/main.component.scss ***!
    \*************************************************/

  /*! exports provided: default */

  /***/
  function srcAppLayoutMainMainComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "a.btn.btn-primary:not([href]) {\n  color: #fff;\n  background-color: #007bff;\n  border-color: #007bff;\n}\n\n#wrapper {\n  display: -webkit-box;\n  display: flex;\n}\n\n#wrapper #content-wrapper {\n  background-color: #f8f9fc;\n  width: 100%;\n  overflow-x: hidden;\n}\n\n#wrapper #content-wrapper #content {\n  min-height: calc(100% - 90px);\n}\n\n.icon-profile {\n  color: #4e73df;\n  zoom: 2;\n}\n\nimg.icon-profile {\n  border-radius: 50%;\n  border: 1px solid;\n  width: 17px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L21haW4vQzpcXFVzZXJzXFxjaHJpc3RvcGhlLmRhbWVcXHdvcmtzcGFjZS10b3B0YWxcXGZhYnVsZXhpZVxcZmFidWxleGllLXdlYlxcc3JjXFxtYWluXFxmcm9udGVuZC9zcmNcXGFzc2V0c1xcY3NzXFxfdmFycy5zY3NzIiwic3JjL2FwcC9sYXlvdXQvbWFpbi9tYWluLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9sYXlvdXQvbWFpbi9DOlxcVXNlcnNcXGNocmlzdG9waGUuZGFtZVxcd29ya3NwYWNlLXRvcHRhbFxcZmFidWxleGllXFxmYWJ1bGV4aWUtd2ViXFxzcmNcXG1haW5cXGZyb250ZW5kL3NyY1xcYXBwXFxsYXlvdXRcXG1haW5cXG1haW4uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUZBO0VBQ0UsV0FBQTtFQUNBLHlCQUFBO0VBQ0EscUJBQUE7QUNoRkY7O0FDRkE7RUFDQyxvQkFBQTtFQUFBLGFBQUE7QURLRDs7QUNIQztFQUNDLHlCQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0FES0Y7O0FDSEU7RUFDQyw2QkFBQTtBREtIOztBQ0FBO0VBQ0MsY0ZoQmU7RUVpQmYsT0FBQTtBREdEOztBQ0FBO0VBQ0ksa0JBQUE7RUFDQSxpQkFBQTtFQUNBLFdBQUE7QURHSiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9tYWluL21haW4uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuJHByaW1hcnk6ICAgICAgICM0ZTczZGYgIWRlZmF1bHQ7XHJcbiRzZWNvbmRhcnk6ICAgICAjMmMzZTUwICFkZWZhdWx0O1xyXG4vLyBPdmVycmlkZSBCb290c3RyYXAgZGVmYXVsdCB2YXJpYWJsZXMgaGVyZVxyXG4vLyBEbyBub3QgZWRpdCBhbnkgb2YgdGhlIGZpbGVzIGluIC92ZW5kb3IvYm9vdHN0cmFwL3Njc3MvIVxyXG5cclxuLy8gQ29sb3IgVmFyaWFibGVzXHJcbi8vIEJvb3RzdHJhcCBDb2xvciBPdmVycmlkZXNcclxuXHJcbiR3aGl0ZTogI2ZmZiAhZGVmYXVsdDtcclxuJGdyYXktMTAwOiAjZjhmOWZjICFkZWZhdWx0O1xyXG4kZ3JheS0yMDA6ICNlYWVjZjQgIWRlZmF1bHQ7XHJcbiRncmF5LTMwMDogI2RkZGZlYiAhZGVmYXVsdDtcclxuJGdyYXktNDAwOiAjZDFkM2UyICFkZWZhdWx0O1xyXG4kZ3JheS01MDA6ICNiN2I5Y2MgIWRlZmF1bHQ7XHJcbiRncmF5LTYwMDogIzg1ODc5NiAhZGVmYXVsdDtcclxuJGdyYXktNzAwOiAjNmU3MDdlICFkZWZhdWx0O1xyXG4kZ3JheS04MDA6ICM1YTVjNjkgIWRlZmF1bHQ7XHJcbiRncmF5LTkwMDogIzNhM2I0NSAhZGVmYXVsdDtcclxuJGJsYWNrOiAjMDAwICFkZWZhdWx0O1xyXG5cclxuJGJsdWU6ICM0ZTczZGYgIWRlZmF1bHQ7XHJcbiRpbmRpZ286ICM2NjEwZjIgIWRlZmF1bHQ7XHJcbiRwdXJwbGU6ICM2ZjQyYzEgIWRlZmF1bHQ7XHJcbiRwaW5rOiAjZTgzZThjICFkZWZhdWx0O1xyXG4kcmVkOiAjZTc0YTNiICFkZWZhdWx0O1xyXG4kb3JhbmdlOiAjZmQ3ZTE0ICFkZWZhdWx0O1xyXG4keWVsbG93OiAjZjZjMjNlICFkZWZhdWx0O1xyXG4kZ3JlZW46ICMxY2M4OGEgIWRlZmF1bHQ7XHJcbiR0ZWFsOiAjMjBjOWE2ICFkZWZhdWx0O1xyXG4kY3lhbjogIzM2YjljYyAhZGVmYXVsdDtcclxuXHJcbi8vIEN1c3RvbSBDb2xvcnNcclxuJGJyYW5kLWdvb2dsZTogI2VhNDMzNTtcclxuJGJyYW5kLWZhY2Vib29rOiAjM2I1OTk4O1xyXG5cclxuLy8gU2V0IENvbnRyYXN0IFRocmVzaG9sZFxyXG4keWlxLWNvbnRyYXN0ZWQtdGhyZXNob2xkOiAxOTUgIWRlZmF1bHQ7XHJcblxyXG4vLyBUeXBvZ3JhcGh5XHJcbiRib2R5LWNvbG9yOiAkZ3JheS02MDAgIWRlZmF1bHQ7XHJcblxyXG4kZm9udC1mYW1pbHktc2Fucy1zZXJpZjogXCJOdW5pdG9cIiwgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBcIlNlZ29lIFVJXCIsIFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBBcmlhbCwgc2Fucy1zZXJpZiwgXCJBcHBsZSBDb2xvciBFbW9qaVwiLCBcIlNlZ29lIFVJIEVtb2ppXCIsIFwiU2Vnb2UgVUkgU3ltYm9sXCIsICdOb3RvIENvbG9yIEVtb2ppJyAhZGVmYXVsdDtcclxuXHJcbiRmb250LXdlaWdodC1saWdodDogMzAwICFkZWZhdWx0O1xyXG4vLyAkZm9udC13ZWlnaHQtYmFzZTogNDAwO1xyXG4kaGVhZGluZ3MtZm9udC13ZWlnaHQ6IDQwMCAhZGVmYXVsdDtcclxuXHJcbi8vIFNoYWRvd3NcclxuJGJveC1zaGFkb3ctc206IDAgMC4xMjVyZW0gMC4yNXJlbSAwIHJnYmEoJGdyYXktOTAwLCAuMikgIWRlZmF1bHQ7XHJcbiRib3gtc2hhZG93OiAwIDAuMTVyZW0gMS43NXJlbSAwIHJnYmEoJGdyYXktOTAwLCAuMTUpICFkZWZhdWx0O1xyXG4vLyAkYm94LXNoYWRvdy1sZzogMCAxcmVtIDNyZW0gcmdiYSgkYmxhY2ssIC4xNzUpICFkZWZhdWx0O1xyXG5cclxuLy8gQm9yZGVycyBSYWRpdXNcclxuJGJvcmRlci1yYWRpdXM6IDAuMzVyZW0gIWRlZmF1bHQ7XHJcbiRib3JkZXItY29sb3I6IGRhcmtlbigkZ3JheS0yMDAsIDIlKTtcclxuXHJcbi8vIFNwYWNpbmcgVmFyaWFibGVzXHJcbi8vIENoYW5nZSBiZWxvdyB2YXJpYWJsZSBpZiB0aGUgaGVpZ2h0IG9mIHRoZSBuYXZiYXIgY2hhbmdlc1xyXG4kdG9wYmFyLWJhc2UtaGVpZ2h0OiA0LjM3NXJlbTtcclxuLy8gQ2hhbmdlIGJlbG93IHZhcmlhYmxlIHRvIGNoYW5nZSB0aGUgd2lkdGggb2YgdGhlIHNpZGVuYXZcclxuJHNpZGViYXItYmFzZS13aWR0aDogMTRyZW07XHJcbi8vIENoYW5nZSBiZWxvdyB2YXJpYWJsZSB0byBjaGFuZ2UgdGhlIHdpZHRoIG9mIHRoZSBzaWRlbmF2IHdoZW4gY29sbGFwc2VkXHJcbiRzaWRlYmFyLWNvbGxhcHNlZC13aWR0aDogNi41cmVtO1xyXG5cclxuLy8gQ2FyZFxyXG4kY2FyZC1jYXAtYmc6ICRncmF5LTEwMDtcclxuJGNhcmQtYm9yZGVyLWNvbG9yOiAkYm9yZGVyLWNvbG9yO1xyXG5cclxuLy8gQWRqdXN0IGNvbHVtbiBzcGFjaW5nIGZvciBzeW1tZXRyeVxyXG4kc3BhY2VyOiAxcmVtO1xyXG4kZ3JpZC1ndXR0ZXItd2lkdGg6ICRzcGFjZXIgKiAxLjU7XHJcblxyXG4vLyBUcmFuc2l0aW9uc1xyXG4kdHJhbnNpdGlvbi1jb2xsYXBzZTogaGVpZ2h0IC4xNXMgZWFzZSAhZGVmYXVsdDtcclxuXHJcbi8vIERyb3Bkb3duc1xyXG4kZHJvcGRvd24tZm9udC1zaXplOiAwLjg1cmVtO1xyXG4kZHJvcGRvd24tYm9yZGVyLWNvbG9yOiAkYm9yZGVyLWNvbG9yO1xyXG5cclxuLy9idG5cclxuYS5idG4uYnRuLXByaW1hcnk6bm90KFtocmVmXSkge1xyXG4gIGNvbG9yOiAjZmZmO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDdiZmY7XHJcbiAgYm9yZGVyLWNvbG9yOiAjMDA3YmZmO1xyXG59XHJcbiIsImEuYnRuLmJ0bi1wcmltYXJ5Om5vdChbaHJlZl0pIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDdiZmY7XG4gIGJvcmRlci1jb2xvcjogIzAwN2JmZjtcbn1cblxuI3dyYXBwZXIge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuI3dyYXBwZXIgI2NvbnRlbnQtd3JhcHBlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmOGY5ZmM7XG4gIHdpZHRoOiAxMDAlO1xuICBvdmVyZmxvdy14OiBoaWRkZW47XG59XG4jd3JhcHBlciAjY29udGVudC13cmFwcGVyICNjb250ZW50IHtcbiAgbWluLWhlaWdodDogY2FsYygxMDAlIC0gOTBweCk7XG59XG5cbi5pY29uLXByb2ZpbGUge1xuICBjb2xvcjogIzRlNzNkZjtcbiAgem9vbTogMjtcbn1cblxuaW1nLmljb24tcHJvZmlsZSB7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYm9yZGVyOiAxcHggc29saWQ7XG4gIHdpZHRoOiAxN3B4O1xufSIsIkBpbXBvcnQgJ3ZhcnMnO1xyXG5cclxuI3dyYXBwZXIge1xyXG5cdGRpc3BsYXk6ZmxleDtcclxuXHJcblx0I2NvbnRlbnQtd3JhcHBlciB7XHJcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOWZjO1xyXG5cdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRvdmVyZmxvdy14OiBoaWRkZW47XHJcblx0XHRcclxuXHRcdCNjb250ZW50IHtcclxuXHRcdFx0bWluLWhlaWdodDogY2FsYygxMDAlIC0gOTBweCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG4uaWNvbi1wcm9maWxlIHtcclxuXHRjb2xvcjogJHByaW1hcnk7XHJcblx0em9vbTogMjtcclxufVxyXG5cclxuaW1nLmljb24tcHJvZmlsZSB7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZDtcclxuICAgIHdpZHRoOiAxN3B4O1xyXG59Il19 */";
    /***/
  },

  /***/
  "./src/app/layout/main/main.component.ts":
  /*!***********************************************!*\
    !*** ./src/app/layout/main/main.component.ts ***!
    \***********************************************/

  /*! exports provided: MainComponent */

  /***/
  function srcAppLayoutMainMainComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MainComponent", function () {
      return MainComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _service_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../service/auth.service */
    "./src/app/service/auth.service.ts");
    /* harmony import */


    var angularx_social_login__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! angularx-social-login */
    "./node_modules/angularx-social-login/angularx-social-login.js");

    var MainComponent =
    /*#__PURE__*/
    function () {
      function MainComponent(router, authService, socialAuthService) {
        _classCallCheck(this, MainComponent);

        this.router = router;
        this.authService = authService;
        this.socialAuthService = socialAuthService;
        this.title = 'Fabulexie';
        this.sideBarClass = '';
      }

      _createClass(MainComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          if (this.router.url === '/') {
            this.router.navigate(['/properties']);
          }
        }
      }, {
        key: "toggle",
        value: function toggle() {
          if (this.sideBarClass === '') {
            this.sideBarClass = 'toggled';
          } else {
            this.sideBarClass = '';
          }
        }
      }, {
        key: "logout",
        value: function logout() {
          if (this.authService.user.loginSource != 'standard') {
            this.socialAuthService.signOut();
          }

          this.authService.logout();
        }
      }]);

      return MainComponent;
    }();

    MainComponent.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }, {
        type: _service_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]
      }, {
        type: angularx_social_login__WEBPACK_IMPORTED_MODULE_4__["AuthService"]
      }];
    };

    MainComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-main',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./main.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/layout/main/main.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./main.component.scss */
      "./src/app/layout/main/main.component.scss")).default]
    })], MainComponent);
    /***/
  },

  /***/
  "./src/app/me/my-profile/my-profile.component.scss":
  /*!*********************************************************!*\
    !*** ./src/app/me/my-profile/my-profile.component.scss ***!
    \*********************************************************/

  /*! exports provided: default */

  /***/
  function srcAppMeMyProfileMyProfileComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "img.photo {\n  max-width: 100%;\n  max-height: 250px;\n}\n\ndiv.preview a.btn {\n  position: absolute;\n  top: 3px;\n  left: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWUvbXktcHJvZmlsZS9DOlxcVXNlcnNcXGNocmlzdG9waGUuZGFtZVxcd29ya3NwYWNlLXRvcHRhbFxcZmFidWxleGllXFxmYWJ1bGV4aWUtd2ViXFxzcmNcXG1haW5cXGZyb250ZW5kL3NyY1xcYXBwXFxtZVxcbXktcHJvZmlsZVxcbXktcHJvZmlsZS5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvbWUvbXktcHJvZmlsZS9teS1wcm9maWxlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtFQUNBLGlCQUFBO0FDQ0o7O0FERUE7RUFDQyxrQkFBQTtFQUNBLFFBQUE7RUFDQSxVQUFBO0FDQ0QiLCJmaWxlIjoic3JjL2FwcC9tZS9teS1wcm9maWxlL215LXByb2ZpbGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpbWcucGhvdG8ge1xyXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgbWF4LWhlaWdodDogMjUwcHg7XHJcbn1cclxuXHJcbmRpdi5wcmV2aWV3IGEuYnRuIHtcclxuXHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0dG9wOiAzcHg7XHJcblx0bGVmdDogMTVweDtcclxufSIsImltZy5waG90byB7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgbWF4LWhlaWdodDogMjUwcHg7XG59XG5cbmRpdi5wcmV2aWV3IGEuYnRuIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDNweDtcbiAgbGVmdDogMTVweDtcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/me/my-profile/my-profile.component.ts":
  /*!*******************************************************!*\
    !*** ./src/app/me/my-profile/my-profile.component.ts ***!
    \*******************************************************/

  /*! exports provided: MyProfileComponent */

  /***/
  function srcAppMeMyProfileMyProfileComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MyProfileComponent", function () {
      return MyProfileComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _service_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../service/auth.service */
    "./src/app/service/auth.service.ts");
    /* harmony import */


    var _service_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../service/user.service */
    "./src/app/service/user.service.ts");
    /* harmony import */


    var _model_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../model/user */
    "./src/app/model/user.ts");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../../../environments/environment */
    "./src/environments/environment.ts");
    /* harmony import */


    var ng2_file_upload__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ng2-file-upload */
    "./node_modules/ng2-file-upload/fesm2015/ng2-file-upload.js");

    var MyProfileComponent =
    /*#__PURE__*/
    function () {
      function MyProfileComponent(authService, userService, sanitizer) {
        _classCallCheck(this, MyProfileComponent);

        this.authService = authService;
        this.userService = userService;
        this.sanitizer = sanitizer;
        this.globalError = '';
        this.globalInfo = '';
      }

      _createClass(MyProfileComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.authService.info = '';
          this.authService.error = '';
          this.buildUploader(this.authService.user.id);
        }
      }, {
        key: "onSubmit",
        value: function onSubmit() {
          var _this10 = this;

          var user = new _model_user__WEBPACK_IMPORTED_MODULE_4__["User"]();
          user.id = this.authService.user.id;
          user.firstname = this.authService.user.firstname;
          user.lastname = this.authService.user.lastname;

          if (this.changePwd == true) {
            user.password = this.password;
          }

          this.userService.patch(user).subscribe(function (data) {
            _this10.globalInfo = 'Update done';
          });
        }
      }, {
        key: "buildUploader",
        value: function buildUploader(id) {
          var _this11 = this;

          this.uploader = new ng2_file_upload__WEBPACK_IMPORTED_MODULE_7__["FileUploader"]({
            url: _environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].settings.backend + '/users/' + id + '/photo',
            allowedMimeType: ['image/png', 'image/jpeg'],
            disableMultipart: true
          });
          var authHeader = [{
            name: 'Authorization',
            value: this.authService.user.token
          }];
          var uploadOptions = {
            headers: authHeader,
            isHTML5: true,
            removeAfterUpload: true
          };
          this.uploader.setOptions(uploadOptions);

          this.uploader.onAfterAddingFile = function (item) {
            _this11.fileItem = item;
          };

          this.uploader.onCompleteItem = function (item, response, status, headers) {
            _this11.authService.user.safePhoto = _this11.sanitizer.bypassSecurityTrustUrl(response);
            _this11.fileItem = null;
            _this11.loading = false;
          };

          this.uploader.onErrorItem = function (item, response, status, headers) {
            _this11.globalError = JSON.parse(response)["message"] + '. Retry?';
            _this11.fileItem = null;
            _this11.loading = false;
          };
        }
      }, {
        key: "upload",
        value: function upload() {
          this.loading = true;
          this.fileItem.method = "POST";
          this.fileItem.withCredentials = false;
          this.fileItem.upload();
        }
      }, {
        key: "deleteImg",
        value: function deleteImg() {
          var _this12 = this;

          this.userService.deleteImg(this.authService.user.id).subscribe(function (data) {
            _this12.globalInfo = 'Profile photo deleted';
            _this12.authService.user.photo = null;
          });
        }
      }]);

      return MyProfileComponent;
    }();

    MyProfileComponent.ctorParameters = function () {
      return [{
        type: _service_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]
      }, {
        type: _service_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]
      }, {
        type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["DomSanitizer"]
      }];
    };

    MyProfileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-my-profile',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./my-profile.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/me/my-profile/my-profile.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./my-profile.component.scss */
      "./src/app/me/my-profile/my-profile.component.scss")).default]
    })], MyProfileComponent);
    /***/
  },

  /***/
  "./src/app/model/invitation.ts":
  /*!*************************************!*\
    !*** ./src/app/model/invitation.ts ***!
    \*************************************/

  /*! exports provided: Invitation */

  /***/
  function srcAppModelInvitationTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Invitation", function () {
      return Invitation;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");

    var Invitation = function Invitation() {
      _classCallCheck(this, Invitation);
    };
    /***/

  },

  /***/
  "./src/app/model/user.ts":
  /*!*******************************!*\
    !*** ./src/app/model/user.ts ***!
    \*******************************/

  /*! exports provided: User */

  /***/
  function srcAppModelUserTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "User", function () {
      return User;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");

    var User = function User() {
      _classCallCheck(this, User);
    };
    /***/

  },

  /***/
  "./src/app/positive-validator.directive.ts":
  /*!*************************************************!*\
    !*** ./src/app/positive-validator.directive.ts ***!
    \*************************************************/

  /*! exports provided: PositiveValidator */

  /***/
  function srcAppPositiveValidatorDirectiveTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PositiveValidator", function () {
      return PositiveValidator;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");

    var PositiveValidator_1;

    var PositiveValidator = PositiveValidator_1 =
    /*#__PURE__*/
    function () {
      function PositiveValidator() {
        _classCallCheck(this, PositiveValidator);
      }

      _createClass(PositiveValidator, [{
        key: "validate",
        value: function validate(control) {
          var num = control.value;

          if (num) {
            if (num < 1) {
              return {
                mauvaisFormat: true
              };
            }
          }

          return null;
        }
      }]);

      return PositiveValidator;
    }();

    PositiveValidator = PositiveValidator_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
      selector: '[positiveValidator][ngModel]',
      providers: [{
        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALIDATORS"],
        useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () {
          return PositiveValidator_1;
        }),
        multi: true
      }]
    })], PositiveValidator);
    /***/
  },

  /***/
  "./src/app/service/auth.service.ts":
  /*!*****************************************!*\
    !*** ./src/app/service/auth.service.ts ***!
    \*****************************************/

  /*! exports provided: AuthService */

  /***/
  function srcAppServiceAuthServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AuthService", function () {
      return AuthService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../environments/environment */
    "./src/environments/environment.ts");

    var AuthService =
    /*#__PURE__*/
    function () {
      function AuthService(http, sanitizer) {
        var _this13 = this;

        _classCallCheck(this, AuthService);

        this.http = http;
        this.sanitizer = sanitizer;
        this.state = 'login';
        this.cookiesAccepted = false;
        this.user = null;
        this.initialised = false;
        this.LOCAL_TOKEN_KEY = "authenticationToken";
        this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].settings.backend + '/authentication/initialised').subscribe(function (data) {
          _this13.initialised = data.result;
        }, function (error) {
          _this13.initialised = false;
        });
        var cookiesOk = window.localStorage.getItem("cookiesOk");

        if (cookiesOk) {
          this.cookiesAccepted = true;
        }

        this.buildHeaders();
        this.loginWithToken();
      }

      _createClass(AuthService, [{
        key: "buildHeaders",
        value: function buildHeaders() {
          if (!this.myHttpheaders) {
            this.myHttpheaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded').set('Cache-Control', 'no-cache').set('version', '1.0.a');
            this.myHttpBodyheaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]().set('Content-Type', 'application/json').set('Cache-Control', 'no-cache').set('version', '1.0.a');
          } //return this.myHttpheaders;

        }
      }, {
        key: "acceptCookies",
        value: function acceptCookies() {
          this.cookiesAccepted = true;
          window.localStorage.setItem("cookiesOk", "true");
        }
      }, {
        key: "isAuthenticated",
        value: function isAuthenticated() {
          return this.user != null && this.user.token != null;
        }
      }, {
        key: "updateHeaders",
        value: function updateHeaders() {
          this.myHttpheaders = this.myHttpheaders.set('Authorization', this.user.token);
          this.myHttpBodyheaders = this.myHttpBodyheaders.set('Authorization', this.user.token);
        }
      }, {
        key: "registerInvitation",
        value: function registerInvitation(user, code) {}
      }, {
        key: "register",
        value: function register(user, code) {
          var _this14 = this;

          var registerHeaders = this.myHttpBodyheaders;

          if (code) {
            registerHeaders = this.myHttpBodyheaders.set('code', code);
          }

          this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].settings.backend + '/authentication/register', user, {
            headers: registerHeaders
          }).subscribe(function (data) {
            _this14.user = data;
            _this14.initialised = true;

            if (!data.token) {
              _this14.info = 'Your account is created. We have sent you a verification link to validate your email address.';
            } else {
              _this14.updateHeaders();
            }

            _this14.error = '';
            _this14.state = 'login';
          }, function (error) {
            _this14.error = error.error.message;
            _this14.info = '';
          });
        }
      }, {
        key: "valid",
        value: function valid(email, code) {
          var _this15 = this;

          var body = 'email=' + email + '&code=' + code;
          this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].settings.backend + '/authentication/validUser?' + body, {
            headers: this.myHttpheaders
          }).subscribe(function (data) {
            _this15.user = data;

            _this15.updateHeaders();

            _this15.error = '';
            _this15.info = '';
          }, function (error) {
            _this15.error = error.error.message;
            _this15.info = '';
          });
        }
      }, {
        key: "login",
        value: function login(user) {
          var _this16 = this;

          var body = 'email=' + user.email + '&password=' + user.password;
          var resultat;
          this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].settings.backend + '/authentication/login', body, {
            headers: this.myHttpheaders
          }).subscribe(function (data) {
            _this16.user = data;

            if (data.photo != null) {
              _this16.user.safePhoto = _this16.sanitizer.bypassSecurityTrustUrl(data.photo);
            }

            if (user.remember) {
              window.localStorage.setItem(_this16.LOCAL_TOKEN_KEY, _this16.user.email + ':' + _this16.user.token);
            }

            _this16.updateHeaders();

            _this16.error = '';
            _this16.info = '';
          }, function (error) {
            _this16.error = error.error.message;
            _this16.info = '';
          });
        }
      }, {
        key: "setLogged",
        value: function setLogged(user2) {
          this.user = user2;

          if (user2.photo != null) {
            this.user.safePhoto = this.sanitizer.bypassSecurityTrustUrl(user2.photo);
          }

          this.updateHeaders();
          this.error = '';
          this.info = '';
        }
      }, {
        key: "loginWithToken",
        value: function loginWithToken() {
          var _this17 = this;

          var token = window.localStorage.getItem(this.LOCAL_TOKEN_KEY);

          if (token) {
            var idxSplit = token.indexOf(':');
            var mail = token.substring(0, idxSplit);
            var authToken = token.substring(idxSplit + 1);
            this.myHttpheaders = this.myHttpheaders.set('Authorization', authToken);
            var body = 'email=' + mail;
            this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].settings.backend + "/authentication/loginWithToken", body, {
              headers: this.myHttpheaders
            }).subscribe(function (data) {
              if (data.token != null) {
                _this17.user = data;

                if (data.photo != null) {
                  _this17.user.safePhoto = _this17.sanitizer.bypassSecurityTrustUrl(data.photo);
                }

                window.localStorage.setItem(_this17.LOCAL_TOKEN_KEY, _this17.user.email + ':' + _this17.user.token);

                _this17.updateHeaders();

                _this17.error = '';
                _this17.info = '';
              }
            }, function (error) {
              _this17.logout();
            });
          }
        }
      }, {
        key: "newPassword",
        value: function newPassword(email) {
          var _this18 = this;

          var body = 'email=' + email;
          this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].settings.backend + "/authentication/requirePwdChange", body, {
            headers: this.myHttpheaders
          }).subscribe(function (data) {
            if (data.status == 'success') {
              _this18.info = 'We have sent a verification code to ' + email + ' that is necessary to modify your password.';
              _this18.error = '';
            } else {
              _this18.error = 'Your account doesn\'t exist';
              _this18.info = '';
            }
          }, function (error) {
            _this18.error = 'Something went wrong. Please try again later.';
            _this18.info = '';
          });
        }
      }, {
        key: "registerNewPwd",
        value: function registerNewPwd(email, code, pwd) {
          var _this19 = this;

          var body = 'email=' + email + '&securityCode=' + code + '&newPassword=' + pwd + '&uuid=web';
          this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].settings.backend + "/authentication/changePwd", body, {
            headers: this.myHttpheaders
          }).subscribe(function (data) {
            _this19.user = data;

            if (data.photo != null) {
              _this19.user.safePhoto = _this19.sanitizer.bypassSecurityTrustUrl(data.photo);
            }

            _this19.updateHeaders();

            _this19.info = '';
            _this19.error = '';
          }, function (error) {
            _this19.error = error.error.message;
            _this19.info = '';
          });
        }
      }, {
        key: "logout",
        value: function logout() {
          this.user = null;
          this.buildHeaders();
          window.localStorage.removeItem(this.LOCAL_TOKEN_KEY);
        }
      }, {
        key: "isInitialised",
        value: function isInitialised() {
          return this.initialised;
        }
      }, {
        key: "isCookiesAccepted",
        value: function isCookiesAccepted() {
          return this.cookiesAccepted;
        }
      }]);

      return AuthService;
    }();

    AuthService.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]
      }, {
        type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]
      }];
    };

    AuthService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], AuthService);
    /***/
  },

  /***/
  "./src/app/service/invitation.service.ts":
  /*!***********************************************!*\
    !*** ./src/app/service/invitation.service.ts ***!
    \***********************************************/

  /*! exports provided: InvitationService */

  /***/
  function srcAppServiceInvitationServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "InvitationService", function () {
      return InvitationService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../environments/environment */
    "./src/environments/environment.ts");
    /* harmony import */


    var _auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./auth.service */
    "./src/app/service/auth.service.ts");
    /* harmony import */


    var _model_invitation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../model/invitation */
    "./src/app/model/invitation.ts");

    var InvitationService =
    /*#__PURE__*/
    function () {
      function InvitationService(http, authService) {
        _classCallCheck(this, InvitationService);

        this.http = http;
        this.authService = authService;
        this.filter = new _model_invitation__WEBPACK_IMPORTED_MODULE_5__["Invitation"]();
        this.sortColumn = 'id';
        this.sortOrder = 'ASC';
      }

      _createClass(InvitationService, [{
        key: "list",
        value: function list(page, count) {
          var params = "count=" + count + "&page=" + page + "&orderBy=" + this.sortColumn + "&order=" + this.sortOrder + "&" + this.computeQuery();
          return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].settings.backend + '/invitations?' + params, {
            headers: this.authService.myHttpheaders
          });
        }
      }, {
        key: "create",
        value: function create(invitation) {
          return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].settings.backend + '/invitations', invitation, {
            headers: this.authService.myHttpBodyheaders
          });
        }
      }, {
        key: "tutor",
        value: function tutor(invitation) {
          var invit = new _model_invitation__WEBPACK_IMPORTED_MODULE_5__["Invitation"]();
          invit.id = invitation.id;
          invit.tutor = !invitation.tutor;
          return this.patch(invit);
        }
      }, {
        key: "admin",
        value: function admin(invitation) {
          var invit = new _model_invitation__WEBPACK_IMPORTED_MODULE_5__["Invitation"]();
          invit.id = invitation.id;
          invit.admin = !invitation.admin;
          return this.patch(invit);
        }
      }, {
        key: "patch",
        value: function patch(invitation) {
          return this.http.patch(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].settings.backend + '/invitations/' + invitation.id, invitation, {
            headers: this.authService.myHttpBodyheaders
          });
        }
      }, {
        key: "delete",
        value: function _delete(id) {
          return this.http.delete(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].settings.backend + '/invitations/' + id, {
            headers: this.authService.myHttpheaders
          });
        }
      }, {
        key: "computeQuery",
        value: function computeQuery() {
          var init = false;
          var query = '';

          for (var prop in this.filter) {
            var val = this.filter[prop];

            if (val && val != '') {
              if (init) {
                query += ' AND ';
              }

              query += prop + ':"' + this.filter[prop] + '"';
              init = true;
            }
          }

          if (init) {
            query = 'q=' + query;
          }

          return query;
        }
      }]);

      return InvitationService;
    }();

    InvitationService.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]
      }, {
        type: _auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"]
      }];
    };

    InvitationService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], InvitationService);
    /***/
  },

  /***/
  "./src/app/service/social.service.ts":
  /*!*******************************************!*\
    !*** ./src/app/service/social.service.ts ***!
    \*******************************************/

  /*! exports provided: SocialService */

  /***/
  function srcAppServiceSocialServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SocialService", function () {
      return SocialService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../environments/environment */
    "./src/environments/environment.ts");
    /* harmony import */


    var _auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./auth.service */
    "./src/app/service/auth.service.ts");

    var SocialService =
    /*#__PURE__*/
    function () {
      function SocialService(http, authService) {
        _classCallCheck(this, SocialService);

        this.http = http;
        this.authService = authService;
        this.token = null;
      }

      _createClass(SocialService, [{
        key: "socialAuth",
        value: function socialAuth(token, provider) {
          var _this20 = this;

          this.token = token;
          this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].settings.backend + '/social/' + provider.toLowerCase() + '/' + token).subscribe(function (data) {
            _this20.authService.setLogged(data);
          }, function (error) {
            _this20.authService.error = error.error.message;
            _this20.authService.info = '';
          });
        }
      }, {
        key: "getConfig",
        value: function getConfig() {
          return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].settings.backend + '/admin/config', {
            headers: this.authService.myHttpheaders
          });
        }
      }, {
        key: "patchConfig",
        value: function patchConfig(config) {
          return this.http.patch(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].settings.backend + '/admin/config', config, {
            headers: this.authService.myHttpBodyheaders
          });
        }
      }]);

      return SocialService;
    }();

    SocialService.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]
      }, {
        type: _auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"]
      }];
    };

    SocialService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], SocialService);
    /***/
  },

  /***/
  "./src/app/service/user.service.ts":
  /*!*****************************************!*\
    !*** ./src/app/service/user.service.ts ***!
    \*****************************************/

  /*! exports provided: UserService */

  /***/
  function srcAppServiceUserServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "UserService", function () {
      return UserService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../environments/environment */
    "./src/environments/environment.ts");
    /* harmony import */


    var _auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./auth.service */
    "./src/app/service/auth.service.ts");
    /* harmony import */


    var _model_user__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../model/user */
    "./src/app/model/user.ts");

    var UserService =
    /*#__PURE__*/
    function () {
      function UserService(http, authService) {
        _classCallCheck(this, UserService);

        this.http = http;
        this.authService = authService;
        this.filter = new _model_user__WEBPACK_IMPORTED_MODULE_5__["User"]();
        this.sortColumn = 'id';
        this.sortOrder = 'ASC';
      }

      _createClass(UserService, [{
        key: "list",
        value: function list(page, count) {
          var params = "count=" + count + "&page=" + page + "&orderBy=" + this.sortColumn + "&order=" + this.sortOrder + "&" + this.computeQuery();
          return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].settings.backend + '/users?' + params, {
            headers: this.authService.myHttpheaders
          });
        }
      }, {
        key: "get",
        value: function get(id) {
          return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].settings.backend + '/users/' + id, {
            headers: this.authService.myHttpheaders
          });
        }
      }, {
        key: "create",
        value: function create(user) {
          return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].settings.backend + '/users', user, {
            headers: this.authService.myHttpBodyheaders
          });
        }
      }, {
        key: "valid",
        value: function valid(user) {
          var u = new _model_user__WEBPACK_IMPORTED_MODULE_5__["User"]();
          u.id = user.id;
          u.valid = !user.valid;
          return this.patch(u);
        }
      }, {
        key: "tutor",
        value: function tutor(user) {
          var u = new _model_user__WEBPACK_IMPORTED_MODULE_5__["User"]();
          u.id = user.id;
          u.tutor = !user.tutor;
          return this.patch(u);
        }
      }, {
        key: "admin",
        value: function admin(user) {
          var u = new _model_user__WEBPACK_IMPORTED_MODULE_5__["User"]();
          u.id = user.id;
          u.admin = !user.admin;
          return this.patch(u);
        }
      }, {
        key: "unlock",
        value: function unlock(user) {
          var u = new _model_user__WEBPACK_IMPORTED_MODULE_5__["User"]();
          u.id = user.id;
          u.locked = false;
          return this.patch(u);
        }
      }, {
        key: "updateUser",
        value: function updateUser() {
          return this.patch(this.userToUpdate);
        }
      }, {
        key: "patch",
        value: function patch(user) {
          return this.http.patch(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].settings.backend + '/users/' + user.id, user, {
            headers: this.authService.myHttpBodyheaders
          });
        }
      }, {
        key: "delete",
        value: function _delete(userId) {
          return this.http.delete(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].settings.backend + '/users/' + userId, {
            headers: this.authService.myHttpheaders
          });
        }
      }, {
        key: "deleteImg",
        value: function deleteImg(userId) {
          return this.http.delete(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].settings.backend + '/users/' + userId + '/photo', {
            headers: this.authService.myHttpheaders
          });
        }
      }, {
        key: "computeQuery",
        value: function computeQuery() {
          var init = false;
          var query = '';

          for (var prop in this.filter) {
            var val = this.filter[prop];

            if (val && val != '') {
              if (init) {
                query += ' AND ';
              }

              query += prop + ':"' + this.filter[prop] + '"';
              init = true;
            }
          }

          if (init) {
            query = 'q=' + query;
          }

          return query;
        }
      }]);

      return UserService;
    }();

    UserService.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]
      }, {
        type: _auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"]
      }];
    };

    UserService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()], UserService);
    /***/
  },

  /***/
  "./src/app/service/webproxy.service.ts":
  /*!*********************************************!*\
    !*** ./src/app/service/webproxy.service.ts ***!
    \*********************************************/

  /*! exports provided: WebproxyService */

  /***/
  function srcAppServiceWebproxyServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "WebproxyService", function () {
      return WebproxyService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../environments/environment */
    "./src/environments/environment.ts");
    /* harmony import */


    var _auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./auth.service */
    "./src/app/service/auth.service.ts");

    var WebproxyService =
    /*#__PURE__*/
    function () {
      function WebproxyService(http, authService) {
        _classCallCheck(this, WebproxyService);

        this.http = http;
        this.authService = authService;
      }

      _createClass(WebproxyService, [{
        key: "translate",
        value: function translate(url) {
          var params = encodeURI(encodeURIComponent(url));
          return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].settings.backend + '/web/' + params, {
            headers: this.authService.myHttpheaders
          });
        }
      }]);

      return WebproxyService;
    }();

    WebproxyService.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]
      }, {
        type: _auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"]
      }];
    };

    WebproxyService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], WebproxyService);
    /***/
  },

  /***/
  "./src/app/shortnumber.pipe.ts":
  /*!*************************************!*\
    !*** ./src/app/shortnumber.pipe.ts ***!
    \*************************************/

  /*! exports provided: ShortnumberPipe */

  /***/
  function srcAppShortnumberPipeTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ShortnumberPipe", function () {
      return ShortnumberPipe;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var ShortnumberPipe =
    /*#__PURE__*/
    function () {
      function ShortnumberPipe() {
        _classCallCheck(this, ShortnumberPipe);
      }

      _createClass(ShortnumberPipe, [{
        key: "transform",
        value: function transform(value) {
          var readablenum = "0";

          if (value > 1000000000000) {
            readablenum = String(Math.round(value / 10000000000) / 100) + " T";
          } else if (value > 1000000000) {
            readablenum = String(Math.round(value / 10000000) / 100) + " G";
          } else if (value > 1000000) {
            readablenum = String(Math.round(value / 10000) / 100) + " M";
          } else if (value > 1000) {
            readablenum = String(Math.round(value / 10) / 100) + " K";
          } else {
            readablenum = String(value) + " ";
          }

          return readablenum;
        }
      }]);

      return ShortnumberPipe;
    }();

    ShortnumberPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
      name: 'shortnumber'
    })], ShortnumberPipe);
    /***/
  },

  /***/
  "./src/app/user-admin/create-user/create-user.component.scss":
  /*!*******************************************************************!*\
    !*** ./src/app/user-admin/create-user/create-user.component.scss ***!
    \*******************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppUserAdminCreateUserCreateUserComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3VzZXItYWRtaW4vY3JlYXRlLXVzZXIvY3JlYXRlLXVzZXIuY29tcG9uZW50LnNjc3MifQ== */";
    /***/
  },

  /***/
  "./src/app/user-admin/create-user/create-user.component.ts":
  /*!*****************************************************************!*\
    !*** ./src/app/user-admin/create-user/create-user.component.ts ***!
    \*****************************************************************/

  /*! exports provided: CreateUserComponent */

  /***/
  function srcAppUserAdminCreateUserCreateUserComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CreateUserComponent", function () {
      return CreateUserComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _service_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../service/user.service */
    "./src/app/service/user.service.ts");
    /* harmony import */


    var _model_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../model/user */
    "./src/app/model/user.ts");

    var CreateUserComponent =
    /*#__PURE__*/
    function () {
      function CreateUserComponent(route, router, userService) {
        _classCallCheck(this, CreateUserComponent);

        this.route = route;
        this.router = router;
        this.userService = userService;
        this.error = null;
        this.user = new _model_user__WEBPACK_IMPORTED_MODULE_4__["User"]();
      }

      _createClass(CreateUserComponent, [{
        key: "onSubmit",
        value: function onSubmit() {
          var _this21 = this;

          this.userService.create(this.user).subscribe(function (result) {
            _this21.gotoUserList();

            _this21.error = null;
          }, function (error) {
            _this21.error = error.error.message;
          });
        }
      }, {
        key: "gotoUserList",
        value: function gotoUserList() {
          this.router.navigate(['/users']);
        }
      }]);

      return CreateUserComponent;
    }();

    CreateUserComponent.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }, {
        type: _service_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]
      }];
    };

    CreateUserComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-create-user',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./create-user.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/user-admin/create-user/create-user.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./create-user.component.scss */
      "./src/app/user-admin/create-user/create-user.component.scss")).default]
    })], CreateUserComponent);
    /***/
  },

  /***/
  "./src/app/user-admin/invitations-list/invitations-list.component.scss":
  /*!*****************************************************************************!*\
    !*** ./src/app/user-admin/invitations-list/invitations-list.component.scss ***!
    \*****************************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppUserAdminInvitationsListInvitationsListComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3VzZXItYWRtaW4vaW52aXRhdGlvbnMtbGlzdC9pbnZpdGF0aW9ucy1saXN0LmNvbXBvbmVudC5zY3NzIn0= */";
    /***/
  },

  /***/
  "./src/app/user-admin/invitations-list/invitations-list.component.ts":
  /*!***************************************************************************!*\
    !*** ./src/app/user-admin/invitations-list/invitations-list.component.ts ***!
    \***************************************************************************/

  /*! exports provided: InvitationsListComponent */

  /***/
  function srcAppUserAdminInvitationsListInvitationsListComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "InvitationsListComponent", function () {
      return InvitationsListComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _service_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../service/auth.service */
    "./src/app/service/auth.service.ts");
    /* harmony import */


    var _service_invitation_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../service/invitation.service */
    "./src/app/service/invitation.service.ts");

    var InvitationsListComponent =
    /*#__PURE__*/
    function () {
      function InvitationsListComponent(authService, invitationService, router) {
        _classCallCheck(this, InvitationsListComponent);

        this.authService = authService;
        this.invitationService = invitationService;
        this.router = router;
        this.perPage = 10;
        this.currPage = 1;
      }

      _createClass(InvitationsListComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.reload();
        }
      }, {
        key: "reload",
        value: function reload() {
          var _this22 = this;

          this.invitationService.list(this.currPage, this.perPage).subscribe(function (data) {
            _this22.invitations = data.items;
            _this22.count = data.total;
            _this22.pages = Math.ceil(_this22.count / _this22.perPage);
          });
        }
      }, {
        key: "sort",
        value: function sort(column) {
          if (this.invitationService.sortColumn == column) {
            this.invitationService.sortOrder = this.invitationService.sortOrder == 'ASC' ? 'DESC' : 'ASC';
          } else {
            this.invitationService.sortColumn = column;
            this.invitationService.sortOrder = 'ASC';
          }

          this.reload();
        }
      }, {
        key: "changePerPage",
        value: function changePerPage() {
          this.pages = Math.ceil(this.count / this.perPage);

          if (this.currPage > this.pages) {
            this.currPage = this.pages;
          }

          this.reload();
        }
      }, {
        key: "admin",
        value: function admin(index) {
          var _this23 = this;

          var invitationId = this.invitations[index].id;
          this.invitationService.admin(this.invitations[index]).subscribe(function (data) {
            _this23.invitations[index] = data;
          });
        }
      }, {
        key: "tutor",
        value: function tutor(index) {
          var _this24 = this;

          var invitationId = this.invitations[index].id;
          this.invitationService.tutor(this.invitations[index]).subscribe(function (data) {
            _this24.invitations[index] = data;
          });
        }
      }, {
        key: "deletePopup",
        value: function deletePopup(index) {
          this.invitation = this.invitations[index];
        }
      }, {
        key: "delete",
        value: function _delete() {
          var _this25 = this;

          this.invitationService.delete(this.invitation.id).subscribe(function (data) {
            _this25.reload();
          });
        }
      }, {
        key: "setPage",
        value: function setPage(page) {
          this.currPage = page;
          this.reload();
        }
      }, {
        key: "filterAdmin",
        value: function filterAdmin(value) {
          this.invitationService.filter.admin = value;
          this.reload();
        }
      }, {
        key: "filterTutor",
        value: function filterTutor(value) {
          this.invitationService.filter.tutor = value;
          this.reload();
        }
      }]);

      return InvitationsListComponent;
    }();

    InvitationsListComponent.ctorParameters = function () {
      return [{
        type: _service_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]
      }, {
        type: _service_invitation_service__WEBPACK_IMPORTED_MODULE_4__["InvitationService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }];
    };

    InvitationsListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-invitations-list',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./invitations-list.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/user-admin/invitations-list/invitations-list.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./invitations-list.component.scss */
      "./src/app/user-admin/invitations-list/invitations-list.component.scss")).default]
    })], InvitationsListComponent);
    /***/
  },

  /***/
  "./src/app/user-admin/invite-user/invite-user.component.scss":
  /*!*******************************************************************!*\
    !*** ./src/app/user-admin/invite-user/invite-user.component.scss ***!
    \*******************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppUserAdminInviteUserInviteUserComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3VzZXItYWRtaW4vaW52aXRlLXVzZXIvaW52aXRlLXVzZXIuY29tcG9uZW50LnNjc3MifQ== */";
    /***/
  },

  /***/
  "./src/app/user-admin/invite-user/invite-user.component.ts":
  /*!*****************************************************************!*\
    !*** ./src/app/user-admin/invite-user/invite-user.component.ts ***!
    \*****************************************************************/

  /*! exports provided: InviteUserComponent */

  /***/
  function srcAppUserAdminInviteUserInviteUserComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "InviteUserComponent", function () {
      return InviteUserComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _service_invitation_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../service/invitation.service */
    "./src/app/service/invitation.service.ts");
    /* harmony import */


    var _model_invitation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../model/invitation */
    "./src/app/model/invitation.ts");

    var InviteUserComponent =
    /*#__PURE__*/
    function () {
      function InviteUserComponent(route, router, invitationService) {
        _classCallCheck(this, InviteUserComponent);

        this.route = route;
        this.router = router;
        this.invitationService = invitationService;
        this.error = null;
        this.invitation = new _model_invitation__WEBPACK_IMPORTED_MODULE_4__["Invitation"]();
      }

      _createClass(InviteUserComponent, [{
        key: "onSubmit",
        value: function onSubmit() {
          var _this26 = this;

          this.invitationService.create(this.invitation).subscribe(function (result) {
            _this26.gotoInvitationsList();

            _this26.error = null;
          }, function (error) {
            _this26.error = error.error.message;
          });
        }
      }, {
        key: "gotoInvitationsList",
        value: function gotoInvitationsList() {
          this.router.navigate(['/invitations']);
        }
      }]);

      return InviteUserComponent;
    }();

    InviteUserComponent.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }, {
        type: _service_invitation_service__WEBPACK_IMPORTED_MODULE_3__["InvitationService"]
      }];
    };

    InviteUserComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-invite-user',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./invite-user.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/user-admin/invite-user/invite-user.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./invite-user.component.scss */
      "./src/app/user-admin/invite-user/invite-user.component.scss")).default]
    })], InviteUserComponent);
    /***/
  },

  /***/
  "./src/app/user-admin/update-user/update-user.component.scss":
  /*!*******************************************************************!*\
    !*** ./src/app/user-admin/update-user/update-user.component.scss ***!
    \*******************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppUserAdminUpdateUserUpdateUserComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3VzZXItYWRtaW4vdXBkYXRlLXVzZXIvdXBkYXRlLXVzZXIuY29tcG9uZW50LnNjc3MifQ== */";
    /***/
  },

  /***/
  "./src/app/user-admin/update-user/update-user.component.ts":
  /*!*****************************************************************!*\
    !*** ./src/app/user-admin/update-user/update-user.component.ts ***!
    \*****************************************************************/

  /*! exports provided: UpdateUserComponent */

  /***/
  function srcAppUserAdminUpdateUserUpdateUserComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "UpdateUserComponent", function () {
      return UpdateUserComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _service_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../service/user.service */
    "./src/app/service/user.service.ts");

    var UpdateUserComponent =
    /*#__PURE__*/
    function () {
      function UpdateUserComponent(userService, route, router) {
        _classCallCheck(this, UpdateUserComponent);

        this.userService = userService;
        this.route = route;
        this.router = router;
      }

      _createClass(UpdateUserComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }, {
        key: "onSubmit",
        value: function onSubmit() {
          var _this27 = this;

          this.userService.updateUser().subscribe(function (result) {
            return _this27.gotoUserList();
          }, function (error) {
            return _this27.error = error.error.message;
          });
        }
      }, {
        key: "gotoUserList",
        value: function gotoUserList() {
          this.router.navigate(['/users']);
        }
      }]);

      return UpdateUserComponent;
    }();

    UpdateUserComponent.ctorParameters = function () {
      return [{
        type: _service_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }];
    };

    UpdateUserComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-update-user',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./update-user.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/user-admin/update-user/update-user.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./update-user.component.scss */
      "./src/app/user-admin/update-user/update-user.component.scss")).default]
    })], UpdateUserComponent);
    /***/
  },

  /***/
  "./src/app/user-admin/user-list/user-list.component.scss":
  /*!***************************************************************!*\
    !*** ./src/app/user-admin/user-list/user-list.component.scss ***!
    \***************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppUserAdminUserListUserListComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3VzZXItYWRtaW4vdXNlci1saXN0L3VzZXItbGlzdC5jb21wb25lbnQuc2NzcyJ9 */";
    /***/
  },

  /***/
  "./src/app/user-admin/user-list/user-list.component.ts":
  /*!*************************************************************!*\
    !*** ./src/app/user-admin/user-list/user-list.component.ts ***!
    \*************************************************************/

  /*! exports provided: UserListComponent */

  /***/
  function srcAppUserAdminUserListUserListComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "UserListComponent", function () {
      return UserListComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _service_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../service/auth.service */
    "./src/app/service/auth.service.ts");
    /* harmony import */


    var _service_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../service/user.service */
    "./src/app/service/user.service.ts");

    var UserListComponent =
    /*#__PURE__*/
    function () {
      function UserListComponent(authService, userService, router) {
        _classCallCheck(this, UserListComponent);

        this.authService = authService;
        this.userService = userService;
        this.router = router;
        this.perPage = 10;
        this.currPage = 1;
      }

      _createClass(UserListComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.reload();
        }
      }, {
        key: "reload",
        value: function reload() {
          var _this28 = this;

          this.userService.list(this.currPage, this.perPage).subscribe(function (data) {
            _this28.users = data.items;
            _this28.count = data.total;
            _this28.pages = Math.ceil(_this28.count / _this28.perPage);
          });
        }
      }, {
        key: "sort",
        value: function sort(column) {
          if (this.userService.sortColumn == column) {
            this.userService.sortOrder = this.userService.sortOrder == 'ASC' ? 'DESC' : 'ASC';
          } else {
            this.userService.sortColumn = column;
            this.userService.sortOrder = 'ASC';
          }

          this.reload();
        }
      }, {
        key: "changePerPage",
        value: function changePerPage() {
          this.pages = Math.ceil(this.count / this.perPage);

          if (this.currPage > this.pages) {
            this.currPage = this.pages;
          }

          this.reload();
        }
      }, {
        key: "valid",
        value: function valid(index) {
          var _this29 = this;

          var userId = this.users[index].id;

          if (userId != this.authService.user.id) {
            this.userService.valid(this.users[index]).subscribe(function (data) {
              _this29.users[index] = data;
            });
          }
        }
      }, {
        key: "admin",
        value: function admin(index) {
          var _this30 = this;

          var userId = this.users[index].id;

          if (userId != this.authService.user.id) {
            this.userService.admin(this.users[index]).subscribe(function (data) {
              _this30.users[index] = data;
            });
          }
        }
      }, {
        key: "tutor",
        value: function tutor(index) {
          var _this31 = this;

          var userId = this.users[index].id;

          if (userId != this.authService.user.id) {
            this.userService.tutor(this.users[index]).subscribe(function (data) {
              _this31.users[index] = data;
            });
          }
        }
      }, {
        key: "unlock",
        value: function unlock(index) {
          var _this32 = this;

          var userId = this.users[index].id;

          if (userId != this.authService.user.id) {
            this.userService.unlock(this.users[index]).subscribe(function (data) {
              _this32.users[index] = data;
            });
          }
        }
      }, {
        key: "deletePopup",
        value: function deletePopup(index) {
          this.user = this.users[index];
        }
      }, {
        key: "delete",
        value: function _delete() {
          var _this33 = this;

          this.userService.delete(this.user.id).subscribe(function (data) {
            _this33.reload();
          });
        }
      }, {
        key: "update",
        value: function update(index) {
          this.userService.userToUpdate = this.users[index];
          this.router.navigate(['/updateUser']);
        }
      }, {
        key: "setPage",
        value: function setPage(page) {
          this.currPage = page;
          this.reload();
        }
      }, {
        key: "filterValid",
        value: function filterValid(value) {
          this.userService.filter.valid = value;
          this.reload();
        }
      }, {
        key: "filterAdmin",
        value: function filterAdmin(value) {
          this.userService.filter.admin = value;
          this.reload();
        }
      }, {
        key: "filterTutor",
        value: function filterTutor(value) {
          this.userService.filter.tutor = value;
          this.reload();
        }
      }, {
        key: "filterLocked",
        value: function filterLocked(value) {
          this.userService.filter.locked = value;
          this.reload();
        }
      }]);

      return UserListComponent;
    }();

    UserListComponent.ctorParameters = function () {
      return [{
        type: _service_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]
      }, {
        type: _service_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }];
    };

    UserListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-user-list',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./user-list.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/user-admin/user-list/user-list.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./user-list.component.scss */
      "./src/app/user-admin/user-list/user-list.component.scss")).default]
    })], UserListComponent);
    /***/
  },

  /***/
  "./src/app/web-proxy/web-proxy.component.scss":
  /*!****************************************************!*\
    !*** ./src/app/web-proxy/web-proxy.component.scss ***!
    \****************************************************/

  /*! exports provided: default */

  /***/
  function srcAppWebProxyWebProxyComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "#frameBrowser {\n  width: 100%;\n  height: calc(100% - 100px);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd2ViLXByb3h5L0M6XFxVc2Vyc1xcY2hyaXN0b3BoZS5kYW1lXFx3b3Jrc3BhY2UtdG9wdGFsXFxmYWJ1bGV4aWVcXGZhYnVsZXhpZS13ZWJcXHNyY1xcbWFpblxcZnJvbnRlbmQvc3JjXFxhcHBcXHdlYi1wcm94eVxcd2ViLXByb3h5LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC93ZWItcHJveHkvd2ViLXByb3h5LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0MsV0FBQTtFQUNBLDBCQUFBO0FDQ0QiLCJmaWxlIjoic3JjL2FwcC93ZWItcHJveHkvd2ViLXByb3h5LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2ZyYW1lQnJvd3NlciB7XHJcblx0d2lkdGg6MTAwJTtcclxuXHRoZWlnaHQ6Y2FsYygxMDAlIC0gMTAwcHgpO1xyXG59IiwiI2ZyYW1lQnJvd3NlciB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IGNhbGMoMTAwJSAtIDEwMHB4KTtcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/web-proxy/web-proxy.component.ts":
  /*!**************************************************!*\
    !*** ./src/app/web-proxy/web-proxy.component.ts ***!
    \**************************************************/

  /*! exports provided: WebProxyComponent */

  /***/
  function srcAppWebProxyWebProxyComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "WebProxyComponent", function () {
      return WebProxyComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _service_webproxy_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../service/webproxy.service */
    "./src/app/service/webproxy.service.ts");

    var WebProxyComponent =
    /*#__PURE__*/
    function () {
      function WebProxyComponent(webproxyService) {
        _classCallCheck(this, WebProxyComponent);

        this.webproxyService = webproxyService;
      }

      _createClass(WebProxyComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }, {
        key: "onUrlChange",
        value: function onUrlChange() {
          var _this34 = this;

          //this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url); 
          this.webproxyService.translate(this.url).subscribe(function (data) {
            _this34.frameBrowser.nativeElement.contentWindow.document.write(data.result);
          });
        }
      }]);

      return WebProxyComponent;
    }();

    WebProxyComponent.ctorParameters = function () {
      return [{
        type: _service_webproxy_service__WEBPACK_IMPORTED_MODULE_2__["WebproxyService"]
      }];
    };

    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])("frameBrowser", {
      static: false
    })], WebProxyComponent.prototype, "frameBrowser", void 0);
    WebProxyComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-web-proxy',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./web-proxy.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/web-proxy/web-proxy.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./web-proxy.component.scss */
      "./src/app/web-proxy/web-proxy.component.scss")).default]
    })], WebProxyComponent);
    /***/
  },

  /***/
  "./src/environments/environment.ts":
  /*!*****************************************!*\
    !*** ./src/environments/environment.ts ***!
    \*****************************************/

  /*! exports provided: environment */

  /***/
  function srcEnvironmentsEnvironmentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "environment", function () {
      return environment;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js"); // This file can be replaced during build by using the `fileReplacements` array.
    // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
    // The list of file replacements can be found in `angular.json`.


    var environment = {
      production: false,
      settings: {
        backend: "https://localhost:8443"
      }
    };
    /*
     * For easier debugging in development mode, you can import the following file
     * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
     *
     * This import should be commented out in production mode because it will have a negative impact
     * on performance if an error is thrown.
     */
    // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

    /***/
  },

  /***/
  "./src/main.ts":
  /*!*********************!*\
    !*** ./src/main.ts ***!
    \*********************/

  /*! no exports provided */

  /***/
  function srcMainTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/platform-browser-dynamic */
    "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
    /* harmony import */


    var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./app/app.module */
    "./src/app/app.module.ts");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./environments/environment */
    "./src/environments/environment.ts");

    if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
      Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
    }

    Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"]).catch(function (err) {
      return console.error(err);
    });
    /***/
  },

  /***/
  0:
  /*!***************************!*\
    !*** multi ./src/main.ts ***!
    \***************************/

  /*! no static exports found */

  /***/
  function _(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(
    /*! C:\Users\christophe.dame\workspace-toptal\fabulexie\fabulexie-web\src\main\frontend\src\main.ts */
    "./src/main.ts");
    /***/
  }
}, [[0, "runtime", "vendor"]]]);
//# sourceMappingURL=main-es5.js.map