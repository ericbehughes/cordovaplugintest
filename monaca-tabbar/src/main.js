import 'onsenui';
import Vue from 'vue';
import VueOnsen from 'vue-onsenui';
import jQ from 'jquery';
import lodash from 'lodash';

document.addEventListener("deviceready", cordova_onDeviceReady, false);

function cordova_onDeviceReady() {
    // device ready
}

Vue.use(VueOnsen);

import App from './App.vue';

new Vue({
    el: '#app',
    template: '<app></app>',
    beforeCreate() {

        // disable default OnsenUI styling
        this.$ons.disableAutoStyling();
    },
    components: { App }
});