import React from 'react';
import MenuDashboard from '../MenuDashboard/MenuDashboard'; // Importa el componente MenuDashboard

const Dashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <MenuDashboard /> {/* Agrega el componente MenuDashboard */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                {/* Contenido del dashboard */}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
