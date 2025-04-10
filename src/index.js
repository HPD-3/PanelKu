import './styles.css';
import { loginScripts  } from './login.js';
import { registerScripts } from './register.js';
import { loadDashboard } from './dashboard.js';
import { responsive } from './responsive.js'
import { updateAccountName,updateBio } from "./customer.js"; 

updateAccountName(); 
loadDashboard();
loginScripts();
registerScripts();
responsive();
updateBio();

