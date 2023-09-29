import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import AddData from './pages/AddData';
import GetData from './pages/GetData';
import UpdateData from './pages/UpdateData';
import DeleteData from './pages/DeleteData';

const Routers = () => {
    return (
        <Router>
          <Routes>
            <Route path='/' element={<Homepage />}></Route>
            <Route path='/AddData' element={<AddData />}></Route>
            <Route path='/GetData' element={<GetData />}></Route>
            <Route path='/UpdateData' element={<UpdateData />}></Route>
            <Route path='/DeleteData' element={<DeleteData />}></Route>
          </Routes>
        </Router>
    );
};

export default Routers;