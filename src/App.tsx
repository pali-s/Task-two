import {Routes, Route,Navigate} from 'react-router-dom';
import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import MenuManagement from './pages/Dashboard/StaffManagement.tsx';
import DashboardDefault from './pages/Dashboard/DashboardDefault.tsx';
import PrivateRoute from './routes/PrivateRoute.tsx';
import Subscription from './pages/Dashboard/Subscription.tsx';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login'/>}/>
      <Route path='/login' element={<Login/>}/>

        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
          }>
        <Route index element={<DashboardDefault />} />
        <Route path="staff-management" element={<MenuManagement />} />
        <Route path="subscription-management" element={<Subscription />} />
      </Route>

    </Routes>
  );
}

export default App;