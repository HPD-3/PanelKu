import './styles.css';
import { loginScripts  } from './login.js';
import { loadDashboard } from './dashboard.js';
import { responsive } from './responsive.js'
import { updateAccountName,updateBio } from "./customer.js"; 

updateAccountName(); 
loadDashboard();
loginScripts();
responsive();
updateBio();

