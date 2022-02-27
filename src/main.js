/* Copyright 2022 mycumycu <https://github.com/mycumycu/X4-External-App>
*  Copyright 2022 BGASM <https://github.com/BGASM>
*
*  The following code is a derivative work of the code from the X4 External App project, 
*  which is licensed GPLv3. This code therefore is also licensed under the terms 
*  of the GNU Public License, verison 3.
*/
import {createApp} from 'vue'
import App from './App.vue'

import './scss/style.default.premium.scss';
import './vendor/bootstrap/js/bootstrap.bundle.min.js';

import {library} from '@fortawesome/fontawesome-svg-core'
import {faCogs, faCoins, faFont, faSearch, faThLarge, faTimes, faTrashAlt, faUserFriends} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Row from 'primevue/row';
import ColumnGroup from 'primevue/columngroup';



library.add(faSearch, faTimes, faThLarge, faCoins, faUserFriends, faFont, faCogs, faTrashAlt)
const app = createApp(App);
app.use(PrimeVue);
app.use(PerfectScrollbar);

app.component('font-awesome-icon', FontAwesomeIcon);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Row', Row);
app.component('ColumnGroup', ColumnGroup);

app.mount('#app')