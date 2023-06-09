// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { loadTranslations } from '../../actions/i18n';
import { loadSettings } from '../../actions/settings';
import { loadTenant } from '../../actions/tenant'

import {getCurrentLocale, getTranslations} from '../../selectors/i18n';

import IntlProvider from './intl_provider';
import { getSettings } from '../../selectors';


function mapStateToProps(state) {
    const locale = getCurrentLocale(state); // locale: // zh-CN
    // console.log("translations", getTranslations(state, locale))  //  {accounts.signin: 'Sign In', accounts.signup: 'Sign Up', accounts.submit: 'Submit', accounts.forget_password: 'Forget Password', accounts.reset_password: 'Reset Password', …}
    return {
        locale,
        translations: getTranslations(state, locale),
        settings: getSettings(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loadTenant,
            loadSettings,
            loadTranslations,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(IntlProvider);
